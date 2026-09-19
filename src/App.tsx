import React, { useState } from 'react';
import { Navbar, ANNOUNCEMENTS } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LayananInformasiPublik } from './components/LayananInformasiPublik';
import { SiklusLayanan } from './components/SiklusLayanan';
import { FormulirPermohonan } from './components/FormulirPermohonan';
import { LacakStatus } from './components/LacakStatus';
import { HelpdeskBanner } from './components/HelpdeskBanner';
import { Footer } from './components/Footer';
import { DocumentModal } from './components/DocumentModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { SearchModal } from './components/SearchModal';
import { RegulasiModal } from './components/RegulasiModal';
import { ProfilPpidModal } from './components/ProfilPpidModal';
import { INITIAL_DIP_DOCUMENTS, INITIAL_REQUESTS } from './data/mockData';
import { DipDocument, PermohonanRequest } from './types';

export default function App() {
  // State for data
  const [documents, setDocuments] = useState<DipDocument[]>(INITIAL_DIP_DOCUMENTS);
  const [requests, setRequests] = useState<PermohonanRequest[]>(INITIAL_REQUESTS);
  const [trackedTicketId, setTrackedTicketId] = useState<string>('REG-PLN-KT-2026-0819');

  // Navigation & announcement state
  const [activeSection, setActiveSection] = useState('beranda');
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  // Modals state
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docCategoryFilter, setDocCategoryFilter] = useState<'all' | 'berkala' | 'serta_merta' | 'setiap_saat' | 'dikecualikan'>('all');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegulasiModalOpen, setIsRegulasiModalOpen] = useState(false);
  const [isProfilModalOpen, setIsProfilModalOpen] = useState(false);

  // Announcement controls
  const handlePrevAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1));
  };
  const handleNextAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev === ANNOUNCEMENTS.length - 1 ? 0 : prev + 1));
  };

  // Scroll navigation helper
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'regulasi') {
      setIsRegulasiModalOpen(true);
      return;
    }
    if (sectionId === 'profil') {
      setIsProfilModalOpen(true);
      return;
    }
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'kontak') {
      const el = document.getElementById('helpdesk');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Opening DIP Category documents modal
  const handleOpenCategoryDocs = (category: 'berkala' | 'serta_merta' | 'setiap_saat' | 'dikecualikan') => {
    setDocCategoryFilter(category);
    setIsDocModalOpen(true);
  };

  // Search trigger from Hero or Navbar
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setIsSearchModalOpen(true);
  };

  // New Request Submission
  const handleNewRequestSuccess = (newReq: PermohonanRequest) => {
    setRequests((prev) => [newReq, ...prev]);
    setTrackedTicketId(newReq.registrationNo);
  };

  // Admin update
  const handleUpdateRequest = (updated: PermohonanRequest) => {
    setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    if (trackedTicketId.toLowerCase() === updated.registrationNo.toLowerCase()) {
      setTrackedTicketId(updated.registrationNo);
    }
  };

  // Track specific ticket
  const handleTrackTicket = (ticketNumber: string) => {
    setTrackedTicketId(ticketNumber);
    scrollToSection('lacak');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased selection:bg-[#FFD100] selection:text-[#002B49]">
      
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        announcementIndex={announcementIndex}
        onPrevAnnouncement={handlePrevAnnouncement}
        onNextAnnouncement={handleNextAnnouncement}
      />

      {/* 2. Main Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onScrollToSiklus={() => scrollToSection('alur')}
          onScrollToDip={() => {
            setDocCategoryFilter('all');
            setIsDocModalOpen(true);
          }}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Layanan Informasi Publik (DIP, Permohonan, Laporan, IKM, Keberatan) */}
        <LayananInformasiPublik
          documents={documents}
          onOpenCategoryDocs={handleOpenCategoryDocs}
          onNavigateToForm={() => scrollToSection('formulir')}
          onNavigateToSiklus={() => scrollToSection('alur')}
        />

        {/* Siklus Layanan SOP Diagram (Step 01, Step 02, Step 03 Disetujui & Ditolak) */}
        <SiklusLayanan
          onNavigateToForm={() => scrollToSection('formulir')}
          onNavigateToDip={() => {
            setDocCategoryFilter('all');
            setIsDocModalOpen(true);
          }}
        />

        {/* Formulir Permohonan Informasi Publik (E-Form PPID 3-Step) */}
        <FormulirPermohonan
          onSubmitSuccess={handleNewRequestSuccess}
          onTrackTicket={handleTrackTicket}
        />

        {/* Realtime Status Tracker */}
        <LacakStatus
          requests={requests}
          currentTrackId={trackedTicketId}
          onSelectTicket={(ticket) => setTrackedTicketId(ticket)}
        />

        {/* Helpdesk & Direct Office Banner */}
        <div id="helpdesk">
          <HelpdeskBanner />
        </div>

      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenDipCategory={handleOpenCategoryDocs}
      />

      {/* 4. Modals */}
      {/* Document DIP Modal */}
      <DocumentModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        documents={documents}
        initialCategory={docCategoryFilter}
      />

      {/* Login PIC / Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        requests={requests}
        onUpdateRequest={handleUpdateRequest}
      />

      {/* Unified Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        initialQuery={searchQuery}
        documents={documents}
        requests={requests}
        onSelectDoc={(doc) => {
          setDocCategoryFilter(doc.category);
          setIsDocModalOpen(true);
        }}
        onSelectTicket={handleTrackTicket}
      />

      {/* Regulasi Modal */}
      <RegulasiModal
        isOpen={isRegulasiModalOpen}
        onClose={() => setIsRegulasiModalOpen(false)}
      />

      {/* Profil PPID Modal */}
      <ProfilPpidModal
        isOpen={isProfilModalOpen}
        onClose={() => setIsProfilModalOpen(false)}
      />

    </div>
  );
}
