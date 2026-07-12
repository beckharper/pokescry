export async function createServerContext() {
  return {};
}

export type Context = Awaited<ReturnType<typeof createServerContext>>;
