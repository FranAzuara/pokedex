import React from "react";

interface Stat {
  name: string;
  value: number;
}

interface PokemonDetailsProps {
  height: string;
  weight: string;
  abilities: string[];
  hiddenAbility: string;
  stats: Stat[];
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  height,
  weight,
  abilities,
  hiddenAbility,
  stats,
}) => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1 border-x border-slate-tech/10 dark:border-white/10 bg-white dark:bg-slate-900 p-0 shadow-sm relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"></div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Details Section */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-slate-tech/5 dark:border-white/5">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary text-xl">biometrics</span>
              <h2 className="text-sm font-mono font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
                Biological Spec
              </h2>
            </div>

            <div className="space-y-6">
              {[
                { label: "Height", value: height },
                { label: "Weight", value: weight },
                { label: "Abilities", value: abilities.join(", "), capitalize: true },
                { label: "Hidden", value: hiddenAbility, capitalize: true },
              ].map((item) => (
                <div key={item.label} className="group flex flex-col gap-1">
                  <span className="text-[10px] font-mono font-bold text-slate-tech/40 dark:text-white/40 uppercase tracking-widest">
                    {item.label}
                  </span>
                  <div className="flex items-end justify-between border-b border-slate-tech/10 dark:border-white/10 pb-1 group-hover:border-primary/30 transition-colors">
                    <span className={`text-sm font-black text-gray-900 dark:text-white ${item.capitalize ? 'capitalize' : ''}`}>
                      {item.value}
                    </span>
                    <div className="h-1 w-8 bg-slate-tech/10 dark:bg-white/10 group-hover:bg-primary transition-colors"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Base Stats Section */}
          <div className="p-8 bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-accent text-xl">analytics</span>
              <h2 className="text-sm font-mono font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
                Statistical Matrix
              </h2>
            </div>

            <div className="space-y-5">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end px-1">
                    <span className="text-[10px] font-mono font-black text-slate-tech/60 dark:text-white/60 uppercase">
                      {stat.name}
                    </span>
                    <span className="text-xs font-mono font-black text-primary">
                      {stat.value.toString().padStart(3, '0')}
                    </span>
                  </div>
                  <div className="h-4 bg-white dark:bg-slate-900 border border-slate-tech/10 dark:border-white/10 p-0.5 flex gap-0.5">
                    {/* Segmented bar look */}
                    <div
                      className="h-full bg-primary relative"
                      style={{ width: `${Math.min((stat.value / 255) * 100, 100)}%` }}
                    >
                       <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_90%,rgba(0,0,0,0.2)_90%)] bg-[size:10%_100%]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
