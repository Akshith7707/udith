/** Career-specific resume content — Akshith-style structure */

export const SKILL_CATEGORY_MAP = {
  python: 'Languages',
  javascript: 'Languages',
  java: 'Languages',
  sql: 'Databases',
  ml: 'Backend & APIs',
  cloud: 'Tools & Platforms',
  react: 'Frontend',
  devops: 'Tools & Platforms',
  uiux: 'Frontend',
  graphic: 'Frontend',
  content: 'Core Strengths',
  video: 'Tools & Platforms',
  leadership: 'Core Strengths',
  teamwork: 'Core Strengths',
  project: 'Core Strengths',
  strategy: 'Core Strengths',
  analysis: 'Core Strengths',
  research: 'Core Strengths',
  problem: 'Core Strengths',
  critical: 'Core Strengths',
  communication: 'Core Strengths',
  presentation: 'Core Strengths',
  negotiation: 'Core Strengths',
  networking: 'Core Strengths',
  marketing: 'Core Strengths',
  sales: 'Core Strengths',
  finance: 'Core Strengths',
  product: 'Core Strengths',
  agile: 'Tools & Platforms',
  testing: 'Tools & Platforms',
};

export const CAREER_RESUME_CONTENT = {
  swe: {
    summary:
      'Full-stack developer focused on AI-enabled products, scalable web platforms, and automation workflows. Strong experience in React, Next.js, Node.js, Express, FastAPI, PostgreSQL, MongoDB, REST APIs, authentication, and deployment-ready application architecture.',
    projects: [
      {
        title: 'SkillSync AI — AI-Powered Job Matching Platform',
        stack: 'Next.js, Express.js, PostgreSQL, JWT',
        bullets: [
          'Developed AI-driven job platform with resume parsing, GitHub profile analysis, LLM-powered skill extraction, cover letter generation, and ATS feedback workflows.',
          'Implemented secure authentication, profile management, and recruiter-candidate matching APIs for scalable hiring pipelines.',
        ],
      },
      {
        title: 'Full-Stack E-Commerce Platform',
        stack: 'React, Node.js, Supabase, REST APIs',
        bullets: [
          'Built production-grade e-commerce platform with customer storefront, admin dashboard, and role-based access for admin, employee, and customer workflows.',
          'Designed secure order processing with server-side validations and Supabase-backed REST APIs.',
        ],
      },
      {
        title: 'SchedulAI — Appointment Booking Assistant',
        stack: 'Node.js, PostgreSQL, OpenAI',
        bullets: [
          'Developed AI booking assistant with appointment scheduling, reminders, and admin panel for availability management.',
          'Engineered backend scheduling logic and notification workflows to reduce manual booking operations.',
        ],
      },
    ],
    experience: {
      title: 'Full-Stack Developer',
      company: 'Freelance',
      bullets: [
        'Building production-grade web platforms with customer storefronts, admin dashboards, and secure API integrations.',
        'Delivering end-to-end features across frontend, backend, and deployment for client and personal product work.',
      ],
    },
    skillExtras: {
      Languages: ['TypeScript', 'HTML', 'CSS'],
      Frontend: ['Next.js', 'Tailwind CSS'],
      'Backend & APIs': ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
      Databases: ['PostgreSQL', 'MongoDB', 'MySQL'],
      'Tools & Platforms': ['Git', 'Postman', 'VS Code', 'Docker'],
    },
  },
  ds: {
    summary:
      'Data scientist with strong analytical foundation in Python, machine learning, and statistical modeling. Experienced in exploratory analysis, predictive modeling, and translating data insights into business recommendations.',
    projects: [
      {
        title: 'Predictive Analytics Dashboard',
        stack: 'Python, Pandas, Scikit-learn, PostgreSQL',
        bullets: [
          'Built end-to-end ML pipeline for sales forecasting with feature engineering and model evaluation dashboards.',
          'Delivered actionable insights through interactive visualizations and stakeholder-ready reports.',
        ],
      },
      {
        title: 'Customer Churn Analyzer',
        stack: 'Python, Jupyter, XGBoost, SQL',
        bullets: [
          'Developed classification models to identify at-risk customers with 87% validation accuracy.',
          'Automated ETL workflows and SQL queries for recurring analytics refresh cycles.',
        ],
      },
    ],
    experience: {
      title: 'Data Analytics Intern',
      company: 'Analytics Firm',
      bullets: [
        'Performed exploratory data analysis and built dashboards for client reporting deliverables.',
        'Supported A/B test design and hypothesis testing for product optimization initiatives.',
      ],
    },
    skillExtras: {
      Languages: ['Python', 'SQL', 'R'],
      'Backend & APIs': ['FastAPI', 'REST APIs'],
      Databases: ['PostgreSQL', 'MySQL'],
      'Tools & Platforms': ['Jupyter Notebook', 'Git', 'Tableau', 'Power BI'],
    },
  },
  pm: {
    summary:
      'Product-minded professional with experience in user research, roadmap planning, and cross-functional delivery. Skilled at translating user needs into prioritized features and measurable product outcomes.',
    projects: [
      {
        title: 'Product Launch Playbook',
        stack: 'Notion, Figma, Jira, Analytics',
        bullets: [
          'Led 0-to-1 product spec for a student productivity tool including user interviews and MVP prioritization.',
          'Defined success metrics, user stories, and sprint plans aligned with engineering capacity.',
        ],
      },
      {
        title: 'Feature Impact Study',
        stack: 'Mixpanel, SQL, A/B Testing',
        bullets: [
          'Ran experiment analysis on onboarding flow changes resulting in 18% improvement in activation rate.',
          'Synthesized qualitative feedback and quantitative data into executive summary recommendations.',
        ],
      },
    ],
    experience: {
      title: 'Product Management Intern',
      company: 'Product Company',
      bullets: [
        'Supported roadmap planning, sprint ceremonies, and stakeholder alignment across design and engineering.',
        'Documented PRDs, acceptance criteria, and release notes for multiple feature launches.',
      ],
    },
    skillExtras: {
      'Tools & Platforms': ['Jira', 'Figma', 'Notion', 'Google Analytics'],
      'Core Strengths': ['User Research', 'Roadmap Planning', 'Agile/Scrum', 'Stakeholder Management'],
    },
  },
  ux: {
    summary:
      'UX designer focused on user-centered design, research-driven workflows, and polished interface delivery. Experienced in wireframing, prototyping, usability testing, and design system collaboration.',
    projects: [
      {
        title: 'FinTech Mobile App Redesign',
        stack: 'Figma, User Research, Prototyping',
        bullets: [
          'Redesigned onboarding flow based on 12 user interviews, reducing drop-off in usability testing.',
          'Created high-fidelity prototypes and design specs for engineering handoff.',
        ],
      },
      {
        title: 'Design System Starter Kit',
        stack: 'Figma, Design Tokens, Accessibility',
        bullets: [
          'Built reusable component library with typography, color, and spacing tokens for consistent UI delivery.',
          'Applied WCAG contrast guidelines and documented interaction patterns for dev teams.',
        ],
      },
    ],
    experience: {
      title: 'UX Design Intern',
      company: 'Design Studio',
      bullets: [
        'Conducted user research sessions and synthesized findings into journey maps and wireframes.',
        'Participated in design critiques and iterated on mobile-first interface concepts.',
      ],
    },
    skillExtras: {
      Frontend: ['HTML', 'CSS', 'Figma', 'Wireframing'],
      'Tools & Platforms': ['FigJam', 'Miro', 'Adobe XD'],
      'Core Strengths': ['Usability Testing', 'Information Architecture', 'Visual Design'],
    },
  },
  consultant: {
    summary:
      'Analytical professional with strong business acumen, structured problem-solving, and executive communication skills. Experienced in market research, strategy frameworks, and data-driven recommendations.',
    projects: [
      {
        title: 'Market Entry Strategy Case',
        stack: 'Excel, PowerPoint, Market Research',
        bullets: [
          'Analyzed TAM/SAM/SOM for a D2C brand expansion with competitive benchmarking and pricing strategy.',
          'Presented MECE-structured recommendations to mock client panel with implementation roadmap.',
        ],
      },
      {
        title: 'Operations Efficiency Review',
        stack: 'Process Mapping, Data Analysis',
        bullets: [
          'Identified cost-saving opportunities through workflow analysis and KPI dashboard design.',
          'Built financial impact model projecting 15% efficiency gain over 12 months.',
        ],
      },
    ],
    experience: {
      title: 'Business Analyst Intern',
      company: 'Consulting Firm',
      bullets: [
        'Supported client engagements with research, slide preparation, and quantitative analysis.',
        'Facilitated stakeholder interviews and synthesized insights into actionable deliverables.',
      ],
    },
    skillExtras: {
      'Tools & Platforms': ['Excel', 'PowerPoint', 'Google Sheets'],
      'Core Strengths': ['Case Analysis', 'Financial Modeling', 'Strategic Planning', 'Presentation'],
    },
  },
  ai: {
    summary:
      'AI/ML engineer focused on intelligent systems, LLM applications, and production ML pipelines. Strong experience building AI recruitment tools, RAG workflows, voice interview automation, and scalable inference APIs.',
    projects: [
      {
        title: 'TalentFlow AI — Interview Automation Platform',
        stack: 'React, FastAPI, MongoDB, OpenAI',
        bullets: [
          'Built AI recruitment platform with automated voice interviews, resume screening, candidate scoring, and recruiter analytics dashboards.',
          'Integrated LLM-driven evaluation flows and structured interviewer feedback to accelerate candidate shortlisting decisions.',
        ],
      },
      {
        title: 'SkillSync AI — AI-Powered Job Matching Platform',
        stack: 'Next.js, Express.js, PostgreSQL, OpenAI',
        bullets: [
          'Developed AI platform with resume parsing, skill extraction, cover letter generation, and ATS feedback workflows.',
          'Implemented secure authentication and scalable matching APIs for hiring pipeline automation.',
        ],
      },
      {
        title: 'LeadGen Scraper — Business Lead Extraction Tool',
        stack: 'Python, Web Automation',
        bullets: [
          'Built Google Maps scraping pipeline to extract business contacts, ratings, and locations with export-ready structured datasets.',
          'Automated lead collection workflows for sales outreach and market research use cases.',
        ],
      },
    ],
    experience: {
      title: 'ML Engineering Intern',
      company: 'AI Product Team',
      bullets: [
        'Supported model training, evaluation, and deployment pipelines for production AI features.',
        'Collaborated on dataset curation, prompt engineering, and inference optimization tasks.',
      ],
    },
    skillExtras: {
      Languages: ['Python', 'TypeScript'],
      'Backend & APIs': ['FastAPI', 'REST APIs', 'OpenAI API'],
      Databases: ['PostgreSQL', 'MongoDB', 'ChromaDB', 'Supabase'],
      'Tools & Platforms': ['Git', 'Docker', 'Jupyter Notebook', 'Hugging Face'],
    },
  },
};

