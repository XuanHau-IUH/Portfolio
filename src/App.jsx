import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkProcess from './components/WorkProcess';
import Portfolio from './components/Portfolio';
import CtaBanner from './components/CtaBanner';
import Services from './components/Services';
import CareerJourney from './components/CareerJourney';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-stone-800 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
        {/* Navigation */}
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Work Process */}
          <WorkProcess />

          {/* Portfolio / Projects */}
          <Portfolio />

          {/* Dark Call-to-Action Banner */}
          <CtaBanner />

          {/* What I Do / Services */}
          <Services />

          {/* Career Journey (4-Step Lộ Trình Nghề Nghiệp) */}
          <CareerJourney />

          {/* Contact Form, 3 CV Tracks & Info */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
