import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-1 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md shadow-sm">
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-6 py-3">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-4 text-gray-900 dark:text-white"
          >
            <div className="size-6 text-primary">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"></path>
                <path
                  d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14.5c-3.58 0-6.5-2.92-6.5-6.5S8.42 5.5 12 5.5s6.5 2.92 6.5 6.5-2.92 6.5-6.5 6.5zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                  fill="#fff"
                ></path>
                <path
                  d="M12 6.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
                  fill="#fff"
                ></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              PokéBlog
            </h2>
          </Link>
          <nav className="hidden sm:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link
                className="text-sm font-medium leading-normal text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium leading-normal text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                to="/pokedex"
              >
                Pokédex
              </Link>
              <Link
                className="text-sm font-medium leading-normal text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                to="/comparator"
              >
                Comparator
              </Link>
              <Link
                className="text-sm font-medium leading-normal text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                to="/blog"
              >
                Blog
              </Link>
            </div>
          </nav>
          <button
            className="sm:hidden text-gray-800 dark:text-gray-200 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </header>
        {isMenuOpen && (
          <nav className="sm:hidden flex flex-col bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
            <Link
              to="/"
              onClick={closeMenu}
              className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              Home
            </Link>
            <Link
              to="/pokedex"
              onClick={closeMenu}
              className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              Pokédex
            </Link>
            <Link
              to="/comparator"
              onClick={closeMenu}
              className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              Comparator
            </Link>
            <Link
              to="/blog"
              onClick={closeMenu}
              className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Blog
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
