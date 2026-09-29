export const personalInfo = {
  name: "Nguyen Xuan Hau",
  role: "UIUX Designer / Business Analyst",
  specialty: "BA → Product & System Design",
  primaryPositioning: "Product / UIUX Designer with a Business Analysis Background",
  subtitle: "I turn complex business requirements, workflows and system logic into clear, usable digital products across Web, Mobile and Admin platforms.",
  avatar: "/assets/avatar.webp",
  heroImage: "/assets/hero.webp",
  aboutImage: "/assets/about.webp",

  // Real career highlights replacing fake metrics
  highlights: [
    { value: "BA → UX", label: "Requirements to Interfaces" },
    { value: "7 Projects", label: "Real Product & System Cases" },
    { value: "Web · Mobile · Admin", label: "Multi-Platform Scope" },
  ],

  bio: "Business Analyst and UIUX Designer focused on complex systems. I started in Business Analysis before moving deeper into UIUX. That foundation helps me clarify requirements, business rules, roles, states and edge cases before translating them into product flows and interfaces.",

  designPhilosophy: "Understand how the product works before deciding how it should look.",
  designPhilosophySupporting: "My Business Analysis background helps me approach design through requirements, business logic, system states and implementation constraints—not only visual execution.",

  email: "xuanhauk16@gmail.com",
  phone: "0914 569 871",
  location: "Ho Chi Minh City, Vietnam",
  availability: "Open to Junior UIUX / Product Designer Opportunities",

  socials: {
    linkedin: "#placeholder", // [NEED CONFIRMATION: LinkedIn profile URL]
    github: "https://github.com",
    behance: "#placeholder",
    email: "mailto:xuanhauk16@gmail.com"
  }
};

