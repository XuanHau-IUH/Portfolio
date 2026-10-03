import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import { useProjects, localizeProjects } from '../data/localizeProjects';
import Chapter, { ChapterHeader } from './ui/Chapter';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';
import { CoordLabel, CropMarks } from './ui/Technical';
import ProjThread from './ui/proj-thread';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Bilingual block that can be line-clamped. Both translations share one grid
 * cell (like <Bi>), so the box height is identical in VI and EN.
 */
function BiBlock({ vi, en, className = '' }) {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  return (
    <span className="grid">
      <span lang="vi" aria-hidden={!isVi} className={`[grid-area:1/1] ${className} ${isVi ? '' : 'invisible select-none'}`}>{vi}</span>
      <span lang="en" aria-hidden={isVi} className={`[grid-area:1/1] ${className} ${isVi ? 'invisible select-none' : ''}`}>{en}</span>
    </span>
  );
}

/* ---------- derived, real fields ---------- */
const deckOf = (p) => (p?.title?.includes('—') ? p.title.split('—').slice(1).join('—').trim() : p?.subtitle || '');
const platformsOf = (p) => {
  const list = p?.platforms || [];
  const shown = list.slice(0, 3).join(' · ');
  return list.length > 3 ? `${shown} · +${list.length - 3}` : shown;
};
const tagsOf = (p) => (p?.tags || []).filter((t) => !/featured case study|case study nổi bật/i.test(t)).slice(0, 3);

/* ---------- slot system: every layout slot has its own structure ---------- */
// in / out = where the logic thread enters and leaves the card (desktop)
const SLOTS = {
  primary: { col: 'md:col-span-2 lg:col-span-8', surface: 'dark', inA: ['l', 'left-0 top-[16%]'], outA: ['r', 'right-0 top-[58%]'] },
  tallR: { col: 'md:col-span-1 lg:col-span-4 lg:mt-48', surface: 'paper', inA: ['l', 'left-0 top-[14%]'], outA: ['b', 'bottom-0 left-[58%]'] },
  wide: { col: 'md:col-span-2 lg:col-start-3 lg:col-span-10', surface: 'navy', inA: ['t', 'top-0 left-[84%]'], outA: ['b', 'bottom-0 left-[60%]'] },
  wideR: { col: 'md:col-span-2 lg:col-start-1 lg:col-span-10', surface: 'navy', reverse: true, inA: ['t', 'top-0 left-[22%]'], outA: ['b', 'bottom-0 left-[44%]'] },
  tallL: { col: 'md:col-span-1 lg:col-span-5', surface: 'paper', inA: ['t', 'top-0 left-[36%]'], outA: ['r', 'right-0 top-[34%]'] },
  stacked: { col: 'md:col-span-1 lg:col-span-7 lg:mt-36', surface: 'dark', inA: ['l', 'left-0 top-[12%]'], outA: ['b', 'bottom-0 left-[40%]'] },
};

/** Rhythm: featured-wide pair → wide → staggered pair → reversed wide → … */
function composeSlots(list) {
  const rows = ['pairA', 'wide', 'pairB', 'wideR'];
  const out = [];
  let i = 0;
  let r = 0;
  let lastSingle = 'wideR';
  while (i < list.length) {
    const kind = rows[r % rows.length];
    const left = list.length - i;
    if (kind === 'pairA' || kind === 'pairB') {
      if (left >= 2) {
        out.push({ p: list[i], slot: kind === 'pairA' ? 'primary' : 'tallL' });
        out.push({ p: list[i + 1], slot: kind === 'pairA' ? 'tallR' : 'stacked' });
        i += 2;
      } else {
        lastSingle = lastSingle === 'wide' ? 'wideR' : 'wide';
        out.push({ p: list[i], slot: lastSingle });
        i += 1;
      }
    } else {
      lastSingle = kind;
      out.push({ p: list[i], slot: kind });
      i += 1;
    }
    r += 1;
  }
  return out;
}

