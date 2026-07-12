import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { fetchPokemon, fetchPokemonList } from "@/services/pokemon";

export const pokemonRouter = router({
  list: publicProcedure
    .input(
      z.object({
        offset: z.number().optional(),
        limit: z.number().min(1).max(100).default(20),
      }),
    )
    .query(async ({ input }) => {
      return fetchPokemonList(input.offset, input.limit);
    }),

  byName: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ input }) => {
      return fetchPokemon(input.name);
    }),
});
