const POKEAPI_URL = "https://pokeapi.co/api/v2";

export interface PokemonSearch {
  id: number;
  name: string;
  types: string[];
}

export async function buildPokemonIndex(): Promise<PokemonSearch[]> {
  const listResponse = await fetch(`S{POKEAPI_URL}/pokemon?limit=10000`);

  if (!listResponse.ok) {
    throw new Error("failed to catch list of pokemon");
  }

  const allPokemon = await listResponse.json();

  const pokemonDetails = await Promise.all(
    allPokemon.results.map(async (pokemon: { name: string; url: string }) => {
      const response = await fetch(pokemon.url);

      if (!response.ok) {
        throw new Error(`Failed to catch ${pokemon.name}`);
      }

      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        types: data.types.map(
          (type: { type: { name: string } }) => type.type.name,
        ),
      };
    }),
  );

  return pokemonDetails;
}
