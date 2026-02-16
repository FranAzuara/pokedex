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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article not found</h1>
        <Link to="/blog" className="mt-4 text-primary hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <main className="flex-grow flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-10">
        <article className="max-w-[800px] w-full">
          <Link to="/blog" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-6 group">
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            Back to Blog
          </Link>

          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-3xl shadow-lg mb-8"
          />

          <div className="flex items-center gap-2 mb-4">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${article.color}`}>
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic mb-10 border-l-4 border-primary pl-4">
            {article.meta_description}
          </p>

          <div className="space-y-12">
            {article.sections.map((section, index) => (
              <section key={index} className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {section.heading}
                </h2>
                {section.body && (
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                )}
                {section.list && (
                  <div className="grid grid-cols-1 gap-6 mt-4">
                    {section.list.map((item, i) => (
                      <div key={i} className="bg-white dark:bg-background-dark/40 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center justify-center size-8 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                            {item.rank}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h3>
                        </div>
                        <p className="text-sm font-semibold text-primary mb-2">{item.role}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">{item.key_stats}</p>
                        <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">{item.analysis}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {article.conclusion}
            </p>
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-background-dark/60 shadow-inner">
               <p className="font-bold text-primary italic text-center">“{article.cta}”</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
