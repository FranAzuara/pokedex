import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-12 mt-auto">
      <div className="layout-content-container flex flex-col max-w-5xl flex-1">
        <footer className="border-t border-slate-tech/10 dark:border-white/5 mt-8 pt-10 relative overflow-hidden">
          {/* Subtle Grid Background for Footer */}
          <div className="absolute inset-0 bg-grid-slate-tech/[0.02] dark:bg-grid-white/[0.02] -z-10"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-primary skew-x-[-20deg]"></div>
                <span className="text-sm font-mono font-black text-gray-900 dark:text-white uppercase tracking-widest">
                  Technical Archive Unit
                </span>
              </div>
              <p className="text-[10px] font-mono font-bold text-slate-tech/40 dark:text-white/30 uppercase tracking-tight">
                Codename: Pokedex.Global_Mainframe.v4.0.0
              </p>
            </div>

            <div className="flex items-center gap-6">
               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest mb-1">Status</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-mono font-bold text-slate-tech/60 dark:text-white/40 uppercase">Linked</span>
                  </div>
               </div>
               <div className="w-[1px] h-8 bg-slate-tech/10 dark:border-white/5"></div>
               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono font-black text-slate-tech/60 dark:text-white/40 uppercase tracking-widest mb-1">Source</span>
                  <a className="text-[9px] font-mono font-black text-primary hover:text-red-600 transition-colors uppercase" href="https://pokeapi.co/">
                    pokeapi.co
                  </a>
               </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <p className="text-[10px] font-mono font-bold text-slate-tech/50 dark:text-white/30 uppercase">
                © 2024 TERMINAL_INTEL. ALL RIGHTS RESERVED.
              </p>
              <p className="text-[9px] font-mono font-bold text-slate-tech/30 dark:text-white/10 uppercase mt-1">
                Data Retrieval authorized for Field Agents.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
             <div className="h-0.5 w-full max-w-xs bg-gradient-to-r from-transparent via-slate-tech/10 dark:via-white/5 to-transparent"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
