import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  RotateCw, 
  FileCheck, 
  Send, 
  AlertCircle, 
  User, 
  Building2, 
  Calendar, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Check,
  Bell,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { PermohonanRequest } from '../types';

interface LacakStatusProps {
  requests: PermohonanRequest[];
  currentTrackId?: string;
  onSelectTicket: (ticketNumber: string) => void;
}

export const LacakStatus: React.FC<LacakStatusProps> = ({
  requests,
  currentTrackId,
  onSelectTicket
}) => {
  const [inputTicket, setInputTicket] = useState(currentTrackId || '');
  const [selectedTicketNumber, setSelectedTicketNumber] = useState(
    currentTrackId || 'REG-PLN-KT-2026-0819'
  );
  const [searchError, setSearchError] = useState('');

  // Find active ticket
  const currentRequest = requests.find(
    (r) => r.registrationNo.toLowerCase() === selectedTicketNumber.trim().toLowerCase()
  ) || requests[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputTicket.trim();
    if (!clean) {
      setSearchError('Silakan masukkan nomor registrasi tiket permohonan.');
      return;
    }

    const found = requests.find(
      (r) => r.registrationNo.toLowerCase() === clean.toLowerCase()
    );

    if (found) {
      setSelectedTicketNumber(found.registrationNo);
      setSearchError('');
    } else {
      setSearchError(`Nomor tiket "${clean}" tidak ditemukan di database UID Kaltimra. Periksa kembali nomor registrasi Anda.`);
    }
  };

  const getStepStatus = (stepIndex: number, currentStatus: string) => {
    // Steps: 1. Registrasi, 2. Verifikasi, 3. Penyiapan, 4. Kirim
    if (currentStatus === 'ditolak') {
      if (stepIndex === 1 || stepIndex === 2) return 'completed';
      if (stepIndex === 3) return 'rejected';
      return 'pending';
    }

    if (currentStatus === 'registrasi') {
      if (stepIndex === 1) return 'completed';
      if (stepIndex === 2) return 'current';
      return 'pending';
    }

    if (currentStatus === 'verifikasi') {
      if (stepIndex === 1) return 'completed';
      if (stepIndex === 2) return 'completed';
      if (stepIndex === 3) return 'current';
      return 'pending';
    }

    if (currentStatus === 'penyiapan') {
      if (stepIndex <= 2) return 'completed';
      if (stepIndex === 3) return 'current';
      return 'pending';
    }

    if (currentStatus === 'disetujui') {
      return 'completed';
    }

    return 'pending';
  };

  return (
    <section id="lacak" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0072B5] tracking-wider uppercase bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#0072B5]" />
            <span>REALTIME TRACKER</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#002B49] tracking-tight">
            Lacak Status Permohonan Data
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Masukkan nomor registrasi permohonan Anda untuk memantau tahapan verifikasi, disposisi bidang, dan pengunduhan berkas.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center bg-white rounded-xl shadow-md p-1.5 border-2 border-slate-200 focus-within:border-[#0072B5] transition-colors">
              <div className="pl-3.5 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="tracker-search-input"
                type="text"
                value={inputTicket}
                onChange={(e) => {
                  setInputTicket(e.target.value);
                  setSearchError('');
                }}
                placeholder="# REG-PLN-KT-2026-0428"
                className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-mono font-bold uppercase focus:outline-hidden"
              />
              <button
                id="tracker-submit-btn"
                type="submit"
                className="shrink-0 inline-flex items-center gap-2 bg-[#002B49] hover:bg-[#001D34] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                <span>Lacak Permohonan</span>
              </button>
            </div>
          </form>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
            <span>Contoh tiket:</span>
            {requests.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setInputTicket(r.registrationNo);
                  setSelectedTicketNumber(r.registrationNo);
                  setSearchError('');
                }}
                className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border transition-all ${
                  selectedTicketNumber === r.registrationNo
                    ? 'bg-[#0072B5] text-white border-[#0072B5] font-bold'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {r.registrationNo}
              </button>
            ))}
          </div>

          {searchError && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Channel status indicator pill row matching screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              WhatsApp Gateway
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Bot Telegram
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              SMS Gateway
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              <Bell className="w-3 h-3 text-purple-600" />
              Aktifkan Web Push
            </span>
          </div>
        </div>

        {/* ACTIVE TICKET TIMELINE CARD (Matches screenshot) */}
        {currentRequest && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden">
            
            {/* Top Bar of Card */}
            <div className="bg-[#002B49] text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-200">
                    Progres Berkas:
                  </span>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-[#FFD100] tracking-wide">
                    {currentRequest.registrationNo}
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                  {currentRequest.infoCategory}
                </h3>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm ${
                  currentRequest.status === 'disetujui'
                    ? 'bg-emerald-500 text-white'
                    : currentRequest.status === 'ditolak'
                    ? 'bg-rose-500 text-white'
                    : 'bg-[#FFD100] text-[#002B49]'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    currentRequest.status === 'disetujui'
                      ? 'bg-white'
                      : currentRequest.status === 'ditolak'
                      ? 'bg-white'
                      : 'bg-[#002B49] animate-ping'
                  }`} />
                  {currentRequest.statusText}
                </span>
              </div>
            </div>

            {/* 4-Step Visual Timeline */}
            <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                
                {/* 1. Registrasi */}
                {(() => {
                  const st = getStepStatus(1, currentRequest.status);
                  return (
                    <div className="relative flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#002B49] block">
                          1. Registrasi
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {currentRequest.submittedAt}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                          Berkas pemohon terdaftar di sistem
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* 2. Verifikasi PPID */}
                {(() => {
                  const st = getStepStatus(2, currentRequest.status);
                  return (
                    <div className="relative flex flex-col items-center text-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                        st === 'completed' 
                          ? 'bg-emerald-600 text-white' 
                          : st === 'current'
                          ? 'bg-[#0072B5] text-white ring-4 ring-blue-100 animate-pulse'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {st === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : st === 'current' ? (
                          <RotateCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <ShieldCheck className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#002B49] block">
                          2. Verifikasi PPID
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {currentRequest.status === 'registrasi' ? 'Sedang diverifikasi' : 'Terverifikasi Lengkap'}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                          Dokumen KTP &amp; syarat dinyatakan sah
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* 3. Penyiapan Data */}
                {(() => {
                  const st = getStepStatus(3, currentRequest.status);
                  return (
                    <div className="relative flex flex-col items-center text-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                        st === 'completed' 
                          ? 'bg-emerald-600 text-white' 
                          : st === 'current'
                          ? 'bg-[#0072B5] text-white ring-4 ring-blue-100 animate-pulse'
                          : st === 'rejected'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {st === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : st === 'current' ? (
                          <RotateCw className="w-5 h-5 animate-spin" />
                        ) : st === 'rejected' ? (
                          <AlertCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#002B49] block">
                          3. Penyiapan Data
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {currentRequest.assignedBidang || 'Bidang Teknis Kaltimra'}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                          {currentRequest.status === 'ditolak'
                            ? 'Ditolak: Informasi Dikecualikan'
                            : 'PIC Bidang menyusun & validasi data'}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* 4. Kirim Berkas */}
                {(() => {
                  const st = getStepStatus(4, currentRequest.status);
                  return (
                    <div className="relative flex flex-col items-center text-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                        st === 'completed' 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {st === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#002B49] block">
                          4. Kirim Berkas
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {currentRequest.status === 'disetujui' ? 'Selesai Dikirim' : currentRequest.targetSlaDate}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                          {currentRequest.status === 'disetujui'
                            ? 'Berkas siap diunduh & terkirim ke email'
                            : 'Menunggu proses bidang selesai'}
                        </p>
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Ticket Information Details Panel */}
            <div className="p-6 sm:p-7 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Left Col: Applicant info */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    IDENTITAS PEMOHON INFORMASI
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#0072B5]" />
                    <span className="font-bold text-slate-800 text-sm">{currentRequest.applicantName}</span>
                  </div>

                  <div className="text-slate-600 space-y-1">
                    <p><strong>NIK:</strong> {currentRequest.nik} (Terverifikasi)</p>
                    <p><strong>Instansi / Profesi:</strong> {currentRequest.occupation}</p>
                    <p><strong>Kontak:</strong> {currentRequest.phone} | {currentRequest.email}</p>
                    <p><strong>Alamat:</strong> {currentRequest.address}</p>
                  </div>
                </div>

                {/* Right Col: Request info & PIC Disposition */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    STATUS DISPOSISI &amp; CATATAN PIC
                  </span>

                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#0072B5]" />
                    <span className="font-bold text-slate-800 text-sm">
                      {currentRequest.assignedBidang || 'Sekretariat PPID UID Kaltimra'}
                    </span>
                  </div>

                  <div className="text-slate-600 space-y-1">
                    <p><strong>Tujuan Penggunaan:</strong> {currentRequest.purpose}</p>
                    <p><strong>Bentuk Salinan:</strong> {currentRequest.acquisitionMethod}</p>
                    {currentRequest.dispositionNotes && (
                      <div className="p-2.5 bg-blue-50/80 rounded-lg border border-blue-200 text-blue-900 mt-2">
                        <strong className="block text-[11px]">Catatan PIC Bidang:</strong>
                        <span>{currentRequest.dispositionNotes}</span>
                      </div>
                    )}
                    {currentRequest.rejectionReason && (
                      <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-rose-900 mt-2">
                        <strong className="block text-[11px]">Alasan Penolakan Resmi:</strong>
                        <span>{currentRequest.rejectionReason}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#002B49] bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Cetak Lembar Tanda Terima Tiket</span>
                </button>

                {currentRequest.status === 'disetujui' && (
                  <button
                    onClick={() => alert(`Mengunduh berkas resmi untuk tiket: ${currentRequest.registrationNo}`)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh Dokumen Resmi (PDF Berstempel)</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
