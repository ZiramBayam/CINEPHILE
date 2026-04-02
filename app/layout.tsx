import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { FavoriteProvider } from "@/contexts/FavoriteProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CINEPHILE — Discover Cinema",
  description:
    "Browse trending movies and TV shows, search by title, filter by genre, and save your favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} dark`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface text-on-surface font-body antialiased selection:bg-primary-container/30">
        <FavoriteProvider>
          <Sidebar />
          <Navbar />
          <div className="lg:pl-64 pt-20 pb-20 md:pb-12">
            {children}
          </div>
          <BottomNav />
        </FavoriteProvider>
      </body>
    </html>
  );
}
