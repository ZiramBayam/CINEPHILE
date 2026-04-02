"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/movies", icon: "local_fire_department", label: "Trending" },
  { href: "/new", icon: "auto_awesome", label: "New Releases" },
  { href: "/genres", icon: "category", label: "Genres" },
  { href: "/favorites", icon: "video_library", label: "My Library" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex-col py-6 gap-2 shadow-2xl shadow-black/50 z-[60]">
      {/* Brand */}
      <div className="px-6 mb-8">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-primary uppercase font-headline"
        >
          CINEPHILE
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 py-3 px-4 rounded-xl mx-2 transition-all ${
                isActive
                  ? "bg-primary-container text-white"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium font-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Premium card */}
      <div className="px-4 mt-auto">
        <div className="bg-surface-container-highest p-4 rounded-xl mb-4">
          <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">
            Premium Member
          </p>
          <p className="text-sm font-medium mb-3">Upgrade to 4K</p>
          <button className="w-full py-2 rounded-lg font-bold text-sm transition-transform active:scale-95 bg-primary-container text-white">
            Go Pro
          </button>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">
              person
            </span>
          </div>
          <div>
            <p className="text-sm font-bold truncate">Curator</p>
            <p className="text-xs text-on-surface-variant">Account Settings</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