/* ---------- pieces ---------- */
function Shot({ project, alt, ratio = '16 / 10', className = '', tone = 'dark', eager = false }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduce ? false : { opacity: 0, clipPath: 'inset(0% 0% 14% 0% round 18px)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 18px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div
        className={`relative overflow-hidden rounded-[18px] ${tone === 'dark' ? 'bg-[#12304A] ring-1 ring-white/10 shadow-[0_34px_70px_-30px_rgba(0,0,0,0.85)]' : 'bg-[#EFE8DA] ring-1 ring-[#061826]/10 shadow-[0_30px_60px_-34px_rgba(6,24,38,0.55)]'}`}
        style={{ aspectRatio: ratio }}
      >
        <img
          src={project.cover || project.images?.[0]?.src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </motion.div>
  );
}

function IndexNum({ n, size = 'lg', tone = 'dark' }) {
  const sizes = {
    xl: 'text-[88px] lg:text-[clamp(104px,9vw,150px)]',
    lg: 'text-[72px] lg:text-[clamp(80px,6.4vw,104px)]',
  };
  const color = tone === 'paper' ? 'text-[#061826]/[0.14]' : size === 'xl' ? 'text-[#FF7A1A]' : 'text-white/[0.16]';
  return (
    <span aria-hidden="true" className={`block font-display font-extrabold leading-[0.82] tracking-[-0.04em] tabular-nums select-none ${color} ${sizes[size]}`}>
      {n}
    </span>
  );
}

function Meta({ vi, en, tone, stack = false }) {
  const dt = tone === 'paper' ? 'text-[#486581]' : 'text-[#94A6B8]';
  const dd = tone === 'paper' ? 'text-[#10202C]' : 'text-[#F5F7F8]';
  return (
    <dl className={`grid grid-cols-1 ${stack ? 'sm:grid-cols-2 lg:grid-cols-1' : 'sm:grid-cols-2'} gap-x-6 gap-y-3`}>
      <div className="min-w-0">
        <dt className={`text-[13px] leading-[16px] font-semibold tracking-[0.14em] uppercase ${dt}`}><Bi vi="Vai trò" en="Role" /></dt>
        <dd className={`mt-1.5 text-[14px] leading-[20px] font-semibold ${dd}`}><BiBlock vi={vi?.role} en={en?.role} /></dd>
      </div>
      <div className="min-w-0">
        <dt className={`text-[13px] leading-[16px] font-semibold tracking-[0.14em] uppercase ${dt}`}><Bi vi="Nền tảng" en="Platform" /></dt>
        <dd className={`mt-1.5 text-[14px] leading-[20px] font-medium ${dd}`}><BiBlock vi={platformsOf(vi)} en={platformsOf(en)} /></dd>
      </div>
    </dl>
  );
}

function Tags({ vi, en, tone }) {
  const tv = tagsOf(vi);
  const te = tagsOf(en);
  const cls = tone === 'paper'
    ? 'border-[#061826]/20 text-[#334E68]'
    : 'border-white/20 text-[#C9D4DE]';
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {te.map((t, i) => (
        <li key={t} className={`rounded-full border px-3 py-1 text-[13px] leading-[18px] font-medium ${cls}`}>
          <BiBlock vi={tv[i] || t} en={t} />
        </li>
      ))}
    </ul>
  );
}

function Cta({ tone, year }) {
  const paper = tone === 'paper';
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={`inline-flex items-center gap-3 typo-button ${paper ? 'text-[#10202C]' : 'text-[#F5F7F8]'}`}>
        <span className="relative">
          <Bi vi="Xem chi tiết" en="View Details" />
          <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-[#FF7A1A] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" aria-hidden="true" />
        </span>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FF7A1A] text-[#061826] transition-colors group-hover:bg-[#E8680A]">
          <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-[5px] group-focus-visible:translate-x-[5px]" aria-hidden="true" />
        </span>
      </span>
      <span className={`text-[14px] tabular-nums ${paper ? 'text-[#486581]' : 'text-[#94A6B8]'}`}>{year}</span>
    </div>
  );
}

function Eyebrow({ vi, en, tone }) {
  return (
    <p className={`text-[13px] leading-[18px] font-semibold tracking-[0.12em] uppercase ${tone === 'paper' ? 'text-[#B5560A]' : 'text-[#FFB27A]'}`}>
      <BiBlock vi={vi?.productType} en={en?.productType} className="line-clamp-2" />
    </p>
  );
}

function Title({ vi, en, tone, big = false }) {
  return (
    <h3 className={`font-display font-bold tracking-[-0.02em] ${tone === 'paper' ? 'text-[#061826]' : 'text-[#F5F7F8]'} ${big ? 'text-[32px] leading-[38px] lg:text-[clamp(36px,3.4vw,50px)] lg:leading-[1.05]' : 'text-[26px] leading-[32px] lg:text-[32px] lg:leading-[38px]'}`}>
      <BiBlock vi={vi?.shortTitle} en={en?.shortTitle} />
    </h3>
  );
}

