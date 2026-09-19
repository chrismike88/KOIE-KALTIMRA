import React, { useState, useEffect } from 'react';
import { X, Search, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DipDocument, PermohonanRequest } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  documents: DipDocument[];
  requests: PermohonanRequest[];
  onSelectDoc: (doc: DipDocument) => void;
  onSelectTicket: (ticketNumber: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  documents,
  requests,
  onSelectDoc,
  onSelectTicket
}) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery, isOpen]);

  if (!isOpen) return null;

  const clean = query.trim().toLowerCase();

  const matchedDocs = clean
    ? documents.filter(
        (d) =>
          d.title.toLowerCase().includes(clean) ||
          d.code.toLowerCase().includes(clean) ||
          d.description.toLowerCase().includes(clean)
      )
    : [];

  const matchedRequests = clean
    ? requests.filter(
        (r) =>
          r.registrationNo.toLowerCase().includes(clean) ||
          r.applicantName.toLowerCase().includes(clean) ||
          r.infoCategory.toLowerCase().includes(clean)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik judul dokumen, nomor registrasi tiket, atau topik..."
            className="w-full text-sm bg-transparent focus:outline-hidden font-medium text-slate-800"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!clean ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Mulai mengetik untuk mencari dokumen DIP atau tiket permohonan...
            </div>
          ) : matchedDocs.length === 0 && matchedRequests.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Tidak ada hasil yang cocok dengan kata kunci "{query}".
            </div>
          ) : (
            <>
              {/* Matched Tickets */}
              {matchedRequests.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Tiket Permohonan ({matchedRequests.length})
                  </span>
                  {matchedRequests.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onSelectTicket(r.registrationNo);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50 transition-colors flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#002B49]">
                            {r.registrationNo}
                          </span>
                          <span className="text-[10px] bg-white border border-blue-200 px-2 py-0.5 rounded font-semibold text-blue-800">
                            {r.statusText}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                          {r.infoCategory}
                        </p>
                        <span className="text-[11px] text-slate-500">
                          Pemohon: {r.applicantName}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0072B5] shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Matched DIP Documents */}
              {matchedDocs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Dokumen DIP ({matchedDocs.length})
                  </span>
                  {matchedDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        onSelectDoc(doc);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-[#0072B5] hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-[#0072B5] bg-blue-50 px-1.5 py-0.5 rounded">
                            {doc.code}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">
                            {doc.category.replace('_', ' ')}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-[#002B49] line-clamp-1">
                          {doc.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {doc.description}
                        </p>
                      </div>
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-3 py-1.5"
          >
            Tutup Pencarian
          </button>
        </div>

      </div>
    </div>
  );
};
