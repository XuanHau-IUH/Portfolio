import React, { useState } from 'react';
import { ChevronDown, Check, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);
  const { language, t } = useLanguage();
  const isVi = language === 'vi';

  const capabilities = isVi ? [
    {
      id: "product-ux",
      title: "Thiết Kế Sản Phẩm & Trải Nghiệm Người Dùng (UX)",
      description: "Xây dựng kiến trúc thông tin, quy hoạch luồng người dùng và thiết kế tương tác tối ưu cho các nền tảng Web, Mobile và SaaS phức tạp.",
      skills: [
        "Kiến trúc thông tin (Information Architecture)",
        "Thiết kế luồng người dùng (User Journey Mapping)",
        "Thiết kế tương tác (Interaction Design)",
        "Thiết kế tương thích (Responsive Web & Mobile)",
        "Mô hình hóa trạng thái hệ thống (System States)",
        "Kiểm thử chất lượng thiết kế (Design QA)"
      ]
    },
    {
      id: "business-analysis",
      title: "Phân Tích Nghiệp Vụ & Logic Hệ Thống (BA)",
      description: "Tận dụng nền tảng Business Analysis để làm rõ yêu cầu, mô hình dữ liệu, phân quyền và các trường hợp biên trước khi thiết kế UI.",
      skills: [
        "Bóc tách & làm rõ yêu cầu nghiệp vụ",
        "Quy tắc kinh doanh & ràng buộc hệ thống",
        "Phân rã tính năng (Feature Breakdown)",
        "Phân quyền vai trò người dùng (RBAC)",
        "Kiểm tra tính hợp lệ dữ liệu (Validation Logic)",
        "Xử lý các tình huống ngoại lệ (Edge Cases)"
      ]
    },
    {
      id: "design-execution",
      title: "Thực Thi Thiết Kế & Quy Trình Ứng Dụng AI",
      description: "Xây dựng hệ thống Design System nguyên tử, tạo prototype mô phỏng thực tế và tối ưu hóa tốc độ sản xuất nhờ AI.",
      skills: [
        "Figma Design System & Token Variables",
        "Bộ thư viện linh kiện tái sử dụng (Atomic Components)",
        "Bản mẫu tương tác độ nét cao (Interactive Prototype)",
        "Tài liệu bàn giao lập trình (Developer Handoff)",
        "Tăng tốc tổng hợp yêu cầu bằng AI",
        "Khám phá trường hợp biên và biến thể với AI"
      ]
    }
  ] : [
    {
      id: "product-ux",
      title: "Product & User Experience (UX) Design",
      description: "Crafting end-to-end product architecture, information hierarchy, and intuitive interaction models for complex Web, Mobile and SaaS platforms.",
      skills: [
        "Information Architecture",
        "User Flow & Journey Mapping",
        "Interaction Design",
        "Responsive Design (Desktop/Tablet/Mobile)",
        "System UX & Status Modeling",
        "Design QA & Visual Auditing"
      ]
    },
    {
      id: "business-analysis",
      title: "Business Analysis & System Logic",
      description: "Leveraging a solid BA foundation to clarify business logic, data models, permissions, and edge cases before drawing any screen.",
      skills: [
        "Requirement Analysis & Clarification",
        "Business Rules & Constraints",
        "Feature Breakdown & Scoping",
        "Roles & RBAC Permissions",
        "Form Validation & Error Modeling",
        "System States & Edge Cases"
      ]
    },
    {
      id: "design-execution",
      title: "Design Systems & AI-Assisted Workflows",
      description: "Building scalable design systems, production-ready interactive prototypes, and accelerating discovery with AI tools.",
      skills: [
        "Figma Design Systems & Variables",
        "Atomic Reusable Components",
        "Interactive High-Fidelity Prototypes",
        "Developer Handoff Documentation",
        "AI-assisted Requirement Analysis",
        "AI Edge-Case & Prompt Exploration"
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="services" className="py-20 md:py-28 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 text-left space-y-6 lg:sticky lg:top-28">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full">
              {t.services.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t.services.title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {t.services.subtitle}
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
              >
                <span>{t.services.sayHello}</span>
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {capabilities.map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                    isOpen
                      ? 'border-purple-300 shadow-lg shadow-purple-500/5 ring-1 ring-purple-200'
                      : 'border-slate-200 hover:border-purple-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
                        0{index + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        {service.title}
                      </h3>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-slate-100 space-y-4 animate-fadeIn">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {service.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                            <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
