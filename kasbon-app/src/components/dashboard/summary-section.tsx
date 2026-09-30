import { ArrowDownLeft, ArrowUpRight, Scale } from "lucide-react";

import { formatRupiah } from "@/lib/currency";
import { calculateDebtSummary } from "@/lib/debt-summary";
import type { Debt } from "@/types/debt";

type SummarySectionProps = {
  debts: Debt[];
  isLoading: boolean;
  hasError: boolean;
};

export function SummarySection({ debts, isLoading, hasError }: SummarySectionProps) {
  const summary = calculateDebtSummary(debts);
  const unavailable = isLoading || hasError;
  const cards = [
    { label: "Total saya dihutang", value: summary.owedToMe, Icon: ArrowDownLeft, accent: "bg-tint text-accent" },
    { label: "Total saya hutang", value: summary.iOwe, Icon: ArrowUpRight, accent: "bg-warm text-warm-ink" },
    { label: "Net", value: summary.net, Icon: Scale, accent: "bg-frame text-accent" },
  ];

  return (
    <section className="mt-10 md:mt-14" aria-labelledby="summary-heading">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sekilas</p>
        <h2 id="summary-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Ringkasan keuangan</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3" aria-busy={isLoading}>
        {cards.map(({ label, value, Icon, accent }) => (
          <article key={label} className="surface-shell page-enter rounded-3xl">
            <div className="surface-core flex min-h-48 flex-col rounded-2xl p-6">
              <div className={`grid size-11 place-items-center rounded-2xl ${accent}`}>
                <Icon aria-hidden="true" size={21} strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-sm text-muted">{label}</p>
              <p className={`mt-auto pt-2 text-3xl font-medium tracking-[-0.07em] sm:text-4xl ${label === "Net" && value < 0 ? "text-error-ink" : "text-ink"}`}>
                {unavailable ? "—" : formatRupiah(value)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
