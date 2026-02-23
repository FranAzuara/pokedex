import React from 'react';
import { Link } from 'react-router-dom';
import { TYPE_COLORS } from '../constants/pokemon';

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
      className="tag-id group flex flex-col p-4 transition-all hover:translate-x-1 hover:shadow-md bg-white dark:bg-slate-900 border-r border-t border-b border-slate-tech/10 dark:border-white/5 relative overflow-hidden"
      style={{ borderLeftColor: types[0] ? TYPE_COLORS[types[0]] : undefined }}
    >
      {/* Background ID Watermark */}
      <span className="absolute -bottom-4 -right-2 text-6xl font-black text-slate-tech/5 dark:text-white/5 pointer-events-none select-none">
        {id.padStart(3, '0')}
      </span>

      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">
          ID: {id.padStart(3, '0')}
        </span>
        <div className="flex gap-1">
          {types.map((type) => (
            <div key={type} className="size-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          ))}
        </div>
      </div>

      <div
        className="w-full aspect-square bg-center bg-no-repeat bg-contain mb-4 grayscale group-hover:grayscale-0 transition-all duration-300"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="relative z-10">
        <h3 className="text-gray-900 dark:text-white text-lg font-black uppercase tracking-tighter italic capitalize">
          {name}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {types.map((type) => (
            <span
              key={type}
              className="text-[9px] font-mono font-bold px-2 py-0.5 border border-slate-tech/20 dark:border-white/20 text-slate-tech/60 dark:text-white/60 uppercase tracking-tighter"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-tech/5 dark:border-white/5 flex justify-end">
        <span className="material-symbols-outlined text-sm text-slate-tech/30 dark:text-white/30 group-hover:text-primary transition-colors">
          read_more
        </span>
      </div>
    </Link>
  );
};

export default PokedexCard;
