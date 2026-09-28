import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      process: 'Process',
      portfolio: 'Portfolio',
      services: 'Services',
      contact: 'Contact',
      hireMe: 'Get In Touch',
      langToggle: 'VI',
    },
    hero: {
      badge: 'Available for Product & UI/UX Roles',
      greeting: "Hello, I'm",
      name: 'Nguyen Xuan Hau',
      title: 'Product / UIUX Designer with a Business Analysis Background',
      subtitle: 'I turn complex business requirements, workflows and system logic into clear, usable digital products across Web, Mobile and Admin platforms.',
      sayHello: 'Say Hello',
      viewPortfolio: 'View Portfolio',
      specialty: 'Specialty',
      specialtyTitle: 'BA & Product Design',
      stats: [
        { value: 'BA → UX', label: 'Requirements to UI' },
        { value: '7 Projects', label: 'End-to-End Systems' },
        { value: 'Web · Mobile', label: 'Multi-Platform' },
      ],
    },
    about: {
      badge: 'About Me',
      role: 'Product Designer focused on complex systems',
      bio: 'I started in Business Analysis before moving deeper into UIUX and Product Design. That foundation helps me clarify requirements, business rules, roles, states and edge cases before translating them into product flows and interfaces.',
      myProjects: 'My Projects',
      downloadCv: 'Download CV',
      cvNote: 'PDF available on request',
    },
    process: {
      badge: 'Process',
      title: 'Work Process',
      subtitle: 'Every project follows an agile and human-centered design framework. I combine rigorous business analysis with rapid prototyping and system UX design.',
      learnMore: 'Learn more about our methodology →',
      steps: [
        {
          step: '01',
          title: '1. Understand Requirements',
          description: 'Deep dive into stakeholder goals, product discovery, and user needs to lay a solid foundation.',
        },
        {
          step: '02',
          title: '2. Analyze Business Logic',
          description: 'Synthesize requirements, business rules, entity models, and domain constraints.',
        },
        {
          step: '03',
          title: '3. Roles, Rules & States',
          description: 'Define RBAC permissions, validation rules, error handling, and comprehensive system states.',
        },
        {
          step: '04',
          title: '4. Flow & IA',
          description: 'Build user journeys, information architecture, navigation hierarchy, and cross-system workflows.',
        },
        {
          step: '05',
          title: '5. UI & Interaction',
          description: 'Craft high-fidelity interfaces, atomic design systems, and responsive layouts with pixel precision.',
        },
        {
          step: '06',
          title: '6. Prototype & Validate',
          description: 'Build interactive prototypes to stress-test real workflows, edge cases, and transaction paths.',
        },
        {
          step: '07',
          title: '7. Design QA',
          description: 'Audit layouts across breakpoints (1440px to 390px), ensuring design parity and accessibility.',
        },
        {
          step: '08',
          title: '8. Developer Handoff',
          description: 'Deliver structured Figma tokens, components, state specs, and support engineers during build.',
        },
      ],
    },
    portfolio: {
      badge: 'Portfolio',
      title: 'Featured Projects',
      subtitle: 'Explore 7 digital products spanning Vertical SaaS, travel booking, internal inventory operations, and omnichannel ticketing.',
      all: 'All',
      viewCaseStudy: 'View Case Study',
      seeCaseStudy: 'See Case Study',
      moreWork: 'View All Projects',
      client: 'Domain',
      year: 'Year',
      role: 'Role',
      deliverables: 'Key Deliverables & System Logic',
      discussProject: 'Discuss Similar Project',
      close: 'Close',
    },
    cta: {
      badge: 'Product Design & System Strategy',
      title: 'Complex products need clear thinking.',
      subtitle: "I combine Business Analysis and Product Design to translate complex workflows, rules and system constraints into usable product experiences.",
      button: "See My Process",
    },
    blog: {
      badge: 'Secondary Cases',
      title: 'Other Product Work',
      subtitle: 'Supporting cases spanning hybrid Business Analysis, multi-touchpoint service operations, and responsive web design.',
      readArticle: 'View Details',
    },
    services: {
      badge: 'Value & Skills',
      title: 'What I Bring to a Product Team',
      subtitle: 'From complex business rules and state modeling to high-fidelity design systems and production handoff.',
      sayHello: 'Say Hello',
    },
    clients: {
      badge: 'Career Evolution',
      title: 'Career Journey',
      subtitle: 'Technical data foundation → Business Analysis → System Analysis → Product & UIUX Design.',
      currentRole: 'Current Role',
    },
    testimonial: {
      badge: 'Core Philosophy',
      title: 'My Design Perspective',
      subtitle: 'How a Business Analysis background shapes every interface decision.',
      quote: 'Understand how the product works before deciding how it should look.',
      supporting: 'My Business Analysis background helps me approach design through requirements, business logic, system states and implementation constraints—not only visual execution.',
    },
    contact: {
      badge: 'Get in Touch',
      title: "Let's build clearer digital products.",
      subtitle: "I'm open to Junior UIUX Designer, Product Designer and product-oriented UIUX opportunities.",
      addressTitle: 'Location',
      addressValue: 'Ho Chi Minh City, Vietnam',
      emailTitle: 'Email',
      phoneTitle: 'Resume',
      phoneValue: 'Available upon request (PDF)',
      followMe: 'Connect with me',
      yourName: 'Your Name *',
      yourEmail: 'Your Email *',
      subject: 'Discussion Topic',
      budget: 'Opportunity Type',
      message: 'Your Message *',
      send: 'Send Message',
      sending: 'Sending message...',
      successTitle: 'Message Sent Successfully!',
      successDesc: "Thank you for reaching out. I'll review your inquiry and respond within 24 hours.",
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  vi: {
    nav: {
      home: 'Trang chủ',
      about: 'Giới thiệu',
      process: 'Quy trình',
      portfolio: 'Dự án',
      services: 'Kỹ năng',
      contact: 'Liên hệ',
      hireMe: 'Liên hệ ngay',
      langToggle: 'EN',
    },
    hero: {
      badge: 'Sẵn sàng cho các vị trí Product & UI/UX Designer',
      greeting: 'Xin chào, tôi là',
      name: 'Nguyễn Xuân Hậu',
      title: 'Product / UIUX Designer với nền tảng Business Analysis',
      subtitle: 'Tôi chuyển hóa các yêu cầu nghiệp vụ, luồng quy trình và logic hệ thống phức tạp thành các sản phẩm số rõ ràng, trực quan và dễ sử dụng trên Web, Mobile và Admin.',
      sayHello: 'Liên hệ ngay',
      viewPortfolio: 'Xem dự án',
      specialty: 'Chuyên môn',
      specialtyTitle: 'Thiết kế BA & UX',
      stats: [
        { value: 'BA → UX', label: 'Nghiệp vụ đến UI' },
        { value: '7 Dự án', label: 'Sản phẩm thực tế' },
        { value: 'Web · Mobile', label: 'Đa nền tảng' },
      ],
    },
    about: {
      badge: 'Giới thiệu',
      role: 'Product Designer tập trung vào các hệ thống phức tạp',
      bio: 'Tôi khởi đầu từ Business Analysis trước khi chuyển sâu vào UIUX và Product Design. Nền tảng phân tích giúp tôi làm rõ yêu cầu, quy tắc nghiệp vụ, phân quyền vai trò, trạng thái hệ thống và các trường hợp ngoại lệ trước khi chuyển đổi thành luồng sản phẩm và giao diện.',
      myProjects: 'Xem dự án',
      downloadCv: 'Tải CV (PDF)',
      cvNote: 'Sẵn sàng gửi PDF khi có yêu cầu',
    },
    process: {
      badge: 'Quy trình',
      title: 'Quy Trình Làm Việc',
      subtitle: 'Mỗi dự án đều tuân theo khung thiết kế lấy con người làm trung tâm, kết hợp chặt chẽ giữa phân tích nghiệp vụ, kiến trúc thông tin và thiết kế giao diện.',
      learnMore: 'Tìm hiểu thêm về phương pháp luận →',
      steps: [
        {
          step: '01',
          title: '1. Thấu hiểu yêu cầu',
          description: 'Nghiên cứu mục tiêu kinh doanh, phân tích bối cảnh bài toán và nhu cầu người dùng làm nền móng vững chắc.',
        },
        {
          step: '02',
          title: '2. Phân tích logic nghiệp vụ',
          description: 'Bóc tách quy tắc nghiệp vụ, mô hình thực thể dữ liệu và các ràng buộc hệ thống trước khi vẽ màn hình.',
        },
        {
          step: '03',
          title: '3. Vai trò, quy tắc & trạng thái',
          description: 'Xác định phân quyền vai trò (RBAC), kiểm tra tính hợp lệ dữ liệu, xử lý ngoại lệ và trạng thái tương tác.',
        },
        {
          step: '04',
          title: '4. Xây dựng luồng & IA',
          description: 'Kiến trúc hóa hành trình người dùng, phân cấp điều hướng và luồng xử lý liên hệ thống xuyên suốt.',
        },
        {
          step: '05',
          title: '5. Thiết kế UI & tương tác',
          description: 'Thiết kế giao diện độ nét cao, hệ thống Design System nguyên tử và layout responsive chuẩn xác.',
        },
        {
          step: '06',
          title: '6. Prototype & kiểm thử',
          description: 'Tạo bản mẫu tương tác thực tế để kiểm tra giao dịch, các trường hợp biên và mật độ dữ liệu.',
        },
        {
          step: '07',
          title: '7. Kiểm thử thiết kế (QA)',
          description: 'Đánh giá độ tương thích trên các độ phân giải (1440px đến 390px), đảm bảo chuẩn UX nhất quán.',
        },
        {
          step: '08',
          title: '8. Bàn giao lập trình (Handoff)',
          description: 'Cung cấp Figma tokens, components chuẩn xác, tài liệu chi tiết và đồng hành cùng team Developer.',
        },
      ],
    },
    portfolio: {
      badge: 'Dự án',
      title: 'Dự Án Tiêu Biểu',
      subtitle: 'Khám phá 7 sản phẩm số thực tế trải dài từ Vertical SaaS, cổng đặt vé du lịch, kho vận nội bộ đến hệ sinh thái đa kênh.',
      all: 'Tất cả',
      viewCaseStudy: 'Xem chi tiết',
      seeCaseStudy: 'Xem chi tiết',
      moreWork: 'Xem tất cả 7 dự án',
      client: 'Lĩnh vực',
      year: 'Năm',
      role: 'Vai trò',
      deliverables: 'Hạng mục bàn giao & Logic hệ thống',
      discussProject: 'Thảo luận về dự án này',
      close: 'Đóng',
    },
    cta: {
      badge: 'Thiết Kế Sản Phẩm & Tư Duy Hệ Thống',
      title: 'Sản phẩm phức tạp cần tư duy rõ ràng.',
      subtitle: 'Tôi kết hợp tư duy Business Analysis và Product Design để chuyển hóa các luồng nghiệp vụ, quy tắc và ràng buộc hệ thống thành trải nghiệm người dùng tối ưu.',
      button: 'Xem quy trình làm việc',
    },
    blog: {
      badge: 'Dự án hỗ trợ',
      title: 'Các Dự Án Sản Phẩm Khác',
      subtitle: 'Các case study kết hợp phân tích nghiệp vụ, tối ưu hóa điểm chạm vận hành và website doanh nghiệp.',
      readArticle: 'Xem chi tiết',
    },
    services: {
      badge: 'Giá trị & Kỹ năng',
      title: 'Tôi Mang Gì Đến Cho Product Team?',
      subtitle: 'Từ quy tắc nghiệp vụ và mô hình hóa trạng thái đến hệ thống Design System và bàn giao lập trình.',
      sayHello: 'Liên hệ trao đổi',
    },
    clients: {
      badge: 'Hành trình sự nghiệp',
      title: 'Lộ Trình Nghề Nghiệp',
      subtitle: 'Nền tảng kỹ thuật dữ liệu → Business Analysis → Phân tích hệ thống → Thiết kế Sản phẩm & UI/UX.',
      currentRole: 'Vị trí hiện tại',
    },
    testimonial: {
      badge: 'Triết lý cốt lõi',
      title: 'Góc Nhìn Thiết Kế Của Tôi',
      subtitle: 'Nền tảng Business Analysis định hình từng quyết định giao diện như thế nào.',
      quote: 'Hiểu rõ cách sản phẩm vận hành trước khi quyết định giao diện trông như thế nào.',
      supporting: 'Nền tảng phân tích nghiệp vụ giúp tôi tiếp cận thiết kế từ yêu cầu, logic kinh doanh, trạng thái hệ thống và ràng buộc kỹ thuật—không chỉ đơn thuần là thẩm mỹ trực quan.',
    },
    contact: {
      badge: 'Liên hệ',
      title: 'Cùng xây dựng các sản phẩm số trực quan hơn.',
      subtitle: 'Tôi sẵn sàng đón nhận cơ hội ở các vị trí Junior UIUX Designer, Product Designer và các dự án thiết kế định hướng sản phẩm.',
      addressTitle: 'Địa điểm',
      addressValue: 'Thành phố Hồ Chí Minh, Việt Nam',
      emailTitle: 'Email',
      phoneTitle: 'Hồ sơ năng lực',
      phoneValue: 'Sẵn sàng cung cấp bản PDF',
      followMe: 'Kết nối cùng tôi',
      yourName: 'Họ và tên của bạn *',
      yourEmail: 'Địa chỉ Email *',
      subject: 'Chủ đề trao đổi',
      budget: 'Loại hình cơ hội',
      message: 'Nội dung lời nhắn *',
      send: 'Gửi tin nhắn',
      sending: 'Đang gửi tin nhắn...',
      successTitle: 'Đã gửi tin nhắn thành công!',
      successDesc: 'Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn trong vòng 24 giờ.',
    },
    footer: {
      rights: 'Bảo lưu mọi quyền.',
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolio_lang') || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
