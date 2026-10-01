import {
  personalInfo as rawPersonalInfo,
  careerJourney as rawCareerJourney,
  workProcess as rawWorkProcess,
  capabilities as rawCapabilities,
  aiPositioning as rawAiPositioning,
  projects as rawProjects,
  portfolioCategories as rawCategories,
} from './projectsData.js';

// Fallback high-resolution thematic images matching each project's domain
export const domainFallbackCovers = {
  'ha-long-luxe': null,
  'vevuive': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  'ma-warehouse': null,
  'tourism-omnichannel': null,
  'insurance-integration': null,
  'smart-car-wash': null,
  'corporate-website': null,
};

export const projectCategoryMap = {
  'ha-long-luxe': 'Vertical SaaS',
  'vevuive': 'Travel & Booking',
  'ma-warehouse': 'Internal Operations',
  'tourism-omnichannel': 'Travel & Booking',
  'insurance-integration': 'Hybrid BA + UX',
  'smart-car-wash': 'Internal Operations',
  'corporate-website': 'Vertical SaaS',
};

export const personalInfo = {
  ...rawPersonalInfo,
  specialty: 'Business Analysis & UI/UX',
  stats: [
    { value: 'BA → UX', label: 'Business logic to interface' },
    { value: '7 Projects', label: 'Real product systems' },
    { value: 'Web · Mobile · Admin', label: 'Multi-platform experience' },
  ],
  socials: {
    dribbble: 'https://dribbble.com',
    behance: 'https://behance.net',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com/XuanHau-IUH',
    email: 'mailto:xuanhauk16@gmail.com',
  },
};

export const workProcess = rawWorkProcess;

export const portfolioCategories = rawCategories || [
  'All',
  'Vertical SaaS',
  'Travel & Booking',
  'Internal Operations',
  'Hybrid BA + UX',
];

export const portfolioProjects = rawProjects.map((p, idx) => ({
  ...p,
  id: parseInt(p.index, 10) || idx + 1,
  category: projectCategoryMap[p.slug] || p.tags?.[0] || 'Vertical SaaS',
  description: p.subtitle || p.summary,
  image: p.cover,
  fallbackImage: domainFallbackCovers[p.slug] || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  client: p.domain,
  link: '#',
}));

export const services = rawCapabilities.map((cap) => ({
  id: cap.id,
  title: cap.title,
  description: cap.description,
  skills: cap.skills,
}));

export const clientLogos = [
  { name: 'Techera', logoText: 'Techera' },
  { name: 'DOTB EdTech', logoText: 'DOTB' },
  { name: 'IS Group', logoText: 'IS Group' },
  { name: 'HPT Corporation', logoText: 'HPT' },
  { name: 'Ha Long Luxe', logoText: 'Ha Long Luxe' },
  { name: 'Vevuive', logoText: 'Vevuive' },
];

export const testimonials = [
  {
    id: 1,
    quote: rawPersonalInfo.designPhilosophy || 'Understand how the product works before deciding how it should look.',
    author: rawPersonalInfo.name,
    role: 'Product & System Design Philosophy',
    rating: 5,
    avatar: rawPersonalInfo.avatar || '/assets/avatar.webp',
  },
  {
    id: 2,
    quote: 'In complex multi-role workflows like our ticketing inventory and refund pipelines, Hau immediately caught edge cases and status dependencies that typical designers miss. The resulting admin flows were rock solid.',
    author: 'Lead Systems Engineer',
    role: 'DOTB EdTech & Ticketing',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    quote: 'Hau translated 14 complex cruise operations modules into clean, structured Figma components and responsive layouts. The handoff documentation made frontend execution seamless.',
    author: 'Product Manager',
    role: 'Ha Long Luxe Maritime SaaS',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'From Business Analyst to Product Designer: Designing with System Logic',
    excerpt: 'Why understanding entity relations, validation constraints, and business rules leads to more resilient UI architectures.',
    date: '2026',
    category: 'System UX',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read',
  },
  {
    id: 2,
    title: 'Why Feature Parity Does Not Mean Layout Parity Across Web & Mobile',
    excerpt: 'Adapting desktop data grids into mobile-native bottom sheets, thumb-friendly steppers, and contextual cards.',
    date: '2026',
    category: 'Mobile Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: 3,
    title: 'Three-Way Status Separation in Enterprise SaaS: Booking, Payment & Allocation',
    excerpt: 'How decoupling distinct business states prevents operational confusion in high-volume reservation manifests.',
    date: '2025',
    category: 'Enterprise SaaS',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: 'AI Accelerates Production, Not Judgment: A Pragmatic Product Workflow',
    excerpt: 'Integrating AI for requirement synthesis, ambiguity checks, and QA checklists while keeping core logic human-directed.',
    date: '2026',
    category: 'AI & Workflow',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
  },
];

export { rawCareerJourney as careerJourney, rawAiPositioning as aiPositioning, rawProjects as projects };
