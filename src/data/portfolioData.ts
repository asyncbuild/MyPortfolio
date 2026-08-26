import type { ExperienceItem, ProjectItem, OpenSourcePR, BlogPost, HighlightItem, CommitActivityDay } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Deepesh Reddy",
  age: "23",
  title: "Full Stack Web Developer",
  tagline: "I love designing, building, and shipping fast, interactive web applications.",
  statusText: "Available for projects",
  location: "Remote",
  email: "contact.deepeshreddy@gmail.com",
  calComLink: "https://cal.com/saikumar2603",
  calSlug: "saikumar2603",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.png",
  bannerUrl: "/banner.png",
  socials: {
    github: "https://github.com/asyncbuild",
    twitter: "https://twitter.com/asyncbuild",
    linkedin: "https://linkedin.com/in/asyncbuild",
    discord: "https://discord.gg/asyncbuild",
  },
  bioPoints: [
    "Passionate about building clean, high-performance web applications and UI components.",
    "Crafting interactive full-stack web projects step-by-step with React, TypeScript, and modern tech.",
    // "Currently building Draco, VengeanceUI, and experimental AI tools."
  ],
  quickStats: [
    { label: "Projects Built", value: "95+" },
    { label: "npm Downloads", value: "1.5M+" },
    { label: "GitHub Stars", value: "3.2k+" },
    { label: "Open Source PRs", value: "120+" }
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Software Engineer",
    company: "EY GDS",
    companyUrl: "https://www.ey.com",
    period: "Aug 2025 - Present",
    location: "Kolkata",
    type: "Full-time",
    metricBadges: ["Software Engineering", "Full Stack", "Python"],
    bulletPoints: [
      "Developed web services and data tools using Python and modern web frameworks.",
      "Collaborated with cross-functional teams to build and maintain high-quality software solutions.",
      "Built internal web tools to streamline automated data collection and reporting workflows."
    ],
    techStack: ["Python", "JavaScript", "SQL"],
    highlightColor: "indigo"
  },
  {
    id: "exp-2",
    role: "Freelance Web Developer",
    company: "Freelance",
    period: "May 2025 - July 2025",
    location: "Remote",
    type: "Freelance",
    metricBadges: ["Web Development", "Full Stack", "React & MongoDB"],
    bulletPoints: [
      "Designed and developed custom web applications and client websites using React.js, Tailwind CSS, and MongoDB.",
      "Integrated dynamic content management for efficient data storage of portfolios and services.",
      "Implemented responsive UI components to ensure seamless user experience across devices.",
      "Collaborated directly with clients to gather requirements and deliver features aligned with business needs."
    ],
    techStack: ["React.js", "MongoDB", "Tailwind CSS", "JavaScript", "Node.js"],
    highlightColor: "emerald"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "VengeanceUI",
    tagline: "Animated beautiful UI components for landing pages.",
    description: "VengeanceUI provides animated components with smooth micro-interactions, dark mode glassmorphism, and copy-paste React snippets.",
    status: "Live",
    metrics: "1,420 GitHub Stars • 180k Views",
    mediaType: "image",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://vengeance-ui.dev",
    githubUrl: "https://github.com/asyncbuild/vengeance-ui",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Motion"],
    featured: true,
    colorHighlight: "emerald"
  },
  {
    id: "proj-2",
    title: "Scribble3D",
    tagline: "Turn your sketches into 3D objects and worlds — no 3D skills required.",
    description: "Turn your sketches into 3D objects and worlds — powered by depth estimation models and WebGL/Three.js rendering.",
    status: "Building",
    metrics: "Active Development • Alpha Release",
    mediaType: "image",
    previewImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://scribble3d.app",
    githubUrl: "https://github.com/asyncbuild/scribble3d",
    tags: ["Next.js", "Three.js", "TypeScript", "Tailwind"],
    featured: true,
    colorHighlight: "indigo"
  }
];

export const ALL_PROJECTS_COUNT = 2;

export const OPEN_SOURCE_PRS: OpenSourcePR[] = [
  /*
  {
    id: "pr-1",
    repo: "owner/repository",
    prNumber: 101,
    title: "Example Pull Request Title",
    status: "merged",
    stars: 14000,
    mergedDate: "2026",
    url: "https://github.com/owner/repository",
    description: "Description of your open source pull request contribution.",
    additions: 150,
    deletions: 30
  }
  */
];

export const SKILLS_LIST = [
  // Languages (5)
  { name: "Python",       category: "Languages" },
  { name: "TypeScript",   category: "Languages" },
  { name: "JavaScript",   category: "Languages" },
  { name: "SQL",          category: "Languages" },
  { name: "C++",          category: "Languages" },
  // Data (4)
  { name: "Data Parsing",  category: "Data" },
  { name: "Web Scraping",  category: "Data" },
  { name: "Data Analysis", category: "Data" },
  { name: "XBRL",          category: "Data" },
  // Databases (4)
  { name: "PostgreSQL", category: "Databases" },
  { name: "MongoDB",    category: "Databases" },
  { name: "MySQL",      category: "Databases" },
  { name: "Redis",      category: "Databases" },
  // Backend (5)
  { name: "Node.js",     category: "Backend" },
  { name: "Express.js",  category: "Backend" },
  { name: "Prisma",      category: "ORM" },
  { name: "WebSockets",  category: "Web" },
  { name: "WebRTC",      category: "Web" },
  // Frontend (4)
  { name: "React.js",    category: "Frontend" },
  { name: "Tailwind CSS",category: "Frontend" },
  { name: "HTML/CSS",    category: "Frontend" },
  { name: "Puppeteer",   category: "Automation" },
  // Tools (4)
  { name: "JWT",       category: "Security" },
  { name: "Zegocloud", category: "Tools" },
  { name: "GitHub",    category: "Tools" },
  { name: "VS Code",   category: "Tools" },
  { name: "Vercel",    category: "Tools" },
];

export const BLOG_POSTS: BlogPost[] = [];

export const HIGHLIGHTS: HighlightItem[] = [];

export const GENERATE_COMMIT_ACTIVITY = (): CommitActivityDay[] => {
  const days: CommitActivityDay[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let count = 0;
    const rand = Math.random();
    if (!isWeekend) {
      if (rand > 0.15) count = Math.floor(Math.random() * 9) + 1;
      if (rand > 0.7) count = Math.floor(Math.random() * 7) + 8;
    } else {
      if (rand > 0.6) count = Math.floor(Math.random() * 4) + 1;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 5) level = 2;
    else if (count > 5 && count <= 9) level = 3;
    else if (count > 9) level = 4;

    days.push({ date: dateStr, count, level });
  }
  return days;
};
