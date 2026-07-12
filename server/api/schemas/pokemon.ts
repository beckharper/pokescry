import { z } from "zod";

export const pokemonNameSchema = z.object({
  name: z.string().trim().min(1, "name must be at least 1 character long"),
});

export const pokemonListSchema = z.object({
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().positive().max(100).default(20),
});
