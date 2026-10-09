export function DashboardHero() {
  return (
    <section className="page-enter page-enter-late relative mt-8 overflow-hidden rounded-4xl bg-forest px-6 py-10 text-hero-text sm:px-10 sm:py-14 md:mt-10 md:px-14 md:py-16" aria-labelledby="dashboard-heading">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-48 size-120 rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-24 size-120 rounded-full border border-white/10" />
      <div className="relative max-w-2xl">
        <span className="inline-flex rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-light-muted ring-1 ring-white/10">Ruang catatanmu</span>
        <h1 id="dashboard-heading" className="mt-6 text-5xl md:text-6xl xl:text-7xl font-medium leading-[1.04] tracking-[-0.07em]">Uang yang tercatat, pikiran lebih tenang.</h1>
        <p className="mt-5 max-w-lg text-sm leading-7 text-light-muted sm:text-base">Lihat gambaran utang dan piutangmu di satu tempat.</p>
      </div>
      <div className="relative mt-10 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-light-muted"><span className="size-2 rounded-full bg-soft-accent" aria-hidden="true" /> Ringkasan pribadi</div>
    </section>
  );
}
