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
    <div className="flex gap-2 mb-8">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitSearch();
          }
        }}
        placeholder="Search for pokemon..."
        className="border rounded px-4 py-2"
      ></input>
      <button
        onClick={submitSearch}
        className="border rounded px-4 py-2"
      ></button>{" "}
      Search
    </div>
  );
}
