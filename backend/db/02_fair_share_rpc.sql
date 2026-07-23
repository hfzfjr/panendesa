-- Migration: Fair Share Distribution RPC Function
-- Jalankan manual di Supabase SQL Editor

-- Helper function untuk mendapatkan pengali grade
CREATE OR REPLACE FUNCTION get_pengali_grade(p_grade VARCHAR)
RETURNS DECIMAL(3,2)
LANGUAGE plpgsql
AS $$
BEGIN
  CASE p_grade
    WHEN 'A' THEN RETURN 1.0;
    WHEN 'B' THEN RETURN 0.85;
    WHEN 'C' THEN RETURN 0.70;
    ELSE
      RAISE EXCEPTION 'Data intake_grading tidak valid: grade "%" kosong atau tidak dikenal', p_grade;
  END CASE;
END;
$$;

CREATE OR REPLACE FUNCTION calculate_fair_share(p_order_id INTEGER)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
  v_order RECORD;
  v_candidate RECORD;
  v_kopdes_desa_id INTEGER;
  v_harga_final_per_kg DECIMAL(10,2);
  v_fee_persen DECIMAL(5,2);
  v_jumlah_diminta_kg DECIMAL(10,2);
  v_total_kg_terkumpul DECIMAL(10,2);
  v_total_uang_dibagi DECIMAL(12,2);
  v_total_kontribusi_tertimbang DECIMAL(10,2);
  v_result JSON;
  v_distribusi JSONB := '[]'::JSONB;
