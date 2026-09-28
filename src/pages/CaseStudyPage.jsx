import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  Calendar, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  AlertCircle
} from 'lucide-react';
import { projects, aiPositioning } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';
import ProjectImage from '../components/ProjectImage';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="pt-40 pb-28 min-h-screen bg-[#FCFCFD] flex items-center justify-center text-center px-4">
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
          <p className="text-sm text-slate-500">
            The project you're looking for does not exist or has been moved.
          </p>
          <div className="pt-2">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Work</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Prev / Next project navigation
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  // Helper to fetch image object safely by index or ID
  const getImage = (idOrIndex) => {
    if (typeof idOrIndex === 'number') {
      return project.images[idOrIndex] || null;
    }
    return project.images.find((img) => img.id === idOrIndex || img.expectedFile.startsWith(idOrIndex)) || null;
  };

  return (
    <article className="pt-32 pb-28 min-h-screen bg-[#FCFCFD] text-slate-800">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isVi ? 'Quay lại danh sách dự án' : 'Back to All Projects'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              {isVi ? `DỰ ÁN ${project.index} TRÊN 07` : `PROJECT ${project.index} OF 07`}
            </span>
          </div>
        </div>
      </div>

      {/* Case Study Hero Header */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6 mb-12">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-100/80 text-purple-700">
              <Sparkles className="w-3 h-3 text-purple-600" />
              {project.productType}
            </span>
            <span className="text-xs font-medium text-slate-400">
              {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
            {project.subtitle}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <User className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Vai trò' : 'Role'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
              {project.role}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Compass className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Lĩnh vực' : 'Domain'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm truncate">
              {project.domain || project.productType}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Nền tảng' : 'Platforms'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
              {project.platforms.slice(0, 2).join(', ')}
              {project.platforms.length > 2 ? ` +${project.platforms.length - 2}` : ''}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Thời gian' : 'Timeline'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
              {project.year}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        {/* ==================================================== */}
        {/* 01. COVER HERO IMAGE SLOT                           */}
        {/* ==================================================== */}
        <section>
          {getImage(0) && (
            <ProjectImage
              src={getImage(0).src}
              projectName={project.shortTitle}
              label={getImage(0).label}
              expectedFile={getImage(0).expectedFile}
              description={getImage(0).slotPurpose}
              aspectRatio={getImage(0).aspectRatio || "16/10"}
              alt={`${project.title} - Cover`}
              priority={true}
            />
          )}
        </section>

        {/* ==================================================== */}
        {/* 02. OVERVIEW & SUMMARY                              */}
        {/* ==================================================== */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
              Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Product Summary & Context
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {project.summary}
          </p>

          {project.complexity && (
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 border border-purple-100/90 text-sm space-y-1.5">
              <span className="font-bold text-purple-800 uppercase tracking-wider text-xs block">
                System Complexity
              </span>
              <p className="text-slate-700 leading-relaxed">
                {project.complexity}
              </p>
            </div>
          )}

          {/* Key Work Responsibilities */}
          {project.keyWork && project.keyWork.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
                Key Responsibilities & Scope
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                {project.keyWork.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ==================================================== */}
        {/* PROJECT-SPECIFIC DEEP DIVES (WITH PAIRED IMAGES)     */}
        {/* ==================================================== */}

        {/* --- CASE 01: HA LONG LUXE REFERENCE CASE --- */}
        {project.slug === 'ha-long-luxe' && (
          <>
            {/* Ecosystem & Structure */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Platform Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Three-Pillar Ecosystem: B2C, B2B & Admin
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Connecting end-consumer reservations with B2B agency credit channels and unified back-office cruise fleet management.
                </p>
              </div>

              {getImage('02-ecosystem') && (
                <ProjectImage
                  src={getImage('02-ecosystem').src}
                  projectName={project.shortTitle}
                  label={getImage('02-ecosystem').label}
                  expectedFile={getImage('02-ecosystem').expectedFile}
                  description={getImage('02-ecosystem').slotPurpose}
                  aspectRatio="16/9"
                  caption="Figure 01: High-level stakeholder ecosystem connecting guest bookings, partner agencies, and internal port operations."
                />
              )}
            </section>

            {/* Information Architecture & Modules */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  03 · Information Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  14 Operational Modules & Up to 51 Role-Based Tabs
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Translating complex maritime operations into an organized hierarchy that eliminates clutter for operators.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-medium">
                {project.modules.map((mod, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-purple-50 text-purple-700 font-mono text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 truncate">{mod}</span>
                  </div>
                ))}
              </div>

              {getImage('03-information-architecture') && (
                <ProjectImage
                  src={getImage('03-information-architecture').src}
                  projectName={project.shortTitle}
                  label={getImage('03-information-architecture').label}
                  expectedFile={getImage('03-information-architecture').expectedFile}
                  description={getImage('03-information-architecture').slotPurpose}
                  aspectRatio="16/9"
                  caption="Figure 02: Information Architecture blueprint mapping 14 modules across role-based permissions."
                />
              )}
            </section>

            {/* End-to-End Booking Flow */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  04 · Transaction Flow
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  End-to-End Cruise Booking Funnel
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Designing a frictionless path from initial destination search to deck/cabin selection, passenger manifest input, and payment confirmation.
                </p>
              </div>

              {/* Stepper Visual */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {project.bookingFlow.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-left">
                    <span className="text-[10px] font-mono text-purple-600 font-bold block">STEP {idx + 1}</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block leading-snug">{step}</span>
                  </div>
                ))}
              </div>

              {getImage('04-booking-flow') && (
                <ProjectImage
                  src={getImage('04-booking-flow').src}
                  projectName={project.shortTitle}
                  label={getImage('04-booking-flow').label}
                  expectedFile={getImage('04-booking-flow').expectedFile}
                  description={getImage('04-booking-flow').slotPurpose}
                  aspectRatio="16/9"
                  caption="Figure 03: Complete customer booking flow across search, filters, deck selection, and checkout."
                />
              )}

              {getImage('05-cabin-selection') && (
                <ProjectImage
                  src={getImage('05-cabin-selection').src}
                  projectName={project.shortTitle}
                  label={getImage('05-cabin-selection').label}
                  expectedFile={getImage('05-cabin-selection').expectedFile}
                  description={getImage('05-cabin-selection').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 04: Interactive deck plan UI allowing guests and agents to pick exact physical cabins."
                />
              )}
            </section>

            {/* Admin Dashboard & Inventory Management */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  05 · Operations & Back-Office
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Admin Dashboard & Real-Time Cabin Inventory
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  High-density operational console for fleet managers tracking departure occupancy, cabin turnaround, and manifest readiness.
                </p>
              </div>

              {getImage('06-admin-dashboard') && (
                <ProjectImage
                  src={getImage('06-admin-dashboard').src}
                  projectName={project.shortTitle}
                  label={getImage('06-admin-dashboard').label}
                  expectedFile={getImage('06-admin-dashboard').expectedFile}
                  description={getImage('06-admin-dashboard').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 05: Fleet operations dashboard monitoring real-time departures, vessel status, and revenue metrics."
                />
              )}

              {getImage('07-inventory') && (
                <ProjectImage
                  src={getImage('07-inventory').src}
                  projectName={project.shortTitle}
                  label={getImage('07-inventory').label}
                  expectedFile={getImage('07-inventory').expectedFile}
                  description={getImage('07-inventory').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 06: Cabin inventory matrix across seasonal schedules, vessel capacities, and dynamic pricing."
                />
              )}
            </section>

            {/* Tri-Status Modeling (Critical System Logic) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  System Logic
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  Tri-Status Modeling: Disentangling Complex States
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  A common pitfall in maritime hospitality software is collapsing reservation, finance, and room assignment into a single status field.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="font-mono text-xs font-bold text-purple-700 uppercase">01 Booking Status</span>
                  <p className="text-xs text-slate-600">
                    Tracks reservation lifecycle: <strong className="text-slate-800">Draft, Confirmed, Held, Cancelled, Expired</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="font-mono text-xs font-bold text-purple-700 uppercase">02 Payment Status</span>
                  <p className="text-xs text-slate-600">
                    Independent financial ledger: <strong className="text-slate-800">Unpaid, Partial Deposit, Paid, Overdue, Refunded</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="font-mono text-xs font-bold text-purple-700 uppercase">03 Allocation Status</span>
                  <p className="text-xs text-slate-600">
                    Physical cabin assignment: <strong className="text-slate-800">Unassigned, Cabin Locked, Checked-in, Boarded</strong>.
                  </p>
                </div>
              </div>

              {getImage('08-status-model') && (
                <ProjectImage
                  src={getImage('08-status-model').src}
                  projectName={project.shortTitle}
                  label={getImage('08-status-model').label}
                  expectedFile={getImage('08-status-model').expectedFile}
                  description={getImage('08-status-model').slotPurpose}
                  aspectRatio="16/9"
                  caption="Figure 07: Status relationship matrix showing how operations avoids manifest collisions."
                />
              )}
            </section>

            {/* B2B Agency & Responsive Comparison */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  06 · Multi-Channel & Responsive
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  B2B Agency Portal & Responsive Breakpoints
                </h2>
              </div>

              {getImage('09-b2b-agency') && (
                <ProjectImage
                  src={getImage('09-b2b-agency').src}
                  projectName={project.shortTitle}
                  label={getImage('09-b2b-agency').label}
                  expectedFile={getImage('09-b2b-agency').expectedFile}
                  description={getImage('09-b2b-agency').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 08: Travel agency portal supporting credit limits, deposit tracking, and manifest exports."
                />
              )}

              {getImage('10-responsive') && (
                <ProjectImage
                  src={getImage('10-responsive').src}
                  projectName={project.shortTitle}
                  label={getImage('10-responsive').label}
                  expectedFile={getImage('10-responsive').expectedFile}
                  description={getImage('10-responsive').slotPurpose}
                  aspectRatio="16/9"
                  caption="Figure 09: Desktop (1440px), Tablet (1024px), and Mobile (390px) responsive layout comparison."
                />
              )}
            </section>

            {/* Design System, Components & QA */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  07 · Design QA & Prototype
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Component System, Design QA & Interactive Prototype
                </h2>
              </div>

              {getImage('11-components') && (
                <ProjectImage
                  src={getImage('11-components').src}
                  projectName={project.shortTitle}
                  label={getImage('11-components').label}
                  expectedFile={getImage('11-components').expectedFile}
                  description={getImage('11-components').slotPurpose}
                  aspectRatio="16/9"
                  caption="Figure 10: Atomic component library: forms, tables, drawers, status badges, and input validation."
                />
              )}

              {getImage('12-design-qa') && (
                <ProjectImage
                  src={getImage('12-design-qa').src}
                  projectName={project.shortTitle}
                  label={getImage('12-design-qa').label}
                  expectedFile={getImage('12-design-qa').expectedFile}
                  description={getImage('12-design-qa').slotPurpose}
                  aspectRatio="16/9"
                  caption="Figure 11: Design QA audit documentation verifying responsive edge cases and validation states."
                />
              )}

              {getImage('13-prototype') && (
                <ProjectImage
                  src={getImage('13-prototype').src}
                  projectName={project.shortTitle}
                  label={getImage('13-prototype').label}
                  expectedFile={getImage('13-prototype').expectedFile}
                  description={getImage('13-prototype').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 12: High-fidelity interactive prototype walkthrough tested with operations teams."
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 02: VEVUIVE --- */}
        {project.slug === 'vevuive' && (
          <>
            {/* UX Principle: Feature parity does not mean layout parity */}
            <section className="bg-purple-50/60 p-6 sm:p-8 rounded-3xl border border-purple-100 space-y-4">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Core UX Principle</span>
              </div>
              <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                "{project.uxPrinciple}"
              </blockquote>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rather than shrinking desktop data grids onto mobile screens, we re-architected ticket tiers and insurance add-ons into gesture-friendly bottom sheets and progressive disclosure cards.
              </p>
            </section>

            {/* Discovery & Homepage */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Multi-Platform Discovery
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Web & Mobile Homepage Experience
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('02-homepage-web') && (
                  <ProjectImage
                    src={getImage('02-homepage-web').src}
                    projectName={project.shortTitle}
                    label={getImage('02-homepage-web').label}
                    expectedFile={getImage('02-homepage-web').expectedFile}
                    description={getImage('02-homepage-web').slotPurpose}
                    aspectRatio="16/10"
                    caption="Web Booking Portal Homepage"
                  />
                )}
                {getImage('03-homepage-mobile') && (
                  <ProjectImage
                    src={getImage('03-homepage-mobile').src}
                    projectName={project.shortTitle}
                    label={getImage('03-homepage-mobile').label}
                    expectedFile={getImage('03-homepage-mobile').expectedFile}
                    description={getImage('03-homepage-mobile').slotPurpose}
                    aspectRatio="mobile"
                    caption="Mobile Native App Discovery"
                  />
                )}
              </div>
            </section>

            {/* Core Journey Flow */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  03 · Journey & Checkout
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  10-Step Customer Journey from Discovery to QR
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-medium">
                {project.coreJourney.map((step, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs">
                    <span className="font-mono text-[10px] text-purple-600 block">0{idx + 1}</span>
                    <span className="text-slate-700 leading-snug mt-1 block">{step}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('06-ticket-selection') && (
                  <ProjectImage
                    src={getImage('06-ticket-selection').src}
                    projectName={project.shortTitle}
                    label={getImage('06-ticket-selection').label}
                    expectedFile={getImage('06-ticket-selection').expectedFile}
                    description={getImage('06-ticket-selection').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('09-insurance') && (
                  <ProjectImage
                    src={getImage('09-insurance').src}
                    projectName={project.shortTitle}
                    label={getImage('09-insurance').label}
                    expectedFile={getImage('09-insurance').expectedFile}
                    description={getImage('09-insurance').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
              </div>

              {getImage('11-eticket') && (
                <ProjectImage
                  src={getImage('11-eticket').src}
                  projectName={project.shortTitle}
                  label={getImage('11-eticket').label}
                  expectedFile={getImage('11-eticket').expectedFile}
                  description={getImage('11-eticket').slotPurpose}
                  aspectRatio="mobile"
                  caption="Dynamic E-Ticket with offline validation QR"
                />
              )}
            </section>

            {/* Interaction States */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  04 · Robust States
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Handling All System States & Parity
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {project.systemStates.map((st, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-slate-100 rounded-xl shadow-xs">
                    <span className="text-slate-800 font-semibold">{st}</span>
                  </div>
                ))}
              </div>

              {getImage('14-web-mobile-comparison') && (
                <ProjectImage
                  src={getImage('14-web-mobile-comparison').src}
                  projectName={project.shortTitle}
                  label={getImage('14-web-mobile-comparison').label}
                  expectedFile={getImage('14-web-mobile-comparison').expectedFile}
                  description={getImage('14-web-mobile-comparison').slotPurpose}
                  aspectRatio="16/9"
                />
              )}

              {getImage('15-states') && (
                <ProjectImage
                  src={getImage('15-states').src}
                  projectName={project.shortTitle}
                  label={getImage('15-states').label}
                  expectedFile={getImage('15-states').expectedFile}
                  description={getImage('15-states').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 03: MA WAREHOUSE --- */}
        {project.slug === 'ma-warehouse' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Internal Enterprise Operations
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  High-Density Ticket Tables & Batch Management
                </h2>
              </div>

              {getImage('02-dashboard') && (
                <ProjectImage
                  src={getImage('02-dashboard').src}
                  projectName={project.shortTitle}
                  label={getImage('02-dashboard').label}
                  expectedFile={getImage('02-dashboard').expectedFile}
                  description={getImage('02-dashboard').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {getImage('03-inventory-table') && (
                <ProjectImage
                  src={getImage('03-inventory-table').src}
                  projectName={project.shortTitle}
                  label={getImage('03-inventory-table').label}
                  expectedFile={getImage('03-inventory-table').expectedFile}
                  description={getImage('03-inventory-table').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>

            {/* Refund & Cancellation Workflow */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  Workflow Design
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  Multi-Role Serial-Level Refund & Cancellation
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Preventing revenue leakage with a strict multi-tier approval chain across departments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
                {project.rolesWorkflow.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-700 text-xs uppercase">{step.role}</span>
                      <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {step.action}
                    </p>
                  </div>
                ))}
              </div>

              {getImage('09-refund-flow') && (
                <ProjectImage
                  src={getImage('09-refund-flow').src}
                  projectName={project.shortTitle}
                  label={getImage('09-refund-flow').label}
                  expectedFile={getImage('09-refund-flow').expectedFile}
                  description={getImage('09-refund-flow').slotPurpose}
                  aspectRatio="16/9"
                />
              )}

              {getImage('12-review-state') && (
                <ProjectImage
                  src={getImage('12-review-state').src}
                  projectName={project.shortTitle}
                  label={getImage('12-review-state').label}
                  expectedFile={getImage('12-review-state').expectedFile}
                  description={getImage('12-review-state').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 04: TOURISM OMNICHANNEL --- */}
        {project.slug === 'tourism-omnichannel' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Cross-System Integration
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  5-System Omnichannel Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                {project.systems.map((sys, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs space-y-1">
                    <span className="font-bold text-purple-700 block">{sys.name}</span>
                    <p className="text-[11px] text-slate-500 leading-snug">{sys.purpose}</p>
                  </div>
                ))}
              </div>

              {getImage('02-ecosystem') && (
                <ProjectImage
                  src={getImage('02-ecosystem').src}
                  projectName={project.shortTitle}
                  label={getImage('02-ecosystem').label}
                  expectedFile={getImage('02-ecosystem').expectedFile}
                  description={getImage('02-ecosystem').slotPurpose}
                  aspectRatio="16/9"
                />
              )}

              {getImage('03-ticket-lifecycle') && (
                <ProjectImage
                  src={getImage('03-ticket-lifecycle').src}
                  projectName={project.shortTitle}
                  label={getImage('03-ticket-lifecycle').label}
                  expectedFile={getImage('03-ticket-lifecycle').expectedFile}
                  description={getImage('03-ticket-lifecycle').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>

            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  03 · System Touchpoints
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  POS Counters, Gate Turnstiles & B2B Portal
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('05-pos') && (
                  <ProjectImage
                    src={getImage('05-pos').src}
                    projectName={project.shortTitle}
                    label={getImage('05-pos').label}
                    expectedFile={getImage('05-pos').expectedFile}
                    description={getImage('05-pos').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('08-access-control') && (
                  <ProjectImage
                    src={getImage('08-access-control').src}
                    projectName={project.shortTitle}
                    label={getImage('08-access-control').label}
                    expectedFile={getImage('08-access-control').expectedFile}
                    description={getImage('08-access-control').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
              </div>
            </section>
          </>
        )}

        {/* --- CASE 05: INSURANCE INTEGRATION --- */}
        {project.slug === 'insurance-integration' && (
          <>
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  Hybrid Methodology
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  Requirement → Business Rule → Validation → Flow → UI
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Translating stringent legal insurance underwriting rules into a friction-free booking add-on.
                </p>
              </div>

              {getImage('02-business-rules') && (
                <ProjectImage
                  src={getImage('02-business-rules').src}
                  projectName={project.shortTitle}
                  label={getImage('02-business-rules').label}
                  expectedFile={getImage('02-business-rules').expectedFile}
                  description={getImage('02-business-rules').slotPurpose}
                  aspectRatio="16/9"
                />
              )}

              {getImage('04-opt-in') && (
                <ProjectImage
                  src={getImage('04-opt-in').src}
                  projectName={project.shortTitle}
                  label={getImage('04-opt-in').label}
                  expectedFile={getImage('04-opt-in').expectedFile}
                  description={getImage('04-opt-in').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {getImage('07-validation') && (
                <ProjectImage
                  src={getImage('07-validation').src}
                  projectName={project.shortTitle}
                  label={getImage('07-validation').label}
                  expectedFile={getImage('07-validation').expectedFile}
                  description={getImage('07-validation').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 06: SMART CAR WASH 4.0 --- */}
        {project.slug === 'smart-car-wash' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Multi-Platform Support
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Customer Mobile, POS Kiosk & Station Admin
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Role: UIUX Support — Maintaining visual consistency and operational state clarity across hardware touchpoints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('02-mobile-home') && (
                  <ProjectImage
                    src={getImage('02-mobile-home').src}
                    projectName={project.shortTitle}
                    label={getImage('02-mobile-home').label}
                    expectedFile={getImage('02-mobile-home').expectedFile}
                    description={getImage('02-mobile-home').slotPurpose}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('04-pos') && (
                  <ProjectImage
                    src={getImage('04-pos').src}
                    projectName={project.shortTitle}
                    label={getImage('04-pos').label}
                    expectedFile={getImage('04-pos').expectedFile}
                    description={getImage('04-pos').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
              </div>

              {getImage('07-cross-platform') && (
                <ProjectImage
                  src={getImage('07-cross-platform').src}
                  projectName={project.shortTitle}
                  label={getImage('07-cross-platform').label}
                  expectedFile={getImage('07-cross-platform').expectedFile}
                  description={getImage('07-cross-platform').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 07: CORPORATE WEBSITE --- */}
        {project.slug === 'corporate-website' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Responsive Brand Web
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Modular Section Design & Responsive Layouts
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Role: UI Design / UIUX Support — Supporting visual hierarchy, component modularity, and developer handoff.
                </p>
              </div>

              {getImage('02-homepage') && (
                <ProjectImage
                  src={getImage('02-homepage').src}
                  projectName={project.shortTitle}
                  label={getImage('02-homepage').label}
                  expectedFile={getImage('02-homepage').expectedFile}
                  description={getImage('02-homepage').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {getImage('06-responsive') && (
                <ProjectImage
                  src={getImage('06-responsive').src}
                  projectName={project.shortTitle}
                  label={getImage('06-responsive').label}
                  expectedFile={getImage('06-responsive').expectedFile}
                  description={getImage('06-responsive').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>
          </>
        )}

        {/* ==================================================== */}
        {/* SECONDARY AI-ASSISTED WORKFLOW SECTION              */}
        {/* ==================================================== */}
        <section className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Workflow Acceleration
            </span>
            <span className="text-xs font-medium text-slate-400">
              Analysis & Production
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {aiPositioning.headline}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            During this project, AI tooling was utilized to parse business specifications, uncover hidden edge cases, draft validation checklists, and accelerate documentation. All product logic, architectural tradeoffs, and final UX judgment were human-controlled.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Specification Parsing",
              "Edge-Case Identification",
              "State Checklist Generation",
              "Flow Stress Testing",
              "Handoff Documentation"
            ].map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ==================================================== */}
        {/* PROJECT NAVIGATION (PREV / NEXT)                     */}
        {/* ==================================================== */}
        <nav className="pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to={`/work/${prevProject.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREVIOUS PROJECT</span>
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-purple-600 transition-colors truncate">
                {prevProject.title}
              </h4>
              <span className="text-xs text-slate-500">{prevProject.role}</span>
            </Link>

            <Link
              to={`/work/${nextProject.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all text-right group"
            >
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-purple-600 transition-colors flex items-center justify-end gap-1">
                <span>NEXT PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-purple-600 transition-colors truncate">
                {nextProject.title}
              </h4>
              <span className="text-xs text-slate-500">{nextProject.role}</span>
            </Link>
          </div>
        </nav>
      </main>
    </article>
  );
}
