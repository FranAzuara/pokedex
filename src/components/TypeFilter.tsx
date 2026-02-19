import React from "react";
import { useSearchParams } from "react-router-dom";
import { TYPE_COLORS } from "../constants/pokemon";

const types = Object.keys(TYPE_COLORS);

const TypeFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTypes = searchParams.get("types")?.split(",").filter(Boolean) || [];

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
    newParams.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 pb-3">
          <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Filter by Type
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {selectedTypes.length} / 3 selected
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2 px-4 py-2">
          {types.map((type) => {
            const isSelected = selectedTypes.includes(type);
            const isActive = selectedTypes.length === 0 || isSelected;

            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                style={{ backgroundColor: TYPE_COLORS[type] }}
                className={`
                  px-2 py-2 rounded-lg text-white font-bold text-xs uppercase tracking-wider transition-all duration-200
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
    </div>
  );
};

export default TypeFilter;
