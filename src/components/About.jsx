import React from 'react';
import { ArrowRight, ArrowDown, Database, Layers, Target, Bot, Cpu, Box, Terminal, CheckCircle2, GitMerge } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import Bi from './Bi';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function About() {
  const { t: fullT, language } = useLanguage();
  const isVi = language === 'vi';
  const t = fullT?.about;

  const pipelineSteps = t?.pipeline?.steps || [
    'Business Requirement',
    'Product Logic',
    'UX Flow',
    'Interface',
  ];

  const businessItems = t?.business?.items || [
    { num: '01', name: 'Requirement', desc: 'Mục tiêu kinh doanh, bài toán người dùng & phạm vi hệ thống' },
    { num: '02', name: 'Business Rules', desc: 'Quy tắc vận hành, điều kiện ràng buộc & logic kích hoạt' },
    { num: '03', name: 'Roles & Permissions', desc: 'Phân quyền ma trận người dùng (RBAC) & ranh giới tác vụ' },
    { num: '04', name: 'Fields & Validation', desc: 'Cấu trúc dữ liệu, ràng buộc trường & luật kiểm tra lỗi' },
    { num: '05', name: 'System States', desc: 'Vòng đời dữ liệu, đồng bộ & chuyển đổi trạng thái nền' },
    { num: '06', name: 'Edge Cases', desc: 'Tình huống ngoại lệ, lỗi mạng & xử lý bất thường phát sinh' },
  ];

  const bridgeSteps = t?.bridge?.steps || [
    { step: '01', name: 'UNDERSTAND', desc: 'Thấu hiểu logic & ràng buộc' },
    { step: '02', name: 'STRUCTURE', desc: 'Cấu trúc hóa dữ liệu & luồng' },
    { step: '03', name: 'TRANSLATE', desc: 'Chuyển hóa giao diện & trải nghiệm' },
  ];

  const experienceItems = t?.experience?.items || [
    { num: '01', name: 'Information Architecture', desc: 'Cấu trúc phân tầng & sơ đồ điều hướng thông tin rõ ràng' },
    { num: '02', name: 'User Flow', desc: 'Luồng thao tác tinh gọn, triệt tiêu điểm nghẽn & ma sát' },
    { num: '03', name: 'Interaction Design', desc: 'Phản hồi vi mô, tương tác trực quan & chuyển cảnh mượt mà' },
    { num: '04', name: 'UI States & Feedback', desc: 'Thiết kế trọn vẹn Empty, Loading, Validation, Error & Success' },
    { num: '05', name: 'Responsive Interface', desc: 'Thích ứng hoàn hảo Desktop, Tablet & Mobile đa kích thước' },
    { num: '06', name: 'Design QA', desc: 'Kiểm thử độ chính xác giao diện & bàn giao thông số kỹ thuật dev' },
  ];

  const principles = t?.principles || [
    {
      num: '01',
      title: 'LOGIC BEFORE PIXELS',
      quote: '“Làm rõ requirement, rule và dependency trước khi quyết định giao diện.”',
    },
    {
      num: '02',
      title: 'DESIGN THE STATE, NOT ONLY THE HAPPY PATH',
      quote: '“Empty, loading, validation, permission và exception đều là một phần của trải nghiệm.”',
    },
    {
      num: '03',
      title: 'CLARIFY BEFORE ASSUMING',
      quote: '“Khi requirement chưa rõ, ưu tiên trao đổi với BA, PM, Developer và QA thay vì tự suy diễn.”',
    },
  ];

  const beyondTags = t?.beyond?.tags || [
    'AI-assisted Workflow',
    '3D Printing',
    'Hardware',
    'New Technology',
  ];

  const tagLabels = [
    <Bi key="t0" vi="Quy trình có AI hỗ trợ" en="AI-assisted Workflow" />,
    <Bi key="t1" vi="In 3D" en="3D Printing" />,
    <Bi key="t2" vi="Phần cứng" en="Hardware" />,
    <Bi key="t3" vi="Công nghệ mới" en="New Technology" />,
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-8">
        
        {/* ================================================================= */}
        {/* 1. SECTION HEADER (Asymmetrical Editorial Composition)             */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 sm:pb-12 border-b border-[#D9E2EC]/80">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full typo-eyebrow bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2]">
              <GitMerge className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
              <span><Bi vi="CÁCH TÔI TẠO GIÁ TRỊ" en="HOW I CREATE VALUE" /></span>
            </div>

            <h2 className="typo-h2 text-[#102A43]">
              <Bi vi="Nơi Business Logic Trở Thành" en="Where Business Logic Becomes" />{' '}
              <span className="text-[#FF7A00] block">
                <Bi vi="Product Experience" en="Product Experience" />
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="border-l-2 border-[#FF7A00] pl-4 sm:pl-5 py-1">
              <p className="typo-lead text-[#486581] max-w-[54ch]">
                <Bi vi="Tôi kết hợp tư duy phân tích nghiệp vụ (Business Analysis) và Thiết kế trải nghiệm (UI/UX Design) để xây dựng những sản phẩm số vừa đúng nghiệp vụ, vừa dễ sử dụng, vừa tạo ra giá trị thực tế cho người dùng và doanh nghiệp." en="I combine Business Analysis and UI/UX Design to craft digital systems that honor business logic while remaining intuitive, efficient, and genuinely valuable." />
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. CORE VISUAL: THE BA → UX SYSTEM FRAMEWORK                      */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-[#D9E2EC] p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-900/5 mt-8 sm:mt-10 relative overflow-hidden">
          {/* Subtle architectural blueprint grid texture */}
          <div
            className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Main 3-Column Diagram (Desktop) / Stacked Flow (Mobile) */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT SIDE: BUSINESS LOGIC                                     */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-[#E2E8F0] p-5 sm:p-6 shadow-sm">
              {/* Column Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#E2E8F0]">
                <div className="w-9 h-9 rounded-xl bg-[#0E2A47]/10 text-[#0E2A47] flex items-center justify-center flex-shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0E2A47] tracking-wider uppercase">
                    BUSINESS LOGIC
                  </h3>
                  <p className="text-xs text-[#627D98]">
                    <Bi vi="Yêu cầu & Ràng buộc nghiệp vụ" en="Requirements & Business Rules" />
                  </p>
                </div>
              </div>

              {/* 6 Structured Items */}
              <div className="space-y-2.5">
                {[
                  { name: <Bi vi="Thu thập & phân tích yêu cầu" en="Requirement Analysis" /> },
                  { name: <Bi vi="Quy tắc nghiệp vụ" en="Operational Rules" /> },
                  { name: <Bi vi="Phân quyền & vai trò" en="Roles & Permissions" /> },
                  { name: <Bi vi="Ràng buộc dữ liệu" en="Data Constraints" /> },
                  { name: <Bi vi="Trạng thái & luồng" en="States & Transitions" /> },
                  { name: <Bi vi="Các trường hợp đặc biệt" en="Exception Handling" /> },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-left hover:border-[#0E2A47]/40 hover:shadow-xs transition-all"
                  >
                    <div className="w-5 h-5 rounded bg-slate-100 text-[#0E2A47] flex items-center justify-center text-[13px] font-bold tabular-nums flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
                      <span className="text-[15px] leading-[22px] font-medium text-[#102A43]">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CENTER: THE BA → UX BRIDGE                                    */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-2 flex flex-col justify-center items-center py-4 lg:py-0">
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                {/* Visual Interlocking Circles (Image 1 style) */}
                <div className="flex items-center justify-center -space-x-3">
                  {/* BA Circle */}
                  <div className="w-[76px] h-[76px] sm:w-20 sm:h-20 rounded-full bg-[#081B2E] border-2 border-white shadow-xl flex flex-col items-center justify-center text-white z-10 p-1">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-0.5" />
                    <span className="text-[15px] font-bold leading-tight">BA</span>
                    <span className="text-[12px] text-slate-300 leading-none whitespace-nowrap"><Bi vi="Phân tích" en="Analysis" /></span>
                  </div>

                  {/* UX Circle */}
                  <div className="w-[76px] h-[76px] sm:w-20 sm:h-20 rounded-full bg-[#FF7A00] border-2 border-white shadow-xl flex flex-col items-center justify-center text-white z-20 p-1">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-0.5" />
                    <span className="text-[15px] font-bold leading-tight">UX</span>
                    <span className="text-[12px] text-white/90 leading-none whitespace-nowrap"><Bi vi="Thiết kế" en="Design" /></span>
                  </div>
                </div>

                {/* Center Banner Text */}
                <div className="text-center px-2">
                  <div className="text-[13px] sm:text-[14px] font-bold text-[#0E2A47] uppercase tracking-wider">
                    <Bi vi="KẾT NỐI TẠO NÊN SẢN PHẨM TỐT HƠN" en="BRIDGING BUSINESS & USER" />
                  </div>
                  <div className="text-[13px] text-[#627D98] mt-0.5">
                    <Bi vi="Biến logic phức tạp thành giải pháp hệ thống" en="Translating logic into systems" />
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT SIDE: PRODUCT EXPERIENCE                                */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-white border border-[#FFD4B2]/90 p-5 sm:p-6 shadow-sm">
              {/* Column Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#FFD4B2]/70">
                <div className="w-9 h-9 rounded-xl bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2] flex items-center justify-center flex-shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0E2A47] tracking-wider uppercase">
                    PRODUCT EXPERIENCE
                  </h3>
                  <p className="text-xs text-[#627D98]">
                    <Bi vi="Kiến trúc & Trải nghiệm giao diện" en="Architecture & User Interface" />
                  </p>
                </div>
              </div>

              {/* 6 Structured Items */}
              <div className="space-y-2.5">
                {[
                  { name: <Bi vi="Kiến trúc thông tin" en="Information Architecture" /> },
                  { name: <Bi vi="Luồng người dùng" en="User Flow" /> },
                  { name: <Bi vi="Thiết kế tương tác" en="Interaction Design" /> },
                  { name: <Bi vi="Trạng thái giao diện" en="UI States & Edge Views" /> },
                  { name: <Bi vi="Giao diện đáp ứng" en="Responsive Interface" /> },
                  { name: <Bi vi="Kiểm thử & tối ưu" en="Design QA & Specs" /> },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#FFD4B2]/60 text-left hover:border-[#FF7A00] hover:shadow-xs transition-all"
                  >
                    <div className="w-5 h-5 rounded bg-[#FFF2E6] text-[#FF7A00] flex items-center justify-center text-[13px] font-bold tabular-nums flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
                      <span className="text-[15px] leading-[22px] font-medium text-[#102A43]">
                        {item.name}
                      </span>
                      <span className="text-[13px] tabular-nums text-[#FF7A00] hidden sm:inline flex-shrink-0">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. DESIGN PRINCIPLES (Image 1 Style Strip)                        */}
        {/* ================================================================= */}
        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                num: '01',
                title: <Bi vi="Hiểu đúng nghiệp vụ" en="Logic Before Pixels" />,
                desc: <Bi vi="Đào sâu vấn đề, làm rõ yêu cầu và tìm ra giải pháp phù hợp." en="Deep-dive into problems, clarify requirements, and uncover proper solutions." />,
                icon: Cpu,
              },
              {
                num: '02',
                title: <Bi vi="Thiết kế lấy người dùng làm trung tâm" en="Design the State, Not Only Happy Path" />,
                desc: <Bi vi="Biến logic phức tạp thành trải nghiệm đơn giản, dễ sử dụng." en="Transform complex operational logic into simple, intuitive user flows." />,
                icon: CheckCircle2,
              },
              {
                num: '03',
                title: <Bi vi="Tạo ra giá trị thực tế" en="Clarify Before Assuming" />,
                desc: <Bi vi="Sản phẩm không chỉ đẹp mà còn hiệu quả, đo lường được và có thể mở rộng." en="Deliver interfaces that are not only aesthetic, but scalable and measurable." />,
                icon: Target,
              },
            ].map((pr, idx) => {
              const Icon = pr.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#D9E2EC] p-5 sm:p-6 hover:border-[#FF7A00]/50 hover:shadow-md transition-all duration-300 relative group flex items-start gap-4 text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FFF2E6] text-[#FF7A00] border border-[#FFD4B2] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF7A00] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#0E2A47] group-hover:text-[#FF7A00] transition-colors">
                      {pr.title}
                    </h3>
                    <p className="typo-small text-[#627D98] mt-1 leading-relaxed">
                      {pr.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
