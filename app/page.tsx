import { fetchPokemon } from "@/services/pokemon";

const ITEMS_PER_PAGE = 20;

interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = parseInt(params.page as string) || 1;
  const selectedtype = (params.type as string) || "all";
  const offset = (page - 1) * 20;

  const [pokemon] = await Promise.all([fetchPokemon()]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center justify-center gap-4 sm:items-start">
          hello, world
        </div>
      </main>
    </div>
  );
}
