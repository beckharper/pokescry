import { redis } from "@/lib/redis";

const POKEAPI_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
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
    `${POKEAPI_URL}/pokemon?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error(`failed to fetch pokemon list`);
  }

  const data: PokemonListResponse = await response.json();

  await redis.set(cacheKey, data, { ex: 60 * 60 });
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

  const response = await fetch(`${POKEAPI_URL}/pokemon/${normalizedName}`);

  if (!response.ok) {
    throw new Error("failed to fetch pokemon");
  }

  const data: Pokemon = await response.json();

  await redis.set(cacheKey, data, { ex: 60 * 60 * 24 });
  //longer ttl because individual pokemon rarely change once released but a set of more/all pokemon change more frequently, ar at least i would think

  return data;
}
