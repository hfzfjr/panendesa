"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  Search,
  ChevronDown,
  BookOpen,
  MessageCircleQuestion,
  FileText
} from "lucide-react";

export default function KopdesBantuanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      question: "Bagaimana cara kerja teknologi AI Grading saat Intake?",
      answer: "Teknologi AI Grading PanenDesa menggunakan kamera untuk memindai hasil panen secara otomatis. Saat petani datang, klik tombol 'Proses' di menu Daftar Antrean, lalu unggah/foto 3 sampel komoditas. Sistem akan mendeteksi tingkat kualitas (Grade A, B, atau C) berdasarkan kecerahan, ukuran, dan cacat fisik dalam hitungan detik."
    },
    {
      id: 2,
      question: "Apa itu Smart Split dan bagaimana mekanismenya?",
      answer: "Smart Split adalah fitur bagi hasil otomatis yang ditenagai oleh Smart Contract. Saat pembeli mentransfer dana ke rekening bersama PanenDesa, dana tersebut akan dipecah secara otomatis: 97.5% langsung masuk ke rekening e-Wallet para petani yang menyumbang stok, dan 2.5% masuk ke kas Koperasi sebagai fee operasional. Semua tercatat transparan tanpa campur tangan manual."
    },
    {
      id: 3,
      question: "Bagaimana jika stok di gudang tidak mencukupi untuk memenuhi pesanan?",
      answer: "Sistem tidak akan mengizinkan Anda untuk menerima pesanan (Konfirmasi Harga) jika volume pesanan melebihi stok aktual yang tersedia di menu 'Stok & Kapasitas Gudang'. Anda harus menunggu *Intake* baru dari petani hingga kuota tercukupi."
    },
    {
      id: 4,
      question: "Siapa yang bertanggung jawab mencari armada logistik?",
      answer: "Pihak Koperasi (Kopdes) bertanggung jawab untuk menugaskan armada dan kurir. Anda dapat mengelolanya melalui menu 'Logistik' dengan memilih pesanan yang berstatus 'Siap Kirim'."
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-primary-dark tracking-tight">
          Pusat Bantuan & Panduan
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base max-w-lg mx-auto">
          Temukan jawaban atas pertanyaan Anda dan pelajari cara memaksimalkan fitur PanenDesa untuk Koperasi.
        </p>

        <div className="relative max-w-lg mx-auto mt-6">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Ketik pertanyaan Anda di sini..." 
            className="w-full bg-white border border-gray-200 focus:border-primary-dark focus:ring-1 focus:ring-primary-dark shadow-sm rounded-full pl-12 pr-4 py-3.5 text-sm font-medium transition-colors outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Links */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs">Kategori Bantuan</h3>
            
            <button className="w-full flex items-center gap-3 text-left p-2 rounded-lg hover:bg-green-50 text-primary-dark font-bold text-sm transition-colors group">
              <MessageCircleQuestion className="w-5 h-5 text-primary-dark" />
              Pertanyaan Umum (FAQ)
            </button>
            <button className="w-full flex items-center gap-3 text-left p-2 rounded-lg hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors group">
              <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-primary-dark" />
              Buku Panduan PDF
            </button>
            <button className="w-full flex items-center gap-3 text-left p-2 rounded-lg hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors group">
              <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary-dark" />
              Syarat & Ketentuan
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#117A3E] to-[#0c592d] rounded-2xl p-5 shadow-sm text-white text-center space-y-3">
            <h3 className="font-bold text-lg">Butuh Bantuan Langsung?</h3>
            <p className="text-xs text-green-100 leading-relaxed">Tim dukungan kami siap membantu mengatasi kendala operasional Anda.</p>
            <button className="w-full bg-white text-[#117A3E] font-bold py-2 rounded-xl text-sm shadow-sm mt-2">
              Hubungi CS via WhatsApp
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pertanyaan Sering Diajukan (FAQ)</h2>
          
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className={`bg-white rounded-2xl border ${isOpen ? 'border-[#117A3E] ring-1 ring-[#117A3E]' : 'border-gray-200'} shadow-sm overflow-hidden transition-all`}>
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className={`font-bold text-sm md:text-base ${isOpen ? 'text-primary-dark' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-primary-dark' : ''}`} />
                  </button>
                  
                  <div 
                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="w-full h-px bg-gray-100 mb-4"></div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
