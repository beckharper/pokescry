import Fuse from "fuse.js";
import { redis } from "@/lib/redis";

const POKEAPI_URL = "https://pokeapi.co/api/v2";
const SEARCH_KEY = "pokemon:search:names";

export interface PokemonSearch {
  id: number;
  name: string;
  sprite: string | null;
}

export interface PkmnListResponse {
  results: PokemonSearch[];
}
async function buildNameIndex(): Promise<PokemonSearch[]> {
  const cached = await redis.get<PokemonSearch[]>(SEARCH_KEY);

  if (cached) {
    console.log("index hit");
    return cached;
  }
  console.log("index miss");
  const response = await fetch(`${POKEAPI_URL}/pokemon-species?limit=1100`);

  if (!response.ok) {
    throw new Error("failed to learn pokemon name");
  }

  const data = (await response.json()) as PkmnListResponse;

  const pokemon = data.results;

  await redis.set(SEARCH_KEY, pokemon, {
    ex: 60 * 60 * 24,
  });

  return pokemon;
}

export async function searchPokemon(query: string): Promise<PokemonSearch[]> {
  const pokemon = await buildNameIndex();

  const fuse = new Fuse(pokemon, {
    keys: ["name"],
    threshold: 0.25,
    distance: 80,
    minMatchCharLength: 3,
  });
  return fuse
    .search(query.toLowerCase())
    .slice(0, 10)
    .map((result) => result.item);
}
