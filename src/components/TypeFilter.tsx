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
      <div className="layout-content-container flex flex-col w-full max-w-[1200px] px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between px-4 pb-4">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold">
            Filters
          </h2>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Types Accordion */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden h-fit">
            <button
              onClick={() => setIsTypesOpen(!isTypesOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-900 dark:text-white font-bold">
                  Filter by Type
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                  {selectedTypes.length}/3
                </span>
              </div>
              <span
                className={`material-symbols-outlined transition-transform duration-300 ${isTypesOpen ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>

            {isTypesOpen && (
              <div className="p-4 pt-0">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {types.map((type) => {
                    const isSelected = selectedTypes.includes(type);
                    const isActive = selectedTypes.length === 0 || isSelected;

                    return (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        style={{ backgroundColor: TYPE_COLORS[type] }}
                        className={`
                          px-1 py-2 rounded-lg text-white font-bold text-xs uppercase tracking-wider transition-all duration-200
                          ${isSelected ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600 scale-105 shadow-md" : ""}
                          ${isActive ? "opacity-100" : "opacity-40 hover:opacity-60"}
                        `}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Generations Accordion */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden h-fit">
            <button
              onClick={() => setIsGensOpen(!isGensOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-900 dark:text-white font-bold">
                  Filter by Generation
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                  {selectedGens.length}/2
                </span>
              </div>
              <span
                className={`material-symbols-outlined transition-transform duration-300 ${isGensOpen ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>

            {isGensOpen && (
              <div className="p-4 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {generations.map((gen) => {
                    const isSelected = selectedGens.includes(gen);
                    const isActive = selectedGens.length === 0 || isSelected;

                    return (
                      <button
                        key={gen}
                        onClick={() => toggleGen(gen)}
                        className={`
                          px-2 py-2 rounded-lg font-medium text-xs transition-all duration-200 border
                          ${
                            isSelected
                              ? "bg-primary text-white border-primary shadow-md scale-105"
                              : "bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-primary/50"
                          }
                          ${isActive ? "opacity-100" : "opacity-40 hover:opacity-60"}
                        `}
                      >
                        {GENERATION_MAP[gen].split(" - ")[0]}
                        <span className="block text-xs opacity-70">
                          {GENERATION_MAP[gen].split(" - ")[1]}
                        </span>
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
