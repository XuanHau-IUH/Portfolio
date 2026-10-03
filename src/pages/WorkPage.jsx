import React, { useState } from 'react';
import { ArrowUpRight, Layers, ArrowLeft, FolderKanban, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../data/localizeProjects';
import { useLanguage } from '../context/LanguageContext';
import ProjectImage from '../components/ProjectImage';

export default function WorkPage() {
  const { language } = useLanguage();
  const projects = useProjects();
  const isVi = language === 'vi';
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { key: "All", label: isVi ? "Tất cả" : "All" },
    { key: "Vertical SaaS", label: "Vertical SaaS" },
    { key: "Travel & Booking", label: isVi ? "Du lịch & Đặt vé" : "Travel & Booking" },
    { key: "Internal Operations", label: isVi ? "Vận hành nội bộ" : "Internal Operations" },
    { key: "Hybrid BA + UX", label: "Hybrid BA + UX" },
  ];

  const featuredGroup = projects.filter((p) => p.featured);
  const secondaryGroup = projects.filter((p) => !p.featured);

  // Filter logic
  const matchesCategory = (project, cat) => {
    if (cat === "All") return true;
    if (cat === "Vertical SaaS") return project.tags.includes("Vertical SaaS") || project.productType.includes("Vertical SaaS");
    if (cat === "Travel & Booking") return project.tags.includes("Travel Booking") || project.domain.includes("Tourism");
    if (cat === "Internal Operations") return project.tags.includes("Enterprise UX") || project.productType.includes("Internal");
    if (cat === "Hybrid BA + UX") return project.tags.includes("Hybrid BA + UX") || project.role.includes("Business Analysis");
    return true;
  };

  const filteredFeatured = featuredGroup.filter((p) => matchesCategory(p, activeCategory));
  const filteredSecondary = secondaryGroup.filter((p) => matchesCategory(p, activeCategory));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#F6F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 typo-caption text-slate-400 mb-8">
          <Link to="/" className="hover:text-[#FF7A1A] transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isVi ? 'Trang chủ' : 'Home'}</span>
          </Link>
          <span>/</span>
          <span className="text-[#102A43] font-semibold">{isVi ? 'Dự án & Case Studies' : 'Portfolio & Case Studies'}</span>
        </div>

        {/* Page Header */}
        <div className="text-left max-w-3xl space-y-4 mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl typo-eyebrow bg-[#FFF2E6] border border-[#FFD4B2] text-[#FF7A1A]">
            <FolderKanban className="w-4 h-4 text-[#FF7A1A]" />
            {isVi ? 'Danh mục dự án' : 'Selected Portfolio'}
          </span>
          <h1 className="typo-h1 text-[#102A43]">
            {isVi ? 'Dự Án & Case Studies' : 'Work & Case Studies'}
          </h1>
          <p className="typo-lead text-[#627D98] max-w-[62ch]">
            {isVi 
              ? '7 sản phẩm số thực tế trải dài từ Vertical SaaS, hệ thống đặt vé du lịch, vận hành kho vé nội bộ đến tích hợp bảo hiểm.'
              : '7 digital products spanning Vertical SaaS, travel booking, internal inventory operations, omnichannel ecosystems, and hybrid Business Analysis.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-14 pb-4 border-b border-[#D9E2EC]">
          <div className="flex items-center gap-1.5 typo-eyebrow text-[#627D98] mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>{isVi ? 'Lọc theo:' : 'Filter:'}</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full typo-nav transition-all duration-200 cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#0B2235] text-white shadow-md shadow-[#0B2235]/20 scale-105'
                  : 'bg-white text-[#627D98] hover:text-[#0B2235] hover:bg-slate-50 border border-[#D9E2EC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ==================================================== */}
        {/* GROUP 1: FEATURED PRODUCT WORK                       */}
        {/* ==================================================== */}
        {filteredFeatured.length > 0 && (
          <section className="space-y-8 mb-20">
            <div className="text-left border-b border-[#D9E2EC] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A1A]" />
                <span className="typo-eyebrow text-[#FF7A1A]">
                  {isVi ? 'Nhóm 01' : 'Group 01'}
                </span>
              </div>
              <h2 className="typo-h2 text-[#102A43] mt-1">
                {isVi ? 'Dự Án Sản Phẩm Tiêu Biểu' : 'Featured Product Work'}
              </h2>
              <p className="typo-small text-[#627D98] mt-1 max-w-[62ch]">
                {isVi 
                  ? 'Các hệ thống có độ phức tạp cao, nền tảng đặt vé xuyên suốt và nghiệp vụ quản lý dữ liệu lớn.'
                  : 'High-complexity systems, end-to-end booking platforms, and enterprise data operations.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
              {filteredFeatured.map((project) => (
                <article
                  key={project.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-[#D9E2EC] shadow-sm hover:shadow-xl hover:shadow-[#0B2235]/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col text-left justify-between"
                >
                  {/* Card Cover */}
                  <div className="p-3 sm:p-4 pb-0">
                    <Link to={`/work/${project.slug}`} className="block relative group">
                      <ProjectImage
                        src={project.cover}
                        projectName={project.shortTitle}
                        label={project.coverLabel}
                        expectedFile={project.images[0]?.expectedFile || '01-cover.webp'}
                        description={project.summary}
                        aspectRatio="16/10"
                        alt={project.title}
                      />
                      <div className="absolute inset-0 bg-[#061826]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl md:rounded-3xl flex items-center justify-center pointer-events-none">
                        <span className="bg-[#FF7A1A] text-white typo-label-semibold px-5 py-2.5 rounded-2xl shadow-lg inline-flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="typo-caption font-semibold text-[#FF7A1A] bg-[#FFF2E6] border border-[#FFD4B2] px-2.5 py-1 rounded-lg">
                            PROJECT {project.index}
                          </span>
                          <span className="text-[14px] leading-[19px] font-medium text-[#627D98]">
                            {project.role}
                          </span>
                        </div>
                        <span className="typo-caption text-slate-400">
                          {project.year}
                        </span>
                      </div>

                      <Link to={`/work/${project.slug}`} className="block group-hover:text-[#FF7A1A] transition-colors">
                        <h3 className="text-[18px] leading-[27px] font-semibold text-[#102A43] group-hover:text-[#FF7A1A] transition-colors leading-snug">
                          {project.title}
                        </h3>
                      </Link>

                      <p className="typo-small text-[#627D98] leading-relaxed font-normal">
                        {project.summary}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-slate-50 text-[#102A43] typo-caption font-medium border border-[#D9E2EC]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between">
                        <div className="flex items-center gap-2 typo-caption text-[#627D98]">
                          <Layers className="w-3.5 h-3.5 text-[#0B2235]" />
                          <span className="truncate max-w-[200px] sm:max-w-none">
                            {project.platforms.join(' · ')}
                          </span>
                        </div>

                        <Link
                          to={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 typo-label-semibold text-[#0B2235] hover:text-[#FF7A1A] transition-colors"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* GROUP 2: OTHER PRODUCT WORK                          */}
        {/* ==================================================== */}
        {filteredSecondary.length > 0 && (
          <section className="space-y-8">
            <div className="text-left border-b border-[#D9E2EC] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B2235]" />
                <span className="typo-eyebrow text-[#0B2235]">
                  {isVi ? 'Nhóm 02' : 'Group 02'}
                </span>
              </div>
              <h2 className="typo-h2 text-[#102A43] mt-1">
                {isVi ? 'Các Dự Án Sản Phẩm Khác' : 'Other Product Work'}
              </h2>
              <p className="typo-small text-[#627D98] mt-1 max-w-[62ch]">
                {isVi 
                  ? 'Các dự án kết hợp phân tích nghiệp vụ, tối ưu hóa điểm chạm vận hành và website doanh nghiệp.'
                  : 'Hybrid Business Analysis, operational touchpoint support, and marketing web platforms.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {filteredSecondary.map((project) => (
                <article
                  key={project.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-[#D9E2EC] shadow-sm hover:shadow-xl hover:shadow-[#0B2235]/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col text-left justify-between"
                >
                  <div className="p-3 pb-0">
                    <Link to={`/work/${project.slug}`} className="block relative group">
                      <ProjectImage
                        src={project.cover}
                        projectName={project.shortTitle}
                        label={project.coverLabel}
                        expectedFile={project.images[0]?.expectedFile || '01-cover.webp'}
                        description={project.summary}
                        aspectRatio="16/10"
                        alt={project.title}
                      />
                      <div className="absolute inset-0 bg-[#061826]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center pointer-events-none">
                        <span className="bg-[#FF7A1A] text-white typo-label-semibold px-4 py-2 rounded-2xl shadow-lg inline-flex items-center gap-1">
                          <span>View Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between typo-caption">
                        <span className="font-semibold text-[#FF7A1A] bg-[#FFF2E6] border border-[#FFD4B2] px-2 py-0.5 rounded">
                          PROJECT {project.index}
                        </span>
                        <span className="text-slate-400 font-medium">
                          {project.year}
                        </span>
                      </div>

                      <Link to={`/work/${project.slug}`} className="block group-hover:text-[#FF7A1A] transition-colors">
                        <h3 className="text-[18px] leading-[27px] font-semibold text-[#102A43] group-hover:text-[#FF7A1A] transition-colors leading-snug">
                          {project.title}
                        </h3>
                      </Link>

                      <div className="text-[14px] leading-[19px] font-medium text-[#0B2235]">
                        {project.role}
                      </div>

                      <p className="typo-small text-[#627D98] leading-relaxed font-normal">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 typo-caption text-[#627D98]">
                        <Layers className="w-3 h-3 text-[#0B2235]" />
                        <span className="truncate max-w-[140px] sm:max-w-none">
                          {project.platforms[0]}
                        </span>
                      </div>

                      <Link
                        to={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1 typo-label-semibold text-[#0B2235] hover:text-[#FF7A1A] transition-colors"
                      >
                        <span>Case Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

