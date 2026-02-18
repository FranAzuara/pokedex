import React from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import RandomPokemon from "../components/RandomPokemon";
import News from "../components/News";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Hero />
        <SearchBar />
        <RandomPokemon />
        <News />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
