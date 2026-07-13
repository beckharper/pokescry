import Fuse from "fuse.js";
import { redis } from "@/lib/redis";

const POKEAPI_URL = "https://pokeapi.co/api/v2";
const SEARCH_KEY = "pokemon:search:names";

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
