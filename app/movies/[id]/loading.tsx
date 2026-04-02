export default function MovieDetailLoading() {
  return (
    <main className="pt-0 -mt-20">
      {/* Hero skeleton */}
      <section className="relative h-[870px] w-full bg-surface-container-lowest overflow-hidden">
        <div className="absolute bottom-12 left-0 right-0 px-8 lg:px-16 container mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-end">
            {/* Poster skeleton */}
            <div className="hidden md:block flex-shrink-0 mb-[-4rem]">
              <div className="w-72 aspect-[2/3] rounded-xl bg-surface-container-highest animate-pulse" />
            </div>

            {/* Info skeleton */}
            <div className="flex-grow max-w-3xl mb-4 space-y-4">
              <div className="flex gap-4">
                <div className="h-8 w-32 bg-surface-container-highest rounded animate-pulse" />
                <div className="h-8 w-40 bg-surface-container-high rounded animate-pulse" />
              </div>
              <div className="h-16 w-3/4 bg-surface-container-highest rounded-lg animate-pulse" />
              <div className="h-16 w-1/2 bg-surface-container-highest rounded-lg animate-pulse" />
              <div className="flex gap-3">
                <div className="h-8 w-24 bg-surface-container-high rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-surface-container-high rounded-full animate-pulse" />
                <div className="h-8 w-28 bg-surface-container-high rounded-full animate-pulse" />
              </div>
              <div className="h-5 w-full max-w-2xl bg-surface-container-high rounded animate-pulse" />
              <div className="h-5 w-5/6 max-w-2xl bg-surface-container-high rounded animate-pulse" />
              <div className="flex gap-4 pt-4">
                <div className="h-14 w-48 bg-surface-container-highest rounded-xl animate-pulse" />
                <div className="h-14 w-52 bg-surface-container-high rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="mt-24 px-8 lg:px-16 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            {/* Cast heading */}
            <div className="h-8 w-40 bg-surface-container-highest rounded animate-pulse mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i}>
                  <div className="aspect-square rounded-full bg-surface-container-highest animate-pulse mb-4" />
                  <div className="h-4 w-3/4 mx-auto bg-surface-container-high rounded animate-pulse mb-2" />
                  <div className="h-3 w-1/2 mx-auto bg-surface-container rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-surface-container-highest p-8 rounded-xl animate-pulse h-48 mb-8" />
            <div className="h-6 w-32 bg-surface-container-highest rounded animate-pulse mb-6" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-3 bg-surface-container-low rounded-xl mb-4"
              >
                <div className="w-20 h-28 rounded-lg bg-surface-container-highest animate-pulse" />
                <div className="flex flex-col justify-center gap-2 flex-1">
                  <div className="h-4 w-3/4 bg-surface-container-high rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-surface-container rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
