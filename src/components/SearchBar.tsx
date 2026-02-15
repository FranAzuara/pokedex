import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemonList } from "../services/pokemonService";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const data = await getPokemonList(1500, 0);
        setAllPokemon(data.results.map((p) => p.name));
      } catch (error) {
        console.error("Error fetching Pokémon list for search:", error);
      }
    };
    fetchAllPokemon();
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = allPokemon
        .filter((pokemon) => pokemon.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); // Limit suggestions to 5
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (name?: string) => {
    const query = (name || searchTerm).toLowerCase().trim();

    // If we have an exact match in the list, go to it
    if (allPokemon.includes(query)) {
      navigate(`/pokemon/${query}`);
      setSearchTerm("");
      setSuggestions([]);
      return;
    }

    // If not an exact match but we have suggestions, take the first one
    if (!name && suggestions.length > 0) {
      navigate(`/pokemon/${suggestions[0].toLowerCase()}`);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1" ref={searchBarRef}>
        <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Find Your Favorite Pokémon
        </h2>
        <div className="px-4 py-3 relative">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <button
                onClick={() => handleSearch()}
                className="text-gray-500 dark:text-gray-400 flex border-none bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0 cursor-pointer hover:text-primary transition-colors"
                aria-label="Search"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  search
                </span>
              </button>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-gray-800 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
                placeholder="Search for a Pokémon... (e.g., Pikachu)"
                type="search"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
              />
            </div>
          </label>

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-[calc(100%-2rem)] left-4 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
              {suggestions.map((name) => (
                <li
                  key={name}
                  onClick={() => handleSearch(name)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer capitalize text-gray-900 dark:text-white"
                >
                  {name}
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
