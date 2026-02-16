import React from 'react';
import { Link } from 'react-router-dom';

interface PokedexCardProps {
  id: string;
  name: string;
  image: string;
  types: string[];
  currentPage?: number;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ id, name, image, types, currentPage }) => {
  return (
    <Link
      to={`/pokemon/${id}`}
      state={{ fromPage: currentPage }}
      className="flex flex-col gap-3 pb-3 group"
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-contain rounded-xl transition-transform group-hover:scale-105"
        style={{ backgroundImage: `url(${image})`, backgroundColor: '#f3f4f6' }}
      ></div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">#{id.padStart(3, '0')}</p>
        <p className="text-gray-900 dark:text-white text-base font-bold leading-normal capitalize">{name}</p>
        <div className="flex gap-2 mt-1">
          {types.map((type) => (
            <span
              key={type}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 capitalize"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokedexCard;
