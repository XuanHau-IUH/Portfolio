import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import CaseStudyPage from './pages/CaseStudyPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FCFCFD] text-slate-800 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
          {/* Navigation */}
          <Navbar />

          {/* Dynamic Route View */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<CaseStudyPage />} />
              {/* Fallback to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
