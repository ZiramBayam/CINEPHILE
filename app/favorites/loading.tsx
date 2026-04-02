export default function FavoritesLoading() {
  return (
    <main>
      <section className="relative w-full py-16 px-8 flex flex-col items-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-56 mx-auto bg-surface-container-highest rounded-lg animate-pulse" />
          <div className="h-5 w-80 mx-auto bg-surface-container-high rounded animate-pulse" />
        </div>
      </section>
      <section className="px-8 mt-4 max-w-4xl mx-auto space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-6 p-4 rounded-xl bg-surface-container"
          >
            <div className="w-24 h-36 rounded-lg bg-surface-container-highest animate-pulse flex-none" />
            <div className="flex-1 flex flex-col justify-center gap-3">
              <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-16 bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-full bg-surface-container rounded animate-pulse hidden sm:block" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
