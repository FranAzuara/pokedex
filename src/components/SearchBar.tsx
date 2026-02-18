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
  placeholder = "Search for a Pokémon... (e.g., Pikachu)",
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
        "flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5"
      }
      ref={searchRef}
    >
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        {!hideHeader && (
          <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Find Your Favorite Pokémon
          </h2>
        )}
        <div className="px-4 py-3 relative">
          <div className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden shadow-sm">
              <button
                onClick={handleSearch}
                className="text-gray-500 dark:text-gray-400 flex border-none bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Search"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  search
                </span>
              </button>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-gray-800 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
                placeholder={placeholder}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
              />
            </div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-4 right-4 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white capitalize transition-colors border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                >
                  {suggestion}
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
