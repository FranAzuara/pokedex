import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PokemonDescription from "../components/PokemonDescription";
import PokemonDetails from "../components/PokemonDetails";
import PokemonEvolutionChain from "../components/PokemonEvolutionChain";
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChainByUrl,
  flattenEvolutionChain,
  getRandomFlavorText,
} from "../services/pokemonService";
import type { PokemonDetail, PokemonSpecies } from "../types/pokemon";

const PokemonInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutions, setEvolutions] = useState<
    { name: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const pokemonData = await getPokemon(id);
        const speciesData = await getPokemonSpecies(id);
        const evolutionChainData = await getEvolutionChainByUrl(
          speciesData.evolution_chain.url,
        );

        const evolutionNames = flattenEvolutionChain(evolutionChainData.chain);
        const evolutionDetails = await Promise.all(
          evolutionNames.map(async (name) => {
            const data = await getPokemon(name);
            return {
              name: data.name,
              image:
                data.sprites.other?.["official-artwork"]?.front_default ||
                data.sprites.front_default,
            };
          }),
        );

        setPokemon(pokemonData);
        setSpecies(speciesData);
        setEvolutions(evolutionDetails);
      } catch (err) {
        setError("Failed to load Pokémon details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !pokemon || !species) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || "Pokémon not found."}
      </div>
    );
  }

  const description = getRandomFlavorText(species.flavor_text_entries);
  const abilities = pokemon.abilities
    .filter((a) => !a.is_hidden)
    .map((a) => a.ability.name);
  const hiddenAbility =
    pokemon.abilities.find((a) => a.is_hidden)?.ability.name || "None";

  const stats = pokemon.stats.map((s) => ({
    name: s.stat.name.toUpperCase(),
    value: s.base_stat,
  }));

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#111418]">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main className="grow pb-12">
          <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-2">
            <div className="layout-content-container flex flex-col max-w-240 flex-1">
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/pokedex" className="hover:text-primary">
                  Pokédex
                </Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium capitalize">
                  {pokemon.name}
                </span>
              </div>
            </div>
          </div>

          <PokemonDescription
            id={pokemon.id.toString()}
            name={pokemon.name}
            image={
              pokemon.sprites.other?.["official-artwork"]?.front_default ||
              pokemon.sprites.front_default
            }
            description={description}
            types={pokemon.types.map((t) => t.type.name)}
          />

          <PokemonDetails
            height={`${pokemon.height / 10} m`}
            weight={`${pokemon.weight / 10} kg`}
            abilities={abilities}
            hiddenAbility={hiddenAbility}
            stats={stats}
          />

          <PokemonEvolutionChain evolutions={evolutions} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PokemonInfo;
