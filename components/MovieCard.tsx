import Image from "next/image";
import Link from "next/link";
import { TMDBMovie, tmdbImage, getGenreName } from "@/lib/tmdb";
import FavoriteButton from "@/components/FavoriteButton";

interface MovieCardProps {
  movie: TMDBMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date?.split("-")[0] || "N/A";
  const genre = movie.genre_ids?.[0]
    ? getGenreName(movie.genre_ids[0])
    : "Movie";
  const rating = movie.vote_average?.toFixed(1) || "N/A";

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative flex flex-col space-y-4"
    >
      <div className="aspect-[2/3] w-full relative rounded-lg overflow-hidden bg-surface-container-high transition-transform duration-500 hover:-translate-y-2">
        {movie.poster_path ? (
          <Image
            src={tmdbImage(movie.poster_path, "w500")}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">
              movie
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        {/* Favorite Button */}
        <div className="absolute top-4 right-4">
          <FavoriteButton movie={movie} />
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span
            className="material-symbols-outlined text-yellow-500 text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="text-xs font-bold text-white">{rating}</span>
        </div>
      </div>

      <div>
        <h3 className="font-headline font-bold text-lg text-on-surface line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-on-surface-variant text-sm font-medium">
          {genre} • {year}
        </p>
      </div>
    </Link>
  );
}
