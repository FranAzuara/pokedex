import React from 'react';
import PokedexCard from './PokedexCard';

const mockPokemon = [
  { id: '1', name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', types: ['Grass', 'Poison'] },
  { id: '2', name: 'Ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png', types: ['Grass', 'Poison'] },
  { id: '3', name: 'Venusaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png', types: ['Grass', 'Poison'] },
  { id: '4', name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', types: ['Fire'] },
  { id: '5', name: 'Charmeleon', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png', types: ['Fire'] },
  { id: '6', name: 'Charizard', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', types: ['Fire', 'Flying'] },
  { id: '7', name: 'Squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', types: ['Water'] },
  { id: '8', name: 'Wartortle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png', types: ['Water'] },
  { id: '9', name: 'Blastoise', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png', types: ['Water'] },
];

const PokedexGallery: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-4 px-4">
          {mockPokemon.map((pokemon) => (
            <PokedexCard key={pokemon.id} {...pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokedexGallery;
