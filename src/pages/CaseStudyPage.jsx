import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  Calendar, 
  User, 
  Lightbulb,
  Workflow,
  CheckCircle2, 
  Compass, 
  AlertCircle,
  Monitor,
  Smartphone,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Activity,
  Cpu
} from 'lucide-react';
import { useProjects } from '../data/localizeProjects';
import { useLanguage } from '../context/LanguageContext';
import ProjectImage from '../components/ProjectImage';
import uiDict from '../data/uiI18n.json';

export default function CaseStudyPage({ modalSlug, isModal = false, onNavigate, onClose }) {
  const params = useParams();
  const slug = modalSlug || params?.slug;
  const { language } = useLanguage();
  const projects = useProjects();
  const isVi = language === 'vi';
  const tt = (s) => uiDict[s]?.[language] ?? s;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="pt-40 pb-28 min-h-screen bg-[#F8FAFC] flex items-center justify-center text-center px-4">
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF2E6] text-[#FF7A00] flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{tt("Project Not Found")}</h2>
          <p className="text-sm text-slate-500"> {tt("The project you're looking for does not exist or has been moved.")} </p>
          <div className="pt-2">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF7A00] text-white font-semibold text-sm hover:bg-[#E96800] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tt("Back to All Work")}</span>
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
    <article className={isModal ? "py-6 sm:py-10 bg-[#F8FAFC] text-slate-800" : "pt-32 pb-28 min-h-screen bg-[#F8FAFC] text-slate-800"}>
      {/* Top Breadcrumb & Navigation (shown only on full page view) */}
      {!isModal && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#FF7A00] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isVi ? 'Quay lại danh sách dự án' : 'Back to All Projects'}</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="tabular-nums text-xs font-bold text-[#FF7A00] bg-[#FFF2E6] border border-[#FFD4B2] px-2.5 py-1 rounded-full">
                {isVi ? `DỰ ÁN ${project.index} TRÊN 07` : `PROJECT ${project.index} OF 07`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Hero Header */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6 mb-12">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full typo-eyebrow bg-[#FFF2E6] border border-[#FFD4B2] text-[#FF7A00]">
              <Layers className="w-3.5 h-3.5 text-[#FF7A00]" />
              {project.eyebrow || project.productType}
            </span>
            <span className="typo-caption text-slate-400">
              {project.year}
            </span>
          </div>

          <h1 className="typo-case-title text-slate-900">
            {project.title}
          </h1>

          <p className="typo-case-subtitle text-slate-600 max-w-[54ch]">
            {project.intro || project.subtitle}
          </p>
        </div>

        {/* Metadata Grid: 12px / 18px / 500 label & 14px / 22px / 600 value */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm typo-caption">
          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <User className="w-3.5 h-3.5 text-[#0E2A47]" />
              <span>{isVi ? 'Vai trò' : 'Role'}</span>
            </div>
            <div className="typo-small-semibold text-slate-800 mt-1">
              {project.role}
            </div>
            {project.metadata?.baContribution && (
              <div className="typo-caption text-[#FF7A00] font-semibold mt-0.5">
                + {isVi ? 'Đóng góp BA: ' : 'BA: '}{project.metadata.baContribution}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Compass className="w-3.5 h-3.5 text-[#0E2A47]" />
              <span>{isVi ? 'Lĩnh vực' : 'Domain'}</span>
            </div>
            <div className="typo-small-semibold text-slate-800 mt-1 truncate">
              {project.metadata?.domain || project.domain || project.productType}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Layers className="w-3.5 h-3.5 text-[#0E2A47]" />
              <span>{isVi ? 'Nền tảng' : 'Platforms'}</span>
            </div>
            <div className="typo-small-semibold text-slate-800 mt-1">
              {project.metadata?.platforms || (Array.isArray(project.platforms) ? project.platforms.slice(0, 3).join(' · ') : project.platforms)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#0E2A47]" />
              <span>{isVi ? 'Thời gian' : 'Timeline'}</span>
            </div>
            <div className="typo-small-semibold text-slate-800 mt-1">
              {project.year}
            </div>
          </div>
        </div>

        {/* Scope pill if present in metadata */}
        {project.metadata?.scope && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-baseline gap-1.5 shadow-2xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider tabular-nums shrink-0">
              {isVi ? 'Phạm vi:' : 'Scope:'}
            </span>
            <span className="font-medium text-slate-700">{project.metadata.scope}</span>
          </div>
        )}

        {/* Skill tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-semibold text-slate-400 mr-1 uppercase tracking-wider tabular-nums">
              {isVi ? 'Kỹ năng cốt lõi:' : 'Core Skills:'}
            </span>
            {project.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white text-slate-700 font-medium text-xs border border-slate-200/80 shadow-2xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}
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
            <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full"> {tt("Overview")} </span>
            <h2 className="typo-case-major text-slate-900 mt-3"> {tt("Product Summary & Context")} </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {project.summary}
          </p>

          {project.complexity && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] text-sm space-y-1.5">
              <span className="font-bold text-[#0E2A47] uppercase tracking-wider text-xs block"> {tt("System Complexity")} </span>
              <p className="text-slate-700 leading-relaxed">
                {project.complexity}
              </p>
            </div>
          )}

          {/* Key Work Responsibilities */}
          {project.keyWork && project.keyWork.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs"> {tt("Key Responsibilities & Scope")} </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                {project.keyWork.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
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
            {/* 04. Challenge / Bài toán */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  {project.challenge?.sectionLabel || tt("BÀI TOÁN")}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.challenge?.title || tt("Kết nối trải nghiệm booking với hệ thống vận hành phía sau")}
                </h2>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed space-y-4">
                <p> {tt("Ha Long Luxe không chỉ là một website đặt du thuyền. Hệ thống phải kết nối trải nghiệm của khách hàng với nhiều quy trình vận hành phía sau như lịch khởi hành, cabin, tồn kho, booking, agency, tài chính và phân quyền.")} </p>
                <p> {tt("Thách thức thiết kế nằm ở việc giữ cho trải nghiệm booking đơn giản với người dùng, trong khi vẫn mô hình hóa đủ business logic và trạng thái cần thiết cho đội ngũ vận hành.")} </p>
              </div>
            </section>

            {/* 05. Product Ecosystem */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("02 · Hệ sinh thái sản phẩm")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.ecosystem?.title || tt("Một sản phẩm, nhiều góc nhìn vận hành")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(project.ecosystem?.groups || [
                  { name: tt("B2C BOOKING"), flow: tt("Search · Cruise Detail · Cabin · Passenger · Payment") },
                  { name: tt("B2B AGENCY"), flow: tt("Reservation · Credit · Inventory · Reconciliation") },
                  { name: tt("ADMIN OPERATIONS"), flow: tt("Booking · Schedule · Fleet · Inventory · Finance · RBAC") }
                ]).map((grp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] flex flex-col justify-between">
                    <div>
                      <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block mb-2">
                        {grp.name}
                      </span>
                      <p className="text-[#102A43] text-sm font-medium leading-relaxed">
                        {grp.flow}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 06. Booking Journey */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("03 · Hành trình đặt chỗ")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.bookingJourney?.title || tt("Từ khám phá du thuyền đến hoàn tất đặt chỗ")}
                </h2>
              </div>

              {/* Stepper Visual */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
                {(project.bookingJourney?.steps || [
                  tt("Search"), tt("Results"), tt("Cruise Detail"), tt("Deck & Cabin"), tt("Passenger Information"), tt("Payment"), tt("Confirmation")
                ]).map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-[#D9E2EC] text-left">
                    <span className="text-xs tabular-nums text-[#FF7A00] font-bold block">{tt("STEP")} {idx + 1}</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block leading-snug">{step}</span>
                  </div>
                ))}
              </div>

              {/* Booking Journey Images */}
              <div className="space-y-6 pt-2">
                {getImage('02-booking-home') && (
                  <ProjectImage
                    src={getImage('02-booking-home').src}
                    projectName={project.shortTitle}
                    label={getImage('02-booking-home').label}
                    expectedFile={getImage('02-booking-home').expectedFile}
                    description={getImage('02-booking-home').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 01: Homepage khám phá và tìm chuyến du thuyền nhanh theo bộ lọc trực quan.")}
                  />
                )}

                {getImage('03-search-results') && (
                  <ProjectImage
                    src={getImage('03-search-results').src}
                    projectName={project.shortTitle}
                    label={getImage('03-search-results').label}
                    expectedFile={getImage('03-search-results').expectedFile}
                    description={getImage('03-search-results').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 02: Kết quả tìm kiếm và so sánh chi tiết các lựa chọn du thuyền.")}
                  />
                )}

                {getImage('04-cruise-detail') && (
                  <ProjectImage
                    src={getImage('04-cruise-detail').src}
                    projectName={project.shortTitle}
                    label={getImage('04-cruise-detail').label}
                    expectedFile={getImage('04-cruise-detail').expectedFile}
                    description={getImage('04-cruise-detail').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 03: Cruise Detail & Content Hierarchy: Hành trình, tiện ích và chính sách.")}
                  />
                )}
              </div>
            </section>

            {/* 07. Deck & Cabin Selection */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("04 · Trải nghiệm chọn cabin")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Biến sơ đồ tàu thành một trải nghiệm chọn cabin dễ hiểu")} </h2>
                <p className="text-sm text-slate-500 mt-1"> {tt("Giao diện tổ chức thông tin theo ba lớp: Deck → vị trí cabin → chi tiết cabin, đồng thời giữ booking summary luôn hiện diện để người dùng kiểm tra lựa chọn và tổng chi phí.")} </p>
              </div>

              {getImage('05-deck-cabin-selection') && (
                <ProjectImage
                  src={getImage('05-deck-cabin-selection').src}
                  projectName={project.shortTitle}
                  label={getImage('05-deck-cabin-selection').label}
                  expectedFile={getImage('05-deck-cabin-selection').expectedFile}
                  description={getImage('05-deck-cabin-selection').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 04: Sơ đồ boong và tương tác lựa chọn cabin thời gian thực.")}
                />
              )}

              {/* Design Decisions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-[#D9E2EC]">
                  <h4 className="font-bold text-[#0E2A47] text-sm mb-1">{tt("Context before detail")}</h4>
                  <p className="text-xs text-[#627D98] leading-relaxed"> {tt("Cho người dùng thấy cabin nằm ở đâu trên tàu trước khi đọc thông tin chi tiết.")} </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-[#D9E2EC]">
                  <h4 className="font-bold text-[#0E2A47] text-sm mb-1">{tt("Availability as state")}</h4>
                  <p className="text-xs text-[#627D98] leading-relaxed"> {tt("Phân biệt trạng thái cabin khả dụng, đang chọn, không khả dụng và cabin được đề xuất.")} </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-[#D9E2EC]">
                  <h4 className="font-bold text-[#0E2A47] text-sm mb-1">{tt("Persistent booking summary")}</h4>
                  <p className="text-xs text-[#627D98] leading-relaxed"> {tt("Giữ thông tin booking và chi phí hiển thị xuyên suốt thay vì bắt người dùng nhớ lựa chọn ở bước trước.")} </p>
                </div>
              </div>
            </section>

            {/* 08. Booking Information & Checkout */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("05 · Thông tin đặt chỗ & Checkout")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Gom dữ liệu phức tạp thành một checkout có cấu trúc")} </h2>
                <p className="text-sm text-slate-500 mt-1"> {tt("Layout chia form thành từng nhóm nghiệp vụ và đặt booking summary bên cạnh để người dùng có thể kiểm tra giá, ưu đãi và thông tin chuyến trong suốt quá trình nhập dữ liệu.")} </p>
              </div>

              {getImage('06-booking-information') && (
                <ProjectImage
                  src={getImage('06-booking-information').src}
                  projectName={project.shortTitle}
                  label={getImage('06-booking-information').label}
                  expectedFile={getImage('06-booking-information').expectedFile}
                  description={getImage('06-booking-information').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 05: Passenger Information & Checkout flow.")}
                />
              )}
            </section>

            {/* 09. Admin Operations */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("06 · Vận hành quản trị (Admin Operations)")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Customer experience chỉ là một nửa của sản phẩm")} </h2>
                <p className="text-sm text-slate-500 mt-1"> {tt("Phía sau booking experience là hệ thống vận hành cho phép đội ngũ quản lý booking theo nhiều trạng thái, kênh bán, tour/chuyến, hành khách và nghiệp vụ xử lý.")} </p>
              </div>

              {getImage('07-admin-booking-management') && (
                <ProjectImage
                  src={getImage('07-admin-booking-management').src}
                  projectName={project.shortTitle}
                  label={getImage('07-admin-booking-management').label}
                  expectedFile={getImage('07-admin-booking-management').expectedFile}
                  description={getImage('07-admin-booking-management').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 06: Bảng điều khiển quản lý booking theo từng trạng thái vận hành chuyên sâu.")}
                />
              )}

              {/* Status Domain Highlights */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900">{tt("Tách biệt trạng thái theo từng Domain")}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase">{tt("01 Booking Status")}</span>
                    <p className="text-xs text-slate-600">{tt("Quản lý vòng đời đặt chỗ: Đang giữ, Đã xác nhận, Đã hủy, Hết hạn.")}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase">{tt("02 Payment Status")}</span>
                    <p className="text-xs text-slate-600">{tt("Sổ cái tài chính: Chưa thanh toán, Đặt cọc một phần, Đã thanh toán, Hoàn tiền.")}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase">{tt("03 Allocation Status")}</span>
                    <p className="text-xs text-slate-600">{tt("Phân bổ cabin: Chưa xếp, Khóa cabin, Đã check-in, Lên tàu.")}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pt-1"> {tt("Thay vì gom nhiều nghiệp vụ vào một trạng thái duy nhất, các trạng thái được tách theo từng domain để người vận hành biết chính xác booking đang ở đâu, tiền đã xử lý đến mức nào và inventory đã được phân bổ hay chưa.")} </p>
              </div>
            </section>

            {/* 10. Fleet & Inventory */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("07 · Cấu trúc đội tàu & Quản lý tồn kho")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Kết nối cấu trúc vật lý của tàu với inventory vận hành")} </h2>
                <p className="text-sm text-slate-500 mt-1"> {tt("Admin cần quản lý không chỉ loại phòng mà cả cấu trúc vật lý: Tàu → Boong → Khu vực → Cabin → Loại cabin → Inventory theo chuyến.")} </p>
              </div>

              {getImage('08-admin-fleet-deck') && (
                <ProjectImage
                  src={getImage('08-admin-fleet-deck').src}
                  projectName={project.shortTitle}
                  label={getImage('08-admin-fleet-deck').label}
                  expectedFile={getImage('08-admin-fleet-deck').expectedFile}
                  description={getImage('08-admin-fleet-deck').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 07: Sơ đồ boong quản trị cấu trúc vật lý của tàu.")}
                />
              )}

              {getImage('09-inventory-slot') && (
                <ProjectImage
                  src={getImage('09-inventory-slot').src}
                  projectName={project.shortTitle}
                  label={getImage('09-inventory-slot').label}
                  expectedFile={getImage('09-inventory-slot').expectedFile}
                  description={getImage('09-inventory-slot').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 08: Theo dõi sức chứa, số đã đặt, đang giữ và cabin còn khả dụng theo từng lịch khởi hành.")}
                />
              )}
            </section>

            {/* 11. B2B Booking */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("08 · Kênh Đại lý B2B")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("B2B booking trong cùng hệ sinh thái vận hành")} </h2>
                <p className="text-sm text-slate-500 mt-1"> {tt("Luồng B2B bổ sung context của đại lý, nghiệp vụ giữ chỗ và các điều kiện vận hành riêng nhưng vẫn sử dụng cùng nền tảng booking và inventory logic.")} </p>
              </div>

              {getImage('10-b2b-booking') && (
                <ProjectImage
                  src={getImage('10-b2b-booking').src}
                  projectName={project.shortTitle}
                  label={getImage('10-b2b-booking').label}
                  expectedFile={getImage('10-b2b-booking').expectedFile}
                  description={getImage('10-b2b-booking').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 09: B2B Agency Booking flow.")}
                />
              )}
            </section>

            {/* 12. Responsive Design */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("09 · Thiết kế đa thiết bị")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Một capability, nhiều interaction pattern")} </h2>
                <p className="text-sm text-slate-500 mt-1"> {tt("Responsive design không đơn thuần thu nhỏ desktop. Các capability quan trọng được giữ lại nhưng hierarchy, navigation, form layout và booking summary được tổ chức lại cho từng viewport.")} </p>
              </div>

              {/* Mobile screenshots inside device-sized responsive containers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto py-2">
                {getImage('11-mobile-booking-home') && (
                  <div className="max-w-[320px] mx-auto w-full">
                    <ProjectImage
                      src={getImage('11-mobile-booking-home').src}
                      projectName={project.shortTitle}
                      label={getImage('11-mobile-booking-home').label}
                      expectedFile={getImage('11-mobile-booking-home').expectedFile}
                      description={getImage('11-mobile-booking-home').slotPurpose}
                      aspectRatio="mobile"
                      caption={tt("Figure 10: Mobile Booking Home")}
                    />
                  </div>
                )}

                {getImage('12-mobile-cabin-selection') && (
                  <div className="max-w-[320px] mx-auto w-full">
                    <ProjectImage
                      src={getImage('12-mobile-cabin-selection').src}
                      projectName={project.shortTitle}
                      label={getImage('12-mobile-cabin-selection').label}
                      expectedFile={getImage('12-mobile-cabin-selection').expectedFile}
                      description={getImage('12-mobile-cabin-selection').slotPurpose}
                      aspectRatio="mobile"
                      caption={tt("Figure 11: Mobile Cabin Selection")}
                    />
                  </div>
                )}
              </div>

              {getImage('13-responsive-overview') && (
                <ProjectImage
                  src={getImage('13-responsive-overview').src}
                  projectName={project.shortTitle}
                  label={getImage('13-responsive-overview').label}
                  expectedFile={getImage('13-responsive-overview').expectedFile}
                  description={getImage('13-responsive-overview').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 12: Tổng quan trải nghiệm đa thiết bị Desktop, Tablet và Mobile.")}
                />
              )}
            </section>

            {/* 13. Design QA & Handoff */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("10 · Design QA & Handoff")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Từ prototype đến handoff")} </h2>
                <p className="text-sm text-slate-500 mt-1"> {tt("Prototype và design specifications được sử dụng để làm rõ interaction trước khi development.")} </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900">{tt("Design QA tập trung vào:")}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    tt("Responsive behavior"),
                    tt("Validation"),
                    tt("Disabled / Success / Error states"),
                    tt("Component consistency"),
                    tt("Cross-module consistency"),
                    tt("Developer handoff")
                  ].map((focus, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] flex-shrink-0" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 14. Project Scope (Phạm vi hệ thống: 14 compact pills/tags) */}
            <section className="space-y-4">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("11 · Phạm vi hệ thống")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("PHẠM VI HỆ THỐNG (")}{project.modules.length} {tt("Modules)")} </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                {project.modules.map((mod, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-[#102A43] font-semibold border border-[#D9E2EC] shadow-xs"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </section>
          </>
        )}

        {/* --- CASE 02: VEVUIVE --- */}
        {project.slug === 'vevuive' && (
          <>
            {/* 01. The Challenge */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  {isVi ? 'BÀI TOÁN' : 'THE CHALLENGE'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.challenge?.title || tt("Giữ một hành trình booking nhất quán trên nhiều nền tảng")}
                </h2>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed space-y-4">
                <p> {tt("Vevuive phục vụ nhiều bước trong cùng một hành trình: từ khám phá điểm đến và sản phẩm, lựa chọn vé, voucher và thông tin khách hàng đến bảo hiểm, thanh toán và quản lý vé sau mua.")} </p>
                <p> {tt("Thách thức không chỉ nằm ở việc thiết kế từng màn hình riêng lẻ, mà là đảm bảo business capability được giữ nhất quán giữa Web và Mobile trong khi interaction, hierarchy và cách trình bày phải phù hợp với từng thiết bị.")} </p>
              </div>
            </section>

            {/* 02. Product Ecosystem */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  02 · {isVi ? 'Hệ sinh thái sản phẩm' : 'Product Ecosystem'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.productEcosystem?.title || tt("Một hành trình xuyên suốt trước, trong và sau booking")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.productEcosystem?.supportingCopy || tt("Thay vì xem từng màn hình như một chức năng độc lập, flow được tổ chức quanh lifecycle của người dùng từ lúc tìm trải nghiệm đến khi sử dụng và quản lý vé sau mua.")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(project.productEcosystem?.groups || [
                  { name: tt("DISCOVERY"), items: [tt("Homepage"), tt("Explore"), tt("Destination"), tt("Service Detail")] },
                  { name: tt("BOOKING"), items: [tt("Ticket Selection"), tt("Voucher"), tt("Cart"), tt("Customer Information")] },
                  { name: tt("PROTECTION & PAYMENT"), items: [tt("Insurance"), tt("Insured Person"), tt("Payment"), tt("Confirmation")] },
                  { name: tt("POST-BOOKING"), items: [tt("E-ticket"), tt("Orders"), tt("Account"), tt("Insurance Management")] },
                ]).map((grp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase tracking-wider">
                          0{idx + 1} {grp.name}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {grp.items.map((it, itIdx) => (
                          <li key={itIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] flex-shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 03. Booking Journey */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  03 · {isVi ? 'Hành trình đặt vé' : 'Booking Journey'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.bookingJourney?.title || tt("Từ khám phá đến nhận vé điện tử")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.bookingJourney?.content}
                </p>
              </div>

              {/* 10-step journey grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-medium">
                {(project.bookingJourney?.steps || []).map((step, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs">
                    <span className="tabular-nums text-xs text-[#FF7A00] block font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-slate-800 leading-snug mt-1 block font-semibold">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. Web to Mobile Adaptation */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  04 · {isVi ? 'Thích ứng Web sang Mobile' : 'Web to Mobile Adaptation'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.webToMobile?.title || tt("Feature parity không đồng nghĩa với layout parity")}
                </h2>
              </div>

              {/* Highlight Quote */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-[#D9E2EC]">
                <blockquote className="text-lg sm:text-xl font-bold text-[#0E2A47] italic">
                  "{project.webToMobile?.highlightQuote || tt("Same capability. Different interaction pattern.")}"
                </blockquote>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  {project.webToMobile?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(project.webToMobile?.designPrinciples || []).map((dp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block">
                      0{idx + 1} · {dp.title}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{dp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. Discovery Layer */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  05 · {isVi ? 'Khám phá & Trải nghiệm' : 'Discovery Layer'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.discovery?.title || tt("Từ khám phá địa điểm đến một sản phẩm cụ thể")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.discovery?.content}
                </p>
              </div>

              <div className="space-y-6">
                {getImage('02-booking-home') && (
                  <ProjectImage
                    src={getImage('02-booking-home').src}
                    projectName={project.shortTitle}
                    label={getImage('02-booking-home').label}
                    expectedFile={getImage('02-booking-home').expectedFile}
                    description={getImage('02-booking-home').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 01: Booking Homepage — Tối ưu tìm kiếm và điều hướng nhanh đến trải nghiệm phù hợp.")}
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getImage('03-explore-grid') && (
                    <ProjectImage
                      src={getImage('03-explore-grid').src}
                      projectName={project.shortTitle}
                      label={getImage('03-explore-grid').label}
                      expectedFile={getImage('03-explore-grid').expectedFile}
                      description={getImage('03-explore-grid').slotPurpose}
                      aspectRatio="16/10"
                      caption={tt("Figure 02: Explore Grid — Duyệt và so sánh các khu du lịch, điểm đến và sản phẩm.")}
                    />
                  )}
                  {getImage('04-destination-detail') && (
                    <ProjectImage
                      src={getImage('04-destination-detail').src}
                      projectName={project.shortTitle}
                      label={getImage('04-destination-detail').label}
                      expectedFile={getImage('04-destination-detail').expectedFile}
                      description={getImage('04-destination-detail').slotPurpose}
                      aspectRatio="16/10"
                      caption={tt("Figure 03: Destination Detail — Tổ chức thông tin địa điểm và booking entry points theo hierarchy rõ ràng.")}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* 06. Ticket Selection & Booking Configuration */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  06 · {isVi ? 'Cấu hình vé & Đặt chỗ' : 'Ticket Selection & Configuration'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.ticketSelection?.title || tt("Biến cấu hình vé thành một quyết định dễ kiểm soát")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.ticketSelection?.content}
                </p>
              </div>

              {/* Design Focus Pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                {(project.ticketSelection?.designFocus || []).map((f, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2] rounded-full font-semibold">
                    ✓ {f}
                  </span>
                ))}
              </div>

              {/* Primary visual: 05-service-booking */}
              {getImage('05-service-booking') && (
                <ProjectImage
                  src={getImage('05-service-booking').src}
                  projectName={project.shortTitle}
                  label={getImage('05-service-booking').label}
                  expectedFile={getImage('05-service-booking').expectedFile}
                  description={getImage('05-service-booking').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 04: Service Detail & Booking Configuration — Kết hợp dịch vụ, ngày, khung giờ, vé, voucher và booking summary.")}
                />
              )}

              {/* Desktop vs Mobile Comparison */}
              <div className="pt-4">
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {isVi ? 'So sánh tương tác: Desktop Modal vs Mobile Adaptation' : 'Interaction Comparison: Desktop Modal vs Mobile Adaptation'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isVi ? 'Cùng nghiệp vụ cấu hình vé nhưng trải nghiệm trên Mobile được tổ chức trong khung nhìn hẹp tối ưu thao tác.' : 'Same ticket configuration capability adapted to mobile viewport.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8">
                    {getImage('06-booking-modal-desktop') && (
                      <ProjectImage
                        src={getImage('06-booking-modal-desktop').src}
                        projectName={project.shortTitle}
                        label={getImage('06-booking-modal-desktop').label}
                        expectedFile={getImage('06-booking-modal-desktop').expectedFile}
                        description={getImage('06-booking-modal-desktop').slotPurpose}
                        aspectRatio="16/10"
                        caption={tt("Figure 05a: Desktop Focused Booking Modal")}
                      />
                    )}
                  </div>
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="w-full max-w-[320px]">
                      {getImage('07-booking-modal-mobile') && (
                        <ProjectImage
                          src={getImage('07-booking-modal-mobile').src}
                          projectName={project.shortTitle}
                          label={getImage('07-booking-modal-mobile').label}
                          expectedFile={getImage('07-booking-modal-mobile').expectedFile}
                          description={getImage('07-booking-modal-mobile').slotPurpose}
                          aspectRatio="mobile"
                          caption={tt("Figure 05b: Mobile Booking Adaptation")}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 07. Cart & Customer Information */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  07 · {isVi ? 'Giỏ hàng & Thông tin khách hàng' : 'Cart & Customer Information'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.cartVoucher?.title || tt("Giữ ưu đãi minh bạch trước khi checkout")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.cartVoucher?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('08-cart') && (
                  <ProjectImage
                    src={getImage('08-cart').src}
                    projectName={project.shortTitle}
                    label={getImage('08-cart').label}
                    expectedFile={getImage('08-cart').expectedFile}
                    description={getImage('08-cart').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 06: Cart & Voucher — Kiểm tra lựa chọn, chiết tính giá và mức ưu đãi rõ ràng.")}
                  />
                )}
                {getImage('09-checkout-customer') && (
                  <ProjectImage
                    src={getImage('09-checkout-customer').src}
                    projectName={project.shortTitle}
                    label={getImage('09-checkout-customer').label}
                    expectedFile={getImage('09-checkout-customer').expectedFile}
                    description={getImage('09-checkout-customer').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 07: Customer Information & Checkout — Nhóm dữ liệu nghiệp vụ, phân biệt bắt buộc và tự động mapping.")}
                  />
                )}
              </div>
            </section>

            {/* 08. Insurance Integration (High-Priority BA + UIUX Contribution) */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  08 · {isVi ? 'Tích hợp bảo hiểm (BA + UI/UX Contribution)' : 'Insurance Integration (BA + UI/UX Contribution)'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.insuranceIntegration?.title || tt("Chuyển business rule bảo hiểm thành một trải nghiệm dễ hiểu")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.insuranceIntegration?.content}
                </p>
              </div>

              {/* Principle badge */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#D9E2EC] text-xs font-bold text-[#0E2A47]">
                ⭐ {isVi ? 'Nguyên tắc thiết kế: ' : 'Design Principle: '}
                <span className="font-bold">{project.insuranceIntegration?.designPrinciple || tt("Business rule first, interface second.")}</span>
              </div>

              {/* 6 Key Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(project.insuranceIntegration?.areas || []).map((area, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1.5">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block">
                      0{idx + 1} · {area.name}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{area.description}</p>
                  </div>
                ))}
              </div>

              {getImage('10-insurance-detail') && (
                <ProjectImage
                  src={getImage('10-insurance-detail').src}
                  projectName={project.shortTitle}
                  label={getImage('10-insurance-detail').label}
                  expectedFile={getImage('10-insurance-detail').expectedFile}
                  description={getImage('10-insurance-detail').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 08: Insurance Detail Experience — Quyền lợi, điều kiện, quy định và hỗ trợ bảo hiểm được tổ chức minh bạch.")}
                />
              )}
            </section>

            {/* 09. Checkout & Payment */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  09 · {isVi ? 'Thanh toán & Xác nhận' : 'Checkout & Payment'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.checkoutPayment?.title || tt("Giữ quyết định thanh toán rõ ràng ở bước có nhiều rủi ro nhất")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.checkoutPayment?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('11-payment-qr') && (
                  <ProjectImage
                    src={getImage('11-payment-qr').src}
                    projectName={project.shortTitle}
                    label={getImage('11-payment-qr').label}
                    expectedFile={getImage('11-payment-qr').expectedFile}
                    description={getImage('11-payment-qr').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 09: QR Payment Screen — Giữ QR, thông tin giao dịch, countdown và booking summary cùng ngữ cảnh.")}
                  />
                )}
                {getImage('12-booking-success') && (
                  <ProjectImage
                    src={getImage('12-booking-success').src}
                    projectName={project.shortTitle}
                    label={getImage('12-booking-success').label}
                    expectedFile={getImage('12-booking-success').expectedFile}
                    description={getImage('12-booking-success').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 10: Booking Success & Post-booking — Tiếp tục dẫn người dùng đến chi tiết đơn hàng và nhận vé điện tử.")}
                  />
                )}
              </div>
            </section>

            {/* 10. Robust System States */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  10 · {isVi ? 'Trạng thái hệ thống' : 'System States'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.systemStates?.title || tt("Thiết kế cả những trạng thái không phải happy path")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.systemStates?.content}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                {(project.systemStates?.states || []).map((st, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs text-center">
                    <span className="text-[#0E2A47] tabular-nums text-xs block font-bold">0{idx + 1}</span>
                    <span className="text-slate-800 font-semibold mt-1 block">{st}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 11. Responsive Design & Overview */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  11 · {isVi ? 'Thiết kế Responsive & Đa nền tảng' : 'Responsive Design & Multi-Platform'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.responsiveDesign?.title || tt("Cùng một business goal, khác cách tương tác")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.responsiveDesign?.content}
                </p>
              </div>

              {/* Comparison table / cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block"> {tt("💻 Web Interaction Patterns")} </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(project.responsiveDesign?.comparison?.web || []).map((w, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block"> {tt("📱 Mobile Interaction Patterns")} </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(project.responsiveDesign?.comparison?.mobile || []).map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {getImage('15-responsive-overview') && (
                <ProjectImage
                  src={getImage('15-responsive-overview').src}
                  projectName={project.shortTitle}
                  label={getImage('15-responsive-overview').label}
                  expectedFile={getImage('15-responsive-overview').expectedFile}
                  description={getImage('15-responsive-overview').slotPurpose}
                  aspectRatio="16/9"
                  caption={tt("Figure 11: Responsive Product Experience — Duy trì feature parity trên toàn bộ viewport.")}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('13-mobile-home') && (
                  <ProjectImage
                    src={getImage('13-mobile-home').src}
                    projectName={project.shortTitle}
                    label={getImage('13-mobile-home').label}
                    expectedFile={getImage('13-mobile-home').expectedFile}
                    description={getImage('13-mobile-home').slotPurpose}
                    aspectRatio="mobile"
                    caption={tt("Figure 12: Mobile Homepage — Tái cấu trúc hierarchy cho màn hình hẹp.")}
                  />
                )}
                {getImage('14-mobile-destination') && (
                  <ProjectImage
                    src={getImage('14-mobile-destination').src}
                    projectName={project.shortTitle}
                    label={getImage('14-mobile-destination').label}
                    expectedFile={getImage('14-mobile-destination').expectedFile}
                    description={getImage('14-mobile-destination').slotPurpose}
                    aspectRatio="mobile"
                    caption={tt("Figure 13: Mobile Destination Detail — Điều chỉnh presentation và booking access cho mobile.")}
                  />
                )}
              </div>
            </section>

            {/* 12. Design System, Prototype, QA & Reflection */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  12 · {isVi ? 'Design System, Prototype & Bài học' : 'Design System, Prototype & Learnings'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.designSystem?.title || tt("Chuẩn hóa interaction trên một sản phẩm nhiều flow")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    {project.prototypeDesignQA?.title || tt("Từ flow trên Figma đến hành vi có thể kiểm tra")}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.prototypeDesignQA?.content}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    {project.aiWorkflow?.title || tt("AI hỗ trợ tốc độ, không thay thế quyết định thiết kế")}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.aiWorkflow?.content}
                  </p>
                </div>
              </div>

              {/* Reflection */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-[#D9E2EC] space-y-3">
                <div className="flex items-center gap-2 text-[#0E2A47] font-bold text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>{project.reflection?.title || tt("Điều tôi học được")}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {project.reflection?.content}
                </p>
              </div>
            </section>

            {/* 13. Product Scope */}
            {project.productScope && project.productScope.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-slate-200/70 pb-3">
                  <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                    13 · {isVi ? 'Phạm vi sản phẩm' : 'Product Scope'}
                  </span>
                  <h2 className="typo-case-major text-slate-900 mt-1 uppercase">
                    {isVi ? `Phạm vi tính năng (${project.productScope.length} Modules)` : `Feature Scope (${project.productScope.length} Modules)`}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  {project.productScope.map((mod, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-white text-[#102A43] font-semibold border border-[#D9E2EC] shadow-xs"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* --- CASE 03: KHO MA --- */}
        {project.slug === 'ma-warehouse' && (
          <>
            {/* 01. The Challenge */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  {isVi ? 'BÀI TOÁN' : 'THE CHALLENGE'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.challenge?.title || tt("Quản trị dữ liệu tồn kho mật độ cao và minh bạch hóa luồng xử lý hoàn/hủy đa vai trò")}
                </h2>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed space-y-4">
                {(project.challenge?.content || '').split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* 02. Operational Overview */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  01 · {isVi ? 'Tổng quan Vận hành' : 'Operational Overview'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.operationalOverview?.title || tt("Tầm nhìn toàn diện về tồn kho và hiệu quả vận hành")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.operationalOverview?.content}
                </p>
              </div>

              {/* KPI highlight pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(project.operationalOverview?.kpis || []).map((kpi, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-[#D9E2EC] text-xs font-semibold text-[#0E2A47] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] flex-shrink-0" />
                    <span>{kpi}</span>
                  </div>
                ))}
              </div>

              {getImage('02-inventory-dashboard') && (
                <ProjectImage
                  src={getImage('02-inventory-dashboard').src}
                  projectName={project.shortTitle}
                  label={getImage('02-inventory-dashboard').label}
                  expectedFile={getImage('02-inventory-dashboard').expectedFile}
                  description={getImage('02-inventory-dashboard').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 01: Dashboard tổng hợp chỉ số vận hành, doanh thu, lợi nhuận và xếp hạng đại lý.")}
                />
              )}
            </section>

            {/* 03. Managing Ticket Inventory */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  02 · {isVi ? 'Quản lý Kho vé' : 'Managing Ticket Inventory'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.ticketInventorySection?.title || tt("Tổ chức và quản trị kho vé mật độ cao")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.ticketInventorySection?.content}
                </p>
              </div>

              {/* Core Inventory View */}
              {getImage('03-ticket-inventory') && (
                <ProjectImage
                  src={getImage('03-ticket-inventory').src}
                  projectName={project.shortTitle}
                  label={getImage('03-ticket-inventory').label}
                  expectedFile={getImage('03-ticket-inventory').expectedFile}
                  description={getImage('03-ticket-inventory').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 02: Bảng dữ liệu kho vé tổ chức theo SKU, điểm đến, loại vé và trạng thái tồn kho.")}
                />
              )}

              {/* Import & History Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {getImage('04-ticket-import') && (
                  <ProjectImage
                    src={getImage('04-ticket-import').src}
                    projectName={project.shortTitle}
                    label={getImage('04-ticket-import').label}
                    expectedFile={getImage('04-ticket-import').expectedFile}
                    description={getImage('04-ticket-import').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 03: Thao tác nhập vé theo lô bổ sung tồn kho vào hệ thống.")}
                  />
                )}
                {getImage('05-import-history') && (
                  <ProjectImage
                    src={getImage('05-import-history').src}
                    projectName={project.shortTitle}
                    label={getImage('05-import-history').label}
                    expectedFile={getImage('05-import-history').expectedFile}
                    description={getImage('05-import-history').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 04: Lịch sử nhập vé duy trì tính truy vết (Traceability) và minh bạch kiểm toán.")}
                  />
                )}
              </div>
            </section>

            {/* 04. Turning Refund Requests Into a Guided Flow */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  03 · {isVi ? 'Luồng Tạo Yêu Cầu Hoàn/Hủy' : 'Guided Refund Request Flow'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.guidedRefundFlow?.title || tt("Chuyển luồng yêu cầu hoàn/hủy thành trải nghiệm 3 bước có hướng dẫn")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.guidedRefundFlow?.content}
                </p>
              </div>

              {/* 3 Steps Visual Sequence */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(project.guidedRefundFlow?.steps || []).map((st, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block"> {tt("BƯỚC")} {st.step} · {st.title}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.description}</p>
                  </div>
                ))}
              </div>

              {/* High-priority Image 06 */}
              {getImage('06-refund-request-create') && (
                <ProjectImage
                  src={getImage('06-refund-request-create').src}
                  projectName={project.shortTitle}
                  label={getImage('06-refund-request-create').label}
                  expectedFile={getImage('06-refund-request-create').expectedFile}
                  description={getImage('06-refund-request-create').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 05: Bước 1 — Chọn đơn hàng và bóc tách từng vé con theo số serial.")}
                />
              )}

              {/* Supporting Step 2 & 3 Process Strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {getImage('07-refund-reason') && (
                  <ProjectImage
                    src={getImage('07-refund-reason').src}
                    projectName={project.shortTitle}
                    label={getImage('07-refund-reason').label}
                    expectedFile={getImage('07-refund-reason').expectedFile}
                    description={getImage('07-refund-reason').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 06: Bước 2 — Cung cấp lý do và tài liệu hỗ trợ.")}
                  />
                )}
                {getImage('08-refund-confirm') && (
                  <ProjectImage
                    src={getImage('08-refund-confirm').src}
                    projectName={project.shortTitle}
                    label={getImage('08-refund-confirm').label}
                    expectedFile={getImage('08-refund-confirm').expectedFile}
                    description={getImage('08-refund-confirm').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 07: Bước 3 — Xác nhận tổng hợp dữ liệu trước khi gửi phê duyệt.")}
                  />
                )}
              </div>
            </section>

            {/* 05. Designing for Ticket-level Processing */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  04 · {isVi ? 'Xử Lý Cấp Độ Vé' : 'Ticket-Level Processing'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.ticketLevelProcessing?.title || tt("Thiết kế màn hình chi tiết phục vụ xử lý ở cấp độ từng vé")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.ticketLevelProcessing?.content}
                </p>
              </div>

              {/* Working context highlights */}
              <div className="flex flex-wrap gap-2 text-xs">
                {(project.ticketLevelProcessing?.features || []).map((feat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2] rounded-full font-semibold">
                    ✓ {feat}
                  </span>
                ))}
              </div>

              {getImage('09-refund-review-detail') && (
                <ProjectImage
                  src={getImage('09-refund-review-detail').src}
                  projectName={project.shortTitle}
                  label={getImage('09-refund-review-detail').label}
                  expectedFile={getImage('09-refund-review-detail').expectedFile}
                  description={getImage('09-refund-review-detail').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 08: Working Context — Tập trung toàn bộ thông tin yêu cầu, tài liệu, chi tiết vé và điểm quyết định.")}
                />
              )}
            </section>

            {/* 06. Designing Explicit Decision States */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  05 · {isVi ? 'Trạng Thái Quyết Định' : 'Explicit Decision States'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.decisionStates?.title || tt("Thiết kế các trạng thái quyết định rõ ràng")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.decisionStates?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(project.decisionStates?.states || []).map((st, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">{st.title}</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.description}</p>
                  </div>
                ))}
              </div>

              {getImage('10-refund-decision') && (
                <ProjectImage
                  src={getImage('10-refund-decision').src}
                  projectName={project.shortTitle}
                  label={getImage('10-refund-decision').label}
                  expectedFile={getImage('10-refund-decision').expectedFile}
                  description={getImage('10-refund-decision').slotPurpose}
                  aspectRatio="16/9"
                  caption={tt("Figure 09: Trạng thái quyết định minh bạch — Popup Duyệt xác nhận số tiền hoàn và Popup Từ chối bắt buộc nhập lý do.")}
                />
              )}
            </section>

            {/* 07. Supporting Multiple Operational Roles */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  06 · {isVi ? 'Vận Hành Đa Vai Trò' : 'Multi-Role Operational Workflow'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.multiRoleWorkflow?.title || tt("Hỗ trợ quy trình đa vai trò trong cùng một nghiệp vụ")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.multiRoleWorkflow?.content}
                </p>
              </div>

              {/* Roles matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(project.multiRoleWorkflow?.roles || []).map((r, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-1.5">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block">0{idx + 1} · {r.role}</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">{r.scope}</p>
                  </div>
                ))}
              </div>

              {/* Role-specific queue comparisons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {getImage('11-sale-admin-queue') && (
                  <ProjectImage
                    src={getImage('11-sale-admin-queue').src}
                    projectName={project.shortTitle}
                    label={getImage('11-sale-admin-queue').label}
                    expectedFile={getImage('11-sale-admin-queue').expectedFile}
                    description={getImage('11-sale-admin-queue').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 10: Hàng đợi xử lý của Sale Admin với bộ lọc đại lý và trạng thái kinh doanh.")}
                  />
                )}
                {getImage('12-accounting-queue') && (
                  <ProjectImage
                    src={getImage('12-accounting-queue').src}
                    projectName={project.shortTitle}
                    label={getImage('12-accounting-queue').label}
                    expectedFile={getImage('12-accounting-queue').expectedFile}
                    description={getImage('12-accounting-queue').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 11: Hàng đợi quyết toán của Kế toán phục vụ đối soát và khấu trừ công nợ.")}
                  />
                )}
              </div>

              {getImage('13-refund-workflow') && (
                <ProjectImage
                  src={getImage('13-refund-workflow').src}
                  projectName={project.shortTitle}
                  label={getImage('13-refund-workflow').label}
                  expectedFile={getImage('13-refund-workflow').expectedFile}
                  description={getImage('13-refund-workflow').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 12: Tổng quan luồng nghiệp vụ đa vai trò — Một đối tượng hoàn/hủy qua nhiều góc nhìn và hàng đợi chuyên biệt.")}
                />
              )}
            </section>

            {/* 08. Project Scope */}
            {project.modules && project.modules.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-slate-200/70 pb-3">
                  <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                    07 · {isVi ? 'Phạm vi hệ thống' : 'System Scope'}
                  </span>
                  <h2 className="typo-case-major text-slate-900 mt-1 uppercase">
                    {isVi ? `Phạm vi tính năng (${project.modules.length} Modules)` : `Feature Scope (${project.modules.length} Modules)`}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  {project.modules.map((mod, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-white text-[#102A43] font-semibold border border-[#D9E2EC] shadow-xs"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* --- CASE 04: TOURISM SYSTEM (KHU DU LỊCH) --- */}
        {project.slug === 'tourism-omnichannel' && (
          <>
            {/* 01. The Challenge */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  {isVi ? 'BÀI TOÁN NGHIỆP VỤ' : 'THE CHALLENGE'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.challenge?.title || tt("Kết nối liền mạch vòng đời chiếc vé từ số hóa đến vận hành thực địa")}
                </h2>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed space-y-4">
                {(project.challenge?.content || '').split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* 02. One Product, Multiple Operational Surfaces */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  01 · {isVi ? 'Đa Bề Mặt Vận Hành' : 'Multiple Operational Surfaces'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.operationalSurfaces?.title || tt("Một sản phẩm, đa bề mặt vận hành liên kết")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.operationalSurfaces?.content}
                </p>
              </div>

              {/* 5 Surfaces Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {(project.operationalSurfaces?.surfaces || []).map((surf, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1">
                    <span className="tabular-nums text-xs font-bold text-blue-900 uppercase block">0{idx + 1} · {surf.name}</span>
                    <p className="text-xs text-slate-600 leading-snug font-normal">{surf.purpose}</p>
                  </div>
                ))}
              </div>

              {getImage('02-admin-dashboard') && (
                <ProjectImage
                  src={getImage('02-admin-dashboard').src}
                  projectName={project.shortTitle}
                  label={getImage('02-admin-dashboard').label}
                  expectedFile={getImage('02-admin-dashboard').expectedFile}
                  description={getImage('02-admin-dashboard').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 01: Dashboard quản trị tổng hợp các chỉ số thương mại, tồn kho và mạng lưới phân phối vé.")}
                />
              )}
            </section>

            {/* 03. Managing Products and Ticket Resources */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  02 · {isVi ? 'Quản Trị Sản Phẩm & Kho Vé' : 'Product & Ticket Resources'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.productInventory?.title || tt("Quản trị danh mục sản phẩm và tài nguyên vé")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.productInventory?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(project.productInventory?.keyAreas || []).map((area, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">{area.title}</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{area.description}</p>
                  </div>
                ))}
              </div>

              {getImage('03-product-ticket-inventory') && (
                <ProjectImage
                  src={getImage('03-product-ticket-inventory').src}
                  projectName={project.shortTitle}
                  label={getImage('03-product-ticket-inventory').label}
                  expectedFile={getImage('03-product-ticket-inventory').expectedFile}
                  description={getImage('03-product-ticket-inventory').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 02: Quản lý danh mục sản phẩm và tài nguyên vé theo SKU, số lượng phát hành, khả dụng và đã bán.")}
                />
              )}

              {getImage('04-ticket-allocation') && (
                <ProjectImage
                  src={getImage('04-ticket-allocation').src}
                  projectName={project.shortTitle}
                  label={getImage('04-ticket-allocation').label}
                  expectedFile={getImage('04-ticket-allocation').expectedFile}
                  description={getImage('04-ticket-allocation').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 03: Quy trình nghiệp vụ xuất vé phân bổ cho các đại lý đối tác dựa trên hợp đồng và hạn ngạch.")}
                />
              )}
            </section>

            {/* 04. Turning Product Information Into a Bookable Experience */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  03 · {isVi ? 'Trải Nghiệm Đặt Vé Khách Hàng' : 'Bookable Attraction Experience'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.bookableExperience?.title || tt("Chuyển hóa thông tin dịch vụ thành trải nghiệm đặt vé trực quan")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.bookableExperience?.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {(project.bookableExperience?.features || []).map((feat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200/70 rounded-full font-semibold">
                    ✓ {feat}
                  </span>
                ))}
              </div>

              {/* Desktop & Mobile Responsive Composition */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8">
                  {getImage('05-attraction-detail-desktop') && (
                    <ProjectImage
                      src={getImage('05-attraction-detail-desktop').src}
                      projectName={project.shortTitle}
                      label={getImage('05-attraction-detail-desktop').label}
                      expectedFile={getImage('05-attraction-detail-desktop').expectedFile}
                      description={getImage('05-attraction-detail-desktop').slotPurpose}
                      aspectRatio="16/10"
                      caption={tt("Figure 04: Giao diện chi tiết khu vui chơi phiên bản Desktop với thanh đặt vé cố định bên phải.")}
                    />
                  )}
                </div>
                <div className="lg:col-span-4 flex flex-col justify-center">
                  {getImage('06-attraction-detail-mobile') && (
                    <div className="bg-slate-900 p-2 sm:p-3 rounded-3xl border border-slate-800 shadow-xl max-w-sm mx-auto">
                      <ProjectImage
                        src={getImage('06-attraction-detail-mobile').src}
                        projectName={project.shortTitle}
                        label={getImage('06-attraction-detail-mobile').label}
                        expectedFile={getImage('06-attraction-detail-mobile').expectedFile}
                        description={getImage('06-attraction-detail-mobile').slotPurpose}
                        aspectRatio="mobile"
                        caption={tt("Figure 05: Thích ứng trên Mobile.")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Supporting Booking Cart */}
              {getImage('07-booking-cart') && (
                <div className="pt-2">
                  <ProjectImage
                    src={getImage('07-booking-cart').src}
                    projectName={project.shortTitle}
                    label={getImage('07-booking-cart').label}
                    expectedFile={getImage('07-booking-cart').expectedFile}
                    description={getImage('07-booking-cart').slotPurpose}
                    aspectRatio="16/10"
                    caption={tt("Figure 06: Bối cảnh giỏ hàng kết nối lựa chọn dịch vụ sang giao dịch thanh toán.")}
                  />
                </div>
              )}
            </section>

            {/* 05. Designing for Counter Staff (POS) */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  04 · {isVi ? 'Quầy Bán Vé Tại Điểm (POS)' : 'Counter POS Experience'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.counterPos?.title || tt("Thiết kế chuyên biệt cho nhân viên bán vé tại quầy (Counter POS)")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.counterPos?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(project.counterPos?.posWorkflow || []).map((wf, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs font-semibold text-blue-950 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{wf}</span>
                  </div>
                ))}
              </div>

              {getImage('08-pos-counter-sale') && (
                <ProjectImage
                  src={getImage('08-pos-counter-sale').src}
                  projectName={project.shortTitle}
                  label={getImage('08-pos-counter-sale').label}
                  expectedFile={getImage('08-pos-counter-sale').expectedFile}
                  description={getImage('08-pos-counter-sale').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 07: Không gian làm việc tại quầy POS kết hợp duyệt nhanh dịch vụ, giỏ hàng cố định và thanh toán đa hình thức.")}
                />
              )}
            </section>

            {/* 06. From Transaction to Usable Ticket */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  05 · {isVi ? 'Phát Hành Vé Điện Tử' : 'Ticket Issuance'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.ticketIssuance?.title || tt("Từ giao dịch thanh toán đến tấm vé sử dụng thực tế")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.ticketIssuance?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(project.ticketIssuance?.ticketElements || []).map((elem, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-xs space-y-1">
                    <span className="font-bold text-xs text-blue-900 block">✓ {elem}</span>
                  </div>
                ))}
              </div>

              {getImage('09-ticket-issued') && (
                <ProjectImage
                  src={getImage('09-ticket-issued').src}
                  projectName={project.shortTitle}
                  label={getImage('09-ticket-issued').label}
                  expectedFile={getImage('09-ticket-issued').expectedFile}
                  description={getImage('09-ticket-issued').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 08: Kết quả giao dịch chuyển hóa thành vé điện tử với QR động, mã kiểm soát, dải serial và tác vụ in vé/gửi vé.")}
                />
              )}
            </section>

            {/* 07. Closing the Lifecycle at Check-in */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  06 · {isVi ? 'Soát Vé Check-in Tại Cổng' : 'On-Site Validation & Check-in'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.checkinValidation?.title || tt("Khép lại vòng đời chiếc vé tại cổng kiểm soát Check-in")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.checkinValidation?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(project.checkinValidation?.validationSteps || []).map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1">
                    <span className="font-bold text-xs text-blue-950 block">0{idx + 1} · {step}</span>
                  </div>
                ))}
              </div>

              {getImage('10-checkin-validation') && (
                <ProjectImage
                  src={getImage('10-checkin-validation').src}
                  projectName={project.shortTitle}
                  label={getImage('10-checkin-validation').label}
                  expectedFile={getImage('10-checkin-validation').expectedFile}
                  description={getImage('10-checkin-validation').slotPurpose}
                  aspectRatio="16/10"
                  caption={tt("Figure 09: Giao diện kiểm soát vé tại cổng với khả năng quét mã QR tự động hoặc tra cứu thủ công kèm lịch sử soát vé.")}
                />
              )}
            </section>

            {/* 08. Designing Beyond the Happy Path */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  07 · {isVi ? 'Thiết Kế Đa Trạng Thái' : 'State Design & Operational Resilience'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.checkinStates?.title || tt("Thiết kế vượt ra ngoài kịch bản lý tưởng (State-Oriented Design)")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.checkinStates?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(project.checkinStates?.states || []).map((st, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">{st.title}</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.description}</p>
                  </div>
                ))}
              </div>

              {getImage('11-checkin-states') && (
                <ProjectImage
                  src={getImage('11-checkin-states').src}
                  projectName={project.shortTitle}
                  label={getImage('11-checkin-states').label}
                  expectedFile={getImage('11-checkin-states').expectedFile}
                  description={getImage('11-checkin-states').slotPurpose}
                  aspectRatio="16/9"
                  caption={tt("Figure 10: Xử lý trạng thái ngoại lệ — Xác thực thành công, Từ chối vào cổng và Chế độ hoạt động ngoại tuyến khi mất mạng.")}
                />
              )}
            </section>

            {/* 09. Ticket Lifecycle Overview */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-blue-700">
                  08 · {isVi ? 'Vòng Đời Tấm Vé Du Lịch' : 'Ticket Lifecycle'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {project.ticketLifecycleSection?.title || tt("Vòng đời tấm vé du lịch khép kín (End-to-End Lifecycle)")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.ticketLifecycleSection?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {(project.ticketLifecycleSection?.lifecycleSteps || []).map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1">
                    <span className="tabular-nums text-xs font-bold text-blue-900 uppercase block">{tt("GIAI ĐOẠN 0")}{idx + 1}</span>
                    <p className="text-xs text-slate-700 leading-snug font-normal">{step}</p>
                  </div>
                ))}
              </div>

              {getImage('12-ticket-lifecycle') && (
                <ProjectImage
                  src={getImage('12-ticket-lifecycle').src}
                  projectName={project.shortTitle}
                  label={getImage('12-ticket-lifecycle').label}
                  expectedFile={getImage('12-ticket-lifecycle').expectedFile}
                  description={getImage('12-ticket-lifecycle').slotPurpose}
                  aspectRatio="16/9"
                  caption={tt("Figure 11: Tổng kết hệ sinh thái kết nối xuyên suốt qua 5 bề mặt sản phẩm từ Quản trị kho đến Soát vé tại điểm.")}
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 05: INSURANCE INTEGRATION (FEATURED CASE STUDY) --- */}
        {project.slug === 'insurance-integration' && (
          <>
            {/* 01. BUSINESS CONTEXT & 3 CORE CONTEXTS */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  01 · {isVi ? 'Bối Cảnh Nghiệp Vụ' : 'Business Context & Architecture'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Tích Hợp Bảo Hiểm Vào Hệ Sinh Thái Đặt Vé Sẵn Có' : 'Integrating Insurance into an Existing Booking Ecosystem'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Bảo hiểm du lịch không đơn thuần là một trang độc lập, mà là một sản phẩm dịch vụ tài chính nhúng chạm vào toàn bộ chu trình đặt vé: từ dữ liệu hành khách, định giá, thanh toán, đến phát hành và quản lý hợp đồng điện tử.'
                    : 'Travel insurance is not a mere standalone landing page—it is an embedded financial product touching booking records, passenger data, dynamic pricing, checkout totals, policy issuance, and digital contract lifecycle management.'}
                </p>
              </div>

              {/* 3 Core Contexts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-2">
                  <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block">
                    {isVi ? 'Ngữ Cảnh A · Khi Đặt Vé' : 'Context A · During Booking'}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isVi ? 'Tích Hợp Ngay Trong Checkout' : 'Embedded Checkout Add-on'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isVi
                      ? 'Thu thập dữ liệu người được bảo hiểm tại bước nhập thông tin khách hàng; cộng phí bảo hiểm vào tóm tắt thanh toán vé.'
                      : 'Collects insured-passenger info during checkout; updates order summary with itemized insurance premium.'}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/70 space-y-2">
                  <span className="tabular-nums text-xs font-bold text-blue-800 uppercase block">
                    {isVi ? 'Ngữ Cảnh B · Sau Khi Đặt Vé' : 'Context B · Post-Booking Add-on'}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isVi ? 'Mua Bổ Sung Cho Vé Đã Có' : 'Supplementary Protection Flow'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isVi
                      ? 'Từ đơn hàng đã thanh toán, người dùng chọn gói, nhập thông tin, thanh toán bổ sung độc lập và theo dõi phát hành hợp đồng.'
                      : 'From an issued ticket, users can purchase coverage as a separate transaction without altering the original booking.'}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-2">
                  <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block">
                    {isVi ? 'Ngữ Cảnh C · Khám Phá & Quản Lý' : 'Context C · Hub & Management'}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isVi ? 'Trung Tâm Khám Phá & Vòng Đời' : 'Insurance Hub & Policy Lifecycle'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isVi
                      ? 'Khu vực khám phá sản phẩm, bóc tách quyền lợi/loại trừ và quản lý danh sách hợp đồng (Đang hiệu lực / Sắp có / Hết hạn / Đã huỷ).'
                      : 'Dedicated discovery portal for benefit comparisons, exclusions, FAQs, and multi-state policy management.'}
                  </p>
                </div>
              </div>
            </section>

            {/* 02. THE INTEGRATION CHALLENGE (IMAGE 02) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  02 · {isVi ? 'Thách Thức Tích Hợp' : 'The Integration Challenge'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Nhúng Dữ Liệu Bảo Hiểm Vào Luồng Đặt Vé Ban Đầu' : 'Embedding Insured-Person Requirements into Customer Checkout'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Thách thức UX nằm ở việc thu thập thêm các trường bắt buộc của bảo hiểm (Họ tên theo giấy tờ, Ngày sinh, Loại giấy tờ CCCD/Hộ chiếu, Tỉnh/Thành phố) mà không làm gián đoạn hay gia tăng gánh nặng nhập liệu cho khách hàng mua vé.'
                    : 'The primary UX challenge was capturing legal underwriting data (Full legal name, Date of birth, ID document type, Province/City) without causing checkout abandonment or breaking the visual rhythm of ticket selection.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {isVi ? 'Các Điểm Chạm Nghiệp Vụ Trên Màn Hình' : 'Visible Business Requirements in UI'}
                    </h3>
                    <ul className="text-xs text-slate-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF7A00] font-bold">✓</span>
                        <span><strong>{isVi ? 'Thông tin liên hệ:' : 'Contact Info:'}</strong> {isVi ? 'Giữ vai trò người đặt dịch vụ ban đầu.' : 'Maintains primary booking customer details.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF7A00] font-bold">✓</span>
                        <span><strong>{isVi ? 'Thông tin hành khách được bảo hiểm:' : 'Insured Passenger Info:'}</strong> {isVi ? 'Tích hợp trực tiếp với trường Họ tên, Ngày sinh, Số CCCD/Hộ chiếu.' : 'Form fields mapped to underwriting requirements.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF7A00] font-bold">✓</span>
                        <span><strong>{isVi ? 'Tóm tắt đơn hàng:' : 'Order Summary:'}</strong> {isVi ? 'Phí bảo hiểm được phân bổ thành dòng mục minh bạch trước khi chốt thanh toán.' : 'Insurance fee itemized clearly before final payment.'}</span>
                      </li>
                    </ul>
                  </div>

                  {getImage('02-insurance-in-booking') && (
                    <ProjectImage
                      src={getImage('02-insurance-in-booking').src}
                      projectName={project.shortTitle}
                      label={getImage('02-insurance-in-booking').label}
                      expectedFile={getImage('02-insurance-in-booking').expectedFile}
                      description={getImage('02-insurance-in-booking').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Thông tin người được bảo hiểm được tích hợp trực tiếp vào bước thông tin khách hàng, đồng thời phí bảo hiểm được phản ánh trong tóm tắt đơn hàng."
                        : "Insured-person information is directly embedded into the customer detail checkout step, with the insurance premium reflected in the order summary."}
                    />
                  )}
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-2">
                    <span className="tabular-nums text-xs font-bold text-[#0E2A47] uppercase block">
                      {isVi ? 'Chi Tiết Giao Diện Trọng Tâm' : 'Focused Area: Insured Form & Pricing'}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {isVi
                        ? 'Ảnh trích xuất chi tiết vùng nhập dữ liệu người được bảo hiểm và dòng phí phát sinh trong tóm tắt đơn hàng, giữ toàn vẹn độ sắc nét của typography và form field.'
                        : 'Focused high-resolution view highlighting the insured passenger form fields and dynamic order summary breakdown.'}
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950">
                    <img
                      src="/projects/insurance/02-insurance-in-booking-crop.webp"
                      alt={tt("Insurance in Booking - Focused Form Detail")}
                      className="w-full h-auto object-cover max-h-[720px]"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 03. TWO PURCHASE MOMENTS (IMAGES 02, 03 vs 04, 05) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  03 · {isVi ? 'Hai Thời Điểm Mua Hàng' : 'Two Distinct Purchase Moments'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Cùng Nghiệp Vụ Bảo Hiểm — Khác Biệt Hoàn Toàn Về Ngữ Cảnh' : 'Same Domain Logic, Fundamentally Different User Contexts'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Một quyết định thiết kế then chốt: không áp đặt một luồng mua duy nhất. Khách hàng có thể quyết định mua bảo hiểm cùng vé, hoặc mua bổ sung sau khi vé đã được phát hành mà không cần tạo lại booking.'
                    : 'A key product design insight: instead of forcing one rigid purchase flow, the UX adapts to whether the user is creating a new reservation or augmenting an already-issued ticket.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Moment 1: During Booking */}
                <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="tabular-nums text-xs font-bold uppercase text-[#FF7A00]"> {tt("MOMENT 01 ·")} {isVi ? 'TRONG KHI ĐẶT VÉ' : 'DURING BOOKING'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {isVi ? '1 Giao Dịch Hợp Nhất' : 'Single Unified Checkout'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isVi
                      ? 'Mục tiêu: Hoàn tất đặt chỗ vé tham quan và mua kèm bảo hiểm trong một giao dịch thanh toán duy nhất.'
                      : 'Goal: Complete attraction booking and travel insurance protection together in a single transaction.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getImage('02-insurance-in-booking') && (
                      <ProjectImage
                        src={getImage('02-insurance-in-booking').src}
                        projectName={project.shortTitle}
                        label={getImage('02-insurance-in-booking').label}
                        expectedFile={getImage('02-insurance-in-booking').expectedFile}
                        description={getImage('02-insurance-in-booking').slotPurpose}
                        aspectRatio="mobile"
                      />
                    )}
                    {getImage('03-booking-payment-with-insurance') && (
                      <ProjectImage
                        src={getImage('03-booking-payment-with-insurance').src}
                        projectName={project.shortTitle}
                        label={getImage('03-booking-payment-with-insurance').label}
                        expectedFile={getImage('03-booking-payment-with-insurance').expectedFile}
                        description={getImage('03-booking-payment-with-insurance').slotPurpose}
                        aspectRatio="mobile"
                        caption={isVi
                          ? "Phí bảo hiểm tiếp tục được giữ trong payment context cùng vé, ưu đãi và tổng thanh toán."
                          : "The insurance fee remains preserved within the payment context alongside ticket items, discounts, and total payment."}
                      />
                    )}
                  </div>
                </div>

                {/* Moment 2: Post Booking */}
                <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-[#D9E2EC]">
                  <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
                    <span className="tabular-nums text-xs font-bold uppercase text-[#0E2A47]"> {tt("MOMENT 02 ·")} {isVi ? 'SAU KHI ĐÃ CÓ VÉ' : 'POST-BOOKING ADD-ON'}
                    </span>
                    <span className="text-xs font-semibold text-[#FF7A00] bg-[#FFF2E6] px-2.5 py-0.5 rounded-full border border-[#FFD4B2]">
                      {isVi ? 'Giao Dịch Bổ Sung Riêng' : 'Supplementary Payment'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isVi
                      ? 'Mục tiêu: Đơn hàng đã xuất vé có điểm vào "Thêm bảo hiểm", mở ra luồng chọn gói và thanh toán bổ sung độc lập.'
                      : 'Goal: Ticket holder clicks "Add Insurance" on the active order to add coverage without touching original booking status.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getImage('04-post-booking-entry') && (
                      <ProjectImage
                        src={getImage('04-post-booking-entry').src}
                        projectName={project.shortTitle}
                        label={getImage('04-post-booking-entry').label}
                        expectedFile={getImage('04-post-booking-entry').expectedFile}
                        description={getImage('04-post-booking-entry').slotPurpose}
                        aspectRatio="mobile"
                        caption={isVi
                          ? "Từ chi tiết đơn hàng đã xuất vé, người dùng có thể bắt đầu luồng mua bảo hiểm bổ sung mà không cần tạo lại booking."
                          : "From issued ticket details, users can initiate a supplementary insurance purchase without having to re-create the booking."}
                      />
                    )}
                    {getImage('05-add-insurance') && (
                      <ProjectImage
                        src={getImage('05-add-insurance').src}
                        projectName={project.shortTitle}
                        label={getImage('05-add-insurance').label}
                        expectedFile={getImage('05-add-insurance').expectedFile}
                        description={getImage('05-add-insurance').slotPurpose}
                        aspectRatio="mobile"
                        caption={isVi
                          ? "Màn hình Hero kết hợp điều kiện đơn hàng, chọn gói và thu thập dữ liệu người được bảo hiểm."
                          : "Primary hero screen combining eligibility, package selection, and insured data."}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 04. BUSINESS RULES TO INTERFACE (HERO SCREEN 05) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  04 · {isVi ? 'Chuyển Hóa Nghiệp Vụ Sang Giao Diện' : 'Business Rules to Interface'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Bóc Tách Màn Hình Trọng Tâm: "Thêm Bảo Hiểm"' : 'Deconstructing the Hero Screen: "Add Insurance"'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Đây là màn hình trọng tâm (Hero Screen) của dự án. Giao diện tích hợp đa tầng logic nghiệp vụ vào một luồng cuộn mượt mà trên mobile, tuyệt đối không che giấu chi phí hay gây nhầm lẫn tài chính.'
                    : 'This is the primary hero artifact of the case study. It unifies multi-tiered underwriting logic into a single cohesive mobile scroll without deceptive pre-selection or hidden fees.'}
                </p>
              </div>

              {/* Visual Callout Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block tabular-nums text-xs text-[#FF7A00]">{tt("01 · ĐIỀU KIỆN ĐƠN HÀNG")}</span>
                  <p className="text-slate-600">{tt("Hiển thị thông báo hợp lệ của vé đã mua và nhắc nhở thời hạn áp dụng bảo hiểm.")}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block tabular-nums text-xs text-[#FF7A00]">{tt("02 · LỰA CHỌN GÓI BẢO HIỂM")}</span>
                  <p className="text-slate-600">{tt("3 hạng gói rõ ràng: Gói Cơ bản, Gói Tiêu chuẩn, Gói Cao cấp kèm mức phí công khai theo người.")}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block tabular-nums text-xs text-[#FF7A00]">{tt("03 · ÁNH XẠ VÉ & NGƯỜI ĐƯỢC BH")}</span>
                  <p className="text-slate-600">{tt("Gán chính xác số lượng vé với từng danh tính hành khách thụ hưởng quyền lợi.")}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block tabular-nums text-xs text-[#FF7A00]">{tt("04 · THÔNG TIN ĐỐI TƯỢNG BẢO HIỂM")}</span>
                  <p className="text-slate-600">{tt("Họ tên theo giấy tờ, Ngày sinh, Số CCCD/Hộ chiếu với nút tái sử dụng thông tin khách đặt vé.")}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block tabular-nums text-xs text-[#FF7A00]">{tt("05 · TÓM TẮT PHÍ & BẢO HIỂM")}</span>
                  <p className="text-slate-600">{tt("Liệt kê tên sản phẩm, gói đã chọn, số lượng vé bảo hiểm, đơn giá và tổng chi phí bổ sung.")}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block tabular-nums text-xs text-[#FF7A00]">{tt("06 · ĐIỀU KHOẢN & XỬ LÝ DỮ LIỆU")}</span>
                  <p className="text-slate-600">{tt("Checkbox chấp thuận quy tắc bảo hiểm và đồng ý xử lý dữ liệu cá nhân theo quy định.")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
                <div className="lg:col-span-6">
                  {getImage('05-add-insurance') && (
                    <ProjectImage
                      src={getImage('05-add-insurance').src}
                      projectName={project.shortTitle}
                      label={getImage('05-add-insurance').label}
                      expectedFile={getImage('05-add-insurance').expectedFile}
                      description={getImage('05-add-insurance').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Luồng mua bổ sung kết hợp điều kiện đơn hàng, lựa chọn gói, thông tin người được bảo hiểm, tóm tắt phí và consent trong một flow thống nhất."
                        : "The add-on flow unifies order eligibility, package selection, insured-person inputs, premium summary, and consent into one cohesive journey."}
                    />
                  )}
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="tabular-nums text-xs font-bold text-slate-700 uppercase block">
                      {isVi ? 'Chi Tiết Cận Cảnh Gói & Dữ Liệu Thụ Hưởng' : 'High-Res Detail Crop: Packages & Insured Data'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isVi
                        ? 'Ảnh crop thực tế thể hiện 3 gói bảo hiểm và biểu mẫu điền thông tin người thụ hưởng, tái sử dụng dữ liệu để giảm thiểu thời gian nhập liệu.'
                        : 'Actual high-resolution crop detailing the package comparison cards and the insured-person data form with one-tap data reuse.'}
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950">
                    <img
                      src="/projects/insurance/05-add-insurance-crop.webp"
                      alt={tt("Add Insurance - Detail Crop")}
                      className="w-full h-auto object-cover max-h-[720px]"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 05. PAYMENT CONTEXT (IMAGE 06) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  05 · {isVi ? 'Minh Bạch Tài Chính Trong Thanh Toán' : 'Supplementary Payment Clarity'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Tách Bạch Khoản Thanh Toán Bổ Sung Với Giao Dịch Vé Gốc' : 'Separating Supplementary Insurance Payment From Original Booking'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Một yêu cầu giao tiếp sản phẩm cốt lõi: người dùng cần hiểu rõ họ chỉ thanh toán riêng cho khoản bảo hiểm vừa chọn, hoàn toàn không phải thanh toán lại vé và không làm biến động trạng thái vé đã xuất.'
                    : 'A critical UX and product communication requirement: users must understand they are paying solely for the newly added insurance protection, without re-paying for the original ticket or risking ticket validity.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  {getImage('06-insurance-payment') && (
                    <ProjectImage
                      src={getImage('06-insurance-payment').src}
                      projectName={project.shortTitle}
                      label={getImage('06-insurance-payment').label}
                      expectedFile={getImage('06-insurance-payment').expectedFile}
                      description={getImage('06-insurance-payment').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Khoản thanh toán bảo hiểm được tách khỏi giao dịch vé gốc và vẫn duy trì context của đơn hàng hiện tại."
                        : "The insurance payment is separated from the original ticket transaction while preserving the context of the active order."}
                    />
                  )}
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC] space-y-3">
                    <span className="tabular-nums text-xs font-bold uppercase text-[#0E2A47] block">
                      {isVi ? 'Thông Điệp Xác Nhận Được Thiết Kế Trực Tiếp Trên UI' : 'Supported System Copy on Payment Screen'}
                    </span>
                    <blockquote className="border-l-4 border-[#FF7A00] pl-4 py-1 text-sm font-semibold text-slate-900 italic">
                      "{isVi ? 'Khoản thanh toán bổ sung — Không ảnh hưởng đến trạng thái thanh toán vé gốc' : 'Supplementary Payment — Does not alter the original ticket payment status'}"
                    </blockquote>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {isVi
                        ? 'Màn hình giữ nguyên thông tin ngữ cảnh: Mã đơn hàng gốc, Điểm đến/Hành trình, Tên gói bảo hiểm, Số lượng vé thụ hưởng, Phương thức thanh toán linh hoạt.'
                        : 'The screen retains order context: Destination, active order ID, insurance product title, insured passenger quantity, and payment gateway selection.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">{tt("Duy trì Order Context")}</span>
                      <p className="text-slate-500">{tt("Giảm thiểu rủi ro nhầm lẫn đơn khi khách hàng đang quản lý nhiều chuyến đi cùng lúc.")}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">{tt("Cổng thanh toán độc lập")}</span>
                      <p className="text-slate-500">{tt("Hỗ trợ các phương thức thanh toán nhanh cho các khoản tiền nhỏ (micro-transactions).")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 06. ASYNCHRONOUS POLICY ISSUANCE (IMAGES 07 & 08) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  06 · {isVi ? 'Thiết Kế Trạng Thái Bất Đồng Bộ' : 'Designing for Asynchronous States'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Tách Biệt Rõ Ràng: Đang Phát Hành (Issuing) vs Đã Hoàn Tất (Issued)' : 'State-Aware Feedback: Issuing vs Issued'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Trong nghiệp vụ tài chính - bảo hiểm, thanh toán thành công không đồng nghĩa hợp đồng đã sẵn sàng ngay lập tức. Hệ thống cần gọi API thẩm định và cấp số hợp đồng từ nhà bảo hiểm. Thiết kế UX phản ánh chính xác trạng thái trung gian này thay vì giả lập hoàn tất vội vã.'
                    : 'In InsurTech integrations, successful payment capture does not equate to instant contract availability. The UX explicitly communicates the asynchronous issuance state and locks pending actions until the contract ID is bound.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* State 1: Issuing */}
                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC]">
                  <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
                    <span className="tabular-nums text-xs font-bold uppercase text-[#0E2A47]"> {tt("STATE 01 ·")} {isVi ? 'CHỜ PHÁT HÀNH HỢP ĐỒNG' : 'POLICY ISSUING (PENDING)'}
                    </span>
                    <span className="text-xs font-bold text-[#FF7A00] bg-[#FFF2E6] px-2.5 py-0.5 rounded-full"> {tt("Issuing State")} </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isVi
                      ? 'Hiển thị mã tham chiếu, thông tin gói và thông báo hợp đồng đang được khởi tạo. Nút "Xem hợp đồng" được disable hợp lý.'
                      : 'Displays policy identifier, package, and informs the user that issuance is in progress. Contract viewing actions are disabled.'}
                  </p>
                  {getImage('07-policy-issuing') && (
                    <ProjectImage
                      src={getImage('07-policy-issuing').src}
                      projectName={project.shortTitle}
                      label={getImage('07-policy-issuing').label}
                      expectedFile={getImage('07-policy-issuing').expectedFile}
                      description={getImage('07-policy-issuing').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Sau thanh toán, UI thể hiện trạng thái hợp đồng đang được phát hành thay vì giả định hợp đồng có ngay lập tức."
                        : "Following payment, the UI reflects an asynchronous contract issuing state rather than assuming immediate availability."}
                    />
                  )}
                </div>

                {/* State 2: Issued */}
                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-[#D9E2EC]">
                  <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
                    <span className="tabular-nums text-xs font-bold uppercase text-[#0E2A47]"> {tt("STATE 02 ·")} {isVi ? 'PHÁT HÀNH THÀNH CÔNG' : 'POLICY ISSUED (SUCCESS)'}
                    </span>
                    <span className="text-xs font-bold text-[#FF7A00] bg-[#FFF2E6] px-2.5 py-0.5 rounded-full border border-[#FFD4B2]"> {tt("Issued State")} </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isVi
                      ? 'Hợp đồng hoàn tất với đầy đủ số HĐ bảo hiểm, mở khóa CTA "Xem hợp đồng bảo hiểm" và "Về trang chi tiết đơn hàng".'
                      : 'Contract finalized with verified policy ID; unlocks CTAs to view certificate or return to original ticket order.'}
                  </p>
                  {getImage('08-insurance-success') && (
                    <ProjectImage
                      src={getImage('08-insurance-success').src}
                      projectName={project.shortTitle}
                      label={getImage('08-insurance-success').label}
                      expectedFile={getImage('08-insurance-success').expectedFile}
                      description={getImage('08-insurance-success').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Khi hợp đồng được phát hành, trạng thái và CTA được cập nhật để người dùng có thể tiếp tục tới hợp đồng hoặc đơn hàng gốc."
                        : "Once the policy is issued, the status and CTAs update to let users navigate to the insurance certificate or return to the original order."}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* 07. PRODUCT UNDERSTANDING & DISCOVERY (IMAGES 09 & 10) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  07 · {isVi ? 'Khám Phá & Bóc Tách Quyền Lợi' : 'Product Discovery & Information Architecture'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Cổng Khám Phá Bảo Hiểm & Phân Tầng Thông Tin Minh Bạch' : 'Insurance Hub & Mobile Information Scannability'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Bảo hiểm là sản phẩm phức tạp với nhiều thuật ngữ pháp lý. Thông tin được phân nhóm có thứ bậc: Mức phí khởi điểm → Đối tượng tham gia → Quyền lợi chính → Điều khoản loại trừ → Tài liệu chứng nhận, giúp người dùng mobile dễ dàng quét và hiểu trước khi mua.'
                    : 'Insurance products carry heavy legal terminology. Information was progressively structured into scannable mobile tiers: Starting premium, Eligibility bounds, Core coverage benefits, Exclusions, and Product documentation.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 text-sm block mb-1">
                      {isVi ? 'Cổng Khám Phá (Insurance Hub)' : 'Insurance Discovery Hub'}
                    </span>
                    <p className="text-xs text-slate-600">
                      {isVi
                        ? 'Cửa ngõ trung tâm hiển thị các dòng sản phẩm (Bảo hiểm vui chơi toàn diện, Chuyến đi trong ngày, Bảo hiểm gia đình), danh mục câu hỏi thường gặp và nút tra cứu Hợp đồng của tôi.'
                        : 'Dedicated mobile entry point presenting product cards (Comprehensive Protection, Day Trips, Family Coverage), FAQs, and My Policies shortcut.'}
                    </p>
                  </div>
                  {getImage('09-insurance-hub') && (
                    <ProjectImage
                      src={getImage('09-insurance-hub').src}
                      projectName={project.shortTitle}
                      label={getImage('09-insurance-hub').label}
                      expectedFile={getImage('09-insurance-hub').expectedFile}
                      description={getImage('09-insurance-hub').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Khu vực Bảo hiểm tập trung việc khám phá sản phẩm, truy cập hợp đồng và thông tin hỗ trợ trong một entry point riêng."
                        : "The Insurance Hub centralizes product discovery, contract access, and support information within a dedicated entry point."}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 text-sm block mb-1">
                      {isVi ? 'Chi Tiết Sản Phẩm & Điều Khoản' : 'Product Detail & Exclusions'}
                    </span>
                    <p className="text-xs text-slate-600">
                      {isVi
                        ? 'Bóc tách chi tiết: Phạm vi tai nạn, Hỗ trợ y tế khẩn cấp, Hành lý tư trang, Gián đoạn chuyến đi, Hỗ trợ 24/7 và đường link tải văn bản pháp lý.'
                        : 'Detailed scannable hierarchy: Accident protection, Emergency medical care, Baggage coverage, Trip interruption, 24/7 hotline, and policy documents.'}
                    </p>
                  </div>
                  {getImage('10-insurance-product-detail') && (
                    <ProjectImage
                      src={getImage('10-insurance-product-detail').src}
                      projectName={project.shortTitle}
                      label={getImage('10-insurance-product-detail').label}
                      expectedFile={getImage('10-insurance-product-detail').expectedFile}
                      description={getImage('10-insurance-product-detail').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Quyền lợi, mức phí, điều kiện đối tượng, loại trừ và tài liệu sản phẩm được tổ chức thành các nhóm thông tin dễ quét trên mobile."
                        : "Benefits, starting premiums, eligibility criteria, exclusions, and product documentation are structured into scannable mobile information groups."}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* 08. POLICY MANAGEMENT & STATE-AWARE UX (IMAGES 11 & 12) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  08 · {isVi ? 'Vòng Đời Hợp Đồng & Đa Trạng Thái' : 'Policy Lifecycle & State Management'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Theo Dõi Hợp Đồng Sau Mua & Xử Lý Empty State Chuẩn Xác' : 'Post-Purchase Policy Tracking & State-Aware Views'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Giao diện quản lý hợp đồng hỗ trợ 4 trạng thái rõ ràng: Đang hiệu lực, Sắp có HĐ, Hết hiệu lực, và Đã hủy. Thay vì dùng một view rỗng chung, mỗi tab sở hữu empty state và thẻ hợp đồng đặc thù.'
                    : 'The policy management area supports 4 distinct contract states: Active, Upcoming, Expired, and Cancelled, with dedicated state-specific data views and empty states.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  {getImage('11-policy-management') && (
                    <ProjectImage
                      src={getImage('11-policy-management').src}
                      projectName={project.shortTitle}
                      label={getImage('11-policy-management').label}
                      expectedFile={getImage('11-policy-management').expectedFile}
                      description={getImage('11-policy-management').slotPurpose}
                      aspectRatio="mobile"
                      caption={isVi
                        ? "Hợp đồng được tổ chức theo trạng thái để hỗ trợ việc theo dõi bảo hiểm sau khi mua."
                        : "Contracts are organized by status to streamline post-purchase policy tracking."}
                    />
                  )}
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 text-sm block mb-1">
                      {isVi ? 'Bảng Tổng Hợp Các Trạng Thái Hợp Đồng' : 'Supported Contract UI States Matrix'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isVi
                        ? 'Các trạng thái hợp đồng và empty state được thiết kế riêng thay vì dùng cùng một view cho mọi trường hợp.'
                        : 'Contract states and empty states are intentionally designed with specific views rather than reusing a generic empty container.'}
                    </p>
                  </div>

                  {getImage('12-policy-states') && (
                    <ProjectImage
                      src={getImage('12-policy-states').src}
                      projectName={project.shortTitle}
                      label={getImage('12-policy-states').label}
                      expectedFile={getImage('12-policy-states').expectedFile}
                      description={getImage('12-policy-states').slotPurpose}
                      aspectRatio="16/9"
                      caption={isVi
                        ? "Các trạng thái hợp đồng và empty state được thiết kế riêng thay vì dùng cùng một view cho mọi trường hợp."
                        : "Contract states and empty states are intentionally designed with specific views rather than reusing a generic empty container."}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* 09. END-TO-END FLOW OVERVIEW (IMAGE 13) */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  09 · {isVi ? 'Tổng Thể Hành Trình Xuyên Suốt' : '10-Second End-to-End View'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Toàn Cảnh Luồng Mua Bổ Sung: Từ Đơn Hàng Đến Hợp Đồng' : 'End-to-End Post-Booking Insurance Journey'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'Bức tranh toàn cảnh 5 bước giúp người xem nắm bắt trọn vẹn luồng sản phẩm trong 10 giây: Đơn hàng gốc → Thêm bảo hiểm → Thanh toán bổ sung → Chờ phát hành → Hợp đồng thành công.'
                    : 'A comprehensive 5-step overview making the product journey clear in ~10 seconds: Existing Booking → Add Insurance Add-on → Supplementary Payment → Policy Issuing → Policy Issued.'}
                </p>
              </div>

              {getImage('13-insurance-flow-overview') && (
                <ProjectImage
                  src={getImage('13-insurance-flow-overview').src}
                  projectName={project.shortTitle}
                  label={getImage('13-insurance-flow-overview').label}
                  expectedFile={getImage('13-insurance-flow-overview').expectedFile}
                  description={getImage('13-insurance-flow-overview').slotPurpose}
                  aspectRatio="16/9"
                  caption={isVi
                    ? "Tổng thể quy trình mua bảo hiểm bổ sung sau đặt vé: từ đơn hàng gốc, chọn gói, thanh toán riêng biệt, trạng thái chờ phát hành đến khi hợp đồng hoàn tất."
                    : "End-to-end post-booking insurance sequence: from existing order, package selection, separate payment, issuing state, to issued policy."}
                />
              )}
            </section>

            {/* 10. DESIGN DECISION CALLOUTS */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  10 · {isVi ? 'Các Quyết Định Thiết Kế Cốt Lõi' : 'Key Product Design Decisions'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Tư Duy Sản Phẩm Định Hình Trải Nghiệm Giao Diện' : 'Product & Business Rationale Behind the UX'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {isVi
                    ? 'Các quyết định then chốt dựa trên quy tắc nghiệp vụ và hành vi người dùng thực tế.'
                    : 'Core decisions derived from underwriting compliance and verified user contexts.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(project.designDecisions || []).map((dec, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-[#0E2A47] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FFF2E6] border border-[#FFD4B2] text-[#FF7A00] font-bold text-xs flex items-center justify-center tabular-nums">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {dec.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      {dec.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* --- CASE 06: SMART CAR WASH 4.0 --- */}
        {project.slug === 'smart-car-wash' && (
          <>
            {/* 01. PROJECT OVERVIEW & ECOSYSTEM COVER */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-4">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  01 · {isVi ? 'Tổng Quan Dự Án' : 'Project Overview'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {isVi ? 'Nền Tảng Đa Dịch Vụ Cho Trạm Chăm Sóc Xe Thông Minh' : 'Multi-Service Platform for Smart Car Care Stations'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-3xl">
                  {isVi
                    ? 'Smart Car Wash 4.0 là nền tảng đa dịch vụ tích hợp đặt lịch khách hàng, giao dịch tại trạm và quản trị vận hành vào một hệ sinh thái sản phẩm duy nhất. Sản phẩm bao trùm ba ngữ cảnh làm việc chính: ứng dụng di động cho khách hàng, giao diện POS cho nhân viên tại trạm và cổng quản trị trung tâm để quản lý dịch vụ, giao dịch, địa điểm, người dùng và hạ tầng thiết bị.'
                    : 'Smart Car Wash 4.0 is a multi-service platform that brings customer booking, on-site transactions, and operational management into one product ecosystem. The product spans three main working contexts: a customer-facing mobile application, a point-of-sale interface for on-site staff, and an administration portal for managing services, transactions, locations, users, and system infrastructure.'}
                </p>
              </div>

              {/* Information Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="text-xs tabular-nums text-slate-400 uppercase tracking-wider">{isVi ? 'Sản phẩm' : 'Product'}</div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">{tt("Multi-Service Platform")}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="text-xs tabular-nums text-slate-400 uppercase tracking-wider">{isVi ? 'Bề mặt' : 'Surfaces'}</div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">{tt("Mobile App · POS · Admin")}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="text-xs tabular-nums text-slate-400 uppercase tracking-wider">{isVi ? 'Lĩnh vực' : 'Domain'}</div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 truncate">{tt("Car Care · EV · Operations")}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="text-xs tabular-nums text-slate-400 uppercase tracking-wider">{isVi ? 'Vai trò' : 'Role'}</div>
                  <div className="font-bold text-[#FF7A00] text-xs sm:text-sm mt-0.5">{tt("UI/UX Support")}</div>
                </div>
              </div>

              {/* Master Ecosystem Cover */}
              {getImage('01-cover') && (
                <ProjectImage
                  src={getImage('01-cover').src}
                  projectName={project.shortTitle}
                  label={getImage('01-cover').label}
                  expectedFile={getImage('01-cover').expectedFile}
                  description={getImage('01-cover').slotPurpose}
                  aspectRatio="16/10"
                  caption={isVi
                    ? "Bức tranh tổng thể hệ sinh thái: Mobile App khách hàng ở tiền cảnh, giao diện POS quầy ở trung tâm và cổng Admin điều hành làm lớp nền."
                    : "Ecosystem overview: Customer mobile app in foreground, staff POS terminal in midground, and administration portal as supporting layer."}
                />
              )}
            </section>

            {/* 02. PRODUCT ECOSYSTEM */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs tabular-nums font-bold text-[#FF7A00] uppercase tracking-wider bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  02 · {isVi ? 'Hệ Sinh Thái Sản Phẩm' : 'Product Ecosystem'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Một Hệ Sinh Thái, Ba Ngữ Cảnh Làm Việc' : 'One Service Ecosystem, Three Working Contexts'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {isVi
                    ? 'CUSTOMER APP → POS → ADMIN: Mỗi bề mặt phục vụ một nhóm người dùng và nhiệm vụ riêng biệt, nhưng tất cả cùng vận hành trơn tru xoay quanh cùng một danh mục dịch vụ và kho dữ liệu vận hành.'
                    : 'CUSTOMER APP → POS → ADMIN: Each surface serves a distinct user and task context, operating seamlessly around the same service catalog and data backbone.'}
                </p>
              </div>

              {/* 3 Surfaces Showcase Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Surface 1: Customer Mobile App */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs tabular-nums font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Smartphone className="w-3 h-3 text-emerald-600" /> {tt("Customer App")} </span>
                      <span className="text-xs tabular-nums text-slate-400">{tt("MOBILE")}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {isVi ? 'Khám Phá & Sử Dụng Dịch Vụ' : 'Discover & Use Services'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isVi
                        ? 'Duyệt danh mục gói dịch vụ, quản lý xe, đặt lịch hẹn trước, thanh toán trực tuyến, theo dõi tiến trình rửa và quản lý thành viên.'
                        : 'Browse services, manage vehicles, book appointments, pay, track service progress and manage membership.'}
                    </p>
                  </div>
                  {getImage('customer-01-home') && (
                    <div className="max-w-[200px] mx-auto pt-2">
                      <ProjectImage
                        src={getImage('customer-01-home').src}
                        projectName={project.shortTitle}
                        label={tt("Trang chủ Mobile")}
                        expectedFile={getImage('customer-01-home').expectedFile}
                        aspectRatio="mobile"
                      />
                    </div>
                  )}
                </div>

                {/* Surface 2: POS Application */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs tabular-nums font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                        <CreditCard className="w-3 h-3 text-blue-600" /> {tt("POS Application")} </span>
                      <span className="text-xs tabular-nums text-slate-400">{tt("KIOSK / TOUCH")}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {isVi ? 'Xử Lý Giao Dịch Tại Trạm' : 'Process On-Site Transactions'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isVi
                        ? 'Cho phép nhân viên trạm chọn ngành dịch vụ, tạo đơn hàng cho khách vãng lai và hoàn tất thanh toán nhanh qua VietQR, thẻ chạm hoặc tiền mặt.'
                        : 'Allow on-site staff to select service categories, build customer orders and complete transactions through different payment methods.'}
                    </p>
                  </div>
                  {getImage('pos-02-carwash') && (
                    <div className="pt-2">
                      <ProjectImage
                        src={getImage('pos-02-carwash').src}
                        projectName={project.shortTitle}
                        label={tt("POS Chọn Dịch Vụ")}
                        expectedFile={getImage('pos-02-carwash').expectedFile}
                        aspectRatio="16/10"
                      />
                    </div>
                  )}
                </div>

                {/* Surface 3: Admin Portal */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs tabular-nums font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200">
                        <Monitor className="w-3 h-3 text-purple-600" /> {tt("Admin Portal")} </span>
                      <span className="text-xs tabular-nums text-slate-400">{tt("DESKTOP WEB")}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {isVi ? 'Cấu Hình & Quản Trị Vận Hành' : 'Configure & Manage Operations'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isVi
                        ? 'Quản trị toàn bộ dữ liệu vận hành: doanh thu, nhật ký giao dịch, danh mục trạm, bảng giá gói, phương tiện, người dùng, phân quyền và thiết bị IoT.'
                        : 'Manage operational data such as transactions, service locations, service catalog, vehicles, bookings, users, loyalty programs, POS terminals and infrastructure settings.'}
                    </p>
                  </div>
                  {getImage('admin-01-revenue-dashboard') && (
                    <div className="pt-2">
                      <ProjectImage
                        src={getImage('admin-01-revenue-dashboard').src}
                        projectName={project.shortTitle}
                        label={tt("Admin Dashboard")}
                        expectedFile={getImage('admin-01-revenue-dashboard').expectedFile}
                        aspectRatio="16/10"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 03. CUSTOMER SERVICE JOURNEY */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-4">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  03 · {isVi ? 'Hành Trình Khách Hàng' : 'Customer Service Journey'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {isVi ? 'Thiết Kế Hành Trình Trải Nghiệm Khép Kín' : 'Designing the End-to-End Service Journey'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
                  {isVi
                    ? 'Trải nghiệm của khách hàng không chỉ dừng lại ở việc chọn một gói rửa xe. Luồng trải nghiệm kết nối việc khám phá dịch vụ với thông tin xe cụ thể, chọn trạm theo khoảng cách, đặt lịch hẹn, thanh toán và theo dõi tiến trình trực tiếp sau khi hoàn tất thanh toán. Giao diện giữ mỗi bước tập trung trong khi vẫn duy trì đầy đủ thông tin về gói, xe, trạm, chi phí và trạng thái đơn hàng.'
                    : 'The customer experience goes beyond selecting a wash package. The flow connects service discovery with vehicle context, station selection, scheduling, payment and post-purchase service tracking. The interface keeps each step focused while retaining important service information such as package details, vehicle, location, pricing and order status.'}
                </p>
              </div>

              {/* Visual Flow Indicator Strip */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-x-auto">
                <div className="flex items-center gap-2 sm:gap-3 min-w-[700px] text-xs font-semibold text-slate-700">
                  <span className="px-3 py-1.5 rounded-lg bg-[#0E2A47] text-white">{tt("01. Khám phá")}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800">{tt("02. Chọn gói rửa")}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800">{tt("03. Chọn trạm")}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800">{tt("04. Ngày & Giờ")}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800">{tt("05. Xác nhận & Trả")}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="px-3 py-1.5 rounded-lg bg-[#FF7A00] text-white">{tt("06. Theo dõi rửa")}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800">{tt("07. Lịch sử")}</span>
                </div>
              </div>

              {/* Journey Screens Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {getImage('customer-01-home') && (
                  <ProjectImage
                    src={getImage('customer-01-home').src}
                    projectName={project.shortTitle}
                    label={isVi ? '1. Trang chủ' : '1. Home'}
                    expectedFile={getImage('customer-01-home').expectedFile}
                    description={isVi ? 'Ngữ cảnh xe hiện tại, dung lượng pin và dịch vụ nhanh' : 'Vehicle context and quick service access'}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('customer-02-wash-service') && (
                  <ProjectImage
                    src={getImage('customer-02-wash-service').src}
                    projectName={project.shortTitle}
                    label={isVi ? '2. Gói dịch vụ' : '2. Wash Packages'}
                    expectedFile={getImage('customer-02-wash-service').expectedFile}
                    description={isVi ? 'Bóc tách chi tiết Standard, Premium, Deluxe theo loại xe' : 'Package breakdown by vehicle classification'}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('customer-03-select-station') && (
                  <ProjectImage
                    src={getImage('customer-03-select-station').src}
                    projectName={project.shortTitle}
                    label={isVi ? '3. Chọn trạm' : '3. Station Selection'}
                    expectedFile={getImage('customer-03-select-station').expectedFile}
                    description={isVi ? 'Khoảng cách trạm EcoStation và tình trạng buồng rửa' : 'Station proximity and bay availability'}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('customer-04-select-datetime') && (
                  <ProjectImage
                    src={getImage('customer-04-select-datetime').src}
                    projectName={project.shortTitle}
                    label={isVi ? '4. Lịch hẹn' : '4. Schedule Slot'}
                    expectedFile={getImage('customer-04-select-datetime').expectedFile}
                    description={isVi ? 'Chọn ngày & khung giờ trống tránh xếp hàng chờ' : 'Slot selection to minimize on-site waiting'}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('customer-05-booking-confirm') && (
                  <ProjectImage
                    src={getImage('customer-05-booking-confirm').src}
                    projectName={project.shortTitle}
                    label={isVi ? '5. Xác nhận' : '5. Order Review'}
                    expectedFile={getImage('customer-05-booking-confirm').expectedFile}
                    description={isVi ? 'Kiểm tra gói, biển số xe và tổng giá trước thanh toán' : 'Reviewing vehicle, package, and total fee'}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('customer-06-payment') && (
                  <ProjectImage
                    src={getImage('customer-06-payment').src}
                    projectName={project.shortTitle}
                    label={isVi ? '6. Thanh toán' : '6. Payment'}
                    expectedFile={getImage('customer-06-payment').expectedFile}
                    description={isVi ? 'Đa phương thức: VietQR, thẻ thanh toán, điểm thưởng' : 'VietQR, credit cards, and loyalty balance'}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('customer-08-order-history') && (
                  <ProjectImage
                    src={getImage('customer-08-order-history').src}
                    projectName={project.shortTitle}
                    label={isVi ? '7. Lịch sử' : '7. Order History'}
                    expectedFile={getImage('customer-08-order-history').expectedFile}
                    description={isVi ? 'Tra cứu hóa đơn và lịch sử chăm sóc xe chi tiết' : 'Historical orders and electronic receipts'}
                    aspectRatio="mobile"
                  />
                )}
              </div>
            </section>

            {/* 04. SERVICE TRACKING & STATE */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs tabular-nums font-bold text-[#FF7A00] uppercase tracking-wider bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  04 · {isVi ? 'Trạng Thái Dịch Vụ' : 'Service Tracking & State'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Minh Bạch Hóa Tiến Trình Dịch Vụ Thực Tế' : 'Making Service Progress Visible'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
                  {isVi
                    ? 'Đối với một dịch vụ vật lý, trải nghiệm của người dùng vẫn tiếp diễn sau khi thanh toán. Giao diện theo dõi dịch vụ chuyển hóa toàn bộ quy trình vận hành tại buồng rửa thành các trạng thái minh thị, giúp khách hàng nắm rõ công đoạn nào đã xong, công đoạn nào đang diễn ra và bước tiếp theo là gì.'
                    : 'For a physical service, the experience continues after checkout. The tracking interface translates the service process into explicit states so the customer can understand what has been completed, what is currently happening and what comes next.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Large Tracking Screen Display */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-[320px]">
                    {getImage('customer-07-tracking-process') && (
                      <ProjectImage
                        src={getImage('customer-07-tracking-process').src}
                        projectName={project.shortTitle}
                        label={tt("Theo dõi Quy trình Rửa")}
                        expectedFile={getImage('customer-07-tracking-process').expectedFile}
                        aspectRatio="mobile"
                        caption={isVi
                          ? "Giao diện theo dõi trực tiếp với tỷ lệ % hoàn thành và trạng thái phân đoạn vật lý thực tế."
                          : "Live tracking screen displaying percentage progress and real-world physical wash stages."}
                      />
                    )}
                  </div>
                </div>

                {/* Explicit State Cards */}
                <div className="lg:col-span-7 space-y-3">
                  <h4 className="text-sm tabular-nums font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {isVi ? '6 Giai Đoạn Trạng Thái Vật Lý Minh Thị' : '6 Explicit Physical Service States'}
                  </h4>

                  {[
                    { code: tt("STAGE 1"), label: tt("Check-in"), desc: isVi ? "Xác nhận xe vào vị trí buồng rửa và quét mã token" : "Vehicle position confirmation and bay entry token scan" },
                    { code: tt("STAGE 2"), label: tt("Rửa ngoài"), desc: isVi ? "Phun bọt tuyết hoạt tính và xịt áp lực cao làm sạch thân vỏ" : "Active foam application and high-pressure exterior rinse" },
                    { code: tt("STAGE 3"), label: tt("Rửa trong"), desc: isVi ? "Hút bụi nội thất và lau sạch chi tiết kính & cabin" : "Interior vacuuming and cabin surface wiping" },
                    { code: tt("STAGE 4"), label: tt("Sấy khô"), desc: isVi ? "Hệ thống quạt sấy công suất lớn làm khô bề mặt xe" : "High-power automated blowers drying surface water" },
                    { code: tt("STAGE 5"), label: tt("Kiểm tra"), desc: isVi ? "Kỹ thuật viên đối soát chất lượng hoàn thiện trước khi bàn giao" : "Quality inspection before handover clearance" },
                    { code: tt("STAGE 6"), label: tt("Hoàn tất"), desc: isVi ? "Gửi thông báo hoàn thành tới app và mời tài xế nhận xe" : "Handover notification sent to mobile app" }
                  ].map((st, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 flex items-start gap-3">
                      <span className="px-2 py-0.5 rounded text-xs tabular-nums font-bold bg-[#0E2A47] text-white flex-shrink-0 mt-0.5">
                        {st.code}
                      </span>
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{st.label}</div>
                        <div className="text-xs text-slate-600">{st.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 05. POS WORKFLOW */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-4">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  05 · {isVi ? 'Quy Trình POS Tại Quầy' : 'POS Workflow'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {isVi ? 'Từ Lựa Chọn Của Khách Đến Giao Dịch Tại Trạm' : 'From Customer Selection to On-site Transaction'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
                  {isVi
                    ? 'Giao diện POS chuyển hóa hệ sinh thái dịch vụ rộng lớn thành quy trình làm việc hướng tác vụ cho nhân viên trạm. Thay vì để lộ sự phức tạp mang tính quản trị, luồng làm việc ưu tiên chọn gói dịch vụ, thêm vào giỏ hàng, xác nhận thông tin xe và hoàn tất thanh toán. Các ngữ cảnh thanh toán đa dạng được hỗ trợ đầy đủ gồm VietQR động, thẻ chạm không tiếp xúc và tiền mặt.'
                    : 'The POS interface translates the broader service ecosystem into a task-oriented workflow for staff. Instead of exposing administrative complexity, the flow prioritizes service selection, order building, confirmation and payment completion. Different payment contexts are represented in the source, including VietQR, contactless and cash.'}
                </p>
              </div>

              {/* POS Flow Breadcrumb */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-600 flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#0E2A47]">{tt("Workflow:")}</span>
                <span>{tt("Ngành dịch vụ")}</span>
                <span className="text-slate-300">→</span>
                <span>{tt("Chọn gói rửa")}</span>
                <span className="text-slate-300">→</span>
                <span>{tt("Nhập thông tin xe")}</span>
                <span className="text-slate-300">→</span>
                <span>{tt("Thêm giỏ hàng")}</span>
                <span className="text-slate-300">→</span>
                <span>{tt("Xác nhận đơn")}</span>
                <span className="text-slate-300">→</span>
                <span>{tt("Chọn thanh toán (VietQR / Thẻ / Tiền mặt)")}</span>
                <span className="text-slate-300">→</span>
                <span className="font-bold text-emerald-600">{tt("Giao dịch hoàn tất")}</span>
              </div>

              {/* POS Screens Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('pos-01-home') && (
                  <ProjectImage
                    src={getImage('pos-01-home').src}
                    projectName={project.shortTitle}
                    label={isVi ? 'Màn hình chính POS' : 'POS Dashboard Launchpad'}
                    expectedFile={getImage('pos-01-home').expectedFile}
                    description={isVi ? 'Truy cập nhanh các ngành dịch vụ: Rửa xe, Giặt ủi, Xăng dầu, Trạm sạc EV và FnB' : 'Multi-vertical service launchpad'}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('pos-02-carwash') && (
                  <ProjectImage
                    src={getImage('pos-02-carwash').src}
                    projectName={project.shortTitle}
                    label={isVi ? 'POS Rửa Xe & Nhập Biển Số' : 'POS Service Selection'}
                    expectedFile={getImage('pos-02-carwash').expectedFile}
                    description={isVi ? 'Giao diện chọn gói và nhập biển số với vùng chạm lớn tối ưu cho màn hình cảm ứng' : 'Package cards and license plate entry form'}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('pos-03-cart') && (
                  <ProjectImage
                    src={getImage('pos-03-cart').src}
                    projectName={project.shortTitle}
                    label={isVi ? 'POS Giỏ Hàng & Tính Tiền' : 'POS Cart & Add to Request'}
                    expectedFile={getImage('pos-03-cart').expectedFile}
                    description={isVi ? 'Hiển thị giỏ hàng trực quan và tự động tính tổng tiền cùng ưu đãi' : 'Real-time cart calculation and itemization'}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('pos-05-payment') && (
                  <ProjectImage
                    src={getImage('pos-05-payment').src}
                    projectName={project.shortTitle}
                    label={isVi ? 'POS Thanh Toán Đa Kênh' : 'POS Payment Method'}
                    expectedFile={getImage('pos-05-payment').expectedFile}
                    description={isVi ? 'Màn hình thanh toán hỗ trợ VietQR động, thẻ ngân hàng chạm NFC và tiền mặt' : 'VietQR dynamic code, NFC contactless, and cash'}
                    aspectRatio="16/10"
                  />
                )}
              </div>

              {/* POS Cross-Vertical Extension: EV Charging */}
              {getImage('pos-07-ev-charging') && (
                <div className="pt-2">
                  <ProjectImage
                    src={getImage('pos-07-ev-charging').src}
                    projectName={project.shortTitle}
                    label={isVi ? 'Mở Rộng POS: Trạm Sạc Xe Điện EV' : 'POS Extension: EV Charging Station'}
                    expectedFile={getImage('pos-07-ev-charging').expectedFile}
                    description={isVi ? 'Tích hợp trạm sạc xe điện EV trên cùng một hệ sinh thái POS và giao thức quản trị' : 'EV charging station integration within the same POS ecosystem'}
                    aspectRatio="16/10"
                  />
                </div>
              )}
            </section>

            {/* 06. ADMIN / OPERATIONS */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs tabular-nums font-bold text-[#FF7A00] uppercase tracking-wider bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  06 · {isVi ? 'Quản Trị Vận Hành' : 'Admin & Operations'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Hậu Thuẫn Cho Mặt Vận Hành Dịch Vụ' : 'Supporting the Operational Side of the Service'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
                  {isVi
                    ? 'Cổng quản trị mở rộng hệ sinh thái thành các công cụ điều hành chuyên sâu: giám sát doanh thu, đối soát giao dịch và cấu hình các thực thể dịch vụ đằng sau trải nghiệm khách hàng và POS. Giao diện được thiết kế với mật độ thông tin dày dặn (dense data), bảng biểu tra cứu chi tiết và các mô hình cấu hình cấp hệ thống mà không sao chép máy móc giao diện của bản mobile.'
                    : 'The administration portal expands the same service ecosystem into operational tools for monitoring transactions and configuring the services behind the customer and POS experiences. The UI has to support denser information, configuration tasks and system-level entities without carrying over the interaction patterns of the mobile experience directly.'}
                </p>
              </div>

              {/* 4 Core Admin Modules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1">
                  <div className="text-xs tabular-nums font-bold text-[#FF7A00]">{tt("01 · ANALYTICS")}</div>
                  <div className="font-bold text-slate-900 text-sm">{tt("Revenue Dashboard")}</div>
                  <p className="text-xs text-slate-500">{tt("Doanh thu, giao dịch hoàn tất, tỷ lệ tăng trưởng và lưu lượng giờ cao điểm.")}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1">
                  <div className="text-xs tabular-nums font-bold text-[#FF7A00]">{tt("02 · OPERATIONS")}</div>
                  <div className="font-bold text-slate-900 text-sm">{tt("Locations & Catalog")}</div>
                  <p className="text-xs text-slate-500">{tt("Mạng lưới trạm, số buồng rửa, định giá gói dịch vụ và danh mục combo.")}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1">
                  <div className="text-xs tabular-nums font-bold text-[#FF7A00]">{tt("03 · ACCESS & ROLES")}</div>
                  <div className="font-bold text-slate-900 text-sm">{tt("RBAC Matrix")}</div>
                  <p className="text-xs text-slate-500">{tt("Phân quyền chi tiết cho Super Admin, Quản lý trạm và Thu ngân.")}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1">
                  <div className="text-xs tabular-nums font-bold text-[#FF7A00]">{tt("04 · HARDWARE / IOT")}</div>
                  <div className="font-bold text-slate-900 text-sm">{tt("POS Terminals & Gateway")}</div>
                  <p className="text-xs text-slate-500">{tt("Quản lý mã máy POS, định danh IP và cổng kết nối IoT điều khiển buồng rửa.")}</p>
                </div>
              </div>

              {/* Admin Screens Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('admin-01-revenue-dashboard') && (
                  <ProjectImage
                    src={getImage('admin-01-revenue-dashboard').src}
                    projectName={project.shortTitle}
                    label={tt("Admin Revenue Dashboard")}
                    expectedFile={getImage('admin-01-revenue-dashboard').expectedFile}
                    description={tt("Biểu đồ phân tích doanh thu và lưu lượng xe thực tế tại trạm")}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('admin-03-locations-registry') && (
                  <ProjectImage
                    src={getImage('admin-03-locations-registry').src}
                    projectName={project.shortTitle}
                    label={tt("Admin Locations Registry")}
                    expectedFile={getImage('admin-03-locations-registry').expectedFile}
                    description={tt("Quản lý danh sách các trạm EcoStation và số lượng khoang rửa")}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('admin-04-product-catalog') && (
                  <ProjectImage
                    src={getImage('admin-04-product-catalog').src}
                    projectName={project.shortTitle}
                    label={tt("Admin Product & Combo Catalog")}
                    expectedFile={getImage('admin-04-product-catalog').expectedFile}
                    description={tt("Cấu hình gói dịch vụ rửa xe, giá theo loại xe và chương trình ưu đãi")}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('admin-05-roles-permissions') && (
                  <ProjectImage
                    src={getImage('admin-05-roles-permissions').src}
                    projectName={project.shortTitle}
                    label={tt("Admin Roles & Permission Matrix")}
                    expectedFile={getImage('admin-05-roles-permissions').expectedFile}
                    description={tt("Ma trận phân quyền vai trò người dùng (RBAC) bảo mật dữ liệu")}
                    aspectRatio="16/10"
                  />
                )}
              </div>

              {/* Hardware Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {getImage('admin-06-pos-terminals') && (
                  <ProjectImage
                    src={getImage('admin-06-pos-terminals').src}
                    projectName={project.shortTitle}
                    label={tt("Admin POS Terminals")}
                    expectedFile={getImage('admin-06-pos-terminals').expectedFile}
                    description={tt("Quản trị thiết bị máy POS và phân bổ máy theo từng trạm")}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('admin-07-iot-gateway') && (
                  <ProjectImage
                    src={getImage('admin-07-iot-gateway').src}
                    projectName={project.shortTitle}
                    label={tt("Admin IoT Gateway Registry")}
                    expectedFile={getImage('admin-07-iot-gateway').expectedFile}
                    description={tt("Đăng ký và giám sát cổng điều khiển phần cứng IoT buồng rửa tự động")}
                    aspectRatio="16/10"
                  />
                )}
              </div>
            </section>

            {/* 07. DIFFERENT USERS, SAME PRODUCT */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-4">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]">
                  07 · {isVi ? 'So Sánh Ngữ Cảnh' : 'Different Users, Same Product'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-1">
                  {isVi ? 'Cùng Hệ Sinh Thái, Khác Ngữ Cảnh Tương Tác' : 'Same Ecosystem, Different Interaction Contexts'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
                  {isVi
                    ? 'Một sản phẩm dùng chung không đòi hỏi các giao diện phải giống hệt nhau về từng pixel. Mỗi bề mặt đại diện cho cùng một hệ sinh thái dịch vụ, nhưng mật độ thông tin, mô hình tương tác và độ ưu tiên tác vụ được tùy biến sâu sắc theo ngữ cảnh của người dùng.'
                    : 'A shared product does not require identical interfaces. Each surface represents the same service ecosystem, but the information density, interaction model and task priority change according to the user context.'}
                </p>
              </div>

              {/* Comparison Matrix Table */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      C
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{tt("CUSTOMER")}</h3>
                      <p className="text-xs text-slate-400 tabular-nums">{tt("Mobile App")}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs tabular-nums uppercase text-slate-400 font-bold block mb-1">
                      {isVi ? 'Tác vụ chính' : 'Primary Task'}
                    </span>
                    <p className="text-xs text-slate-700 font-semibold">
                      {isVi ? 'Sử dụng và quản lý dịch vụ' : 'Use and manage services'}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs tabular-nums uppercase text-slate-400 font-bold block mb-1">
                      {isVi ? 'Đặc trưng giao diện' : 'Interface Characteristics'}
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>{isVi ? 'Thiết kế Mobile-first' : 'Mobile-first'}</li>
                      <li>{isVi ? 'Quy trình có hướng dẫn (Guided)' : 'Guided walkthrough'}</li>
                      <li>{isVi ? 'Mật độ thông tin thấp' : 'Low information density'}</li>
                      <li>{isVi ? 'Tập trung vào dịch vụ cá nhân' : 'Service-oriented context'}</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      P
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{tt("POS STAFF")}</h3>
                      <p className="text-xs text-slate-400 tabular-nums">{tt("Touch Kiosk")}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs tabular-nums uppercase text-slate-400 font-bold block mb-1">
                      {isVi ? 'Tác vụ chính' : 'Primary Task'}
                    </span>
                    <p className="text-xs text-slate-700 font-semibold">
                      {isVi ? 'Xử lý giao dịch nhanh tại quầy' : 'Process transactions quickly'}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs tabular-nums uppercase text-slate-400 font-bold block mb-1">
                      {isVi ? 'Đặc trưng giao diện' : 'Interface Characteristics'}
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>{isVi ? 'Không gian làm việc rộng, nút bấm lớn' : 'Large working area'}</li>
                      <li>{isVi ? 'Tối ưu tốc độ thao tác (Task-oriented)' : 'Task-oriented ergonomics'}</li>
                      <li>{isVi ? 'Chọn dịch vụ tức thì' : 'Fast service selection'}</li>
                      <li>{isVi ? 'Tập trung thanh toán đa kênh' : 'Payment-focused checkout'}</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{tt("ADMIN / OPERATOR")}</h3>
                      <p className="text-xs text-slate-400 tabular-nums">{tt("Desktop Web")}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs tabular-nums uppercase text-slate-400 font-bold block mb-1">
                      {isVi ? 'Tác vụ chính' : 'Primary Task'}
                    </span>
                    <p className="text-xs text-slate-700 font-semibold">
                      {isVi ? 'Giám sát và cấu hình vận hành' : 'Monitor and configure operations'}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs tabular-nums uppercase text-slate-400 font-bold block mb-1">
                      {isVi ? 'Đặc trưng giao diện' : 'Interface Characteristics'}
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>{isVi ? 'Mật độ dữ liệu cao (Dense Data)' : 'Dense data tables'}</li>
                      <li>{isVi ? 'Bảng biểu & Bộ lọc chi tiết' : 'Search & audit filters'}</li>
                      <li>{isVi ? 'Biểu mẫu cấu hình đa cấp' : 'Deep configuration tools'}</li>
                      <li>{isVi ? 'Quản trị hệ thống & thiết bị' : 'System & hardware management'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 08. DESIGN SYSTEM */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs tabular-nums font-bold text-[#FF7A00] uppercase tracking-wider bg-[#FFF2E6] border border-[#FFD4B2] px-3 py-1 rounded-full">
                  08 · {isVi ? 'Hệ Thống Thiết Kế' : 'Design System'}
                </span>
                <h2 className="typo-case-major text-slate-900 mt-3">
                  {isVi ? 'Tạo Dựng Tính Nhất Quán Giữa Các Bề Mặt' : 'Creating Consistency Across Surfaces'}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
                  {isVi
                    ? 'Một nền tảng thị giác chung giúp duy trì hành vi sản phẩm quen thuộc và nhất quán, trong khi vẫn cho phép các giao diện mobile, POS và admin đáp ứng linh hoạt các yêu cầu tương tác và công thái học khác nhau.'
                    : 'A shared visual foundation helps maintain recognizable product behavior while still allowing mobile, POS and admin interfaces to respond to different interaction requirements.'}
                </p>
              </div>

              {/* Design System Foundations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getImage('design-system-01-colors') && (
                  <ProjectImage
                    src={getImage('design-system-01-colors').src}
                    projectName={project.shortTitle}
                    label={tt("Color Tokens")}
                    expectedFile={getImage('design-system-01-colors').expectedFile}
                    description={tt("Brand Green (#00C853, #006E2A), Info Blue, Accent Orange, Text & Surfaces")}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('design-system-02-typography') && (
                  <ProjectImage
                    src={getImage('design-system-02-typography').src}
                    projectName={project.shortTitle}
                    label={tt("Typography Scale (Inter)")}
                    expectedFile={getImage('design-system-02-typography').expectedFile}
                    description={tt("Display, Headings, Body, Labels, Caption, Micro & Stat sizes")}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('design-system-03-spacing-radius') && (
                  <ProjectImage
                    src={getImage('design-system-03-spacing-radius').src}
                    projectName={project.shortTitle}
                    label={tt("Spacing & Radius Scale")}
                    expectedFile={getImage('design-system-03-spacing-radius').expectedFile}
                    description={tt("Spatial scale (4px–64px), radius scale (4px–24px), elevation styles")}
                    aspectRatio="16/10"
                  />
                )}
              </div>

              {/* Design System Component Library */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {getImage('design-system-04-buttons') && (
                  <ProjectImage
                    src={getImage('design-system-04-buttons').src}
                    projectName={project.shortTitle}
                    label={tt("Button Components")}
                    expectedFile={getImage('design-system-04-buttons').expectedFile}
                    description={tt("Primary, Secondary, Outline, Ghost")}
                    aspectRatio="square"
                  />
                )}
                {getImage('design-system-05-inputs') && (
                  <ProjectImage
                    src={getImage('design-system-05-inputs').src}
                    projectName={project.shortTitle}
                    label={tt("Input Fields")}
                    expectedFile={getImage('design-system-05-inputs').expectedFile}
                    description={tt("Default, Focus, Error, Disabled")}
                    aspectRatio="square"
                  />
                )}
                {getImage('design-system-06-badges') && (
                  <ProjectImage
                    src={getImage('design-system-06-badges').src}
                    projectName={project.shortTitle}
                    label={tt("Badge & Tags")}
                    expectedFile={getImage('design-system-06-badges').expectedFile}
                    description={tt("Neutral, Success, Info, Category")}
                    aspectRatio="square"
                  />
                )}
                {getImage('design-system-07-cards') && (
                  <ProjectImage
                    src={getImage('design-system-07-cards').src}
                    projectName={project.shortTitle}
                    label={tt("Card Components")}
                    expectedFile={getImage('design-system-07-cards').expectedFile}
                    description={tt("Stat Light, Stat Dark, List Item")}
                    aspectRatio="square"
                  />
                )}
              </div>
            </section>
          </>
        )}

        {/* --- CASE 07: CORPORATE WEBSITE (TECHERA) --- */}
        {project.slug === 'corporate-website' && (
          <>
            {/* 01 — PROJECT OVERVIEW */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("01 · Project Overview")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Communicating a Complex Technology Ecosystem Clearly")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("TECHERA's website brings multiple technology products, services, projects and company content into a single responsive web experience. The design challenge was not limited to creating individual pages. The website needed a clear information structure that could communicate different solution categories while supporting company content such as projects, case studies, recruitment, articles and consultation.")} </p>
              </div>

              {/* Metadata chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-xs tabular-nums font-bold tracking-wider uppercase text-slate-400 block mb-1"> {tt("Type")} </span>
                  <span className="text-sm font-semibold text-slate-900"> {tt("Corporate / B2B Website")} </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-xs tabular-nums font-bold tracking-wider uppercase text-slate-400 block mb-1"> {tt("Platforms")} </span>
                  <span className="text-sm font-semibold text-slate-900"> {tt("Desktop · Tablet · Mobile")} </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-xs tabular-nums font-bold tracking-wider uppercase text-slate-400 block mb-1"> {tt("Scope")} </span>
                  <span className="text-sm font-semibold text-slate-900"> {tt("Content · Solutions · Careers · Blog")} </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <span className="text-xs tabular-nums font-bold tracking-wider uppercase text-slate-400 block mb-1"> {tt("Role")} </span>
                  <span className="text-sm font-semibold text-[#FF7A00]"> {tt("UI Design / UIUX Support")} </span>
                </div>
              </div>
            </section>

            {/* 02 — WEBSITE INFORMATION ARCHITECTURE */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("02 · Information Architecture")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Structuring Different Content Types Into One Experience")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("The website combines product communication, company information and content-driven pages under one navigation system. Each page type requires different information density, but the overall structure keeps the user oriented as they move from discovering TECHERA to understanding its solutions, reviewing projects and contacting the company.")} </p>
              </div>

              {/* IA Map Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]" />
                  <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-slate-400"> {tt("Site Hierarchy & Navigation Taxonomy")} </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs tabular-nums">
                  {/* Column 1: Core Company */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-3">
                    <span className="font-bold text-sky-400 uppercase tracking-wider block">{tt("01 · Corporate Hub")}</span>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center gap-2"><span className="text-emerald-400">●</span> {tt("Homepage (Hero & Positioning)")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Về chúng tôi (About)")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Social Proof & Partners")}</li>
                    </ul>
                  </div>

                  {/* Column 2: Solutions & Services */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-3">
                    <span className="font-bold text-amber-400 uppercase tracking-wider block">{tt("02 · Solutions & Ecosystem")}</span>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center gap-2"><span className="text-emerald-400">●</span> {tt("Dịch vụ (Techera Ecosystem)")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Quản lý vé & Phân phối vé")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Quản lý sân Golf & Resort")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("ERP nội bộ & Tự động hóa")}</li>
                    </ul>
                  </div>

                  {/* Column 3: Proof & Editorial */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-3">
                    <span className="font-bold text-indigo-400 uppercase tracking-wider block">{tt("03 · Projects & Editorial")}</span>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center gap-2"><span className="text-emerald-400">●</span> {tt("Danh sách dự án (Directory)")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Chi tiết dự án (Case Detail)")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Blog công nghệ & Tri thức")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Tuyển dụng & Văn hóa")}</li>
                    </ul>
                  </div>

                  {/* Column 4: Conversion & Contact */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-3">
                    <span className="font-bold text-[#FF7A00] uppercase tracking-wider block">{tt("04 · Conversion Paths")}</span>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center gap-2"><span className="text-emerald-400">●</span> {tt("Liên hệ (Contact Office)")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Đăng ký tư vấn giải pháp số")}</li>
                      <li className="flex items-center gap-2"><span className="text-slate-500">└─</span> {tt("Request Demo & Tư vấn")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 03 — HOMEPAGE */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("03 · Homepage Experience")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Building a Clear Entry Point Into the Ecosystem")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("The homepage acts as an entry point into a broad technology offering. Rather than presenting every capability with equal emphasis, the page groups company positioning, solution categories, product capabilities, social proof and supporting content into a progressive information hierarchy. The structure allows visitors to move from high-level company understanding toward specific products, projects or contact actions.")} </p>
              </div>

              {/* Homepage Hero */}
              {getImage('02-homepage-hero') && (
                <ProjectImage
                  src={getImage('02-homepage-hero').src}
                  projectName={project.shortTitle}
                  label={getImage('02-homepage-hero').label}
                  expectedFile={getImage('02-homepage-hero').expectedFile}
                  description={getImage('02-homepage-hero').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {/* Tabs + Grid detail crop */}
              {getImage('03-solutions-capabilities') && (
                <ProjectImage
                  src={getImage('03-solutions-capabilities').src}
                  projectName={project.shortTitle}
                  label={getImage('03-solutions-capabilities').label}
                  expectedFile={getImage('03-solutions-capabilities').expectedFile}
                  description={getImage('03-solutions-capabilities').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {/* Full Homepage Scroll / Overview */}
              {getImage('02-homepage-full') && (
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="text-xs tabular-nums font-bold text-slate-500 uppercase tracking-wider"> {tt("Desktop 1280px · Full Page Layout Rhythm")} </span>
                    <span className="text-xs text-slate-400"> {tt("Click image to inspect sections & typography")} </span>
                  </div>
                  <ProjectImage
                    src={getImage('02-homepage-full').src}
                    projectName={project.shortTitle}
                    label={getImage('02-homepage-full').label}
                    expectedFile={getImage('02-homepage-full').expectedFile}
                    description={getImage('02-homepage-full').slotPurpose}
                    aspectRatio="16/10"
                  />
                </div>
              )}
            </section>

            {/* 04 — EXPLAINING PRODUCTS & SERVICES */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("04 · Products & Services")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Turning Technical Capabilities Into Scannable Content")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("Technology company websites often need to explain multiple systems without overwhelming the visitor. The solution and service pages use structured sections, short capability descriptions and visual grouping to make the ecosystem easier to scan before the visitor moves into deeper product or project information.")} </p>
              </div>

              {/* Feature pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs tabular-nums font-bold text-sky-600 uppercase tracking-wider block"> {tt("01 · Content Hierarchy")} </span>
                  <p className="text-xs text-slate-600 leading-relaxed"> {tt("Grouping technology capabilities from high-level enterprise domains down into digestible feature cards with clear visual anchors.")} </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs tabular-nums font-bold text-amber-600 uppercase tracking-wider block"> {tt("02 · Category Grouping")} </span>
                  <p className="text-xs text-slate-600 leading-relaxed"> {tt("Clear logical separation between universal cloud infrastructure, domain-specific modules (Ticketing, Golf, ERP), and customization services.")} </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs tabular-nums font-bold text-[#FF7A00] uppercase tracking-wider block"> {tt("03 · Scannability & Action")} </span>
                  <p className="text-xs text-slate-600 leading-relaxed"> {tt("Structured capability cards with bulleted feature highlights and contextual consultation CTAs to maintain exploration flow.")} </p>
                </div>
              </div>

              {getImage('04-services') && (
                <ProjectImage
                  src={getImage('04-services').src}
                  projectName={project.shortTitle}
                  label={getImage('04-services').label}
                  expectedFile={getImage('04-services').expectedFile}
                  description={getImage('04-services').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>

            {/* 05 — PROJECTS & CASE STUDIES */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("05 · Proof & Real-World Impact")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Supporting Both Discovery and Deeper Project Storytelling")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("Project listing pages need to support quick discovery, while project and case-study detail pages need more room for context and long-form storytelling. The design therefore uses different content densities while preserving a consistent visual language and navigation model.")} </p>
              </div>

              {/* Step Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-xs tabular-nums font-bold text-slate-700 flex items-center justify-center">01</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{tt("Project Directory")}</span>
                    <span className="text-xs text-slate-500">{tt("Quick scanning & category filters")}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-xs tabular-nums font-bold text-slate-700 flex items-center justify-center">02</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{tt("Project Detail")}</span>
                    <span className="text-xs text-slate-500">{tt("Structured deliverables & tech stack")}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#FFF2E6] border border-[#FFD4B2] text-xs tabular-nums font-bold text-[#FF7A00] flex items-center justify-center">03</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{tt("Case Study Detail")}</span>
                    <span className="text-xs text-slate-500">{tt("Long-form narrative & system workflows")}</span>
                  </div>
                </div>
              </div>

              {getImage('05-projects-casestudy') && (
                <ProjectImage
                  src={getImage('05-projects-casestudy').src}
                  projectName={project.shortTitle}
                  label={getImage('05-projects-casestudy').label}
                  expectedFile={getImage('05-projects-casestudy').expectedFile}
                  description={getImage('05-projects-casestudy').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>

            {/* 06 — RESPONSIVE DESIGN */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("06 · Responsive Layout Architecture")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Responsive by Structure, Not Just Scale")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("The responsive work was treated as layout adaptation rather than simply shrinking the desktop interface. Navigation, content width, section stacking, card layouts and long-form content were reorganized according to the available viewport while preserving the same content hierarchy.")} </p>
              </div>

              {/* Viewport matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tabular-nums font-bold text-slate-900">{tt("DESKTOP")}</span>
                    <span className="text-xs tabular-nums px-2 py-0.5 rounded bg-slate-100 text-slate-600">1280px</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed"> {tt("Full horizontal grid layouts, sticky mega-menu navigation bar, and multi-column comparison tables.")} </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tabular-nums font-bold text-slate-900">{tt("TABLET")}</span>
                    <span className="text-xs tabular-nums px-2 py-0.5 rounded bg-slate-100 text-slate-600">768px – 900px</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed"> {tt("Adaptive 2-column reorganization, touch-optimized button targets, and collapsed secondary margins.")} </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tabular-nums font-bold text-slate-900">{tt("MOBILE")}</span>
                    <span className="text-xs tabular-nums px-2 py-0.5 rounded bg-[#FFF2E6] text-[#FF7A00]">390px</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed"> {tt("Single-column stacked rhythm, bottom-friendly thumb targets, off-canvas navigation menu, and readable font scales.")} </p>
                </div>
              </div>

              {getImage('06-responsive') && (
                <ProjectImage
                  src={getImage('06-responsive').src}
                  projectName={project.shortTitle}
                  label={getImage('06-responsive').label}
                  expectedFile={getImage('06-responsive').expectedFile}
                  description={getImage('06-responsive').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>

            {/* 07 — CONTENT-HEAVY PAGE TYPES */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("07 · Editorial & Organizational Templates")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Designing Reusable Patterns for Different Content Needs")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("Beyond product communication, the website also needs to support editorial, recruitment and lead-generation content. Shared layout patterns help maintain consistency while still adapting to very different tasks such as browsing articles, reviewing job information or submitting a consultation request.")} </p>
              </div>

              {getImage('07-content-templates') && (
                <ProjectImage
                  src={getImage('07-content-templates').src}
                  projectName={project.shortTitle}
                  label={getImage('07-content-templates').label}
                  expectedFile={getImage('07-content-templates').expectedFile}
                  description={getImage('07-content-templates').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>

            {/* 08 — CONTACT / CONVERSION PATH */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs tabular-nums font-bold uppercase tracking-wider text-[#FF7A00]"> {tt("08 · Contact & Conversion Funnel")} </span>
                <h2 className="typo-case-major text-slate-900 mt-1"> {tt("Creating Clear Paths From Exploration to Contact")} </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-2"> {tt("The website progressively moves from company and solution discovery toward contact and consultation. Calls to action are distributed across different content contexts while the dedicated consultation flow provides a focused place for visitors to provide their information and business needs.")} </p>
              </div>

              {getImage('08-contact-consultation') && (
                <ProjectImage
                  src={getImage('08-contact-consultation').src}
                  projectName={project.shortTitle}
                  label={getImage('08-contact-consultation').label}
                  expectedFile={getImage('08-contact-consultation').expectedFile}
                  description={getImage('08-contact-consultation').slotPurpose}
                  aspectRatio="16/10"
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tabular-nums font-bold uppercase tracking-wider bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2]">
              <Workflow className="w-4 h-4 text-[#FF7A00]" />
              {isVi ? 'Tăng tốc quy trình' : 'Workflow Acceleration'}
            </span>
            <span className="text-xs font-medium text-slate-400">
              {isVi ? 'Phân tích & Sản xuất' : 'Analysis & Production'}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {isVi ? 'AI tăng tốc sản xuất, không thay thế phán đoán.' : 'AI accelerates production, not judgment.'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {isVi
              ? 'Trong dự án này, công cụ AI được dùng để đọc hiểu đặc tả nghiệp vụ, phát hiện các trường hợp biên tiềm ẩn, soạn checklist kiểm tra và đẩy nhanh việc viết tài liệu. Toàn bộ logic sản phẩm, đánh đổi kiến trúc và phán đoán UX cuối cùng đều do con người quyết định.'
              : 'During this project, AI tooling was utilized to parse business specifications, uncover hidden edge cases, draft validation checklists, and accelerate documentation. All product logic, architectural tradeoffs, and final UX judgment were human-controlled.'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {(isVi
              ? ['Đọc hiểu đặc tả', 'Phát hiện trường hợp biên', 'Soạn checklist trạng thái', 'Kiểm thử áp lực luồng', 'Tài liệu bàn giao']
              : ['Specification Parsing', 'Edge-Case Identification', 'State Checklist Generation', 'Flow Stress Testing', 'Handoff Documentation']
            ).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-xs font-medium"
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
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate(prevProject.slug);
                }
              }}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-[#0E2A47] shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <span className="text-xs tabular-nums text-slate-400 group-hover:text-[#FF7A00] transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isVi ? 'DỰ ÁN TRƯỚC' : 'PREVIOUS PROJECT'}</span>
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-[#FF7A00] transition-colors truncate">
                {prevProject.title}
              </h4>
              <span className="text-xs text-slate-500">{prevProject.role}</span>
            </button>

            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate(nextProject.slug);
                }
              }}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-[#0E2A47] shadow-sm hover:shadow-md transition-all text-right group cursor-pointer"
            >
              <span className="text-xs tabular-nums text-slate-400 group-hover:text-[#FF7A00] transition-colors flex items-center justify-end gap-1">
                <span>{isVi ? 'DỰ ÁN TIẾP THEO' : 'NEXT PROJECT'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-[#FF7A00] transition-colors truncate">
                {nextProject.title}
              </h4>
              <span className="text-xs text-slate-500">{nextProject.role}</span>
            </button>
          </div>
        </nav>
      </main>
    </article>
  );
}
