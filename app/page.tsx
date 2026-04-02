export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import {
  fetchTrendingMovies,
  fetchNowPlaying,
  fetchTopRated,
  tmdbImage,
  getGenreName,
} from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function HomePage() {
  const [trending, nowPlaying, topRated] = await Promise.all([
    fetchTrendingMovies(),
    fetchNowPlaying(),
    fetchTopRated(),
  ]);

  const hero = trending[0];
  const heroYear = hero?.release_date?.split("-")[0] || "";
  const heroGenre = hero?.genre_ids?.[0]
    ? getGenreName(hero.genre_ids[0])
    : "";

  return (
    <main className="pb-24">
      {/* ── Hero Spotlight ── */}
      <section className="relative min-h-[870px] flex items-center pt-20 -mt-20">
        <div className="absolute inset-0 z-0">
          {hero?.backdrop_path && (
            <Image
              src={tmdbImage(hero.backdrop_path, "original")}
              alt={`${hero.title} backdrop`}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 hero-mask-home" />
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Trending Today
            </span>
            <span className="text-tertiary flex items-center gap-1 font-bold">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              {hero?.vote_average?.toFixed(1)} Rating
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black tracking-tighter text-on-surface mb-6 leading-[0.9] text-glow uppercase">
            {hero?.title}
          </h1>

          {heroGenre && (
            <div className="flex items-center gap-3 mb-4 text-on-surface-variant text-sm font-medium">
              <span>{heroGenre}</span>
              <span>•</span>
              <span>{heroYear}</span>
            </div>
          )}

          <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 leading-relaxed line-clamp-3">
            {hero?.overview}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent((hero?.title || "") + " trailer")}`}
              target="_blank"
              className="bg-primary-container text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              Watch Trailer
            </Link>
            <Link
              href={`/movies/${hero?.id}`}
              className="bg-surface-variant/20 backdrop-blur-md text-on-surface px-8 py-4 rounded-xl font-bold border border-white/10 hover:bg-surface-variant/40 transition-all"
            >
              More Details
            </Link>
          </div>
        </div>
      </section>

      {/* ── Curated Selections (Trending) ── */}
      <section className="px-8 mt-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-primary">
              Curated Selections
            </h2>
            <p className="text-on-surface-variant/60 mt-1">
              Hand-picked cinematic experiences for your evening.
            </p>
          </div>
          <Link
            href="/movies"
            className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All{" "}
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
          {trending.slice(1, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* ── Now Playing Row ── */}
      <section className="px-8 mt-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">
              Now Playing
            </h2>
            <p className="text-on-surface-variant/60 mt-1">
              Currently in cinemas around the world.
            </p>
          </div>
          <Link
            href="/new"
            className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All{" "}
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4">
          {nowPlaying.slice(0, 10).map((movie) => (
            <div key={movie.id} className="flex-none w-[180px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Bento Promo Section ── */}
      <section className="px-8 mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[400px]">
        <div className="md:col-span-2 bg-surface-container-low rounded-2xl p-8 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl font-headline font-black mb-4">
              Curated by the <br /> Critics
            </h2>
            <p className="text-on-surface-variant max-w-sm mb-6">
              Explore the collection that defined the last decade of
              cinematography, chosen by our lead editors.
            </p>
            <Link
              href="/movies"
              className="inline-block font-bold px-6 py-3 rounded-lg bg-primary-container text-white hover:brightness-110 transition-all active:scale-95"
            >
              Explore Collection
            </Link>
          </div>
          {/* Background accent image */}
          {topRated[0]?.backdrop_path && (
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity">
              <Image
                src={tmdbImage(topRated[0].backdrop_path, "w780")}
                alt="Collection background"
                width={780}
                height={439}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <Link
          href="/new"
          className="bg-gradient-to-br from-tertiary-container to-tertiary text-on-tertiary-container rounded-2xl p-8 flex flex-col justify-between hover:brightness-110 transition-all"
        >
          <div>
            <span className="material-symbols-outlined text-4xl mb-4">
              new_releases
            </span>
            <h2 className="text-2xl font-headline font-extrabold tracking-tight">
              New Releases
            </h2>
          </div>
          <p className="text-sm font-medium opacity-80">
            Discover the freshest films now playing in cinemas worldwide.
          </p>
        </Link>
      </section>

      {/* ── Top Rated Row ── */}
      <section className="px-8 mt-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">
              Top Rated of All Time
            </h2>
            <p className="text-on-surface-variant/60 mt-1">
              The highest rated films in cinema history.
            </p>
          </div>
          <Link
            href="/movies"
            className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All{" "}
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4">
          {topRated.slice(0, 10).map((movie) => (
            <div key={movie.id} className="flex-none w-[180px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
