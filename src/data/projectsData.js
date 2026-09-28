export const personalInfo = {
  name: "Nguyen Xuan Hau",
  role: "UIUX Designer / Business Analyst",
  specialty: "BA → Product & System Design",
  primaryPositioning: "Product / UIUX Designer with a Business Analysis Background",
  subtitle: "I turn complex business requirements, workflows and system logic into clear, usable digital products across Web, Mobile and Admin platforms.",
  avatar: "/assets/hero.png",
  heroImage: "/assets/hero.png",
  aboutImage: "/assets/hero.png",

  // Real career highlights replacing fake metrics
  highlights: [
    { value: "BA → UX", label: "Requirements to Interfaces" },
    { value: "7 Projects", label: "Real Product & System Cases" },
    { value: "Web · Mobile · Admin", label: "Multi-Platform Scope" },
  ],

  bio: "Product Designer focused on complex systems. I started in Business Analysis before moving deeper into UIUX and Product Design. That foundation helps me clarify requirements, business rules, roles, states and edge cases before translating them into product flows and interfaces.",

  designPhilosophy: "Understand how the product works before deciding how it should look.",
  designPhilosophySupporting: "My Business Analysis background helps me approach design through requirements, business logic, system states and implementation constraints—not only visual execution.",

  email: "xuanhauk16@gmail.com",
  phone: "[NEED CONFIRMATION]",
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
  {
    step: "07",
    title: "7. Design QA",
    description: "Audit layouts across resolutions (1440px to 390px), verify validation states, edge cases, and layout parity vs native patterns.",
    icon: "CheckSquare"
  },
  {
    step: "08",
    title: "8. Developer Handoff",
    description: "Deliver structured Figma components, tokens, state specifications, and support technical teams during implementation.",
    icon: "Code2"
  }
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
    shortTitle: "Ha Long Luxe",
    subtitle: "Vertical SaaS & B2C Cruise Booking Ecosystem combining luxury guest reservations with a 14-module operational command platform.",
    role: "Product Designer / UIUX Designer",
    productType: "Vertical SaaS / Cruise Booking & Operations Platform",
    platforms: ["B2C Web", "B2B Agency Portal", "Admin SaaS", "Desktop", "Tablet", "Mobile"],
    domain: "Maritime Hospitality & Cruise Operations",
    year: "2026",
    featured: true,
    tags: ["Vertical SaaS", "Information Architecture", "14 Modules", "Multi-Role RBAC", "Booking vs Allocation Status", "Design QA"],
    cover: "/projects/ha-long-luxe/01-cover.webp",
    coverLabel: "Desktop Booking Page + Admin Operations Dashboard Composition",

    summary: "Designed an end-to-end cruise booking and operations ecosystem combining a customer-facing reservation experience with a comprehensive SaaS operational platform for internal fleet operations and B2B travel agencies.",

    complexity: "14 operational/admin modules with up to 51 role-based tabs covering the entire maritime hospitality lifecycle.",

    modules: [
      "Booking Management",
      "Tour Catalog",
      "Dynamic Pricing",
      "Departure Schedule",
      "Cabin Inventory",
      "Fleet Operations",
      "Finance & Invoicing",
      "B2B Agency Portal",
      "Fleet & Vessel Setup",
      "RBAC & Permissions",
      "Disruption Recovery",
      "Manifest & Check-in",
      "Reconciliation",
      "Reporting & Analytics"
    ],

    keyWork: [
      "Analyzed complex product and maritime business specifications.",
      "Translated operational requirements into comprehensive Information Architecture.",
      "Designed end-to-end booking flow: Search → Cabin Selection → Confirmation.",
      "Structured unified experiences across B2C, B2B Agency, and Admin roles.",
      "Designed responsive layouts tailored for Desktop, Tablet, and Mobile viewports.",
      "Modeled complex operational states: Booking Status, Payment Status, and Allocation Status.",
      "Built reusable UI design system components (forms, tables, drawers, steppers).",
      "Created high-fidelity interactive prototypes for stakeholder alignment.",
      "Conducted rigorous Design QA across edge cases and validation rules.",
      "Supported design-to-development technical clarifications and implementation."
    ],

    bookingFlow: [
      "Search (Dates, Vessel, Route, Guests)",
      "Filter & Compare Cruise Options",
      "Cruise Detail & Itinerary Review",
      "Deck & Physical Cabin Selection",
      "Passenger Information & Extras",
      "Payment & Gateway Processing",
      "Confirmation & Voucher",
      "Booking Lookup & Management"
    ],

    systemLogic: [
      {
        title: "Three-Way Status Separation",
        description: "Booking Status (Confirmed, Pending, Cancelled), Payment Status (Unpaid, Partial, Paid, Refunded), and Allocation Status (Unassigned, Assigned, Checked-in) were strictly separated to avoid operational confusion during cruise manifest preparation."
      },
      {
        title: "Relational Entity Hierarchy",
        description: "Tour → Departure Schedule → Vessel → Deck → Physical Cabin → Room Type → Inventory per Trip."
      },
      {
        title: "Operational Workflows",
        description: "Engineered flows for Hold reservations with timeout triggers, B2B credit limits, manifest exports for port authorities, passenger check-in, and post-trip financial reconciliation."
      }
    ],

    images: [
      {
        id: "01-cover",
        src: "/projects/ha-long-luxe/01-cover.webp",
        label: "Cover Overview",
        expectedFile: "01-cover.webp",
        slotPurpose: "Main portfolio cover. Desktop booking page + Admin dashboard composition.",
        aspectRatio: "16/10"
      },
      {
        id: "02-ecosystem",
        src: "/projects/ha-long-luxe/02-ecosystem.webp",
        label: "Platform Ecosystem",
        expectedFile: "02-ecosystem.webp",
        slotPurpose: "Show B2C / B2B / Admin multi-stakeholder ecosystem map.",
        aspectRatio: "16/9"
      },
      {
        id: "03-information-architecture",
        src: "/projects/ha-long-luxe/03-information-architecture.webp",
        label: "Information Architecture",
        expectedFile: "03-information-architecture.webp",
        slotPurpose: "Show 14-module navigation hierarchy and 51 role-based tabs.",
        aspectRatio: "16/9"
      },
      {
        id: "04-booking-flow",
        src: "/projects/ha-long-luxe/04-booking-flow.webp",
        label: "End-to-End Booking Flow",
        expectedFile: "04-booking-flow.webp",
        slotPurpose: "Search → Detail → Deck/Cabin → Passenger → Payment → Confirmation.",
        aspectRatio: "16/9"
      },
      {
        id: "05-cabin-selection",
        src: "/projects/ha-long-luxe/05-cabin-selection.webp",
        label: "Deck & Cabin Selection UI",
        expectedFile: "05-cabin-selection.webp",
        slotPurpose: "Interactive deck plans and physical cabin selection interface.",
        aspectRatio: "16/10"
      },
      {
        id: "06-admin-dashboard",
        src: "/projects/ha-long-luxe/06-admin-dashboard.webp",
        label: "Admin Operations Dashboard",
        expectedFile: "06-admin-dashboard.webp",
        slotPurpose: "Operational command center with real-time departure metrics.",
        aspectRatio: "16/10"
      },
      {
        id: "07-inventory",
        src: "/projects/ha-long-luxe/07-inventory.webp",
        label: "Cabin Inventory & Schedule",
        expectedFile: "07-inventory.webp",
        slotPurpose: "Inventory management across departure dates and vessel capacities.",
        aspectRatio: "16/10"
      },
      {
        id: "08-status-model",
        src: "/projects/ha-long-luxe/08-status-model.webp",
        label: "Tri-Status State Modeling",
        expectedFile: "08-status-model.webp",
        slotPurpose: "Booking vs Payment vs Allocation status separation matrix.",
        aspectRatio: "16/9"
      },
      {
        id: "09-b2b-agency",
        src: "/projects/ha-long-luxe/09-b2b-agency.webp",
        label: "B2B Agency Portal",
        expectedFile: "09-b2b-agency.webp",
        slotPurpose: "Agency credit limits, bulk booking, and commission reconciliation.",
        aspectRatio: "16/10"
      },
      {
        id: "10-responsive",
        src: "/projects/ha-long-luxe/10-responsive.webp",
        label: "Responsive Breakpoints",
        expectedFile: "10-responsive.webp",
        slotPurpose: "Desktop + Tablet + Mobile responsive layout comparison.",
        aspectRatio: "16/9"
      },
      {
        id: "11-components",
        src: "/projects/ha-long-luxe/11-components.webp",
        label: "Component System & States",
        expectedFile: "11-components.webp",
        slotPurpose: "Design system: forms, data tables, drawers, modals, stepper, states.",
        aspectRatio: "16/9"
      },
      {
        id: "12-design-qa",
        src: "/projects/ha-long-luxe/12-design-qa.webp",
        label: "Design QA & Edge Cases",
        expectedFile: "12-design-qa.webp",
        slotPurpose: "Design QA audits, validation states, and edge-case handling.",
        aspectRatio: "16/9"
      },
      {
        id: "13-prototype",
        src: "/projects/ha-long-luxe/13-prototype.webp",
        label: "Interactive Prototype",
        expectedFile: "13-prototype.webp",
        slotPurpose: "Prototype preview and interactive flow walkthrough.",
        aspectRatio: "16/10"
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
    subtitle: "Omnichannel travel booking and ticketing experience across responsive Web, native Mobile App, and operational Admin.",
    role: "UIUX Designer",
    productType: "Travel Booking & Ticketing Platform",
    platforms: ["Web", "Mobile App", "Admin"],
    domain: "Tourism, Entertainment Booking, Ticketing, Insurance",
    year: "2025 – 2026",
    featured: true,
    tags: ["Travel Booking", "Web & Mobile", "Mobile-Native Patterns", "Insurance Integration", "E-Ticket & QR", "Checkout Flow"],
    cover: "/projects/vevuive/01-cover.webp",
    coverLabel: "Web + Mobile Hero Composition",

    summary: "Designed the booking experience across Web and Mobile from destination discovery through ticket selection, insurance integration, checkout, e-ticket issuance and post-purchase account management.",

    keyWork: [
      "Analyzed requirement documents and clarified business constraints.",
      "Identified product features, ticket tiers, and promotional voucher rules.",
      "Built user journeys and friction-free booking flows for Web and Mobile.",
      "Designed responsive Web and native Mobile App interfaces.",
      "Adapted complex web workflows into mobile-native bottom sheets and thumb-friendly interactions.",
      "Designed comprehensive interaction states: Empty, Loading, Error, Disabled, Processing, Expired, Success.",
      "Designed seamless insurance opt-in experiences within the booking funnel.",
      "Created interactive prototypes for rapid usability verification.",
      "Prepared structured design handoff assets and specifications for development.",
      "Reviewed product consistency and visual standards during development QA."
    ],

    uxPrinciple: "Feature parity does not mean layout parity. Business capabilities from Web should be adapted into mobile-native interaction patterns instead of directly copying desktop layouts.",

    coreJourney: [
      "Destination / Experience Discovery",
      "Service & Package Detail",
      "Ticket Tier & Date Selection",
      "Voucher / Promotion Application",
      "Cart Review",
      "Customer & Traveler Information",
      "Insurance Selection & Add-on",
      "Payment Gateway Processing",
      "E-ticket Issuance with Dynamic QR",
      "Order Management & Account"
    ],

    systemStates: [
      "Empty: Clean zero-data states with actionable exploration prompts",
      "Loading: Skeleton loaders preserving layout stability",
      "Error: Clear inline messages with recovery paths",
      "Disabled: Visually distinct buttons explaining unmet criteria",
      "Processing: Animated feedback preventing double transactions",
      "Expired: Ticket/session countdown timeout handling",
      "Success: Celebratory confirmation with immediate voucher/QR access"
    ],

    images: [
      { id: "01-cover", src: "/projects/vevuive/01-cover.webp", label: "Cover Overview", expectedFile: "01-cover.webp", slotPurpose: "Web + Mobile hero composition.", aspectRatio: "16/10" },
      { id: "02-homepage-web", src: "/projects/vevuive/02-homepage-web.webp", label: "Web Booking Homepage", expectedFile: "02-homepage-web.webp", slotPurpose: "Web booking homepage with destination showcase.", aspectRatio: "16/10" },
      { id: "03-homepage-mobile", src: "/projects/vevuive/03-homepage-mobile.webp", label: "Mobile Homepage", expectedFile: "03-homepage-mobile.webp", slotPurpose: "Mobile app homepage and quick discovery.", aspectRatio: "mobile" },
      { id: "04-discovery", src: "/projects/vevuive/04-discovery.webp", label: "Discovery & Explore", expectedFile: "04-discovery.webp", slotPurpose: "Explore destinations and curated experiences.", aspectRatio: "16/10" },
      { id: "05-service-detail", src: "/projects/vevuive/05-service-detail.webp", label: "Service Detail", expectedFile: "05-service-detail.webp", slotPurpose: "Destination and experience package detail.", aspectRatio: "16/10" },
      { id: "06-ticket-selection", src: "/projects/vevuive/06-ticket-selection.webp", label: "Ticket Selection", expectedFile: "06-ticket-selection.webp", slotPurpose: "Tiered package selection and date pickers.", aspectRatio: "16/10" },
      { id: "07-cart", src: "/projects/vevuive/07-cart.webp", label: "Cart & Vouchers", expectedFile: "07-cart.webp", slotPurpose: "Shopping cart, pricing breakdown, voucher application.", aspectRatio: "16/10" },
      { id: "08-customer-info", src: "/projects/vevuive/08-customer-info.webp", label: "Customer Info Form", expectedFile: "08-customer-info.webp", slotPurpose: "Contact and traveler detail inputs.", aspectRatio: "16/10" },
      { id: "09-insurance", src: "/projects/vevuive/09-insurance.webp", label: "Insurance Integration", expectedFile: "09-insurance.webp", slotPurpose: "Insurance add-on experience inside checkout.", aspectRatio: "16/10" },
      { id: "10-payment", src: "/projects/vevuive/10-payment.webp", label: "Payment Gateway", expectedFile: "10-payment.webp", slotPurpose: "Payment method selection and secure checkout.", aspectRatio: "16/10" },
      { id: "11-eticket", src: "/projects/vevuive/11-eticket.webp", label: "E-Ticket & QR Display", expectedFile: "11-eticket.webp", slotPurpose: "Issued e-ticket with offline QR scanning support.", aspectRatio: "mobile" },
      { id: "12-orders", src: "/projects/vevuive/12-orders.webp", label: "Order Management", expectedFile: "12-orders.webp", slotPurpose: "Order history, ticket status, and cancellation.", aspectRatio: "16/10" },
      { id: "13-account", src: "/projects/vevuive/13-account.webp", label: "User Account & Profile", expectedFile: "13-account.webp", slotPurpose: "Profile, saved travelers, and notification settings.", aspectRatio: "16/10" },
      { id: "14-web-mobile-comparison", src: "/projects/vevuive/14-web-mobile-comparison.webp", label: "Web vs Mobile Parity", expectedFile: "14-web-mobile-comparison.webp", slotPurpose: "Web capability vs mobile-native solution comparison.", aspectRatio: "16/9" },
      { id: "15-states", src: "/projects/vevuive/15-states.webp", label: "Interaction States Matrix", expectedFile: "15-states.webp", slotPurpose: "Empty / loading / error / disabled / success states.", aspectRatio: "16/9" },
      { id: "16-prototype", src: "/projects/vevuive/16-prototype.webp", label: "Interactive Mobile Prototype", expectedFile: "16-prototype.webp", slotPurpose: "Interactive mobile and web prototype previews.", aspectRatio: "16/10" }
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