export const careerJourney = [
  {
    company: "HPT Vietnam Corporation",
    role: "Database Administrator / Data Engineer Intern",
    period: "06/2023 – 09/2023",
    yearBadge: "2023",
    stage: "Technical Foundation",
    description: "Built database and data engineering fundamentals, understanding data structures, queries, and backend constraints."
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

export const workProcess = [
  {
    step: "01",
    title: "1. Understand Requirements",
    description: "Deep-dive into business goals, stakeholder requirements, and product discovery to grasp the problem space completely.",
    icon: "Search"
  },
  {
    step: "02",
    title: "2. Analyze Business Logic",
    description: "Dissect domain specifications, business rules, entities, dependencies, and constraints before drawing any screen.",
    icon: "Brain"
  },
  {
    step: "03",
    title: "3. Define Roles, Rules & States",
    description: "Map RBAC permissions, role-based access, system states (empty, loading, processing, error, expired), and validation logic.",
    icon: "ShieldCheck"
  },
  {
    step: "04",
    title: "4. Build Flow & IA",
    description: "Architect end-to-end user journeys, cross-system workflows, navigation hierarchy, and module relationships.",
    icon: "GitFork"
  },
  {
    step: "05",
    title: "5. Design UI & Interaction",
    description: "Design clean, high-fidelity interfaces with strict visual hierarchy, reusable components, and responsive typography.",
    icon: "Palette"
  },
  {
    step: "06",
    title: "6. Prototype & Validate",
    description: "Create interactive prototypes to test real transaction paths, edge cases, data density, and interaction states.",
    icon: "PlayCircle"
  },
  // {
  //   step: "07",
  //   title: "7. Design QA",
  //   description: "Audit layouts across resolutions (1440px to 390px), verify validation states, edge cases, and layout parity vs native patterns.",
  //   icon: "CheckSquare"
  // },
  // {
  //   step: "08",
  //   title: "8. Developer Handoff",
  //   description: "Deliver structured Figma components, tokens, state specifications, and support technical teams during implementation.",
  //   icon: "Code2"
  // }
];

export const capabilities = [
  {
    id: "product-ux",
    title: "Product & UX Design",
    description: "Crafting end-to-end product architecture and interaction models for complex B2C, B2B and SaaS platforms.",
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
    title: "Business Analysis",
    description: "Leveraging a solid BA background to clarify business logic, rules, validation, and permissions before designing.",
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
    title: "Design Execution & AI Workflows",
    description: "Building scalable design systems, production-ready prototypes, and accelerating discovery with AI tools.",
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

export const aiPositioning = {
  headline: "AI accelerates production, not judgment.",
  description: "Product logic, UX decisions, trade-offs, and final design judgment remain human-controlled. I integrate AI as a powerful production accelerator throughout my design and analysis workflow.",
  useCases: [
    "Requirement review & synthesis",
    "Product specification analysis",
    "Ambiguity & edge-case discovery",
    "Information architecture exploration",
    "Fast flow & scenario modeling",
    "UI exploration & variant evaluation",
    "Design QA checklist generation",
    "Handoff documentation structuring"
  ]
};

export const projects = [
  // ==========================================
  // PROJECT 01: HA LONG LUXE (Primary / Featured)
  // ==========================================
  {
    slug: "ha-long-luxe",
    index: "01",
    title: "HA LONG LUXE — Cruise Booking & Operations Platform",
    shortTitle: "HA LONG LUXE",
    subtitle: "Cruise Booking & Operations Platform",
    role: "Product Designer / UIUX Designer",
    productType: "Vertical SaaS",
    primaryCategory: "VERTICAL SAAS",
    category: "Vertical SaaS",
    platforms: ["B2C Web", "B2B", "Admin", "Mobile"],
    domain: "Tourism · Hospitality · Cruise",
    year: "2026",
    featured: true,
    tags: [
      "Vertical SaaS",
      "Booking UX",
      "Complex Workflow",
      "Information Architecture",
      "Responsive Design",
      "Admin / Operational UX",
      "Role & Permission",
      "Design QA"
    ],
    cover: "/projects/ha-long-luxe/01-cover-ha-long-luxe.webp",
    coverLabel: "Tổng quan Ha Long Luxe",

    summary: "Thiết kế hệ sinh thái đặt và vận hành du thuyền, kết nối trải nghiệm booking B2C với nghiệp vụ đại lý B2B và hệ thống quản trị nội bộ — từ tìm kiếm chuyến, chọn cabin và nhập thông tin hành khách đến quản lý booking, tồn kho, đội tàu và lịch khởi hành.",

    complexity: "Kết nối luồng đặt chỗ B2C với nghiệp vụ đại lý B2B và hệ thống quản trị vận hành nội bộ (lịch khởi hành, cabin, tồn kho, tài chính và phân quyền).",

    challenge: {
      sectionLabel: "BÀI TOÁN",
      title: "Kết nối trải nghiệm booking với hệ thống vận hành phía sau",
      content: "Ha Long Luxe không chỉ là một website đặt du thuyền. Hệ thống phải kết nối trải nghiệm của khách hàng với nhiều quy trình vận hành phía sau như lịch khởi hành, cabin, tồn kho, booking, agency, tài chính và phân quyền.\n\nThách thức thiết kế nằm ở việc giữ cho trải nghiệm booking đơn giản với người dùng, trong khi vẫn mô hình hóa đủ business logic và trạng thái cần thiết cho đội ngũ vận hành."
    },

    ecosystem: {
      title: "Một sản phẩm, nhiều góc nhìn vận hành",
      groups: [
        {
          name: "B2C BOOKING",
          flow: "Search · Cruise Detail · Cabin · Passenger · Payment"
        },
        {
          name: "B2B AGENCY",
          flow: "Reservation · Credit · Inventory · Reconciliation"
        },
        {
          name: "ADMIN OPERATIONS",
          flow: "Booking · Schedule · Fleet · Inventory · Finance · RBAC"
        }
      ]
    },

    bookingJourney: {
      title: "Từ khám phá du thuyền đến hoàn tất đặt chỗ",
      flow: "Search → Results → Cruise Detail → Deck & Cabin → Passenger Information → Payment → Confirmation",
      steps: ["Search", "Results", "Cruise Detail", "Deck & Cabin", "Passenger Information", "Payment", "Confirmation"],
      images: [
        "/projects/ha-long-luxe/02-booking-home.webp",
        "/projects/ha-long-luxe/03-search-results.webp",
        "/projects/ha-long-luxe/04-cruise-detail.webp"
      ]
    },

    deckCabinSelection: {
      title: "Biến sơ đồ tàu thành một trải nghiệm chọn cabin dễ hiểu",
      image: "/projects/ha-long-luxe/05-deck-cabin-selection.webp",
      content: "Việc chọn cabin không chỉ là chọn một room type. Người dùng cần hiểu mối quan hệ giữa tàu, deck, vị trí cabin, hạng phòng, trạng thái khả dụng và giá trước khi tiếp tục booking.\n\nGiao diện tổ chức thông tin theo ba lớp: Deck → vị trí cabin → chi tiết cabin, đồng thời giữ booking summary luôn hiện diện để người dùng kiểm tra lựa chọn và tổng chi phí.",
      designDecisions: [
        {
          title: "Context before detail",
          description: "Cho người dùng thấy cabin nằm ở đâu trên tàu trước khi đọc thông tin chi tiết."
        },
        {
          title: "Availability as state",
          description: "Phân biệt trạng thái cabin khả dụng, đang chọn, không khả dụng và cabin được đề xuất."
        },
        {
          title: "Persistent booking summary",
          description: "Giữ thông tin booking và chi phí hiển thị xuyên suốt thay vì bắt người dùng nhớ lựa chọn ở bước trước."
        }
      ]
    },

    bookingInformation: {
      title: "Gom dữ liệu phức tạp thành một checkout có cấu trúc",
      image: "/projects/ha-long-luxe/06-booking-information.webp",
      content: "Sau khi cabin được chọn, flow tiếp tục với thông tin người đặt, danh sách hành khách, yêu cầu đặc biệt, phương thức thanh toán và xác nhận điều khoản.\n\nLayout chia form thành từng nhóm nghiệp vụ và đặt booking summary bên cạnh để người dùng có thể kiểm tra giá, ưu đãi và thông tin chuyến trong suốt quá trình nhập dữ liệu."
    },

    adminOperations: {
      title: "Customer experience chỉ là một nửa của sản phẩm",
      image: "/projects/ha-long-luxe/07-admin-booking-management.webp",
      content: "Phía sau booking experience là hệ thống vận hành cho phép đội ngũ quản lý booking theo nhiều trạng thái, kênh bán, tour/chuyến, hành khách và nghiệp vụ xử lý.",
      highlights: ["Booking Status", "Payment Status", "Allocation Status"],
      content2: "Thay vì gom nhiều nghiệp vụ vào một trạng thái duy nhất, các trạng thái được tách theo từng domain để người vận hành biết chính xác booking đang ở đâu, tiền đã xử lý đến mức nào và inventory đã được phân bổ hay chưa."
    },

    fleetInventory: {
      title: "Kết nối cấu trúc vật lý của tàu với inventory vận hành",
      primaryImage: "/projects/ha-long-luxe/08-admin-fleet-deck.webp",
      secondaryImage: "/projects/ha-long-luxe/09-inventory-slot.webp",
      content: "Admin cần quản lý không chỉ loại phòng mà cả cấu trúc vật lý của tàu:\n\nTàu → Boong → Khu vực → Cabin → Loại cabin → Inventory theo chuyến\n\nSơ đồ boong được thiết kế như một lớp quản trị trực quan, giúp đội ngũ vận hành hiểu vị trí cabin trong cấu trúc thực tế thay vì chỉ thao tác trên danh sách dữ liệu."
    },

    b2bBooking: {
      title: "B2B booking trong cùng hệ sinh thái vận hành",
      image: "/projects/ha-long-luxe/10-b2b-booking.webp",
      content: "Luồng B2B bổ sung context của đại lý, nghiệp vụ giữ chỗ và các điều kiện vận hành riêng nhưng vẫn sử dụng cùng nền tảng booking và inventory logic."
    },

    responsiveDesign: {
      title: "Một capability, nhiều interaction pattern",
      images: [
        "/projects/ha-long-luxe/11-mobile-booking-home.webp",
        "/projects/ha-long-luxe/12-mobile-cabin-selection.webp"
      ],
      combinedVisual: "/projects/ha-long-luxe/13-responsive-overview.webp",
      content: "Responsive design không đơn thuần thu nhỏ desktop. Các capability quan trọng được giữ lại nhưng hierarchy, navigation, form layout và booking summary được tổ chức lại cho từng viewport."
    },

    designQaHandoff: {
      title: "Từ prototype đến handoff",
      content: "Prototype và design specifications được sử dụng để làm rõ interaction trước khi development.",
      qaFocus: [
        "Responsive behavior",
        "Validation",
        "Disabled / Success / Error states",
        "Component consistency",
        "Cross-module consistency",
        "Developer handoff"
      ]
    },

    modules: [
      "Booking Management",
      "Tour & Itinerary",
      "Pricing & Policies",
      "Sailing Schedule",
      "Cabin Inventory",
      "Fleet & Deck Management",
      "Passenger & Check-in",
      "B2B Agency",
      "Finance & Reconciliation",
      "Promotions",
      "Service Catalog",
      "Refund & Reschedule",
      "Role & Permission",
      "Reporting"
    ],

    keyWork: [
      "Phân tích requirement và nghiệp vụ booking/vận hành du thuyền để chuyển hóa thành các luồng sản phẩm và giao diện phù hợp cho B2C, B2B và Admin.",
      "Thiết kế luồng booking B2C từ tìm kiếm, chọn cabin theo sơ đồ boong đến nhập thông tin hành khách và thanh toán.",
      "Mô hình hóa hệ sinh thái 3 nhóm: B2C Booking, B2B Agency và Admin Operations.",
      "Tách biệt 3 trạng thái vận hành độc lập: Booking Status, Payment Status và Allocation Status.",
      "Thiết kế cấu trúc quản lý tàu vật lý: Tàu → Boong → Khu vực → Cabin → Loại cabin → Inventory theo chuyến.",
      "Tổ chức giao diện B2B cho đại lý với nghiệp vụ giữ chỗ và phân bổ tồn kho riêng.",
      "Thiết kế responsive thích ứng tương tác cho Desktop, Tablet và Mobile.",
      "Thực hiện Design QA: kiểm tra validation, responsive behavior, các trạng thái lỗi/thành công và bàn giao handoff."
    ],

    bookingFlow: [
      "Search",
      "Results",
      "Cruise Detail",
      "Deck & Cabin",
      "Passenger Information",
      "Payment",
      "Confirmation"
    ],

    systemLogic: [
      {
        title: "Tách bạch 3 trạng thái theo từng domain",
        description: "Booking Status, Payment Status và Allocation Status được tách biệt để người vận hành biết chính xác booking đang ở đâu, tiền đã xử lý đến mức nào và inventory đã được phân bổ hay chưa."
      },
      {
        title: "Mô hình cấu trúc tàu và inventory vật lý",
        description: "Tàu → Boong → Khu vực → Cabin → Loại cabin → Inventory theo chuyến. Sơ đồ boong được thiết kế như một lớp quản trị trực quan thay vì chỉ thao tác trên danh sách dữ liệu."
      },
      {
        title: "Một sản phẩm, nhiều góc nhìn vận hành",
        description: "B2C Booking (Search, Cruise Detail, Cabin, Passenger, Payment) kết nối cùng B2B Agency (Reservation, Credit, Inventory, Reconciliation) và Admin Operations (Booking, Schedule, Fleet, Inventory, Finance, RBAC)."
      }
    ],

    images: [
      {
        id: "01-cover",
        src: "/projects/ha-long-luxe/01-cover-ha-long-luxe.webp",
        expectedFile: "01-cover-ha-long-luxe.webp",
        title: "Tổng quan Ha Long Luxe",
        label: "Tổng quan Ha Long Luxe",
        description: "Nền tảng booking du thuyền kết nối B2C, B2B và hệ thống quản trị vận hành.",
        slotPurpose: "Nền tảng booking du thuyền kết nối B2C, B2B và hệ thống quản trị vận hành.",
        aspectRatio: "16/10"
      },
      {
        id: "02-booking-home",
        src: "/projects/ha-long-luxe/02-booking-home.webp",
        expectedFile: "02-booking-home.webp",
        title: "Khám phá & tìm chuyến du thuyền",
        label: "Khám phá & tìm chuyến du thuyền",
        description: "Homepage ưu tiên tìm kiếm nhanh theo điểm đến, ngày đi, thời lượng và số lượng khách.",
        slotPurpose: "Homepage ưu tiên tìm kiếm nhanh theo điểm đến, ngày đi, thời lượng và số lượng khách.",
        aspectRatio: "16/10"
      },
      {
        id: "03-search-results",
        src: "/projects/ha-long-luxe/03-search-results.webp",
        expectedFile: "03-search-results.webp",
        title: "So sánh & lựa chọn du thuyền",
        label: "So sánh & lựa chọn du thuyền",
        description: "Kết quả tìm kiếm kết hợp thông tin chuyến, cabin khả dụng, giá và các tiêu chí hỗ trợ quyết định.",
        slotPurpose: "Kết quả tìm kiếm kết hợp thông tin chuyến, cabin khả dụng, giá và các tiêu chí hỗ trợ quyết định.",
        aspectRatio: "16/10"
      },
      {
        id: "04-cruise-detail",
        src: "/projects/ha-long-luxe/04-cruise-detail.webp",
        expectedFile: "04-cruise-detail.webp",
        title: "Cruise Detail & Content Hierarchy",
        label: "Cruise Detail & Content Hierarchy",
        description: "Tổ chức thông tin du thuyền, gallery, hành trình, cabin, tiện ích và chính sách theo hierarchy rõ ràng.",
        slotPurpose: "Tổ chức thông tin du thuyền, gallery, hành trình, cabin, tiện ích và chính sách theo hierarchy rõ ràng.",
        aspectRatio: "16/10"
      },
      {
        id: "05-deck-cabin-selection",
        src: "/projects/ha-long-luxe/05-deck-cabin-selection.webp",
        expectedFile: "05-deck-cabin-selection.webp",
        title: "Deck & Cabin Selection",
        label: "Deck & Cabin Selection",
        description: "Luồng chọn cabin trực quan theo deck, sơ đồ vị trí, trạng thái khả dụng và booking summary.",
        slotPurpose: "Luồng chọn cabin trực quan theo deck, sơ đồ vị trí, trạng thái khả dụng và booking summary.",
        aspectRatio: "16/10"
      },
      {
        id: "06-booking-information",
        src: "/projects/ha-long-luxe/06-booking-information.webp",
        expectedFile: "06-booking-information.webp",
        title: "Passenger Information & Checkout",
        label: "Passenger Information & Checkout",
        description: "Nhóm dữ liệu người đặt, hành khách, yêu cầu đặc biệt và thanh toán thành các bước dễ kiểm soát.",
        slotPurpose: "Nhóm dữ liệu người đặt, hành khách, yêu cầu đặc biệt và thanh toán thành các bước dễ kiểm soát.",
        aspectRatio: "16/10"
      },
      {
        id: "07-admin-booking-management",
        src: "/projects/ha-long-luxe/07-admin-booking-management.webp",
        expectedFile: "07-admin-booking-management.webp",
        title: "Booking Operations",
        label: "Booking Operations",
        description: "Admin quản lý booking theo trạng thái đặt chỗ, thanh toán và phân bổ cabin.",
        slotPurpose: "Admin quản lý booking theo trạng thái đặt chỗ, thanh toán và phân bổ cabin.",
        aspectRatio: "16/10"
      },
      {
        id: "08-admin-fleet-deck",
        src: "/projects/ha-long-luxe/08-admin-fleet-deck.webp",
        expectedFile: "08-admin-fleet-deck.webp",
        title: "Fleet & Deck Management",
        label: "Fleet & Deck Management",
        description: "Quản lý cấu trúc tàu, deck, khu vực và cabin thông qua mô hình trực quan.",
        slotPurpose: "Quản lý cấu trúc tàu, deck, khu vực và cabin thông qua mô hình trực quan.",
        aspectRatio: "16/10"
      },
      {
        id: "09-inventory-slot",
        src: "/projects/ha-long-luxe/09-inventory-slot.webp",
        expectedFile: "09-inventory-slot.webp",
        title: "Cabin Inventory",
        label: "Cabin Inventory",
        description: "Theo dõi sức chứa, số đã đặt, đang giữ và số cabin còn khả dụng theo từng lịch khởi hành.",
        slotPurpose: "Theo dõi sức chứa, số đã đặt, đang giữ và số cabin còn khả dụng theo từng lịch khởi hành.",
        aspectRatio: "16/10"
      },
      {
        id: "10-b2b-booking",
        src: "/projects/ha-long-luxe/10-b2b-booking.webp",
        expectedFile: "10-b2b-booking.webp",
        title: "B2B Agency Booking",
        label: "B2B Agency Booking",
        description: "Mở rộng booking flow cho đại lý với thông tin đối tác và nghiệp vụ giữ chỗ riêng.",
        slotPurpose: "Mở rộng booking flow cho đại lý với thông tin đối tác và nghiệp vụ giữ chỗ riêng.",
        aspectRatio: "16/10"
      },
      {
        id: "11-mobile-booking-home",
        src: "/projects/ha-long-luxe/11-mobile-booking-home.webp",
        expectedFile: "11-mobile-booking-home.webp",
        title: "Mobile Booking Experience",
        label: "Mobile Booking Experience",
        description: "Tổ chức lại search, recommendation và cruise discovery cho trải nghiệm màn hình nhỏ.",
        slotPurpose: "Tổ chức lại search, recommendation và cruise discovery cho trải nghiệm màn hình nhỏ.",
        aspectRatio: "mobile"
      },
      {
        id: "12-mobile-cabin-selection",
        src: "/projects/ha-long-luxe/12-mobile-cabin-selection.webp",
        expectedFile: "12-mobile-cabin-selection.webp",
        title: "Mobile Cabin Selection",
        label: "Mobile Cabin Selection",
        description: "Chuyển luồng Deck & Cabin phức tạp thành trải nghiệm tuần tự và dễ thao tác trên mobile.",
        slotPurpose: "Chuyển luồng Deck & Cabin phức tạp thành trải nghiệm tuần tự và dễ thao tác trên mobile.",
        aspectRatio: "mobile"
      },
      {
        id: "13-responsive-overview",
        src: "/projects/ha-long-luxe/13-responsive-overview.webp",
        expectedFile: "13-responsive-overview.webp",
        title: "Responsive Product Experience",
        label: "Responsive Product Experience",
        description: "Giữ capability nhất quán giữa Desktop, Tablet và Mobile nhưng điều chỉnh hierarchy và interaction theo từng thiết bị.",
        slotPurpose: "Giữ capability nhất quán giữa Desktop, Tablet và Mobile nhưng điều chỉnh hierarchy và interaction theo từng thiết bị.",
        aspectRatio: "16/9"
      }
    ]
  },

  // ==========================================
  // PROJECT 02: VEVUIVE (Primary / Featured)
  // ==========================================
  {
    slug: "vevuive",
    index: "02",
    title: "VEVUIVE — Web & Mobile Booking Platform",
    shortTitle: "Vevuive",
    subtitle: "Thiết kế trải nghiệm đặt vé vui chơi và du lịch trên Web & Mobile, kết nối hành trình từ khám phá địa điểm, chọn vé và bảo hiểm đến thanh toán, e-ticket và quản lý đơn hàng.",
    role: "UI/UX Designer",
    roleSecondary: "BA Contribution — Insurance",
    additionalContribution: "Business Analysis contribution for Insurance Integration",
    category: "BOOKING · TICKETING · MOBILE",
    productType: "Tourism · Booking · Ticketing",
    platforms: ["Web", "Mobile App", "Admin"],
    domain: "Tourism · Booking · Ticketing",
    year: "2025 – 2026",
    featured: true,
    tags: [
      "Booking UX",
      "Web & Mobile",
      "Responsive Design",
      "User Flow",
      "Information Architecture",
      "Interaction Design",
      "Insurance UX",
      "System States",
      "Prototyping",
      "Design QA"
    ],
    cover: "/projects/vevuive/01-cover-vevuive.webp",
    coverLabel: "Tổng quan Vevuive",
    expectedFile: "01-cover-vevuive.webp",

    eyebrow: "HỒ SƠ DỰ ÁN #02",
    intro: "Thiết kế và hoàn thiện trải nghiệm booking đa nền tảng cho các dịch vụ vui chơi, tham quan và du lịch. Từ requirement và quy trình nghiệp vụ, tôi xây dựng user journey từ khám phá địa điểm, lựa chọn sản phẩm/vé, nhập thông tin khách hàng, mua bảo hiểm và thanh toán đến nhận e-ticket và quản lý đơn hàng.",
    summary: "Thiết kế trải nghiệm đặt vé vui chơi và du lịch trên Web & Mobile, kết nối hành trình từ khám phá địa điểm, chọn vé và bảo hiểm đến thanh toán, e-ticket và quản lý đơn hàng.",

    metadata: {
      domain: "Tourism · Booking · Ticketing",
      role: "UI/UX Designer",
      baContribution: "Insurance Integration",
      platforms: "Web · Mobile App · Admin",
      scope: "Product Flow · Information Architecture · Responsive UI · Interaction Design · Prototype · Design QA"
    },

    challenge: {
      title: "Giữ một hành trình booking nhất quán trên nhiều nền tảng",
      content: "Vevuive phục vụ nhiều bước trong cùng một hành trình: từ khám phá điểm đến và sản phẩm, lựa chọn vé, voucher và thông tin khách hàng đến bảo hiểm, thanh toán và quản lý vé sau mua.\n\nThách thức không chỉ nằm ở việc thiết kế từng màn hình riêng lẻ, mà là đảm bảo business capability được giữ nhất quán giữa Web và Mobile trong khi interaction, hierarchy và cách trình bày phải phù hợp với từng thiết bị."
    },

    productEcosystem: {
      title: "Một hành trình xuyên suốt trước, trong và sau booking",
      supportingCopy: "Thay vì xem từng màn hình như một chức năng độc lập, flow được tổ chức quanh lifecycle của người dùng từ lúc tìm trải nghiệm đến khi sử dụng và quản lý vé sau mua.",
      groups: [
        {
          name: "DISCOVERY",
          items: ["Homepage", "Explore", "Destination", "Service Detail"]
        },
        {
          name: "BOOKING",
          items: ["Ticket Selection", "Voucher", "Cart", "Customer Information"]
        },
        {
          name: "PROTECTION & PAYMENT",
          items: ["Insurance", "Insured Person", "Payment", "Confirmation"]
        },
        {
          name: "POST-BOOKING",
          items: ["E-ticket", "Orders", "Account", "Insurance Management"]
        }
      ]
    },

    bookingJourney: {
      title: "Từ khám phá đến nhận vé điện tử",
      flow: "Discovery → Destination / Service Detail → Ticket Selection → Voucher → Cart → Customer Information → Insurance → Payment → Confirmation → E-ticket / Order",
      steps: [
        "Discovery",
        "Destination / Service Detail",
        "Ticket Selection",
        "Voucher",
        "Cart",
        "Customer Information",
        "Insurance",
        "Payment",
        "Confirmation",
        "E-ticket / Order"
      ],
      content: "Booking flow được chia thành các quyết định nhỏ theo từng bước để người dùng không phải xử lý quá nhiều thông tin cùng lúc. Các thông tin quan trọng như loại vé, số lượng khách, ưu đãi và tổng tiền được giữ nhất quán xuyên suốt quá trình."
    },

    webToMobile: {
      title: "Feature parity không đồng nghĩa với layout parity",
      content: "Mobile không được thiết kế bằng cách thu nhỏ hoặc sao chép trực tiếp layout từ Web. Thay vào đó, capability giữa hệ thống Web, ứng dụng cũ và phiên bản Mobile mới được audit để xác định những chức năng cần giữ lại, thay đổi hoặc tổ chức lại.",
      highlightQuote: "Same capability. Different interaction pattern.",
      designPrinciples: [
        {
          title: "Business capability parity",
          description: "Người dùng vẫn phải hoàn thành được cùng một business goal trên cả Web và Mobile."
        },
        {
          title: "Interaction adaptation",
          description: "Navigation, filter, form, modal, bottom sheet và CTA được điều chỉnh theo hành vi sử dụng trên mobile."
        },
        {
          title: "Information hierarchy",
          description: "Nội dung phụ được giảm ưu tiên hoặc progressive disclosure để giữ màn hình nhỏ dễ scan."
        }
      ]
    },

    discovery: {
      title: "Từ khám phá địa điểm đến một sản phẩm cụ thể",
      content: "Homepage và Explore đóng vai trò discovery layer, cho phép người dùng tìm kiếm địa điểm, nhóm trải nghiệm, ưu đãi và sản phẩm nổi bật trước khi đi vào chi tiết dịch vụ.\n\nỞ Service Detail, nội dung được tổ chức theo hierarchy rõ ràng giữa thông tin chính, gói dịch vụ, giá, điều kiện áp dụng và CTA booking để người dùng có đủ context trước khi quyết định."
    },

    ticketSelection: {
      title: "Biến cấu hình vé thành một quyết định dễ kiểm soát",
      content: "Một booking có thể bao gồm nhiều loại vé, số lượng khách và điều kiện khác nhau. Giao diện cần giúp người dùng hiểu họ đang chọn sản phẩm nào, số lượng bao nhiêu và tổng tiền thay đổi như thế nào trước khi tiếp tục.",
      designFocus: [
        "Clear ticket hierarchy",
        "Immediate pricing feedback",
        "Persistent primary CTA"
      ]
    },

    cartVoucher: {
      title: "Giữ ưu đãi minh bạch trước khi checkout",
      content: "Cart tập trung vào việc xác nhận lại sản phẩm đã chọn, số lượng, giá và ưu đãi. Voucher được tích hợp như một phần của pricing flow thay vì một luồng tách rời.\n\nNgười dùng có thể hiểu rõ mức giảm và số tiền cuối cùng trước khi chuyển sang nhập thông tin khách hàng."
    },

    customerInformation: {
      title: "Thu thập đủ dữ liệu mà không biến checkout thành một form dài",
      content: "Thông tin khách hàng được chia thành các nhóm có ý nghĩa theo nghiệp vụ, phân biệt dữ liệu bắt buộc và không bắt buộc, đồng thời áp dụng validation tại đúng thời điểm.",
      designFocus: [
        "Required vs Optional",
        "Inline Validation",
        "Error State",
        "Input State",
        "Customer / Passenger Mapping"
      ]
    },

    insuranceIntegration: {
      title: "Chuyển business rule bảo hiểm thành một trải nghiệm dễ hiểu",
      content: "Insurance Integration yêu cầu nhiều hơn việc thêm một checkbox vào checkout. Tôi tham gia phân tích requirement để làm rõ điều kiện áp dụng, mức phí, người được bảo hiểm, dữ liệu bắt buộc, dependency và validation trước khi chuyển logic sang user flow và interface.",
      designPrinciple: "Business rule first, interface second.",
      areas: [
        {
          name: "Eligibility",
          description: "Booking hoặc hành khách nào đủ điều kiện tham gia bảo hiểm."
        },
        {
          name: "Insured Person Mapping",
          description: "Xác định người được bảo hiểm dựa trên dữ liệu khách hàng/hành khách."
        },
        {
          name: "Required Information",
          description: "Các trường dữ liệu cần có trước khi phát hành bảo hiểm."
        },
        {
          name: "Validation",
          description: "Kiểm tra dữ liệu định danh, ngày sinh và các dependency liên quan."
        },
        {
          name: "Premium Visibility",
          description: "Người dùng phải hiểu chi phí bảo hiểm trước khi thanh toán."
        },
        {
          name: "Post-booking",
          description: "Trải nghiệm tiếp tục sau checkout với thông tin/hợp đồng bảo hiểm liên quan."
        }
      ]
    },

    checkoutPayment: {
      title: "Giữ quyết định thanh toán rõ ràng ở bước có nhiều rủi ro nhất",
      content: "Checkout tổng hợp các thông tin quan trọng của booking trước khi thanh toán: sản phẩm, khách hàng, bảo hiểm, voucher, giá và phương thức thanh toán.\n\nHierarchy được thiết kế để người dùng có thể kiểm tra lại booking mà không cần quay về các bước trước.",
      designFocus: [
        "Booking Summary",
        "Payment Method",
        "Price Breakdown",
        "Insurance Summary",
        "Loading / Processing",
        "Payment Success",
        "Payment Failure"
      ]
    },

    eticketOrders: {
      title: "Booking không kết thúc ở Payment Success",
      content: "Sau thanh toán, trải nghiệm tiếp tục với e-ticket, QR, chi tiết đơn hàng và lịch sử booking. Người dùng cần dễ dàng tìm lại vé và hiểu trạng thái sử dụng mà không phải quay lại quy trình đặt vé.",
      capabilities: [
        "Order Detail",
        "Ticket / QR",
        "Payment Information",
        "Booking Status",
        "Insurance Information",
        "Account / History"
      ]
    },

    systemStates: {
      title: "Thiết kế cả những trạng thái không phải happy path",
      content: "Các state được xác định song song với main flow để tránh tình trạng UI chỉ hoạt động trong happy path. Điều này đặc biệt quan trọng với booking, payment và inventory — nơi dữ liệu có thể thay đổi trong quá trình người dùng thao tác.",
      states: [
        "Empty",
        "Loading",
        "Disabled",
        "Validation Error",
        "System / API Error",
        "Payment Processing",
        "Payment Failed",
        "Success",
        "Expired",
        "No Availability"
      ]
    },

    responsiveDesign: {
      title: "Cùng một business goal, khác cách tương tác",
      content: "Web ưu tiên khả năng scan, comparison và không gian hiển thị lớn; Mobile ưu tiên thao tác một tay, progressive disclosure và CTA luôn dễ tiếp cận.\n\nResponsive design vì vậy được xử lý ở cấp interaction và hierarchy, không chỉ ở breakpoint.",
      comparison: {
        web: ["Multi-column", "Side panel", "Large modal", "Persistent information", "Dense content"],
        mobile: ["Sequential flow", "Bottom sheet", "Full-screen interaction", "Sticky CTA / Summary", "Progressive disclosure"]
      }
    },

    designSystem: {
      title: "Chuẩn hóa interaction trên một sản phẩm nhiều flow",
      content: "Các pattern như input, selector, filter, modal, bottom sheet, ticket card, payment option, status và CTA được chuẩn hóa để các flow khác nhau vẫn mang cùng một ngôn ngữ sản phẩm.",
      focus: ["Components", "States", "Auto Layout", "Responsive Patterns", "Modal / Bottom Sheet", "Form", "Navigation", "CTA"]
    },

    prototypeDesignQA: {
      title: "Từ flow trên Figma đến hành vi có thể kiểm tra",
      content: "Prototype được sử dụng để mô phỏng những interaction quan trọng như tìm kiếm, chọn vé, modal/bottom sheet, nhập thông tin, insurance và payment nhằm làm rõ hành vi trước khi handoff.\n\nDesign QA tập trung vào responsive behavior, interaction state, validation, consistency và sự khác biệt giữa implementation với thiết kế."
    },

    aiWorkflow: {
      title: "AI hỗ trợ tốc độ, không thay thế quyết định thiết kế",
      content: "Trong quá trình làm việc, AI được sử dụng để hỗ trợ review requirement, khám phá edge case, cấu trúc flow, kiểm tra consistency và tạo nhanh các hướng exploration/mockup. Output luôn được review lại dựa trên business rule, UX logic và khả năng triển khai thực tế.",
      uses: ["Requirement Review", "Flow Exploration", "Edge-case Exploration", "Mockup Exploration", "Design Review", "Documentation Support"]
    },

    productScope: [
      "Homepage",
      "Explore",
      "Destination",
      "Service Detail",
      "Ticket Selection",
      "Voucher",
      "Cart",
      "Customer Information",
      "Insurance",
      "Payment",
      "E-ticket",
      "Orders",
      "Account",
      "Identity / Validation",
      "Admin Booking"
    ],

    reflection: {
      title: "Điều tôi học được",
      content: "Vevuive giúp tôi chuyển từ tư duy “thiết kế màn hình” sang tư duy capability và product flow. Khi cùng một nghiệp vụ xuất hiện trên Web và Mobile, vấn đề không phải là giữ layout giống nhau mà là giữ đúng business goal trong interaction phù hợp với từng context.\n\nInsurance cũng là ví dụ rõ nhất cho cách background Business Analysis hỗ trợ công việc UI/UX: hiểu rule và dependency trước giúp solution ít phải sửa lại khi đi vào development."
    },

    images: [
      {
        id: "01-cover",
        src: "/projects/vevuive/01-cover-vevuive.webp",
        expectedFile: "01-cover-vevuive.webp",
        title: "Tổng quan Vevuive",
        label: "Tổng quan Vevuive",
        description: "Nền tảng booking kết nối hành trình khám phá, chọn vé, checkout, bảo hiểm, thanh toán và quản lý đơn hàng.",
        slotPurpose: "Nền tảng booking kết nối hành trình khám phá, chọn vé, checkout, bảo hiểm, thanh toán và quản lý đơn hàng.",
        aspectRatio: "16/10"
      },
      {
        id: "02-booking-home",
        src: "/projects/vevuive/02-booking-home.webp",
        expectedFile: "02-booking-home.webp",
        title: "Booking Discovery",
        label: "Booking Discovery",
        description: "Homepage tổ chức search và nội dung khám phá để đưa người dùng từ nhu cầu ban đầu đến các trải nghiệm phù hợp.",
        slotPurpose: "Homepage tổ chức search và nội dung khám phá để đưa người dùng từ nhu cầu ban đầu đến các trải nghiệm phù hợp.",
        aspectRatio: "16/10"
      },
      {
        id: "03-explore-grid",
        src: "/projects/vevuive/03-explore-grid.webp",
        expectedFile: "03-explore-grid.webp",
        title: "Explore & Destination Discovery",
        label: "Explore & Destination Discovery",
        description: "Grid khám phá hỗ trợ scan và so sánh các khu vui chơi, điểm đến và sản phẩm trước khi đi sâu vào chi tiết.",
        slotPurpose: "Grid khám phá hỗ trợ scan và so sánh các khu vui chơi, điểm đến và sản phẩm trước khi đi sâu vào chi tiết.",
        aspectRatio: "16/10"
      },
      {
        id: "04-destination-detail",
        src: "/projects/vevuive/04-destination-detail.webp",
        expectedFile: "04-destination-detail.webp",
        title: "Destination Detail",
        label: "Destination Detail",
        description: "Tổ chức thông tin địa điểm, gói dịch vụ và booking entry point theo hierarchy rõ ràng.",
        slotPurpose: "Tổ chức thông tin địa điểm, gói dịch vụ và booking entry point theo hierarchy rõ ràng.",
        aspectRatio: "16/10"
      },
      {
        id: "05-service-booking",
        src: "/projects/vevuive/05-service-booking.webp",
        expectedFile: "05-service-booking.webp",
        title: "Service & Ticket Configuration",
        label: "Service & Ticket Configuration",
        description: "Kết hợp thông tin dịch vụ với ngày sử dụng, khu vực, thời gian, loại vé, voucher và booking summary trong cùng một flow.",
        slotPurpose: "Kết hợp thông tin dịch vụ với ngày sử dụng, khu vực, thời gian, loại vé, voucher và booking summary trong cùng một flow.",
        aspectRatio: "16/10"
      },
      {
        id: "06-booking-modal-desktop",
        src: "/projects/vevuive/06-booking-modal-desktop.webp",
        expectedFile: "06-booking-modal-desktop.webp",
        title: "Desktop Booking Interaction",
        label: "Desktop Booking Interaction",
        description: "Booking configuration được đưa vào một focused modal giúp người dùng hoàn tất các quyết định chính mà không rời context.",
        slotPurpose: "Booking configuration được đưa vào một focused modal giúp người dùng hoàn tất các quyết định chính mà không rời context.",
        aspectRatio: "16/10"
      },
      {
        id: "07-booking-modal-mobile",
        src: "/projects/vevuive/07-booking-modal-mobile.webp",
        expectedFile: "07-booking-modal-mobile.webp",
        title: "Mobile Booking Adaptation",
        label: "Mobile Booking Adaptation",
        description: "Cùng capability booking được tổ chức lại theo viewport hẹp thay vì sao chép trực tiếp cấu trúc desktop.",
        slotPurpose: "Cùng capability booking được tổ chức lại theo viewport hẹp thay vì sao chép trực tiếp cấu trúc desktop.",
        aspectRatio: "mobile"
      },
      {
        id: "08-cart",
        src: "/projects/vevuive/08-cart.webp",
        expectedFile: "08-cart.webp",
        title: "Cart & Voucher",
        label: "Cart & Voucher",
        description: "Cart giúp người dùng kiểm tra lại lựa chọn, giá và ưu đãi trước khi tiếp tục checkout.",
        slotPurpose: "Cart giúp người dùng kiểm tra lại lựa chọn, giá và ưu đãi trước khi tiếp tục checkout.",
        aspectRatio: "16/10"
      },
      {
        id: "09-checkout-customer",
        src: "/projects/vevuive/09-checkout-customer.webp",
        expectedFile: "09-checkout-customer.webp",
        title: "Customer Information & Checkout",
        label: "Customer Information & Checkout",
        description: "Thông tin khách hàng, hóa đơn, payment option và booking summary được chia theo nhóm nghiệp vụ để giảm cognitive load.",
        slotPurpose: "Thông tin khách hàng, hóa đơn, payment option và booking summary được chia theo nhóm nghiệp vụ để giảm cognitive load.",
        aspectRatio: "16/10"
      },
      {
        id: "10-insurance-detail",
        src: "/projects/vevuive/10-insurance-detail.webp",
        expectedFile: "10-insurance-detail.webp",
        title: "Insurance Information Experience",
        label: "Insurance Information Experience",
        description: "Thông tin quyền lợi, điều kiện và hỗ trợ bảo hiểm được tổ chức thành các nhóm rõ ràng trước khi người dùng quyết định.",
        slotPurpose: "Thông tin quyền lợi, điều kiện và hỗ trợ bảo hiểm được tổ chức thành các nhóm rõ ràng trước khi người dùng quyết định.",
        aspectRatio: "16/10"
      },
      {
        id: "11-payment-qr",
        src: "/projects/vevuive/11-payment-qr.webp",
        expectedFile: "11-payment-qr.webp",
        title: "QR Payment & Order Summary",
        label: "QR Payment & Order Summary",
        description: "Payment screen giữ QR, thông tin giao dịch, countdown và booking summary trong cùng một context.",
        slotPurpose: "Payment screen giữ QR, thông tin giao dịch, countdown và booking summary trong cùng một context.",
        aspectRatio: "16/10"
      },
      {
        id: "12-booking-success",
        src: "/projects/vevuive/12-booking-success.webp",
        expectedFile: "12-booking-success.webp",
        title: "Booking Success & Post-booking",
        label: "Booking Success & Post-booking",
        description: "Success state tiếp tục dẫn người dùng đến thông tin đơn hàng và quy trình phát hành vé thay vì kết thúc tại payment.",
        slotPurpose: "Success state tiếp tục dẫn người dùng đến thông tin đơn hàng và quy trình phát hành vé thay vì kết thúc tại payment.",
        aspectRatio: "16/10"
      },
      {
        id: "13-mobile-home",
        src: "/projects/vevuive/13-mobile-home.webp",
        expectedFile: "13-mobile-home.webp",
        title: "Responsive Mobile Discovery",
        label: "Responsive Mobile Discovery",
        description: "Homepage được tái cấu trúc hierarchy và interaction cho mobile viewport.",
        slotPurpose: "Homepage được tái cấu trúc hierarchy và interaction cho mobile viewport.",
        aspectRatio: "mobile"
      },
      {
        id: "14-mobile-destination",
        src: "/projects/vevuive/14-mobile-destination.webp",
        expectedFile: "14-mobile-destination.webp",
        title: "Responsive Mobile Detail",
        label: "Responsive Mobile Detail",
        description: "Destination detail giữ nguyên business capability nhưng điều chỉnh presentation và booking access cho mobile.",
        slotPurpose: "Destination detail giữ nguyên business capability nhưng điều chỉnh presentation và booking access cho mobile.",
        aspectRatio: "mobile"
      },
      {
        id: "15-responsive-overview",
        src: "/projects/vevuive/15-responsive-overview.webp",
        expectedFile: "15-responsive-overview.webp",
        title: "Responsive Product Experience",
        label: "Responsive Product Experience",
        description: "Feature parity được duy trì ở cấp business goal trong khi interaction pattern được điều chỉnh theo từng viewport.",
        slotPurpose: "Feature parity được duy trì ở cấp business goal trong khi interaction pattern được điều chỉnh theo từng viewport.",
        aspectRatio: "16/9"
      }
    ]
  },

  // ==========================================
  // PROJECT 03: MA WAREHOUSE (Primary / Featured)
  // ==========================================
  {
    slug: "ma-warehouse",
    index: "03",
    title: "MA Warehouse — Ticket Inventory & Refund / Cancellation System",
    shortTitle: "MA Warehouse",
    subtitle: "Data-heavy internal operations platform managing high-volume ticket serials, batch imports, orders, and complex multi-role refund/cancellation workflows.",
    role: "UIUX Designer",
    productType: "Internal Ticket Inventory & Operations System",
    platforms: ["Desktop Admin UI", "Responsive Admin"],
    domain: "Ticketing, Warehouse, Internal Operations",
    year: "2025",
    featured: true,
    tags: ["Enterprise UX", "Data-Heavy UI", "Batch & Serial Processing", "Multi-Role Approvals", "Exception Handling", "RBAC"],
    cover: "/projects/ma-warehouse/01-cover.webp",
    coverLabel: "Warehouse Admin Dashboard & Inventory Overview",

    summary: "Designed and redesigned a data-heavy internal platform for ticket inventory, serial management, bulk imports, order processing, ticket issuance, reporting, and a multi-step refund/cancellation system.",

    keyWork: [
      "Designed high-density ticket inventory tables with multi-criteria filtering.",
      "Designed batch import and serial-level allocation workflows.",
      "Designed operational forms and confirmation modals for sensitive ticket actions.",
      "Designed end-to-end multi-role refund and cancellation workflows.",
      "Clarified approval states, role permissions, and partial refund rules with BA and PM teams.",
      "Modeled exception states (corrupted serials, duplicate allocations, chargebacks).",
      "Delivered responsive desktop UI optimized for continuous daily back-office usage."
    ],

    rolesWorkflow: [
      { role: "Agent", action: "Initiates refund/cancellation request with selected serial numbers and justification." },
      { role: "MA Warehouse", action: "Verifies serial validity, locks physical inventory, and assesses fee penalties." },
      { role: "Sales Admin", action: "Reviews commercial policy compliance and provides operational approval." },
      { role: "Accounting", action: "Executes financial reversal, applies reconciliation credit, and finalizes closure." }
    ],

    keyLogic: [
      "Serial-level processing rather than whole-order locking",
      "Partial cancellation support with real-time fee calculation",
      "Three approval decisions: Approve, Reject, or Request Additional Information (Supplement)",
      "Strict data locking upon final Accounting reconciliation"
    ],

    images: [
      { id: "01-cover", src: "/projects/ma-warehouse/01-cover.webp", label: "Cover Overview", expectedFile: "01-cover.webp", slotPurpose: "Admin dashboard / inventory overview.", aspectRatio: "16/10" },
      { id: "02-dashboard", src: "/projects/ma-warehouse/02-dashboard.webp", label: "Operations Dashboard", expectedFile: "02-dashboard.webp", slotPurpose: "Warehouse dashboard with key inventory KPIs.", aspectRatio: "16/10" },
      { id: "03-inventory-table", src: "/projects/ma-warehouse/03-inventory-table.webp", label: "Ticket Inventory Table", expectedFile: "03-inventory-table.webp", slotPurpose: "High-density data table with advanced filtering.", aspectRatio: "16/10" },
      { id: "04-batch-import", src: "/projects/ma-warehouse/04-batch-import.webp", label: "Batch Import Flow", expectedFile: "04-batch-import.webp", slotPurpose: "Bulk file upload and parsing interface.", aspectRatio: "16/10" },
      { id: "05-serial-import", src: "/projects/ma-warehouse/05-serial-import.webp", label: "Serial Management", expectedFile: "05-serial-import.webp", slotPurpose: "Individual serial generation and tracking.", aspectRatio: "16/10" },
      { id: "06-orders", src: "/projects/ma-warehouse/06-orders.webp", label: "Order Management", expectedFile: "06-orders.webp", slotPurpose: "Order processing, allocation, and tracking.", aspectRatio: "16/10" },
      { id: "07-ticket-issuance", src: "/projects/ma-warehouse/07-ticket-issuance.webp", label: "Ticket Issuance", expectedFile: "07-ticket-issuance.webp", slotPurpose: "Issuing tickets to agencies and distribution channels.", aspectRatio: "16/10" },
      { id: "08-reporting", src: "/projects/ma-warehouse/08-reporting.webp", label: "Inventory Reporting", expectedFile: "08-reporting.webp", slotPurpose: "Operational inventory and sales reconciliation reports.", aspectRatio: "16/10" },
      { id: "09-refund-flow", src: "/projects/ma-warehouse/09-refund-flow.webp", label: "Refund Flow Diagram", expectedFile: "09-refund-flow.webp", slotPurpose: "End-to-end refund/cancellation workflow diagram.", aspectRatio: "16/9" },
      { id: "10-role-flow", src: "/projects/ma-warehouse/10-role-flow.webp", label: "Multi-Role Workflow", expectedFile: "10-role-flow.webp", slotPurpose: "Agent → Warehouse → Sales Admin → Accounting path.", aspectRatio: "16/9" },
      { id: "11-refund-request", src: "/projects/ma-warehouse/11-refund-request.webp", label: "Refund Request UI", expectedFile: "11-refund-request.webp", slotPurpose: "Serial selection, reason code, and submission UI.", aspectRatio: "16/10" },
      { id: "12-review-state", src: "/projects/ma-warehouse/12-review-state.webp", label: "Review & Approval State", expectedFile: "12-review-state.webp", slotPurpose: "Approve, Reject, and Supplement decision interfaces.", aspectRatio: "16/10" },
      { id: "13-validation", src: "/projects/ma-warehouse/13-validation.webp", label: "Validation & Exceptions", expectedFile: "13-validation.webp", slotPurpose: "Validation triggers and exception handling examples.", aspectRatio: "16/9" },
      { id: "14-modal-states", src: "/projects/ma-warehouse/14-modal-states.webp", label: "Modals & Warnings", expectedFile: "14-modal-states.webp", slotPurpose: "Destructive action modals, confirmation, error alerts.", aspectRatio: "16/9" },
      { id: "15-responsive", src: "/projects/ma-warehouse/15-responsive.webp", label: "Responsive Admin Layout", expectedFile: "15-responsive.webp", slotPurpose: "Desktop and compact viewport adaptations.", aspectRatio: "16/9" }
    ]
  },

  // ==========================================
  // PROJECT 04: TOURISM MANAGEMENT & OMNICHANNEL TICKETING (Primary / Featured)
  // ==========================================
  {
    slug: "tourism-omnichannel",
    index: "04",
    title: "Tourism Management & Omnichannel Ticketing Platform",
    shortTitle: "Tourism Omnichannel",
    subtitle: "Unified 5-system tourism ecosystem connecting ticket inventory, physical POS, B2B portals, OTA engines, and automated gate access control.",
    role: "Product / UIUX Designer",
    productType: "Omnichannel Ticketing Ecosystem",
    platforms: ["Admin CMS", "POS Terminal", "B2B Portal", "OTA Engine", "Access Control Gate UI"],
    domain: "Tourism, Ticketing, Operations",
    year: "2025",
    featured: true,
    tags: ["Ecosystem Architecture", "Cross-System UX", "Omnichannel", "QR Gate Control", "SKU Mapping", "Reconciliation"],
    cover: "/projects/tourism-omnichannel/01-cover.webp",
    coverLabel: "5-System Tourism Ticketing Ecosystem Hero",

    summary: "Designed and structured a multi-system tourism ticketing ecosystem connecting ticket inventory, multiple sales channels, voucher/QR issuance, physical access control, and financial reconciliation.",

    systems: [
      { name: "Admin CMS", purpose: "Central ticket catalog, SKU mapping, pricing rules, and global reporting." },
      { name: "POS Terminal", purpose: "On-site counter ticket sales, cash/card handling, and instantaneous thermal printing." },
      { name: "B2B Agency Portal", purpose: "Wholesale agency booking, prepaid credit wallets, and tier commissions." },
      { name: "OTA Engine", purpose: "API mapping and real-time inventory allocation for online travel agencies." },
      { name: "Access Control", purpose: "High-speed QR validation at entrance turnstiles and handheld gate scanners." }
    ],

    capabilities: [
      "Unified Ticket Inventory",
      "SKU Mapping across channels",
      "Prepaid B2B Wallet management",
      "Dynamic e-Voucher generation",
      "Encrypted QR issuance",
      "Cross-channel refund policies",
      "Automated turnstile check-in",
      "End-of-day financial reconciliation"
    ],

    keyWork: [
      "Analyzed end-to-end multi-channel operational model.",
      "Structured cross-system flows between physical counters, agencies, OTAs, and gates.",
      "Created overarching Information Architecture linking disparate systems.",
      "Designed Admin CMS interfaces for catalog and SKU mapping.",
      "Designed fast-paced POS touch interface for counter staff.",
      "Created agency self-service portal concepts.",
      "Created gate check-in interaction states with audio-visual scan feedback.",
      "Translated complex product proposals into visual system documentation."
    ],

    ticketLifecycle: [
      "1. Master Inventory Creation & SKU Setup",
      "2. Channel Allocation (B2C, B2B Agency, OTA)",
      "3. Purchase & Encrypted QR Code Issuance",
      "4. Physical Gate Scan & Validation Check-in",
      "5. Ledger Financial Reconciliation & Payout"
    ],

    images: [
      { id: "01-cover", src: "/projects/tourism-omnichannel/01-cover.webp", label: "Cover Overview", expectedFile: "01-cover.webp", slotPurpose: "5-system ecosystem hero composition.", aspectRatio: "16/10" },
      { id: "02-ecosystem", src: "/projects/tourism-omnichannel/02-ecosystem.webp", label: "Ecosystem Architecture", expectedFile: "02-ecosystem.webp", slotPurpose: "Admin CMS / POS / B2B / OTA / Access Control map.", aspectRatio: "16/9" },
      { id: "03-ticket-lifecycle", src: "/projects/tourism-omnichannel/03-ticket-lifecycle.webp", label: "Ticket Lifecycle", expectedFile: "03-ticket-lifecycle.webp", slotPurpose: "Inventory → Sale → QR → Check-in → Reconciliation.", aspectRatio: "16/9" },
      { id: "04-admin-dashboard", src: "/projects/tourism-omnichannel/04-admin-dashboard.webp", label: "Admin CMS Dashboard", expectedFile: "04-admin-dashboard.webp", slotPurpose: "Central management console.", aspectRatio: "16/10" },
      { id: "05-pos", src: "/projects/tourism-omnichannel/05-pos.webp", label: "POS Counter Interface", expectedFile: "05-pos.webp", slotPurpose: "High-speed on-site ticketing POS.", aspectRatio: "16/10" },
      { id: "06-b2b", src: "/projects/tourism-omnichannel/06-b2b.webp", label: "B2B Agency Portal", expectedFile: "06-b2b.webp", slotPurpose: "Agency wholesale booking and order portal.", aspectRatio: "16/10" },
      { id: "07-ota", src: "/projects/tourism-omnichannel/07-ota.webp", label: "OTA Mapping & Integration", expectedFile: "07-ota.webp", slotPurpose: "OTA inventory mapping and sync UI.", aspectRatio: "16/10" },
      { id: "08-access-control", src: "/projects/tourism-omnichannel/08-access-control.webp", label: "Turnstile Gate Access", expectedFile: "08-access-control.webp", slotPurpose: "Turnstile QR scanner screen and scan feedback.", aspectRatio: "16/10" },
      { id: "09-inventory", src: "/projects/tourism-omnichannel/09-inventory.webp", label: "Central Inventory", expectedFile: "09-inventory.webp", slotPurpose: "Real-time ticket pool across channels.", aspectRatio: "16/10" },
      { id: "10-sku-mapping", src: "/projects/tourism-omnichannel/10-sku-mapping.webp", label: "SKU Mapping Matrix", expectedFile: "10-sku-mapping.webp", slotPurpose: "Channel SKU translation table.", aspectRatio: "16/9" },
      { id: "11-wallet", src: "/projects/tourism-omnichannel/11-wallet.webp", label: "Prepaid Wallet System", expectedFile: "11-wallet.webp", slotPurpose: "Agency balance, top-up, and credit terms.", aspectRatio: "16/10" },
      { id: "12-qr", src: "/projects/tourism-omnichannel/12-qr.webp", label: "QR Issuance & Security", expectedFile: "12-qr.webp", slotPurpose: "Tamper-proof voucher and QR layout.", aspectRatio: "16/10" },
      { id: "13-refund", src: "/projects/tourism-omnichannel/13-refund.webp", label: "Refund Workflow", expectedFile: "13-refund.webp", slotPurpose: "Cross-system refund propagation rules.", aspectRatio: "16/9" },
      { id: "14-reconciliation", src: "/projects/tourism-omnichannel/14-reconciliation.webp", label: "Daily Reconciliation", expectedFile: "14-reconciliation.webp", slotPurpose: "End-of-day channel settlement and reporting.", aspectRatio: "16/10" }
    ]
  },

  // ==========================================
  // PROJECT 05: INSURANCE INTEGRATION (Secondary)
  // ==========================================
  {
    slug: "insurance-integration",
    index: "05",
    title: "Insurance Integration — Booking Insurance Experience",
    shortTitle: "Insurance Integration",
    subtitle: "Hybrid Business Analysis and UIUX case translating complex insurance eligibility, insured-person validation, and contract display into travel booking funnels.",
    role: "Business Analysis + UIUX Contribution",
    productType: "Hybrid BA + UIUX Case",
    platforms: ["Web Booking Funnel", "Post-Booking Portal"],
    domain: "Insurance, Travel Booking",
    year: "2025",
    featured: false,
    tags: ["Hybrid BA + UX", "Business Rules", "Form Validation", "Policy Lifecycle", "Checkout Add-on"],
    cover: "/projects/insurance-integration/01-cover.webp",
    coverLabel: "Insurance + Booking Integration Overview",

    summary: "Analyzed insurance business requirements and translated eligibility, insured-person data collection, validation constraints, and post-booking policy display into usable booking flows.",

    keyWork: [
      "Received and analyzed complex insurance underwriting specifications.",
      "Collaborated with client and business stakeholders to define eligibility criteria.",
      "Discussed technical feasibility and API contracts with engineering teams.",
      "Defined mandatory customer and insured-person data sets.",
      "Formulated rigorous validation logic (date of birth, national ID, passenger count constraints).",
      "Modeled insurance states and checkout dependencies.",
      "Designed opt-in interaction patterns during the flight/travel booking funnel.",
      "Supported post-booking insurance view, policy download, and claims referral experience.",
      "Clarified reconciliation and batch reporting structures with backend developers."
    ],

    storyMethodology: "Requirement → Business Rule → Validation → Flow → UI",

    images: [
      { id: "01-cover", src: "/projects/insurance-integration/01-cover.webp", label: "Cover Overview", expectedFile: "01-cover.webp", slotPurpose: "Insurance + booking overview.", aspectRatio: "16/10" },
      { id: "02-business-rules", src: "/projects/insurance-integration/02-business-rules.webp", label: "Business Rules Diagram", expectedFile: "02-business-rules.webp", slotPurpose: "Eligibility, restrictions, and rules diagram.", aspectRatio: "16/9" },
      { id: "03-insurance-flow", src: "/projects/insurance-integration/03-insurance-flow.webp", label: "Insurance Funnel Flow", expectedFile: "03-insurance-flow.webp", slotPurpose: "Booking → Insurance → Payment integration path.", aspectRatio: "16/9" },
      { id: "04-opt-in", src: "/projects/insurance-integration/04-opt-in.webp", label: "Opt-In Selection UI", expectedFile: "04-opt-in.webp", slotPurpose: "Insurance package opt-in during checkout.", aspectRatio: "16/10" },
      { id: "05-benefits", src: "/projects/insurance-integration/05-benefits.webp", label: "Benefits & Policy Info", expectedFile: "05-benefits.webp", slotPurpose: "Coverage breakdown and terms disclosure.", aspectRatio: "16/10" },
      { id: "06-insured-person", src: "/projects/insurance-integration/06-insured-person.webp", label: "Insured Person Form", expectedFile: "06-insured-person.webp", slotPurpose: "Form inputs for primary and accompanying insured guests.", aspectRatio: "16/10" },
      { id: "07-validation", src: "/projects/insurance-integration/07-validation.webp", label: "Validation Logic", expectedFile: "07-validation.webp", slotPurpose: "Date of birth, ID formatting, required field validation.", aspectRatio: "16/9" },
      { id: "08-checkout", src: "/projects/insurance-integration/08-checkout.webp", label: "Checkout Summary", expectedFile: "08-checkout.webp", slotPurpose: "Order review with itemized insurance premium.", aspectRatio: "16/10" },
      { id: "09-post-booking", src: "/projects/insurance-integration/09-post-booking.webp", label: "Post-Booking Management", expectedFile: "09-post-booking.webp", slotPurpose: "Accessing insurance certificate after payment.", aspectRatio: "16/10" },
      { id: "10-contract", src: "/projects/insurance-integration/10-contract.webp", label: "Policy Document View", expectedFile: "10-contract.webp", slotPurpose: "Digital insurance policy certificate display.", aspectRatio: "16/10" },
      { id: "11-reconciliation", src: "/projects/insurance-integration/11-reconciliation.webp", label: "Reconciliation Structure", expectedFile: "11-reconciliation.webp", slotPurpose: "Reporting and underwriter reconciliation structure.", aspectRatio: "16/9" }
    ]
  },

  // ==========================================
  // PROJECT 06: SMART CAR WASH 4.0 (Secondary)
  // ==========================================
  {
    slug: "smart-car-wash",
    index: "06",
    title: "Smart Car Wash 4.0",
    shortTitle: "Smart Car Wash 4.0",
    subtitle: "Multi-touchpoint service operations platform coordinating customer mobile app, on-site POS terminal, and back-office station administration.",
    role: "UIUX Support",
    productType: "Service Operations Platform",
    platforms: ["Mobile App", "POS Terminal", "Admin Dashboard"],
    domain: "Automotive Service & IoT Automation",
    year: "2025",
    featured: false,
    tags: ["UIUX Support", "Multi-Platform", "Service Operations", "POS Touch", "Real-Time Status"],
    cover: "/projects/smart-car-wash/01-cover.webp",
    coverLabel: "Mobile + POS + Admin Touchpoint Composition",

    summary: "Supported UIUX design across customer and operational touchpoints for an automatic car wash ecosystem spanning customer Mobile App, on-site POS kiosk, and Admin operations.",

    keyWork: [
      "Supported Mobile UI design for customer package selection and payment.",
      "Supported POS touchscreen interface for drive-in customers and station attendants.",
      "Supported Admin UI layouts for station status monitoring and transaction tracking.",
      "Maintained design consistency with established product rules and component libraries.",
      "Assisted in translating physical bay operational steps into intuitive interface states.",
      "Supported responsive behavior and touch-target consistency across devices."
    ],

    images: [
      { id: "01-cover", src: "/projects/smart-car-wash/01-cover.webp", label: "Cover Overview", expectedFile: "01-cover.webp", slotPurpose: "Mobile + POS + Admin composition.", aspectRatio: "16/10" },
      { id: "02-mobile-home", src: "/projects/smart-car-wash/02-mobile-home.webp", label: "Mobile Homepage", expectedFile: "02-mobile-home.webp", slotPurpose: "Customer mobile landing and booking.", aspectRatio: "mobile" },
      { id: "03-mobile-service", src: "/projects/smart-car-wash/03-mobile-service.webp", label: "Wash Service Flow", expectedFile: "03-mobile-service.webp", slotPurpose: "Service package selection and checkout.", aspectRatio: "mobile" },
      { id: "04-pos", src: "/projects/smart-car-wash/04-pos.webp", label: "POS Terminal UI", expectedFile: "04-pos.webp", slotPurpose: "On-site attendant and self-service touch POS.", aspectRatio: "16/10" },
      { id: "05-admin", src: "/projects/smart-car-wash/05-admin.webp", label: "Admin Station Dashboard", expectedFile: "05-admin.webp", slotPurpose: "Admin dashboard for wash station metrics.", aspectRatio: "16/10" },
      { id: "06-order-status", src: "/projects/smart-car-wash/06-order-status.webp", label: "Live Wash Status", expectedFile: "06-order-status.webp", slotPurpose: "Real-time bay progress and wash stage indicator.", aspectRatio: "mobile" },
      { id: "07-cross-platform", src: "/projects/smart-car-wash/07-cross-platform.webp", label: "Cross-Platform System", expectedFile: "07-cross-platform.webp", slotPurpose: "Mobile / POS / Admin interaction comparison.", aspectRatio: "16/9" }
    ]
  },

  // ==========================================
  // PROJECT 07: CORPORATE WEBSITE (Secondary)
  // ==========================================
  {
    slug: "corporate-website",
    index: "07",
    title: "Corporate Website",
    shortTitle: "Corporate Website",
    subtitle: "Modern responsive corporate marketing web presence with clear visual hierarchy, structured service showcases, and modular components.",
    role: "UI Design / UIUX Support",
    productType: "Corporate Marketing Website",
    platforms: ["Responsive Web (Desktop, Tablet, Mobile)"],
    domain: "Corporate Presence & Brand Communication",
    year: "2025",
    featured: false,
    tags: ["UI Design", "UIUX Support", "Responsive Web", "Visual Hierarchy", "Modular Components"],
    cover: "/projects/corporate-website/01-cover.webp",
    coverLabel: "Corporate Homepage & Responsive Showcase",

    summary: "Supported responsive corporate website design with focus on clear visual hierarchy, reusable section layouts, typography balance, and brand consistency.",

    keyWork: [
      "Supported visual UI design and layout composition.",
      "Designed and refined responsive behavior across Desktop, Tablet, and Mobile viewports.",
      "Maintained strict visual consistency, typography scales, and brand color palettes.",
      "Crafted reusable page sections (hero, service grids, leadership, contact cards).",
      "Supported developer handoff with clear component styling and asset exports."
    ],

    images: [
      { id: "01-cover", src: "/projects/corporate-website/01-cover.webp", label: "Cover Overview", expectedFile: "01-cover.webp", slotPurpose: "Corporate homepage preview.", aspectRatio: "16/10" },
      { id: "02-homepage", src: "/projects/corporate-website/02-homepage.webp", label: "Full Homepage Layout", expectedFile: "02-homepage.webp", slotPurpose: "Complete marketing homepage design.", aspectRatio: "16/10" },
      { id: "03-about", src: "/projects/corporate-website/03-about.webp", label: "About Page", expectedFile: "03-about.webp", slotPurpose: "Corporate mission, values, and story.", aspectRatio: "16/10" },
      { id: "04-services", src: "/projects/corporate-website/04-services.webp", label: "Services & Capabilities", expectedFile: "04-services.webp", slotPurpose: "Detailed service offerings and capability cards.", aspectRatio: "16/10" },
      { id: "05-detail-page", src: "/projects/corporate-website/05-detail-page.webp", label: "Representative Detail Page", expectedFile: "05-detail-page.webp", slotPurpose: "Sub-page typography and content hierarchy.", aspectRatio: "16/10" },
      { id: "06-responsive", src: "/projects/corporate-website/06-responsive.webp", label: "Responsive Behavior", expectedFile: "06-responsive.webp", slotPurpose: "Desktop, Tablet, and Mobile comparison.", aspectRatio: "16/9" },
      { id: "07-components", src: "/projects/corporate-website/07-components.webp", label: "Reusable Components", expectedFile: "07-components.webp", slotPurpose: "Buttons, cards, banners, form inputs.", aspectRatio: "16/9" }
    ]
  }
];

export const portfolioCategories = [
  "All",
  "Vertical SaaS",
  "Travel & Booking",
  "Internal Operations",
  "Hybrid BA + UX"
];