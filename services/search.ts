import Fuse from "fuse.js";
import { redis } from "@/lib/redis";

const POKEAPI_URL = "https://pokeapi.co/api/v2";
const INDEX_KEY = "pokemon:search:index";

export interface PokemonSearch {
  id: number;
  name: string;
  // sprite: string | null;
}

export interface PkmnSpeciesResponse {
  results: {
    name: string;
    url: string;
  }[];
}

function extractPkmnId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

async function buildIndex(): Promise<PokemonSearch[]> {
  const response = await fetch(`${POKEAPI_URL}/pokemon-species?limit=1500`);
  if (!response.ok) {
    throw new Error("failed to fetch pokemon");
  }

  const data = (await response.json()) as PkmnSpeciesResponse;
  return data.results.map((pokemon) => ({
    id: extractPkmnId(pokemon.url),
    name: pokemon.name,
  }));
}

export async function warmCache(): Promise<void> {
  const index = await buildIndex();
  await redis.set(INDEX_KEY, index, {
    ex: 60 * 60 * 24,
  });
}

async function getPkmnIndex(): Promise<PokemonSearch[]> {
  let index = await redis.get<PokemonSearch[]>(INDEX_KEY);

  if (!index) {
    console.log("index miss");

    await warmCache();

    index = await redis.get<PokemonSearch[]>(INDEX_KEY);

    if (!index) {
      throw new Error("failed to load index");
    }
  }
  return index;
}

export async function searchPokemon(query: string): Promise<PokemonSearch[]> {
  const pokemon = await getPkmnIndex();

  const normalizedName = query.trim().toLowerCase();

  if (!normalizedName) {
    return [];
  }

  const fuse = new Fuse(pokemon, {
    keys: ["name"],
    threshold: 0.2,
    distance: 100,
    minMatchCharLength: 3,
  });

  return fuse
    .search(normalizedName)
    .slice(0, 10)
    .map((result) => result.item);
}
