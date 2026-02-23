import React from "react";
import { Link } from "react-router-dom";
import blogDataJson from "../../context/blog-news.json";
import type { BlogData } from "../types/blog";
import Footer from "../components/Footer";

const blogData = blogDataJson as BlogData;

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <main className="grow py-12">
        <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className="layout-content-container flex flex-col max-w-240 flex-1">
            <div className="px-4 py-12 flex flex-col items-center md:items-start">
              <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] mb-3">
                Knowledge.Repository
              </span>
              <h1 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-mono font-black uppercase tracking-tight mb-6">
                Archive Database
              </h1>
              <p className="text-sm font-mono font-bold text-slate-tech/60 dark:text-white/40 max-w-2xl uppercase leading-relaxed">
                Decoded intel, tactical strategies, and historical records
                retrieved from the core mainframe.
              </p>
              <div className="w-24 h-1 bg-primary mt-8 skew-x-[-20deg]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
              {blogData.articles.map((article) => (
                <Link
                  to={`/blog/${article.slug}`}
                  key={article.id}
                  className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-tech/10 dark:border-white/10 transition-all duration-300 hover:border-primary/50 relative"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="overflow-hidden h-64 relative">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                    <img
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`skew-x-[-12deg] px-3 py-1 text-[10px] font-mono font-black uppercase text-white shadow-mechanical ${article.color}`}
                      >
                        <span className="skew-x-[12deg] block">{article.category}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary"></div>
                      <span className="text-[9px] font-mono font-black text-slate-tech/40 dark:text-white/30 uppercase tracking-[0.2em]">
                        Entry_ID: {article.slug.toUpperCase().substring(0, 8)}
                      </span>
                    </div>

                    <h3 className="text-xl font-mono font-black leading-tight text-gray-900 dark:text-white uppercase tracking-tighter transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>

                    <p className="text-xs font-mono font-bold text-slate-tech/60 dark:text-white/40 leading-relaxed line-clamp-2 uppercase">
                      {article.meta_description}
                    </p>

                    <div className="flex items-center text-primary font-mono font-black text-[10px] uppercase tracking-widest mt-4 gap-2">
                      Initialize Read
                      <span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-1">
                        east
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
