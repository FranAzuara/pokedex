import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
      <div className="layout-content-container flex flex-col max-w-5xl flex-1">
        <div className="data-viewport rounded-3xl p-1 shadow-2xl border-4 border-slate-tech/30">
          <div className="viewport-content bg-gradient-to-br from-slate-900/90 to-slate-800/95 p-8 md:p-16 flex flex-col items-center text-center gap-8 min-h-[400px] justify-center relative overflow-hidden">
            {/* Technical Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 size-32 border-l-2 border-t-2 border-accent"></div>
              <div className="absolute bottom-10 right-10 size-32 border-r-2 border-b-2 border-accent"></div>
            </div>

            <div className="flex flex-col gap-4 max-w-2xl relative z-10">
              <div className="inline-flex items-center self-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-[10px] font-mono uppercase tracking-widest mb-4">
                <span className="size-2 bg-accent rounded-full animate-pulse"></span>
                System Online // Global Database Access
              </div>

              <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic drop-shadow-lg">
                Explore the <span className="text-primary">World</span> of Pokémon
              </h1>

              <p className="text-gray-300 text-sm md:text-lg font-medium leading-relaxed max-w-xl self-center">
                Your high-performance interface for Pokémon news,
                advanced data analytics, and comprehensive species archival.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4 relative z-10">
              <Link
                to="/pokedex"
                className="btn-mechanical bg-primary text-white text-xs font-black uppercase tracking-[0.2em] h-14 px-10 flex items-center justify-center rounded-none skew-x-[-12deg] hover:brightness-110 active:scale-95 transition-all"
              >
                <span className="skew-x-[12deg]">Initialize Pokedex</span>
              </Link>
              <Link
                to="/comparator"
                className="btn-mechanical bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] h-14 px-10 flex items-center justify-center rounded-none skew-x-[-12deg] hover:bg-white/20 active:scale-95 transition-all"
              >
                <span className="skew-x-[12deg]">Run Comparator</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
