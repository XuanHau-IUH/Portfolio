import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, FolderKanban, Filter, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import { useProjects } from '../data/localizeProjects';

export default function Portfolio() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const projects = useProjects();
  const isVi = language === 'vi';

  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'all' | category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define the 3 primary hero projects
  const primarySlugs = ['ha-long-luxe', 'ma-warehouse', 'tourism-omnichannel'];
  const featuredProjects = projects.filter((p) => primarySlugs.includes(p.slug));
  const remainingProjects = projects.filter((p) => !primarySlugs.includes(p.slug));

  const handleOpenProject = (slug) => {
    navigate(`/work/${slug}`);
  };

  const categories = [
    { key: 'All', label: isVi ? 'Tất cả (7)' : 'All (7)' },
    { key: 'Vertical SaaS', label: 'Vertical SaaS' },
    { key: 'Booking', label: isVi ? 'Du lịch & Đặt vé' : 'Booking & Ticketing' },
    { key: 'Operations', label: isVi ? 'Vận hành & Đa bề mặt' : 'Operations & Multi-surface' },
  ];

  const displayedProjects =
    activeTab === 'featured'
      ? featuredProjects
      : selectedCategory === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.productType?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.domain?.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <section id="portfolio" className="py-16 sm:py-20 md:py-24 lg:py-24 relative bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Header: Title + Subtitle + View All Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 sm:pb-12 border-b border-[#D9E2EC]/80">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full typo-eyebrow bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2]">
              <FolderKanban className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
              <span><Bi vi="DỰ ÁN TIÊU BIỂU" en="FEATURED WORK" /></span>
            </span>

            <h2 className="typo-h2 text-[#102A43]">
              <Bi vi="Những sản phẩm" en="Products Delivered with" />{' '}
              <span className="text-[#FF7A00] block">
                <Bi vi="đã thực hiện" en="Real Evidence" />
              </span>
            </h2>

            <p className="typo-lead text-[#627D98] max-w-[62ch]">
              <Bi vi="Tôi đã tham gia và đảm nhiệm nhiều dự án ở đa dạng lĩnh vực, từ nền tảng đặt chỗ, quản lý vận hành đến các hệ thống nội bộ doanh nghiệp." en="Selected digital systems demonstrating end-to-end UX architecture, business rules modeling, and production-grade delivery." />
            </p>
          </div>

          <div className="lg:col-span-4 text-left lg:text-right">
            <button
              onClick={() => setActiveTab(activeTab === 'featured' ? 'all' : 'featured')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#0E2A47] typo-button border-2 border-[#0E2A47] hover:border-[#163E63] shadow-xs transition-all duration-200 cursor-pointer"
            >
              <span>{activeTab === 'featured' ? (isVi ? 'Xem tất cả dự án' : 'View All Projects') : (isVi ? 'Thu gọn dự án chính' : 'Show Featured')}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Filter Tabs when in "All" view */}
        {activeTab === 'all' && (
          <div className="flex flex-wrap items-center gap-2 mt-8 animate-fadeIn">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#0E2A47] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-[#D9E2EC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid: 3 Editorial Cards on Desktop (Image 1 style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12 text-left">
          {displayedProjects.map((project) => (
            <div
              key={project.slug}
              onClick={() => handleOpenProject(project.slug)}
              className="bg-white rounded-3xl overflow-hidden border border-[#D9E2EC] shadow-sm hover:shadow-2xl hover:shadow-slate-900/10 hover:border-[#FF7A00] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Large Real UI Preview (16:10 ratio) */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={project.cover || project.images?.[0]?.src}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Dark Gradient Overlay for text contrast */}
                  

                  {/* Top-Right Platform Tag */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="tabular-nums text-[13px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0E2A47] shadow-sm">
                      {project.index}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7">
                  {/* Category & Platform Badges */}
                  <div className="flex flex-wrap items-start content-start gap-2 mb-3 lg:min-h-[58px]">
                    <span className="text-[14px] leading-[20px] font-semibold text-[#E96800] bg-[#FFF2E6] border border-[#FFD4B2] px-2.5 py-1 rounded-xl">
                      {project.productType || project.domain?.split('·')[0]?.trim()}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-[20px] leading-[28px] font-bold text-[#102A43] group-hover:text-[#FF7A00] transition-colors min-h-[56px] lg:min-h-[84px]">
                    {project.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="typo-small text-[#627D98] mt-2.5 line-clamp-3 min-h-[72px]">
                    {project.summary || project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Footer: Action Link */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 min-h-[64px]">
                <span className="text-xs font-bold text-[#0E2A47] group-hover:text-[#FF7A00] inline-flex items-center gap-1.5 transition-colors">
                  <span><Bi vi="Xem chi tiết" en="View Details" /></span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[13px] tabular-nums text-slate-400">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner when on featured view: Link to view all */}
        {activeTab === 'featured' && remainingProjects.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveTab('all')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0E2A47] hover:bg-[#163E63] text-white text-xs font-bold shadow-md shadow-[#0E2A47]/20 transition-all cursor-pointer"
            >
              <span>{isVi ? `Khám phá thêm ${remainingProjects.length} dự án khác` : `Explore ${remainingProjects.length} more projects`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
