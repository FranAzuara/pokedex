import React, { useEffect, useState } from 'react';
import PokedexCard from './PokedexCard';
import { getPokemonList, getPokemon } from '../services/pokemonService';
import type { PokemonDetail } from '../types/pokemon';

const PokedexGallery: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const listData = await getPokemonList(20, 0);
        const detailedPokemon = await Promise.all(
          listData.results.map((p) => getPokemon(p.name))
        );
        setPokemonList(detailedPokemon);
      } catch (err) {
        setError('Failed to load Pokémon. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-4 px-4">
          {pokemonList.map((pokemon) => (
            <PokedexCard
              key={pokemon.id}
              id={pokemon.id.toString()}
              name={pokemon.name}
              image={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
              types={pokemon.types.map((t) => t.type.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokedexGallery;
