import {
  Braces,
  Layout,
  Server,
  Database,
  Sparkles,
  Wrench,
  Building2,
  FileCheck2,
  Cpu,
  Boxes,
  GraduationCap,
  ShieldCheck,
  Workflow,
  Layers3,
} from 'lucide-react'

/**
 * Single source of truth for every CV-derived fact on the site.
 * Source: Tamilarasan_Premium_ATS_Resume_Updated.pdf
 * Update this file when the CV changes — every section reads from it.
 */

export const profile = {
  name: 'Tamilarasan M',
  nameLead: 'Tamil',
  nameTail: 'arasan',
  role: 'Software Developer',
  headline: 'Software Developer · ERP · AI Accounting · Vue.js · Phoenix · Elixir',
  rotatingRoles: [
    'Software Developer',
    'ERP Systems Engineer',
    'AI Accounting Developer',
    'Vue.js + Phoenix Specialist',
  ],
  location: 'Chennai, India',
  experienceYears: '2+',
  summary:
    'Software Developer with 2+ years of experience building enterprise web applications, Trade ERP systems, GST/e-Invoice integrations, and AI-powered accounting solutions.',
  summaryExtended:
    'Experienced in Vue.js, JavaScript, Phoenix Framework, Elixir, PostgreSQL, MySQL, and REST APIs. Strong background in workflow automation, API integration, multi-module business applications, database optimization, and translating business requirements into production-ready software.',
  email: 'Tamilmit46tech@gmail.com',
  phone: '+91 8754851566',
  phoneHref: 'tel:+918754851566',
  /**
   * WhatsApp click-to-chat. `number` must be full international format with no
   * '+', spaces or dashes — that is what wa.me expects.
   */
  whatsapp: {
    number: '918754851566',
    display: '+91 87548 51566',
    greeting:
      "Hi Tamilarasan, I found your portfolio and I'd like to talk about an opportunity.",
  },
  /**
   * Resolved against the Vite base path, so the link is correct whether the
   * site is served from the domain root (Docker, Cloudflare) or from a
   * GitHub Pages project subpath (/<repo>/). A leading-slash literal would
   * 404 on Pages.
   */
  resumeUrl: `${import.meta.env.BASE_URL}Tamilarasan_CV.pdf`,
  links: {
    linkedin: 'https://www.linkedin.com/in/tamilarasan-m-566892266',
    github: 'https://github.com/Tamilarasan-46',
  },
} as const

/** Headline numbers — each one traceable to a line in the CV. */
export const stats = [
  { value: '2+', label: 'Years Experience', hint: 'Mar 2024 — Present' },
  { value: '04', label: 'Flagship Projects', hint: 'ERP · AI · Compliance' },
  { value: '02', label: 'Certifications', hint: 'SQL · Frontend' },
  { value: '8.29', label: 'B.Tech CGPA', hint: 'Information Technology' },
] as const

/** "What I Do" — the three domains the CV actually evidences. */
export const focusAreas = [
  {
    icon: Building2,
    accent: 'brand' as const,
    title: 'Enterprise ERP',
    body: 'Purchasing, sales, inventory, trade operations and reporting modules used in day-to-day business.',
  },
  {
    icon: Sparkles,
    accent: 'beam' as const,
    title: 'AI Accounting',
    body: 'Building Tiybe — a multi-tenant cloud accounting platform with AI-assisted workflows.',
  },
  {
    icon: FileCheck2,
    accent: 'flare' as const,
    title: 'Compliance & APIs',
    body: 'Government-compliant e-Invoice integration, GST tax automation and secure REST APIs.',
  },
] as const

