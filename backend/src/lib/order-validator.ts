import { supabase } from './supabase';
import { getDesaCapacity } from './capacity-engine';
import { runSmartSplit } from './smart-split';

export interface ValidateResult {
  status: 'lanjut_normal' | 'smart_split_triggered';
  alokasi: Array<{
    desa_id: number;
    jumlah_kg: number;
    skor_prioritas: number;
  }>;
}

/**
 * Validasi kapasitas tervalidasi vs kebutuhan order, trigger smart split jika perlu
 * Fungsi ini diekstrak dari route handler POST /api/orders/:id/validate
 * agar bisa dipanggil langsung dari kode lain (misal intakeGrading.ts)
 * 
 * @param orderId ID order yang akan divalidasi
 * @returns Hasil validasi dengan status dan alokasi (jika ada)
 */
export async function validateOrderCapacity(orderId: number): Promise<ValidateResult> {
  try {
    console.log(`[Order Validator] Validating order ${orderId}`);

    // Ambil order dari database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('id, kopdes_id, jumlah_diminta_kg, status')
      .eq('id', orderId)
      .single();

    if (orderError || !orderData) {
      throw new Error(`Order ${orderId} tidak ditemukan`);
    }

    // Skip jika order tidak dalam status yang relevan
    if (orderData.status !== 'dikonfirmasi_sementara' && orderData.status !== 'menunggu_tambahan_panen') {
      console.log(`[Order Validator] Order ${orderId} status bukan 'dikonfirmasi_sementara' atau 'menunggu_tambahan_panen', skip validation`);
      return {
        status: 'lanjut_normal',
        alokasi: []
      };
    }

    // Ambil kopdes dari order.kopdes_id, ambil desa_id-nya
    const { data: kopdesData, error: kopdesError } = await supabase
      .from('kopdes')
      .select('desa_id')
      .eq('id', orderData.kopdes_id)
      .single();

    if (kopdesError || !kopdesData) {
      throw new Error(`Kopdes ${orderData.kopdes_id} tidak ditemukan untuk order ${orderId}`);
    }

    // Panggil getDesaCapacity untuk desa itu, ambil kapasitas_tervalidasi_kg
    const capacity = await getDesaCapacity(kopdesData.desa_id);

    // Toleransi ±15%: kalau kapasitas_tervalidasi_kg >= jumlah_diminta_kg * 0.85 -> lanjut_normal
    const kapasitasMinimum = parseFloat(orderData.jumlah_diminta_kg.toString()) * 0.85;

    if (capacity.kapasitas_tervalidasi_kg >= kapasitasMinimum) {
      // Kapasitas cukup, tidak perlu smart split
      // Hapus order_allocation lama untuk order ini (idempotency)
      const { error: deleteError } = await supabase
        .from('order_allocation')
        .delete()
        .eq('order_id', orderId);

      if (deleteError) {
        console.error(`[Order Validator] Error deleting old order_allocation for order ${orderId}:`, deleteError);
      }

      console.log(`[Order Validator] Order ${orderId} kapasitas cukup, lanjut normal`);
      return {
        status: 'lanjut_normal',
        alokasi: []
      };
    }

    // Kapasitas tidak cukup, panggil runSmartSplit
    console.log(`[Order Validator] Order ${orderId} kapasitas tidak cukup, trigger smart split`);
    const smartSplitResult = await runSmartSplit(
      orderData.id,
      parseFloat(orderData.jumlah_diminta_kg.toString()),
      orderData.kopdes_id
    );

    // Hapus order_allocation lama untuk order ini (idempotency)
    const { error: deleteError } = await supabase
      .from('order_allocation')
      .delete()
      .eq('order_id', orderId);

    if (deleteError) {
      console.error(`[Order Validator] Error deleting old order_allocation for order ${orderId}:`, deleteError);
    }

    // Insert hasil alokasi ke tabel order_allocation
    const allocationInserts = smartSplitResult.alokasi.map((alokasi) => ({
      order_id: orderData.id,
      desa_id: alokasi.desa_id,
      jumlah_dialokasikan_kg: alokasi.jumlah_dialokasikan_kg,
      urutan_prioritas: alokasi.urutan_prioritas,
      skor_prioritas: alokasi.skor_prioritas
    }));

    const { error: allocationError } = await supabase
      .from('order_allocation')
      .insert(allocationInserts);

    if (allocationError) {
      console.error(`[Order Validator] Error inserting order_allocation for order ${orderId}:`, allocationError);
      throw new Error(`Gagal menyimpan alokasi order ${orderId}`);
    }

    // Update orders.status berdasarkan hasil smart-split
    let newStatus: string;
    if (smartSplitResult.status === 'tidak_terpenuhi' || smartSplitResult.status === 'sebagian') {
      newStatus = 'menunggu_tambahan_panen';
      console.log(`[Order Validator] Order ${orderId} smart split ${smartSplitResult.status}, update status ke 'menunggu_tambahan_panen'`);
    } else {
      // status = 'terpenuhi' -> tetap 'dikonfirmasi_sementara' (order masih menunggu confirm-price)
      newStatus = 'dikonfirmasi_sementara';
      console.log(`[Order Validator] Order ${orderId} smart split ${smartSplitResult.status}, status tetap 'dikonfirmasi_sementara'`);
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (updateError) {
      console.error(`[Order Validator] Error updating status for order ${orderId}:`, updateError);
      // Tidak throw error karena alokasi sudah berhasil disimpan
    }

    // Response sesuai spec: map jumlah_dialokasikan_kg -> jumlah_kg
    const alokasiResponse = smartSplitResult.alokasi.map((alokasi) => ({
      desa_id: alokasi.desa_id,
      jumlah_kg: alokasi.jumlah_dialokasikan_kg,
      skor_prioritas: alokasi.skor_prioritas
    }));

    return {
      status: 'smart_split_triggered',
      alokasi: alokasiResponse
    };
  } catch (error) {
    console.error(`[Order Validator] Error validating order ${orderId}:`, error);
    throw error;
  }
}
