export async function getPokemon(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) {
    throw new Error(`pokemon not found: ${response.statusText}`);
  }

  return response.json();
}
