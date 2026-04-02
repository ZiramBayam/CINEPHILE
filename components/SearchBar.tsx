"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Sync input when URL params change externally (e.g. genre filter clears q)
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const updateUrl = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    // Remove genre when searching
    params.delete("genre");

    const target = `/movies${params.size > 0 ? `?${params.toString()}` : ""}`;

    if (pathname === "/movies") {
      router.replace(target);
    } else {
      router.push(target);
    }
  };

  const debouncedSearch = useDebouncedCallback(updateUrl, 500);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateUrl(query);
    }
  };

  return (
    <div className="relative group max-w-3xl mx-auto w-full">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-primary transition-transform group-focus-within:scale-110">
        <span className="material-symbols-outlined text-3xl">search</span>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          debouncedSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className="w-full glass-search h-20 pl-16 pr-8 rounded-full border-none outline-none focus:ring-2 focus:ring-primary-container/50 text-xl font-medium placeholder:text-on-surface-variant/40 shadow-2xl transition-all text-on-surface"
        placeholder="Search for movies, actors, or directors..."
      />
    </div>
  );
}
