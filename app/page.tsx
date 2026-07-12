import Link from "next/link";
import { caller } from "@/server/caller";

const ITEMS_PER_PAGE = 20;

interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = parseInt(params.page as string) || 1;
  const api = await caller();
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const pokemon = await api.pokemon.list({ offset, limit: ITEMS_PER_PAGE });

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold mt-25 mb-6 flex flex-col">PokeScry</h1>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="grid grid-cols-4 gap-4">
          {pokemon.results.map((p: { name: string }) => (
            <Link
              key={p.name}
              href={`/pokemon/${p.name}`}
              className="border rounded p-4"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
