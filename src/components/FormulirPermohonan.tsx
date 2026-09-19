import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  User, 
  Building, 
  Upload, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  QrCode, 
  Copy, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  ShieldCheck,
  Smartphone,
  MessageSquare,
  Radio,
  Download,
  Info
} from 'lucide-react';
import { PermohonanRequest } from '../types';

interface FormulirPermohonanProps {
  onSubmitSuccess: (newRequest: PermohonanRequest) => void;
  onTrackTicket: (ticketNumber: string) => void;
}

export const FormulirPermohonan: React.FC<FormulirPermohonanProps> = ({
  onSubmitSuccess,
  onTrackTicket
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [submittedTicket, setSubmittedTicket] = useState<PermohonanRequest | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [category, setCategory] = useState<'individu' | 'lembaga'>('individu');
  const [applicantName, setApplicantName] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');

  // Notification Channels
  const [channels, setChannels] = useState({
    whatsapp: true,
    telegram: true,
    sms: false,
    webpush: true
  });
  const [telegramUsername, setTelegramUsername] = useState('');

  // Step 2 State
  const [infoCategory, setInfoCategory] = useState('Data Statistik & Rasio Elektrifikasi');
  const [infoDetail, setInfoDetail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [acquisitionMethod, setAcquisitionMethod] = useState('Salinan Lunak / Digital (Softcopy)');
  const [copyMethod, setCopyMethod] = useState('Unduh Melalui Portal PPID & Email Resmi');

  // Step 3 State
  const [ktpFileName, setKtpFileName] = useState('KTP_Pemohon_Fajar.pdf');
  const [supportingDocName, setSupportingDocName] = useState('Surat_Tugas_Penelitian_Unmul.pdf');
  const [integrityAgreed, setIntegrityAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 1 Validation
  const validateStep1 = () => {
    if (!applicantName.trim()) {
      setErrorMsg('Nama lengkap sesuai KTP wajib diisi.');
      return false;
    }
    if (!nik.trim() || nik.trim().length < 16) {
      setErrorMsg('NIK wajib 16 digit sesuai identitas resmi.');
      return false;
    }
    if (!phone.trim()) {
      setErrorMsg('Nomor WhatsApp/HP aktif wajib diisi.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Alamat email aktif yang valid wajib diisi.');
      return false;
    }
    if (!address.trim()) {
      setErrorMsg('Alamat domisili lengkap wajib diisi.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (!infoDetail.trim()) {
      setErrorMsg('Rincian informasi yang dibutuhkan wajib diisi dengan jelas.');
      return false;
    }
    if (!purpose.trim()) {
      setErrorMsg('Tujuan penggunaan informasi wajib diisi.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!integrityAgreed) {
      setErrorMsg('Anda wajib menyetujui pernyataan kebenaran data sesuai UU KIP No. 14 Tahun 2008.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regNo = `REG-PLN-KT-2026-${randomNum}`;

    const newReq: PermohonanRequest = {
      id: `req-${Date.now()}`,
      registrationNo: regNo,
      category,
      applicantName,
      nik,
      phone: `+62 ${phone.replace(/^0+/, '')}`,
      email,
      occupation: occupation || (category === 'individu' ? 'Masyarakat Umum' : 'Perwakilan Lembaga'),
      address,
      notificationChannels: channels,
      telegramUsername: channels.telegram ? telegramUsername : undefined,
      infoCategory,
      infoDetail,
      purpose,
      acquisitionMethod,
      copyMethod,
      ktpFileName,
      supportingDocName: supportingDocName || undefined,
      status: 'registrasi',
      statusText: 'Terdaftar (Menunggu Verifikasi PPID)',
      submittedAt: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WITA',
      updatedAt: 'Baru Saja',
      targetSlaDate: '10 Hari Kerja ke Depan (UU KIP)',
      assignedBidang: 'Sekretariat PPID UID Kaltimra',
      notes: 'Permohonan baru telah masuk ke antrean verifikasi berkas administrasi.'
    };

    onSubmitSuccess(newReq);
    setSubmittedTicket(newReq);
    setErrorMsg('');
  };

  const handleCopyTicket = () => {
    if (submittedTicket) {
      navigator.clipboard.writeText(submittedTicket.registrationNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmittedTicket(null);
    setCurrentStep(1);
    setApplicantName('');
    setNik('');
    setPhone('');
    setEmail('');
    setOccupation('');
    setAddress('');
    setInfoDetail('');
    setPurpose('');
  };

  return (
    <section id="formulir" className="relative overflow-hidden bg-gradient-to-b from-[#001D34] via-[#002B49] to-[#001827] text-white py-16 border-b border-blue-900/50">
      {/* Background ambient lighting effects matching Beranda */}
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with SLA Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD100] tracking-wider uppercase bg-[#0072B5]/30 border border-[#0072B5]/60 px-3.5 py-1 rounded-full mb-2.5 backdrop-blur-md">
              <FileText className="w-3.5 h-3.5" />
              <span>LAYANAN MANDIRI ONLINE (E-FORM PPID)</span>
            </div>
            <h2 className="font-roboto text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Formulir Permohonan Informasi Publik Online
            </h2>
            <p className="text-blue-100/80 text-xs sm:text-sm mt-1.5 max-w-xl">
              Ajukan permohonan data dan dokumen resmi ketenagalistrikan Kalimantan Timur dan Kalimantan Utara. Nomor registrasi otomatis diterbitkan beserta tanda terima resmi.
            </p>
          </div>

          {/* SLA Badge Box matching dark theme */}
          <div className="bg-[#002B49]/90 border border-blue-400/30 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-3.5 shrink-0 self-start md:self-auto">
            <div className="w-10 h-10 rounded-full bg-[#FFD100]/15 text-[#FFD100] flex items-center justify-center shrink-0 border border-[#FFD100]/30">
              <Clock className="w-5 h-5 text-[#FFD100]" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200/70 block">
                STANDAR WAKTU LAYANAN
              </span>
              <span className="text-sm font-extrabold text-white block">
                Maks. 10 Hari Kerja
              </span>
              <span className="text-[10px] text-[#FFD100] font-semibold block">
                +7 Hari Perpanjangan Resmi UU KIP
              </span>
            </div>
          </div>
        </div>

        {/* Successful Submission View */}
        {submittedTicket ? (
          <div className="bg-white rounded-2xl border border-emerald-300/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 space-y-6 animate-fade-in text-slate-800">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Permohonan Berhasil Dikirimkan
                </span>
                <h3 className="text-xl font-bold text-[#002B49] font-display">
                  Tanda Terima Registrasi Resmi Diterbitkan
                </h3>
              </div>
            </div>

            {/* Ticket Card */}
            <div className="bg-gradient-to-br from-blue-50/50 to-slate-50 border border-blue-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Nomor Registrasi Tiket Anda:
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#002B49] tracking-tight mt-0.5">
                    {submittedTicket.registrationNo}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="copy-ticket-btn"
                    onClick={handleCopyTicket}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#002B49] text-xs font-bold px-3.5 py-2 rounded-lg border border-slate-300 shadow-xs transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Tersalin!' : 'Salin Nomor'}</span>
                  </button>
                  <button
                    id="track-this-ticket-btn"
                    onClick={() => onTrackTicket(submittedTicket.registrationNo)}
                    className="inline-flex items-center gap-1.5 bg-[#0072B5] hover:bg-[#0A558C] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition-colors"
                  >
                    <span>Lacak Status Tiket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 block">Nama Pemohon:</span>
                  <strong className="text-slate-800 text-sm">{submittedTicket.applicantName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Kategori / Topik:</span>
                  <strong className="text-slate-800">{submittedTicket.infoCategory}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Tanggapan (SLA):</span>
                  <strong className="text-emerald-700 font-semibold">{submittedTicket.targetSlaDate}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Waktu Submit:</span>
                  <span className="text-slate-700">{submittedTicket.submittedAt}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Kanal Pembaruan:</span>
                  <span className="text-slate-700 font-medium">WhatsApp, Telegram, Web Push</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status Awal:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Terverifikasi Otomatis
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#002B49] bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Cetak / Simpan Bukti Tanda Terima (PDF)</span>
              </button>

              <button
                onClick={resetForm}
                className="text-xs font-bold text-[#0072B5] hover:underline"
              >
                + Ajukan Permohonan Informasi Lainnya
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step Form Card */
          <div className="bg-white rounded-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden text-slate-800">
            
            {/* Step Navigation Progress Header */}
            <div className="bg-slate-50/80 border-b border-slate-200 px-5 sm:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                
                {/* Step 1 Pill */}
                <div 
                  onClick={() => setCurrentStep(1)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    currentStep === 1 
                      ? 'bg-[#0072B5] text-white shadow-xs' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === 1 ? 'bg-white text-[#0072B5]' : 'bg-slate-200 text-slate-700'
                  }`}>
                    1
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block leading-tight">
                      LANGKAH 1
                    </span>
                    <span className="text-xs font-bold leading-tight">
                      Identitas Pemohon
                    </span>
                  </div>
                </div>

                {/* Step 2 Pill */}
                <div 
                  onClick={() => { if (validateStep1()) setCurrentStep(2); }}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    currentStep === 2 
                      ? 'bg-[#0072B5] text-white shadow-xs' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === 2 ? 'bg-white text-[#0072B5]' : 'bg-slate-200 text-slate-700'
                  }`}>
                    2
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block leading-tight">
                      LANGKAH 2
                    </span>
                    <span className="text-xs font-bold leading-tight">
                      Rincian Informasi
                    </span>
                  </div>
                </div>

                {/* Step 3 Pill */}
                <div 
                  onClick={() => { if (validateStep1() && validateStep2()) setCurrentStep(3); }}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    currentStep === 3 
                      ? 'bg-[#0072B5] text-white shadow-xs' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === 3 ? 'bg-white text-[#0072B5]' : 'bg-slate-200 text-slate-700'
                  }`}>
                    3
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block leading-tight">
                      LANGKAH 3
                    </span>
                    <span className="text-xs font-bold leading-tight">
                      Lampiran &amp; Kirim
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Error banner if any */}
            {errorMsg && (
              <div className="mx-6 mt-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* FORM BODY */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
              
              {/* STEP 1: IDENTITAS PEMOHON */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🪪</span>
                        <h3 className="text-base font-bold text-[#002B49] font-display">
                          Kategori &amp; Identitas Pemohon
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Lengkapi data kependudukan atau kelembagaan resmi Anda
                      </p>
                    </div>

                    <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      Wajib Sesuai KTP
                    </span>
                  </div>

                  {/* Kategori Pemohon Segmented Toggle */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      KATEGORI PEMOHON <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-w-md">
                      <button
                        type="button"
                        id="kategori-individu-btn"
                        onClick={() => setCategory('individu')}
                        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          category === 'individu'
                            ? 'bg-blue-50/80 border-[#0072B5] text-[#002B49] shadow-xs ring-1 ring-[#0072B5]'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <User className="w-4 h-4 text-[#0072B5]" />
                        <span>Individu / Perorangan</span>
                      </button>

                      <button
                        type="button"
                        id="kategori-lembaga-btn"
                        onClick={() => setCategory('lembaga')}
                        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          category === 'lembaga'
                            ? 'bg-blue-50/80 border-[#0072B5] text-[#002B49] shadow-xs ring-1 ring-[#0072B5]'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Building className="w-4 h-4 text-[#0072B5]" />
                        <span>Lembaga / Badan Hukum / Media</span>
                      </button>
                    </div>
                  </div>

                  {/* Form Grid Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Nama Lengkap */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        NAMA LENGKAP SESUAI KTP <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="form-applicant-name"
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Contoh: Muhammad Fajar Pratama"
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-[#0072B5] focus:ring-1 focus:ring-[#0072B5] text-slate-800 font-medium"
                        required
                      />
                    </div>

                    {/* NIK */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        NOMOR INDUK KEPENDUDUKAN (NIK 16 DIGIT) <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="form-applicant-nik"
                        type="text"
                        maxLength={16}
                        value={nik}
                        onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                        placeholder="64718xxxxxxxxxxxx"
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-[#0072B5] focus:ring-1 focus:ring-[#0072B5] text-slate-800 font-mono"
                        required
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        NOMOR WHATSAPP / HP AKTIF <span className="text-rose-600">*</span>
                      </label>
                      <div className="flex rounded-lg border border-slate-300 overflow-hidden focus-within:border-[#0072B5] focus-within:ring-1 focus-within:ring-[#0072B5]">
                        <span className="bg-slate-100 text-slate-600 text-xs sm:text-sm font-semibold px-3 py-2.5 flex items-center border-r border-slate-300">
                          +62
                        </span>
                        <input
                          id="form-applicant-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="81234567890"
                          className="w-full text-xs sm:text-sm bg-white px-3 py-2.5 focus:outline-hidden text-slate-800 font-medium"
                          required
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Notifikasi nomor tiket akan dikirim ke nomor ini
                      </span>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        ALAMAT EMAIL AKTIF <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="form-applicant-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="pemohon@email.com"
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-[#0072B5] focus:ring-1 focus:ring-[#0072B5] text-slate-800 font-medium"
                        required
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Salinan dokumen dan surat balasan dikirimkan ke email ini
                      </span>
                    </div>

                    {/* Pekerjaan / Lembaga */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        PEKERJAAN / NAMA INSTANSI / LEMBAGA
                      </label>
                      <input
                        id="form-applicant-occupation"
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        placeholder="Contoh: Mahasiswa Universitas Mulawarman / Peneliti"
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-[#0072B5] focus:ring-1 focus:ring-[#0072B5] text-slate-800 font-medium"
                      />
                    </div>

                    {/* Alamat Domisili */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        ALAMAT DOMISILI LENGKAP <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="form-applicant-address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Kota/Kabupaten, Jalan, RT/RW, Provinsi"
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-[#0072B5] focus:ring-1 focus:ring-[#0072B5] text-slate-800 font-medium"
                        required
                      />
                    </div>

                  </div>

                  {/* PREFERENSI KANAL NOTIFIKASI STATUS & TANDA TERIMA */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🔔</span>
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          PREFERENSI KANAL NOTIFIKASI STATUS &amp; TANDA TERIMA
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        Multi-Channel Alert Aktif
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Pilih saluran pengiriman pembaruan otomatis permohonan informasi Anda (dapat memilih lebih dari satu):
                    </p>

                    {/* 4 Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      
                      {/* WhatsApp */}
                      <label className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2.5 cursor-pointer hover:border-[#0072B5]">
                        <input
                          type="checkbox"
                          checked={channels.whatsapp}
                          onChange={(e) => setChannels({ ...channels, whatsapp: e.target.checked })}
                          className="mt-0.5 rounded text-[#0072B5] focus:ring-[#0072B5]"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">WhatsApp</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">Default</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                            Salinan PDF &amp; pesan update instan resmi.
                          </p>
                        </div>
                      </label>

                      {/* Telegram */}
                      <label className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2.5 cursor-pointer hover:border-[#0072B5]">
                        <input
                          type="checkbox"
                          checked={channels.telegram}
                          onChange={(e) => setChannels({ ...channels, telegram: e.target.checked })}
                          className="mt-0.5 rounded text-[#0072B5] focus:ring-[#0072B5]"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">Telegram Bot</span>
                            <span className="text-[9px] bg-blue-100 text-[#0072B5] font-bold px-1 rounded">Webhook Realtime</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                            Notifikasi berkala via @PLNKaltimraPPID_Bot.
                          </p>
                        </div>
                      </label>

                      {/* SMS Gateway */}
                      <label className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2.5 cursor-pointer hover:border-[#0072B5]">
                        <input
                          type="checkbox"
                          checked={channels.sms}
                          onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                          className="mt-0.5 rounded text-[#0072B5] focus:ring-[#0072B5]"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">SMS Gateway</span>
                            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 rounded">Fallback</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                            Notifikasi SMS jika perangkat offline / minim sinyal.
                          </p>
                        </div>
                      </label>

                      {/* Web Push */}
                      <label className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2.5 cursor-pointer hover:border-[#0072B5]">
                        <input
                          type="checkbox"
                          checked={channels.webpush}
                          onChange={(e) => setChannels({ ...channels, webpush: e.target.checked })}
                          className="mt-0.5 rounded text-[#0072B5] focus:ring-[#0072B5]"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">Web Push</span>
                            <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1 rounded">Browser</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                            Peringatan langsung pada peramban web aktif.
                          </p>
                        </div>
                      </label>

                    </div>

                    {/* Telegram username input row */}
                    {channels.telegram && (
                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
                          ID / Username Telegram:
                        </span>
                        <input
                          type="text"
                          value={telegramUsername}
                          onChange={(e) => setTelegramUsername(e.target.value)}
                          placeholder="@username_telegram atau ID Chat (Contoh: user_ppid)"
                          className="w-full sm:flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-hidden focus:border-[#0072B5]"
                        />
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          Webhook bot: <strong>@PLNKaltimraPPID_Bot</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Forward Action Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      id="btn-next-step-2"
                      onClick={() => {
                        if (validateStep1()) {
                          setCurrentStep(2);
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-[#002B49] hover:bg-[#001D34] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-sm transition-all"
                    >
                      <span>Lanjut ke Langkah 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 2: RINCIAN INFORMASI */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      <h3 className="text-base font-bold text-[#002B49] font-display">
                        Rincian Permohonan Informasi
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Jelaskan data atau berkas ketenagalistrikan yang ingin Anda peroleh secara spesifik
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Topik Informasi */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        KATEGORI / SEKTOR INFORMASI <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={infoCategory}
                        onChange={(e) => setInfoCategory(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-[#0072B5] text-slate-800 font-medium"
                      >
                        <option value="Data Statistik & Rasio Elektrifikasi">Data Statistik &amp; Rasio Elektrifikasi (RE/RD)</option>
                        <option value="Rencana Usaha Penyediaan Tenaga Listrik (RUPTL)">Rencana Usaha Penyediaan Tenaga Listrik (RUPTL)</option>
                        <option value="Keuangan & Kinerja Perusahaan">Laporan Keuangan &amp; Neraca Terverifikasi</option>
                        <option value="Infrastruktur Kelistrikan IKN Nusantara">Infrastruktur &amp; Pasokan Daya Kawasan IKN</option>
                        <option value="Program CSR & TJSL Kaltim-Kaltara">Laporan Tanggung Jawab Sosial dan Lingkungan (TJSL)</option>
                        <option value="Regulasi & Pedoman Pengadaan">Regulasi Teknis, SOP &amp; Pedoman Pengadaan</option>
                        <option value="Lainnya">Kategori Lainnya</option>
                      </select>
                    </div>

                    {/* Rincian Informasi */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        RINCIAN INFORMASI YANG DIBUTUHKAN <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={infoDetail}
                        onChange={(e) => setInfoDetail(e.target.value)}
                        placeholder="Tuliskan secara spesifik jenis dokumen, kurun waktu/tahun data, wilayah kabupaten/kota, serta poin data yang diinginkan..."
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-3.5 focus:outline-hidden focus:border-[#0072B5] text-slate-800 font-medium"
                        required
                      />
                    </div>

                    {/* Tujuan Penggunaan */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        TUJUAN PENGGUNAAN INFORMASI <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Contoh: Keperluan Riset Skripsi / Penelitian Akademik / Kajian Jurnalistik"
                        className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 focus:outline-hidden focus:border-[#0072B5] text-slate-800 font-medium"
                        required
                      />
                    </div>

                    {/* Format Data & Cara Memperoleh */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">
                          CARA MEMPEROLEH INFORMASI
                        </label>
                        <select
                          value={acquisitionMethod}
                          onChange={(e) => setAcquisitionMethod(e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800"
                        >
                          <option value="Melihat / Membaca / Mencatat Saja">Melihat / Membaca / Mencatat Saja</option>
                          <option value="Salinan Lunak / Digital (Softcopy)">Salinan Lunak / Digital (Softcopy)</option>
                          <option value="Salinan Tercetak / Hardcopy">Salinan Tercetak / Hardcopy</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">
                          CARA MENDAPATKAN SALINAN
                        </label>
                        <select
                          value={copyMethod}
                          onChange={(e) => setCopyMethod(e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800"
                        >
                          <option value="Unduh Melalui Portal PPID & Email Resmi">Unduh Melalui Portal PPID &amp; Email Resmi</option>
                          <option value="Pengiriman Pos Tercatat ke Alamat">Pengiriman Pos Tercatat ke Alamat</option>
                          <option value="Mengambil Langsung di Kantor UID Kaltimra">Mengambil Langsung di Meja Layanan Balikpapan</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Kembali</span>
                    </button>

                    <button
                      type="button"
                      id="btn-next-step-3"
                      onClick={() => {
                        if (validateStep2()) {
                          setCurrentStep(3);
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-[#002B49] hover:bg-[#001D34] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-sm transition-all"
                    >
                      <span>Lanjut ke Langkah 3</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: LAMPIRAN & KIRIM */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📎</span>
                      <h3 className="text-base font-bold text-[#002B49] font-display">
                        Lampiran Berkas &amp; Konfirmasi Pengiriman
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Unggah berkas identitas dan dokumen pendukung sesuai ketentuan Komisi Informasi
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Upload KTP */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/60 text-center flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-[#0072B5] mb-2" />
                      <span className="text-xs font-bold text-slate-800">
                        Scan / Foto KTP Asli <span className="text-rose-600">*</span>
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1 mb-2">
                        Format JPG, PNG, atau PDF (Maks. 2 MB)
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-100 font-semibold px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {ktpFileName}
                      </span>
                    </div>

                    {/* Upload Dokumen Pendukung */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/60 text-center flex flex-col items-center justify-center">
                      <FileText className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-slate-800">
                        Dokumen Pendukung / Surat Kuasa
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1 mb-2">
                        Surat pengantar kampus / legalitas lembaga
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-100 font-semibold px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {supportingDocName}
                      </span>
                    </div>
                  </div>

                  {/* Pakta Integritas / UU KIP Agreement */}
                  <label className="flex items-start gap-3 p-4 bg-blue-50/60 rounded-xl border border-blue-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integrityAgreed}
                      onChange={(e) => setIntegrityAgreed(e.target.checked)}
                      className="mt-1 rounded text-[#0072B5] focus:ring-[#0072B5]"
                    />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-[#002B49] block mb-1">
                        Pernyataan Kebenaran Data Pemohon (UU No. 14 Tahun 2008)
                      </strong>
                      Saya menyatakan bahwa data yang saya berikan adalah benar dan sah. Informasi yang diperoleh tidak akan disalahgunakan atau digunakan untuk tujuan yang bertentangan dengan hukum dan peraturan perundang-undangan di Negara Kesatuan Republik Indonesia.
                    </div>
                  </label>

                  {/* Buttons */}
                  <div className="flex items-center justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-lg border border-slate-300"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Kembali</span>
                    </button>

                    <button
                      type="submit"
                      id="btn-submit-permohonan"
                      className="inline-flex items-center gap-2 bg-[#0072B5] hover:bg-[#0A558C] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-lg shadow-md transition-all hover:translate-y-[-1px]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Permohonan Resmi Sekarang</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
