export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: TypeEntry[];
  stats: StatEntry[];
  abilities: AbilityEntry[];
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
}

export interface TypeEntry {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface StatEntry {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface AbilityEntry {
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorText[];
}

export interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionDetail {
  trigger: {
    name: string;
  };
  min_level: number | null;
  item: {
    name: string;
  } | null;
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface TypeResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: NamedAPIResource;
    slot: number;
  }[];
}
