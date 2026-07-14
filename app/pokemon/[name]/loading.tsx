export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section
        className="
          w-full
          max-w-3xl
          rounded-3xl
          border
          bg-white/80
          p-8
          shadow-lg
          backdrop-blur
          dark:bg-black/40
        "
      >
        <div className="flex flex-col items-center text-center animate-pulse">
          <div
            className="
              h-12
              w-48
              rounded-lg
              bg-zinc-200
              dark:bg-zinc-800
              mb-6
            "
          />

          <div
            className="
              h-64
              w-64
              rounded-full
              bg-zinc-200
              dark:bg-zinc-800
              mb-6
            "
          />

          <div className="space-y-4 w-full max-w-xs">
            <div
              className="
                h-5
                rounded
                bg-zinc-200
                dark:bg-zinc-800
              "
            />

            <div
              className="
                h-5
                rounded
                bg-zinc-200
                dark:bg-zinc-800
              "
            />

            <div
              className="
                h-8
                rounded-full
                bg-zinc-200
                dark:bg-zinc-800
              "
            />
          </div>
        </div>
      </section>
    </main>
  );
}
