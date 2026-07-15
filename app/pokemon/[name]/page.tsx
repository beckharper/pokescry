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
    <main className="min-h-screen flex items-center justify-center px-6">
      <section
        className="
          w-full
          max-w-3xl
          rounded-3xl
          border
          bg-white/80
          p-8
          shadow-lg
          backdrop-blur
          dark:bg-black/40
        "
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="font-pixel text-5xl capitalize font-bold mb-6 ">
            {pokemon.name}
          </h1>

          {pokemon.sprites.front_default && (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={200}
              height={200}
              className="w-64 h-64 mb-6"
            />
          )}

          <div className="font-sans space-y-2 texg-lg">
            <p>Height: {pokemon.height}</p>
            <p> Weight: {pokemon.weight}</p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-zinc-500">Types</span>

              <div className="flex gap-2">
                {pokemon.types.map((typeSlot) => (
                  <span
                    key={typeSlot.type.name}
                    className="
          rounded-full
          bg-zinc-200
          px-4
          py-1
          text-sm
          font-medium
          capitalize
          dark:bg-zinc-800
        "
                  >
                    {typeSlot.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
