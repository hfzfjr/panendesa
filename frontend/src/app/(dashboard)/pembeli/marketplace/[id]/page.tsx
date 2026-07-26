"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, MapPin, Truck, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";
import { ErrorState } from "../../../../../components/ui/ErrorState";
import { apiClient } from "../../../../../lib/api-client";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [desaData, setDesaData] = useState<any>(null);
  const [capacityData, setCapacityData] = useState<any>(null);
  const [trustScoreData, setTrustScoreData] = useState<any>(null);

  const desaId = parseInt(unwrappedParams.id);

  useEffect(() => {
    const fetchDesaData = async () => {
      if (isNaN(desaId)) {
        setError('ID desa tidak valid');
        setLoading(false);
        return;
      }

      try {
        // Fetch capacity data
        const capacityResponse = await apiClient.getCapacity(desaId);
        if (capacityResponse.success && capacityResponse.data) {
          setCapacityData(capacityResponse.data);
        } else {
          setError(capacityResponse.error || 'Gagal mengambil data kapasitas');
        }

        // Fetch trust score data
        const trustScoreResponse = await apiClient.getTrustScoreDesa(desaId);
        if (trustScoreResponse.success && trustScoreResponse.data) {
          setTrustScoreData(trustScoreResponse.data);
        }

        // Get desa name from capacity response or fetch separately
        // For now, we'll use a placeholder since we don't have a single desa endpoint
        setDesaData({
          id: desaId,
          nama_desa: `Desa #${desaId}`, // Will be updated when we have single desa endpoint
        });
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data desa');
      } finally {
        setLoading(false);
      }
    };

    fetchDesaData();
  }, [desaId]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    const maxStock = capacityData?.kapasitas_tervalidasi_kg || 0;
    if (quantity < maxStock) setQuantity(quantity + 1);
  };

  const handleCheckout = () => {
    // Pass desa_id and quantity to checkout via query params
    const komoditasId = 1; // Default - should be selected from UI in future
    const checkoutUrl = `/pembeli/checkout?desa_id=${desaId}&komoditas_id=${komoditasId}&jumlah=${quantity}`;
    window.location.href = checkoutUrl;
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto pb-24 md:pb-12 min-h-screen bg-gray-100 md:bg-transparent">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0 md:gap-8 lg:gap-10 md:py-8 lg:px-8">
            <div className="lg:col-span-4 md:col-span-1">
              <div className="w-full aspect-square md:rounded-2xl bg-gray-200"></div>
            </div>
            <div className="lg:col-span-5 md:col-span-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto pb-24 md:pb-12 min-h-screen bg-gray-100 md:bg-transparent">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <Link href="/pembeli/marketplace" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-dark font-bold transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Pasar
          </Link>
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </main>
    );
  }

  const productInfo = {
    name: "Cabai Merah Keriting",
    price: "Rp 35.000",
    unit: "kg",
    village: desaData?.nama_desa || `Desa #${desaId}`,
    farmer: "Kopdes Tani Makmur",
    rating: trustScoreData?.skor_konsistensi_desa ? (trustScoreData.skor_konsistensi_desa / 20).toFixed(1) : "4.5",
    sold: "1.2rb",
    stock: capacityData?.kapasitas_tervalidasi_kg || 0,
    description: "Cabai merah keriting kualitas super yang ditanam oleh Kelompok Tani Makmur. Ditanam menggunakan pupuk organik tanpa pestisida kimia yang berbahaya. Dipanen pada tingkat kematangan optimal sehingga menghasilkan rasa pedas yang khas dan warna merah cerah. Cocok untuk kebutuhan rumah tangga maupun restoran.",
    image: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588012674991-88fc40632cd2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop"
    ]
  };

  return (
    <main className="min-h-screen bg-[#f3f4f5] pt-4 pb-24 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-0 md:px-4">
        
        {/* Breadcrumb (Desktop) */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-4 px-4 md:px-0">
          <Link href="/" className="hover:text-primary-dark transition-colors">Beranda</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/pembeli/marketplace" className="hover:text-primary-dark transition-colors">Marketplace</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate">{productInfo.name}</span>
        </nav>

        {/* Mobile Navbar / Back Button */}
        <div className="md:hidden bg-white px-4 py-3 sticky top-0 z-50 flex items-center gap-3 border-b border-gray-200">
          <Link href="/pembeli/marketplace" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <span className="font-bold text-gray-900 truncate">Detail Produk</span>
        </div>

        <div className="bg-white md:rounded-xl shadow-sm md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-4">
              <div>
                {/* Main Image */}
                <div className="w-full aspect-square bg-gray-100 md:rounded-xl overflow-hidden relative">
                  <img src={productInfo.images[activeImage]} alt={productInfo.name} className="w-full h-full object-cover" />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 p-4 md:p-0 md:mt-4 overflow-x-auto scrollbar-hide">
                  {productInfo.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-primary-dark' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column: Product Information */}
            <div className="md:col-span-5 px-4 md:px-0 py-4 md:py-0">
              
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {productInfo.name}
              </h1>

              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1 text-gray-700">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{productInfo.rating}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="text-gray-600">
                  Terjual <span className="font-bold text-gray-900">{productInfo.sold}</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900 md:mb-6">
                {productInfo.price} <span className="text-base font-normal text-gray-500">/{productInfo.unit}</span>
              </div>

              {/* Mobile-only Quantity Selector */}
              <div className="md:hidden mt-6 mb-2">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Atur Jumlah dan Catatan</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border border-gray-300 rounded-lg h-9 w-28">
                    <button onClick={handleDecrease} className="w-9 h-full flex items-center justify-center text-gray-500 active:bg-gray-100 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 flex items-center justify-center font-semibold text-gray-900 text-sm">
                      {quantity}
                    </div>
                    <button onClick={handleIncrease} className="w-9 h-full flex items-center justify-center text-gray-500 active:bg-gray-100 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm">
                    Stok: <span className="font-bold text-gray-900">{productInfo.stock.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span>Pengiriman langsung dari petani.</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="w-12 h-11 flex-none rounded-lg border-primary-dark text-primary-dark flex items-center justify-center p-0 hover:bg-green-50">
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                  <Button onClick={handleCheckout} className="flex-1 h-11 rounded-lg font-bold bg-primary-dark hover:bg-green-700 text-white">
                    Beli Langsung
                  </Button>
                </div>
              </div>

              <div className="h-2 bg-[#f3f4f5] -mx-4 md:mx-0 my-4 md:my-6 md:h-px md:bg-gray-200"></div>

              {/* Detail section */}
              <div className="mb-6">
                <h3 className="font-bold text-primary-dark border-b-2 border-primary-dark inline-block pb-2 mb-4">Detail</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-32 text-gray-500">Kondisi</span>
                    <span className="text-gray-900">Segar (Panen Baru)</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-500">Min. Pemesanan</span>
                    <span className="text-gray-900">1 {productInfo.unit}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-500">Kategori</span>
                    <Link href="#" className="text-primary-dark font-bold hover:underline">Sayuran & Bumbu</Link>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                  {productInfo.description}
                </p>
              </div>

              <div className="h-2 bg-[#f3f4f5] -mx-4 md:mx-0 my-4 md:my-6 md:h-px md:bg-gray-200"></div>

              {/* Merchant / Desa Info */}
              <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=100&auto=format&fit=crop" alt="Petani" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      <h4 className="font-bold text-gray-900">{productInfo.farmer}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{productInfo.village}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="text-xs h-9 px-4 rounded-lg font-bold border-gray-300">
                  Kunjungi Toko
                </Button>
              </div>

            {/* Transparansi Rantai Pasok */}
            <div className="h-2 bg-[#f3f4f5] -mx-4 md:mx-0 my-4 md:my-6 md:h-px md:bg-gray-200"></div>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Transparansi Rantai Pasok
              </h3>
              <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 text-sm text-gray-700">
                <p className="mb-3">
                  Aplikasi PanenDesa menjamin <strong>100% transparansi</strong>. Kapasitas {productInfo.stock.toLocaleString('id-ID')} {productInfo.unit} yang Anda lihat adalah hasil agregasi (penggabungan) dari beberapa petani lokal di {productInfo.village}.
                </p>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Sumber Komoditas:</span>
                    <div className="text-right">
                      <span className="font-medium text-gray-900 block">Gabungan 5 Petani Lokal</span>
                      <span className="text-xs text-gray-600 block mt-1">(Pak Budi, Ibu Siti, Mang Ujang, dkk)</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distribusi Dana (Petani):</span>
                    <span className="font-medium text-gray-900">95% (Dibayar Langsung)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Biaya Operasional Kopdes:</span>
                    <span className="font-medium text-gray-900">5% (Transparan)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic mt-3 pt-3 border-t border-green-100/50">
                  Dengan berbelanja di sini, Anda memotong rantai tengkulak dan langsung meningkatkan kesejahteraan petani desa secara adil.
                </p>
              </div>
            </div>

            </div>

            {/* Right Column: Checkout Card */}
            <div className="hidden md:block md:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4">
                
                <h3 className="font-bold text-gray-900 mb-4">Atur jumlah dan catatan</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border border-gray-300 rounded-lg h-9 w-28">
                    <button onClick={handleDecrease} className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-primary-dark transition-colors disabled:opacity-30">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 flex items-center justify-center font-semibold text-gray-900 text-sm">
                      {quantity}
                    </div>
                    <button onClick={handleIncrease} className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-primary-dark transition-colors disabled:opacity-30">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm">
                    Stok: <span className="font-bold text-gray-900">{productInfo.stock.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span>Pengiriman langsung dari petani.</span>
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={handleCheckout} className="w-full h-11 rounded-lg font-bold bg-primary-dark hover:bg-green-700 text-white">
                    Beli Langsung
                  </Button>
                  <Button variant="outline" className="w-full h-11 rounded-lg border-primary-dark text-primary-dark font-bold hover:bg-green-50">
                    + Keranjang
                  </Button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
