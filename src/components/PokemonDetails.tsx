import React from "react";

interface Stat {
  name: string;
  value: number;
}

interface PokemonDetailsProps {
  height: string;
  weight: string;
  abilities: string[];
  hiddenAbility: string;
  stats: Stat[];
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  height,
  weight,
  abilities,
  hiddenAbility,
  stats,
}) => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1 bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Details Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Height
                </span>
                <span className="text-gray-900 dark:text-white font-bold">
                  {height}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Weight
                </span>
                <span className="text-gray-900 dark:text-white font-bold">
                  {weight}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Abilities
                </span>
                <span className="text-gray-900 dark:text-white font-bold text-right capitalize">
                  {abilities.join(", ")}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Hidden Ability
                </span>
                <span className="text-gray-900 dark:text-white font-bold capitalize">
                  {hiddenAbility}
                </span>
              </div>
            </div>
          </div>

          {/* Base Stats Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Base Stats
            </h2>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-4">
                  <span className="w-16 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    {stat.name}
                  </span>
                  <span className="w-8 text-sm font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
