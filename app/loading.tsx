export default function HomeLoading() {
  return (
    <main className="pb-24">
      {/* Hero skeleton */}
      <section className="relative min-h-[870px] flex items-end pt-20 -mt-20 bg-surface-container-lowest">
        <div className="px-8 md:px-16 max-w-4xl pb-20 space-y-6">
          <div className="flex gap-3">
            <div className="h-7 w-32 bg-surface-container-highest rounded-full animate-pulse" />
            <div className="h-7 w-24 bg-surface-container-high rounded-full animate-pulse" />
          </div>
          <div className="h-20 w-3/4 bg-surface-container-highest rounded-lg animate-pulse" />
          <div className="h-20 w-1/2 bg-surface-container-highest rounded-lg animate-pulse" />
          <div className="h-5 w-full max-w-xl bg-surface-container-high rounded animate-pulse" />
          <div className="h-5 w-5/6 max-w-xl bg-surface-container-high rounded animate-pulse" />
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-44 bg-surface-container-highest rounded-xl animate-pulse" />
            <div className="h-14 w-40 bg-surface-container-high rounded-xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Curated grid skeleton */}
      <section className="px-8 mt-20">
        <div className="h-8 w-56 bg-surface-container-highest rounded animate-pulse mb-2" />
        <div className="h-4 w-80 bg-surface-container-high rounded animate-pulse mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[2/3] rounded-xl bg-surface-container-highest animate-pulse" />
              <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-surface-container rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal row skeleton */}
      <section className="px-8 mt-24">
        <div className="h-8 w-40 bg-surface-container-highest rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-surface-container-high rounded animate-pulse mb-10" />
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-none w-[180px] space-y-4">
              <div className="aspect-[2/3] rounded-lg bg-surface-container-highest animate-pulse" />
              <div className="h-4 w-3/4 bg-surface-container-high rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Bento skeleton */}
      <section className="px-8 mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[400px]">
        <div className="md:col-span-2 bg-surface-container-low rounded-2xl animate-pulse" />
        <div className="bg-surface-container-highest rounded-2xl animate-pulse min-h-[200px]" />
      </section>
    </main>
  );
}