export const skillCategories = [
  {
    title: 'Languages',
    icon: Braces,
    accent: 'brand' as const,
    skills: ['C', 'Java', 'JavaScript', 'Elixir', 'Python', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: Layout,
    accent: 'beam' as const,
    skills: ['Vue.js', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    accent: 'flare' as const,
    skills: ['Phoenix Framework', 'Django', 'REST APIs'],
  },
  {
    title: 'Databases',
    icon: Database,
    accent: 'solar' as const,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Domain Expertise',
    icon: Workflow,
    accent: 'brand' as const,
    skills: ['ERP', 'SaaS', 'AI-assisted Accounting', 'GST', 'e-Invoice', 'Workflow Automation'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    accent: 'beam' as const,
    skills: ['Git', 'VS Code', 'Postman'],
  },
] as const

/**
 * Depth, not invented percentages. A self-reported "Vue.js 90%" tells a reader
 * nothing and cannot be verified; how often something is actually used can be.
 */
export const stackTiers = [
  {
    title: 'Daily driver',
    blurb: 'The stack I open every morning and ship in.',
    accent: 'brand' as const,
    items: [
      'Vue.js',
      'JavaScript',
      'Elixir',
      'Phoenix Framework',
      'PostgreSQL',
      'SQL',
      'REST APIs',
      'Git',
    ],
  },
  {
    title: 'Shipped in production',
    blurb: 'Used to deliver real features, just not every day.',
    accent: 'beam' as const,
    items: ['Python', 'MySQL', 'MongoDB', 'HTML5', 'CSS3', 'Bootstrap', 'Postman', 'VS Code'],
  },
  {
    title: 'Domain depth',
    blurb: 'Business rules I have implemented, not just read about.',
    accent: 'flare' as const,
    items: ['ERP', 'GST', 'e-Invoice', 'AI-assisted Accounting', 'SaaS', 'Workflow Automation'],
  },
  {
    title: 'Foundations',
    blurb: 'Studied formally and built with, outside the day-to-day stack.',
    accent: 'solar' as const,
    items: ['C', 'Java', 'Django'],
  },
] as const

export const currentlyBuilding =
  'Currently building Tiybe — an AI-powered cloud accounting platform'

export const experience = [
  {
    title: 'Software Developer',
    company: 'Tectalik — From Human To AI',
    location: 'Chennai, India',
    period: 'March 2024 — Present',
    type: 'Full-time',
    summary:
      'Designing, developing and maintaining enterprise Trade ERP modules and an AI-powered cloud accounting platform — across frontend, API integration and database layers.',
    technologies: [
      'Vue.js',
      'JavaScript',
      'Elixir',
      'Phoenix',
      'Python',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
    ],
    groups: [
      {
        icon: Building2,
        label: 'ERP & Business Workflows',
        points: [
          'Designed, developed and maintained enterprise Trade ERP modules supporting day-to-day business operations.',
          'Developed business workflows covering purchasing, sales, inventory management, trade operations and reporting.',
        ],
      },
      {
        icon: Layout,
        label: 'Frontend Engineering',
        points: [
          'Built responsive user interfaces using Vue.js and integrated secure REST APIs with Phoenix backend services.',
          'Improved maintainability through reusable Vue components and modular application architecture.',
        ],
      },
      {
        icon: ShieldCheck,
        label: 'Compliance & Integration',
        points: [
          'Implemented government-compliant e-Invoice integration with API providers, including acknowledgement processing and error handling.',
          'Contributed to GST-related accounting functionality and tax workflow automation.',
        ],
      },
      {
        icon: Sparkles,
        label: 'AI Accounting Platform',
        points: [
          'Currently developing Tiybe, an AI-powered cloud accounting platform with modules for organisations, subscriptions, accounting, taxation and business management.',
        ],
      },
      {
        icon: Database,
        label: 'Data & Performance',
        points: [
          'Worked extensively with PostgreSQL and MySQL for schema design, query optimization and data management.',
        ],
      },
      {
        icon: Boxes,
        label: 'Delivery & Collaboration',
        points: [
          'Collaborated with product managers, QA engineers and backend developers throughout the software development lifecycle.',
          'Resolved production issues, implemented enhancements and participated in feature planning.',
        ],
      },
    ],
  },
] as const

/** Measured impact carried forward from earlier resume revisions. */
export const impactMetrics = [
  { value: '99%', label: 'Data Accuracy' },
  { value: '40%', label: 'Faster Load Times' },
  { value: '70%', label: 'Less Manual Entry' },
  { value: '4x', label: 'Faster Processing' },
] as const

export const achievements = [
  'Delivered enterprise features used in real-world business applications.',
  'Built scalable frontend modules and integrated backend APIs.',
  'Contributed to AI-powered accounting software development.',
  'Implemented compliance-focused GST and e-Invoice functionality.',
  'Worked across frontend, backend integration and database optimization.',
] as const

export type ProjectAccess = 'private' | 'academic'

export const projects = [
  {
    title: 'Tiybe — AI Accounting Platform',
    tagline: 'Multi-tenant SaaS · In active development',
    description:
      'A multi-tenant SaaS accounting application featuring AI-assisted accounting workflows, subscription management, organisation management, taxation modules, dashboards and secure backend APIs.',
    period: '2025 — Present',
    category: 'AI · SaaS Platform',
    icon: Sparkles,
    accent: 'beam' as const,
    status: 'In Development',
    access: 'private' as ProjectAccess,
    image: null,
    features: [
      'AI-assisted accounting workflows across organisations and subscriptions',
      'Taxation modules and dashboards built on secure backend APIs',
      'Multi-tenant architecture with per-organisation data isolation',
    ],
    technologies: ['Elixir', 'Phoenix', 'Python', 'Vue.js', 'PostgreSQL', 'REST APIs'],
  },
  {
    title: 'Trade ERP Platform',
    tagline: 'Enterprise resource planning for trade operations',
    description:
      'Enterprise ERP features for trade management including purchasing, sales, inventory, reporting and workflow automation with REST API integrations.',
    period: 'Mar 2024 — Present',
    category: 'Enterprise ERP',
    icon: Building2,
    accent: 'brand' as const,
    status: 'Shipped',
    access: 'private' as ProjectAccess,
    image: null,
    features: [
      'Purchasing, sales and inventory modules serving daily business operations',
      'Workflow automation that removes repetitive manual data entry',
      'Reporting layer backed by optimized PostgreSQL queries',
    ],
    technologies: ['Vue.js', 'JavaScript', 'Elixir', 'Phoenix', 'PostgreSQL', 'MySQL'],
  },
  {
    title: 'GST & e-Invoice Integration',
    tagline: 'Government-compliant invoicing pipeline',
    description:
      'Invoice generation, API integration, acknowledgement processing and compliance-related workflows for business users.',
    period: '2024 — 2025',
    category: 'Compliance · Integration',
    icon: FileCheck2,
    accent: 'flare' as const,
    status: 'Shipped',
    access: 'private' as ProjectAccess,
    image: null,
    features: [
      'e-Invoice generation integrated with government-approved API providers',
      'Acknowledgement processing with structured error handling',
      'GST tax workflow automation feeding downstream accounting entries',
    ],
    technologies: ['Elixir', 'Phoenix', 'REST APIs', 'GST', 'e-Invoice'],
  },
  {
    title: 'Sign Language Translation System',
    tagline: 'Academic project · Accessibility',
    description:
      'A Django-based application that converted speech and text into sign language using NLP and speech processing.',
    period: 'Jan — Apr 2024',
    category: 'AI / ML · Academic',
    icon: Cpu,
    accent: 'solar' as const,
    status: 'Academic',
    access: 'academic' as ProjectAccess,
    image: `${import.meta.env.BASE_URL}project-signlanguage.jpg`,
    features: [
      'Voice input denoised and converted to text via a trained speech-to-text module',
      'NLP pipeline mapping text directly to sign language gestures in real time',
      'Built to improve accessibility and independence for hearing-impaired users',
    ],
    technologies: ['Django', 'Python', 'NLP', 'Speech Recognition'],
  },
] as const

export const education = [
  {
    degree: 'B.Tech — Information Technology',
    institution: 'New Prince Shri Bhavani College of Engineering and Technology',
    location: 'Chennai, India',
    period: '2020 — 2024',
    grade: 'CGPA 8.29',
    icon: GraduationCap,
    accent: 'brand' as const,
  },
] as const

export const certifications = [
  {
    title: 'SQL Certification',
    issuer: 'Alan Kay Coding Club',
    date: 'October 2023',
    credentialUrl:
      'https://drive.google.com/file/d/1lborUsj0aCLXq3WGqZY-IHSeVfVTKVHw/view?usp=sharing',
    skills: ['SQL syntax', 'Joins (INNER, LEFT, RIGHT, FULL, SELF)', 'Query optimization'],
    icon: Database,
    accent: 'beam' as const,
  },
  {
    title: 'Frontend Development',
    issuer: 'Skillup',
    date: 'February 2024',
    credentialUrl:
      'https://drive.google.com/file/d/1kDlz8nJUga0cmrNFUGvDa2rfN-gxzvAt/view?usp=sharing',
    skills: ['HTML', 'CSS', 'Responsive design', 'Flexbox', 'Grid', 'UI/UX principles'],
    icon: Layers3,
    accent: 'flare' as const,
  },
] as const

/**
 * Tailwind-safe accent lookup. Tailwind can only see class names it can read
 * statically, so accents are resolved through this map instead of interpolated.
 */
export const accentClass = {
  brand: {
    text: 'text-brand',
    bgSoft: 'bg-brand/10',
    bgSofter: 'bg-brand/5',
    border: 'border-brand/30',
    borderHover: 'hover:border-brand/50',
    dot: 'bg-brand',
    glow: 'from-brand/10',
  },
  beam: {
    text: 'text-beam',
    bgSoft: 'bg-beam/10',
    bgSofter: 'bg-beam/5',
    border: 'border-beam/30',
    borderHover: 'hover:border-beam/50',
    dot: 'bg-beam',
    glow: 'from-beam/10',
  },
  flare: {
    text: 'text-flare',
    bgSoft: 'bg-flare/10',
    bgSofter: 'bg-flare/5',
    border: 'border-flare/30',
    borderHover: 'hover:border-flare/50',
    dot: 'bg-flare',
    glow: 'from-flare/10',
  },
  solar: {
    text: 'text-solar',
    bgSoft: 'bg-solar/10',
    bgSofter: 'bg-solar/5',
    border: 'border-solar/30',
    borderHover: 'hover:border-solar/50',
    dot: 'bg-solar',
    glow: 'from-solar/10',
  },
} as const

export type AccentKey = keyof typeof accentClass
