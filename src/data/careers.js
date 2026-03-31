import { Cpu, Palette, LineChart, Heart, Scale, Film, BookOpen, Settings, Microscope, Building2, Sparkles, Shield, Trophy, Leaf, UtensilsCrossed } from 'lucide-react';

// Career domains for hexagonal explorer
export const CAREER_DOMAINS = [
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
