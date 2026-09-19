import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Search, 
  HelpCircle, 
  FileText, 
  DownloadCloud, 
  Send, 
  FileCode, 
  Bell, 
  UserCheck, 
  Check, 
  X, 
  Clock, 
  Zap, 
  AlertCircle,
  Share2,
  FileSpreadsheet,
  Lock,
  ExternalLink
} from 'lucide-react';

interface SiklusLayananProps {
  onNavigateToForm: () => void;
  onNavigateToDip: () => void;
}

export const SiklusLayanan: React.FC<SiklusLayananProps> = ({
  onNavigateToForm,
  onNavigateToDip
}) => {
  return (
    <section id="alur" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Master Header Card (Deep Navy) */}
        <div className="bg-[#002B49] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-blue-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0072B5] text-white flex items-center justify-center shrink-0 shadow-inner">
              <Building2 className="w-6 h-6 text-[#FFD100]" />
            </div>
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-200">
                STANDAR OPERASIONAL PROSEDUR
              </div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
                SIKLUS LAYANAN PERMINTAAN DATA PPID PLN UID KALTIMRA
              </h2>
            </div>
          </div>

          {/* Right Verification Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-xl shadow-xs shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Alur Resmi Kemen-BUMN &amp; KIP</span>
          </div>
        </div>

        {/* STEP 01: CARI DATA DI DASHBOARD */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#002B49] text-white flex items-center justify-center text-xs font-bold font-display">
                01
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#002B49] uppercase tracking-tight">
                  CARI DATA DI DASHBOARD
                </h3>
                <p className="text-xs text-slate-500">
                  Cek terlebih dahulu data yang tersedia di dashboard PPID PLN UID Kaltimra
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Jalur Cepat (Self-Service)</span>
            </div>
          </div>

          {/* 4 Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Sub-stage 1: Clickable link to https://ppid-kaltimra.vercel.app/ */}
            <a
              href="https://ppid-kaltimra.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              title="Buka Dashboard PPID Kaltimra (https://ppid-kaltimra.vercel.app/)"
              className="bg-white hover:bg-blue-50/40 p-4 rounded-xl border border-slate-200 hover:border-[#0072B5] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center justify-between min-h-[170px] group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 group-hover:bg-[#0072B5] text-[#0072B5] group-hover:text-white flex items-center justify-center mb-2 transition-colors shadow-xs">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#0072B5] uppercase tracking-wider block mb-1 flex items-center justify-center gap-1">
                  TAHAP 1 <ExternalLink className="w-3 h-3" />
                </span>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-[#002B49] leading-snug">
                  Pemohon mencari data di dashboard PPID PLN UID Kaltimra
                </p>
              </div>
              <div className="mt-2 text-[10px] font-semibold text-[#0072B5] bg-blue-50 group-hover:bg-blue-100/90 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors">
                <span>Buka Dashboard PPID</span>
                <span>↗</span>
              </div>
            </a>

            {/* Sub-stage 2: Data Tersedia? Decision */}
            <div className="bg-[#0072B5] text-white p-4 rounded-xl border border-blue-600 flex flex-col items-center text-center justify-between min-h-[170px] shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-100">
                DATA TERSEDIA?
              </span>
              
              <div className="flex items-center gap-2 my-2">
                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" /> Ya
                </span>
                <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                  <X className="w-3 h-3 stroke-[3]" /> Tidak
                </span>
              </div>

              <p className="text-[11px] text-blue-100/90 leading-tight">
                Jika tidak, lanjut ke Tahap 02
              </p>
            </div>

            {/* Sub-stage 3 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center justify-between min-h-[170px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0072B5] flex items-center justify-center mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  TAHAP 2
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  Pemohon melengkapi formulir data diri singkat
                </p>
              </div>
              <div className="mt-2 text-[10px] text-slate-400 font-medium">
                Verifikasi identitas
              </div>
            </div>

            {/* Sub-stage 4: Selesai */}
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 flex flex-col items-center text-center justify-between min-h-[170px]">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs">
                <DownloadCloud className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider block mb-1">
                  SELESAI
                </span>
                <p className="text-xs font-bold text-emerald-950 leading-snug">
                  Pemohon langsung mengunduh data yang tersedia
                </p>
              </div>
              <button
                onClick={onNavigateToDip}
                className="mt-2 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
              >
                Katalog DIP Online
              </button>
            </div>

          </div>
        </div>

        {/* STEP 02: AJUKAN PERMOHONAN INFORMASI */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0072B5] text-white flex items-center justify-center text-xs font-bold font-display">
                02
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#002B49] uppercase tracking-tight">
                  AJUKAN PERMOHONAN INFORMASI
                </h3>
                <p className="text-xs text-slate-500">
                  Jika data tidak tersedia pada katalog, ajukan melalui form permohonan resmi
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Waktu Layanan: 1 - 3 Hari Kerja</span>
            </div>
          </div>

          {/* 5 Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            
            {/* Card 1: Informasi Berkala */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between min-h-[165px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0072B5] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#0072B5] bg-blue-50 px-2 py-0.5 rounded-full">
                    142 Berkas
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#002B49] mb-1">
                  Informasi Berkala
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Profil PLN UID Kaltimra, laporan keuangan teraudit, agenda kegiatan umum.
                </p>
              </div>
              <button
                onClick={onNavigateToDip}
                className="text-[11px] font-bold text-[#0072B5] hover:underline mt-2 text-left"
              >
                Buka Dokumen &rarr;
              </button>
            </div>

            {/* Card 2: Langkah 2 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center justify-between min-h-[165px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0072B5] flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Langkah 2
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  Kirim formulir (Submit daring via portal)
                </p>
              </div>
              <button
                onClick={onNavigateToForm}
                className="text-[10px] font-bold text-[#0072B5] hover:underline"
              >
                Buka Form Online
              </button>
            </div>

            {/* Card 3: Langkah 3 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center justify-between min-h-[165px]">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                <FileCode className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Langkah 3
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  Nomor registrasi terbit otomatis &amp; dikirim via email
                </p>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">
                Tiket resmi QR
              </span>
            </div>

            {/* Card 4: Langkah 4 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center justify-between min-h-[165px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0072B5] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Langkah 4
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  Notifikasi diterima PIC Admin PPID Kaltimra
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                Notif multi-channel
              </span>
            </div>

            {/* Card 5: Langkah 5 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center justify-between min-h-[165px]">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Langkah 5
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  Admin memverifikasi kelengkapan berkas
                </p>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">
                KTP &amp; Syarat KIP
              </span>
            </div>

          </div>
        </div>

        {/* STEP 03: TINDAK LANJUT PERMOHONAN */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          {/* Header Row */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80">
            <div className="w-8 h-8 rounded-full bg-[#FFD100] text-[#002B49] flex items-center justify-center text-xs font-extrabold font-display">
              03
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#002B49] uppercase tracking-tight">
                TINDAK LANJUT PERMOHONAN
              </h3>
              <p className="text-xs text-slate-500">
                Proses tindak lanjut oleh PIC Admin PPID dan Bidang Unit Pelaksana sesuai hasil verifikasi
              </p>
            </div>
          </div>

          {/* Dual Decision Branches */}
          <div className="space-y-6">
            
            {/* 1. Branch: CABANG DISETUJUI */}
            <div className="rounded-2xl border-2 border-emerald-500 bg-white p-5 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
                    CABANG: DISETUJUI
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-900">
                    Permohonan diproses untuk penyediaan data oleh bidang teknis terkait
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Tahap Resmi Selesai
                </span>
              </div>

              {/* 5 sub-steps inside CABANG: DISETUJUI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-[#002B49] block mb-1">
                    3a. Disposisi Bidang
                  </span>
                  <p className="text-xs text-slate-600">
                    Admin PPID meneruskan ke PIC Bidang terkait.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-[#002B49] block mb-1">
                    3b. PIC Menerima Notif
                  </span>
                  <p className="text-xs text-slate-600">
                    Bidang teknis menerima permintaan di dashboard.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-[#002B49] block mb-1">
                    3c. Menyiapkan Data
                  </span>
                  <p className="text-xs text-slate-600">
                    PIC Bidang menyiapkan dan mengunggah berkas.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-[#002B49] block mb-1">
                    3d. Surat Jawaban
                  </span>
                  <p className="text-xs text-slate-600">
                    Admin membuat surat pengantar resmi &amp; balasan.
                  </p>
                </div>

                {/* 3e. Pengiriman (Solid Emerald Card matching screenshot) */}
                <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>3e. Pengiriman</span>
                  </div>
                  <p className="text-[11px] text-emerald-50 mt-1 leading-tight">
                    Petugas mengirimkan berkas data ke email pemohon.
                  </p>
                </div>

              </div>
            </div>

            {/* 2. Branch: CABANG DITOLAK */}
            <div className="rounded-2xl border-2 border-rose-500 bg-white p-5 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
                    CABANG: DITOLAK
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-rose-900">
                    Informasi yang dimohon masuk ke dalam daftar informasi yang dikecualikan
                  </span>
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Uji Konsekuensi UU KIP
                </span>
              </div>

              {/* 3 sub-steps inside CABANG: DITOLAK */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    1. Buat Surat Penolakan
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Admin menyusun surat penolakan disertai alasan hukum &amp; Uji Konsekuensi.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    2. Upload ke Dashboard
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Surat penolakan diunggah ke sistem PPID UID Kaltimra.
                  </p>
                </div>

                {/* 3. Pemohon Terima Notifikasi (Solid Red Card matching screenshot) */}
                <div className="p-3.5 bg-rose-600 text-white rounded-xl shadow-xs flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Lock className="w-4 h-4 text-rose-200" />
                    <span>3. Pemohon Terima Notifikasi</span>
                  </div>
                  <p className="text-[11px] text-rose-50 mt-1 leading-tight">
                    Pemohon menerima surat keputusan resmi dan hak pengajuan keberatan.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
