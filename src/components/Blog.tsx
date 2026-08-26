import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';

export const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-2 relative">
      {/* Section Title */}
      <h2 className="text-2xl font-bold theme-text-title tracking-tight mb-5">
        Blog & Writing
      </h2>

      {/* Blog Posts List */}
      <div className="space-y-3">
        {BLOG_POSTS.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="block p-5 sm:p-6 rounded-lg theme-card transition-all duration-200 group select-none"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold theme-text-title transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs theme-text-muted leading-relaxed line-clamp-2">
                  {post.summary}
                </p>

                <div className="flex items-center gap-3 pt-2 text-xs font-mono theme-text-faint">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.views}</span>
                </div>
              </div>

              <div className="p-2 rounded-md theme-subtle group-hover:theme-text-title transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