function Deck({ vi, en, tone }) {
  return (
    <p className={`font-display text-[17px] leading-[25px] font-medium ${tone === 'paper' ? 'text-[#334E68]' : 'text-[#C9D4DE]'}`}>
      <BiBlock vi={deckOf(vi)} en={deckOf(en)} />
    </p>
  );
}

function Summary({ vi, en, tone, lines = 'line-clamp-3' }) {
  return (
    <p className={`text-[15px] leading-[24px] ${tone === 'paper' ? 'text-[#486581]' : 'text-[#A9B8C6]'}`}>
      <BiBlock vi={vi?.summary || vi?.subtitle} en={en?.summary || en?.subtitle} className={lines} />
    </p>
  );
}

const SURFACE = {
  dark: 'bg-[#0B2235] border-white/10 hover:border-[#FF7A1A]/60',
  navy: 'bg-[#12304A] border-white/10 hover:border-[#FF7A1A]/60',
  paper: 'bg-[#F6F1E8] border-[#061826]/10 hover:border-[#FF7A1A]',
};

/* ---------- the card: one link, structure varies per slot ---------- */
function ProjectSlot({ project, vi, en, slot, onOpen, first }) {
  const s = SLOTS[slot];
  const tone = s.surface === 'paper' ? 'paper' : 'dark';
  const alt = project.coverLabel || project.title;
  const href = `/work/${project.slug}`;
  const anchors = (
    <>
      <span data-proj-anchor={s.inA[0]} className={`absolute w-0 h-0 hidden lg:block ${s.inA[1]}`} aria-hidden="true" />
      <span data-proj-anchor={s.outA[0]} className={`absolute w-0 h-0 hidden lg:block ${s.outA[1]}`} aria-hidden="true" />
    </>
  );

  let body;
  if (slot === 'primary') {
    body = (
      <>
        <Shot project={project} alt={alt} ratio="16 / 9" eager={first} className="mx-3 mt-3 sm:mx-5 sm:mt-5 lg:mx-0 lg:-mt-12 lg:ml-12 lg:-mr-6" />
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 p-6 sm:p-8 lg:px-10 lg:pt-9 lg:pb-10">
          <div className="flex md:flex-col items-end md:items-start justify-between gap-4">
            <IndexNum n={project.index} size="xl" />
          </div>
          <div className="min-w-0 flex flex-col gap-5">
            <Eyebrow vi={vi} en={en} tone={tone} />
            <div className="space-y-2">
              <Title vi={vi} en={en} tone={tone} big />
              <Deck vi={vi} en={en} tone={tone} />
            </div>
            <Summary vi={vi} en={en} tone={tone} />
            <div className="pt-5 border-t border-white/10"><Meta vi={vi} en={en} tone={tone} /></div>
            <Tags vi={vi} en={en} tone={tone} />
            <div className="pt-2"><Cta tone={tone} year={project.year} /></div>
          </div>
        </div>
      </>
    );
  } else if (slot === 'tallR' || slot === 'tallL') {
    const breakout = slot === 'tallR' ? 'lg:-mr-7 lg:ml-6 lg:-mt-10' : 'lg:-ml-7 lg:mr-6 lg:-mt-10';
    body = (
      <>
        <Shot project={project} alt={alt} tone={tone} className={`mx-3 mt-3 sm:mx-5 sm:mt-5 ${breakout}`} />
        <div className="flex flex-col gap-5 p-6 sm:p-7 lg:p-8 flex-1">
          <IndexNum n={project.index} tone={tone} />
          <Eyebrow vi={vi} en={en} tone={tone} />
          <div className="space-y-2">
            <Title vi={vi} en={en} tone={tone} />
            <Deck vi={vi} en={en} tone={tone} />
          </div>
          <Summary vi={vi} en={en} tone={tone} lines="line-clamp-4" />
          <div className={`pt-5 border-t ${tone === 'paper' ? 'border-[#061826]/12' : 'border-white/10'}`}><Meta vi={vi} en={en} tone={tone} /></div>
          <Tags vi={vi} en={en} tone={tone} />
          <div className="mt-auto pt-2"><Cta tone={tone} year={project.year} /></div>
        </div>
      </>
    );
  } else if (slot === 'stacked') {
    body = (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 p-6 sm:p-8 lg:p-10 pb-0 sm:pb-0 lg:pb-0">
          <div className="min-w-0 space-y-3">
            <Eyebrow vi={vi} en={en} tone={tone} />
            <Title vi={vi} en={en} tone={tone} />
            <Deck vi={vi} en={en} tone={tone} />
          </div>
          <div className="hidden sm:block"><IndexNum n={project.index} tone={tone} /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-8 p-6 sm:p-8 lg:px-10 lg:pt-7 lg:pb-0">
          <Summary vi={vi} en={en} tone={tone} lines="line-clamp-4" />
          <div className="space-y-5"><Meta vi={vi} en={en} tone={tone} stack /><Tags vi={vi} en={en} tone={tone} /></div>
        </div>
        <Shot project={project} alt={alt} tone={tone} className="mx-3 sm:mx-5 lg:mx-10 mt-2 lg:mt-6" />
        <div className="p-6 sm:p-8 lg:px-10 lg:pt-7 lg:pb-9"><Cta tone={tone} year={project.year} /></div>
      </>
    );
  } else {
    // wide / wideR: horizontal; the image column carries the index and breaks out of the side + bottom
    const rev = s.reverse;
    body = (
      <div className={`flex flex-col xl:grid xl:items-stretch gap-0 xl:gap-12 ${rev ? 'xl:grid-cols-[1fr_1.35fr]' : 'xl:grid-cols-[1.35fr_1fr]'}`}>
        <div className={`flex flex-col ${rev ? 'xl:order-2 xl:items-end' : ''}`}>
          <div className={`hidden xl:block pt-10 ${rev ? 'pr-12' : 'pl-12'}`}><IndexNum n={project.index} tone={tone} /></div>
          <Shot
            project={project}
            alt={alt}
            ratio="16 / 10"
            className={`w-auto xl:w-[calc(100%+3rem)] mx-3 mt-3 sm:mx-5 sm:mt-5 xl:mt-auto xl:-mb-10 ${rev ? 'xl:mx-0 xl:-mr-12' : 'xl:mx-0 xl:-ml-12'}`}
          />
        </div>
        <div className={`min-w-0 flex flex-col gap-5 p-6 sm:p-8 xl:py-12 ${rev ? 'xl:pl-12 xl:pr-0 xl:order-1' : 'xl:pr-12 xl:pl-0'}`}>
          <div className="xl:hidden"><IndexNum n={project.index} tone={tone} /></div>
          <Eyebrow vi={vi} en={en} tone={tone} />
          <div className="space-y-2">
            <Title vi={vi} en={en} tone={tone} />
            <Deck vi={vi} en={en} tone={tone} />
          </div>
          <Summary vi={vi} en={en} tone={tone} />
          <Meta vi={vi} en={en} tone={tone} />
          <Tags vi={vi} en={en} tone={tone} />
          <div className="pt-1"><Cta tone={tone} year={project.year} /></div>
        </div>
      </div>
    );
  }

  return (
    <RevealItem className={`relative ${s.col}`}>
      <a
        href={href}
        data-proj-card
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
          e.preventDefault();
          onOpen(project.slug);
        }}
        aria-label={`${project.index} — ${project.title} — ${project.year}`}
        className={`group relative z-10 flex flex-col rounded-[26px] border transition-colors duration-300 text-left ${SURFACE[s.surface]}`}
      >
        {anchors}
        {body}
      </a>
    </RevealItem>
  );
}

