import React, { useState } from "react";
import { getPokemon } from "../services/pokemonService";
import SearchBar from "../components/SearchBar";
import type { PokemonDetail } from "../types/pokemon";
import Footer from "../components/Footer";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const Comparator: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<(PokemonDetail | null)[]>([null, null, null]);
  const [loading, setLoading] = useState<boolean[]>([false, false, false]);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (index: number, name: string) => {
    setLoading((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setError(null);
    try {
      const detail = await getPokemon(name.toLowerCase());
      setSelectedPokemon((prev) => {
        const next = [...prev];
        next[index] = detail;
        return next;
      });
    } catch (err) {
      setError(`Could not find Pokémon: ${name}`);
      console.error(err);
    } finally {
      setLoading((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  const statNames = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

  interface ChartDataItem {
    subject: string;
    fullMark: number;
    [key: string]: string | number;
  }

  const chartData: ChartDataItem[] = statNames.map((name, i) => {
    const dataItem: ChartDataItem = { subject: name, fullMark: 255 };
    selectedPokemon.forEach((pokemon, index) => {
      if (pokemon) {
        dataItem[`p${index}`] = pokemon.stats[i].base_stat;
      }
    });
    return dataItem;
  });

  const colors = ["#ef4444", "#3b82f6", "#10b981"]; // Red, Blue, Green

  const activePokemonCount = selectedPokemon.filter(Boolean).length;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <main className="grow pb-12">
          <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
            <div className="layout-content-container flex flex-col max-w-5xl w-full">
              <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">
                Pokémon Comparator
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col min-h-[300px]">
                      <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-3 px-2">
                        Slot {i + 1}
                      </h3>
                      <div className="border-2 border-gray-100 dark:border-gray-700 rounded-xl focus-within:border-primary/50 transition-all bg-gray-50/30 dark:bg-gray-900/10 hover:border-gray-200 dark:hover:border-gray-600">
                        <SearchBar
                          onSelect={(name) => handleSelect(i, name)}
                          placeholder="Search Pokémon..."
                          hideHeader={true}
                          className="w-full !px-0 !py-0"
                        />
                      </div>

                      {loading[i] ? (
                        <div className="mt-8 flex flex-1 items-center justify-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                        </div>
                      ) : selectedPokemon[i] ? (
                        <div className="mt-4 flex flex-col items-center flex-1">
                          <div className="relative w-32 h-32 mb-4">
                            <img
                              src={
                                selectedPokemon[i]?.sprites.other?.[
                                  "official-artwork"
                                ]?.front_default ||
                                selectedPokemon[i]?.sprites.front_default
                              }
                              alt={selectedPokemon[i]?.name}
                              className="w-full h-full object-contain"
                            />
                            <button
                               onClick={() => {
                                 const next = [...selectedPokemon];
                                 next[i] = null;
                                 setSelectedPokemon(next);
                               }}
                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                               title="Remove"
                            >
                               <span className="material-symbols-outlined text-sm block">close</span>
                            </button>
                          </div>
                          <p className="text-xl font-bold capitalize text-gray-900 dark:text-white mb-2">
                            {selectedPokemon[i]?.name}
                          </p>
                          <div className="flex gap-2 flex-wrap justify-center">
                            {selectedPokemon[i]?.types.map((t) => (
                              <span
                                key={t.type.name}
                                className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                              >
                                {t.type.name}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 w-full grid grid-cols-2 gap-2 text-xs">
                             {selectedPokemon[i]?.stats.map((s, si) => (
                               <div key={si} className="flex justify-between px-2 py-1 bg-gray-50 dark:bg-gray-700/50 rounded">
                                 <span className="text-gray-500 dark:text-gray-400 font-medium uppercase">{statNames[si]}</span>
                                 <span className="text-gray-900 dark:text-white font-bold">{s.base_stat}</span>
                               </div>
                             ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
                          <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-5xl mb-2">
                            add_circle
                          </span>
                          <p className="text-sm text-gray-400 dark:text-gray-500">
                            Search to add a Pokémon
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  <p className="font-medium">{error}</p>
                </div>
              )}

              {activePokemonCount >= 2 ? (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    Base Stats Confrontation
                  </h2>
                  <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={chartData}
                      >
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 255]}
                          tick={false}
                          axisLine={false}
                        />
                        {selectedPokemon.map(
                          (pokemon, index) =>
                            pokemon && (
                              <Radar
                                key={pokemon.id}
                                name={pokemon.name.toUpperCase()}
                                dataKey={`p${index}`}
                                stroke={colors[index]}
                                fill={colors[index]}
                                fillOpacity={0.4}
                                strokeWidth={3}
                              />
                            ),
                        )}
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "none",
                            borderRadius: "12px",
                            color: "#fff",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          }}
                          itemStyle={{ color: "#fff", textTransform: "capitalize" }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                    <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500">
                      compare_arrows
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Not enough Pokémon
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Select at least 2 Pokémon (up to 3) to view their stats
                    confronted in the radar chart.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Comparator;
