"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/contexts/FavoriteProvider";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/movies", label: "Movies" },
    { href: "/favorites", label: "Watchlist" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl flex justify-between items-center px-8 h-20 transition-all lg:pl-72">
      <div className="flex items-center gap-8">
        {/* Mobile brand */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-primary uppercase font-headline lg:hidden"
        >
          CINEPHILE
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-bold tracking-tight font-headline transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary-container pb-1"
                    : "text-on-surface-variant hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Favorites badge */}
        <Link
          href="/favorites"
          className="relative p-2 text-on-surface-variant hover:bg-white/10 rounded-full transition-all duration-300"
        >
          <span className="material-symbols-outlined">favorite</span>
          {favorites.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary-container text-on-primary-container text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Link>

        <button className="p-2 text-on-surface-variant hover:bg-white/10 rounded-full transition-all duration-300">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button className="p-2 text-on-surface-variant hover:bg-white/10 rounded-full transition-all duration-300">
          <span className="material-symbols-outlined">account_circle</span>
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 w-full md:hidden bg-surface-container/95 backdrop-blur-xl border-t border-white/5 px-8 py-6 flex flex-col gap-4 font-headline font-bold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
