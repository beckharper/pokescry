import { router } from "@/server/trpc";
import { pokemonRouter } from "./routers/pokemon";

export const appRouter = router({
  pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;
//i learned/realized we only want to export type here so we dont get serverside code in client
