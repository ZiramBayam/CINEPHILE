"use client";

export default function MovieDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-8 text-center">
      <span
        className="material-symbols-outlined text-7xl text-error"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        error
      </span>
      <h2 className="text-2xl font-headline font-bold text-on-surface">
        Failed to load movie details
      </h2>
      <p className="text-on-surface-variant max-w-md">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl bg-primary-container text-white font-bold hover:brightness-110 transition-all active:scale-95"
      >
        Try again
      </button>
    </main>
  );
}
