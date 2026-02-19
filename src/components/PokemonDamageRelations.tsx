import React, { useEffect, useState, useMemo } from "react";
import { getDamageRelations } from "../services/pokemonService";
import { TYPE_COLORS } from "../constants/pokemon";
import type { DamageRelations } from "../types/pokemon";

interface PokemonDamageRelationsProps {
  types: string[];
}

const PokemonDamageRelations: React.FC<PokemonDamageRelationsProps> = ({
  types,
}) => {
  const [damageRelations, setDamageRelations] = useState<DamageRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelations = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          types.map((type) => getDamageRelations(type)),
        );
        setDamageRelations(results.map((r) => r.damage_relations));
      } catch (error) {
        console.error("Error fetching damage relations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (types.length > 0) {
      fetchRelations();
    }
  }, [types]);

  const effectiveness = useMemo(() => {
    const multipliers: Record<string, number> = {};

    // Initialize all types with 1x multiplier
    Object.keys(TYPE_COLORS).forEach((type) => {
      multipliers[type] = 1;
    });

    damageRelations.forEach((relations) => {
      relations.double_damage_from.forEach((type) => {
        if (multipliers[type.name] !== undefined) {
          multipliers[type.name] *= 2;
        }
      });
      relations.half_damage_from.forEach((type) => {
        if (multipliers[type.name] !== undefined) {
          multipliers[type.name] *= 0.5;
        }
      });
      relations.no_damage_from.forEach((type) => {
        if (multipliers[type.name] !== undefined) {
          multipliers[type.name] = 0;
        }
      });
    });

    return multipliers;
  }, [damageRelations]);

  const groupedEffectiveness = useMemo(() => {
    const groups: Record<number, string[]> = {
      4: [],
      2: [],
      0.5: [],
      0.25: [],
      0: [],
    };

    Object.entries(effectiveness).forEach(([type, multiplier]) => {
      if (groups[multiplier] !== undefined) {
        groups[multiplier].push(type);
      }
    });

    return groups;
  }, [effectiveness]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const hasRelations = Object.values(groupedEffectiveness).some(
    (group) => group.length > 0,
  );
  if (!hasRelations) return null;

  const labels: Record<number, { title: string; color: string }> = {
    4: { title: "Weakness (4x)", color: "text-red-600 dark:text-red-400" },
    2: { title: "Weakness (2x)", color: "text-red-500 dark:text-red-300" },
    0.5: {
      title: "Resistance (0.5x)",
      color: "text-green-500 dark:text-green-300",
    },
    0.25: {
      title: "Resistance (0.25x)",
      color: "text-green-600 dark:text-green-400",
    },
    0: { title: "Immunity (0x)", color: "text-gray-500 dark:text-gray-400" },
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-240 flex-1 bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Damage Relations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {([4, 2, 0.5, 0.25, 0] as const).map((multiplier) => {
            const typesInGroup = groupedEffectiveness[multiplier];
            if (typesInGroup.length === 0) return null;

            return (
              <div key={multiplier}>
                <h3
                  className={`text-sm font-bold uppercase tracking-wider mb-3 ${labels[multiplier].color}`}
                >
                  {labels[multiplier].title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {typesInGroup.map((type) => (
                    <span
                      key={type}
                      style={{ backgroundColor: TYPE_COLORS[type] }}
                      className="px-3 py-1 rounded-lg text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonDamageRelations;