export default function Portfolio() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const projects = useProjects();
  const isVi = language === 'vi';
  const viProjects = localizeProjects('vi');
  const enProjects = localizeProjects('en');
  const bySlug = (list, slug) => list.find((p) => p.slug === slug);
  const stageRef = useRef(null);

  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'all'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // The 3 primary featured projects
  const primarySlugs = ['ha-long-luxe', 'ma-warehouse', 'tourism-omnichannel'];
  const featuredProjects = projects.filter((p) => primarySlugs.includes(p.slug));
  const remainingProjects = projects.filter((p) => !primarySlugs.includes(p.slug));

  const handleOpenProject = (slug) => {
    navigate(`/work/${slug}`);
  };

  const categories = [
    { key: 'All', vi: 'Tất cả (7)', en: 'All (7)' },
    { key: 'Vertical SaaS', vi: 'Vertical SaaS', en: 'Vertical SaaS' },
    { key: 'Booking', vi: 'Du lịch & Đặt vé', en: 'Booking & Ticketing' },
    { key: 'Operations', vi: 'Vận hành & Đa bề mặt', en: 'Operations & Multi-surface' },
  ];

  // Filtering runs on the EN source so results are identical in both languages
  const enOf = (p) => bySlug(enProjects, p.slug) || p;
  const displayedProjects =
    activeTab === 'featured'
      ? featuredProjects
      : selectedCategory === 'All'
      ? projects
      : projects.filter((p0) => {
          const p = enOf(p0);
          const k = selectedCategory.toLowerCase();
          return p.category?.toLowerCase().includes(k) || p.productType?.toLowerCase().includes(k) || p.domain?.toLowerCase().includes(k);
        });

  const slots = composeSlots(displayedProjects);
  const toggle = () => setActiveTab(activeTab === 'featured' ? 'all' : 'featured');

  return (
    <Chapter id="portfolio" number="04" variant="dark" labelledBy="portfolio-title">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
        <Reveal className="lg:col-span-8">
          <ChapterHeader
            dark
            number="04"
            titleId="portfolio-title"
            label={<Bi vi="DỰ ÁN TIÊU BIỂU" en="FEATURED WORK" />}
            title={
              <Bi
                vi={<>Những sản phẩm <span className="block text-[#FF7A1A]">đã thực hiện</span></>}
                en={<>Products Delivered with <span className="block text-[#FF7A1A]">Real Evidence</span></>}
              />
            }
            lead={
              <Bi
                vi="Tôi đã tham gia và đảm nhiệm nhiều dự án ở đa dạng lĩnh vực, từ nền tảng đặt chỗ, quản lý vận hành đến các hệ thống nội bộ doanh nghiệp."
                en="Selected digital systems demonstrating end-to-end UX architecture, business rules modeling, and production-grade delivery."
              />
            }
          />
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={activeTab !== 'featured'}
            aria-controls="portfolio-grid"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 hover:border-[#FF7A1A] text-white hover:text-[#FF7A1A] typo-button transition-colors duration-200 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {activeTab === 'featured' ? (
              <Bi vi="Xem tất cả dự án" en="View All Projects" />
            ) : (
              <Bi vi="Thu gọn dự án chính" en="Show Featured" />
            )}
          </button>
        </Reveal>
      </div>

      {/* Filter tabs ("All" view) */}
      {activeTab === 'all' && (
        <div className="flex flex-wrap items-center gap-2 mt-10" role="group" aria-label={isVi ? 'Lọc dự án' : 'Filter projects'}>
          {categories.map((cat) => {
            const active = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                aria-pressed={active}
                className={`px-4 py-2 rounded-full text-[14px] leading-[20px] font-semibold border transition-colors cursor-pointer ${
                  active ? 'bg-[#FF7A1A] border-[#FF7A1A] text-[#061826]' : 'border-white/20 text-white/80 hover:border-white/50 hover:text-white'
                }`}
              >
                <Bi vi={cat.vi} en={cat.en} />
              </button>
            );
          })}
        </div>
      )}

      {/* Editorial composition + logic thread */}
      <div ref={stageRef} className={`relative pl-6 md:pl-8 lg:pl-0 ${activeTab === 'all' ? 'mt-12 lg:mt-20' : 'mt-14 lg:mt-24'}`}>
        <ProjThread containerRef={stageRef} deps={[activeTab, selectedCategory, displayedProjects.length, language]} />

        <RevealGroup
          key={`${activeTab}-${selectedCategory}`}
          id="portfolio-grid"
          gap={0.12}
          amount={0.03}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 lg:gap-x-8 gap-y-12 md:gap-y-14 lg:gap-y-28 items-start"
        >
          {slots.map(({ p, slot }, i) => (
            <ProjectSlot
              key={p.slug}
              project={p}
              vi={bySlug(viProjects, p.slug)}
              en={bySlug(enProjects, p.slug)}
              slot={slot}
              first={i === 0}
              onOpen={handleOpenProject}
            />
          ))}
        </RevealGroup>

        {/* Thread end: open node → next action */}
        <div className="relative z-10 mt-16 lg:mt-24 flex justify-center">
          <div data-proj-end className="relative">
            <CropMarks tone="dark" size={10} className="-inset-3" />
            {activeTab === 'featured' && remainingProjects.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                aria-controls="portfolio-grid"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF7A1A] hover:bg-[#E8680A] text-[#061826] typo-button transition-colors cursor-pointer"
              >
                <Bi vi={`Khám phá thêm ${remainingProjects.length} dự án khác`} en={`Explore ${remainingProjects.length} more projects`} />
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[5px] group-focus-visible:translate-x-[5px]" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={toggle}
                aria-controls="portfolio-grid"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 hover:border-[#FF7A1A] text-white hover:text-[#FF7A1A] typo-button transition-colors cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <Bi vi="Thu gọn dự án chính" en="Show Featured" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
