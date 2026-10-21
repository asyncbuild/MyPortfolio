import type { ExperienceItem, ProjectItem, OpenSourcePR, BlogPost, HighlightItem, CommitActivityDay, PricingPlan } from '../types/portfolio';

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
    x: "https://x.com/asyncbuild",
    twitter: "https://x.com/asyncbuild",
    linkedin: "https://www.linkedin.com/in/deepesh-reddy-a33a71238/",
  },
  philosophy: "Be Delusional.",
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

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "mvp-sprint",
    name: "Rapid MVP & Web App",
    tagline: "From concept to deployed, production-ready product in 10-14 days.",
    priceUsd: 1499,
    priceInr: 125000,
    period: "fixed price",
    timeline: "10 – 14 Days",
    badge: "Fast Launch",
    badgeVariant: "emerald",
    popular: false,
    description: "Ideal for early-stage founders, indie hackers, and creators who need an end-to-end full-stack web application built rapidly with modern clean code.",
    idealFor: "Startups, MVPs, client portals, SaaS launches, and interactive web tools.",
    deliverables: [
      "High-performance React / Next.js / Vite web application",
      "Authentication system (Supabase, Clerk, or NextAuth)",
      "Database schema, migrations & CRUD APIs (PostgreSQL / SQLite)",
      "Tailwind CSS responsive design for mobile, tablet & desktop",
      "Production deployment on Vercel/Cloudflare with custom domain",
      "Zero vendor lock-in — 100% full source code & repo ownership",
      "14 days post-launch bug fixes & support"
    ],
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL", "Vercel"],
    ctaText: "Start MVP Sprint",
    emailSubject: "Inquiry: Rapid MVP & Web App Sprint"
  },
  {
    id: "ai-workflows",
    name: "AI & LLM Workflows",
    tagline: "Autonomous agents, RAG search & custom LLM integrations.",
    priceUsd: 2299,
    priceInr: 195000,
    period: "fixed price",
    timeline: "2 – 3 Weeks",
    badge: "Most Popular",
    badgeVariant: "indigo",
    popular: true,
    description: "Integrate powerful LLMs (OpenAI, Anthropic Claude, Gemini, DeepSeek) into your software or automate repetitive enterprise processes.",
    idealFor: "Companies embedding AI features, document intelligence, conversational bots, or smart automation.",
    deliverables: [
      "Custom LLM agent architecture tailored to your business logic",
      "RAG pipeline with vector database (Pinecone / pgvector / Chroma)",
      "Real-time streaming UI (streaming chat, voice or tool execution)",
      "Prompt engineering, structured JSON outputs & fallback chains",
      "Token cost optimization & rate-limit handling",
      "API webhook integrations with your existing backend or CRMs",
      "30 days post-launch tuning & performance monitoring"
    ],
    techStack: ["Python", "OpenAI / Claude API", "LangChain", "FastAPI", "pgvector", "TypeScript"],
    ctaText: "Build AI Feature",
    emailSubject: "Inquiry: AI & LLM Workflows Project"
  },
  {
    id: "data-pipelines",
    name: "Data Engineering & Systems",
    tagline: "Enterprise-grade automated pipelines, scrapers, and database architectures.",
    priceUsd: 2899,
    priceInr: 245000,
    period: "fixed price",
    timeline: "2 – 4 Weeks",
    badge: "Enterprise Grade",
    badgeVariant: "cyan",
    popular: false,
    description: "Harnessing enterprise practices from EY GDS to build robust ETL/ELT pipelines, reliable data scrapers, and high-performance databases.",
    idealFor: "Companies with messy data, breaking scrapers, slow queries, or complex sync pipelines.",
    deliverables: [
      "End-to-end automated ETL / ELT pipeline architecture",
      "Resilient web scraping & structured data extraction engines",
      "PostgreSQL / SQL query optimization, indexing & schema architecture",
      "Automated scheduled cron jobs with retry logic & alert monitoring",
      "Data transformation, validation, deduplication & cleansing scripts",
      "Dockerized microservices & cloud deployment (AWS / GCP / VPS)",
      "Comprehensive architecture documentation & data dictionary"
    ],
    techStack: ["Python", "PostgreSQL", "SQLAlchemy", "FastAPI", "Docker", "AWS"],
    ctaText: "Discuss Data Scope",
    emailSubject: "Inquiry: Data Engineering & Systems Pipeline"
  },
  {
    id: "dedicated-retainer",
    name: "Dedicated Tech Partner",
    tagline: "Senior full-stack & AI engineering bandwidth embedded in your team.",
    priceUsd: 3499,
    priceInr: 295000,
    period: "per month",
    timeline: "Ongoing • Flexible",
    badge: "1 Slot Open",
    badgeVariant: "amber",
    popular: false,
    description: "Continuous sprint execution for growing startups. Fast turnaround, direct communication, and zero recruitment overhead.",
    idealFor: "Funded startups, growing businesses, and founders needing a dedicated technical co-pilot.",
    deliverables: [
      "~20 dedicated hours/week of full-stack + AI development",
      "Direct async channel (Slack, Discord, or Telegram) with rapid response",
      "Weekly 1-on-1 sprint planning & sync video calls",
      "Flexible priority pivoting — ship features, fix bugs, optimize",
      "Code reviews, architectural advisory, and technical roadmapping",
      "No long-term contracts: pause or cancel anytime with 1-week notice",
      "Priority turnaround on mission-critical fixes"
    ],
    techStack: ["Full Stack", "AI / LLMs", "Cloud & DevOps", "Architecture"],
    ctaText: "Claim Retainer Slot",
    emailSubject: "Inquiry: Dedicated Engineering Retainer"
  }
];

export const FREELANCE_FAQS = [
  {
    q: "How does the project process work from start to finish?",
    a: "We start with a quick 20-minute discovery call to clarify your goals, timeline, and requirements. Next, I provide a clear scope breakdown and fixed proposal. Once approved, development kicks off in focused sprints with regular Loom updates and staging previews until launch."
  },
  {
    q: "How are payments structured?",
    a: "For fixed-price sprints, payments are typically split 50% upfront to reserve the sprint slot and 50% upon successful completion, testing, and deployment. For monthly retainers, billing is upfront at the beginning of each 30-day period with the freedom to cancel or pause anytime."
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You do. 100%. As soon as the project is paid for, all source code, Git repositories, deployment credentials, and assets are completely transferred to your control with zero proprietary locks."
  },
  {
    q: "What if my requirements don't fit into these standard tiers?",
    a: "Every project is unique. If you need a smaller micro-task, an hourly consulting session, or a hybrid enterprise solution, we can tailor a custom scope and estimate that fits your exact budget and timeline."
  },
  {
    q: "What timezone do you work in and how do we communicate?",
    a: "I am based in India (IST, UTC+5:30) with broad daily overlap across US, European, and APAC working hours. We communicate via Slack, Discord, email, or WhatsApp, complemented by Loom video walkthroughs and weekly scheduled calls."
  }
];
