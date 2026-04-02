export default function MoviesLoading() {
  return (
    <main>
      {/* Search section skeleton */}
      <section className="relative w-full py-16 px-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-10">
          <div className="text-center space-y-4">
            <div className="h-12 w-80 mx-auto bg-surface-container-highest rounded-lg animate-pulse" />
            <div className="h-5 w-96 mx-auto bg-surface-container-high rounded animate-pulse" />
          </div>
          <div className="h-20 max-w-3xl mx-auto w-full bg-surface-container-high rounded-full animate-pulse" />
          <div className="flex gap-3 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-surface-container-highest rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="px-8 mt-4">
        <div className="h-7 w-48 bg-surface-container-highest rounded mb-2 animate-pulse" />
        <div className="h-1 w-12 bg-surface-container-high rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-4">
              <div className="aspect-[2/3] w-full rounded-lg bg-surface-container-highest animate-pulse" />
              <div>
                <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse mb-2" />
                <div className="h-4 w-1/2 bg-surface-container rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
