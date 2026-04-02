"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/movies", icon: "local_fire_department", label: "Explore" },
  { href: "/favorites", icon: "video_library", label: "Library" },
  { href: "/profile", icon: "account_circle", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl h-16 flex items-center justify-around px-4 z-50 border-t border-white/5">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${
              isActive ? "text-primary" : "text-on-surface-variant/60"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: isActive
                  ? "'FILL' 1"
                  : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
