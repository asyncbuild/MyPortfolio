import type { ExperienceItem, ProjectItem, OpenSourcePR, BlogPost, HighlightItem, CommitActivityDay } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Deepesh Reddy",
  age: "23",
  title: "Data & AI Engineer",
  tagline: "Data & AI Engineer. I love building, breaking, and shipping intelligent systems.",
  statusText: "Available for projects",
  location: "Remote",
  email: "contact.deepeshreddy@gmail.com",
  calComLink: "https://cal.com/deepeshreddy",
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
    "AI, open source, and developer tools excite me.",
    "I believe actions speak louder than words, so I put my code where my mouth is.",
    "Currently building Draco, VengeanceUI, and experimental AI tools."
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
    role: "Data & AI Engineer",
    company: "EY GDS",
    companyUrl: "https://www.ey.com",
    period: "Aug 2025 - Present",
    location: "Kolkata",
    type: "Full-time",
    metricBadges: ["Data & AI", "XBRL Parsing", "Python Scraping"],
    bulletPoints: [
      "Parsed financial XBRL files using Python, extracting structured data based on taxonomy definitions.",
      "Analyzed multiple data source websites to identify relevant financial data and determine effective extraction approaches.",
      "Scraped data from external sources using Python to support data collection tasks.",
      "Processed structured and semi-structured financial data to support analysis and reporting.",
      "Collaborated with team members to understand data requirements and ensure accurate data extraction."
    ],
    techStack: ["Python", "SQL", "XBRL"],
    highlightColor: "indigo"
  },
  {
    id: "exp-2",
    role: "Web Developer",
    company: "Liberalty Constructions",
    period: "May 2025 - July 2025",
    location: "Remote",
    type: "Full-time",
    metricBadges: ["Web Development", "Full Stack", "React & MongoDB"],
    bulletPoints: [
      "Designed and developed a complete company website from scratch using React.js, Tailwind CSS, and MongoDB, delivering a professional and responsive web presence.",
      "Integrated dynamic content management with MongoDB for efficient data storage of company portfolio and services.",
      "Implemented responsive UI components to ensure seamless user experience across devices.",
      "Collaborated with stakeholders to gather requirements and deliver features aligned with business needs."
    ],
    techStack: ["React.js", "MongoDB", "Tailwind CSS", "JavaScript", "Node.js"],
    highlightColor: "emerald"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "VengeanceUI",
    tagline: "VengeanceUI helps you to build your landing page by providing you animated beautiful components",
    description: "VengeanceUI helps you to build your landing page by providing you animated beautiful components with smooth micro-interactions, dark mode glassmorphism, and copy-paste React snippets.",
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
    description: "Turn your sketches into 3D objects and worlds — no 3D skills required. Powered by diffusion depth estimation models and WebGL/Three.js rendering.",
    status: "Building",
    metrics: "Active Development • Alpha Release",
    mediaType: "image",
    previewImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://scribble3d.app",
    githubUrl: "https://github.com/asyncbuild/scribble3d",
    tags: ["Next.js", "Three.js", "TypeScript", "Python", "Tailwind"],
    featured: true,
    colorHighlight: "indigo"
  },
  {
    id: "proj-3",
    title: "Draco AI Engine",
    tagline: "High-performance AI sandbox and autonomous agent framework.",
    description: "Ultra-fast isolated runtime for executing multi-agent AI workflows in secure WASM micro-containers with sub-5ms boot times.",
    status: "Live",
    metrics: "850 Stars • 45k npm Downloads",
    mediaType: "code",
    codeSnippet: `import { DracoAgent } from '@draco/core';

const agent = new DracoAgent({ model: 'gpt-4o', sandbox: 'wasm' });
const execution = await agent.runWorkflow({
  task: 'Analyze repo security',
  repo: 'github.com/asyncbuild/draco'
});
console.log(execution.status); // Success`,
    demoUrl: "https://draco-ai.dev",
    githubUrl: "https://github.com/asyncbuild/draco",
    tags: ["Rust", "TypeScript", "WASM", "AI Agents"],
    featured: true,
    colorHighlight: "indigo"
  },
  {
    id: "proj-4",
    title: "Blueprint Studio",
    tagline: "From Idea to App in Record Time — rapid web application scaffolding.",
    description: "AI-assisted application builder that converts wireframes into clean, component-driven production React code with instant Vercel deployment.",
    status: "Building",
    metrics: "Beta Access",
    mediaType: "image",
    previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://blueprint-studio.dev",
    githubUrl: "https://github.com/asyncbuild/blueprint",
    tags: ["React", "TypeScript", "Tailwind", "Node.js"],
    featured: false,
    colorHighlight: "emerald"
  }
];

