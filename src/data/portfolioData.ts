import type { ExperienceItem, ProjectItem, OpenSourcePR, BlogPost, HighlightItem, CommitActivityDay } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Deepesh Reddy",
  age: "23",
  title: "Data & AI Engineer • Full-Stack Developer",
  tagline: "Data & AI Engineer at EY GDS, full-stack builder at heart. I build real-time web platforms, automated data pipelines, and fast user interfaces.",
  statusText: "Available for projects",
  location: "India (Remote)",
  email: "contact.deepeshreddy@gmail.com",
  calComLink: "https://cal.com/deepeshreddy",
  calSlug: "deepeshreddy",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.png",
  bannerUrl: "/banner.png",
  socials: {
    github: "https://github.com/asyncbuild",
    x: "https://x.com/asyncbuild",
    twitter: "https://x.com/asyncbuild",
    linkedin: "https://www.linkedin.com/in/deepesh-reddy-a33a71238/",
  },
  philosophy: "Be Delusional.",
  bioPoints: [
    "Data & AI Engineer at EY GDS — building Python XBRL parsers, web scrapers, and data validation pipelines for financial datasets.",
    "Creator of WhisprLive — a real-time audience engagement platform built with React, TypeScript, Node.js, and WebSockets.",
    "Big believer in agentic coding — using autonomous coding agents to build, test, and ship production-ready software much faster.",
    "Comfortable across the entire stack, from distributed data pipelines to clean, responsive frontends.",
  ],
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Data & AI Engineer",
    company: "EY GDS",
    companyUrl: "https://www.ey.com",
    period: "Aug 2025 - Present",
    location: "Kolkata, India",
    type: "Full-time",
    metricBadges: ["XBRL Parsing", "Python & SQL", "Web Scraping"],
    bulletPoints: [
      "Developed a Python-based XBRL parser to extract structured financial data using taxonomy definitions and extended it to process entire directories of XBRL files.",
      "Evaluated financial data sources and developed Python web scraping solutions to retrieve relevant information from external websites.",
      "Processed structured and semi-structured financial data using Python and SQL, implementing validation checks to improve data accuracy and consistency.",
      "Collaborated with analysts to clarify data requirements and used AI coding assistants to support development, debugging, and test generation."
    ],
    techStack: ["Python", "SQL", "XBRL", "Web Scraping", "Data Validation", "AI Assistants"],
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
      "Built full-stack web applications and interactive landing pages using React, Tailwind CSS, and MongoDB.",
      "Designed clean database schemas and integrated REST APIs tailored to client requirements.",
      "Focused on mobile responsiveness, fast page load speeds, and intuitive user experiences.",
      "Worked directly with founders from initial concept and UI design through production deployment."
    ],
    techStack: ["React.js", "MongoDB", "Tailwind CSS", "JavaScript", "Node.js"],
    highlightColor: "emerald"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-whispr",
    title: "WhisprLive",
    tagline: "Real-time audience Q&A and live polling platform for speakers and events.",
    description: "A live presentation tool where audiences can scan a QR code to ask anonymous questions, upvote favorites, and vote in live polls — with zero app downloads or signups required.",
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
      "Sub-50ms live synchronization using room-scoped Socket.IO WebSocket connections.",
      "Zero audience friction — attendees scan a QR code and join the live room in under 3 seconds.",
      "Dedicated 4K Stage Mode designed specifically for large event screens and projector displays.",
      "Real-time democratic question ranking with built-in client rate limits and vote integrity."
    ],
    architecture: {
      painPoint: "Traditional presentation Q&A is awkward: attendees hesitate to raise hands, app downloads cause high drop-off, and chat streams get flooded.",
      whatWeSolved: "Instant QR access in 3 seconds, anonymous questions so people speak up freely, live crowdsourced upvoting, and a clean stage projector view.",
      howWeSolved: "Room-scoped Socket.IO WebSockets for bi-directional event sync, in-memory question sorting, and background PostgreSQL persistence.",
      keyMetric: "< 50ms Real-Time Event Sync"
    }
  },
  {
    id: "proj-pulse",
    title: "GitHub Pulse",
    tagline: "Cloud data pipeline ingesting millions of GitHub events into analytics tables and AI search.",
    description: "Automated data engineering pipeline that ingests millions of public GitHub events from GH Archive, cleans and partitions them into Parquet with PySpark on AWS Glue, models star schemas with dbt, and enables conversational search via pgvector.",
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
      "Automated daily ingestion of GH Archive public logs via Apache Airflow DAGs with retry handling.",
      "Distributed batch transformations with PySpark on AWS Glue, storing partitioned Parquet datasets in S3.",
      "Star-schema analytics modeling with dbt and Athena to track developer activity and trending repos.",
      "RAG search API built with FastAPI and pgvector to answer developer questions with direct source citations."
    ],
    architecture: {
      painPoint: "Raw GH Archive event logs are massive, unstructured JSON dumps that are slow and expensive to query directly.",
      whatWeSolved: "Turned raw event streams into clean, partitioned analytics tables and a conversational AI search assistant with verified links.",
      howWeSolved: "Airflow DAGs for S3 landing, PySpark on AWS Glue for Parquet compaction, dbt for star schema modeling, and pgvector embeddings for fast RAG search.",
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
  // AI & Workflow
  { name: "Agentic Coding", category: "AI" },
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
  // Databases (5)
  { name: "PostgreSQL", category: "Databases" },
  { name: "Neon DB",    category: "Databases" },
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
  // Tools & Cloud (6)
  { name: "JWT",       category: "Security" },
  { name: "Zegocloud", category: "Tools" },
  { name: "GitHub",    category: "Tools" },
  { name: "VS Code",   category: "Tools" },
  { name: "Vercel",    category: "Tools" },
  { name: "Render",    category: "Cloud" },
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
