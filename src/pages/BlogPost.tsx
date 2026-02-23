import React from "react";
import { useParams, Link } from "react-router-dom";
import blogDataJson from "../../context/blog-news.json";
import type { BlogData } from "../types/blog";
import Footer from "../components/Footer";

const blogData = blogDataJson as BlogData;
const articleMap = new Map(blogData.articles.map((a) => [a.slug, a]));

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articleMap.get(slug) : undefined;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background-light dark:bg-background-dark">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Article not found
        </h1>
        <Link to="/blog" className="mt-4 text-primary hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <main className="grow flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-12">
        <article className="max-w-3xl w-full">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-slate-tech/50 dark:text-white/30 hover:text-primary transition-colors mb-10 group uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-xs transition-transform group-hover:-translate-x-1">
              west
            </span>
            Return to Archive
          </Link>

          <div className="data-viewport bg-slate-900 border border-slate-tech/20 dark:border-white/10 p-2 mb-10 overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-20">
               <span
                className={`skew-x-[-12deg] px-3 py-1 text-[10px] font-mono font-black uppercase text-white shadow-mechanical ${article.color}`}
              >
                <span className="skew-x-[12deg] block">{article.category}</span>
              </span>
            </div>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-80 md:h-[450px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            />
            {/* Scanline Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>
          </div>

          <div className="flex flex-col mb-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-12 h-[1px] bg-primary"></div>
               <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em]">
                  Intel.Report
               </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-mono font-black text-gray-900 dark:text-white mb-8 leading-tight uppercase tracking-tighter">
              {article.title}
            </h1>

            <div className="bg-slate-50 dark:bg-slate-900/50 border-l-4 border-primary p-6 md:p-8 relative">
               <div className="absolute top-2 right-4 text-[40px] font-mono font-black text-primary/5 select-none uppercase">
                  ABSTRACT
               </div>
               <p className="text-sm md:text-base font-mono font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase">
                 {article.meta_description}
               </p>
            </div>
          </div>

          <div className="space-y-16">
            {article.sections.map((section, index) => (
              <section key={index} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <h2 className="text-xl font-mono font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {section.heading}
                   </h2>
                   <div className="flex-1 h-[1px] bg-slate-tech/10 dark:border-white/5"></div>
                </div>

                {section.body && (
                  <p className="text-sm font-mono font-medium text-slate-tech/80 dark:text-white/60 leading-relaxed whitespace-pre-line uppercase">
                    {section.body}
                  </p>
                )}

                {section.list && (
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {section.list.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-slate-900 p-6 border border-slate-tech/10 dark:border-white/10 relative group hover:border-primary/30 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-tech/5 dark:border-white/5">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center size-8 bg-slate-tech dark:bg-white/10 text-white font-mono font-black text-xs skew-x-[-15deg]">
                              <span className="skew-x-[15deg]">{item.rank}</span>
                            </span>
                            <h3 className="text-lg font-mono font-black text-gray-900 dark:text-white uppercase">
                              {item.name}
                            </h3>
                          </div>
                          <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1">
                            {item.role}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                           <div className="md:col-span-1">
                              <span className="text-[9px] font-mono font-black text-slate-tech/40 dark:text-white/30 uppercase block mb-2">Key Metrics</span>
                              <p className="text-[10px] font-mono font-black text-slate-tech dark:text-white uppercase">
                                {item.key_stats}
                              </p>
                           </div>
                           <div className="md:col-span-3">
                              <span className="text-[9px] font-mono font-black text-slate-tech/40 dark:text-white/30 uppercase block mb-2">Tactical Analysis</span>
                              <p className="text-xs font-mono font-bold text-slate-tech/60 dark:text-white/40 leading-relaxed uppercase italic">
                                {item.analysis}
                              </p>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <div className="mt-20 p-1 bg-slate-tech/5 dark:bg-white/5 relative overflow-hidden">
            <div className="data-viewport bg-white dark:bg-slate-900 p-8 md:p-12 border border-slate-tech/10 dark:border-white/10">
               <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

               <h2 className="text-xl font-mono font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">
                Final Assessment
               </h2>

               <p className="text-sm font-mono font-bold text-slate-tech/70 dark:text-white/50 leading-relaxed mb-10 uppercase">
                {article.conclusion}
               </p>

               <div className="bg-primary/5 border border-primary/20 p-8 skew-x-[-5deg] relative">
                  <div className="skew-x-[5deg]">
                    <span className="material-symbols-outlined text-primary text-4xl mb-4 block text-center">
                       priority_high
                    </span>
                    <p className="font-mono font-black text-primary text-base md:text-xl text-center uppercase tracking-tighter">
                      “{article.cta}”
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
