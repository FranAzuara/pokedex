import React from "react";

interface EvolutionStep {
  name: string;
  image: string;
  level?: number;
}

interface PokemonEvolutionChainProps {
  evolutions: EvolutionStep[];
}

const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
  evolutions,
}) => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-4 mb-8 text-center md:text-left">
          Evolution Chain
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4">
          {evolutions.map((step, index) => (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center gap-4">
                <div className="size-40 md:size-48 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center p-6 border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.name}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {step.name}
                </p>
              </div>
              {index < evolutions.length - 1 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="hidden md:block">
                    <span className="material-symbols-outlined text-gray-400 text-4xl">
                      arrow_forward
                    </span>
                  </div>
                  <div className="md:hidden">
                    <span className="material-symbols-outlined text-gray-400 text-4xl rotate-90">
                      arrow_forward
                    </span>
                  </div>
                  {step.level && (
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                      Level {step.level}
                    </span>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonEvolutionChain;
