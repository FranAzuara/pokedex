import React from "react";
import { Link } from "react-router";

const Hero: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        <div className="@container">
          <div className="p-0 @[480px]:p-4">
            <div
              className="flex min-h-120 flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 text-center"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAa79-X7utus7rCxZIuc3lzm-KLMmwhUMiCvDR2iGq_qLZ_fqpjpjDqE7vMDlqH6HDyzLhzHaeR_1Ok730pAHONMdgMINbDdOy6pKFsk961qnPHqvagKHAR0CemZTnTfNoF9glEYYPEL-lxsanGXvWtjdMrB8Uq7LWaebwy6o9H3vjk4Fmoro1JCw6WtE_G68kTdnt_Dk9g_Xqa5JU3yHSulhFR1ZVZ1vwH1sqnU6RyZVc0ZR756F5sKOKhdEab2bqrK9um9xh9_A")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                  Explore the World of Pokémon
                </h1>
                <h2 className="text-white/90 text-sm font-normal leading-normal @[480px]:text-base">
                  Your ultimate source for Pokémon news, guides, and Pokedex
                  data.
                </h2>
              </div>
              <Link
                to="/pokedex"
                className="flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base transition-transform duration-200 hover:scale-105 border-none"
              >
                <span className="truncate">Explore the Pokedex</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
