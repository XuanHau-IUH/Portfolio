import React from 'react';
import { Database, TrendingUp, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const stageIcons = [
  Database,
  TrendingUp,
  Cpu,
  Sparkles
];

export default function HappyClients() {
  const { language, t } = useLanguage();
  const isVi = language === 'vi';

  const careerSteps = isVi ? [
    {
      company: "HPT Vietnam Corporation",
      role: "Thực tập sinh Quản trị CSDL & Kỹ sư Dữ liệu",
      period: "06/2023 – 09/2023",
      yearBadge: "2023",
      stage: "Nền tảng Kỹ thuật Dữ liệu",
      description: "Xây dựng tư duy cấu trúc dữ liệu, câu lệnh truy vấn và các ràng buộc kỹ thuật của backend."
    },
    {
      company: "IS Group",
      role: "Business Analyst",
      period: "07/2024 – 02/2025",
      yearBadge: "2024–2025",
      stage: "Nền tảng Phân tích Nghiệp vụ",
      description: "Phân tích yêu cầu khách hàng, xác định các trường hợp nghiệp vụ và lập tài liệu đặc tả chức năng."
    },
    {
      company: "DOTB",
      role: "Business Analyst — EdTech",
      period: "10/2025 – 01/2026",
      yearBadge: "2025–2026",
      stage: "Phân tích Hệ thống & Nghiệp vụ",
      description: "Phân tích hệ thống sản phẩm giáo dục: quy tắc kinh doanh, phân quyền tài khoản, validation và luồng thao tác."
    },
    {
      company: "Techera",
      role: "UIUX Designer / Product Designer",
      period: "02/2026 – Hiện tại",
      yearBadge: "2026 – Hiện tại",
      stage: "Thiết kế Sản phẩm & UI/UX",
      description: "Phụ trách thiết kế trải nghiệm sản phẩm: Kiến trúc thông tin, SaaS đa phân quyền, Responsive Web và Mobile App."
    }
  ] : [
    {
      company: "HPT Vietnam Corporation",
      role: "Database Administrator / Data Engineer Intern",
      period: "06/2023 – 09/2023",
      yearBadge: "2023",
      stage: "Technical Foundation",
      description: "Built database and data engineering fundamentals, understanding relational data structures, queries, and backend constraints."
    },
    {
      company: "IS Group",
      role: "Business Analyst",
      period: "07/2024 – 02/2025",
      yearBadge: "2024–2025",
      stage: "Business Analysis Foundation",
      description: "Analyzed business requirements, customer journeys, user roles, and translated stakeholder needs into detailed specifications."
    },
    {
      company: "DOTB",
      role: "Business Analyst — EdTech",
      period: "10/2025 – 01/2026",
      yearBadge: "2025–2026",
      stage: "Business / System Analysis",
      description: "Deepened system analysis in EdTech domain: business rules, system permissions, validation logic, and workflows."
    },
    {
      company: "Techera",
      role: "UIUX Designer / Product Designer",
      period: "02/2026 – Present",
      yearBadge: "2026 – Present",
      stage: "Product / UIUX Design",
      description: "Leading end-to-end interface and system design: Information Architecture, multi-role SaaS, responsive web, native mobile, and Design QA."
    }
  ];

  return (
    <section id="journey" className="py-20 md:py-28 border-b border-slate-100 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
            {t.clients.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.clients.title}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {t.clients.subtitle}
          </p>
        </div>

        {/* 4-Stage Progressive Timeline Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {careerSteps.map((step, idx) => {
            const Icon = stageIcons[idx] || Sparkles;
            const isCurrent = idx === careerSteps.length - 1;

            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-b from-purple-50/70 to-white border-purple-300 shadow-xl shadow-purple-500/10 ring-1 ring-purple-200'
                    : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Year Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform ${
                        isCurrent
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                          : 'bg-purple-50 text-purple-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                        isCurrent
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.yearBadge}
                    </span>
                  </div>

                  {/* Company & Stage */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
                      {step.stage}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {step.company}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 pt-0.5">
                      {step.role}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400">
                      {step.period}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {isCurrent && (
                  <div className="mt-5 pt-4 border-t border-purple-100 flex items-center gap-1.5 text-xs font-bold text-purple-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>{t.clients.currentRole}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
