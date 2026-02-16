import React from "react";
import { Link } from "react-router-dom";
import blogDataJson from "../../context/blog-news.json";
import type { BlogData } from "../types/blog";

const blogData = blogDataJson as BlogData;

const News: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Latest from the Blog
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {blogData.articles.map((article) => (
            <Link
              to={`/blog/${article.slug}`}
              key={article.id}
              className="flex flex-col gap-4 rounded-xl bg-white dark:bg-background-dark/50 overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-primary/20"
            >
              <img
                className="h-48 w-full object-cover"
                src={article.image}
                alt={article.title}
                loading="lazy"
                decoding="async"
                width={480}
                height={192}
              />
              <div className="flex flex-col gap-3 p-4 pt-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${article.color}`}
                  >
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
                  {article.title}
                </h3>
                <p className="text-sm font-normal text-gray-600 dark:text-gray-300 line-clamp-3">
                  {article.meta_description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
