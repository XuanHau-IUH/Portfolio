import React, { useState } from 'react';
import { MapPin, Mail, FileText, Send, CheckCircle2, Download, ArrowUpRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { DribbbleIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

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
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-[#FBFBFE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Main Floating Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-14 shadow-2xl shadow-slate-200/80 border border-slate-100 relative overflow-hidden">
          {/* Internal ambient aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Contact Information & 3 CV Tracks */}
            <div className="lg:col-span-5 text-left space-y-6 sm:space-y-7">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full">
                  {t?.badge || 'LIÊN HỆ'}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-normal leading-snug mt-3">
                  {t?.title || 'Cùng xây dựng các sản phẩm số trực quan hơn.'}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2.5 sm:mt-3 leading-relaxed">
                  {t?.subtitle ||
                    'Tôi sẵn sàng đón nhận cơ hội ở các vị trí Junior UIUX Designer, Product Designer và các dự án thiết kế định hướng sản phẩm.'}
                </p>
              </div>

              {/* Info Items List */}
              <div className="space-y-3.5 sm:space-y-4">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/60 hover:bg-purple-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
                      {t?.addressTitle || 'ĐỊA ĐIỂM'}
                    </h4>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 mt-0.5 truncate">
                      {t?.addressValue || personalInfo.location}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/60 hover:bg-purple-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
                      {t?.emailTitle || 'EMAIL'}
                    </h4>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm sm:text-base font-semibold text-purple-700 hover:underline mt-0.5 block truncate"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Resume note */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/60 hover:bg-purple-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
                      {t?.phoneTitle || 'HỒ SƠ NĂNG LỰC'}
                    </h4>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 mt-0.5 truncate">
                      {t?.phoneValue || 'Sẵn sàng cung cấp bản PDF'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div className="pt-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {t?.followMe || 'KẾT NỐI CÙNG TÔI'}
                </h4>
                <div className="flex items-center gap-2.5">
                  <a
                    href={personalInfo.socials.dribbble}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Dribbble"
                    className="w-11 h-11 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  >
                    <DribbbleIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-11 h-11 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-11 h-11 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.socials.behance}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Behance"
                    className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm hover:bg-purple-700 transition-colors"
                  >
                    Bē
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-slate-50/50 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-100">
              {submitted ? (
                <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {t?.successTitle || 'Đã gửi tin nhắn thành công!'}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    {t?.successDesc ||
                      'Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn trong vòng 24 giờ.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
                  {/* Row 1: Name and Email (1 col on mobile, 2 cols on sm+) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t?.yourName || 'Họ và tên của bạn *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t?.namePlaceholder || 'Nguyễn Văn A'}
                        className="w-full min-h-[48px] sm:min-h-[50px] px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t?.yourEmail || 'Địa chỉ Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@company.com"
                        className="w-full min-h-[48px] sm:min-h-[50px] px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-white"
                      />
                    </div>
                  </div>

                  {/* Row 2: Subject and Opportunity Type (1 col on mobile, 2 cols on sm+) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t?.subject || 'Chủ đề trao đổi'}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={t?.subjectPlaceholder || 'Cơ hội việc làm / Trao đổi dự án'}
                        className="w-full min-h-[48px] sm:min-h-[50px] px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {t?.budget || 'Loại hình cơ hội'}
                      </label>
                      <div className="relative">
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full min-h-[48px] sm:min-h-[50px] pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 text-slate-900 text-sm outline-none transition-all bg-white appearance-none cursor-pointer"
                        >
                          <option value="Toàn thời gian (Full-time)">{t?.budgetOption1 || 'Toàn thời gian (Full-time)'}</option>
                          <option value="Dự án / Hợp đồng (Contract/Freelance)">{t?.budgetOption2 || 'Dự án / Hợp đồng (Contract/Freelance)'}</option>
                          <option value="Tư vấn Design System & Kiểm thử QA">{t?.budgetOption3 || 'Tư vấn Design System & Kiểm thử QA'}</option>
                          <option value="Trao đổi khác">{t?.budgetOption4 || 'Trao đổi khác'}</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-purple-600 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  {/* Message Field: min-h-[120px] */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t?.message || 'Nội dung lời nhắn *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t?.messagePlaceholder || 'Chia sẻ thông tin về sản phẩm, bài toán hoặc cơ hội hợp tác...'}
                      className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 bg-white resize-none"
                    />
                  </div>

                  {/* Submit Button: Full width on mobile, auto on sm+ */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all duration-200 disabled:opacity-50 cursor-pointer min-h-[48px]"
                  >
                    <span>{isSubmitting ? (t?.sending || 'Đang gửi tin nhắn...') : (t?.send || 'Gửi tin nhắn')}</span>
                    <Send className="w-4 h-4 flex-shrink-0" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Horizontal 3 Specialized CV Download Tracks */}
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5 sm:mb-6">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider">
                  {t?.cvDownloadsTitle || 'Tải Hồ Sơ Năng Lực (3 Chuyên Môn)'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {t?.cvDownloadsSubtitle || 'Chọn phiên bản PDF phù hợp với vị trí tuyển dụng'}
                </p>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-1 rounded-full w-fit">
                {t?.cvPdfsReady || '3 File PDF Sẵn Sàng'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {cvList.map((cv) => (
                <a
                  key={cv.id}
                  href={`/cv/${cv.fileName}`}
                  download={cv.fileName}
                  target="_blank"
                  rel="noreferrer"
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-purple-50/70 hover:border-purple-300 transition-all duration-200 group flex flex-col justify-between text-left shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-purple-300 group-hover:bg-purple-600 group-hover:text-white text-purple-600 flex items-center justify-center transition-colors shadow-sm flex-shrink-0">
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">
                        {cv.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                      {cv.role}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                      {cv.specialty}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-purple-700">
                    <span>{t?.downloadPdf || 'Tải xuống PDF'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