export function educationLabel(education, subjects) {
  const subj = (subjects || '').toLowerCase();
  if (subj.includes('computer') || subj.includes('cs') || subj.includes('it'))
    return 'B.E in Computer Science & Information Technology';
  if (subj.includes('math')) return 'B.Sc in Mathematics';
  if (subj.includes('business') || subj.includes('commerce')) return 'BBA';
  if (subj.includes('design')) return 'B.Des in Design';
  switch (education) {
    case 'PhD':
      return 'Ph.D.';
    case 'Post Graduate':
      return 'M.Tech / MBA';
    case 'Graduate':
      return 'Bachelor\'s Degree';
    case 'Undergraduate':
      return 'B.E / B.Tech';
    case '12th Pass':
      return 'Higher Secondary (12th)';
    case 'High School':
      return 'Secondary School Certificate';
    default:
      return 'Bachelor\'s Degree';
  }
}

export function collegeName(education) {
  if (education === '12th Pass' || education === 'High School') return 'Senior Secondary School';
  if (education === 'Post Graduate' || education === 'PhD') return 'Postgraduate Institute';
  return 'Engineering College';
}

export function timelineToDates(timeline) {
  const year = new Date().getFullYear();
  switch (timeline) {
    case 'immediate':
      return { start: `${year - 1}`, end: 'Present', gradYear: String(year + 1) };
    case '6months':
      return { start: `${year - 2}`, end: 'Present', gradYear: String(year + 1) };
    case '1year':
      return { start: `${year - 3}`, end: 'Present', gradYear: String(year + 1) };
    default:
      return { start: `${year - 3}`, end: 'Present', gradYear: String(year + 2) };
  }
}
