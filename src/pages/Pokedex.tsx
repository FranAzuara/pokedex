import React from "react";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import PokedexGallery from "../components/PokedexGallery";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Pokedex: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <main className="grow">
          <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
            <div className="layout-content-container flex flex-col max-w-5xl flex-1">
              <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4">
                <Link to="/" className="hover:text-primary transition-colors">
                  ROOT
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-primary">
                  INDEX_POKEDEX
                </span>
              </div>

              <div className="data-viewport rounded-2xl p-8 border-2 border-slate-tech/10">
                <div className="viewport-content">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="inline-flex items-center gap-2 text-accent text-[10px] font-mono uppercase tracking-[0.3em] mb-1">
                        <span className="size-1.5 bg-accent rounded-full animate-pulse"></span>
                        Accessing Global Registry
                      </div>
                      <h1 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase italic">
                        The <span className="text-primary">Pokédex</span>
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-xl mt-2">
                        Comprehensive biological and statistical archival of all known Pokémon species.
                        Filter by type or generation to narrow your search.
                      </p>
                    </div>
                    <div className="hidden lg:block">
                      <div className="text-right">
                        <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">Database Version</span>
                        <span className="block text-sm font-black text-gray-900 dark:text-white font-mono">v1.24.9-Stable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SearchBar hideHeader />
          <TypeFilter />
          <PokedexGallery />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Pokedex;
