import React, { useState } from 'react';
import { Clock, Phone, Search, Lock, ChevronLeft, ChevronRight, Menu, X, CheckCircle2 } from 'lucide-react';
import { PlnLogo } from './PlnLogo';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  announcementIndex: number;
  onPrevAnnouncement: () => void;
  onNextAnnouncement: () => void;
}

export const ANNOUNCEMENTS = [
  'Unit Induk Distribusi Kalimantan Timur dan Kalimantan Utara',
  'Komitmen Keterbukaan Informasi Publik Menuju Era IKN Nusantara 2026',
  'Standar Layanan Informasi Publik Maksimal 10 Hari Kerja Sesuai UU No. 14/2008',
  'Integrasi Pelayanan Digital Satu Pintu & Kanal Respon Realtime PLN 123'
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenSearch,
  activeSection,
  onNavigate,
  announcementIndex,
  onPrevAnnouncement,
  onNextAnnouncement
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'layanan', label: 'Layanan Publik' },
    { id: 'alur', label: 'Alur & Siklus' },
    { id: 'formulir', label: 'E-Form PPID' },
    { id: 'lacak', label: 'Lacak Berkas' },
    { id: 'regulasi', label: 'Regulasi KIP' },
    { id: 'profil', label: 'Profil PPID' },
    { id: 'kontak', label: 'Kontak' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#001D34] shadow-md border-b border-blue-950/60 text-white">
      {/* 1. Topmost Utility Bar */}
      <div className="bg-[#001629] text-xs border-b border-blue-900/40 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Operational details */}
          <div className="flex items-center gap-4 text-slate-300 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>
                <strong className="text-white font-medium">Jam Layanan:</strong> Senin – Jumat (08.00 – 16.00 WITA)
              </span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>
                <strong className="text-white font-medium">Contact Center PLN:</strong> 123
              </span>
            </div>
          </div>

          {/* Right: Social icons & Lacak Berkas button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-slate-300">
              <a
                href="https://facebook.com/pln"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Facebook PLN UID Kaltimra"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="https://instagram.com/pln_kaltimra"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Instagram @pln_kaltimra"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="https://youtube.com/pln"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="YouTube PLN UID Kaltimra"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>YouTube</span>
              </a>
            </div>

            {/* Quick jump to tracking */}
            <button
              id="top-lacak-button"
              onClick={() => onNavigate('lacak')}
              className="flex items-center gap-1.5 text-xs text-blue-200 hover:text-white bg-blue-900/50 hover:bg-blue-800/60 px-2.5 py-1 rounded transition-colors border border-blue-700/40"
            >
              <Search className="w-3 h-3 text-[#FFD100]" />
              <span>Lacak Berkas</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate('beranda')}
          className="text-left focus:outline-hidden"
          title="Beranda PPID PLN UID Kaltimra"
        >
          <PlnLogo variant="light" size="md" />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  isActive
                    ? 'text-[#FFD100] font-semibold bg-blue-950/80 border-b-2 border-[#FFD100]'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            id="nav-search-trigger"
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Cari Informasi Publik atau Berkas"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Login PIC / Admin Button */}
          <button
            id="nav-admin-login-button"
            onClick={onOpenAdmin}
            className="flex items-center gap-2 bg-[#0072B5] hover:bg-[#0A558C] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-sm shadow-blue-900/30 border border-blue-400/30"
          >
            <Lock className="w-3.5 h-3.5 text-[#FFD100]" />
            <span className="hidden sm:inline">Login PIC / Admin</span>
            <span className="sm:hidden">Admin</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#001629] border-t border-blue-900/60 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
                activeSection === link.id
                  ? 'bg-blue-900/60 text-[#FFD100] font-bold'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* 3. Sub-banner / Notice Carousel Bar */}
      <div className="bg-[#002B49] text-xs border-t border-blue-900/50 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 text-blue-300 font-bold uppercase tracking-wider shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PORTAL RESMI PPID
            </span>
            <span className="text-blue-400 shrink-0">&gt;</span>
            <p className="text-slate-200 truncate font-medium">
              {ANNOUNCEMENTS[announcementIndex]}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              id="announcement-prev"
              onClick={onPrevAnnouncement}
              className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Pengumuman sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              id="announcement-next"
              onClick={onNextAnnouncement}
              className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Pengumuman selanjutnya"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
