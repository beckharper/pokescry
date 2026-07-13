import Link from "next/link";
import { caller } from "@/server/caller";
import SearchBar from "@/components/SearchBar";
import { warmCache } from "@/services/search";

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
    <div className="flex flex-col flex-1 items-center bg-[linear-gradient(180deg,_#ff0000_0%,_#0c0c46_50%,_#ffffff_100%)] font-sans">
      <h1 className="text-4xl font-bold mt-25 mb-6 items center">PokeScry</h1>

      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-8">
        <SearchBar />

        {query && <h2 className="text-xl mb-4">Search results for {query}</h2>}

        {!query && <p className="text-zinc-500"></p>}

        <div className="grid grid-cols-4 gap-4">
          {pokemon.map((p) => (
            <Link
              key={p.name}
              href={`/pokemon/${p.name}`}
              className="border rounded p-4 capitalize hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              {p.name}
            </Link>
          ))}
        </div>

        {query && pokemon.length === 0 && (
          <p className="text-zinc-500">No Pokémon found.</p>
        )}
      </main>
    </div>
  );
}
