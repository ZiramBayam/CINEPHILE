"use client";

import { useRouter, useSearchParams } from "next/navigation";

const GENRES = [
  { id: 0, name: "Trending" },
  { id: 28, name: "Action" },
  { id: 878, name: "Sci-Fi" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 35, name: "Comedy" },
  { id: 16, name: "Animation" },
  { id: 99, name: "Documentary" },
];

export default function GenreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeGenre = Number(searchParams.get("genre")) || 0;

  const handleClick = (genreId: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Clear search when switching genres
    params.delete("q");

    if (genreId === 0) {
      params.delete("genre");
    } else {
      params.set("genre", genreId.toString());
    }

    const target = `/movies${params.size > 0 ? `?${params.toString()}` : ""}`;
    router.push(target);
  };

  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-3 w-full pb-2">
      {GENRES.map((g) => (
        <button
          key={g.id}
          onClick={() => handleClick(g.id)}
          className={`flex-none px-6 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-95 ${
            activeGenre === g.id
              ? "bg-primary-container text-white font-bold shadow-lg shadow-primary-container/20 tracking-wide"
              : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright"
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
