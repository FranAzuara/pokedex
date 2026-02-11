import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PokemonDescription from '../components/PokemonDescription';
import PokemonDetails from '../components/PokemonDetails';
import PokemonEvolutionChain from '../components/PokemonEvolutionChain';
import { Link } from 'react-router-dom';

const PokemonInfo: React.FC = () => {
  // Mock data for Bulbasaur (id 1)
  const bulbasaurData = {
    id: '1',
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    description: 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
    types: ['Grass', 'Poison'],
    height: "0.7 m (2'04\")",
    weight: '6.9 kg (15.2 lbs)',
    abilities: ['Overgrow'],
    hiddenAbility: 'Chlorophyll',
    stats: [
      { name: 'HP', value: 45 },
      { name: 'Attack', value: 49 },
      { name: 'Defense', value: 49 },
      { name: 'Sp. Atk', value: 65 },
      { name: 'Sp. Def', value: 65 },
      { name: 'Speed', value: 45 },
    ],
    evolutions: [
      { name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
      { name: 'Ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png', level: 16 },
      { name: 'Venusaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png', level: 32 },
    ]
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#111418]">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main className="flex-grow pb-12">
           <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-2">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/pokedex" className="hover:text-primary">Pokédex</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium">{bulbasaurData.name}</span>
              </div>
            </div>
          </div>

          <PokemonDescription
            id={bulbasaurData.id}
            name={bulbasaurData.name}
            image={bulbasaurData.image}
            description={bulbasaurData.description}
            types={bulbasaurData.types}
          />

          <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
               <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700 px-4">
                  <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary">About</button>
                  <button className="pb-4 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Base Stats</button>
                  <button className="pb-4 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Evolutions</button>
               </div>
            </div>
          </div>

          <PokemonDetails
            height={bulbasaurData.height}
            weight={bulbasaurData.weight}
            abilities={bulbasaurData.abilities}
            hiddenAbility={bulbasaurData.hiddenAbility}
            stats={bulbasaurData.stats}
          />

          <PokemonEvolutionChain evolutions={bulbasaurData.evolutions} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PokemonInfo;
