import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown, ChevronRight, Play, MessageCircle, X, Send, Bookmark, BookmarkCheck,
  Star, Clock, Users, TrendingUp, Briefcase, GraduationCap, Code, Palette, LineChart,
  Brain, Heart, Building2, Microscope, Scale, Film, BookOpen, Cpu, Leaf, UtensilsCrossed,
  Trophy, Menu, Sparkles, Target, Zap, Award, MapPin, Calendar, DollarSign, ExternalLink,
  Check, ArrowRight, Rocket, Globe, Shield, Lightbulb, Settings, Home, Mail, Phone
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// DATA CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const SKILLS_DATA = [
  { id: 'python', name: 'Python', category: 'Technical' },
  { id: 'javascript', name: 'JavaScript', category: 'Technical' },
  { id: 'java', name: 'Java', category: 'Technical' },
  { id: 'sql', name: 'SQL & Databases', category: 'Technical' },
  { id: 'ml', name: 'Machine Learning', category: 'Technical' },
  { id: 'cloud', name: 'Cloud Computing', category: 'Technical' },
  { id: 'react', name: 'React/Frontend', category: 'Technical' },
  { id: 'devops', name: 'DevOps', category: 'Technical' },
  { id: 'uiux', name: 'UI/UX Design', category: 'Creative' },
  { id: 'graphic', name: 'Graphic Design', category: 'Creative' },
  { id: 'content', name: 'Content Writing', category: 'Creative' },
  { id: 'video', name: 'Video Editing', category: 'Creative' },
  { id: 'leadership', name: 'Leadership', category: 'Leadership' },
  { id: 'teamwork', name: 'Team Management', category: 'Leadership' },
  { id: 'project', name: 'Project Management', category: 'Leadership' },
  { id: 'strategy', name: 'Strategic Planning', category: 'Leadership' },
  { id: 'analysis', name: 'Data Analysis', category: 'Analytical' },
  { id: 'research', name: 'Research', category: 'Analytical' },
  { id: 'problem', name: 'Problem Solving', category: 'Analytical' },
  { id: 'critical', name: 'Critical Thinking', category: 'Analytical' },
  { id: 'communication', name: 'Communication', category: 'Soft Skills' },
  { id: 'presentation', name: 'Presentation', category: 'Soft Skills' },
  { id: 'negotiation', name: 'Negotiation', category: 'Soft Skills' },
  { id: 'networking', name: 'Networking', category: 'Soft Skills' },
  { id: 'marketing', name: 'Digital Marketing', category: 'Business' },
  { id: 'sales', name: 'Sales', category: 'Business' },
  { id: 'finance', name: 'Financial Analysis', category: 'Business' },
  { id: 'product', name: 'Product Management', category: 'Business' },
  { id: 'agile', name: 'Agile/Scrum', category: 'Methodology' },
  { id: 'testing', name: 'Software Testing', category: 'Technical' },
];

