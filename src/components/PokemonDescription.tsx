import React from "react";
import { TYPE_COLORS } from "../constants/pokemon";

interface PokemonDescriptionProps {
  id: string;
  name: string;
  image: string;
  description: string;
  types: string[];
}

const PokemonDescription: React.FC<PokemonDescriptionProps> = ({
  id,
  name,
  image,
  description,
  types,
}) => {
  const primaryType = types[0]?.toLowerCase() || "normal";
  const bgColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        <div
          className="flex flex-col md:flex-row gap-6 rounded-3xl overflow-hidden min-h-100 transition-colors duration-500"
          style={{ backgroundColor: bgColor }}
        >
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-white">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.015em] capitalize">
              {name} #{id.padStart(3, "0")}
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
            <img
              src={image}
              alt={name}
              className="w-4/5 h-auto relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDescription;
