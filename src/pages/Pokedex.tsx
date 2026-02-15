import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import PokedexGallery from '../components/PokedexGallery';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Pokedex: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-clip">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium">Pokédex</span>
              </div>

              <div className="px-4 py-5">
                <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                  Pokédex
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal mt-2">
                  Explore the world of Pokémon! Browse through the complete Pokédex to find your favorite Pokémon and learn about their types, abilities, and evolutions.
                </p>
              </div>
            </div>
          </div>

          <SearchBar />
          <PokedexGallery />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Pokedex;
