import { caller } from "@/server/caller";
import SearchBar from "@/components/SearchBar";
import { warmCache } from "@/services/search";
import ShapeGrid from "@/components/ShapeGrid";
import PokeCard from "@/components/PokeCard";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const api = await caller();
  void warmCache();

  const pokemon = query
    ? await api.pokemon.search({
        query,
      })
    : [];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="h-full w-full opacity-50 bg-linear-to-r from-blue-700 to-cyan-500">
            <ShapeGrid />
          </div>
        </div>
      </div>

      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="font-heading text-6xl font-bold tracking-tight">
              PokeScry
            </h1>
          </div>

          <SearchBar />
          {query && (
            <section className="w-full">
              <h2 className="font-sans text-lg text-black mb-4">
                Results for {query}:
              </h2>

              {pokemon.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {pokemon.map((p) => (
                    <PokeCard key={p.name} id={p.id} name={p.name} />
                  ))}
                </div>
              ) : (
                <p className="text-black text-center font-sans">
                  No Pokémon found.
                </p>
              )}
            </section>
          )}

          {!query && <p className="text-zinc-400"></p>}
        </div>
      </section>
    </main>
  );
}
