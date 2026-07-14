"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");

  function submitSearch() {
    const val = query.trim();

    if (!val) {
      router.push("/");
      return;
    }
    router.push(`/?q=${encodeURIComponent(val)}`);
  }

  return (
    <div className="w-full">
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          bg-white
          px-5
          py-3
          shadow-sm
          dark:bg-black
        "
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitSearch();
            }
          }}
          placeholder="Search Pokémon..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-lg
          "
        />

        <button
          onClick={submitSearch}
          className="
            rounded-xl
            px-4
            py-2
            bg-black
            text-white
            dark:bg-white
            dark:text-black
          "
        >
          Search
        </button>
      </div>
    </div>
  );
}
