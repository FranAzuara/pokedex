import React from "react";

interface EvolutionStep {
  name: string;
  image: string;
  level?: number;
}

interface PokemonEvolutionChainProps {
  evolutions: EvolutionStep[];
}

const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
  evolutions,
}) => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-10">
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        <div className="flex items-center gap-3 mb-10 px-4">
          <span className="material-symbols-outlined text-primary text-xl">account_tree</span>
          <h2 className="text-sm font-mono font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
            Morphology Sequence
          </h2>
          <div className="h-px flex-1 bg-slate-tech/10 dark:bg-white/10"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 px-4">
          {evolutions.map((step, index) => (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center gap-4 group">
                <div className="data-viewport size-36 md:size-44 !p-0 border border-slate-tech/20 dark:border-white/20 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                  <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 z-0"></div>
                  <img
                    src={step.image}
                    alt={step.name}
                    className="w-full h-full object-contain p-4 relative z-10 transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Frame corner accents */}
                  <div className="absolute top-1 left-1 size-2 border-t border-l border-primary/40"></div>
                  <div className="absolute bottom-1 right-1 size-2 border-b border-r border-primary/40"></div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[10px] font-mono font-black text-slate-tech/40 dark:text-white/40 uppercase tracking-tighter mb-0.5">
                    Phase 0{index + 1}
                  </p>
                  <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter italic group-hover:text-primary transition-colors">
                    {step.name}
                  </p>
                </div>
              </div>

              {index < evolutions.length - 1 && (
                <div className="flex flex-col items-center gap-1 mx-2">
                  <div className="flex items-center">
                    <div className="w-4 h-px bg-slate-tech/20 dark:bg-white/20"></div>
                    <span className="material-symbols-outlined text-primary text-xl mx-1 animate-[pulse_2s_infinite]">
                      double_arrow
                    </span>
                    <div className="w-4 h-px bg-slate-tech/20 dark:bg-white/20"></div>
                  </div>
                  {step.level && (
                    <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 px-1.5 py-0.5">
                      Lvl {step.level}
                    </span>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonEvolutionChain;
