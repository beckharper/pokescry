import { caller } from "@/server/caller";
import Image from "next/image";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const api = await caller();

  const pokemon = await api.pokemon.byName({ name });

  return (
    <main className="max-w-3xl mx-auto p-8 ">
      <h1 className="text-5xl capitalize *:font-bold mb-6 ">{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.front_default ?? "/placeholder.png"}
        alt={pokemon.name}
        width={200}
        height={200}
        className="w-64 h-64 mb-6 items-center mt-45"
      />
      <p>Height: {pokemon.height}</p>
      <p> Weight: {pokemon.weight}</p>
      <p>Types: placeholder text</p>
    </main>
  );
}
