import React, { useState } from 'react';
import { X, Search, FileText, Download, Lock, Calendar, Filter, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DipDocument } from '../types';
import { UNITS } from '../data/mockData';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DipDocument[];
  initialCategory?: 'berkala' | 'serta_merta' | 'setiap_saat' | 'dikecualikan' | 'all';
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  documents,
  initialCategory = 'all'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('Semua Unit Pelaksana');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = activeCategory === 'all' || doc.category === activeCategory;
    const matchesUnit = selectedUnit === 'Semua Unit Pelaksana' || doc.unit === selectedUnit;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesUnit && matchesSearch;
  });

  const handleDownload = (doc: DipDocument) => {
    if (doc.isRestricted) {
      alert(`Pemberitahuan: "${doc.title}" adalah Informasi yang Dikecualikan berdasarkan ${doc.legalBasis}. Untuk mendapatkan ringkasan publik atau mengajukan uji materi, silakan ajukan formulir sengketa/keberatan.`);
      return;
    }
    setDownloadSuccessMessage(`Mengunduh ${doc.code}: ${doc.title} (${doc.fileSize})`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#002B49] text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0072B5] text-[#FFD100] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
                KATALOG DIGITAL DIP ONLINE
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Daftar Informasi Publik (DIP) PLN UID Kaltimra
              </h3>
            </div>
          </div>

          <button
            id="close-doc-modal-btn"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari judul berkas, nomor kode dokumen, atau kata kunci..."
                className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0072B5]"
              />
            </div>

            {/* Unit Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Semua Berkas ({documents.length})
            </button>
            <button
              onClick={() => setActiveCategory('berkala')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeCategory === 'berkala'
                  ? 'bg-[#0072B5] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Informasi Berkala
            </button>
            <button
              onClick={() => setActiveCategory('serta_merta')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeCategory === 'serta_merta'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Serta Merta
            </button>
            <button
              onClick={() => setActiveCategory('setiap_saat')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeCategory === 'setiap_saat'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Setiap Saat
            </button>
            <button
              onClick={() => setActiveCategory('dikecualikan')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                activeCategory === 'dikecualikan'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Dikecualikan (Uji Konsekuensi)
            </button>
          </div>
        </div>

        {/* Download toast message */}
        {downloadSuccessMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs px-5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccessMessage}</span>
            </div>
            <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded font-bold">Sukses</span>
          </div>
        )}

        {/* Documents Scrollable List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3.5 flex-1">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold text-slate-600">Tidak ada dokumen yang sesuai kriteria pencarian</p>
              <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain atau ubah filter kategori</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-[#0072B5]/60 transition-all shadow-2xs hover:shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#0072B5] bg-blue-50 px-2 py-0.5 rounded">
                      {doc.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {doc.unit}
                    </span>
                    {doc.isRestricted && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Dikecualikan
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-sm sm:text-base text-[#002B49]">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doc.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {doc.publishedDate}
                    </span>
                    <span>•</span>
                    <span>Format: <strong>{doc.fileType}</strong> ({doc.fileSize})</span>
                    <span>•</span>
                    <span>Diunduh: <strong>{doc.downloadCount} kali</strong></span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {doc.isRestricted ? (
                    <button
                      onClick={() => handleDownload(doc)}
                      className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-4 py-2.5 rounded-lg border border-rose-200 transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>Uji Konsekuensi</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownload(doc)}
                      className="inline-flex items-center gap-1.5 bg-[#0072B5] hover:bg-[#0A558C] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-2xs transition-all hover:translate-y-[-1px]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh PDF</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            Menampilkan <strong>{filteredDocs.length}</strong> dokumen resmi dari penguasaan PLN UID Kaltimra.
          </p>
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-lg"
          >
            Tutup Katalog
          </button>
        </div>

      </div>
    </div>
  );
};
