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
//starting with 20 pokemon, making sure api working
export async function fetchPokemon(): Promise<PokemonListResponse> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=20`, {
    //temporary
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`no pokemon found: ${response.statusText}`);
  }
  //putting res into variable for lateer use, potentially for caching or other purposes
  const data = await response.json();

  return data.results;
}
