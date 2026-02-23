import React from "react";
import { Link } from "react-router-dom";
import blogDataJson from "../../context/blog-news.json";
import type { BlogData } from "../types/blog";

const blogData = blogDataJson as BlogData;

const News: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
      <div className="layout-content-container flex flex-col max-w-5xl flex-1">
        <div className="flex items-center gap-3 px-4 pb-4">
          <div className="size-1.5 bg-accent rounded-full"></div>
          <h2 className="text-gray-900 dark:text-white text-xs font-mono uppercase tracking-[0.3em] font-black">
            Broadcast Archive // Latest Logs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {blogData.articles.map((article) => (
            <Link
              to={`/blog/${article.slug}`}
              key={article.id}
              className="flex flex-col group border-2 border-slate-tech/10 dark:border-white/5 bg-white dark:bg-slate-900 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl dark:hover:shadow-accent/10"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-widest border border-white/20">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <h3 className="text-base font-black leading-tight text-gray-900 dark:text-white uppercase tracking-tighter italic">
                  {article.title}
                </h3>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 line-clamp-2">
                  {article.meta_description}
                </p>
                <div className="mt-2 pt-3 border-t border-slate-tech/5 dark:border-white/5 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-tech/40 dark:text-white/40 uppercase">
                    Ref: ARTICLE_{article.id}
                  </span>
                  <span className="material-symbols-outlined text-sm text-accent group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
