import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import WorkProcess from '../components/WorkProcess';
import Portfolio from '../components/Portfolio';
import CtaBanner from '../components/CtaBanner';
import Blog from '../components/Blog';
import Services from '../components/Services';
import HappyClients from '../components/HappyClients';
import Testimonial from '../components/Testimonial';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Work Process */}
      <WorkProcess />

      {/* Portfolio / Featured 4 Projects */}
      <Portfolio />

      {/* Dark Call-to-Action Banner */}
      <CtaBanner />

      {/* Other Product Work (3 secondary projects) */}
      <Blog />

      {/* What I Bring to a Product Team */}
      <Services />

      {/* Career Journey */}
      <HappyClients />

      {/* My Design Perspective */}
      <Testimonial />

      {/* Contact Form & Info */}
      <Contact />
    </>
  );
}
