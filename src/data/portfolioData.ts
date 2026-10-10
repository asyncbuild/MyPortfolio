import type { ExperienceItem, ProjectItem, OpenSourcePR, BlogPost, HighlightItem, CommitActivityDay } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Deepesh Reddy",
  age: "23",
  title: "Data & AI Engineer • Full-Stack Developer",
  tagline: "Data & AI Engineer at EY GDS by profession, Full-Stack Developer by passion. Building intelligent systems and fast, interactive web applications.",
  statusText: "Available for projects",
  location: "India (Remote)",
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
    "Data & AI Engineer at EY GDS — engineering scalable data pipelines, AI integrations, and automated workflows.",
    "Full-stack developer by passion — crafting real-time web platforms (WhisprLive) and interactive tools with React, TypeScript, and Node.js.",
    "Bridging intelligent data/AI backends with high-performance, polished frontend experiences.",
  ],
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
    metricBadges: ["Data & AI Engineering", "Python", "Enterprise Systems"],
    bulletPoints: [
      "Engineered scalable data pipelines, analytics services, and automated data tools using Python and SQL.",
      "Collaborated with cross-functional enterprise teams to deploy robust data services and AI-assisted workflows.",
      "Built internal full-stack web tools to streamline automated data collection, transformation, and reporting."
    ],
    techStack: ["Python", "SQL", "FastAPI", "JavaScript", "AI & ML Tools"],
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
    id: "proj-whispr",
    title: "WhisprLive",
    tagline: "Zero-install real-time audience interaction platform for keynotes & webinars.",
    description: "WhisprLive transforms presentations into interactive conversations with zero-install QR access, anonymous Q&A, crowdsourced upvoting, live polls, word clouds, and 4K stage projector mode.",
    status: "Live",
    metrics: "Sub-50ms Socket.IO • Zero App Installs • 4K Stage Mode",
    mediaType: "image",
    previewImage: "/whisprlive-logo.png",
    embedUrl: "https://whisprlive.live",
    demoUrl: "https://whisprlive.live",
    githubUrl: "https://github.com/asyncbuild/WhisprLive",
    tags: ["React", "Node.js", "Socket.IO", "PostgreSQL", "Tailwind CSS", "WebSockets"],
    featured: true,
    colorHighlight: "cyan",
    highlights: [
      "Engineered room-scoped Socket.IO WebSocket clustering for sub-50ms live synchronization.",
      "Zero app download or signup required for audience — join in under 3 seconds via dynamic QR code.",
      "Dedicated high-contrast 4K Stage Projector Mode with live upvoted question spotlighting.",
      "In-memory democratic question ranking algorithms with client-side anti-spam single-vote integrity."
    ],
    architecture: {
      painPoint: "Audience hesitation and fear of speaking up, friction from app downloads/signups, and disorganized Q&A chat flood during live presentations.",
      whatWeSolved: "Zero-install instant QR access in under 3 seconds, 100% anonymous Q&A, crowdsourced democratic upvoting, and a dedicated 4K stage projector view.",
      howWeSolved: "Engineered room-scoped Socket.IO WebSocket clustering for <50ms bi-directional event sync, in-memory democratic ranking algorithms, and decoupled asynchronous PostgreSQL persistence.",
      keyMetric: "< 50ms Real-Time Event Sync"
    }
  },
  {
    id: "proj-pulse",
    title: "GitHub Pulse",
    tagline: "End-to-end cloud data pipeline on AWS with Airflow, PySpark, dbt & LLM RAG.",
    description: "Automated data engineering pipeline ingesting millions of public GitHub events from GH Archive. Orchestrated on AWS with Apache Airflow and PySpark on AWS Glue, dbt star-schema modeling in S3/Athena, and a pgvector RAG question-answering app with FastAPI.",
    status: "Building",
    metrics: "AWS Data Pipeline • PySpark & dbt • pgvector & RAG Q&A",
    mediaType: "image",
    previewImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    demoUrl: "",
    githubUrl: "https://github.com/asyncbuild/github-pulse",
    tags: ["Python", "PySpark", "AWS (S3/Glue/Athena)", "Apache Airflow", "dbt", "pgvector", "FastAPI", "PostgreSQL"],
    featured: true,
    colorHighlight: "emerald",
    highlights: [
      "Automated scheduled ingestion of public GH Archive events via Airflow DAGs with fault-tolerant retries.",
      "Distributed batch processing with PySpark on AWS Glue, generating partitioned Parquet tables in S3.",
      "Analytics star-schema data modeling with dbt and Athena for daily trending repos and developer metrics.",
      "RAG-powered conversational search over issue discussions using pgvector embeddings and FastAPI /ask endpoint with verified source links."
    ],
    architecture: {
      painPoint: "Raw unorganized GitHub event logs are massive, unstructured, and difficult to query for developer trends or issue sentiment analysis.",
      whatWeSolved: "Automated end-to-end pipeline that transforms raw event streams into clean analytics tables and provides plain-English Q&A with direct source links.",
      howWeSolved: "Built an Airflow orchestration DAG ingesting GH Archive to S3 raw, PySpark cleaning on AWS Glue to partitioned Parquet, dbt star schema modeling, and an embedding retrieval layer (pgvector + FastAPI).",
      keyMetric: "11-Stage Cloud Pipeline • Sub-second RAG Retrieval"
    }
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
