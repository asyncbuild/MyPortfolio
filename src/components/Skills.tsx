import React from 'react';
import {
  Code,
  Terminal,
  Database,
  Globe,
  FileText,
  BarChart3,
  Server,
  Leaf,
  Atom,
  Palette,
  Bot,
  Video,
  ShieldCheck,
  Cloud,
  FileCode,
  Table,
  Cpu,
  Layers,
  Zap
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { SKILLS_LIST } from '../data/portfolioData';

// ─── Icon resolver ────────────────────────────────────────────────────────────
const SkillBadgeIcon: React.FC<{ name: string }> = ({ name }) => {
  const n = name.toLowerCase();

  if (n === 'python')           return <Terminal    className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />;
  if (n === 'typescript')       return <FileCode    className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />;
  if (n === 'sql')              return <Table       className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />;
  if (n === 'javascript')       return <Code        className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />;
  if (n === 'c++')              return <Cpu         className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />;
  if (n.includes('parsing'))    return <FileCode    className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />;
  if (n.includes('scraping'))   return <Globe       className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />;
  if (n === 'xbrl')             return <FileText    className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />;
  if (n.includes('analysis'))   return <BarChart3   className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />;
  if (n === 'puppeteer')        return <Bot         className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />;
  if (n.includes('postgres'))   return <Database    className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />;
  if (n === 'mysql')            return <Database    className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />;
  if (n === 'mongodb')          return <Leaf        className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />;
  if (n === 'redis')            return <Layers      className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />;
  if (n === 'prisma')           return <span className="font-bold text-[10px] text-teal-300 flex-shrink-0">◮</span>;
  if (n.includes('node'))       return <Server      className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />;
  if (n.includes('express'))    return <span className="font-bold text-[10px] text-zinc-300 font-mono flex-shrink-0">ex</span>;
  if (n.includes('react'))      return <Atom        className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />;
  if (n.includes('tailwind'))   return <Palette     className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />;
  if (n.includes('html'))       return <Code        className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />;
  if (n.includes('websocket'))  return <Zap         className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />;
  if (n === 'webrtc')           return <Video       className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />;
  if (n === 'jwt')              return <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />;
  if (n === 'zegocloud')        return <Cloud       className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />;
  if (n === 'github')           return <GithubIcon  className="w-3.5 h-3.5 text-zinc-100 flex-shrink-0" />;
  if (n.includes('vs code'))    return <Code        className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />;
  if (n === 'vercel')           return <span className="font-bold text-[10px] text-zinc-100 flex-shrink-0">▲</span>;

  return <Code className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />;
};


// ─── Component ────────────────────────────────────────────────────────────────
export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-2 relative space-y-4">
      <h2 className="text-2xl font-bold theme-text-title tracking-tight mb-4">
        Skills &amp; Technologies
      </h2>

      {/* Single flat flex-wrap container with crisp light & dark badges */}
      <div className="flex flex-wrap gap-2 w-full">
        {SKILLS_LIST.map((skill) => (
          <div
            key={skill.name}
            className="flex-auto px-3.5 py-2 rounded-md
                       theme-subtle
                       hover:scale-[1.02] active:scale-95
                       transition-all duration-200
                       flex items-center justify-center gap-2
                       text-xs font-medium cursor-default select-none
                       whitespace-nowrap shadow-xs"
          >
            <SkillBadgeIcon name={skill.name} />
            <span className="theme-text-title font-medium text-xs">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

