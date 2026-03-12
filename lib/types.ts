// Experience types
export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  techStack: string[];
  type: "full-time" | "part-time" | "freelance" | "internship" | "founder";
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: "ai-ml" | "finance" | "web" | "sports" | "real-estate" | "misc";
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    article?: string;
  };
  image?: string;
  featured: boolean;
  date: string;
}

// Skills types
export interface SkillGroup {
  category: string;
  skills: string[];
}

// About section
export interface AboutSection {
  hero: {
    title: string;
    subtitle: string;
    cta: {
      text: string;
      href: string;
    };
  };
  bio: {
    headline: string;
    paragraphs: string[];
  };
  highlights: {
    title: string;
    items: string[];
  };
}

// Chat types
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  intent: "navigate" | "learn" | "contact" | "general";
  section?: string;
  response: string;
  action?: {
    type: "navigate" | "scroll";
    target: string;
  };
}

// Navigation structure for agent
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  description: string;
  keywords: string[];
}

// Quote type
export interface Quote {
  text: string;
  author: string;
  category: "personal" | "technical" | "motivational" | "sport";
}
