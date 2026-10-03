import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import Bi from './Bi';
import { CoordLabel, CropMarks } from './ui/Technical';
import HeroPortrait from './ui/hero-portrait';
import HeroThread from './ui/hero-thread';

const EASE = [0.22, 1, 0.36, 1];

const facts = [
  { value: '1+', label: <Bi vi="Năm kinh nghiệm Business Analyst" en="Years as a Business Analyst" /> },
  { value: '~1', label: <Bi vi="Năm kinh nghiệm UI/UX Design" en="Year as a UI/UX Designer" /> },
  { value: '7', label: <Bi vi="Dự án sản phẩm thực tế" en="Real product projects" /> },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const statementRef = useRef(null);
  const archRef = useRef(null);

  // Entrance order: label -> name -> description/actions -> portrait (from right) -> thread.
  const seq = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink text-white scroll-mt-16 lg:min-h-[100svh] flex"
    >
      <div className="absolute inset-0 bg-tech-grid-dark opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none bg-grain bg-grain-dark" aria-hidden="true" />
      {/* Editorial split: the right side sits on a slightly lifted navy plane */}
      <div className="absolute inset-y-0 right-0 w-[40%] bg-[#0B2235]/55 border-l border-white/[0.06] hidden lg:block pointer-events-none" aria-hidden="true" />

      <div
        ref={rootRef}
        className="relative z-10 container-wide pt-[104px] pb-16 sm:pt-[120px] sm:pb-20 lg:pt-[100px] lg:pb-12 flex flex-col justify-center"
      >
        <HeroThread rootRef={rootRef} startRef={statementRef} endRef={archRef} delay={1.3} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-10 items-center">
          {/* ------------------------------------------------------------ */}
          {/* LEFT: editorial intro                                         */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-7 text-left min-w-0">
            <motion.div className="flex flex-wrap items-center gap-x-4 gap-y-2" {...seq(0.1)}>
              <span className="typo-eyebrow max-sm:text-[13px] max-sm:tracking-[0.04em] text-[#FF7A1A]">
                <Bi vi="BUSINESS ANALYST · UI/UX DESIGNER" en="BUSINESS ANALYST · UI/UX DESIGNER" />
              </span>
              <CoordLabel tone="dark" className="hidden sm:inline-flex">00 / 07</CoordLabel>
            </motion.div>

            <motion.h1 id="hero-title" className="mt-5 sm:mt-6" {...seq(0.25)}>
              <span className="block text-[18px] leading-[26px] sm:text-[20px] sm:leading-[28px] font-semibold text-[#94A6B8]">
                <Bi vi="Xin chào, tôi là" en="Hello, I am" />
              </span>
              <span className="block mt-1 font-display font-extrabold tracking-[-0.04em] text-[#F5F7F8] text-[clamp(44px,5.3vw,84px)] leading-[1.04] pt-[0.06em]">
                <span className="block">
                  <Bi vi="Nguyễn Xuân" en="Nguyen Xuan" />
                </span>
                <span className="block">
                  <Bi
                    vi={<>Hậu<span className="text-[#FF7A1A]" aria-hidden="true">.</span></>}
                    en={<>Hau<span className="text-[#FF7A1A]" aria-hidden="true">.</span></>}
                  />
                </span>
              </span>
            </motion.h1>

            <motion.div className="mt-4 flex items-center gap-3 text-[17px] sm:text-[19px] leading-[26px] font-semibold text-[#F5F7F8]" {...seq(0.35)}>
              <span className="h-px w-8 bg-[#FF7A1A] flex-shrink-0" aria-hidden="true" />
              <span>Business Analyst & UI/UX Designer</span>
            </motion.div>

            {/* The statement: the thread starts underneath it */}
            <motion.p
              className="mt-6 sm:mt-7 max-w-[30ch] font-display font-semibold text-[22px] leading-[30px] sm:text-[26px] sm:leading-[35px]  tracking-[-0.01em] text-[#F5F7F8]"
              {...seq(0.45)}
            >
              <span ref={statementRef} className="inline-block">
                <Bi
                  vi="“Biến nghiệp vụ phức tạp thành trải nghiệm đơn giản”"
                  en="“Turning complex business logic into simple experiences”"
                />
              </span>
            </motion.p>
            {/* Mobile/tablet: the underline is a plain thread (the measured path is desktop-only) */}
            <span className="lg:hidden mt-3 flex items-center gap-2" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-[#FF7A1A]" />
              <span className="thread-h w-40" />
            </span>

            <motion.p className="typo-lead text-[#94A6B8] max-w-[54ch] mt-8 lg:mt-11" {...seq(0.55)}>
              <Bi
                vi="Tôi kết nối giữa nghiệp vụ và trải nghiệm người dùng, biến những business logic phức tạp thành sản phẩm số dễ sử dụng, hiệu quả và tạo giá trị thực tế cho người dùng."
                en="I bridge business logic and user experience, turning complex workflows and rules into digital products that are intuitive, efficient, and genuinely valuable."
              />
            </motion.p>

            <motion.div className="mt-8 lg:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4" {...seq(0.65)}>
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FF7A1A] hover:bg-[#E8680A] text-white typo-button transition-colors duration-200 min-h-[52px] whitespace-nowrap"
              >
                <span><Bi vi="Xem dự án của tôi" en="View My Work" /></span>
                <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-white/30 hover:border-[#FF7A1A] text-[#F5F7F8] typo-button transition-colors duration-200 min-h-[52px] whitespace-nowrap"
              >
                <span><Bi vi="Liên hệ với tôi" en="Contact Me" /></span>
                <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#FF7A1A] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-focus-visible:translate-x-1" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Facts: a small spec sheet */}
            <motion.dl className="mt-9 sm:mt-10 lg:mt-8 grid grid-cols-3 max-w-[620px] border-t border-white/15" {...seq(0.75)}>
              {facts.map((f, i) => (
                <div key={i} className={`relative flex flex-col pt-4 pr-3 sm:pr-5 min-w-0 ${i > 0 ? 'pl-3 sm:pl-5 border-l border-white/10' : ''}`}>
                  <span className="absolute -top-[3px] left-0 w-[5px] h-[5px] bg-[#FF7A1A]" style={{ left: i > 0 ? -3 : 0 }} aria-hidden="true" />
                  <dt className="order-last text-[13px] sm:text-[14px] leading-[19px] sm:leading-[20px] text-[#94A6B8] mt-1">{f.label}</dt>
                  <dd className="font-display text-[30px] leading-[36px] sm:text-[36px] sm:leading-[42px] font-extrabold text-[#F5F7F8] tabular-nums order-first">{f.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT: arch portrait                                          */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Mobile/tablet thread into the portrait */}
            <span className="lg:hidden absolute left-1/2 -top-14 h-10 thread-v" aria-hidden="true" />
            <motion.div
              className="relative w-[78%] max-w-[300px] sm:max-w-[340px] lg:w-full lg:max-w-[min(390px,calc((100svh-250px)*0.77))] lg:min-w-[300px] lg:mr-10 mt-6 sm:mt-10 lg:mt-0"
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, x: 80 },
                    animate: { opacity: 1, x: 0 },
                    transition: { duration: 0.9, delay: 0.85, ease: EASE },
                  })}
            >
              <HeroPortrait ref={archRef} src={personalInfo.heroImage || personalInfo.avatar} alt={personalInfo.name} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Blueprint frame corners */}
      <div className="absolute left-6 right-6 top-[86px] bottom-6 pointer-events-none hidden md:block" aria-hidden="true">
        <CropMarks tone="dark" size={18} />
      </div>
    </section>
  );
}
