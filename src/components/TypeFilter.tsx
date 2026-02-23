import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TYPE_COLORS, GENERATION_MAP } from "../constants/pokemon";

const types = Object.keys(TYPE_COLORS);
const generations = Object.keys(GENERATION_MAP);

const TypeFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTypesOpen, setIsTypesOpen] = useState(true);
  const [isGensOpen, setIsGensOpen] = useState(true);

  const selectedTypes =
    searchParams.get("types")?.split(",").filter(Boolean) || [];
  const selectedGens =
    searchParams.get("generations")?.split(",").filter(Boolean) || [];

  const toggleType = (type: string) => {
    let newTypes: string[];
    if (selectedTypes.includes(type)) {
      newTypes = selectedTypes.filter((t) => t !== type);
    } else {
      if (selectedTypes.length >= 3) return;
      newTypes = [...selectedTypes, type];
    }

    const newParams = new URLSearchParams(searchParams);
    if (newTypes.length > 0) {
      newParams.set("types", newTypes.join(","));
    } else {
      newParams.delete("types");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const toggleGen = (gen: string) => {
    let newGens: string[];
    if (selectedGens.includes(gen)) {
      newGens = selectedGens.filter((g) => g !== gen);
    } else {
      if (selectedGens.length >= 2) return;
      newGens = [...selectedGens, gen];
    }

    const newParams = new URLSearchParams(searchParams);
    if (newGens.length > 0) {
      newParams.set("generations", newGens.join(","));
    } else {
      newParams.delete("generations");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("types");
    newParams.delete("generations");
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const hasFilters = selectedTypes.length > 0 || selectedGens.length > 0;

  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="layout-content-container flex flex-col w-full max-w-300 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between px-2 pb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">tune</span>
            <h2 className="text-sm font-mono font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
              Filter Matrix
            </h2>
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-[10px] font-mono font-black text-primary hover:text-red-600 uppercase tracking-widest flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              Reset System
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Types Accordion */}
          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-tech/10 dark:border-white/10 shadow-sm overflow-hidden h-fit relative">
            <button
              onClick={() => setIsTypesOpen(!isTypesOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-tech/5 dark:border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Elemental Class
                </span>
                <span className="text-[9px] font-mono font-bold text-white bg-slate-tech/40 dark:bg-white/10 px-1.5 py-0.5">
                  {selectedTypes.length}/3
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-primary transition-transform duration-300 ${isTypesOpen ? "rotate-180" : ""}`}
              >
                keyboard_arrow_down
              </span>
            </button>

            {isTypesOpen && (
              <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {types.map((type) => {
                    const isSelected = selectedTypes.includes(type);
                    const isActive = selectedTypes.length === 0 || isSelected;

                    return (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        style={{ backgroundColor: isSelected ? TYPE_COLORS[type] : undefined }}
                        className={`
                          px-1 py-2 text-[10px] font-black uppercase tracking-tighter transition-all duration-200 cursor-pointer skew-x-[-8deg] border
                          ${isSelected
                            ? "text-white border-transparent shadow-mechanical"
                            : "bg-white dark:bg-slate-800 text-slate-tech/60 dark:text-white/40 border-slate-tech/10 dark:border-white/10 hover:border-primary/50"}
                          ${isActive ? "opacity-100" : "opacity-30 hover:opacity-50"}
                        `}
                      >
                        <span className="skew-x-[8deg] block">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Generations Accordion */}
          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-tech/10 dark:border-white/10 shadow-sm overflow-hidden h-fit relative">
            <button
              onClick={() => setIsGensOpen(!isGensOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-tech/5 dark:border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Temporal Origin
                </span>
                <span className="text-[9px] font-mono font-bold text-white bg-slate-tech/40 dark:bg-white/10 px-1.5 py-0.5">
                  {selectedGens.length}/2
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-primary transition-transform duration-300 ${isGensOpen ? "rotate-180" : ""}`}
              >
                keyboard_arrow_down
              </span>
            </button>

            {isGensOpen && (
              <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {generations.map((gen) => {
                    const isSelected = selectedGens.includes(gen);
                    const isActive = selectedGens.length === 0 || isSelected;

                    return (
                      <button
                        key={gen}
                        onClick={() => toggleGen(gen)}
                        className={`
                          px-2 py-1.5 flex flex-col items-center justify-center transition-all duration-200 border cursor-pointer skew-x-[-8deg]
                          ${
                            isSelected
                              ? "bg-primary text-white border-transparent shadow-mechanical"
                              : "bg-white dark:bg-slate-800 text-slate-tech/60 dark:text-white/40 border-slate-tech/10 dark:border-white/10 hover:border-primary/50"
                          }
                          ${isActive ? "opacity-100" : "opacity-30 hover:opacity-50"}
                        `}
                      >
                        <div className="skew-x-[8deg] flex flex-col items-center">
                          <span className="text-[10px] font-black uppercase tracking-tighter">
                            {GENERATION_MAP[gen].split(" - ")[0]}
                          </span>
                          <span className="text-[8px] font-bold opacity-70 uppercase tracking-widest">
                            {GENERATION_MAP[gen].split(" - ")[1]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeFilter;
