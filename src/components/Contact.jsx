import React, { useState } from 'react';
import { MapPin, Mail, Phone, FileText, Send, CheckCircle2, Download, ArrowUpRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { LinkedinIcon, GithubIcon, InstagramIcon, DribbbleIcon, BehanceIcon } from './SocialIcons';

export default function Contact() {
  const { t: fullT } = useLanguage();
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
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Main Floating Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 shadow-xl shadow-stone-200/50 border border-stone-200/80 relative overflow-hidden">
          {/* Internal ambient aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 border border-amber-200/80 px-4 py-1.5 rounded-full inline-block">
              {t?.badge || 'LIÊN HỆ'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-normal leading-snug mt-4">
              {t?.title || 'Cùng xây dựng các sản phẩm số trực quan hơn.'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base md:text-lg mt-3 leading-relaxed">
              {t?.subtitle ||
                'Tôi sẵn sàng đón nhận cơ hội ở các vị trí Junior UIUX Designer, Product Designer và các dự án thiết kế định hướng sản phẩm.'}
            </p>
          </div>

          {/* 3 Direct Contact Cards: Địa điểm, Email, SĐT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* 1. Location / Địa điểm */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-amber-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-900/20 mb-4 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {t?.addressTitle || 'ĐỊA ĐIỂM'}
              </h4>
              <p className="text-base font-bold text-stone-900 mt-1.5">
                {t?.addressValue || personalInfo.location}
              </p>
              <span className="text-xs text-stone-500 mt-1">
                Việt Nam · Sẵn sàng làm việc
              </span>
            </div>

            {/* 2. Email */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-amber-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-900/20 mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {t?.emailTitle || 'EMAIL'}
              </h4>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-base font-bold text-amber-800 hover:text-amber-900 hover:underline mt-1.5 block truncate max-w-full"
              >
                {personalInfo.email}
              </a>
              <span className="text-xs text-stone-500 mt-1">
                Phản hồi nhanh trong vòng 24 giờ
              </span>
            </div>

            {/* 3. Phone / SĐT */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-amber-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-900/20 mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {t?.phoneTitle || 'SỐ ĐIỆN THOẠI'}
              </h4>
              {personalInfo.phone && personalInfo.phone !== '[NEED CONFIRMATION]' ? (
                <a
                  href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-base font-bold text-amber-800 hover:text-amber-900 hover:underline mt-1.5 block"
                >
                  {personalInfo.phone}
                </a>
              ) : (
                <p className="text-base font-bold text-stone-900 mt-1.5">
                  {t?.phoneValue || 'Sẵn sàng kết nối qua SĐT / Zalo'}
                </p>
              )}
              <span className="text-xs text-stone-500 mt-1">
                {t?.phoneNote || 'Sẵn sàng trao đổi trực tiếp'}
              </span>
            </div>
          </div>

          {/* Socials / KẾT NỐI CÙNG TÔI (Behance & Dribbble hidden) */}
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-stone-200/80 max-w-xl mx-auto text-center">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">
              {t?.followMe || 'KẾT NỐI CÙNG TÔI'}
            </h4>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-stone-100 hover:bg-amber-800 text-stone-800 hover:text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-stone-100 hover:bg-amber-800 text-stone-800 hover:text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
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
                <div className="lg:col-span-12 bg-stone-50/80 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-stone-200/70">
                  {submitted ? (
                    <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
                      <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                        {t?.successTitle || 'Đã gửi tin nhắn thành công!'}
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                        {t?.successDesc || 'Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn trong vòng 24 giờ.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                            {t?.yourName || 'Họ và tên của bạn *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t?.namePlaceholder || 'Nguyễn Văn A'}
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-stone-300 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                            {t?.yourEmail || 'Địa chỉ Email *'}
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@company.com"
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-stone-300 bg-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                            {t?.subject || 'Chủ đề trao đổi'}
                          </label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder={t?.subjectPlaceholder || 'Cơ hội việc làm / Trao đổi dự án'}
                            className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-stone-300 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                            {t?.budget || 'Loại hình cơ hội'}
                          </label>
                          <div className="relative">
                            <select
                              value={formData.budget}
                              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                              className="w-full min-h-[48px] pl-4 pr-10 py-3 rounded-xl border border-stone-300 bg-white"
                            >
                              <option value="Toàn thời gian (Full-time)">{t?.budgetOption1 || 'Toàn thời gian (Full-time)'}</option>
                              <option value="Dự án / Hợp đồng (Contract/Freelance)">{t?.budgetOption2 || 'Dự án / Hợp đồng (Contract/Freelance)'}</option>
                              <option value="Tư vấn Design System & Kiểm thử QA">{t?.budgetOption3 || 'Tư vấn Design System & Kiểm thử QA'}</option>
                              <option value="Trao đổi khác">{t?.budgetOption4 || 'Trao đổi khác'}</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-amber-800 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                          {t?.message || 'Nội dung lời nhắn *'}
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t?.messagePlaceholder || 'Chia sẻ thông tin về sản phẩm...'}
                          className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-stone-300 bg-white resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-amber-800 text-white font-semibold text-sm"
                      >
                        <span>{isSubmitting ? (t?.sending || 'Đang gửi...') : (t?.send || 'Gửi tin nhắn')}</span>
                        <Send className="w-4 h-4 flex-shrink-0" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-stone-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cvList.map((cv) => (
                    <a
                      key={cv.id}
                      href={`/cv/${cv.fileName}`}
                      download={cv.fileName}
                      className="p-5 rounded-2xl border border-stone-200 bg-white"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Download className="w-4 h-4" />
                        <span className="text-xs bg-amber-100 text-amber-900">{cv.badge}</span>
                      </div>
                      <h4 className="text-base font-bold text-stone-900">{cv.role}</h4>
                      <p className="text-xs text-stone-500 mt-2">{cv.specialty}</p>
                      <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-800">
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
