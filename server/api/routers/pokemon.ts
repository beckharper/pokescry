import { publicProcedure, router } from "../../trpc";
import { fetchPokemon, fetchPokemonList } from "@/services/pokemon";
import { pokemonListSchema, pokemonNameSchema } from "../schemas/pokemon";

export const pokemonRouter = router({
  list: publicProcedure.input(pokemonListSchema).query(async ({ input }) => {
    return fetchPokemonList(input.offset, input.limit);
  }),

  byName: publicProcedure.input(pokemonNameSchema).query(async ({ input }) => {
    return fetchPokemon(input.name);
  }),
});
