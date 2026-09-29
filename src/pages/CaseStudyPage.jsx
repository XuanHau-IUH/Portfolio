import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  Calendar, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  AlertCircle
} from 'lucide-react';
import { projects, aiPositioning } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';
import ProjectImage from '../components/ProjectImage';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="pt-40 pb-28 min-h-screen bg-[#FCFCFD] flex items-center justify-center text-center px-4">
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
          <p className="text-sm text-slate-500">
            The project you're looking for does not exist or has been moved.
          </p>
          <div className="pt-2">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Work</span>
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
    <article className="pt-32 pb-28 min-h-screen bg-[#FCFCFD] text-slate-800">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isVi ? 'Quay lại danh sách dự án' : 'Back to All Projects'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              {isVi ? `DỰ ÁN ${project.index} TRÊN 07` : `PROJECT ${project.index} OF 07`}
            </span>
          </div>
        </div>
      </div>

      {/* Case Study Hero Header */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6 mb-12">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-100/80 text-purple-700">
              <Sparkles className="w-3 h-3 text-purple-600" />
              {project.eyebrow || project.productType}
            </span>
            <span className="text-xs font-medium text-slate-400">
              {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
            {project.intro || project.subtitle}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <User className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Vai trò' : 'Role'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
              {project.role}
            </div>
            {project.metadata?.baContribution && (
              <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                + {isVi ? 'Đóng góp BA: ' : 'BA: '}{project.metadata.baContribution}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Compass className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Lĩnh vực' : 'Domain'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm truncate">
              {project.metadata?.domain || project.domain || project.productType}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Nền tảng' : 'Platforms'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
              {project.metadata?.platforms || (Array.isArray(project.platforms) ? project.platforms.slice(0, 3).join(' · ') : project.platforms)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>{isVi ? 'Thời gian' : 'Timeline'}</span>
            </div>
            <div className="font-bold text-slate-800 mt-1 text-xs sm:text-sm">
              {project.year}
            </div>
          </div>
        </div>

        {/* Scope pill if present in metadata */}
        {project.metadata?.scope && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-baseline gap-1.5 shadow-2xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider font-mono shrink-0">
              {isVi ? 'Phạm vi:' : 'Scope:'}
            </span>
            <span className="font-medium text-slate-700">{project.metadata.scope}</span>
          </div>
        )}

        {/* Skill tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase tracking-wider font-mono">
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
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
              Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Product Summary & Context
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {project.summary}
          </p>

          {project.complexity && (
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 border border-purple-100/90 text-sm space-y-1.5">
              <span className="font-bold text-purple-800 uppercase tracking-wider text-xs block">
                System Complexity
              </span>
              <p className="text-slate-700 leading-relaxed">
                {project.complexity}
              </p>
            </div>
          )}

          {/* Key Work Responsibilities */}
          {project.keyWork && project.keyWork.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
                Key Responsibilities & Scope
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                {project.keyWork.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
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
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  {project.challenge?.sectionLabel || 'BÀI TOÁN'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.challenge?.title || 'Kết nối trải nghiệm booking với hệ thống vận hành phía sau'}
                </h2>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  Ha Long Luxe không chỉ là một website đặt du thuyền. Hệ thống phải kết nối trải nghiệm của khách hàng với nhiều quy trình vận hành phía sau như lịch khởi hành, cabin, tồn kho, booking, agency, tài chính và phân quyền.
                </p>
                <p>
                  Thách thức thiết kế nằm ở việc giữ cho trải nghiệm booking đơn giản với người dùng, trong khi vẫn mô hình hóa đủ business logic và trạng thái cần thiết cho đội ngũ vận hành.
                </p>
              </div>
            </section>

            {/* 05. Product Ecosystem */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  02 · Hệ sinh thái sản phẩm
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.ecosystem?.title || 'Một sản phẩm, nhiều góc nhìn vận hành'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(project.ecosystem?.groups || [
                  { name: 'B2C BOOKING', flow: 'Search · Cruise Detail · Cabin · Passenger · Payment' },
                  { name: 'B2B AGENCY', flow: 'Reservation · Credit · Inventory · Reconciliation' },
                  { name: 'ADMIN OPERATIONS', flow: 'Booking · Schedule · Fleet · Inventory · Finance · RBAC' }
                ]).map((grp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-900 uppercase block mb-2">
                        {grp.name}
                      </span>
                      <p className="text-stone-700 text-sm font-medium leading-relaxed">
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
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  03 · Hành trình đặt chỗ
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.bookingJourney?.title || 'Từ khám phá du thuyền đến hoàn tất đặt chỗ'}
                </h2>
              </div>

              {/* Stepper Visual */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
                {(project.bookingJourney?.steps || [
                  'Search', 'Results', 'Cruise Detail', 'Deck & Cabin', 'Passenger Information', 'Payment', 'Confirmation'
                ]).map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-left">
                    <span className="text-[10px] font-mono text-amber-700 font-bold block">STEP {idx + 1}</span>
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
                    caption="Figure 01: Homepage khám phá và tìm chuyến du thuyền nhanh theo bộ lọc trực quan."
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
                    caption="Figure 02: Kết quả tìm kiếm và so sánh chi tiết các lựa chọn du thuyền."
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
                    caption="Figure 03: Cruise Detail & Content Hierarchy: Hành trình, tiện ích và chính sách."
                  />
                )}
              </div>
            </section>

            {/* 07. Deck & Cabin Selection */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  04 · Trải nghiệm chọn cabin
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Biến sơ đồ tàu thành một trải nghiệm chọn cabin dễ hiểu
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Giao diện tổ chức thông tin theo ba lớp: Deck → vị trí cabin → chi tiết cabin, đồng thời giữ booking summary luôn hiện diện để người dùng kiểm tra lựa chọn và tổng chi phí.
                </p>
              </div>

              {getImage('05-deck-cabin-selection') && (
                <ProjectImage
                  src={getImage('05-deck-cabin-selection').src}
                  projectName={project.shortTitle}
                  label={getImage('05-deck-cabin-selection').label}
                  expectedFile={getImage('05-deck-cabin-selection').expectedFile}
                  description={getImage('05-deck-cabin-selection').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 04: Sơ đồ boong và tương tác lựa chọn cabin thời gian thực."
                />
              )}

              {/* Design Decisions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                  <h4 className="font-bold text-amber-900 text-sm mb-1">Context before detail</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Cho người dùng thấy cabin nằm ở đâu trên tàu trước khi đọc thông tin chi tiết.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                  <h4 className="font-bold text-amber-900 text-sm mb-1">Availability as state</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Phân biệt trạng thái cabin khả dụng, đang chọn, không khả dụng và cabin được đề xuất.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                  <h4 className="font-bold text-amber-900 text-sm mb-1">Persistent booking summary</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Giữ thông tin booking và chi phí hiển thị xuyên suốt thay vì bắt người dùng nhớ lựa chọn ở bước trước.
                  </p>
                </div>
              </div>
            </section>

            {/* 08. Booking Information & Checkout */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  05 · Thông tin đặt chỗ & Checkout
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Gom dữ liệu phức tạp thành một checkout có cấu trúc
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Layout chia form thành từng nhóm nghiệp vụ và đặt booking summary bên cạnh để người dùng có thể kiểm tra giá, ưu đãi và thông tin chuyến trong suốt quá trình nhập dữ liệu.
                </p>
              </div>

              {getImage('06-booking-information') && (
                <ProjectImage
                  src={getImage('06-booking-information').src}
                  projectName={project.shortTitle}
                  label={getImage('06-booking-information').label}
                  expectedFile={getImage('06-booking-information').expectedFile}
                  description={getImage('06-booking-information').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 05: Passenger Information & Checkout flow."
                />
              )}
            </section>

            {/* 09. Admin Operations */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  06 · Vận hành quản trị (Admin Operations)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Customer experience chỉ là một nửa của sản phẩm
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Phía sau booking experience là hệ thống vận hành cho phép đội ngũ quản lý booking theo nhiều trạng thái, kênh bán, tour/chuyến, hành khách và nghiệp vụ xử lý.
                </p>
              </div>

              {getImage('07-admin-booking-management') && (
                <ProjectImage
                  src={getImage('07-admin-booking-management').src}
                  projectName={project.shortTitle}
                  label={getImage('07-admin-booking-management').label}
                  expectedFile={getImage('07-admin-booking-management').expectedFile}
                  description={getImage('07-admin-booking-management').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 06: Bảng điều khiển quản lý booking theo từng trạng thái vận hành chuyên sâu."
                />
              )}

              {/* Status Domain Highlights */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Tách biệt trạng thái theo từng Domain</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-800 uppercase">01 Booking Status</span>
                    <p className="text-xs text-slate-600">Quản lý vòng đời đặt chỗ: Đang giữ, Đã xác nhận, Đã hủy, Hết hạn.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-800 uppercase">02 Payment Status</span>
                    <p className="text-xs text-slate-600">Sổ cái tài chính: Chưa thanh toán, Đặt cọc một phần, Đã thanh toán, Hoàn tiền.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-800 uppercase">03 Allocation Status</span>
                    <p className="text-xs text-slate-600">Phân bổ cabin: Chưa xếp, Khóa cabin, Đã check-in, Lên tàu.</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pt-1">
                  Thay vì gom nhiều nghiệp vụ vào một trạng thái duy nhất, các trạng thái được tách theo từng domain để người vận hành biết chính xác booking đang ở đâu, tiền đã xử lý đến mức nào và inventory đã được phân bổ hay chưa.
                </p>
              </div>
            </section>

            {/* 10. Fleet & Inventory */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  07 · Cấu trúc đội tàu & Quản lý tồn kho
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Kết nối cấu trúc vật lý của tàu với inventory vận hành
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Admin cần quản lý không chỉ loại phòng mà cả cấu trúc vật lý: Tàu → Boong → Khu vực → Cabin → Loại cabin → Inventory theo chuyến.
                </p>
              </div>

              {getImage('08-admin-fleet-deck') && (
                <ProjectImage
                  src={getImage('08-admin-fleet-deck').src}
                  projectName={project.shortTitle}
                  label={getImage('08-admin-fleet-deck').label}
                  expectedFile={getImage('08-admin-fleet-deck').expectedFile}
                  description={getImage('08-admin-fleet-deck').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 07: Sơ đồ boong quản trị cấu trúc vật lý của tàu."
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
                  caption="Figure 08: Theo dõi sức chứa, số đã đặt, đang giữ và cabin còn khả dụng theo từng lịch khởi hành."
                />
              )}
            </section>

            {/* 11. B2B Booking */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  08 · Kênh Đại lý B2B
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  B2B booking trong cùng hệ sinh thái vận hành
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Luồng B2B bổ sung context của đại lý, nghiệp vụ giữ chỗ và các điều kiện vận hành riêng nhưng vẫn sử dụng cùng nền tảng booking và inventory logic.
                </p>
              </div>

              {getImage('10-b2b-booking') && (
                <ProjectImage
                  src={getImage('10-b2b-booking').src}
                  projectName={project.shortTitle}
                  label={getImage('10-b2b-booking').label}
                  expectedFile={getImage('10-b2b-booking').expectedFile}
                  description={getImage('10-b2b-booking').slotPurpose}
                  aspectRatio="16/10"
                  caption="Figure 09: B2B Agency Booking flow."
                />
              )}
            </section>

            {/* 12. Responsive Design */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  09 · Thiết kế đa thiết bị
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Một capability, nhiều interaction pattern
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Responsive design không đơn thuần thu nhỏ desktop. Các capability quan trọng được giữ lại nhưng hierarchy, navigation, form layout và booking summary được tổ chức lại cho từng viewport.
                </p>
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
                      caption="Figure 10: Mobile Booking Home"
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
                      caption="Figure 11: Mobile Cabin Selection"
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
                  caption="Figure 12: Tổng quan trải nghiệm đa thiết bị Desktop, Tablet và Mobile."
                />
              )}
            </section>

            {/* 13. Design QA & Handoff */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  10 · Design QA & Handoff
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Từ prototype đến handoff
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Prototype và design specifications được sử dụng để làm rõ interaction trước khi development.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Design QA tập trung vào:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'Responsive behavior',
                    'Validation',
                    'Disabled / Success / Error states',
                    'Component consistency',
                    'Cross-module consistency',
                    'Developer handoff'
                  ].map((focus, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 14. Project Scope (Phạm vi hệ thống: 14 compact pills/tags) */}
            <section className="space-y-4">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  11 · Phạm vi hệ thống
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  PHẠM VI HỆ THỐNG ({project.modules.length} Modules)
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                {project.modules.map((mod, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-stone-100 text-stone-700 font-semibold border border-stone-200/70 shadow-xs"
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
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  {isVi ? 'BÀI TOÁN' : 'THE CHALLENGE'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.challenge?.title || 'Giữ một hành trình booking nhất quán trên nhiều nền tảng'}
                </h2>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  Vevuive phục vụ nhiều bước trong cùng một hành trình: từ khám phá điểm đến và sản phẩm, lựa chọn vé, voucher và thông tin khách hàng đến bảo hiểm, thanh toán và quản lý vé sau mua.
                </p>
                <p>
                  Thách thức không chỉ nằm ở việc thiết kế từng màn hình riêng lẻ, mà là đảm bảo business capability được giữ nhất quán giữa Web và Mobile trong khi interaction, hierarchy và cách trình bày phải phù hợp với từng thiết bị.
                </p>
              </div>
            </section>

            {/* 02. Product Ecosystem */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  02 · {isVi ? 'Hệ sinh thái sản phẩm' : 'Product Ecosystem'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.productEcosystem?.title || 'Một hành trình xuyên suốt trước, trong và sau booking'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.productEcosystem?.supportingCopy || 'Thay vì xem từng màn hình như một chức năng độc lập, flow được tổ chức quanh lifecycle của người dùng từ lúc tìm trải nghiệm đến khi sử dụng và quản lý vé sau mua.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(project.productEcosystem?.groups || [
                  { name: 'DISCOVERY', items: ['Homepage', 'Explore', 'Destination', 'Service Detail'] },
                  { name: 'BOOKING', items: ['Ticket Selection', 'Voucher', 'Cart', 'Customer Information'] },
                  { name: 'PROTECTION & PAYMENT', items: ['Insurance', 'Insured Person', 'Payment', 'Confirmation'] },
                  { name: 'POST-BOOKING', items: ['E-ticket', 'Orders', 'Account', 'Insurance Management'] },
                ]).map((grp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
                          0{idx + 1} {grp.name}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {grp.items.map((it, itIdx) => (
                          <li key={itIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600/70 flex-shrink-0" />
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
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  03 · {isVi ? 'Hành trình đặt vé' : 'Booking Journey'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.bookingJourney?.title || 'Từ khám phá đến nhận vé điện tử'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.bookingJourney?.content}
                </p>
              </div>

              {/* 10-step journey grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-medium">
                {(project.bookingJourney?.steps || []).map((step, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs">
                    <span className="font-mono text-[10px] text-amber-700 block font-bold">
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
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  04 · {isVi ? 'Thích ứng Web sang Mobile' : 'Web to Mobile Adaptation'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.webToMobile?.title || 'Feature parity không đồng nghĩa với layout parity'}
                </h2>
              </div>

              {/* Highlight Quote */}
              <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <blockquote className="text-lg sm:text-xl font-bold text-amber-950 italic">
                  "{project.webToMobile?.highlightQuote || 'Same capability. Different interaction pattern.'}"
                </blockquote>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  {project.webToMobile?.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(project.webToMobile?.designPrinciples || []).map((dp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
                    <span className="font-mono text-xs font-bold text-amber-800 uppercase block">
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
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  05 · {isVi ? 'Khám phá & Trải nghiệm' : 'Discovery Layer'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.discovery?.title || 'Từ khám phá địa điểm đến một sản phẩm cụ thể'}
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
                    caption="Figure 01: Booking Homepage — Tối ưu tìm kiếm và điều hướng nhanh đến trải nghiệm phù hợp."
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
                      caption="Figure 02: Explore Grid — Duyệt và so sánh các khu du lịch, điểm đến và sản phẩm."
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
                      caption="Figure 03: Destination Detail — Tổ chức thông tin địa điểm và booking entry points theo hierarchy rõ ràng."
                    />
                  )}
                </div>
              </div>
            </section>

            {/* 06. Ticket Selection & Booking Configuration */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  06 · {isVi ? 'Cấu hình vé & Đặt chỗ' : 'Ticket Selection & Configuration'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.ticketSelection?.title || 'Biến cấu hình vé thành một quyết định dễ kiểm soát'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.ticketSelection?.content}
                </p>
              </div>

              {/* Design Focus Pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                {(project.ticketSelection?.designFocus || []).map((f, idx) => (
                  <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/70 rounded-full font-semibold">
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
                  caption="Figure 04: Service Detail & Booking Configuration — Kết hợp dịch vụ, ngày, khung giờ, vé, voucher và booking summary."
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
                        caption="Figure 05a: Desktop Focused Booking Modal"
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
                          caption="Figure 05b: Mobile Booking Adaptation"
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
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  07 · {isVi ? 'Giỏ hàng & Thông tin khách hàng' : 'Cart & Customer Information'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.cartVoucher?.title || 'Giữ ưu đãi minh bạch trước khi checkout'}
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
                    caption="Figure 06: Cart & Voucher — Kiểm tra lựa chọn, chiết tính giá và mức ưu đãi rõ ràng."
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
                    caption="Figure 07: Customer Information & Checkout — Nhóm dữ liệu nghiệp vụ, phân biệt bắt buộc và tự động mapping."
                  />
                )}
              </div>
            </section>

            {/* 08. Insurance Integration (High-Priority BA + UIUX Contribution) */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  08 · {isVi ? 'Tích hợp bảo hiểm (BA + UI/UX Contribution)' : 'Insurance Integration (BA + UI/UX Contribution)'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.insuranceIntegration?.title || 'Chuyển business rule bảo hiểm thành một trải nghiệm dễ hiểu'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.insuranceIntegration?.content}
                </p>
              </div>

              {/* Principle badge */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-bold text-amber-900">
                ⭐ {isVi ? 'Nguyên tắc thiết kế: ' : 'Design Principle: '}
                <span className="font-extrabold">{project.insuranceIntegration?.designPrinciple || 'Business rule first, interface second.'}</span>
              </div>

              {/* 6 Key Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(project.insuranceIntegration?.areas || []).map((area, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1.5">
                    <span className="font-mono text-xs font-bold text-amber-800 uppercase block">
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
                  caption="Figure 08: Insurance Detail Experience — Quyền lợi, điều kiện, quy định và hỗ trợ bảo hiểm được tổ chức minh bạch."
                />
              )}
            </section>

            {/* 09. Checkout & Payment */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  09 · {isVi ? 'Thanh toán & Xác nhận' : 'Checkout & Payment'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.checkoutPayment?.title || 'Giữ quyết định thanh toán rõ ràng ở bước có nhiều rủi ro nhất'}
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
                    caption="Figure 09: QR Payment Screen — Giữ QR, thông tin giao dịch, countdown và booking summary cùng ngữ cảnh."
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
                    caption="Figure 10: Booking Success & Post-booking — Tiếp tục dẫn người dùng đến chi tiết đơn hàng và nhận vé điện tử."
                  />
                )}
              </div>
            </section>

            {/* 10. Robust System States */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  10 · {isVi ? 'Trạng thái hệ thống' : 'System States'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.systemStates?.title || 'Thiết kế cả những trạng thái không phải happy path'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.systemStates?.content}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                {(project.systemStates?.states || []).map((st, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs text-center">
                    <span className="text-amber-800 font-mono text-[10px] block font-bold">0{idx + 1}</span>
                    <span className="text-slate-800 font-semibold mt-1 block">{st}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 11. Responsive Design & Overview */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  11 · {isVi ? 'Thiết kế Responsive & Đa nền tảng' : 'Responsive Design & Multi-Platform'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.responsiveDesign?.title || 'Cùng một business goal, khác cách tương tác'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {project.responsiveDesign?.content}
                </p>
              </div>

              {/* Comparison table / cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <span className="font-mono text-xs font-bold text-amber-800 uppercase block">
                    💻 Web Interaction Patterns
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(project.responsiveDesign?.comparison?.web || []).map((w, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <span className="font-mono text-xs font-bold text-amber-800 uppercase block">
                    📱 Mobile Interaction Patterns
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(project.responsiveDesign?.comparison?.mobile || []).map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
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
                  caption="Figure 11: Responsive Product Experience — Duy trì feature parity trên toàn bộ viewport."
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
                    caption="Figure 12: Mobile Homepage — Tái cấu trúc hierarchy cho màn hình hẹp."
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
                    caption="Figure 13: Mobile Destination Detail — Điều chỉnh presentation và booking access cho mobile."
                  />
                )}
              </div>
            </section>

            {/* 12. Design System, Prototype, QA & Reflection */}
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  12 · {isVi ? 'Design System, Prototype & Bài học' : 'Design System, Prototype & Learnings'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {project.designSystem?.title || 'Chuẩn hóa interaction trên một sản phẩm nhiều flow'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    {project.prototypeDesignQA?.title || 'Từ flow trên Figma đến hành vi có thể kiểm tra'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.prototypeDesignQA?.content}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    {project.aiWorkflow?.title || 'AI hỗ trợ tốc độ, không thay thế quyết định thiết kế'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.aiWorkflow?.content}
                  </p>
                </div>
              </div>

              {/* Reflection */}
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200/70 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{project.reflection?.title || 'Điều tôi học được'}</span>
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
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                    13 · {isVi ? 'Phạm vi sản phẩm' : 'Product Scope'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 uppercase">
                    {isVi ? `Phạm vi tính năng (${project.productScope.length} Modules)` : `Feature Scope (${project.productScope.length} Modules)`}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  {project.productScope.map((mod, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50/70 text-amber-900 font-semibold border border-amber-200/70 shadow-xs"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* --- CASE 03: MA WAREHOUSE --- */}
        {project.slug === 'ma-warehouse' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Internal Enterprise Operations
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  High-Density Ticket Tables & Batch Management
                </h2>
              </div>

              {getImage('02-dashboard') && (
                <ProjectImage
                  src={getImage('02-dashboard').src}
                  projectName={project.shortTitle}
                  label={getImage('02-dashboard').label}
                  expectedFile={getImage('02-dashboard').expectedFile}
                  description={getImage('02-dashboard').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {getImage('03-inventory-table') && (
                <ProjectImage
                  src={getImage('03-inventory-table').src}
                  projectName={project.shortTitle}
                  label={getImage('03-inventory-table').label}
                  expectedFile={getImage('03-inventory-table').expectedFile}
                  description={getImage('03-inventory-table').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>

            {/* Refund & Cancellation Workflow */}
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  Workflow Design
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  Multi-Role Serial-Level Refund & Cancellation
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Preventing revenue leakage with a strict multi-tier approval chain across departments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
                {project.rolesWorkflow.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-700 text-xs uppercase">{step.role}</span>
                      <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {step.action}
                    </p>
                  </div>
                ))}
              </div>

              {getImage('09-refund-flow') && (
                <ProjectImage
                  src={getImage('09-refund-flow').src}
                  projectName={project.shortTitle}
                  label={getImage('09-refund-flow').label}
                  expectedFile={getImage('09-refund-flow').expectedFile}
                  description={getImage('09-refund-flow').slotPurpose}
                  aspectRatio="16/9"
                />
              )}

              {getImage('12-review-state') && (
                <ProjectImage
                  src={getImage('12-review-state').src}
                  projectName={project.shortTitle}
                  label={getImage('12-review-state').label}
                  expectedFile={getImage('12-review-state').expectedFile}
                  description={getImage('12-review-state').slotPurpose}
                  aspectRatio="16/10"
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 04: TOURISM OMNICHANNEL --- */}
        {project.slug === 'tourism-omnichannel' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Cross-System Integration
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  5-System Omnichannel Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                {project.systems.map((sys, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl shadow-xs space-y-1">
                    <span className="font-bold text-purple-700 block">{sys.name}</span>
                    <p className="text-[11px] text-slate-500 leading-snug">{sys.purpose}</p>
                  </div>
                ))}
              </div>

              {getImage('02-ecosystem') && (
                <ProjectImage
                  src={getImage('02-ecosystem').src}
                  projectName={project.shortTitle}
                  label={getImage('02-ecosystem').label}
                  expectedFile={getImage('02-ecosystem').expectedFile}
                  description={getImage('02-ecosystem').slotPurpose}
                  aspectRatio="16/9"
                />
              )}

              {getImage('03-ticket-lifecycle') && (
                <ProjectImage
                  src={getImage('03-ticket-lifecycle').src}
                  projectName={project.shortTitle}
                  label={getImage('03-ticket-lifecycle').label}
                  expectedFile={getImage('03-ticket-lifecycle').expectedFile}
                  description={getImage('03-ticket-lifecycle').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>

            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  03 · System Touchpoints
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  POS Counters, Gate Turnstiles & B2B Portal
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('05-pos') && (
                  <ProjectImage
                    src={getImage('05-pos').src}
                    projectName={project.shortTitle}
                    label={getImage('05-pos').label}
                    expectedFile={getImage('05-pos').expectedFile}
                    description={getImage('05-pos').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
                {getImage('08-access-control') && (
                  <ProjectImage
                    src={getImage('08-access-control').src}
                    projectName={project.shortTitle}
                    label={getImage('08-access-control').label}
                    expectedFile={getImage('08-access-control').expectedFile}
                    description={getImage('08-access-control').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
              </div>
            </section>
          </>
        )}

        {/* --- CASE 05: INSURANCE INTEGRATION --- */}
        {project.slug === 'insurance-integration' && (
          <>
            <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  Hybrid Methodology
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  Requirement → Business Rule → Validation → Flow → UI
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Translating stringent legal insurance underwriting rules into a friction-free booking add-on.
                </p>
              </div>

              {getImage('02-business-rules') && (
                <ProjectImage
                  src={getImage('02-business-rules').src}
                  projectName={project.shortTitle}
                  label={getImage('02-business-rules').label}
                  expectedFile={getImage('02-business-rules').expectedFile}
                  description={getImage('02-business-rules').slotPurpose}
                  aspectRatio="16/9"
                />
              )}

              {getImage('04-opt-in') && (
                <ProjectImage
                  src={getImage('04-opt-in').src}
                  projectName={project.shortTitle}
                  label={getImage('04-opt-in').label}
                  expectedFile={getImage('04-opt-in').expectedFile}
                  description={getImage('04-opt-in').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {getImage('07-validation') && (
                <ProjectImage
                  src={getImage('07-validation').src}
                  projectName={project.shortTitle}
                  label={getImage('07-validation').label}
                  expectedFile={getImage('07-validation').expectedFile}
                  description={getImage('07-validation').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 06: SMART CAR WASH 4.0 --- */}
        {project.slug === 'smart-car-wash' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Multi-Platform Support
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Customer Mobile, POS Kiosk & Station Admin
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Role: UIUX Support — Maintaining visual consistency and operational state clarity across hardware touchpoints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getImage('02-mobile-home') && (
                  <ProjectImage
                    src={getImage('02-mobile-home').src}
                    projectName={project.shortTitle}
                    label={getImage('02-mobile-home').label}
                    expectedFile={getImage('02-mobile-home').expectedFile}
                    description={getImage('02-mobile-home').slotPurpose}
                    aspectRatio="mobile"
                  />
                )}
                {getImage('04-pos') && (
                  <ProjectImage
                    src={getImage('04-pos').src}
                    projectName={project.shortTitle}
                    label={getImage('04-pos').label}
                    expectedFile={getImage('04-pos').expectedFile}
                    description={getImage('04-pos').slotPurpose}
                    aspectRatio="16/10"
                  />
                )}
              </div>

              {getImage('07-cross-platform') && (
                <ProjectImage
                  src={getImage('07-cross-platform').src}
                  projectName={project.shortTitle}
                  label={getImage('07-cross-platform').label}
                  expectedFile={getImage('07-cross-platform').expectedFile}
                  description={getImage('07-cross-platform').slotPurpose}
                  aspectRatio="16/9"
                />
              )}
            </section>
          </>
        )}

        {/* --- CASE 07: CORPORATE WEBSITE --- */}
        {project.slug === 'corporate-website' && (
          <>
            <section className="space-y-6">
              <div className="border-b border-slate-200/70 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                  02 · Responsive Brand Web
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Modular Section Design & Responsive Layouts
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Role: UI Design / UIUX Support — Supporting visual hierarchy, component modularity, and developer handoff.
                </p>
              </div>

              {getImage('02-homepage') && (
                <ProjectImage
                  src={getImage('02-homepage').src}
                  projectName={project.shortTitle}
                  label={getImage('02-homepage').label}
                  expectedFile={getImage('02-homepage').expectedFile}
                  description={getImage('02-homepage').slotPurpose}
                  aspectRatio="16/10"
                />
              )}

              {getImage('06-responsive') && (
                <ProjectImage
                  src={getImage('06-responsive').src}
                  projectName={project.shortTitle}
                  label={getImage('06-responsive').label}
                  expectedFile={getImage('06-responsive').expectedFile}
                  description={getImage('06-responsive').slotPurpose}
                  aspectRatio="16/9"
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Workflow Acceleration
            </span>
            <span className="text-xs font-medium text-slate-400">
              Analysis & Production
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {aiPositioning.headline}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            During this project, AI tooling was utilized to parse business specifications, uncover hidden edge cases, draft validation checklists, and accelerate documentation. All product logic, architectural tradeoffs, and final UX judgment were human-controlled.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Specification Parsing",
              "Edge-Case Identification",
              "State Checklist Generation",
              "Flow Stress Testing",
              "Handoff Documentation"
            ].map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-[11px] font-medium"
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
            <Link
              to={`/work/${prevProject.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREVIOUS PROJECT</span>
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-purple-600 transition-colors truncate">
                {prevProject.title}
              </h4>
              <span className="text-xs text-slate-500">{prevProject.role}</span>
            </Link>

            <Link
              to={`/work/${nextProject.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all text-right group"
            >
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-purple-600 transition-colors flex items-center justify-end gap-1">
                <span>NEXT PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-purple-600 transition-colors truncate">
                {nextProject.title}
              </h4>
              <span className="text-xs text-slate-500">{nextProject.role}</span>
            </Link>
          </div>
        </nav>
      </main>
    </article>
  );
}
