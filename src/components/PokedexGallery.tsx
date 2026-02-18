import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PokedexCard from "./PokedexCard";
import Pagination from "./Pagination";
import {
  getPokemonList,
  getPokemon,
  getPokemonByType,
} from "../services/pokemonService";
import type { PokemonDetail } from "../types/pokemon";

const ITEMS_PER_PAGE = 100;

const PokedexGallery: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [totalCount, setTotalCount] = useState<number>(0);

  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const selectedTypes =
          searchParams.get("types")?.split(",").filter(Boolean) || [];

        let detailedPokemon: PokemonDetail[] = [];
        let count = 0;

        if (selectedTypes.length > 0) {
          // Fetch by type
          const typeResponses = await Promise.all(
            selectedTypes.map((type) => getPokemonByType(type)),
          );

          if (!active) return;

          // Union results
          const uniquePokemonMap = new Map<
            string,
            { name: string; url: string }
          >();
          typeResponses.forEach((res) => {
            res.pokemon.forEach((p) => {
              uniquePokemonMap.set(p.pokemon.name, p.pokemon);
            });
          });

          const allFilteredPokemon = Array.from(uniquePokemonMap.values());

          // Sort by ID
          const sortedPokemon = allFilteredPokemon.toSorted((a, b) => {
            const idA = parseInt(
              a.url.split("/").filter(Boolean).pop() || "0",
              10,
            );
            const idB = parseInt(
              b.url.split("/").filter(Boolean).pop() || "0",
              10,
            );
            return idA - idB;
          });

          count = sortedPokemon.length;

          // Fetch all in batches to avoid overwhelming the network
          const batchSize = 50;
          for (let i = 0; i < sortedPokemon.length; i += batchSize) {
            const batch = sortedPokemon.slice(i, i + batchSize);
            const batchResults = await Promise.all(
              batch.map((p) => getPokemon(p.name)),
            );
            if (!active) break;
            detailedPokemon.push(...batchResults);
          }
        } else {
          // Original paginated fetch
          const offset = (currentPage - 1) * ITEMS_PER_PAGE;
          const listData = await getPokemonList(ITEMS_PER_PAGE, offset);
          count = listData.count;

          if (!active) return;

          detailedPokemon = await Promise.all(
            listData.results.map((p) => getPokemon(p.name)),
          );
        }

        if (!active) return;

        setTotalCount(count);
        setPokemonList(detailedPokemon);

        // Scroll to top of gallery when page changes
        if (galleryRef.current) {
          galleryRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (err) {
        if (active) {
          setError("Failed to load Pokémon. Please try again later.");
          console.error(err);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPokemon();
    return () => {
      active = false;
    };
  }, [currentPage, searchParams]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
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
        <div className="layout-content-container flex flex-col max-w-240 flex-1">
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
                    currentPage={currentPage}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {totalPages > 1 &&
      !searchParams.get("types")?.split(",").filter(Boolean).length ? (
        <div className="sticky bottom-0 w-full py-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-20 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_-2px_4px_-1px_rgba(0,0,0,0.03)]">
          <div className="max-w-240 w-full px-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PokedexGallery;
