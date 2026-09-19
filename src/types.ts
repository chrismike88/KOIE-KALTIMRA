export interface DipDocument {
  id: string;
  code: string;
  title: string;
  category: 'berkala' | 'serta_merta' | 'setiap_saat' | 'dikecualikan';
  unit: string;
  year: number;
  fileSize: string;
  fileType: string;
  description: string;
  publishedDate: string;
  downloadCount: number;
  isRestricted?: boolean;
  legalBasis?: string;
}

export interface PermohonanRequest {
  id: string;
  registrationNo: string;
  category: 'individu' | 'lembaga';
  applicantName: string;
  nik: string;
  phone: string;
  email: string;
  occupation: string;
  address: string;
  notificationChannels: {
    whatsapp: boolean;
    telegram: boolean;
    sms: boolean;
    webpush: boolean;
  };
  telegramUsername?: string;
  infoCategory: string;
  infoDetail: string;
  purpose: string;
  acquisitionMethod: string;
  copyMethod: string;
  ktpFileName?: string;
  supportingDocName?: string;
  status: 'registrasi' | 'verifikasi' | 'penyiapan' | 'disetujui' | 'ditolak';
  statusText: string;
  submittedAt: string;
  updatedAt: string;
  targetSlaDate: string;
  assignedBidang?: string;
  notes?: string;
  dispositionNotes?: string;
  responseDocumentUrl?: string;
  rejectionReason?: string;
}

export interface TrackingStep {
  id: number;
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  description?: string;
}
