import { createTRPCReact } from "@trpc/react-query";
import type { appRouter } from "@/server/api/root";

export const trpc = createTRPCReact<appRouter>();
