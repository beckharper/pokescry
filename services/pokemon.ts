import { redis } from "@/lib/redis";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

//adding types for the pokeapi response
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
}

export interface PokemonSprites {
  front_default: string | null;
}

export interface PokemonTypeSlot {
  slot: number;
  type: PokemonType;
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

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 20,
): Promise<PokemonListResponse> {
  const cacheKey = `pokemon-list-${offset}-${limit}`;

  const cached = await redis.get<PokemonListResponse>(cacheKey);

  if (cached) {
    console.log("cache hit!:", cacheKey);
    return cached;
  }

  console.log("cache miss!:", cacheKey);

  const response = await fetch(
    `${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error(`failed to fetch pokemon list`);
  }

  const data: PokemonListResponse = await response.json();

  await redis.set(cacheKey, data, { ex: 60 * 60 }); // cache for 1 hour

  return data;
}

export async function fetchPokemon(name: string): Promise<Pokemon> {
  const normalizedName = name.toLowerCase();
  const cacheKey = `pokemon:${normalizedName}`;
  const cached = await redis.get<Pokemon>(cacheKey);

  if (cached) {
    console.log("cache hit!:", cacheKey);
    return cached;
  }

  console.log("cache miss!:", cacheKey);

  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${normalizedName}`);

  if (!response.ok) {
    throw new Error("failed to fetch pokemon");
  }

  const data: Pokemon = await response.json();

  await redis.set(cacheKey, data, { ex: 60 * 60 * 24 });
  //cache for 24 hours; longer ttl because individual pokemon rarely change but a set of more/all pokemon change more frequently

  return data;
}
