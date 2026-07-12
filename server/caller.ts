import { createCallerFactory } from "./trpc";
import { appRouter } from "./api/root";
import { createServerContext } from "./context";

const createCaller = createCallerFactory(appRouter);

export async function caller() {
  return createCaller(await createServerContext());
}
