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

const STAT_NAMES = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
const CHART_COLORS = ["#22d3ee", "#f20d0d", "#facc15"]; // Cyan, Red, Yellow

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

  interface ChartDataItem {
    subject: string;
    fullMark: number;
    [key: string]: string | number;
  }

  const chartData: ChartDataItem[] = STAT_NAMES.map((name, i) => {
    const dataItem: ChartDataItem = { subject: name, fullMark: 255 };
    selectedPokemon.forEach((pokemon, index) => {
      if (pokemon) {
        dataItem[`p${index}`] = pokemon.stats[i].base_stat;
      }
    });
    return dataItem;
  });

  const activePokemonCount = selectedPokemon.filter(Boolean).length;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-slate-950">
      <div className="layout-container flex h-full grow flex-col">
        <main className="grow pb-12">
          <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-12">
            <div className="layout-content-container flex flex-col max-w-5xl w-full">
              <div className="flex flex-col items-center mb-12">
                <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] mb-2 animate-pulse">
                  System.Analysis.Stats
                </span>
                <h1 className="text-gray-900 dark:text-white text-3xl font-mono font-black uppercase tracking-tight text-center">
                  Statistical Confrontation
                </h1>
                <div className="w-24 h-1 bg-primary mt-4 skew-x-[-20deg]"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col h-full">
                    <div className="data-viewport bg-white dark:bg-slate-900 p-4 border border-slate-tech/20 dark:border-white/10 flex flex-col min-h-[380px] relative">
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40"></div>

                      <div className="flex items-center justify-between mb-4 border-b border-slate-tech/10 dark:border-white/10 pb-2">
                        <span className="text-[10px] font-mono font-black text-slate-tech/40 dark:text-white/30 uppercase tracking-widest">
                          Unit.0{i + 1}
                        </span>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-primary/40"></div>
                          <div className="w-1.5 h-1.5 bg-slate-tech/20 dark:bg-white/10"></div>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-tech/5 dark:border-white/5 p-1 mb-4">
                        <SearchBar
                          onSelect={(name) => handleSelect(i, name)}
                          placeholder="INPUT_ID..."
                          hideHeader={true}
                          className="w-full !px-0 !py-0 !bg-transparent"
                        />
                      </div>

                      {loading[i] ? (
                        <div className="mt-8 flex flex-1 items-center justify-center">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : selectedPokemon[i] ? (
                        <div className="mt-2 flex flex-col items-center flex-1">
                          <div className="relative w-36 h-36 mb-4 group">
                             <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                            <img
                              src={
                                selectedPokemon[i]?.sprites.other?.[
                                  "official-artwork"
                                ]?.front_default ||
                                selectedPokemon[i]?.sprites.front_default
                              }
                              alt={selectedPokemon[i]?.name}
                              className="w-full h-full object-contain relative z-10"
                            />
                            <button
                               onClick={() => {
                                 const next = [...selectedPokemon];
                                 next[i] = null;
                                 setSelectedPokemon(next);
                               }}
                               className="absolute -top-1 -right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center shadow-mechanical hover:bg-red-700 transition-colors cursor-pointer z-20"
                               title="Remove"
                            >
                               <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </div>

                          <p className="text-lg font-mono font-black uppercase text-gray-900 dark:text-white mb-3 tracking-tighter">
                            {selectedPokemon[i]?.name}
                          </p>

                          <div className="flex gap-2 mb-4">
                            {selectedPokemon[i]?.types.map((t) => (
                              <span
                                key={t.type.name}
                                className="px-2 py-0.5 text-[9px] font-mono font-black uppercase bg-slate-tech text-white skew-x-[-10deg]"
                              >
                                <span className="skew-x-[10deg] block">{t.type.name}</span>
                              </span>
                            ))}
                          </div>

                          <div className="w-full grid grid-cols-1 gap-1.5">
                             {selectedPokemon[i]?.stats.map((s, si) => (
                               <div key={si} className="flex flex-col">
                                 <div className="flex justify-between text-[9px] font-mono font-bold mb-0.5">
                                   <span className="text-slate-tech/50 dark:text-white/40 uppercase">{STAT_NAMES[si]}</span>
                                   <span className="text-gray-900 dark:text-white">{s.base_stat}</span>
                                 </div>
                                 <div className="h-1 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                    <div
                                      className="absolute top-0 left-0 h-full bg-primary/60 transition-all duration-1000"
                                      style={{ width: `${(s.base_stat / 255) * 100}%` }}
                                    ></div>
                                 </div>
                               </div>
                             ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex-1 flex flex-col items-center justify-center border border-dashed border-slate-tech/20 dark:border-white/10 p-8 text-center bg-slate-50/30 dark:bg-white/5">
                          <span className="material-symbols-outlined text-slate-tech/20 dark:text-white/10 text-4xl mb-3">
                            add_circle
                          </span>
                          <p className="text-[10px] font-mono font-black text-slate-tech/40 dark:text-white/30 uppercase tracking-widest">
                            awaiting_input
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 text-red-700 dark:text-red-400 px-4 py-3 mb-8 flex items-center gap-3 font-mono text-xs">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <p className="font-bold uppercase tracking-tight">{error}</p>
                </div>
              )}

              {activePokemonCount >= 2 ? (
                <div className="data-viewport bg-white dark:bg-slate-900 p-6 md:p-10 border border-slate-tech/20 dark:border-white/10 relative">
                   <div className="absolute top-4 left-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary animate-pulse"></div>
                      <span className="text-[10px] font-mono font-black text-slate-tech/40 dark:text-white/30 uppercase tracking-[0.3em]">
                        RADAR.VIZ_ACTIVE
                      </span>
                   </div>

                  <h2 className="text-xl font-mono font-black text-center mb-12 text-gray-900 dark:text-white uppercase tracking-widest">
                    Data Interrelation
                  </h2>

                  <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={chartData}
                      >
                        <PolarGrid stroke="rgba(100, 116, 139, 0.2)" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "#64748b", fontSize: 10, fontWeight: 900, fontFamily: 'monospace' }}
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
                                stroke={CHART_COLORS[index]}
                                fill={CHART_COLORS[index]}
                                fillOpacity={0.2}
                                strokeWidth={2}
                              />
                            ),
                        )}
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                            fontFamily: 'monospace',
                            fontSize: '10px'
                          }}
                          itemStyle={{ color: "#fff", textTransform: "uppercase", fontWeight: 'bold' }}
                        />
                        <Legend
                          wrapperStyle={{
                            paddingTop: "40px",
                            fontFamily: 'monospace',
                            fontSize: '10px',
                            fontWeight: 'black'
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-tech/20 dark:border-white/10 relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 border border-slate-tech/10 dark:border-white/10 mb-6 rotate-45">
                    <span className="material-symbols-outlined text-3xl text-slate-tech/30 dark:text-white/20 -rotate-45">
                      analytics
                    </span>
                  </div>
                  <h3 className="text-sm font-mono font-black text-gray-900 dark:text-white mb-2 uppercase tracking-widest">
                    Insufficient Data
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-slate-tech/40 dark:text-white/30 max-w-xs mx-auto uppercase leading-relaxed">
                    Minimum of 02 subjects required for comparative analysis.
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
