import React, { useState } from 'react';
import { MapPin, Mail, Send, CheckCircle2, FileText } from 'lucide-react';
import { personalInfo } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';
import { DribbbleIcon, LinkedinIcon, InstagramIcon, BehanceIcon } from './SocialIcons';

export default function Contact() {
  const { language, t } = useLanguage();
  const isVi = language === 'vi';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    budget: isVi ? 'Toàn thời gian (Full-time)' : 'Full-time Product Role',
    message: ''
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
        budget: isVi ? 'Toàn thời gian (Full-time)' : 'Full-time Product Role',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Floating Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl shadow-slate-200/80 border border-slate-100 relative overflow-hidden">
          {/* Internal ambient aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  {t.contact.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                  {t.contact.title}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed font-normal">
                  {t.contact.subtitle}
                </p>
              </div>

              {/* Info Items List */}
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50 hover:bg-purple-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.contact.addressTitle}</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{t.contact.addressValue}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50 hover:bg-purple-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.contact.emailTitle}</h4>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-purple-700 hover:underline mt-0.5 block">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Resume Download / Request */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/50 hover:bg-purple-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.contact.phoneTitle}</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {t.contact.phoneValue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t.contact.followMe}</h4>
                <div className="flex items-center gap-2.5">
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                    aria-label="Dribbble"
                  >
                    <DribbbleIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm hover:bg-purple-700 transition-colors"
                    aria-label="Behance"
                  >
                    <BehanceIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200/60 text-left">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{t.contact.successTitle}</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    {t.contact.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t.contact.yourName}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isVi ? "Nguyễn Văn A" : "John Doe"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t.contact.yourEmail}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t.contact.subject}
                      </label>
                      <input
                        type="text"
                        placeholder={isVi ? "Cơ hội việc làm / Trao đổi dự án" : "Product Opportunity"}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t.contact.budget}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                      >
                        {isVi ? (
                          <>
                            <option value="Toàn thời gian (Full-time)">Toàn thời gian (Full-time)</option>
                            <option value="Junior UIUX / Product Designer">Junior UIUX / Product Designer</option>
                            <option value="Hợp đồng / Dự án (Contract)">Hợp đồng / Dự án (Contract)</option>
                            <option value="Tư vấn hệ thống (Consultation)">Tư vấn hệ thống (Consultation)</option>
                          </>
                        ) : (
                          <>
                            <option value="Full-time Product Role">Full-time Product Role</option>
                            <option value="Junior UIUX / Product Designer">Junior UIUX / Product Designer</option>
                            <option value="Contract / Project">Contract / Project</option>
                            <option value="Design Consultation">Design Consultation</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={isVi ? "Chia sẻ thông tin về sản phẩm, bài toán hoặc cơ hội hợp tác..." : "Tell me a bit about your product goals, timeline, and challenges..."}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all duration-200 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.sending}</span>
                    ) : (
                      <>
                        <span>{t.contact.send}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
