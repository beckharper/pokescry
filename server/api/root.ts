import { router } from "@/server/trpc";
import { pokemonRouter } from "./routers/pokemon";

export const appRouter = router({
  pokemon: pokemonRouter,
});

export type appRouter = typeof appRouter;
//only exporting type so we dont get serverside code in client
