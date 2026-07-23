"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, MapPin, Truck, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

// Dummy data for the product (In real app, we'd fetch this based on params.id)
const productInfo = {
  id: "1",
  name: "Cabai Merah Keriting",
  price: "Rp 35.000",
  unit: "kg",
  village: "Desa Sukamaju",
  farmer: "Kopdes Tani Makmur",
  rating: 4.8,
  sold: "1.2rb",
  stock: 250,
  description: "Cabai merah keriting kualitas super yang ditanam oleh Kelompok Tani Makmur di Desa Sukamaju. Ditanam menggunakan pupuk organik tanpa pestisida kimia yang berbahaya. Dipanen pada tingkat kematangan optimal sehingga menghasilkan rasa pedas yang khas dan warna merah cerah. Cocok untuk kebutuhan rumah tangga maupun restoran.",
  image: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588012674991-88fc40632cd2?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop"
  ]
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < productInfo.stock) setQuantity(quantity + 1);
  };

  return (
    <main className="max-w-7xl mx-auto pb-24 md:pb-12 min-h-screen bg-gray-100 md:bg-transparent">

      {/* Floating Back Button (Mobile Only) */}
      <Link href="/pembeli/marketplace" className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/40 rounded-full transition-colors shadow-sm">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0 md:gap-8 lg:gap-10 md:py-8 lg:px-8">

        {/* Left Column: Images */}
        <div className="lg:col-span-4 md:col-span-1 bg-white md:bg-transparent">
          <div className="">
            {/* Main Image */}
            <div className="w-full aspect-square md:rounded-2xl overflow-hidden bg-gray-200">
              <img src={productInfo.images[activeImage]} alt={productInfo.name} className="w-full h-full object-cover" />
            </div>

            {/* Thumbnail Images (Desktop & Scrollable Mobile) */}
            <div className="flex gap-3 px-4 md:px-0 py-4 md:py-4 overflow-x-auto scrollbar-hide bg-white md:bg-transparent">
              {productInfo.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary-dark' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Details */}
        <div className="lg:col-span-5 md:col-span-1 flex flex-col gap-2 md:gap-6 bg-transparent">

          {/* Desktop Back Button */}
          <Link href="/pembeli/marketplace" className="hidden md:inline-flex items-center gap-2 text-gray-500 hover:text-primary-dark font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Pasar
          </Link>

          {/* BLOCK 1: Product Header Info */}
          <div className="bg-white p-4 md:p-0 md:bg-transparent rounded-none md:rounded-none shadow-sm md:shadow-none">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-800 border border-green-200 text-xs font-bold px-2 py-1 rounded-md">Panen Segar</span>
            </div>

            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 leading-snug">
              {productInfo.name}
            </h1>

            <div className="text-3xl font-extrabold text-primary-dark mb-3">
              {productInfo.price} <span className="text-base font-medium text-gray-500">/{productInfo.unit}</span>
            </div>

            <div className="flex items-center gap-4 text-sm pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-gray-700">{productInfo.rating}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <span className="text-gray-600">Terjual <span className="font-bold text-gray-900">{productInfo.sold}</span></span>
            </div>
          </div>

          {/* BLOCK 2: Farmer/Village Profile */}
          <div className="bg-white p-4 md:p-6 md:rounded-2xl md:border border-gray-200 shadow-sm md:shadow-none">
            <Link href="#" className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                  <img src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=100&auto=format&fit=crop" alt="Petani" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-dark transition-colors">{productInfo.farmer}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{productInfo.village}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-dark transition-colors" />
            </Link>
          </div>

          {/* BLOCK 3: Description */}
          <div className="bg-white p-4 md:p-0 md:bg-transparent rounded-none shadow-sm md:shadow-none mb-2 md:mb-0">
            <h3 className="font-bold text-gray-900 text-lg mb-3">Detail Komoditas</h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {productInfo.description}
            </p>
          </div>

        </div>

        {/* Right Column: Sticky Checkout Panel (Desktop) & Fixed Bottom (Mobile) */}
        <div className="lg:col-span-3 lg:block">
          <div className="fixed bottom-0 left-0 right-0 md:sticky md:top-24 bg-white md:rounded-2xl md:border border-t border-gray-200 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:shadow-sm z-40">

            <h3 className="font-bold text-gray-900 text-lg mb-4 hidden md:block">Atur Pembelian</h3>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden h-10 md:h-11">
                <button
                  onClick={handleDecrease}
                  className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 h-full flex items-center justify-center font-bold text-gray-900 border-x border-gray-300 text-sm">
                  {quantity}
                </div>
                <button
                  onClick={handleIncrease}
                  className="w-10 h-full flex items-center justify-center text-primary-dark hover:bg-green-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5">Sisa Stok</p>
                <p className="font-bold text-gray-900 text-sm"><span className="text-primary-dark">{productInfo.stock}</span> {productInfo.unit}</p>
              </div>
            </div>

            <div className="items-center gap-2 text-xs text-gray-600 mb-5 bg-gray-50 p-2.5 rounded-lg border border-gray-100 hidden md:flex">
              <Truck className="w-4 h-4 shrink-0 text-primary-dark" />
              <span className="leading-snug">Pengiriman langsung dari Desa Sukamaju</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 md:gap-3">
              <Button variant="custom" className="flex-none w-12 md:w-auto md:flex-1 md:px-0 h-11 md:h-12 rounded-xl bg-white border-2 border-primary-dark text-primary-dark hover:bg-green-50 font-bold transition-colors flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Keranjang</span>
              </Button>
              <Link href="/pembeli/checkout" className="flex-1">
                <Button className="w-full h-11 md:h-12 rounded-xl bg-(--color-primary-dark) hover:bg-(--color-primary) text-white font-bold text-sm md:text-base transition-all shadow-md">
                  Beli Langsung
                </Button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
