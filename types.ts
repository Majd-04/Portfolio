
export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'pdf';
  url: string;
  caption?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  link?: string;
  media: MediaItem[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  gpa?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface Profile {
  fullName: string;
  initials: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  location?: string;
  avatarUrl: string;
}

export interface PortfolioData {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  lastUpdated: number;
}

export type SectionId = 'home' | 'experience' | 'projects' | 'education' | 'skills';

export interface NavigationState {
  activeSection: SectionId;
  modalItem?: { type: 'experience' | 'project', id: string };
}
