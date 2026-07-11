const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

//adding types for the pokeapi response
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image?: string;
  types?: string[];
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
//starting with pokemon
export async function fetchPokemon(): Promise<Pokemon[]> {
  const response = await fetch(`${POKEAPI_BASE_URL}/type`, {
    //forcing local cache here because pokeapi requires it, will change to redis cache later
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`pokemon not found: ${response.statusText}`);
  }
  const data = await response.json();

  return data.results.filter((type: Pokemon) => type.name !== "unknown");
}
