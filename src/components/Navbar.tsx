import React, { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Pokédex", path: "/pokedex" },
  { label: "Comparator", path: "/comparator" },
  { label: "Blog", path: "/blog" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center border-b-4 border-primary bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1 px-4 sm:px-8">
        <header className="flex items-center justify-between py-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 text-gray-900 dark:text-white group"
          >
            <div className="size-10 flex items-center justify-center bg-primary rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <svg
                className="size-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-black leading-tight tracking-tighter uppercase italic">
                Poké<span className="text-primary">Blog</span>
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Data Archive v2.0
              </span>
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors relative group py-2"
                to={link.path}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <button
            className="sm:hidden size-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </header>

        {isMenuOpen && (
          <nav className="sm:hidden flex flex-col bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 pb-4 animate-in slide-in-from-top duration-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
