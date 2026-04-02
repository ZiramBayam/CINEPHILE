export default function GenresLoading() {
  return (
    <main>
      <section className="relative w-full py-16 px-8 flex flex-col items-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-72 mx-auto bg-surface-container-highest rounded-lg animate-pulse" />
          <div className="h-5 w-96 mx-auto bg-surface-container-high rounded animate-pulse" />
        </div>
      </section>
      <section className="px-8 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-xl bg-surface-container-highest animate-pulse"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
