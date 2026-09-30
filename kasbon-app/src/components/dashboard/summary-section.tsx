import { ArrowDownLeft, ArrowUpRight, Scale } from "lucide-react";

export function SummarySection() {
  const summaries = [
    { label: "Total dihutang ke saya", Icon: ArrowDownLeft, accent: "bg-[#e5efe5] text-[#316b4a]" },
    { label: "Total saya hutang", Icon: ArrowUpRight, accent: "bg-[#f3ebe0] text-[#956e40]" },
    { label: "Net", Icon: Scale, accent: "bg-[#e9ece5] text-[#405c49]" },
  ];

  return (
    <section className="mt-10 md:mt-14" aria-labelledby="summary-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52745b]">Sekilas</p>
          <h2 id="summary-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Ringkasan keuangan</h2>
        </div>
        <span className="hidden text-xs text-[#69796c] sm:block">Data akan muncul setelah pencatatan tersedia</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {summaries.map(({ label, Icon, accent }) => (
          <div key={label} className="page-enter rounded-[1.75rem] bg-[#dfe4da] p-1.5 ring-1 ring-[#1d4832]/[0.06]">
            <div className="flex min-h-48 flex-col rounded-[calc(1.75rem-0.375rem)] bg-[#fffefa] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div className={`grid size-11 place-items-center rounded-2xl ${accent}`}><Icon aria-hidden="true" size={21} strokeWidth={1.5} /></div>
              <p className="mt-5 text-sm text-[#647268]">{label}</p>
              <p className="mt-auto pt-2 text-4xl font-medium tracking-[-0.07em]" aria-label={`${label}: belum tersedia`}>—</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
