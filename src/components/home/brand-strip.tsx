const BRANDS = ["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"]

function BrandStrip() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-8 text-lg font-semibold uppercase tracking-widest">
        {BRANDS.map((brand) => (
          <span key={brand} className="text-white/80">
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}

export { BrandStrip }

