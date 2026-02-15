import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemonSpeciesNames } from "../services/pokemonService";

const VALID_HYPHENATED_NAMES = [
  "nidoran-f", "nidoran-m", "mr-mime", "ho-oh", "mime-jr", "porygon-z",
  "type-null", "jangmo-o", "hakamo-o", "kommo-o", "tapu-koko", "tapu-lele",
  "tapu-bulu", "tapu-fini", "mr-rime", "great-tusk", "scream-tail",
  "brute-bonnet", "flutter-mane", "slither-wing", "sandy-shocks",
  "iron-treads", "iron-bundle", "iron-hands", "iron-jugulis", "iron-moth",
  "iron-thorns", "wo-chien", "chien-pao", "ting-lu", "chi-yu",
  "roaring-moon", "iron-valiant", "walking-wake", "iron-leaves",
  "gouging-fire", "raging-bolt", "iron-boulder", "iron-crown"
];

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const data = await getPokemonSpeciesNames(1500, 0);
        const speciesNames = data.results
          .map((p: { name: string }) => p.name)
          .filter((name: string) => !name.includes("-") || VALID_HYPHENATED_NAMES.includes(name));
        setAllPokemon(speciesNames);
      } catch (error) {
        console.error("Error fetching all pokemon:", error);
      }
    };
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/pokemon/${searchTerm.toLowerCase().trim()}`);
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

    if (value.length > 0) {
      const filtered = allPokemon
        .filter((pokemon) => pokemon.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/pokemon/${name}`);
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5" ref={searchRef}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Find Your Favorite Pokémon
        </h2>
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
                placeholder="Search for a Pokémon... (e.g., Pikachu)"
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
