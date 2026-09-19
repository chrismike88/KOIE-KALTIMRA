import React, { useState } from 'react';
import { HelpCircle, BarChart3, FolderOpen, Search, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  onScrollToSiklus: () => void;
  onScrollToDip: () => void;
  onSearchSubmit: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToSiklus,
  onScrollToDip,
  onSearchSubmit
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    } else {
      onScrollToDip();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#001D34] via-[#002B49] to-[#001827] text-white pt-10 pb-16 lg:py-20 border-b border-blue-900/50">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0072B5]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#FFD100]/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: PLN Officers Visual (.SVG Format, Transparent Cutout) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md flex flex-col items-center">
              {/* Soft ambient backlight behind officers */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Officers Cutout Figure Container - Clean SVG without Upload/Reset Buttons */}
              <div className="relative w-full flex flex-col items-center group">
                <img
                  src="/cover.svg"
                  alt="Petugas Layanan PPID PT PLN (Persero) UID Kaltimra"
                  className="w-full max-h-[500px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] select-none transform group-hover:scale-102 transition-transform duration-500 bg-transparent"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.src.endsWith('/cover.svg')) {
                      img.src = '/Petugas_PLN.svg';
                    } else if (img.src.endsWith('/Petugas_PLN.svg')) {
                      img.src = '/petugas-ppid.svg';
                    }
                  }}
                />

                {/* Floating pill: Desk Pelayanan Terbuka */}
                <div className="absolute top-1 left-2 bg-[#002B49]/85 hover:bg-[#002B49] backdrop-blur-md border border-blue-400/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg transition-all">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold tracking-wide text-white">
                    Desk Pelayanan Terbuka
                  </span>
                </div>
              </div>

              {/* Seamless Identity Badge Below Officers (No enclosing box) */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <div className="inline-flex items-center gap-2 bg-[#002B49]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-400/25 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span className="text-xs font-semibold text-white">
                    Petugas PPID & Lapangan
                  </span>
                  <span className="text-blue-300/40">•</span>
                  <span className="text-xs text-blue-200 font-medium">PLN UID Kaltimra</span>
                </div>
              </div>

              {/* Clean Trust Indicators without bounding box */}
              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span>Akuntabel</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span>Transparan</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span>Mudah Diakses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Content & Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Guide Pill Header */}
            <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors">
              <div className="w-4 h-4 rounded-full bg-[#0072B5] text-white flex items-center justify-center text-[10px] font-bold">
                ?
              </div>
              <span>PANDUAN INFORMASI PUBLIK</span>
            </div>

            {/* Main Headline with Roboto Bold */}
            <h1 className="font-roboto text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              LALU BAGAIMANA MEKANISME &amp; <br className="hidden sm:inline" />
              ALUR PERMINTAAN DATA DI <span className="text-[#FFD100]">PLN UID KALTIMRA?</span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Kini pemohon dapat mengakses data ketenagalistrikan Kalimantan Timur &amp; Kalimantan Utara secara cepat! Periksa ketersediaan berkas di dashboard atau ajukan formulir permohonan resmi dalam hitungan menit.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-siklus-button"
                onClick={onScrollToSiklus}
                className="inline-flex items-center gap-2.5 bg-[#001D34] hover:bg-[#002644] text-white text-sm font-semibold px-5 py-3 rounded-lg border border-blue-700/60 shadow-md transition-all hover:translate-y-[-1px]"
              >
                <BarChart3 className="w-4 h-4 text-[#FFD100]" />
                <span>Lihat Siklus Layanan Data</span>
              </button>

              <button
                id="hero-dip-button"
                onClick={onScrollToDip}
                className="inline-flex items-center gap-2.5 bg-white/95 hover:bg-white text-[#002B49] text-sm font-semibold px-5 py-3 rounded-lg shadow-md transition-all hover:translate-y-[-1px]"
              >
                <FolderOpen className="w-4 h-4 text-[#0072B5]" />
                <span>Jelajahi DIP Online</span>
              </button>
            </div>

            {/* Quick Search Bar */}
            <div className="pt-3 max-w-2xl">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center bg-white rounded-xl shadow-xl p-1.5 border-2 border-white/80 focus-within:border-[#FFD100] transition-colors">
                  <div className="pl-3 text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    id="hero-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari info publik, nomor registrasi, atau laporan kinerja..."
                    className="w-full bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
                  />
                  <button
                    id="hero-search-submit"
                    type="submit"
                    className="shrink-0 inline-flex items-center gap-2 bg-[#FFD100] hover:bg-[#F5C400] active:bg-[#E5B500] text-[#002B49] text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm transition-all"
                  >
                    <span>Cari Sekarang</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </form>

              {/* Quick suggestions */}
              <div className="flex items-center gap-2 mt-2.5 text-xs text-blue-200/90 flex-wrap">
                <span className="text-slate-400">Pencarian populer:</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery('Laporan Keuangan'); onSearchSubmit('Laporan Keuangan'); }}
                  className="hover:text-[#FFD100] underline underline-offset-2 transition-colors"
                >
                  Laporan Keuangan 2025
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery('RUPTL'); onSearchSubmit('RUPTL'); }}
                  className="hover:text-[#FFD100] underline underline-offset-2 transition-colors"
                >
                  RUPTL Kaltimra
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery('Rasio Elektrifikasi'); onSearchSubmit('Rasio Elektrifikasi'); }}
                  className="hover:text-[#FFD100] underline underline-offset-2 transition-colors"
                >
                  Rasio Elektrifikasi
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
