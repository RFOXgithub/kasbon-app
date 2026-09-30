import { ArrowDownLeft, ArrowUpRight, Scale } from "lucide-react";

export function SummarySection() {
  const summaries = [
    { label: "Total dihutang ke saya", Icon: ArrowDownLeft, accent: "bg-tint text-accent" },
    { label: "Total saya hutang", Icon: ArrowUpRight, accent: "bg-warm text-warm-ink" },
    { label: "Net", Icon: Scale, accent: "bg-frame text-accent" },
  ];

  return (
    <section className="mt-10 md:mt-14" aria-labelledby="summary-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sekilas</p>
          <h2 id="summary-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Ringkasan keuangan</h2>
        </div>
        <span className="hidden text-xs text-muted sm:block">Data akan muncul setelah pencatatan tersedia</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {summaries.map(({ label, Icon, accent }) => (
          <div key={label} className="surface-shell page-enter rounded-3xl">
            <div className="surface-core flex min-h-48 flex-col rounded-2xl p-6">
              <div className={`grid size-11 place-items-center rounded-2xl ${accent}`}><Icon aria-hidden="true" size={21} strokeWidth={1.5} /></div>
              <p className="mt-5 text-sm text-muted">{label}</p>
              <p className="mt-auto pt-2 text-4xl font-medium tracking-[-0.07em]" aria-label={`${label}: belum tersedia`}>—</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
