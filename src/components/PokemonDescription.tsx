import React from 'react';

interface PokemonDescriptionProps {
  id: string;
  name: string;
  image: string;
  description: string;
  types: string[];
}

const typeColors: Record<string, string> = {
  grass: '#9bcc50',
  fire: '#ff4422',
  water: '#3399ff',
  bug: '#aabb22',
  normal: '#aaaa99',
  poison: '#aa5599',
  electric: '#ffcc33',
  ground: '#ddbb55',
  fairy: '#ee99ee',
  fighting: '#bb5544',
  psychic: '#ff5599',
  rock: '#bbaa66',
  ghost: '#6666bb',
  ice: '#66ccff',
  dragon: '#7766ee',
  dark: '#775544',
  steel: '#aaaabb',
  flying: '#8899ff',
};

const PokemonDescription: React.FC<PokemonDescriptionProps> = ({ id, name, image, description, types }) => {
  const primaryType = types[0]?.toLowerCase() || 'normal';
  const bgColor = typeColors[primaryType] || typeColors.normal;

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div
          className="flex flex-col md:flex-row gap-6 rounded-3xl overflow-hidden min-h-[400px] transition-colors duration-500"
          style={{ backgroundColor: bgColor }}
        >
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-white">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.015em] capitalize">
              {name} #{id.padStart(3, '0')}
            </h1>
            <p className="text-lg md:text-xl font-medium leading-normal mt-4 opacity-90 max-w-md">
              {description}
            </p>
            <div className="flex gap-3 mt-8">
              {types.map((type) => (
                <span
                  key={type}
                  className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wider"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1 relative flex items-center justify-center bg-white/10 backdrop-blur-md">
             <img src={image} alt={name} className="w-4/5 h-auto relative z-10 drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDescription;
