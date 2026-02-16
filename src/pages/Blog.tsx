import React from "react";
import { Link } from "react-router-dom";
import blogDataJson from "../../context/blog-news.json";
import type { BlogData } from "../types/blog";
import Footer from "../components/Footer";

const blogData = blogDataJson as BlogData;

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <main className="flex-grow py-10">
        <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="px-4 py-10">
              <h1 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                Our Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Explore in-depth guides, competitive strategies, and the rich lore of the Pokémon universe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
              {blogData.articles.map((article) => (
                <Link
                  to={`/blog/${article.slug}`}
                  key={article.id}
                  className="group flex flex-col gap-4 rounded-3xl bg-white dark:bg-background-dark/50 overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-xl dark:hover:shadow-primary/10 border border-gray-100 dark:border-gray-800"
                >
                  <div className="overflow-hidden h-64">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6 pt-2">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${article.color}`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {article.meta_description}
                    </p>
                    <div className="flex items-center text-primary font-bold mt-2 gap-1">
                      Read more
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
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
