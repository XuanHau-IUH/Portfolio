import React, { useState } from 'react';
import { MapPin, Mail, Phone, FileText, Send, CheckCircle2, Download, ArrowUpRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import { LinkedinIcon, GithubIcon, InstagramIcon, DribbbleIcon, BehanceIcon } from './SocialIcons';

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

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Main Floating Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 shadow-xl shadow-slate-200/50 border border-[#D9E2EC] relative overflow-hidden">
          {/* Internal ambient aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0E2A47]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="typo-eyebrow text-[#FF7A00] bg-[#FFF2E6] border border-[#FFD4B2] px-4 py-1.5 rounded-full inline-block">
              <Bi vi="LIÊN HỆ" en="CONTACT" />
            </span>
            <h2 className="typo-h2 text-[#102A43] mt-4">
              <Bi vi="Cùng xây dựng những sản phẩm có giá trị" en="Let’s Build High-Impact Products Together" />
            </h2>
            <p className="text-[#627D98] typo-lead mt-3 max-w-[62ch] mx-auto">
              <Bi vi="Nếu bạn có dự án, ý tưởng hoặc đơn giản là muốn kết nối và trao đổi, hãy liên hệ với tôi qua các kênh sau." en="Whether you have a product challenge, an open role, or just want to connect, feel free to reach out directly." />
            </p>
          </div>

          {/* 3 Direct Contact Cards: Email, LinkedIn, Message (Image 1 style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* 1. Email */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9E2EC] hover:border-[#FF7A00]/50 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#0E2A47] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0E2A47]/20 mb-4 group-hover:bg-[#FF7A00] transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="typo-eyebrow text-[#627D98]">
                EMAIL
              </h4>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[15px] sm:text-[16px] leading-[25px] font-semibold text-[#0E2A47] hover:text-[#FF7A00] hover:underline mt-1.5 block truncate max-w-full transition-colors"
              >
                {personalInfo.email}
              </a>
              <span className="typo-caption text-[#627D98] mt-1">
                <Bi vi="Phản hồi nhanh trong ngày" en="Fast response within 24h" />
              </span>
            </div>

            {/* 2. LinkedIn */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9E2EC] hover:border-[#FF7A00]/50 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#0E2A47] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0E2A47]/20 mb-4 group-hover:bg-[#FF7A00] transition-colors">
                <LinkedinIcon className="w-6 h-6" />
              </div>
              <h4 className="typo-eyebrow text-[#627D98]">
                LINKEDIN
              </h4>
              <a
                href={personalInfo.socials.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] sm:text-[16px] leading-[25px] font-semibold text-[#0E2A47] hover:text-[#FF7A00] hover:underline mt-1.5 block truncate max-w-full transition-colors"
              >
                linkedin.com/in/nguyenxuanhau
              </a>
              <span className="typo-caption text-[#627D98] mt-1">
                <Bi vi="Kết nối mạng lưới chuyên môn" en="Professional network & career updates" />
              </span>
            </div>

            {/* 3. Direct Message / Phone */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9E2EC] hover:border-[#FF7A00]/50 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#0E2A47] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0E2A47]/20 mb-4 group-hover:bg-[#FF7A00] transition-colors">
                <Send className="w-6 h-6" />
              </div>
              <h4 className="typo-eyebrow text-[#627D98]">
                <Bi vi="TIN NHẮN" en="MESSAGE" />
              </h4>
              <span className="text-[15px] sm:text-[16px] leading-[25px] font-semibold text-[#102A43] mt-1.5 block">
                <Bi vi="Sẵn sàng trao đổi về dự án" en="Ready for direct discussion" />
              </span>
              <span className="typo-caption text-[#627D98] mt-1">
                {personalInfo.phone || '0914 569 871'}
              </span>
            </div>
          </div>

          {/* Socials / KẾT NỐI CÙNG TÔI (Behance & Dribbble hidden) */}
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-[#D9E2EC] max-w-xl mx-auto text-center">
            <h4 className="typo-eyebrow text-[#627D98] mb-4">
              {t?.followMe || 'KẾT NỐI CÙNG TÔI'}
            </h4>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-50 border border-[#D9E2EC] hover:bg-[#0E2A47] text-[#102A43] hover:text-white typo-button transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-50 border border-[#D9E2EC] hover:bg-[#0E2A47] text-[#102A43] hover:text-white typo-button transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* TEMPORARILY HIDDEN PER USER REQUEST: Contact form and 3 CV download tracks */}
          {/* Can be re-enabled anytime by changing false to true */}
          {false && (
            <div className="hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-10">
                <div className="lg:col-span-12 bg-slate-50 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-[#D9E2EC]">
                  {submitted ? (
                    <div className="bg-[#FFF2E6] border border-[#FFD4B2] rounded-2xl p-6 sm:p-8 text-center space-y-3">
                      <div className="w-12 h-12 bg-[#FF7A00] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
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
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A00] text-[#102A43]"
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
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A00] text-[#102A43]"
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
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A00] text-[#102A43]"
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
                              className="w-full min-h-[48px] pl-4 pr-10 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A00] text-[#102A43]"
                            >
                              <option value="Toàn thời gian (Full-time)">{t?.budgetOption1 || 'Toàn thời gian (Full-time)'}</option>
                              <option value="Dự án / Hợp đồng (Contract/Freelance)">{t?.budgetOption2 || 'Dự án / Hợp đồng (Contract/Freelance)'}</option>
                              <option value="Tư vấn Design System & Kiểm thử QA">{t?.budgetOption3 || 'Tư vấn Design System & Kiểm thử QA'}</option>
                              <option value="Trao đổi khác">{t?.budgetOption4 || 'Trao đổi khác'}</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-[#0E2A47] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
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
                          className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-[#D9E2EC] bg-white focus:outline-none focus:border-[#FF7A00] text-[#102A43] resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#E96800] text-white font-semibold text-sm transition-colors shadow-md hover:shadow-lg shadow-[#FF7A00]/20"
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
                      className="p-5 rounded-2xl border border-[#D9E2EC] bg-white hover:border-[#0E2A47] hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Download className="w-4 h-4 text-[#0E2A47] group-hover:text-[#FF7A00] transition-colors" />
                        <span className="text-xs bg-[#FFF2E6] border border-[#FFD4B2] text-[#FF7A00] font-semibold px-2 py-0.5 rounded">{cv.badge}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#102A43] group-hover:text-[#0E2A47]">{cv.role}</h4>
                      <p className="text-xs text-[#627D98] mt-2">{cv.specialty}</p>
                      <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#0E2A47] group-hover:text-[#FF7A00] transition-colors">
                        <span>{t?.downloadPdf || 'Tải xuống PDF'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
