import React from 'react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/portfolioData';

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28 relative bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold text-[#FF7A00] uppercase tracking-widest bg-[#FFF2E6] border border-[#FFD4B2] px-3.5 py-1 rounded-full">
            Blog & Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
            Latest Articles & Stories
          </h2>
          <p className="text-[#627D98] text-sm sm:text-base leading-relaxed">
            Thoughts on product design, frontend architecture, UX strategy, and modern digital development.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#D9E2EC] shadow-sm hover:shadow-xl hover:shadow-[#0E2A47]/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col text-left"
            >
              {/* Image */}
              <div className="aspect-[16/11] overflow-hidden bg-slate-100 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#0E2A47] text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-[#D9E2EC]">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#627D98] mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0E2A47]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0E2A47]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102A43] group-hover:text-[#FF7A00] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#627D98] mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#D9E2EC]">
                  <a
                    href="#blog"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0E2A47] hover:text-[#FF7A00] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <span className="w-8 h-2.5 rounded-full bg-[#0E2A47]" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200 hover:bg-[#FF7A00] transition-colors cursor-pointer" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200 hover:bg-[#FF7A00] transition-colors cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
