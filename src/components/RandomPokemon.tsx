import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSpeciesNames } from "../services/pokemonService";
import { VALID_HYPHENATED_NAMES } from "../constants/pokemon";

const RandomPokemon: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const speciesNames = await getAllSpeciesNames(VALID_HYPHENATED_NAMES);
        setAllPokemon(speciesNames);
      } catch (error) {
        console.error("Error fetching pokemon for random choice:", error);
      }
    };
    fetchAllPokemon();
  }, []);

  const handleRandom = () => {
    if (allPokemon.length > 0) {
      const randomIndex = Math.floor(Math.random() * allPokemon.length);
      const randomPokemon = allPokemon[randomIndex];
      navigate(`/pokemon/${randomPokemon}`);
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="mx-4 flex flex-col items-center gap-4 py-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
            Random Pokémon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center px-4 font-medium">
            Don't know which Pokémon to search for? Try your luck and discover one at random!
          </p>
          <button
            onClick={handleRandom}
            disabled={allPokemon.length === 0}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white px-10 py-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md border-none cursor-pointer"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              casino
            </span>
            I'm Feeling Lucky
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomPokemon;