const CAREER_DOMAINS = [
  { id: 'tech', name: 'Technology', icon: Cpu, color: '#00F5FF', subcareers: ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Cloud Architect', 'Cybersecurity Analyst'] },
  { id: 'design', name: 'Design', icon: Palette, color: '#FF4D6D', subcareers: ['UX Designer', 'Product Designer', 'Graphic Designer', 'Motion Designer', 'Design Lead'] },
  { id: 'finance', name: 'Finance', icon: LineChart, color: '#10B981', subcareers: ['Investment Banker', 'Financial Analyst', 'CA', 'Risk Manager', 'Wealth Manager'] },
  { id: 'healthcare', name: 'Healthcare', icon: Heart, color: '#F43F5E', subcareers: ['Doctor', 'Nurse', 'Healthcare Admin', 'Pharmacist', 'Medical Researcher'] },
  { id: 'law', name: 'Law', icon: Scale, color: '#8B5CF6', subcareers: ['Corporate Lawyer', 'Litigation', 'IP Lawyer', 'Legal Consultant', 'Judge'] },
  { id: 'media', name: 'Media', icon: Film, color: '#F59E0B', subcareers: ['Journalist', 'Content Creator', 'Film Director', 'PR Specialist', 'Social Media Manager'] },
  { id: 'education', name: 'Education', icon: BookOpen, color: '#3B82F6', subcareers: ['Teacher', 'Professor', 'Ed-Tech', 'Curriculum Designer', 'Education Counselor'] },
  { id: 'engineering', name: 'Engineering', icon: Settings, color: '#6366F1', subcareers: ['Mechanical Engineer', 'Civil Engineer', 'Electrical Engineer', 'Chemical Engineer', 'Aerospace Engineer'] },
  { id: 'science', name: 'Science', icon: Microscope, color: '#14B8A6', subcareers: ['Research Scientist', 'Biotechnologist', 'Physicist', 'Chemist', 'Environmental Scientist'] },
  { id: 'business', name: 'Business', icon: Building2, color: '#EC4899', subcareers: ['Management Consultant', 'Entrepreneur', 'Business Analyst', 'Operations Manager', 'CEO'] },
  { id: 'arts', name: 'Arts', icon: Sparkles, color: '#A855F7', subcareers: ['Artist', 'Musician', 'Actor', 'Writer', 'Curator'] },
  { id: 'government', name: 'Government', icon: Shield, color: '#0EA5E9', subcareers: ['IAS Officer', 'IPS Officer', 'Diplomat', 'Policy Analyst', 'Public Administrator'] },
  { id: 'sports', name: 'Sports', icon: Trophy, color: '#EAB308', subcareers: ['Athlete', 'Sports Manager', 'Coach', 'Sports Journalist', 'Fitness Trainer'] },
  { id: 'agriculture', name: 'Agriculture', icon: Leaf, color: '#22C55E', subcareers: ['Agronomist', 'Agricultural Scientist', 'Farm Manager', 'Food Technologist', 'Agribusiness'] },
  { id: 'hospitality', name: 'Hospitality', icon: UtensilsCrossed, color: '#F97316', subcareers: ['Hotel Manager', 'Chef', 'Event Planner', 'Tourism Manager', 'Airline Crew'] },
];

const CAREER_PATHS = [
  {
    id: 'swe',
    title: 'Software Engineer',
    icon: '💻',
    matchPercent: 94,
    reasons: ['Strong programming skills', 'Problem-solving aptitude', 'Tech passion alignment'],
    salaryRange: '₹6L - ₹50L+',
    trend: 'hot',
    requiredSkills: ['python', 'javascript', 'sql', 'problem', 'agile'],
    description: 'Build software applications and systems that power the digital world.',
  },
  {
    id: 'ds',
    title: 'Data Scientist',
    icon: '📊',
    matchPercent: 89,
    reasons: ['Analytical mindset', 'Statistical knowledge', 'ML interest'],
    salaryRange: '₹8L - ₹45L+',
    trend: 'hot',
    requiredSkills: ['python', 'ml', 'analysis', 'sql', 'research'],
    description: 'Extract insights from data to drive business decisions.',
  },
  {
    id: 'pm',
    title: 'Product Manager',
    icon: '🚀',
    matchPercent: 86,
    reasons: ['Leadership potential', 'Strategic thinking', 'User empathy'],
    salaryRange: '₹12L - ₹60L+',
    trend: 'rising',
    requiredSkills: ['product', 'leadership', 'communication', 'analysis', 'strategy'],
    description: 'Lead product vision and strategy from ideation to launch.',
  },
  {
    id: 'ux',
    title: 'UX Designer',
    icon: '🎨',
    matchPercent: 82,
    reasons: ['Creative flair', 'User-centric approach', 'Visual skills'],
    salaryRange: '₹5L - ₹35L+',
    trend: 'rising',
    requiredSkills: ['uiux', 'graphic', 'research', 'communication', 'problem'],
    description: 'Design intuitive and delightful user experiences.',
  },
  {
    id: 'consultant',
    title: 'Management Consultant',
    icon: '📈',
    matchPercent: 78,
    reasons: ['Analytical skills', 'Business acumen', 'Communication'],
    salaryRange: '₹10L - ₹50L+',
    trend: 'stable',
    requiredSkills: ['analysis', 'strategy', 'presentation', 'problem', 'communication'],
    description: 'Advise organizations on business strategy and operations.',
  },
  {
    id: 'ai',
    title: 'AI/ML Engineer',
    icon: '🤖',
    matchPercent: 91,
    reasons: ['Deep tech interest', 'Mathematical foundation', 'Innovation drive'],
    salaryRange: '₹10L - ₹70L+',
    trend: 'hot',
    requiredSkills: ['python', 'ml', 'cloud', 'research', 'problem'],
    description: 'Build intelligent systems that learn and adapt.',
  },
];

const MENTORS = [
  {
    id: 1,
    name: 'Priya Sharma',
    title: 'Senior Engineering Manager',
    company: 'Google',
    experience: 12,
    expertise: ['Software Engineering', 'System Design', 'Career Growth'],
    rating: 4.9,
    reviews: 156,
    available: true,
    bio: 'Former startup founder turned Google EM. Passionate about helping engineers navigate their career paths and build impactful products.',
    avatar: 'PS',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    title: 'Principal Data Scientist',
    company: 'Microsoft',
    experience: 10,
    expertise: ['Data Science', 'Machine Learning', 'AI Strategy'],
    rating: 4.8,
    reviews: 124,
    available: true,
    bio: 'PhD in ML from IIT Delhi. Built AI products used by millions. Love mentoring the next generation of data leaders.',
    avatar: 'RV',
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    title: 'VP of Product',
    company: 'Flipkart',
    experience: 14,
    expertise: ['Product Management', 'E-commerce', 'Leadership'],
    rating: 4.9,
    reviews: 198,
    available: false,
    bio: 'Product leader with experience across Amazon, Swiggy, and Flipkart. Expert in 0-1 product building and scaling.',
    avatar: 'AR',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    title: 'Design Director',
    company: 'Razorpay',
    experience: 11,
    expertise: ['UX Design', 'Design Systems', 'Fintech'],
    rating: 4.7,
    reviews: 89,
    available: true,
    bio: 'Built design teams at multiple unicorns. Specializes in fintech UX and creating world-class design cultures.',
    avatar: 'VS',
  },
];

const RESOURCES = {
  courses: [
    { id: 1, title: 'Complete Python Developer', platform: 'Udemy', duration: '40 hours', difficulty: 'Beginner', rating: 4.7, free: false, icon: '🐍' },
    { id: 2, title: 'CS50: Introduction to Computer Science', platform: 'Harvard/edX', duration: '12 weeks', difficulty: 'Beginner', rating: 4.9, free: true, icon: '🎓' },
    { id: 3, title: 'Machine Learning Specialization', platform: 'Coursera', duration: '3 months', difficulty: 'Intermediate', rating: 4.8, free: false, icon: '🤖' },
    { id: 4, title: 'Google UX Design Certificate', platform: 'Coursera', duration: '6 months', difficulty: 'Beginner', rating: 4.8, free: false, icon: '🎨' },
    { id: 5, title: 'Full Stack Web Development', platform: 'freeCodeCamp', duration: '300 hours', difficulty: 'Intermediate', rating: 4.6, free: true, icon: '🌐' },
    { id: 6, title: 'AWS Solutions Architect', platform: 'A Cloud Guru', duration: '50 hours', difficulty: 'Advanced', rating: 4.7, free: false, icon: '☁️' },
  ],
  books: [
    { id: 1, title: 'Clean Code', platform: 'Robert C. Martin', duration: '464 pages', difficulty: 'Intermediate', rating: 4.7, free: false, icon: '📕' },
    { id: 2, title: 'Cracking the Coding Interview', platform: 'Gayle McDowell', duration: '687 pages', difficulty: 'Intermediate', rating: 4.8, free: false, icon: '📘' },
    { id: 3, title: 'The Lean Startup', platform: 'Eric Ries', duration: '336 pages', difficulty: 'Beginner', rating: 4.5, free: false, icon: '📗' },
    { id: 4, title: 'Design of Everyday Things', platform: 'Don Norman', duration: '368 pages', difficulty: 'Beginner', rating: 4.6, free: false, icon: '📙' },
    { id: 5, title: 'Zero to One', platform: 'Peter Thiel', duration: '224 pages', difficulty: 'Beginner', rating: 4.5, free: false, icon: '📕' },
    { id: 6, title: 'Atomic Habits', platform: 'James Clear', duration: '320 pages', difficulty: 'Beginner', rating: 4.8, free: false, icon: '📘' },
  ],
  certifications: [
    { id: 1, title: 'AWS Certified Solutions Architect', platform: 'Amazon', duration: '3-6 months', difficulty: 'Advanced', rating: 4.8, free: false, icon: '🏆' },
    { id: 2, title: 'Google Cloud Professional', platform: 'Google', duration: '3-6 months', difficulty: 'Advanced', rating: 4.7, free: false, icon: '🏆' },
    { id: 3, title: 'PMP Certification', platform: 'PMI', duration: '3-6 months', difficulty: 'Advanced', rating: 4.6, free: false, icon: '🏆' },
    { id: 4, title: 'Certified Scrum Master', platform: 'Scrum Alliance', duration: '2-4 weeks', difficulty: 'Intermediate', rating: 4.5, free: false, icon: '🏆' },
    { id: 5, title: 'Meta Front-End Developer', platform: 'Meta/Coursera', duration: '7 months', difficulty: 'Intermediate', rating: 4.7, free: false, icon: '🏆' },
    { id: 6, title: 'TensorFlow Developer', platform: 'Google', duration: '2-3 months', difficulty: 'Advanced', rating: 4.6, free: false, icon: '🏆' },
  ],
  youtube: [
    { id: 1, title: 'Fireship', platform: 'YouTube', duration: '100+ videos', difficulty: 'All Levels', rating: 4.9, free: true, icon: '🔥' },
    { id: 2, title: 'Traversy Media', platform: 'YouTube', duration: '500+ videos', difficulty: 'All Levels', rating: 4.8, free: true, icon: '📺' },
    { id: 3, title: 'CS Dojo', platform: 'YouTube', duration: '100+ videos', difficulty: 'Beginner', rating: 4.7, free: true, icon: '🥋' },
    { id: 4, title: 'TechLead', platform: 'YouTube', duration: '300+ videos', difficulty: 'All Levels', rating: 4.5, free: true, icon: '👨‍💻' },
    { id: 5, title: '3Blue1Brown', platform: 'YouTube', duration: '100+ videos', difficulty: 'Intermediate', rating: 4.9, free: true, icon: '📐' },
    { id: 6, title: 'CodeWithHarry', platform: 'YouTube', duration: '1000+ videos', difficulty: 'All Levels', rating: 4.8, free: true, icon: '🇮🇳' },
  ],
  communities: [
    { id: 1, title: 'r/cscareerquestions', platform: 'Reddit', duration: '2M+ members', difficulty: 'All Levels', rating: 4.5, free: true, icon: '🤝' },
    { id: 2, title: 'Dev.to', platform: 'Web', duration: '1M+ members', difficulty: 'All Levels', rating: 4.6, free: true, icon: '💻' },
    { id: 3, title: 'Hashnode', platform: 'Web', duration: '500K+ members', difficulty: 'All Levels', rating: 4.5, free: true, icon: '✍️' },
    { id: 4, title: 'Discord: Reactiflux', platform: 'Discord', duration: '200K+ members', difficulty: 'Intermediate', rating: 4.7, free: true, icon: '⚛️' },
    { id: 5, title: 'LinkedIn Tech Groups', platform: 'LinkedIn', duration: '5M+ members', difficulty: 'All Levels', rating: 4.4, free: true, icon: '💼' },
    { id: 6, title: 'Stack Overflow', platform: 'Web', duration: '20M+ users', difficulty: 'All Levels', rating: 4.8, free: true, icon: '📚' },
  ],
};

const TESTIMONIALS = [
  {
    quote: "NexusCareer helped me transition from a confused BCA graduate to landing my dream job at Google. The personalized roadmap was a game-changer!",
    author: "Arjun Mehta",
    transition: "BCA Graduate → Google SWE",
    rating: 5,
  },
  {
    quote: "I was stuck in a dead-end sales job. NexusCareer identified my hidden potential in product management. Now I'm a PM at Razorpay!",
    author: "Sneha Patel",
    transition: "Sales Executive → Razorpay PM",
    rating: 5,
  },
  {
    quote: "The skill gap analyzer showed me exactly what I was missing. 6 months later, I cracked my first data science role at Amazon.",
    author: "Karthik Iyer",
    transition: "Mechanical Engineer → Amazon Data Scientist",
    rating: 5,
  },
];

const TRENDING_SKILLS = [
  'Python', 'AI/ML', 'Cloud Computing', 'React', 'Data Analytics', 'Kubernetes', 'Cybersecurity',
  'Blockchain', 'DevOps', 'TypeScript', 'Go', 'Rust', 'AWS', 'Azure', 'TensorFlow', 'LLMs',
  'Prompt Engineering', 'System Design', 'Microservices', 'GraphQL'
];

const CHAT_RESPONSES = {
  default: "Hello! I'm NexusAI, your career intelligence assistant. I can help you with career guidance, skill recommendations, and job market insights. What would you like to know?",
  career: "Based on current market trends, the most in-demand careers in India are: Software Engineering, Data Science, Product Management, Cloud Architecture, and AI/ML Engineering. Would you like me to analyze which suits your profile best?",
  salary: "Tech salaries in India have grown 15-20% YoY. Entry-level SWE: ₹6-15L, Mid-level: ₹15-35L, Senior: ₹35-70L+. FAANG companies and top startups pay premium packages. Want specific insights for your target role?",
  skills: "The top skills to learn in 2024 are: 1) AI/ML & LLMs, 2) Cloud (AWS/GCP/Azure), 3) Full-stack development, 4) System Design, 5) Data Engineering. I can create a personalized learning path based on your goals!",
};

// ═══════════════════════════════════════════════════════════════════════════════
// PARTICLE CANVAS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: ['#00F5FF', '#8B5CF6', '#FF4D6D'][Math.floor(Math.random() * 3)],
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 8, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundary wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 * (1 - dist2 / 120)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// RADAR CHART COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function RadarChart({ values, labels }) {
  const size = 300;
  const center = size / 2;
  const radius = 120;
  const angleStep = (2 * Math.PI) / labels.length;

  const points = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (v / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid circles */}
      {[20, 40, 60, 80, 100].map((r) => (
        <circle
          key={r}
          cx={center}
          cy={center}
          r={(r / 100) * radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      ))}
      {/* Axis lines */}
      {labels.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}
      {/* Data polygon */}
      <path
        d={pathD}
        fill="rgba(0, 245, 255, 0.2)"
        stroke="#00F5FF"
        strokeWidth="2"
        className="transition-all duration-500"
      />
      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#00F5FF" className="drop-shadow-[0_0_8px_#00F5FF]" />
      ))}
      {/* Labels */}
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelR = radius + 30;
        return (
          <text
            key={i}
            x={center + labelR * Math.cos(angle)}
            y={center + labelR * Math.sin(angle)}
            fill="#94a3b8"
            fontSize="11"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CIRCULAR PROGRESS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function CircularProgress({ percent, size = 120, strokeWidth = 8, color = '#00F5FF' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
        style={{ filter: `drop-shadow(0 0 10px ${color})` }}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN NEXUSCAREER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function NexusCareer() {
  // State management
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    skills: [],
    passions: { technology: 50, arts: 50, business: 50, science: 50, social: 50, finance: 50, health: 50, education: 50 },
    salary: 1000000,
    workStyle: 'hybrid',
    timeline: '6months',
    subjects: '',
    gpa: '',
    extracurricular: '',
  });
  const [activeCareer, setActiveCareer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeResourceTab, setActiveResourceTab] = useState('courses');
  const [bookmarks, setBookmarks] = useState([]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'bot', content: CHAT_RESPONSES.default }]);
  const [chatInput, setChatInput] = useState('');
  const [visibleSections, setVisibleSections] = useState({});
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [milestones, setMilestones] = useState({
    now: 'Current Position',
    '6months': 'Learn core skills',
    '1year': 'First role in field',
    '3years': 'Mid-level position',
    '5years': 'Senior/Lead role',
  });
  const [expandedMentor, setExpandedMentor] = useState(null);

  const heroWords = ['DESTINY', 'PURPOSE', 'CALLING', 'FUTURE'];
  const heroColors = ['#00F5FF', '#8B5CF6', '#FF4D6D', '#10B981'];

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
      setNavScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [heroWords.length]);

  // Testimonial auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Quiz handlers
  const handleSkillToggle = (skillId) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter((s) => s !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  const handlePassionChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      passions: { ...prev.passions, [key]: value },
    }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setQuizCompleted(true);
    }, 3000);
  };

  // Chat handlers
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.toLowerCase();
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    // Add typing indicator
    setChatMessages((prev) => [...prev, { role: 'bot', content: '...', typing: true }]);

    try {
      // Call the AI API
      const response = await fetch('https://api.featherless.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer rc_8cad9e3f8bfc3ff04770f0c6889e3c4af225d4b6aa2dfba34e8fd9b3e21adf4a',
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-7B-Instruct',
          max_tokens: 512,
          messages: [
            { 
              role: 'system', 
              content: 'You are NexusAI, a helpful career advisor for Indian professionals and students. Provide concise, actionable career advice focused on the Indian job market. Keep responses under 150 words.' 
            },
            { role: 'user', content: chatInput }
          ],
        }),
      });

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || 'I apologize, I couldn\'t process that. Please try asking about careers, skills, or salaries.';
      
      // Remove typing indicator and add response
      setChatMessages((prev) => [...prev.slice(0, -1), { role: 'bot', content: botResponse }]);
    } catch {
      // Fallback to hardcoded responses
      let response = CHAT_RESPONSES.default;
      if (userMessage.includes('career') || userMessage.includes('job')) response = CHAT_RESPONSES.career;
      else if (userMessage.includes('salary') || userMessage.includes('pay')) response = CHAT_RESPONSES.salary;
      else if (userMessage.includes('skill') || userMessage.includes('learn')) response = CHAT_RESPONSES.skills;
      
      setChatMessages((prev) => [...prev.slice(0, -1), { role: 'bot', content: response }]);
    }
  };

  // Bookmark handler
  const toggleBookmark = (resourceId) => {
    setBookmarks((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId]
    );
  };

  // Calculate match percentage based on skills
  const getCareerMatch = (career) => {
    const userSkills = formData.skills;
    const matchedSkills = career.requiredSkills.filter((s) => userSkills.includes(s));
    const baseMatch = career.matchPercent;
    const skillBonus = (matchedSkills.length / career.requiredSkills.length) * 20;
    const jitter = (career.id.length + userSkills.length) % 5;
    return Math.min(99, Math.round(baseMatch + skillBonus - 10 + jitter));
  };

  // Get skill gap
  const getSkillGap = (career) => {
    const userSkills = formData.skills;
    const have = career.requiredSkills.filter((s) => userSkills.includes(s));
    const need = career.requiredSkills.filter((s) => !userSkills.includes(s));
    return { have, need };
  };

  const selectedCareer = CAREER_PATHS.find((c) => c.id === activeCareer) || CAREER_PATHS[0];
  const skillGap = getSkillGap(selectedCareer);

  return (
    <div className="min-h-screen bg-[#020817] text-gray-100 overflow-x-hidden grid-pattern">
      {/* Noise Overlay */}
      <svg className="noise-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#FF4D6D]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="font-orbitron text-xl font-bold gradient-text">NexusCareer</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Profiler', 'Careers', 'Resources', 'Mentors'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-gray-300 hover:text-white transition-colors group"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#00F5FF] group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 text-[#00F5FF] border border-[#00F5FF] rounded-lg hover:bg-[#00F5FF]/10 transition-all">
              Sign In
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] rounded-lg font-semibold hover:scale-105 active:scale-95 transition-all neon-cyan">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4">
            {['Home', 'Profiler', 'Careers', 'Resources', 'Mentors'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />

        {/* Floating Career Badges - Desktop Only */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {['Software Engineer', 'Data Scientist', 'UX Designer', 'Product Manager', 'AI Researcher', 'Entrepreneur'].map(
            (role, i) => (
              <div
                key={role}
                className="absolute left-1/2 top-1/2 glass px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  animation: `orbit ${20 + i * 5}s linear infinite`,
                  animationDelay: `${i * -3}s`,
                  transform: `rotate(${i * 60}deg) translateX(${280 + i * 30}px) rotate(-${i * 60}deg)`,
                }}
              >
                {role}
              </div>
            )
          )}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div
            className={`transition-all duration-700 ${visibleSections.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-8xl font-black mb-4">
              <span className="text-white">FIND YOUR</span>
              <br />
              <span
                className="typewriter-cursor inline-block transition-all duration-500"
                style={{ color: heroColors[heroWordIndex] }}
              >
                {heroWords[heroWordIndex]}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              AI-powered career intelligence. Built for the ambitious.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#profiler"
                className="px-8 py-4 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] rounded-xl font-orbitron font-bold text-lg hover:scale-105 active:scale-95 transition-all neon-cyan flex items-center justify-center gap-2"
              >
                Begin Your Journey <ArrowRight className="w-5 h-5" />
              </a>
              <button className="px-8 py-4 border border-gray-600 rounded-xl font-orbitron font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#00F5FF]" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          CAREER DNA PROFILER
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="profiler" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visibleSections.profiler ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Map Your Career DNA
            </h2>
            <p className="text-gray-400 text-lg">Complete your mission briefing to unlock personalized insights</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-white'
                      : 'bg-white/10 text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] transition-all duration-500"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Quiz Steps */}
          <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Step 1: Identity */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 1: IDENTITY</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00F5FF] transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00F5FF] transition-all"
                      placeholder="Your age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Education Level</label>
                    <div className="flex flex-wrap gap-3">
                      {['High School', '12th Pass', 'Undergraduate', 'Graduate', 'Post Graduate', 'PhD'].map((edu) => (
                        <button
                          key={edu}
                          onClick={() => setFormData({ ...formData, education: edu })}
                          className={`px-4 py-2 rounded-full border transition-all ${
                            formData.education === edu
                              ? 'bg-[#00F5FF] border-[#00F5FF] text-black'
                              : 'border-white/20 hover:border-[#00F5FF]'
                          }`}
                        >
                          {edu}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Skills Matrix */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 2: SKILLS MATRIX</h3>
                <p className="text-gray-400">Select all skills you possess (minimum 3)</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {SKILLS_DATA.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => handleSkillToggle(skill.id)}
                      className={`px-3 py-2 rounded-xl text-sm border transition-all relative overflow-hidden ${
                        formData.skills.includes(skill.id)
                          ? 'bg-gradient-to-r from-[#00F5FF]/20 to-[#8B5CF6]/20 border-[#00F5FF] text-white pulse-glow'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {formData.skills.includes(skill.id) && (
                        <Check className="absolute top-1 right-1 w-4 h-4 text-[#00F5FF]" />
                      )}
                      {skill.name}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Selected: {formData.skills.length} skills</p>
              </div>
            )}

            {/* Step 3: Passion Radar */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 3: PASSION RADAR</h3>
                <p className="text-gray-400">Adjust sliders to map your interests</p>
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <RadarChart
                    values={Object.values(formData.passions)}
                    labels={['Technology', 'Arts', 'Business', 'Science', 'Social', 'Finance', 'Health', 'Education']}
                  />
                  <div className="flex-1 space-y-4 w-full">
                    {Object.entries(formData.passions).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{key}</span>
                          <span className="text-[#00F5FF]">{value}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => handlePassionChange(key, parseInt(e.target.value))}
                          className="w-full accent-[#00F5FF]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Goals & Constraints */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 4: GOALS & CONSTRAINTS</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Expected Salary: ₹{(formData.salary / 100000).toFixed(1)}L/year
                    </label>
                    <input
                      type="range"
                      min="300000"
                      max="10000000"
                      step="100000"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) })}
                      className="w-full accent-[#00F5FF]"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₹3L</span>
                      <span>₹1Cr+</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Work Style Preference</label>
                    <div className="flex gap-3">
                      {['remote', 'hybrid', 'onsite'].map((style) => (
                        <button
                          key={style}
                          onClick={() => setFormData({ ...formData, workStyle: style })}
                          className={`flex-1 py-3 rounded-xl border capitalize transition-all ${
                            formData.workStyle === style
                              ? 'bg-[#00F5FF] border-[#00F5FF] text-black'
                              : 'border-white/20 hover:border-[#00F5FF]'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Timeline</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'immediate', label: 'Immediate' },
                        { id: '6months', label: '6 Months' },
                        { id: '1year', label: '1 Year' },
                        { id: 'longterm', label: 'Long-term' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setFormData({ ...formData, timeline: t.id })}
                          className={`py-3 rounded-xl border transition-all ${
                            formData.timeline === t.id
                              ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white'
                              : 'border-white/20 hover:border-[#8B5CF6]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Academic Snapshot */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 5: ACADEMIC SNAPSHOT</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Strong Subjects</label>
                    <input
                      type="text"
                      value={formData.subjects}
                      onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00F5FF] transition-all"
                      placeholder="e.g., Mathematics, Computer Science, Physics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">GPA / Percentage</label>
                    <input
                      type="text"
                      value={formData.gpa}
                      onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00F5FF] transition-all"
                      placeholder="e.g., 8.5 CGPA or 85%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Extra-curricular Activities</label>
                    <textarea
                      value={formData.extracurricular}
                      onChange={(e) => setFormData({ ...formData, extracurricular: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00F5FF] transition-all h-24 resize-none"
                      placeholder="Coding clubs, hackathons, sports, volunteering..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-white/20 rounded-xl disabled:opacity-50 hover:bg-white/5 transition-all"
              >
                Previous
              </button>
              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                  className="px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleAnalyze}
                  className="px-8 py-3 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Brain className="w-5 h-5" /> Analyze My Profile
                </button>
              )}
            </div>
          </div>

          {/* Analyzing Animation */}
          {isAnalyzing && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#00F5FF]/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#00F5FF] animate-spin" />
                  <Brain className="absolute inset-0 m-auto w-12 h-12 text-[#00F5FF] animate-pulse" />
                </div>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-2">Analyzing Your Profile</h3>
                <p className="text-gray-400">NexusAI is mapping your career DNA...</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          AI CAREER RECOMMENDATIONS
          ═══════════════════════════════════════════════════════════════════════════════ */}
      {quizCompleted && (
        <section id="recommendations" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
                Your AI Career Matches
              </h2>
              <p className="text-gray-400 text-lg">NexusAI has identified 6 optimal career paths for you</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAREER_PATHS.map((career, index) => {
                const matchPercent = getCareerMatch(career);
                return (
                  <div
                    key={career.id}
                    className={`glass rounded-2xl p-6 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,245,255,0.2)] transition-all duration-300 cursor-pointer relative overflow-hidden shimmer-hover ${
                      activeCareer === career.id ? 'ring-2 ring-[#00F5FF]' : ''
                    }`}
                    onClick={() => setActiveCareer(career.id)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{career.icon}</div>
                      <div className="relative">
                        <CircularProgress percent={matchPercent} size={60} strokeWidth={4} />
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                          {matchPercent}%
                        </span>
                      </div>
                    </div>

                    <h3 className="font-orbitron text-xl font-bold mb-2">{career.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{career.description}</p>

                    <div className="space-y-2 mb-4">
                      {career.reasons.map((reason, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-[#00F5FF]" />
                          {reason}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#10B981]">{career.salaryRange}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          career.trend === 'hot'
                            ? 'bg-red-500/20 text-red-400'
                            : career.trend === 'rising'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {career.trend === 'hot' ? '🔥 Hot' : career.trend === 'rising' ? '📈 Rising' : '✅ Stable'}
                      </span>
                    </div>

                    <button className="w-full mt-4 py-2 border border-[#00F5FF] text-[#00F5FF] rounded-lg hover:bg-[#00F5FF]/10 transition-all flex items-center justify-center gap-2">
                      Explore Path <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════════
          CAREER EXPLORER
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="careers" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visibleSections.careers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Explore 50+ Career Universes
            </h2>
            <p className="text-gray-400 text-lg">Click on any domain to discover career paths within</p>
          </div>

          {/* Hexagonal Grid */}
          <div className="flex flex-wrap justify-center gap-4">
            {CAREER_DOMAINS.map((domain) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.id}
                  onClick={() => {
                    setActiveCareer(domain.id);
                    setDrawerOpen(true);
                  }}
                  className="w-32 h-36 sm:w-40 sm:h-44 relative cursor-pointer group"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      border: `2px solid ${domain.color}40`,
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" style={{ color: domain.color }} />
                    <span className="text-sm font-medium text-center px-2">{domain.name}</span>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: `0 0 30px ${domain.color}40`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Drawer */}
        {drawerOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setDrawerOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] glass z-50 overflow-y-auto p-6">
              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>

              {(() => {
                const domain = CAREER_DOMAINS.find((d) => d.id === activeCareer);
                if (!domain) return null;
                const Icon = domain.icon;
                return (
                  <div className="mt-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${domain.color}20` }}>
                        <Icon className="w-8 h-8" style={{ color: domain.color }} />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-2xl font-bold">{domain.name}</h3>
                        <p className="text-gray-400">{domain.subcareers.length} career paths</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-[#00F5FF]">Popular Careers</h4>
                        <div className="space-y-2">
                          {domain.subcareers.map((career) => (
                            <div key={career} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                              {career}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-[#00F5FF]">Salary Range</h4>
                        <p className="text-gray-300">₹4L - ₹80L+ depending on role and experience</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-[#00F5FF]">Top Companies</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Swiggy'].map((company) => (
                            <span key={company} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-[#00F5FF]">A Day in the Life</h4>
                        <p className="text-gray-400 text-sm">
                          Professionals in {domain.name.toLowerCase()} typically spend their days solving complex problems,
                          collaborating with teams, and driving innovation in their respective fields.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SKILL GAP ANALYZER
          ═══════════════════════════════════════════════════════════════════════════════ */}
      {quizCompleted && (
        <section id="skillgap" className="py-20 px-4 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
                Your Skill Gap Report
              </h2>
              <p className="text-gray-400 text-lg">For: {selectedCareer.title}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* You Have */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-[#10B981] flex items-center gap-2">
                  <Check className="w-6 h-6" /> You Have
                </h3>
                <div className="space-y-3">
                  {skillGap.have.length > 0 ? (
                    skillGap.have.map((skillId) => {
                      const skill = SKILLS_DATA.find((s) => s.id === skillId);
                      return (
                        <div key={skillId} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="text-sm mb-1">{skill?.name}</div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-[#10B981] w-4/5 rounded-full" />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">Complete the profiler to see your skills</p>
                  )}
                </div>
              </div>

              {/* Readiness Score */}
              <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center">
                <h3 className="font-orbitron text-xl font-bold mb-6">Readiness Score</h3>
                <div className="relative">
                  <CircularProgress
                    percent={Math.round((skillGap.have.length / selectedCareer.requiredSkills.length) * 100)}
                    size={180}
                    strokeWidth={12}
                    color="#8B5CF6"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-orbitron text-4xl font-bold">
                      {Math.round((skillGap.have.length / selectedCareer.requiredSkills.length) * 100)}%
                    </span>
                    <span className="text-gray-400 text-sm">Ready</span>
                  </div>
                </div>
              </div>

              {/* You Need */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-orbitron text-xl font-bold mb-4 text-[#FF4D6D] flex items-center gap-2">
                  <Target className="w-6 h-6" /> You Need
                </h3>
                <div className="space-y-3">
                  {skillGap.need.map((skillId) => {
                    const skill = SKILLS_DATA.find((s) => s.id === skillId);
                    return (
                      <div key={skillId} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="text-sm mb-1">{skill?.name}</div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#FF4D6D]/50 w-1/4 rounded-full" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 90-Day Roadmap */}
            <div className="mt-12 glass rounded-2xl p-6">
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-center">Your 90-Day Upskill Roadmap</h3>
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#FF4D6D]" />
                <div className="flex justify-between relative">
                  {[
                    { phase: 'Foundation', days: 'Day 1-30', icon: '📚' },
                    { phase: 'Intermediate', days: 'Day 31-60', icon: '🚀' },
                    { phase: 'Advanced', days: 'Day 61-90', icon: '🎯' },
                  ].map((stage, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#020817] border-4 border-[#00F5FF] flex items-center justify-center text-2xl mb-2 pulse-glow">
                        {stage.icon}
                      </div>
                      <span className="font-orbitron font-bold">{stage.phase}</span>
                      <span className="text-gray-400 text-sm">{stage.days}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════════
          LEARNING RESOURCES HUB
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="resources" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visibleSections.resources ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Curated Learning Pathways
            </h2>
            <p className="text-gray-400 text-lg">Hand-picked resources to accelerate your growth</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['courses', 'books', 'certifications', 'youtube', 'communities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveResourceTab(tab)}
                className={`px-4 py-2 rounded-full capitalize transition-all ${
                  activeResourceTab === tab
                    ? 'bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter */}
          <div className="flex justify-center mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
                className="accent-[#00F5FF]"
              />
              <span className="text-gray-400">Show free resources only</span>
            </label>
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES[activeResourceTab]
              ?.filter((r) => !showFreeOnly || r.free)
              .map((resource) => (
                <div
                  key={resource.id}
                  className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all relative overflow-hidden shimmer-hover"
                >
                  <button
                    onClick={() => toggleBookmark(`${activeResourceTab}-${resource.id}`)}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    {bookmarks.includes(`${activeResourceTab}-${resource.id}`) ? (
                      <BookmarkCheck className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{resource.platform}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {resource.duration}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        resource.difficulty === 'Beginner'
                          ? 'bg-green-500/20 text-green-400'
                          : resource.difficulty === 'Intermediate'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {resource.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(resource.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="text-sm ml-1">{resource.rating}</span>
                    </div>
                    <span className={`text-sm ${resource.free ? 'text-[#10B981]' : 'text-gray-400'}`}>
                      {resource.free ? 'Free' : 'Paid'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          INDUSTRY TRENDS PULSE
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="trends" className="py-20 px-4 bg-gradient-to-b from-transparent via-[#00F5FF]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visibleSections.trends ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Live Industry Intelligence
            </h2>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { value: '2.4M+', label: 'Jobs Available in India', color: '#00F5FF' },
              { value: '₹18.5L', label: 'Average Tech Salary', color: '#8B5CF6' },
              { value: '340+', label: 'In-Demand Skills Tracked', color: '#FF4D6D' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <div className="font-orbitron text-4xl sm:text-5xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trending Skills Ticker */}
          <div className="overflow-hidden mb-12">
            <div className="flex animate-marquee">
              {[...TRENDING_SKILLS, ...TRENDING_SKILLS].map((skill, i) => (
                <span key={i} className="px-4 py-2 mx-2 bg-white/5 rounded-full text-sm whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Job Market Heatmap */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-orbitron text-xl font-bold mb-6 text-center">Job Market Heatmap</h3>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {[
                { name: 'Tech', status: 'hot' },
                { name: 'Finance', status: 'stable' },
                { name: 'Healthcare', status: 'hot' },
                { name: 'Education', status: 'stable' },
                { name: 'Retail', status: 'declining' },
                { name: 'Manufacturing', status: 'stable' },
                { name: 'Media', status: 'stable' },
                { name: 'Real Estate', status: 'declining' },
                { name: 'Consulting', status: 'hot' },
                { name: 'E-commerce', status: 'hot' },
                { name: 'Logistics', status: 'stable' },
                { name: 'Hospitality', status: 'stable' },
                { name: 'Agriculture', status: 'stable' },
                { name: 'Energy', status: 'hot' },
              ].map((sector, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer hover:scale-105 transition-all ${
                    sector.status === 'hot'
                      ? 'bg-green-500/30 text-green-400'
                      : sector.status === 'stable'
                      ? 'bg-yellow-500/30 text-yellow-400'
                      : 'bg-red-500/30 text-red-400'
                  }`}
                  title={`${sector.name}: ${sector.status}`}
                >
                  {sector.name.slice(0, 4)}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-green-500/50" /> Booming
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-yellow-500/50" /> Stable
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-red-500/50" /> Declining
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          MENTORSHIP CONNECT
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="mentors" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visibleSections.mentors ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Connect With Your Guide
            </h2>
            <p className="text-gray-400 text-lg">Learn from industry experts who've walked the path</p>
          </div>

          {/* Mentor Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {MENTORS.map((mentor) => (
              <div
                key={mentor.id}
                className="glass rounded-2xl p-6 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF4D6D] flex items-center justify-center font-orbitron font-bold text-xl">
                    {mentor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      {mentor.available && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {mentor.title} at {mentor.company}
                    </p>
                    <p className="text-[#00F5FF] text-sm">{mentor.experience} years experience</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 my-4">
                  {mentor.expertise.map((exp) => (
                    <span key={exp} className="px-3 py-1 bg-white/5 rounded-full text-xs">
                      {exp}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm ml-1">{mentor.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{mentor.reviews} reviews</span>
                </div>

                {expandedMentor === mentor.id && (
                  <p className="text-gray-400 text-sm mb-4 animate-fadeIn">{mentor.bio}</p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setExpandedMentor(expandedMentor === mentor.id ? null : mentor.id)}
                    className="flex-1 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-all text-sm"
                  >
                    {expandedMentor === mentor.id ? 'Show Less' : 'View Profile'}
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${
                      mentor.available
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4D6D] hover:scale-105'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!mentor.available}
                  >
                    {mentor.available ? 'Book Session' : 'Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          CAREER TIMELINE BUILDER
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="timeline" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visibleSections.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Build Your Career Blueprint
            </h2>
            <p className="text-gray-400 text-lg">Click on milestones to customize your journey</p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#FF4D6D]">
                <div className="absolute inset-0 animate-pulse opacity-50" />
              </div>

              {/* Milestones */}
              <div className="flex justify-between relative">
                {[
                  { key: 'now', label: 'NOW' },
                  { key: '6months', label: '6 MO' },
                  { key: '1year', label: '1 YR' },
                  { key: '3years', label: '3 YRS' },
                  { key: '5years', label: '5 YRS' },
                ].map((milestone) => (
                  <div key={milestone.key} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#020817] border-4 border-[#00F5FF] flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-all pulse-glow">
                      <span className="text-xs font-bold">{milestone.label}</span>
                    </div>
                    <input
                      type="text"
                      value={milestones[milestone.key]}
                      onChange={(e) => setMilestones({ ...milestones, [milestone.key]: e.target.value })}
                      className="w-24 sm:w-32 text-center text-xs sm:text-sm bg-transparent border-b border-dashed border-gray-600 focus:border-[#00F5FF] outline-none py-1"
                      placeholder="Your goal..."
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                <ExternalLink className="w-5 h-5" /> Export Roadmap as PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visibleSections.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">Success Stories</h2>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="glass rounded-2xl p-8 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xl italic mb-6 text-gray-300">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold text-lg">{testimonial.author}</p>
                      <p className="text-[#00F5FF]">{testimonial.transition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === testimonialIndex ? 'bg-[#00F5FF] w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <footer className="py-16 px-4 bg-gradient-to-t from-[#0f0f1a] to-transparent border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Logo */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <span className="font-orbitron text-xl font-bold gradient-text">NexusCareer</span>
              </div>
              <p className="text-gray-400 mb-4">AI-powered career intelligence platform built for India's next generation of professionals.</p>
              <div className="flex gap-4">
                {[Globe, Mail, Phone].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'Platform', links: ['Career Profiler', 'AI Recommendations', 'Skill Analysis', 'Learning Hub'] },
              { title: 'Resources', links: ['Blog', 'Guides', 'Webinars', 'Podcasts'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-orbitron font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-[#00F5FF] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h4 className="font-orbitron font-bold mb-1">Stay Ahead of the Curve</h4>
                <p className="text-gray-400 text-sm">Get weekly career insights delivered to your inbox</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 sm:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00F5FF]"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] rounded-xl font-semibold hover:scale-105 transition-all neon-cyan">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>Made with ❤️ for India's Next Generation</p>
            <p className="mt-2">© 2024 NexusCareer. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          FLOATING CHAT ASSISTANT
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center z-40 hover:scale-110 transition-all pulse-glow"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 glass rounded-2xl z-50 overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-white" />
              <span className="font-orbitron font-bold text-white">NexusAI</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-white'
                      : 'bg-white/10 text-gray-300'
                  } ${msg.typing ? 'animate-pulse' : ''}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Ask about careers..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[#00F5FF]"
              />
              <button
                onClick={handleChatSend}
                className="p-2 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] rounded-xl hover:scale-105 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(280px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(280px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
