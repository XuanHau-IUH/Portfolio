import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Download, ArrowUpRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import Chapter from './ui/Chapter';
import { CoordLabel, Monogram } from './ui/Technical';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Contact() {
  const { t: fullT, language } = useLanguage();
  const isVi = language === 'vi';
  const t = fullT?.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    budget: 'Toàn thời gian (Full-time)',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        budget: 'Toàn thời gian (Full-time)',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1000);
  };

  const cvList = t?.cvList || [
    {
      id: 'uiux',
      role: 'CV UI/UX Designer',
      specialty: 'Thiết kế Sản phẩm, Design System, SaaS Đa Phân Quyền',
      fileName: 'Nguyen_Xuan_Hau_CV_UIUX_Designer.pdf',
      badge: 'Chuyên môn UI/UX',
    },
    {
      id: 'ba',
      role: 'CV Business Analyst (BA)',
      specialty: 'Đặc tả yêu cầu, Logic nghiệp vụ, RBAC, Luồng tương tác',
      fileName: 'Nguyen_Xuan_Hau_CV_Business_Analyst.pdf',
      badge: 'Chuyên môn BA',
    },
    {
      id: 'tech',
      role: 'CV Kỹ thuật Máy tính / IT',
      specialty: 'Kiến trúc CSDL, Truy vấn SQL, Tư duy kỹ thuật hệ thống',
      fileName: 'Nguyen_Xuan_Hau_CV_Computer_Engineering.pdf',
      badge: 'Kỹ thuật & Dữ liệu',
    },
  ];

  const reduce = useReducedMotion();
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.6 });
  const railRef = useRef(null);
  const railInView = useInView(railRef, { once: true, amount: 0.05 });
  const showRail = reduce || railInView;
  const showEnd = reduce || ctaInView;

  const rowBase =
    'group grid grid-cols-[40px_1fr] sm:grid-cols-[48px_1fr_auto] items-start gap-x-4 sm:gap-x-5 py-5 sm:py-6 border-t border-white/10 text-left';
  const rowIcon =
    'mt-0.5 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 text-[#FF7A1A] flex items-center justify-center transition-colors duration-200 group-hover:border-[#FF7A1A] group-focus-visible:border-[#FF7A1A]';
  const rowValue =
    'block mt-2 font-display text-[18px] leading-[26px] sm:text-[22px] sm:leading-[30px] xl:text-[24px] xl:leading-[32px] font-semibold tracking-[-0.01em] text-[#F5F7F8] transition-colors duration-200 [overflow-wrap:anywhere]';
  const rowArrow =
    'hidden sm:block mt-2 w-6 h-6 text-[#94A6B8] transition-[transform,color] duration-200 group-hover:text-[#FF7A1A] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:text-[#FF7A1A] group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1';

  return (
    <Chapter id="contact" number="07" variant="dark" labelledBy="contact-title">
      {/* Threaded composition: the logic thread arrives from chapter 06 down the left rail */}
      <div ref={railRef} className="relative pl-8 sm:pl-12 lg:pl-20">
        <span
          className="absolute left-[7px] sm:left-[11px] lg:left-[19px] -top-[100svh] bottom-7 w-px bg-white/10"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inset-0 origin-top bg-gradient-to-b from-[#FF7A1A]/0 via-[#FF7A1A] to-[#FF7A1A]"
            initial={{ scaleY: reduce ? 1 : 0 }}
            animate={{ scaleY: showRail ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1.4, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>

        {/* Chapter label with station node on the rail */}
        <Reveal className="relative flex items-center gap-3">
          <span
            className="absolute -left-[33px] sm:-left-[45px] lg:-left-[69px] top-1/2 -translate-y-1/2 w-[13px] h-[13px] rounded-full bg-[#FF7A1A] ring-4 ring-[#FF7A1A]/20"
            aria-hidden="true"
          />
          <span className="inline-flex items-center justify-center min-w-9 h-9 px-2 rounded-lg border border-[#FF7A1A] text-[14px] font-bold tabular-nums text-[#FF7A1A]">
            07
          </span>
          <span className="typo-eyebrow text-[#94A6B8]">
            <Bi vi="LIÊN HỆ" en="CONTACT" />
          </span>
        </Reveal>

        {/* HUGE heading across the composition */}
        <Reveal delay={0.08} y={36}>
          <h2
            id="contact-title"
            className="mt-6 sm:mt-8 font-display font-bold text-[#F5F7F8] text-[clamp(2.5rem,6.6vw,6.25rem)] leading-[1.02] tracking-[-0.045em]"
          >
            <Bi
              vi={<><span className="sm:block">Cùng xây dựng</span> <span className="sm:block">những sản phẩm</span> <span className="sm:block text-[#FF7A1A]">có giá trị</span></>}
              en={<><span className="sm:block">Let’s Build</span> <span className="sm:block"><span className="whitespace-nowrap">High-Impact</span> Products</span> <span className="sm:block text-[#FF7A1A]">Together</span></>}
            />
          </h2>
        </Reveal>

        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-12">
          {/* Lead + socials */}
          <Reveal delay={0.12} className="lg:col-span-5 text-left">
            <p className="typo-lead text-[#94A6B8] max-w-[44ch]">
              <Bi
                vi="Nếu bạn có dự án, ý tưởng hoặc đơn giản là muốn kết nối và trao đổi, hãy liên hệ với tôi qua các kênh sau."
                en="Whether you have a product challenge, an open role, or just want to connect, feel free to reach out directly."
              />
            </p>
            <h3 className="mt-8 lg:mt-10 typo-eyebrow text-[#94A6B8] mb-4">
              <Bi vi="KẾT NỐI CÙNG TÔI" en="Connect with me" />
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2.5 px-5 py-3 min-h-[48px] rounded-full border border-white/20 hover:border-[#FF7A1A] hover:text-[#FF7A1A] text-[#F5F7F8] typo-button transition-colors duration-200"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2.5 px-5 py-3 min-h-[48px] rounded-full border border-white/20 hover:border-[#FF7A1A] hover:text-[#FF7A1A] text-[#F5F7F8] typo-button transition-colors duration-200"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </Reveal>

          {/* Contact index: Email, LinkedIn, Message */}
          <RevealGroup as="ul" gap={0.1} className="lg:col-span-7 xl:col-span-6 xl:col-start-7 border-b border-white/10">
            <RevealItem as="li">
              <a href={`mailto:${personalInfo.email}`} className={rowBase}>
                <span className={rowIcon} aria-hidden="true"><Mail className="w-[18px] h-[18px]" /></span>
                <span className="min-w-0">
                  <span className="block text-[12px] leading-none font-semibold uppercase tracking-[0.14em] text-[#94A6B8]">Email</span>
                  <span className={`${rowValue} group-hover:text-[#FF7A1A]`}>{personalInfo.email}</span>
                  <span className="block typo-small text-[#94A6B8] mt-1">
                    <Bi vi="Phản hồi nhanh trong ngày" en="Fast response within 24h" />
                  </span>
                </span>
                <ArrowUpRight className={rowArrow} aria-hidden="true" />
              </a>
            </RevealItem>
            <RevealItem as="li">
              <a
                href={personalInfo.socials.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className={rowBase}
              >
                <span className={rowIcon} aria-hidden="true"><LinkedinIcon className="w-[18px] h-[18px]" /></span>
                <span className="min-w-0">
                  <span className="block text-[12px] leading-none font-semibold uppercase tracking-[0.14em] text-[#94A6B8]">LinkedIn</span>
                  <span className={`${rowValue} group-hover:text-[#FF7A1A]`}>linkedin.com/in/<wbr />nguyenxuanhau</span>
                  <span className="block typo-small text-[#94A6B8] mt-1">
                    <Bi vi="Kết nối mạng lưới chuyên môn" en="Professional network & career updates" />
                  </span>
                </span>
                <ArrowUpRight className={rowArrow} aria-hidden="true" />
              </a>
            </RevealItem>
            <RevealItem as="li">
              <div className={rowBase}>
                <span className={rowIcon} aria-hidden="true"><Send className="w-[18px] h-[18px]" /></span>
                <span className="min-w-0">
                  <span className="block text-[12px] leading-none font-semibold uppercase tracking-[0.14em] text-[#94A6B8]">
                    <Bi vi="Tin nhắn" en="Message" />
                  </span>
                  <span className={rowValue}>
                    <Bi vi="Sẵn sàng trao đổi về dự án" en="Ready for direct discussion" />
                  </span>
                  <span className="block typo-small text-[#94A6B8] mt-1 tabular-nums">
                    {personalInfo.phone || '0914 569 871'}
                  </span>
                </span>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Primary CTA sits on the thread; the thread then continues as an OPEN path */}
        <div ref={ctaRef} className="relative mt-12 sm:mt-14 lg:mt-16 h-14 flex items-center">
          {/* elbow from the rail into the button */}
          <motion.span
            className="absolute top-1/2 -left-[25px] w-[25px] sm:-left-[37px] sm:w-[37px] lg:-left-[61px] lg:w-[61px] h-px bg-[#FF7A1A] origin-left"
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: showEnd ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.1, ease: 'easeOut' }}
            aria-hidden="true"
          />
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="group relative z-10 inline-flex items-center gap-3 h-14 pl-6 pr-5 sm:pl-7 sm:pr-6 rounded-full bg-[#FF7A1A] hover:bg-[#E8680A] text-[#061826] typo-button font-bold transition-colors duration-200 flex-shrink-0"
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -12 }}
            animate={{ opacity: showEnd ? 1 : 0, x: showEnd ? 0 : -12 }}
            transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span><Bi vi="Gửi tin nhắn" en="Send Message" /></span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-focus-visible:translate-x-1" aria-hidden="true" />
          </motion.a>
          {/* open, unfinished end: dashed, fading, hollow node */}
          <motion.span
            className="relative flex-1 mx-3 sm:mx-5 h-px origin-left"
            style={{
              backgroundImage: 'repeating-linear-gradient(to right, #FF7A1A 0 6px, transparent 6px 13px)',
              WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 45%, rgba(0,0,0,0.25) 100%)',
              maskImage: 'linear-gradient(to right, #000 0%, #000 45%, rgba(0,0,0,0.25) 100%)',
            }}
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: showEnd ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
          <motion.span
            className="flex-shrink-0 w-4 h-4 rounded-full border-[1.5px] border-[#FF7A1A]/70"
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
            animate={{ opacity: showEnd ? 1 : 0, scale: showEnd ? 1 : 0.4 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Signature */}
      <Reveal delay={0.1} className="mt-14 sm:mt-16 lg:mt-20 flex items-end justify-between gap-6 pt-6 border-t border-white/10">
        <CoordLabel>Nguyễn Xuân Hậu</CoordLabel>
        <Monogram className="text-[26px] sm:text-[30px] leading-none" />
      </Reveal>

          {/* TEMPORARILY HIDDEN PER USER REQUEST: Contact form and 3 CV download tracks */}
          {/* Can be re-enabled anytime by changing false to true */}
          {false && (
            <div className="hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-10">
                <div className="lg:col-span-12 bg-slate-50 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-[#D9E2EC]">
                  {submitted ? (
                    <div className="bg-[#FFF2E6] border border-[#FFD4B2] rounded-2xl p-6 sm:p-8 text-center space-y-3">
                      <div className="w-12 h-12 bg-[#FF7A1A] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#102A43]">
                        {t?.successTitle || 'Đã gửi tin nhắn thành công!'}
                      </h3>
                      <p className="text-[#627D98] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                        {t?.successDesc || 'Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn trong vòng 24 giờ.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                            {t?.yourName || 'Họ và tên của bạn *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t?.namePlaceholder || 'Nguyễn Văn A'}
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A1A] text-[#102A43]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                            {t?.yourEmail || 'Địa chỉ Email *'}
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@company.com"
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A1A] text-[#102A43]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                            {t?.subject || 'Chủ đề trao đổi'}
                          </label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder={t?.subjectPlaceholder || 'Cơ hội việc làm / Trao đổi dự án'}
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A1A] text-[#102A43]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                            {t?.budget || 'Loại hình cơ hội'}
                          </label>
                          <div className="relative">
                            <select
                              value={formData.budget}
                              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                              className="w-full min-h-[48px] pl-4 pr-10 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A1A] text-[#102A43]"
                            >
                              <option value="Toàn thời gian (Full-time)">{t?.budgetOption1 || 'Toàn thời gian (Full-time)'}</option>
                              <option value="Dự án / Hợp đồng (Contract/Freelance)">{t?.budgetOption2 || 'Dự án / Hợp đồng (Contract/Freelance)'}</option>
                              <option value="Tư vấn Design System & Kiểm thử QA">{t?.budgetOption3 || 'Tư vấn Design System & Kiểm thử QA'}</option>
                              <option value="Trao đổi khác">{t?.budgetOption4 || 'Trao đổi khác'}</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-[#0B2235] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-2">
                          {t?.message || 'Nội dung lời nhắn *'}
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t?.messagePlaceholder || 'Chia sẻ thông tin về sản phẩm...'}
                          className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A1A] text-[#102A43] resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#FF7A1A] hover:bg-[#E8680A] text-white font-semibold text-sm transition-colors shadow-md hover:shadow-lg shadow-[#FF7A1A]/20"
                      >
                        <span>{isSubmitting ? (t?.sending || 'Đang gửi...') : (t?.send || 'Gửi tin nhắn')}</span>
                        <Send className="w-4 h-4 flex-shrink-0" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#D9E2EC]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cvList.map((cv) => (
                    <a
                      key={cv.id}
                      href={`/cv/${cv.fileName}`}
                      download={cv.fileName}
                      className="p-5 rounded-2xl border border-[#D9E2EC] bg-white hover:border-[#0B2235] hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Download className="w-4 h-4 text-[#0B2235] group-hover:text-[#FF7A1A] transition-colors" />
                        <span className="text-xs bg-[#FFF2E6] border border-[#FFD4B2] text-[#FF7A1A] font-semibold px-2 py-0.5 rounded">{cv.badge}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#102A43] group-hover:text-[#0B2235]">{cv.role}</h4>
                      <p className="text-xs text-[#627D98] mt-2">{cv.specialty}</p>
                      <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#0B2235] group-hover:text-[#FF7A1A] transition-colors">
                        <span>{t?.downloadPdf || 'Tải xuống PDF'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
    </Chapter>
  );
}
