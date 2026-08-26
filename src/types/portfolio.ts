export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Open Source' | 'Advisory';
  metricBadges: string[];
  bulletPoints: string[];
  techStack: string[];
  highlightColor?: 'indigo' | 'emerald';
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: 'Live' | 'Building' | 'In Progress';
  metrics: string;
  mediaType: 'image' | 'code' | 'video';
  previewImage?: string;
  codeSnippet?: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
  colorHighlight?: 'indigo' | 'emerald';
}

export interface OpenSourcePR {
  id: string;
  repo: string;
  prNumber: number;
  title: string;
  status: 'merged' | 'open' | 'closed';
  stars: number;
  mergedDate: string;
  url: string;
  description: string;
  additions: number;
  deletions: number;
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend & Systems' | 'Cloud & DevOps' | 'AI & Tools';
  level: string;
  iconName: string;
  highlighted?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  views: string;
  tags: string[];
  url: string;
  featured?: boolean;
}

export interface HighlightItem {
  id: string;
  title: string;
  organization: string;
  category: 'Open Source Program' | 'Mentorship' | 'Certification' | 'Speaking / Podcast' | 'Award';
  date: string;
  description: string;
  badgeText: string;
  link?: string;
}

export interface CommitActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
