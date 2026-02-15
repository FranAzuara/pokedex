import React, { useEffect, useState, useRef } from "react";
import PokedexCard from "./PokedexCard";
import Pagination from "./Pagination";
import { getPokemonList, getPokemon } from "../services/pokemonService";
import type { PokemonDetail } from "../types/pokemon";

const ITEMS_PER_PAGE = 100;

const PokedexGallery: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const listData = await getPokemonList(ITEMS_PER_PAGE, offset);

        setTotalCount(listData.count);

        const detailedPokemon = await Promise.all(
          listData.results.map((p) => getPokemon(p.name)),
        );
        setPokemonList(detailedPokemon);

        // Scroll to top of gallery when page changes
        if (galleryRef.current) {
          galleryRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (err) {
        setError("Failed to load Pokémon. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading && pokemonList.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-10 text-red-500">{error}</div>
    );
  }

  return (
    <div ref={galleryRef} className="w-full flex flex-col items-center">
      <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5 w-full">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-4 px-4 pb-10">
                {pokemonList.map((pokemon) => (
                  <PokedexCard
                    key={pokemon.id}
                    id={pokemon.id.toString()}
                    name={pokemon.name}
                    image={
                      pokemon.sprites.other?.["official-artwork"]
                        ?.front_default || pokemon.sprites.front_default
                    }
                    types={pokemon.types.map((t) => t.type.name)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="sticky bottom-0 w-full py-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-20 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_-2px_4px_-1px_rgba(0,0,0,0.03)]">
          <div className="max-w-[960px] w-full px-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokedexGallery;