BEGIN
  -- 1. Ambil data order dengan row lock (FOR UPDATE OF o) untuk mencegah race condition
  -- Hanya lock row orders, bukan kopdes yang di-JOIN
  SELECT o.id, o.kopdes_id, o.harga_final_per_kg, o.fee_kopdes_persen_terpakai,
         o.jumlah_diminta_kg, o.status, o.harga_terkunci, k.desa_id
  INTO v_order
  FROM orders o
  JOIN kopdes k ON o.kopdes_id = k.id
  WHERE o.id = p_order_id
  FOR UPDATE OF o;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order tidak ditemukan';
  END IF;

  -- 2. Validasi precondition
  IF v_order.status != 'siap_kirim' OR NOT v_order.harga_terkunci THEN
    RAISE EXCEPTION 'Order belum siap untuk distribusi hasil - harga belum dikonfirmasi';
  END IF;

  v_kopdes_desa_id := v_order.desa_id;
  v_harga_final_per_kg := v_order.harga_final_per_kg;
  v_fee_persen := v_order.fee_kopdes_persen_terpakai;
  v_jumlah_diminta_kg := v_order.jumlah_diminta_kg;

  -- 3. Hapus fair_share_distribution lama untuk order ini (idempotency)
  DELETE FROM fair_share_distribution WHERE order_id = p_order_id;

  -- 4. Ambil SET desa yang dianggap "kontribusi" untuk order ini
  -- Desa prioritas awal + desa tambahan dari order_allocation
  CREATE TEMP TABLE temp_desa_scope (desa_id INTEGER) ON COMMIT DROP;
  
  INSERT INTO temp_desa_scope (desa_id)
  SELECT v_kopdes_desa_id;
  
  INSERT INTO temp_desa_scope (desa_id)
  SELECT desa_id FROM order_allocation WHERE order_id = p_order_id;

  -- 5. Ambil intake_grading yang match kriteria:
  -- - Desa dalam scope (temp_desa_scope)
  -- - Time window: intake_grading.created_at >= order.created_at
  -- - Exclusivity: intake_grading_id NOT IN fair_share_distribution (lintas order)
  CREATE TEMP TABLE temp_intake_candidates (
    intake_grading_id INTEGER,
    petani_id INTEGER,
    grade VARCHAR(1),
    berat_aktual_kg DECIMAL(10,2),
    pengali_grade DECIMAL(3,2)
  ) ON COMMIT DROP;

  INSERT INTO temp_intake_candidates (intake_grading_id, petani_id, grade, berat_aktual_kg, pengali_grade)
  SELECT
    ig.id,
    se.petani_id,
    ig.grade,
    ig.berat_aktual_kg,
    get_pengali_grade(ig.grade) AS pengali_grade
  FROM intake_grading ig
  JOIN stok_estimasi se ON ig.stok_estimasi_id = se.id
  JOIN users u ON se.petani_id = u.id
  WHERE u.desa_id IN (SELECT desa_id FROM temp_desa_scope)
    AND ig.created_at >= v_order.created_at
    AND ig.id NOT IN (
      SELECT intake_grading_id FROM fair_share_distribution
    );

  -- 6. Hitung total kg terkumpul dan total kontribusi tertimbang
  SELECT 
    SUM(berat_aktual_kg),
    SUM(berat_aktual_kg * pengali_grade)
  INTO v_total_kg_terkumpul, v_total_kontribusi_tertimbang
  FROM temp_intake_candidates;

  IF v_total_kg_terkumpul IS NULL OR v_total_kg_terkumpul = 0 THEN
    -- Tidak ada intake yang match, cleanup dan return
    DROP TABLE temp_desa_scope;
    DROP TABLE temp_intake_candidates;
    
    RETURN json_build_object(
      'success', true,
      'data', json_build_object(
        'distribusi', '[]'::JSON,
        'fee_kopdes_persen_terpakai', v_fee_persen,
        'total_fee_kopdes', 0
      )
    );
  END IF;

  -- 7. Hitung total uang yang dibagi
  -- Berdasarkan total kg TERKUMPUL (bukan kg yang DIMINTA), karena bisa beda kalau smart-split/kejanggalan
  v_total_uang_dibagi := v_harga_final_per_kg * (1 - v_fee_persen / 100) * v_total_kg_terkumpul;

  -- 8. Hitung distribusi per petani dan INSERT ke fair_share_distribution
  FOR v_candidate IN 
    SELECT intake_grading_id, petani_id, grade, berat_aktual_kg, pengali_grade
    FROM temp_intake_candidates
  LOOP
    DECLARE
      v_kontribusi_tertimbang DECIMAL(10,2);
      v_porsi DECIMAL(20,10);
      v_jumlah_diterima DECIMAL(12,2);
    BEGIN
      v_kontribusi_tertimbang := v_candidate.berat_aktual_kg * v_candidate.pengali_grade;
      v_porsi := v_kontribusi_tertimbang / v_total_kontribusi_tertimbang;
      v_jumlah_diterima := v_porsi * v_total_uang_dibagi;

      INSERT INTO fair_share_distribution (
        order_id, petani_id, intake_grading_id, kontribusi_kg, pengali_grade, jumlah_diterima
      ) VALUES (
        p_order_id, v_candidate.petani_id, v_candidate.intake_grading_id, 
        v_candidate.berat_aktual_kg, v_candidate.pengali_grade, v_jumlah_diterima
      );

      -- Tambahkan ke JSON result
      v_distribusi := v_distribusi || json_build_object(
        'petani_id', v_candidate.petani_id,
        'kontribusi_kg', v_candidate.berat_aktual_kg,
        'grade', v_candidate.grade,
        'jumlah_diterima', v_jumlah_diterima
      )::JSONB;
    END;
  END LOOP;

  -- 9. Update orders.status = 'selesai'
  UPDATE orders SET status = 'selesai' WHERE id = p_order_id;

  -- 10. Cleanup temp tables
  DROP TABLE temp_desa_scope;
  DROP TABLE temp_intake_candidates;

  -- 11. Return hasil
  v_result := json_build_object(
    'success', true,
    'data', json_build_object(
      'distribusi', v_distribusi::JSON,
      'fee_kopdes_persen_terpakai', v_fee_persen,
      'total_fee_kopdes', (v_harga_final_per_kg * v_fee_persen / 100 * v_total_kg_terkumpul)
    )
  );

  RETURN v_result;

EXCEPTION
  WHEN OTHERS THEN
    -- Cleanup temp tables jika ada error
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'temp_desa_scope') THEN
      DROP TABLE temp_desa_scope;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'temp_intake_candidates') THEN
      DROP TABLE temp_intake_candidates;
    END IF;
    
    RAISE;
END;
$$;
