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
export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 20,
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit={limit}`,
    {
      cache: "no-store",
      //temporary
    },
  );

  if (!response.ok) {
    throw new Error(`failed to fetch pokemon list: ${response.status}`);
  }

  const data = await response.json();
  console.log("data", data);
  return data;
}
