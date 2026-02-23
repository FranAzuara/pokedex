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
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
      <div className="layout-content-container flex flex-col max-w-5xl flex-1">
        <div className="mx-4 p-8 data-viewport rounded-2xl flex flex-col items-center gap-6 text-center border-2 border-slate-tech/10">
          <div className="viewport-content flex flex-col items-center gap-4">
            <div className="size-16 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full border-2 border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-3xl text-primary animate-spin-slow">
                casino
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-gray-900 dark:text-white text-xl font-black uppercase tracking-tighter italic">
                RNG Data Extraction
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em]">
                Unidentified Signal Detected
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md font-medium">
              Initialize the random number generator to pull a random Pokémon
              profile from the encrypted global archive.
            </p>

            <button
              onClick={handleRandom}
              disabled={allPokemon.length === 0}
              className="btn-mechanical mt-2 flex items-center gap-3 bg-primary hover:brightness-110 disabled:bg-gray-400 text-white px-10 py-4 rounded-none font-black uppercase text-xs tracking-[0.2em] skew-x-[-12deg] transition-all cursor-pointer"
            >
              <span className="skew-x-[12deg] flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">bolt</span>
                Execute Protocol
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPokemon;
