import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CareerJourney from './components/CareerJourney';
import Portfolio from './components/Portfolio';
import ConfidentialWork from './components/ConfidentialWork';
import WorkProcess from './components/WorkProcess';
import CtaBanner from './components/CtaBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudyOverlay from './components/CaseStudyOverlay';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Match /work/:slug or /project/:slug
  const routeMatch = location.pathname.match(/^\/(?:work|project)\/([a-zA-Z0-9_-]+)/);
  const activeSlug = routeMatch ? routeMatch[1] : null;

  const handleCloseModal = () => {
    // Return to root route while preserving scroll position
    navigate('/', { replace: false });
  };

  const handleNavigateProject = (newSlug) => {
    navigate(`/work/${newSlug}`);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-[#102A43] flex flex-col font-sans selection:bg-[#FF7A00] selection:text-white relative">
        {/* Navigation */}
        <Navbar />

        <main className="flex-1">
          {/* ========================================================= */}
          {/* 01 HERO                                                   */}
          {/* ========================================================= */}
          <Hero />

          {/* ========================================================= */}
          {/* 02 BA → UX THINKING ("Nơi Business Logic Trở Thành...")   */}
          {/* ========================================================= */}
          <About />

          {/* ========================================================= */}
          {/* 03 CAPABILITIES (Product & UI/UX, BA & Systems, Tools)    */}
          {/* ========================================================= */}
          <Services />

          {/* ========================================================= */}
          {/* 04 CAREER / EXPERIENCE (Horizontal Connected Timeline)    */}
          {/* ========================================================= */}
          <CareerJourney />

          {/* ========================================================= */}
          {/* 05 FEATURED PROJECTS (3 Primary Editorial Cards)          */}
          {/* ========================================================= */}
          <Portfolio />

          {/* 05b EARLIER & CONFIDENTIAL WORK (supporting BA evidence, no UI) */}
          <ConfidentialWork />

          {/* ========================================================= */}
          {/* 06 WORK PROCESS (6 Connected Steps)                       */}
          {/* ========================================================= */}
          <WorkProcess />

          {/* ========================================================= */}
          {/* 07 COLLABORATION CTA (Dark Navy Banner)                   */}
          {/* ========================================================= */}
          <CtaBanner />

          {/* ========================================================= */}
          {/* 08 CONTACT (3 Channels + Direct Options)                  */}
          {/* ========================================================= */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* ========================================================= */}
        {/* ROUTE-BACKED FULL-SCREEN CASE STUDY OVERLAY               */}
        {/* Rendered on top of homepage to preserve scroll position   */}
        {/* ========================================================= */}
        {activeSlug && (
          <CaseStudyOverlay
            slug={activeSlug}
            onClose={handleCloseModal}
            onNavigateProject={handleNavigateProject}
          />
        )}
      </div>
    </LanguageProvider>
  );
}
