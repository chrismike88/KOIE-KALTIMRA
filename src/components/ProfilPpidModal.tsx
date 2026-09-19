import React from 'react';
import { X, Users, Award, Shield, CheckCircle2 } from 'lucide-react';

interface ProfilPpidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilPpidModal: React.FC<ProfilPpidModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="bg-[#002B49] text-white p-5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0072B5] text-[#FFD100] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                STRUKTUR &amp; MAKLUMAT RESMI
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Profil PPID PT PLN (Persero) UID Kaltimra
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed">
          
          {/* Maklumat Pelayanan */}
          <div className="p-4 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              Maklumat Pelayanan Informasi Publik
            </span>
            <blockquote className="italic font-medium text-slate-800 text-sm border-l-3 border-amber-500 pl-3">
              "Kami Berkomitmen Memberikan Pelayanan Informasi Publik yang Cepat, Tepat Waktu, Biaya Ringan atau Proporsional, Transparan, dan Akuntabel Berlandaskan Asas Tata Kelola Perusahaan yang Baik (Good Corporate Governance)."
            </blockquote>
          </div>

          {/* Susunan Tim PPID UID Kaltimra */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#002B49]">
              Struktur Organisasi PPID UID Kaltimra:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Atasan PPID</span>
                <strong className="text-slate-800 text-sm">General Manager UID Kaltimra</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Penanggung Jawab Tertinggi Layanan KIP Wilayah</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">PPID Pelaksana</span>
                <strong className="text-slate-800 text-sm">Senior Manager Komunikasi &amp; Umum</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Koordinator Pelayanan &amp; Publikasi Digital</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Tim Pertimbangan Hukum</span>
                <strong className="text-slate-800 text-sm">Manager Hukum &amp; Kepatuhan</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Penguji Konsekuensi &amp; Penanganan Sengketa</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Tim PIC Pengolah Data</span>
                <strong className="text-slate-800 text-sm">Manajer Bidang Distribusi, Niaga, REN, TJSL</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Penyedia Berkas Teknis Ketenagalistrikan</p>
              </div>
            </div>
          </div>

          {/* Wilayah Kerja */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-sm text-[#002B49]">
              Wilayah Kerja Layanan Terpadu:
            </h4>
            <p>
              Meliputi seluruh Provinsi <strong>Kalimantan Timur</strong> (Balikpapan, Samarinda, Bontang, Kutai Kartanegara, Kutai Timur, Kutai Barat, Mahakam Ulu, Berau, Paser, Penajam Paser Utara / IKN) dan Provinsi <strong>Kalimantan Utara</strong> (Tarakan, Bulungan, Malinau, Nunukan, Tana Tidung).
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#002B49] text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            Tutup Profil
          </button>
        </div>

      </div>
    </div>
  );
};