export const ALL_PROJECTS_COUNT = 95;

export const OPEN_SOURCE_PRS: OpenSourcePR[] = [
  {
    id: "pr-1",
    repo: "sugar-labs/sugar-desktop",
    prNumber: 4120,
    title: "Implement responsive AI assistant sidebar for Sugar OS",
    status: "merged",
    stars: 14000,
    mergedDate: "May 2026",
    url: "https://github.com/sugar-labs/sugar-desktop",
    description: "Added offline-capable speech & chat interface powered by quantized edge LLM.",
    additions: 342,
    deletions: 54
  },
  {
    id: "pr-2",
    repo: "laurent22/joplin",
    prNumber: 9812,
    title: "Optimize markdown preview render loop for large documents",
    status: "merged",
    stars: 42000,
    mergedDate: "Mar 2026",
    url: "https://github.com/laurent22/joplin",
    description: "Prevented unnecessary DOM rebuilds using virtualized tree diffing.",
    additions: 185,
    deletions: 92
  },
  {
    id: "pr-3",
    repo: "kgateway-dev/kgateway",
    prNumber: 620,
    title: "Add rate-limiting telemetry headers for Kubernetes API routes",
    status: "merged",
    stars: 8900,
    mergedDate: "Jan 2026",
    url: "https://github.com/kgateway-dev/kgateway",
    description: "Implemented real-time latency monitoring & token bucket rate limiter in Go.",
    additions: 210,
    deletions: 18
  },
  {
    id: "pr-4",
    repo: "vercel/next.js",
    prNumber: 59421,
    title: "Optimize App Router server action payload serialization",
    status: "merged",
    stars: 122000,
    mergedDate: "Dec 2025",
    url: "https://github.com/vercel/next.js",
    description: "Reduced binary buffer serialization overhead by 24% when passing arrays over 500 items.",
    additions: 142,
    deletions: 38
  }
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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "You Are Not Ready for Open Source Just Because You Want to Start",
    summary: "A realistic breakdown of what it takes to contribute meaningfully to production open source software beyond fixing typos.",
    date: "Jul 2026",
    readTime: "5 min read",
    views: "24.5k views",
    tags: ["Open Source", "Career", "Engineering"],
    url: "#",
    featured: true
  },
  {
    id: "blog-2",
    title: "Architecting Zero-Copy Data Pipelines in TypeScript & Rust",
    summary: "How we eliminated memory duplication overhead when processing high-frequency streaming events between WASM modules and Javascript V8 runtime.",
    date: "May 2026",
    readTime: "8 min read",
    views: "14.2k views",
    tags: ["Rust", "WASM", "Performance"],
    url: "#",
    featured: true
  },
  {
    id: "blog-3",
    title: "How We Built VengeanceUI for Sub-10ms Page Loads",
    summary: "Tree-shaking, CSS containment, and optimized React 19 concurrent hydration patterns for landing page UI kits.",
    date: "Mar 2026",
    readTime: "6 min read",
    views: "18.1k views",
    tags: ["Next.js", "React", "Web Vitals"],
    url: "#"
  }
];

export const HIGHLIGHTS: HighlightItem[] = [
  {
    id: "high-1",
    title: "Linux Foundation AI Security Scholar",
    organization: "Caracal Project & Linux Foundation",
    category: "Mentorship",
    date: "2026",
    description: "Selected as one of the global mentees for AI model safety and security tooling.",
    badgeText: "LF AI Security"
  },
  {
    id: "high-2",
    title: "Google Summer of Code 2026 Contributor",
    organization: "Sugar Labs & Google",
    category: "Open Source Program",
    date: "2026",
    description: "Awarded GSoC 2026 grant to bring edge AI capabilities to Sugar OS for young learners.",
    badgeText: "GSoC 2026"
  },
  {
    id: "high-3",
    title: "Vercel OSS Program Partner",
    organization: "Vercel",
    category: "Award",
    date: "2025",
    description: "Received official Vercel sponsorship for VengeanceUI component library.",
    badgeText: "Vercel OSS"
  }
];

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
