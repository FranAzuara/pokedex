import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSpeciesNames } from "../services/pokemonService";
import { VALID_HYPHENATED_NAMES } from "../constants/pokemon";

interface SearchBarProps {
  onSelect?: (name: string) => void;
  placeholder?: string;
  hideHeader?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  placeholder = "SEARCH_DATABASE...",
  hideHeader = false,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];
    return allPokemon
      .filter((pokemon) => pokemon.toLowerCase().includes(term))
      .slice(0, 5);
  }, [searchTerm, allPokemon]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const speciesNames = await getAllSpeciesNames(VALID_HYPHENATED_NAMES);
        setAllPokemon(speciesNames);
      } catch (error) {
        console.error("Error fetching all pokemon:", error);
      }
    };
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (term) {
      if (onSelect) {
        onSelect(term);
        setSearchTerm("");
      } else {
        navigate(`/pokemon/${term}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (name: string) => {
    if (onSelect) {
      onSelect(name);
      setSearchTerm("");
    } else {
      setSearchTerm(name);
      navigate(`/pokemon/${name}`);
    }
    setShowSuggestions(false);
  };

  return (
    <div
      className={
        className ||
        "flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8"
      }
      ref={searchRef}
    >
      <div className="layout-content-container flex flex-col max-w-5xl flex-1">
        {!hideHeader && (
          <div className="flex items-center gap-3 px-4 pb-4">
            <span className="size-2 bg-primary rounded-full animate-pulse"></span>
            <h2 className="text-gray-900 dark:text-white text-xs font-mono uppercase tracking-[0.3em] font-black">
              Neural Search Interface
            </h2>
          </div>
        )}
        <div className="px-4 relative group">
          <div className="flex items-center bg-white dark:bg-slate-900 border-2 border-slate-tech/20 dark:border-white/10 group-focus-within:border-accent transition-colors shadow-sm overflow-hidden">
            <div className="pl-4 text-slate-tech/40 dark:text-white/40">
              <span className="font-mono text-sm tracking-tighter">&gt;_</span>
            </div>
            <input
              className="terminal-input flex w-full min-w-0 flex-1 border-none bg-transparent h-14 px-4 text-gray-900 dark:text-white text-sm font-mono placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0"
              placeholder={placeholder}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
            />
            <button
              onClick={handleSearch}
              className="h-14 px-6 bg-slate-100 dark:bg-slate-800 border-l border-slate-tech/10 dark:border-white/5 text-slate-tech hover:text-primary dark:text-white transition-colors"
              aria-label="Execute Search"
            >
              <span className="material-symbols-outlined text-xl">
                search
              </span>
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-4 right-4 top-full mt-2 bg-white dark:bg-slate-900 border-2 border-accent/50 shadow-2xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              <li className="px-4 py-2 bg-accent/10 text-[10px] font-mono uppercase tracking-widest text-accent flex justify-between">
                <span>Top Results</span>
                <span>Found: {suggestions.length}</span>
              </li>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-6 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-900 dark:text-white capitalize transition-colors flex items-center justify-between group"
                >
                  <span className="font-mono text-sm tracking-tight">{suggestion}</span>
                  <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                    arrow_forward
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
