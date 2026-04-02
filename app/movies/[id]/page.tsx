import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  fetchMovieById,
  fetchMovieCredits,
  fetchSimilarMovies,
  tmdbImage,
} from "@/lib/tmdb";
import AddToFavoritesButton from "@/components/AddToFavoritesButton";

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await fetchMovieById(id);
  return {
    title: `${movie.title} — CINEPHILE`,
    description: movie.overview?.slice(0, 160),
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;

  const [movie, { cast, director }, similarMovies] = await Promise.all([
    fetchMovieById(id),
    fetchMovieCredits(id),
    fetchSimilarMovies(id),
  ]);

  const year = movie.release_date?.split("-")[0] || "N/A";
  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
  const mins = movie.runtime ? movie.runtime % 60 : 0;
  const runtime = movie.runtime ? `${hours}h ${mins}m` : "N/A";
  const ratingPercent = Math.round(movie.vote_average * 10);

  return (
    <main className="pt-0 -mt-20">
      {/* ── Hero Spotlight ── */}
      <section className="relative h-[870px] w-full overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 z-0">
          {movie.backdrop_path ? (
            <Image
              src={tmdbImage(movie.backdrop_path, "original")}
              alt={`${movie.title} backdrop`}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-surface-container-lowest" />
          )}
          <div className="absolute inset-0 hero-mask" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto h-full flex items-end pb-12 px-8 lg:px-16">
          <div className="flex flex-col md:flex-row gap-10 items-end w-full">
            {/* Poster */}
            <div className="flex-shrink-0 mb-[-4rem] hidden md:block">
              <div className="w-72 aspect-[2/3] rounded-xl overflow-hidden shadow-[0px_24px_48px_rgba(0,0,0,0.5)]">
                {movie.poster_path ? (
                  <Image
                    src={tmdbImage(movie.poster_path, "w780")}
                    alt={`${movie.title} poster`}
                    width={780}
                    height={1170}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-8xl text-on-surface-variant/30">
                      movie
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-grow max-w-3xl mb-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded font-bold text-sm tracking-widest uppercase">
                  {movie.vote_average.toFixed(1)} RATING
                </span>
                <span className="text-on-surface-variant font-medium">
                  {year} • {runtime}
                </span>
              </div>

              <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-on-background mb-4 leading-none uppercase">
                {movie.title}
              </h1>

              {/* Genre badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-4 py-1.5 bg-surface-container-highest text-primary-fixed-dim rounded-full text-xs font-semibold tracking-wide uppercase"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-light line-clamp-4">
                {movie.overview || "No overview available."}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`}
                  target="_blank"
                  className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all active:scale-95"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                  WATCH TRAILER
                </Link>
                <AddToFavoritesButton movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Sections ── */}
      <section className="mt-24 px-8 lg:px-16 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Column */}
          <div className="lg:col-span-8">
            {/* Top Cast */}
            {cast.length > 0 && (
              <div className="mb-12">
                <h2 className="font-headline text-3xl font-bold mb-8 flex items-center gap-3">
                  Top Cast
                  <div className="h-[2px] flex-grow bg-surface-container-highest ml-4" />
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {cast.slice(0, 5).map((member) => (
                    <div key={member.id} className="group cursor-pointer">
                      <div className="aspect-square rounded-full overflow-hidden mb-4 border-4 border-transparent group-hover:border-primary transition-all duration-300 bg-surface-container-high">
                        {member.profile_path ? (
                          <Image
                            src={tmdbImage(member.profile_path, "w185")}
                            alt={member.name}
                            width={185}
                            height={185}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
                              person
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-on-background group-hover:text-primary transition-colors truncate">
                          {member.name}
                        </p>
                        <p className="text-sm text-on-surface-variant truncate">
                          {member.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-primary">
                <h3 className="text-primary font-bold mb-4 uppercase tracking-widest text-xs">
                  Technical Specs
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface-variant">Director</span>
                    <span className="font-bold">{director}</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface-variant">Runtime</span>
                    <span className="font-bold">{runtime}</span>
                  </li>
                  <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface-variant">Language</span>
                    <span className="font-bold uppercase">
                      {movie.original_language}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-on-surface-variant">Status</span>
                    <span className="text-tertiary font-bold">
                      {movie.status}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-tertiary">
                <h3 className="text-tertiary font-bold mb-4 uppercase tracking-widest text-xs">
                  Movie Info
                </h3>
                <div className="space-y-4">
                  {movie.tagline && (
                    <p className="italic text-on-surface-variant">
                      &ldquo;{movie.tagline}&rdquo;
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <span
                      className="material-symbols-outlined text-tertiary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      calendar_month
                    </span>
                    <p>
                      Released on{" "}
                      <span className="font-bold">{movie.release_date}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span
                      className="material-symbols-outlined text-tertiary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      groups
                    </span>
                    <p>
                      <span className="font-bold">
                        {movie.vote_count.toLocaleString()}
                      </span>{" "}
                      user votes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Rating */}
              <div className="bg-surface-container-highest p-8 rounded-xl">
                <h3 className="font-headline text-xl font-bold mb-6">
                  Audience Score
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold">TMDB Rating</span>
                      <span className="text-primary font-bold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary-container h-full transition-all"
                        style={{ width: `${ratingPercent}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold">Popularity</span>
                      <span className="text-tertiary font-bold">High</span>
                    </div>
                    <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                      <div className="bg-tertiary-container h-full w-[85%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Movies */}
              {similarMovies.length > 0 && (
                <div>
                  <h3 className="font-headline text-xl font-bold mb-6">
                    Similar Titles
                  </h3>
                  <div className="space-y-4">
                    {similarMovies.map((sim) => (
                      <Link
                        key={sim.id}
                        href={`/movies/${sim.id}`}
                        className="flex gap-4 p-3 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors"
                      >
                        <div className="w-20 h-28 flex-none rounded-lg overflow-hidden bg-surface-container-high">
                          {sim.poster_path ? (
                            <Image
                              src={tmdbImage(sim.poster_path, "w185")}
                              alt={sim.title}
                              width={185}
                              height={278}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-on-surface-variant/30">
                                movie
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="font-bold text-on-background truncate">
                            {sim.title}
                          </h4>
                          <p className="text-xs text-on-surface-variant">
                            {sim.release_date?.split("-")[0] || "N/A"}
                          </p>
                          <div className="flex items-center text-primary mt-1">
                            <span
                              className="material-symbols-outlined text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            <span className="text-xs ml-1">
                              {sim.vote_average.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
