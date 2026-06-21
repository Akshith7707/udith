/** Long-term milestone keys shared across careers */
export const MILESTONE_KEYS = ['now', '6months', '1year', '3years', '5years'];

export const MILESTONE_META = [
  { key: 'now', label: 'Now', subtitle: 'Where you are today', icon: 'flag' },
  { key: '6months', label: '6 months', subtitle: 'Foundation phase', icon: 'layers' },
  { key: '1year', label: '1 year', subtitle: 'Job-ready skills', icon: 'code' },
  { key: '3years', label: '3 years', subtitle: 'Mid-level growth', icon: 'trending' },
  { key: '5years', label: '5 years', subtitle: 'Senior trajectory', icon: 'trophy' },
];

/** Learning links keyed by skill id — reused across roadmaps */
export const SKILL_LEARNING_RESOURCES = {
  python: [
    { title: 'Python for Everybody', platform: 'Coursera / free audit', url: 'https://www.coursera.org/specializations/python', type: 'course', free: true, duration: '8 weeks' },
    { title: 'Automate the Boring Stuff', platform: 'Book (free online)', url: 'https://automatetheboringstuff.com/', type: 'book', free: true, duration: 'Self-paced' },
    { title: 'Corey Schafer Python', platform: 'YouTube', url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU', type: 'video', free: true, duration: '40+ videos' },
  ],
  javascript: [
    { title: 'JavaScript.info', platform: 'Web tutorial', url: 'https://javascript.info/', type: 'course', free: true, duration: 'Self-paced' },
    { title: 'freeCodeCamp JS', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', type: 'course', free: true, duration: '300 hours' },
    { title: 'Traversy JS Crash Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c', type: 'video', free: true, duration: '1.5 hours' },
  ],
  java: [
    { title: 'Java Programming MOOC', platform: 'MOOC.fi', url: 'https://java-programming.mooc.fi/', type: 'course', free: true, duration: '12 weeks' },
    { title: 'Bro Code Java', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo', type: 'video', free: true, duration: '12 hours' },
  ],
  sql: [
    { title: 'SQLBolt', platform: 'Interactive tutorial', url: 'https://sqlbolt.com/', type: 'course', free: true, duration: '1–2 days' },
    { title: 'Mode SQL Tutorial', platform: 'Mode Analytics', url: 'https://mode.com/sql-tutorial/', type: 'course', free: true, duration: 'Self-paced' },
    { title: 'Khan Academy SQL', platform: 'Khan Academy', url: 'https://www.khanacademy.org/computing/computer-programming/sql', type: 'course', free: true, duration: '6 hours' },
  ],
  ml: [
    { title: 'Machine Learning Specialization', platform: 'Coursera / Andrew Ng', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'course', free: false, duration: '3 months' },
    { title: 'fast.ai Practical Deep Learning', platform: 'fast.ai', url: 'https://course.fast.ai/', type: 'course', free: true, duration: '7 weeks' },
    { title: '3Blue1Brown Neural Networks', platform: 'YouTube', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', type: 'video', free: true, duration: '4 hours' },
  ],
  cloud: [
    { title: 'AWS Cloud Practitioner', platform: 'AWS Skill Builder', url: 'https://skillbuilder.aws/learn', type: 'course', free: true, duration: '4 weeks' },
    { title: 'Google Cloud Skills Boost', platform: 'Google Cloud', url: 'https://www.cloudskillsboost.google/', type: 'course', free: true, duration: 'Self-paced' },
    { title: 'freeCodeCamp AWS', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=3hLmDS179YE', type: 'video', free: true, duration: '4 hours' },
  ],
  react: [
    { title: 'React Official Docs', platform: 'react.dev', url: 'https://react.dev/learn', type: 'course', free: true, duration: 'Self-paced' },
    { title: 'Scrimba React Course', platform: 'Scrimba', url: 'https://scrimba.com/learn/learnreact', type: 'course', free: true, duration: '15 hours' },
    { title: 'Meta Front-End Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', type: 'cert', free: false, duration: '7 months' },
  ],
  devops: [
    { title: 'DevOps Roadmap', platform: 'roadmap.sh', url: 'https://roadmap.sh/devops', type: 'guide', free: true, duration: 'Reference' },
    { title: 'Docker Getting Started', platform: 'Docker Docs', url: 'https://docs.docker.com/get-started/', type: 'course', free: true, duration: '2 days' },
    { title: 'TechWorld with Nana DevOps', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=7S1MY-Fl8CE', type: 'video', free: true, duration: '4 hours' },
  ],
  uiux: [
    { title: 'Google UX Design Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-ux-design', type: 'cert', free: false, duration: '6 months' },
    { title: 'Laws of UX', platform: 'lawsofux.com', url: 'https://lawsofux.com/', type: 'guide', free: true, duration: '1 hour' },
    { title: 'Figma Learn', platform: 'Figma', url: 'https://www.figma.com/resource-library/design-basics/', type: 'course', free: true, duration: 'Self-paced' },
  ],
  graphic: [
    { title: 'Canva Design School', platform: 'Canva', url: 'https://www.canva.com/designschool/', type: 'course', free: true, duration: 'Self-paced' },
    { title: 'Graphic Design Basics', platform: 'CalArts / Coursera', url: 'https://www.coursera.org/specializations/graphic-design', type: 'course', free: true, duration: '6 months' },
  ],
  product: [
    { title: 'Product Management Fundamentals', platform: 'Coursera', url: 'https://www.coursera.org/specializations/product-management', type: 'course', free: false, duration: '4 months' },
    { title: 'Lenny\'s Newsletter PM 101', platform: 'Substack', url: 'https://www.lennysnewsletter.com/', type: 'guide', free: true, duration: 'Ongoing' },
    { title: 'Reforge Product Strategy', platform: 'Reforge', url: 'https://www.reforge.com/', type: 'course', free: false, duration: '6 weeks' },
  ],
  leadership: [
    { title: 'Leadership Principles', platform: 'Amazon Careers', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', type: 'guide', free: true, duration: '1 hour' },
    { title: 'Manager Tools Podcast', platform: 'Manager Tools', url: 'https://www.manager-tools.com/', type: 'podcast', free: true, duration: 'Ongoing' },
  ],
  communication: [
    { title: 'Speaking with Confidence', platform: 'Coursera', url: 'https://www.coursera.org/learn/wharton-communication', type: 'course', free: true, duration: '4 weeks' },
    { title: 'Toastmasters International', platform: 'Toastmasters', url: 'https://www.toastmasters.org/', type: 'community', free: false, duration: 'Ongoing' },
  ],
  analysis: [
    { title: 'Google Data Analytics Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', type: 'cert', free: false, duration: '6 months' },
    { title: 'Kaggle Learn', platform: 'Kaggle', url: 'https://www.kaggle.com/learn', type: 'course', free: true, duration: 'Self-paced' },
    { title: 'Excel to Python for Analytics', platform: 'DataCamp', url: 'https://www.datacamp.com/', type: 'course', free: false, duration: '4 weeks' },
  ],
  research: [
    { title: 'Research Methods', platform: 'Coursera', url: 'https://www.coursera.org/learn/research-methods', type: 'course', free: true, duration: '4 weeks' },
    { title: 'Nielsen Norman UX Research', platform: 'NN/g', url: 'https://www.nngroup.com/articles/which-ux-research-methods/', type: 'guide', free: true, duration: '2 hours' },
  ],
  strategy: [
    { title: 'Business Strategy Specialization', platform: 'Coursera', url: 'https://www.coursera.org/specializations/business-strategy', type: 'course', free: false, duration: '5 months' },
    { title: 'Case Interview Prep', platform: 'CaseCoach', url: 'https://www.casecoach.com/', type: 'course', free: false, duration: '4 weeks' },
  ],
  presentation: [
    { title: 'Presentation Zen', platform: 'Book by Garr Reynolds', url: 'https://www.presentationzen.com/', type: 'book', free: true, duration: 'Reference' },
    { title: 'Slide Design Tips', platform: 'Duarte', url: 'https://www.duarte.com/resources/', type: 'guide', free: true, duration: '1 hour' },
  ],
  problem: [
    { title: 'LeetCode Explore', platform: 'LeetCode', url: 'https://leetcode.com/explore/', type: 'practice', free: true, duration: 'Ongoing' },
    { title: 'Cracking the Coding Interview', platform: 'Book', url: 'https://www.crackingthecodinginterview.com/', type: 'book', free: false, duration: '687 pages' },
    { title: 'NeetCode Roadmap', platform: 'neetcode.io', url: 'https://neetcode.io/roadmap', type: 'practice', free: true, duration: 'Ongoing' },
  ],
  agile: [
    { title: 'Scrum Guide', platform: 'scrum.org', url: 'https://scrumguides.org/scrum-guide.html', type: 'guide', free: true, duration: '30 min' },
    { title: 'Agile Manifesto', platform: 'agilemanifesto.org', url: 'https://agilemanifesto.org/', type: 'guide', free: true, duration: '15 min' },
    { title: 'Certified Scrum Master Prep', platform: 'Scrum Alliance', url: 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster', type: 'cert', free: false, duration: '2 days' },
  ],
  project: [
    { title: 'Google Project Management Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-project-management', type: 'cert', free: false, duration: '6 months' },
    { title: 'PMP Handbook', platform: 'PMI', url: 'https://www.pmi.org/certifications/project-management-pmp', type: 'guide', free: true, duration: 'Reference' },
  ],
  testing: [
    { title: 'Software Testing Tutorial', platform: 'Guru99', url: 'https://www.guru99.com/software-testing.html', type: 'course', free: true, duration: 'Self-paced' },
    { title: 'Playwright Getting Started', platform: 'Microsoft', url: 'https://playwright.dev/docs/intro', type: 'course', free: true, duration: '1 day' },
  ],
};

const sharedPhases = (careerTitle, skillFocus) => [
  {
    id: 'foundation',
    title: 'Foundation',
    period: 'Day 1–30',
    icon: 'book',
    color: '#0071e3',
    summary: `Build core concepts for ${careerTitle}. Focus on fundamentals before projects.`,
    weeks: [
      {
        week: 1,
        title: 'Orientation & setup',
        tasks: ['Set up dev environment & accounts', 'Complete career profiler skill audit', 'Pick 2 priority skills to start'],
        skillIds: skillFocus.slice(0, 1),
      },
      {
        week: 2,
        title: 'Core skill #1',
        tasks: ['Complete first module of primary course', 'Take notes & flashcards', 'Solve 5 practice exercises'],
        skillIds: skillFocus.slice(0, 1),
      },
      {
        week: 3,
        title: 'Core skill #2',
        tasks: ['Start secondary skill course', 'Join 1 community (Discord/Reddit)', 'Daily 1-hour study block'],
        skillIds: skillFocus.slice(1, 2),
      },
      {
        week: 4,
        title: 'Review & mini-project',
        tasks: ['Build a small practice project', 'Write a learning log', 'Self-assess with readiness quiz'],
        skillIds: skillFocus.slice(0, 2),
      },
    ],
  },
  {
    id: 'intermediate',
    title: 'Build & practice',
    period: 'Day 31–60',
    icon: 'hammer',
    color: '#34c759',
    summary: 'Apply skills through real projects. Start building portfolio pieces.',
    weeks: [
      {
        week: 5,
        title: 'Portfolio project kickoff',
        tasks: ['Define project scope & timeline', 'Create GitHub repo', 'Ship MVP feature'],
        skillIds: skillFocus.slice(0, 3),
      },
      {
        week: 6,
        title: 'Deep practice',
        tasks: ['Complete 10 practice problems / design exercises', 'Peer review or mentor feedback', 'Document learnings on LinkedIn'],
        skillIds: skillFocus.slice(1, 3),
      },
      {
        week: 7,
        title: 'Industry exposure',
        tasks: ['Read 3 job descriptions for target role', 'Attend 1 webinar or meetup', 'Update resume with new skills'],
        skillIds: skillFocus,
      },
      {
        week: 8,
        title: 'Project polish',
        tasks: ['Finish portfolio project', 'Write README & demo video', 'Get feedback from community'],
        skillIds: skillFocus.slice(0, 2),
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Launch & apply',
    period: 'Day 61–90',
    icon: 'rocket',
    color: '#ff9f0a',
    summary: 'Interview prep, applications, and networking for your first role.',
    weeks: [
      {
        week: 9,
        title: 'Interview prep',
        tasks: ['Practice 20 role-specific questions', 'Mock interview with peer', 'Study company culture & values'],
        skillIds: skillFocus.slice(0, 2),
      },
      {
        week: 10,
        title: 'Applications',
        tasks: ['Apply to 10 targeted roles/internships', 'Customize resume per application', 'Track in spreadsheet'],
        skillIds: [],
      },
      {
        week: 11,
        title: 'Networking',
        tasks: ['Connect with 5 professionals on LinkedIn', 'Book 1 mentor session', 'Contribute to open source or community'],
        skillIds: [],
      },
      {
        week: 12,
        title: 'Review & next steps',
        tasks: ['Reflect on 90-day progress', 'Set next quarter goals', 'Celebrate wins & plan upskilling'],
        skillIds: skillFocus,
      },
    ],
  },
];

export const CAREER_ROADMAPS = {
  swe: {
    milestoneTemplates: {
      now: {
        title: 'Assess & orient',
        description: 'Understand your starting point and pick a learning stack.',
        goals: ['Complete skill gap analysis', 'Set up GitHub & VS Code', 'Commit to 1 hour/day study'],
        checklist: ['Profiler done', 'Top 3 missing skills identified', 'Learning schedule blocked on calendar'],
      },
      '6months': {
        title: 'Junior-ready fundamentals',
        description: 'Solid grasp of one language, DSA basics, and 2 portfolio projects.',
        goals: ['Finish 2 full-stack or backend projects', '100+ LeetCode easy/medium', 'Contribute to open source'],
        checklist: ['GitHub with 2+ repos', 'LinkedIn updated', 'Can explain any project in interview'],
      },
      '1year': {
        title: 'First role secured',
        description: 'Land internship or entry-level SWE role.',
        goals: ['Offer from startup or IT company', 'Onboard to team workflows', 'Ship code to production'],
        checklist: ['Offer letter', 'First PR merged', 'Agile/Scrum familiarity'],
      },
      '3years': {
        title: 'Mid-level engineer',
        description: 'Own features end-to-end, mentor juniors, system design basics.',
        goals: ['Lead a feature squad', 'System design interview ready', 'Salary ₹15–25L range'],
        checklist: ['Promotion or role change', 'Tech talk or blog post', 'Cross-team collaboration'],
      },
      '5years': {
        title: 'Senior / staff trajectory',
        description: 'Architect systems, drive technical decisions, optional leadership path.',
        goals: ['Senior SWE or tech lead', 'Design scalable systems', '₹35L+ or FAANG equivalent'],
        checklist: ['Architecture ownership', 'Mentoring track record', 'Industry recognition'],
      },
    },
    phases: sharedPhases('Software Engineer', ['python', 'javascript', 'sql', 'problem', 'agile']),
    featuredResources: [
      { title: 'CS50', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard', free: true },
      { title: 'freeCodeCamp Full Stack', url: 'https://www.freecodecamp.org/', platform: 'freeCodeCamp', free: true },
      { title: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap', platform: 'NeetCode', free: true },
    ],
  },
  ds: {
    milestoneTemplates: {
      now: { title: 'Math & Python refresh', description: 'Rebuild stats, linear algebra, and Python for data work.', goals: ['Python pandas fluency', 'Stats refresher', 'Kaggle account setup'], checklist: ['Jupyter installed', 'Completed Kaggle intro', '3 datasets explored'] },
      '6months': { title: 'ML practitioner', description: 'End-to-end ML projects with clean notebooks.', goals: ['3 Kaggle notebooks', 'ML course completed', 'SQL for analytics'], checklist: ['Portfolio on GitHub', 'Can explain bias/variance', 'Feature engineering practice'] },
      '1year': { title: 'Data Scientist role', description: 'Join analytics or DS team.', goals: ['Junior DS or analyst role', 'A/B testing experience', 'Stakeholder presentations'], checklist: ['First model in production', 'Dashboard built', 'Business impact story'] },
      '3years': { title: 'Senior DS', description: 'Lead experiments, ML pipelines, cross-functional impact.', goals: ['Own ML roadmap area', 'Mentor analysts', '₹25–40L range'], checklist: ['Published internal best practices', 'Cost-saving or revenue model', 'Conference talk'] },
      '5years': { title: 'Lead / Principal DS', description: 'Strategy, team building, advanced ML systems.', goals: ['Head of analytics or principal', 'LLM/GenAI expertise', '₹45L+'], checklist: ['Team of 3+', 'Executive stakeholder trust', 'Patent or paper optional'] },
    },
    phases: sharedPhases('Data Scientist', ['python', 'ml', 'analysis', 'sql', 'research']),
    featuredResources: [
      { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', platform: 'Kaggle', free: true },
      { title: 'fast.ai Course', url: 'https://course.fast.ai/', platform: 'fast.ai', free: true },
      { title: 'StatQuest YouTube', url: 'https://www.youtube.com/@statquest', platform: 'YouTube', free: true },
    ],
  },
  pm: {
    milestoneTemplates: {
      now: { title: 'PM foundations', description: 'Learn product thinking, user research basics, and agile.', goals: ['Read Inspired by Marty Cagan', 'Shadow a PM if possible', 'Learn Figma basics'], checklist: ['Product case studies read', 'PRD template saved', 'Agile cert started'] },
      '6months': { title: 'Associate PM ready', description: 'Ship a product spec and run a mock sprint.', goals: ['Write 2 PRDs', 'Run user interviews', 'Metrics framework knowledge'], checklist: ['Mock product portfolio', 'SQL basics for PMs', 'Roadmap exercise done'] },
      '1year': { title: 'Product Manager role', description: 'Own a feature or product area.', goals: ['APM or PM at startup', 'Ship feature to users', 'Cross-functional leadership'], checklist: ['Feature shipped', 'Retention or engagement metric moved', 'Retro facilitated'] },
      '3years': { title: 'Senior PM', description: 'Own product line, strategy, and team alignment.', goals: ['Lead squad of 8–12', 'OKR ownership', '₹25–45L range'], checklist: ['P&L awareness', 'Exec presentations', 'Hiring PMs'] },
      '5years': { title: 'Group PM / Director', description: 'Multi-product strategy and org leadership.', goals: ['Director of Product', 'Portfolio decisions', '₹50L+'], checklist: ['Team of PMs', 'Board-level metrics', 'Category strategy'] },
    },
    phases: sharedPhases('Product Manager', ['product', 'leadership', 'communication', 'analysis', 'strategy']),
    featuredResources: [
      { title: 'Lenny\'s Newsletter', url: 'https://www.lennysnewsletter.com/', platform: 'Substack', free: true },
      { title: 'Product School Resources', url: 'https://productschool.com/free-product-management-resources/', platform: 'Product School', free: true },
      { title: 'Google PM Certificate', url: 'https://www.coursera.org/professional-certificates/google-project-management', platform: 'Coursera', free: false },
    ],
  },
  ux: {
    milestoneTemplates: {
      now: { title: 'Design fundamentals', description: 'Learn UX principles, Figma, and usability basics.', goals: ['Figma proficiency', 'Complete 1 UX course', 'Build eye for good UI'], checklist: ['Figma account', '5 app critiques written', 'Design system study'] },
      '6months': { title: 'Portfolio ready', description: '2–3 case studies with research and prototypes.', goals: ['3 case studies on Behance/Dribbble', 'Usability test conducted', 'Design handoff experience'], checklist: ['Portfolio site live', 'Responsive designs', 'Accessibility basics'] },
      '1year': { title: 'UX Designer role', description: 'Join product team as junior UX designer.', goals: ['In-house or agency role', 'Ship designs to production', 'User research ownership'], checklist: ['Design in prod app', 'Research synthesis doc', 'Stakeholder buy-in'] },
      '3years': { title: 'Senior UX', description: 'Lead design for product area, mentor juniors.', goals: ['Design system contribution', 'Researching/sprint lead', '₹18–30L range'], checklist: ['Design critiques lead', 'A/B test designs', 'Cross-market research'] },
      '5years': { title: 'Design Lead / Director', description: 'Design org leadership and brand vision.', goals: ['Head of Design or Principal', 'Design culture builder', '₹35L+'], checklist: ['Team of designers', 'Brand refresh led', 'Exec design partner'] },
    },
    phases: sharedPhases('UX Designer', ['uiux', 'graphic', 'research', 'communication', 'problem']),
    featuredResources: [
      { title: 'Figma Learn', url: 'https://www.figma.com/resource-library/design-basics/', platform: 'Figma', free: true },
      { title: 'Laws of UX', url: 'https://lawsofux.com/', platform: 'lawsofux.com', free: true },
      { title: 'Google UX Certificate', url: 'https://www.coursera.org/professional-certificates/google-ux-design', platform: 'Coursera', free: false },
    ],
  },
  consultant: {
    milestoneTemplates: {
      now: { title: 'Business acumen build', description: 'Case prep, frameworks, and presentation skills.', goals: ['Learn MECE & pyramid principle', 'Read case interview books', 'Excel/PPT mastery'], checklist: ['10 case drills', 'Framework cheat sheet', 'Current affairs habit'] },
      '6months': { title: 'Interview ready', description: 'Pass case rounds for analyst roles.', goals: ['50+ cases practiced', 'Mock with peers', 'Networking with consultants'], checklist: ['Case buddy group', 'Fit stories prepared', 'Referrals sought'] },
      '1year': { title: 'Analyst / Associate', description: 'Join Big 4 or boutique consulting.', goals: ['Offer from target firm', 'First client project', 'Slide deck excellence'], checklist: ['Staffed on engagement', 'Client feedback positive', 'Travel readiness'] },
      '3years': { title: 'Consultant / Senior Analyst', description: 'Own workstreams, manage clients.', goals: ['Promotion to Consultant', 'Industry specialization', '₹20–35L range'], checklist: ['Workstream lead', 'Proposal contribution', 'MBA/BA optional planned'] },
      '5years': { title: 'Manager / Principal', description: 'Sell work, lead teams, partner track.', goals: ['Manager at MBB or Big 4', 'P&L on accounts', '₹40L+'], checklist: ['Sales support', 'Team of 4+', 'Thought leadership'] },
    },
    phases: sharedPhases('Management Consultant', ['analysis', 'strategy', 'presentation', 'problem', 'communication']),
    featuredResources: [
      { title: 'CaseCoach', url: 'https://www.casecoach.com/', platform: 'CaseCoach', free: false },
      { title: 'Victor Cheng Case Interview', url: 'https://www.caseinterview.com/', platform: 'CaseInterview.com', free: true },
      { title: 'Management Consulted', url: 'https://managementconsulted.com/', platform: 'MC', free: true },
    ],
  },
  ai: {
    milestoneTemplates: {
      now: { title: 'ML & math foundations', description: 'Deep learning basics, Python, linear algebra refresh.', goals: ['Neural net intuition', 'PyTorch or TensorFlow intro', 'Cloud GPU access'], checklist: ['GPU notebook setup', 'MNIST project done', 'Paper reading habit'] },
      '6months': { title: 'ML engineer portfolio', description: 'Deploy models, LLM apps, MLOps basics.', goals: ['3 deployed models', 'RAG or fine-tune project', 'Docker + cloud deploy'], checklist: ['Hugging Face profile', 'MLflow or W&B tracking', 'API endpoint live'] },
      '1year': { title: 'AI/ML Engineer role', description: 'Production ML at product company.', goals: ['ML engineer offer', 'Model monitoring experience', 'Cross-team ML integration'], checklist: ['Model in prod', 'Latency optimized', 'Data pipeline owned'] },
      '3years': { title: 'Senior ML Engineer', description: 'Architecture for ML systems, LLM products.', goals: ['Lead ML platform area', 'GenAI product shipped', '₹30–50L range'], checklist: ['MLOps maturity', 'Team mentorship', 'Open source contribution'] },
      '5years': { title: 'Staff / ML Architect', description: 'Org-wide AI strategy and research direction.', goals: ['Principal engineer or AI lead', 'Research to prod pipeline', '₹60L+'], checklist: ['AI roadmap owner', 'Patents/papers', 'Industry speaker'] },
    },
    phases: sharedPhases('AI/ML Engineer', ['python', 'ml', 'cloud', 'research', 'problem']),
    featuredResources: [
      { title: 'fast.ai', url: 'https://course.fast.ai/', platform: 'fast.ai', free: true },
      { title: 'Hugging Face Course', url: 'https://huggingface.co/learn/nlp-course', platform: 'Hugging Face', free: true },
      { title: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/', platform: 'DeepLearning.AI', free: true },
    ],
  },
};
