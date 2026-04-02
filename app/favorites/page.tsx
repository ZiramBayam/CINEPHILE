import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = {
  title: "My Library — CINEPHILE",
  description: "Your personal collection of favorite movies.",
};

export default function FavoritesPage() {
  return (
    <main>
      {/* Header */}
      <section className="relative w-full py-16 px-8 flex flex-col items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-container-low to-surface opacity-40" />
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-surface">
            My <span className="text-primary-container">Library</span>
          </h1>
          <p className="text-on-surface-variant text-lg">
            All your saved movies in one place. Your personal watchlist.
          </p>
        </div>
      </section>

      {/* Favorites List */}
      <section className="px-8 mt-4 max-w-4xl mx-auto">
        <FavoritesList />
      </section>
    </main>
  );
}
