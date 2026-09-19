import React, { useState } from 'react';
import { Headphones, MessageCircle, MapPin, Phone, Mail, Clock, X, ExternalLink } from 'lucide-react';

export const HelpdeskBanner: React.FC = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-r from-[#001D34] to-[#002B49] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-900/60">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#0072B5] text-white flex items-center justify-center shrink-0 shadow-lg border border-blue-400/30">
              <Headphones className="w-7 h-7 text-[#FFD100]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
                LAYANAN KONSULTASI &amp; DESK INFORMASI LANGSUNG
              </span>
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white mt-0.5">
                Butuh Bantuan Langsung dari Petugas PPID?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Kunjungi Desk Layanan Informasi Publik di Kantor PT PLN (Persero) UID Kaltimra atau hubungi petugas via WhatsApp resmi.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowChatModal(true)}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all hover:translate-y-[-1px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Hubungi WhatsApp PPID</span>
            </button>

            <button
              onClick={() => setShowLocationModal(true)}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-white/20 shadow-md transition-all hover:translate-y-[-1px]"
            >
              <MapPin className="w-4 h-4 text-[#FFD100]" />
              <span>Lokasi Kantor &amp; Peta</span>
            </button>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative space-y-4 animate-fade-in">
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0072B5] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-[#002B49]">
                  Kantor PT PLN (Persero) UID Kaltimra
                </h4>
                <p className="text-xs text-slate-500">Meja Layanan Informasi Publik (Lantai 1)</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                <strong>Alamat:</strong> Jl. M.T. Haryono No. 384, Kel. Gunung Samarinda, Kec. Balikpapan Utara, Kota Balikpapan, Kalimantan Timur 76114
              </p>
              <p>
                <strong>Jam Layanan Meja Informasi:</strong> Senin - Jumat, 08.00 - 16.00 WITA (Istirahat 12.00 - 13.00 WITA)
              </p>
              <p>
                <strong>Fasilitas:</strong> Ruang Baca DIP, Komputer Akses Mandiri, Konsultasi Petugas, Akses Disabilitas &amp; Jalur Ramah Kursi Roda.
              </p>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl text-center text-xs font-semibold text-slate-700">
              Koordinat: -1.2435, 116.8622 (Balikpapan)
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowLocationModal(false)}
                className="bg-[#002B49] text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Chat Simulator */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl relative space-y-4 animate-fade-in">
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-[#002B49]">
                  WhatsApp Resmi PPID PLN UID Kaltimra
                </h4>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Petugas Sedang Online (WITA)
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2.5 text-xs text-slate-700">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                Halo! Selamat datang di Layanan Informasi Publik PT PLN (Persero) UID Kaltimra. Ada yang dapat kami bantu mengenai permohonan data ketenagalistrikan Anda?
              </div>
              <p className="text-[11px] text-slate-400 text-right">09:30 WITA</p>
            </div>

            <div className="text-xs text-slate-500">
              Nomor Layanan: <strong>+62 811-5400-0123</strong> (Khusus Pelayanan KIP Kaltimra)
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowChatModal(false)}
                className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  alert('Membuka aplikasi WhatsApp dengan pesan awal ke Petugas PPID UID Kaltimra (+62 811-5400-0123)');
                  setShowChatModal(false);
                }}
                className="bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Mulai Chat Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
