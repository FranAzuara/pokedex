import React from "react";
import { TYPE_COLORS } from "../constants/pokemon";

interface PokemonDescriptionProps {
  id: string;
  name: string;
  image: string;
  description: string;
  types: string[];
  generation: string;
}

const PokemonDescription: React.FC<PokemonDescriptionProps> = ({
  id,
  name,
  image,
  description,
  types,
  generation,
}) => {
  const primaryType = types[0]?.toLowerCase() || "normal";
  const bgColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        <div className="data-viewport group flex flex-col md:flex-row gap-0 min-h-110 !text-slate-tech/10 dark:!text-white/10">
          <div className="viewport-content flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-tech/5 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-mono font-black tracking-tighter uppercase italic">
                Active Scan
              </span>
              <div className="h-px flex-1 bg-slate-tech/20 dark:bg-white/10"></div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter italic uppercase text-gray-900 dark:text-white">
              {name} <span className="text-primary font-mono not-italic text-3xl md:text-5xl ml-2">#{id.padStart(3, "0")}</span>
            </h1>

            <p className="text-lg md:text-xl font-medium leading-relaxed mt-6 text-gray-600 dark:text-gray-300 max-w-md border-l-2 border-primary/30 pl-6 py-2 italic">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 mt-10">
              <div className="flex gap-2">
                {types.map((type) => (
                  <span
                    key={type}
                    style={{ backgroundColor: TYPE_COLORS[type] }}
                    className="px-6 py-1 text-white font-black text-xs uppercase tracking-widest skew-x-[-12deg] shadow-mechanical"
                  >
                    <span className="skew-x-[12deg] block">{type}</span>
                  </span>
                ))}
              </div>
              <p className="text-[10px] font-mono font-black text-slate-tech/40 dark:text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">
                  database
                </span>
                {generation}
              </p>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/50 border-l border-slate-tech/10 dark:border-white/10">
            {/* Scanner Overlays */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
               <div className="absolute top-4 left-4 size-12 border-t-2 border-l-2 border-primary"></div>
               <div className="absolute top-4 right-4 size-12 border-t-2 border-r-2 border-primary"></div>
               <div className="absolute bottom-4 left-4 size-12 border-b-2 border-l-2 border-primary"></div>
               <div className="absolute bottom-4 right-4 size-12 border-b-2 border-r-2 border-primary"></div>
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30 animate-[pulse_2s_infinite]"></div>
            </div>

            <img
              src={image}
              alt={name}
              className="w-4/5 h-auto relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-700"
            />

            {/* Identity Background */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundColor: bgColor }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDescription;
