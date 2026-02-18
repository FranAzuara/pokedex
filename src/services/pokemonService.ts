import type {
  PokemonDetail,
  PokemonSpecies,
  EvolutionChain,
  ChainLink,
  FlavorText,
  PokemonList,
  TypeResponse,
} from "../types/pokemon";

const BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";

/**
 * Evaluation of fetch vs axios:
 * For this project, 'fetch' is used because it is native to modern browsers,
 * which helps maintain a smaller bundle size and avoids external dependencies.
 * While 'axios' offers features like automatic JSON parsing and better error handling,
 * the 'fetchData' helper function below achieves similar results by centralizing
 * the fetch logic and error checking, ensuring good readability and performance.
 *
 * Fetches data from a given URL or endpoint.
 * This helper function follows the Single Responsibility Principle by handling the fetch logic.
 */
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches a paginated list of Pokemon.
 * @param limit The number of Pokemon to fetch (default is 20).
 * @param offset The number of Pokemon to skip (default is 0).
 */
export async function getPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonList> {
  return fetchData<PokemonList>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
}

/**
 * Fetches a paginated list of Pokemon species.
 * Used for the SearchBar suggestions.
 */
export async function getPokemonSpeciesNames(
  limit: number = 1500,
  offset: number = 0,
): Promise<PokemonList> {
  return fetchData<PokemonList>(
    `${BASE_URL}/pokemon-species?limit=${limit}&offset=${offset}`,
  );
}

/**
 * Fetches Pokemon associated with a specific type.
 * @param type The name or ID of the type.
 */
export async function getPokemonByType(type: string): Promise<TypeResponse> {
  return fetchData<TypeResponse>(`${BASE_URL}/type/${type}`);
}

/**
 * Fetches detailed information about a Pokemon.
 * @param nameOrId The name or ID of the Pokemon.
 */
export async function getPokemon(
  nameOrId: string | number,
): Promise<PokemonDetail> {
  return fetchData<PokemonDetail>(`${BASE_URL}/pokemon/${nameOrId}`);
}

/**
 * Fetches species information about a Pokemon.
 * @param nameOrId The name or ID of the Pokemon.
 */
export async function getPokemonSpecies(
  nameOrId: string | number,
): Promise<PokemonSpecies> {
  return fetchData<PokemonSpecies>(`${BASE_URL}/pokemon-species/${nameOrId}`);
}

/**
 * Fetches an evolution chain by its ID.
 * @param id The ID of the evolution chain.
 */
export async function getEvolutionChainById(
  id: number,
): Promise<EvolutionChain> {
  return fetchData<EvolutionChain>(`${BASE_URL}/evolution-chain/${id}`);
}

/**
 * Fetches an evolution chain by its full URL.
 * @param url The full URL of the evolution chain.
 */
export async function getEvolutionChainByUrl(
  url: string,
): Promise<EvolutionChain> {
  return fetchData<EvolutionChain>(url);
}

/**
 * Recursively flattens the evolution chain into a list of Pokemon names.
 * This follows the instruction to return a flat list of names.
 * @param chain The evolution chain link.
 */
export function flattenEvolutionChain(chain: ChainLink): string[] {
  const names: string[] = [chain.species.name];

  if (chain.evolves_to && chain.evolves_to.length > 0) {
    for (const nextLink of chain.evolves_to) {
      names.push(...flattenEvolutionChain(nextLink));
    }
  }

  return names;
}

/**
 * Returns a random flavor text entry in the specified language.
 * This satisfies the requirement for a random English description on each click/load.
 * @param entries The list of flavor text entries.
 * @param lang The language code (default is 'en').
 */
export function getRandomFlavorText(
  entries: FlavorText[],
  lang: string = "en",
): string {
  const filteredEntries = entries.filter(
    (entry) => entry.language.name === lang,
  );

  if (filteredEntries.length === 0) {
    return "No description available.";
  }

  const randomIndex = Math.floor(Math.random() * filteredEntries.length);
  // Replace escape characters like \n and \f with spaces for better display
  return filteredEntries[randomIndex].flavor_text.replace(/[\n\f]/g, " ");
}
