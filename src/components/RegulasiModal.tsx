import React from 'react';
import { X, Scale, BookOpen, FileText, CheckCircle2, ExternalLink } from 'lucide-react';

interface RegulasiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegulasiModal: React.FC<RegulasiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="bg-[#002B49] text-white p-5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0072B5] text-[#FFD100] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                LANDASAN HUKUM RESMI
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Regulasi &amp; Standar Layanan KIP PLN
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed">
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-sm text-[#002B49] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0072B5]" />
              Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
            </h4>
            <p>
              Menjamin hak warga negara untuk mengetahui rencana pembuatan kebijakan publik, program kebijakan publik, dan proses pengambilan keputusan publik, serta alasan pengambilan suatu keputusan publik di Badan Usaha Milik Negara (BUMN).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-sm text-[#002B49] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0072B5]" />
              Peraturan Komisi Informasi (Perki) No. 1 Tahun 2021
            </h4>
            <p>
              Mengatur Standar Layanan Informasi Publik, kategorisasi informasi berkala, serta merta, setiap saat, dan uji konsekuensi atas informasi yang dikecualikan dengan perlindungan kerahasiaan negara dan industri.
            </p>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2 text-slate-700">
            <h4 className="font-bold text-sm text-[#002B49]">
              Standar Waktu Layanan &amp; Batas SLA:
            </h4>
            <ul className="space-y-1.5 list-disc list-inside">
              <li><strong>Pemberitahuan Tertulis:</strong> Maksimal 10 (sepuluh) hari kerja sejak permohonan dinyatakan lengkap.</li>
              <li><strong>Perpanjangan Waktu:</strong> Dapat diperpanjang maksimal 7 (tujuh) hari kerja dengan alasan tertulis resmi.</li>
              <li><strong>Pengajuan Keberatan:</strong> Diajukan paling lambat 30 (tiga puluh) hari kerja setelah diterimanya tanggapan atau berakhirnya batas waktu.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#002B49] text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            Tutup Regulasi
          </button>
        </div>

      </div>
    </div>
  );
};
