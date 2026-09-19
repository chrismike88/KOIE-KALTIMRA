import React from 'react';
import { PlnLogo } from './PlnLogo';
import { MapPin, Phone, Mail, Clock, ExternalLink, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDipCategory: (category: 'berkala' | 'serta_merta' | 'setiap_saat' | 'dikecualikan') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDipCategory }) => {
  return (
    <footer className="bg-[#001629] text-slate-300 border-t border-blue-900/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Office Details */}
          <div className="space-y-4">
            <PlnLogo variant="light" size="md" />
            <p className="text-slate-300 text-xs leading-relaxed">
              Pejabat Pengelola Informasi dan Dokumentasi (PPID) PT PLN (Persero) Unit Induk Distribusi Kalimantan Timur dan Kalimantan Utara.
            </p>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFD100] shrink-0 mt-0.5" />
                <span>Jl. M.T. Haryono No. 384, Balikpapan Utara, Kota Balikpapan, Kalimantan Timur 76114</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD100] shrink-0" />
                <span>Contact Center: 123 | (0542) 871123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFD100] shrink-0" />
                <span>ppid.kaltimra@pln.co.id</span>
              </div>
            </div>
          </div>

          {/* Col 2: Kategori Informasi Publik */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Kategori Informasi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenDipCategory('berkala')}
                  className="hover:text-[#FFD100] transition-colors text-left"
                >
                  Informasi Berkala (142 Berkas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDipCategory('serta_merta')}
                  className="hover:text-[#FFD100] transition-colors text-left"
                >
                  Informasi Serta Merta (38 Berkas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDipCategory('setiap_saat')}
                  className="hover:text-[#FFD100] transition-colors text-left"
                >
                  Tersedia Setiap Saat (210 Berkas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDipCategory('dikecualikan')}
                  className="hover:text-[#FFD100] transition-colors text-left text-rose-300"
                >
                  Informasi Dikecualikan (Uji Konsekuensi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('layanan')}
                  className="hover:text-[#FFD100] transition-colors text-left"
                >
                  Laporan Tahunan Kinerja PPID
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan & Regulasi */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Layanan &amp; Regulasi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('formulir')}
                  className="hover:text-[#FFD100] transition-colors text-left"
                >
                  E-Formulir Permohonan Informasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lacak')}
                  className="hover:text-[#FFD100] transition-colors text-left"
                >
                  Lacak Berkas &amp; Status Tiket
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alur')}
                  className="hover:text-[#FFD100] transition-colors text-left"
                >
                  Siklus &amp; Alur Permohonan SOP
                </button>
              </li>
              <li>
                <a
                  href="https://komisiinformasi.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFD100] transition-colors inline-flex items-center gap-1"
                >
                  <span>UU No. 14 Tahun 2008 (KIP)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-slate-400">
                  Peraturan Komisi Informasi No. 1/2021
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Jam Operasional & Layanan Terpadu */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Jam Operasional &amp; 123
            </h4>
            <div className="p-3.5 bg-[#001D34] rounded-xl border border-blue-900/50 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Clock className="w-4 h-4 text-[#FFD100]" />
                <span>Senin – Jumat</span>
              </div>
              <p className="text-slate-300">
                08.00 – 16.00 WITA <br />
                (Istirahat: 12.00 – 13.00 WITA)
              </p>
              <div className="pt-1 text-[11px] text-[#FFD100] font-semibold">
                Layanan Digital Online 24 Jam Non-Stop
              </div>
            </div>

            <div className="pt-1">
              <span className="text-slate-400 block mb-1">Unduh Aplikasi Pelanggan:</span>
              <div className="flex items-center gap-2">
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-white font-medium">
                  Google Play Store
                </span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-white font-medium">
                  App Store
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-blue-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-center sm:text-left">
          <p>
            &copy; 2026 PT PLN (Persero) Unit Induk Distribusi Kalimantan Timur dan Kalimantan Utara. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-2 text-[#FFD100] font-medium text-[11px]">
            <Shield className="w-3.5 h-3.5" />
            <span>Keterbukaan Informasi Publik Menuju Indonesia Maju &amp; IKN Nusantara</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
