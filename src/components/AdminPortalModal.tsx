import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  UserCheck, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Send, 
  FileText, 
  ShieldCheck, 
  Filter,
  Eye
} from 'lucide-react';
import { PermohonanRequest } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: PermohonanRequest[];
  onUpdateRequest: (updated: PermohonanRequest) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  requests,
  onUpdateRequest
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default logged in for easy test
  const [officerName, setOfficerName] = useState('Bambang Setyawan, S.T.');
  const [officerRole, setOfficerRole] = useState('PIC Admin PPID UID Kaltimra');
  const [selectedReqId, setSelectedReqId] = useState<string>(requests[0]?.id || '');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Edit fields
  const [selectedStatus, setSelectedStatus] = useState<'registrasi' | 'verifikasi' | 'penyiapan' | 'disetujui' | 'ditolak'>('penyiapan');
  const [assignedBidang, setAssignedBidang] = useState('Bidang Perencanaan & Kinerja Sistem (REN)');
  const [dispositionNotes, setDispositionNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  if (!isOpen) return null;

  const currentReq = requests.find((r) => r.id === selectedReqId) || requests[0];

  const handleSelectRequest = (req: PermohonanRequest) => {
    setSelectedReqId(req.id);
    setSelectedStatus(req.status);
    setAssignedBidang(req.assignedBidang || 'Bidang Distribusi (DIST)');
    setDispositionNotes(req.dispositionNotes || '');
    setRejectionReason(req.rejectionReason || '');
    setActionSuccess(null);
  };

  const handleSaveAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReq) return;

    let statusText = 'Dalam Proses PIC Bidang';
    if (selectedStatus === 'registrasi') statusText = 'Terdaftar (Menunggu Verifikasi)';
    if (selectedStatus === 'verifikasi') statusText = 'Terverifikasi (Persiapan Disposisi)';
    if (selectedStatus === 'penyiapan') statusText = 'Dalam Proses PIC Bidang';
    if (selectedStatus === 'disetujui') statusText = 'Disetujui & Siap Unduh';
    if (selectedStatus === 'ditolak') statusText = 'Ditolak (Uji Konsekuensi)';

    const updated: PermohonanRequest = {
      ...currentReq,
      status: selectedStatus,
      statusText,
      assignedBidang,
      dispositionNotes,
      rejectionReason: selectedStatus === 'ditolak' ? rejectionReason : undefined,
      updatedAt: 'Baru saja diupdate oleh ' + officerName
    };

    onUpdateRequest(updated);
    setActionSuccess(`Status tiket ${currentReq.registrationNo} berhasil diperbarui menjadi "${statusText}". Pelacak realtime telah diperbarui.`);
    setTimeout(() => {
      setActionSuccess(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#002B49] text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0072B5] text-[#FFD100] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded">
                  PORTAL INTERNAL RESMI
                </span>
                <span className="text-xs text-blue-200">Sesi Aktif: {officerName} ({officerRole})</span>
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white mt-0.5">
                Dashboard Verifikasi &amp; Disposisi PPID UID Kaltimra
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action toast */}
        {actionSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs px-6 py-2.5 flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Content Body: Split View (List on left, detail & action form on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Column: Request List */}
          <div className="lg:col-span-5 border-r border-slate-200 bg-slate-50/70 flex flex-col overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between">
              <span className="text-xs font-bold text-[#002B49] uppercase tracking-wider">
                Daftar Tiket Masuk ({requests.length})
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Klik untuk memproses</span>
            </div>

            <div className="overflow-y-auto p-3 space-y-2 flex-1">
              {requests.map((r) => {
                const isSelected = currentReq?.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRequest(r)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-white border-[#0072B5] shadow-xs ring-1 ring-[#0072B5]'
                        : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono text-xs font-extrabold text-[#002B49]">
                        {r.registrationNo}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        r.status === 'disetujui'
                          ? 'bg-emerald-100 text-emerald-800'
                          : r.status === 'ditolak'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.statusText}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                      {r.applicantName}
                    </h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {r.infoCategory}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Diajukan: {r.submittedAt}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Processing & Disposition Form */}
          <div className="lg:col-span-7 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white">
            {currentReq ? (
              <form onSubmit={handleSaveAction} className="space-y-5">
                
                {/* Request Overview Card */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Detail Tiket Permohonan
                    </span>
                    <span className="font-mono text-xs font-bold text-[#0072B5]">
                      {currentReq.registrationNo}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Nama Pemohon:</span>
                      <strong className="text-slate-800">{currentReq.applicantName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">NIK / Identitas:</span>
                      <span className="font-mono text-slate-700">{currentReq.nik}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Kategori Dokumen:</span>
                      <span className="text-slate-800 font-medium">{currentReq.infoCategory}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Tujuan Penggunaan:</span>
                      <span className="text-slate-800">{currentReq.purpose}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Rincian yang Diminta:</span>
                    <p className="mt-0.5 bg-white p-2.5 rounded border border-slate-200 italic">
                      "{currentReq.infoDetail}"
                    </p>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    UBAH TAHAPAN STATUS PERMOHONAN:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedStatus('verifikasi')}
                      className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-center ${
                        selectedStatus === 'verifikasi'
                          ? 'bg-blue-50 border-[#0072B5] text-[#0072B5] ring-1 ring-[#0072B5]'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      2. Verifikasi PPID
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedStatus('penyiapan')}
                      className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-center ${
                        selectedStatus === 'penyiapan'
                          ? 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      3. Penyiapan PIC Bidang
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedStatus('disetujui')}
                      className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-center ${
                        selectedStatus === 'disetujui'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      4. Disetujui (Selesai)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedStatus('ditolak')}
                      className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-center ${
                        selectedStatus === 'ditolak'
                          ? 'bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      X. Ditolak (Uji Konsekuensi)
                    </button>
                  </div>
                </div>

                {/* Disposisi Unit / Bidang */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    DISPOSISI BIDANG TEKNIS PELAKSANA:
                  </label>
                  <select
                    value={assignedBidang}
                    onChange={(e) => setAssignedBidang(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800"
                  >
                    <option value="Bidang Perencanaan & Kinerja Sistem (REN)">Bidang Perencanaan &amp; Kinerja Sistem (REN)</option>
                    <option value="Bidang Distribusi (DIST)">Bidang Distribusi (DIST)</option>
                    <option value="Bidang Niaga & Pelayanan Pelanggan (NPP)">Bidang Niaga &amp; Pelayanan Pelanggan (NPP)</option>
                    <option value="Bidang Komunikasi & Tanggung Jawab Sosial (TJSL)">Bidang Komunikasi &amp; Tanggung Jawab Sosial (TJSL)</option>
                    <option value="Bidang Keamanan Siber & TI (UP2D)">Bidang Keamanan Siber &amp; TI (UP2D)</option>
                    <option value="UP3 Balikpapan">UP3 Balikpapan</option>
                    <option value="UP3 Samarinda">UP3 Samarinda</option>
                  </select>
                </div>

                {/* Disposition Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    CATATAN TINDAK LANJUT / PETUNJUK PIC BIDANG:
                  </label>
                  <textarea
                    rows={2}
                    value={dispositionNotes}
                    onChange={(e) => setDispositionNotes(e.target.value)}
                    placeholder="Contoh: Mohon koordinasikan data sebaran gardu desa dengan tim GIS UP3 Samarinda..."
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800"
                  />
                </div>

                {/* If rejected, reason is required */}
                {selectedStatus === 'ditolak' && (
                  <div className="space-y-1.5 bg-rose-50/80 p-3.5 rounded-xl border border-rose-200">
                    <label className="text-xs font-bold text-rose-900 uppercase tracking-wider block">
                      DASAR HUKUM &amp; ALASAN PENOLAKAN RESMI:
                    </label>
                    <textarea
                      rows={2}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Informasi yang dimohon termasuk dalam Informasi Dikecualikan (Pasal 17 huruf h UU No. 14 Tahun 2008)..."
                      className="w-full text-xs bg-white border border-rose-300 rounded-lg p-2.5 text-slate-800"
                      required
                    />
                  </div>
                )}

                {/* Save action button */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-4 py-2"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#0072B5] hover:bg-[#0A558C] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan &amp; Perbarui Status Tiket</span>
                  </button>
                </div>

              </form>
            ) : (
              <div className="text-center py-12 text-slate-400">
                Pilih tiket di sebelah kiri untuk melihat rincian
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
