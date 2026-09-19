import React, { useState } from 'react';
import { 
  FolderSearch, 
  Mail, 
  BarChart2, 
  SmilePlus, 
  Scale, 
  Info, 
  Calendar, 
  AlertTriangle, 
  FileCheck, 
  Lock, 
  ArrowRight, 
  Building2, 
  ChevronRight,
  Filter,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { DipDocument } from '../types';
import { UNITS } from '../data/mockData';

interface LayananInformasiPublikProps {
  documents: DipDocument[];
  onOpenCategoryDocs: (category: 'berkala' | 'serta_merta' | 'setiap_saat' | 'dikecualikan') => void;
  onNavigateToForm: () => void;
  onNavigateToSiklus: () => void;
}

type TabType = 'dip' | 'permohonan' | 'kinerja' | 'ikm' | 'keberatan';

export const LayananInformasiPublik: React.FC<LayananInformasiPublikProps> = ({
  documents,
  onOpenCategoryDocs,
  onNavigateToForm,
  onNavigateToSiklus
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dip');
  const [selectedUnit, setSelectedUnit] = useState('Semua Unit Pelaksana');

  // Count docs per category
  const berkalaCount = documents.filter(d => d.category === 'berkala').length;
  const sertaMertaCount = documents.filter(d => d.category === 'serta_merta').length;
  const setiapSaatCount = documents.filter(d => d.category === 'setiap_saat').length;
  const dikecualikanCount = documents.filter(d => d.category === 'dikecualikan').length;

  const tabs = [
    {
      id: 'dip' as TabType,
      title: 'Daftar Informasi Publik (DIP)',
      desc: 'Katalog berkas resmi',
      icon: FolderSearch,
      hasDot: true
    },
    {
      id: 'permohonan' as TabType,
      title: 'Permohonan Informasi',
      desc: 'Pengajuan data daring',
      icon: Mail,
      hasDot: false
    },
    {
      id: 'kinerja' as TabType,
      title: 'Laporan Layanan & Kinerja',
      desc: 'Laporan statistik tahunan',
      icon: BarChart2,
      hasDot: false
    },
    {
      id: 'ikm' as TabType,
      title: 'Layanan Kepuasan Masyarakat',
      desc: 'Survei IKM Keterbukaan',
      icon: SmilePlus,
      hasDot: false
    },
    {
      id: 'keberatan' as TabType,
      title: 'Pengajuan Keberatan',
      desc: 'Sengketa informasi publik',
      icon: Scale,
      hasDot: false
    }
  ];

  return (
    <section id="layanan" className="py-14 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0072B5] tracking-wider uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0072B5]" />
            <span>PORTAL KIP TERPADU</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#002B49] tracking-tight">
            Layanan Informasi Publik
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5">
            Klik pada menu di bawah ini untuk melihat detail dan tata cara masing-masing modul layanan.
          </p>
        </div>

        {/* Two Columns Grid: Left Menu, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Vertical Navigation Menu */}
          <div className="lg:col-span-4 space-y-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`layanan-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-white border-[#0072B5] shadow-md ring-2 ring-[#0072B5]/10'
                      : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-[#0072B5] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold truncate ${
                          isActive ? 'text-[#002B49]' : 'text-slate-800'
                        }`}>
                          {tab.title}
                        </span>
                        {tab.hasDot && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD100] ring-2 ring-[#002B49]/20 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {tab.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-[#0072B5] translate-x-1' : 'text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-8">
            {activeTab === 'dip' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
                
                {/* Panel Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0072B5] flex items-center justify-center">
                      <Info className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#002B49]">
                      Daftar Informasi Publik (DIP)
                    </h3>
                  </div>

                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0072B5] border border-blue-100">
                    Update: 2026
                  </span>
                </div>

                {/* Law Reference Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Salah satu kewajiban badan publik yang dinyatakan dalam <strong className="text-slate-800 font-semibold">Undang-Undang No. 14 Tahun 2008</strong> adalah menyediakan <em className="text-slate-800 font-medium">Daftar Informasi Publik (DIP)</em>. DIP adalah catatan yang berisi keterangan sistematis tentang informasi publik yang berada di bawah penguasaan badan publik. Melalui aplikasi PPID PLN UID Kaltimra, dokumen yang dikuasai dapat diakses secara transparan dan tersusun secara otomatis.
                </p>

                {/* Filter / Unit Picker Row */}
                <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="p-2 bg-[#FFD100] text-[#002B49] rounded-lg">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                      Pilih Filter Wilayah:
                    </span>
                  </div>

                  <div className="w-full sm:flex-1 relative">
                    <select
                      id="dip-unit-filter-select"
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="w-full bg-white text-xs sm:text-sm font-medium text-slate-800 border border-slate-300 rounded-lg px-3 py-2 focus:outline-hidden focus:border-[#0072B5] focus:ring-1 focus:ring-[#0072B5]"
                    >
                      {UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u === 'Semua Unit Pelaksana' ? 'Unit Pelaksana (UP3/ULP) — Seluruh Wilayah Kaltimra' : u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4 Category Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* 1. Informasi Berkala */}
                  <div className="p-5 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/40 to-white hover:border-[#0072B5]/50 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0072B5] flex items-center justify-center">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[#0072B5] bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                          142 Berkas
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#002B49] mb-1.5">
                        Informasi Berkala
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Profil PLN UID Kaltimra, laporan keuangan teraudit, agenda kegiatan umum, serta program kelistrikan.
                      </p>
                    </div>

                    <button
                      id="card-open-berkala"
                      onClick={() => onOpenCategoryDocs('berkala')}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0072B5] hover:text-[#002B49] group-hover:translate-x-1 transition-all text-left"
                    >
                      <span>Buka Dokumen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 2. Informasi Serta Merta */}
                  <div className="p-5 rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50/40 to-white hover:border-amber-400 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                          38 Berkas
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#002B49] mb-1.5">
                        Informasi Serta Merta
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Peringatan bahaya kelistrikan, mitigasi bencana cuaca ekstrem, dan informasi pemeliharaan darurat jaringan.
                      </p>
                    </div>

                    <button
                      id="card-open-serta-merta"
                      onClick={() => onOpenCategoryDocs('serta_merta')}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 group-hover:translate-x-1 transition-all text-left"
                    >
                      <span>Buka Dokumen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 3. Tersedia Setiap Saat */}
                  <div className="p-5 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-white hover:border-emerald-400 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          210 Berkas
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#002B49] mb-1.5">
                        Tersedia Setiap Saat
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        SOP operasional, daftar regulasi internal, data statistik rasio elektrifikasi desa, dan pedoman pengadaan.
                      </p>
                    </div>

                    <button
                      id="card-open-setiap-saat"
                      onClick={() => onOpenCategoryDocs('setiap_saat')}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-950 group-hover:translate-x-1 transition-all text-left"
                    >
                      <span>Buka Dokumen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4. Informasi Dikecualikan */}
                  <div className="p-5 rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50/40 to-white hover:border-rose-400 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                          <Lock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          Uji Konsekuensi
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#002B49] mb-1.5">
                        Informasi Dikecualikan
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Data rahasia korporasi, rahasia negara, keamanan siber kelistrikan melalui proses Uji Konsekuensi resmi.
                      </p>
                    </div>

                    <button
                      id="card-open-dikecualikan"
                      onClick={() => onOpenCategoryDocs('dikecualikan')}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-950 group-hover:translate-x-1 transition-all text-left"
                    >
                      <span>Lihat Berita Acara</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            )}

            {activeTab === 'permohonan' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0072B5] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#002B49]">
                    Layanan Permohonan Informasi Online
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Apabila informasi yang Anda cari belum tercantum di dalam katalog Daftar Informasi Publik (DIP), Anda dapat mengajukan permohonan resmi secara mandiri melalui E-Form PPID.
                </p>
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-[#002B49]">
                    <CheckCircle2 className="w-4 h-4 text-[#0072B5]" />
                    <span>Jaminan Standar Waktu Layanan:</span>
                  </div>
                  <p>
                    Sesuai Peraturan Komisi Informasi (Perki) No. 1 Tahun 2021, permohonan informasi akan ditanggapi paling lambat dalam waktu <strong>10 hari kerja</strong>, dan dapat diperpanjang selama 7 hari kerja dengan pemberitahuan resmi tertulis.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={onNavigateToForm}
                    className="inline-flex items-center gap-2 bg-[#0072B5] hover:bg-[#0A558C] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all"
                  >
                    <span>Buka Formulir Permohonan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'kinerja' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#002B49]">
                    Laporan Layanan &amp; Kinerja PPID
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Publikasi berkala mengenai rekapitulasi jumlah permohonan informasi, rata-rata waktu respon disposisi bidang, dan persentase penyelesaian sengketa di lingkungan PLN UID Kaltimra.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-2xl font-display font-extrabold text-[#002B49]">98.4%</span>
                    <p className="text-xs text-slate-500 mt-1">Tingkat Kepatuhan SLA</p>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-2xl font-display font-extrabold text-[#0072B5]">4.2 Hari</span>
                    <p className="text-xs text-slate-500 mt-1">Rata-rata Respon Data</p>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-2xl font-display font-extrabold text-emerald-600">390+</span>
                    <p className="text-xs text-slate-500 mt-1">Permohonan Terselesaikan</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenCategoryDocs('berkala')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0072B5] hover:text-[#002B49]"
                >
                  <span>Unduh Laporan Tahunan Kinerja PPID (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {activeTab === 'ikm' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                    <SmilePlus className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#002B49]">
                    Indeks Kepuasan Masyarakat (IKM)
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bantu kami meningkatkan mutu pelayanan publik PLN UID Kaltimra dengan memberikan ulasan dan penilaian transparan terhadap pengalaman Anda mengakses data.
                </p>
                <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-900 uppercase">Skor IKM Keterbukaan 2025</span>
                    <p className="text-xl font-bold text-amber-950 font-display mt-0.5">3.88 / 4.00 (Kategori: SANGAT BAIK)</p>
                  </div>
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            )}

            {activeTab === 'keberatan' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#002B49]">
                    Pengajuan Keberatan Informasi Publik
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pemohon berhak mengajukan keberatan apabila permohonan ditolak tanpa alasan sah, informasi tidak ditanggapi melebihi batas waktu maksimal UU KIP, atau biaya yang dikenakan tidak wajar.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
                  <p className="font-semibold text-[#002B49]">Alur Penanganan Keberatan:</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600">
                    <li>Pengajuan keberatan disampaikan ke Atasan PPID dalam 30 hari kerja.</li>
                    <li>Atasan PPID memberikan tanggapan tertulis maksimal 30 hari kerja.</li>
                    <li>Jika belum tercapai kesepakatan, pemohon dapat melanjutkan ke Komisi Informasi Provinsi Kaltim.</li>
                  </ol>
                </div>
                <button
                  onClick={onNavigateToSiklus}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0072B5] hover:text-[#002B49]"
                >
                  <span>Pelajari Diagram Alur Sengketa &amp; Penolakan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
