import { ArrowDownLeft, ArrowUpRight, Scale } from "lucide-react";

import { formatRupiah } from "@/lib/currency";
import { calculateDebtSummary } from "@/lib/debt-summary";
import type { Debt } from "@/types/debt";

import { DebtComparisonChart } from "./debt-comparison-chart";

type SummarySectionProps = {
  debts: Debt[];
  isLoading: boolean;
  hasError: boolean;
};

export function SummarySection({ debts, isLoading, hasError }: SummarySectionProps) {
  const summary = calculateDebtSummary(debts);
  const unavailable = isLoading || hasError;
  const cards = [
    { label: "Total Utang Saya", value: summary.iOwe, Icon: ArrowDownLeft, accent: "bg-tint text-accent", amountColor: "text-accent" },
    { label: "Total Utang Pelanggan", value: summary.owedToMe, Icon: ArrowUpRight, accent: "bg-error-surface text-error-ink", amountColor: "text-error-ink" },
    { label: "Selisih uang masuk - keluar", value: summary.net, Icon: Scale, accent: "bg-frame text-accent", amountColor: summary.net > 0 ? "text-accent" : summary.net < 0 ? "text-error-ink" : "text-ink" },
  ];

  return (
    <section className="mt-10 md:mt-14" aria-labelledby="summary-heading">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sekilas</p>
        <h2 id="summary-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Ringkasan keuangan</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3" aria-busy={isLoading}>
        {cards.map(({ label, value, Icon, accent, amountColor }) => (
          <article key={label} className="surface-shell page-enter rounded-3xl">
            <div className="surface-core flex min-h-48 flex-col rounded-2xl p-6">
              <div className={`grid size-11 place-items-center rounded-2xl ${accent}`}>
                <Icon aria-hidden="true" size={21} strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-sm text-muted">{label}</p>
              {isLoading ? (
                <span className="loading-skeleton mt-auto block h-10 w-2/3 rounded-xl" aria-hidden="true" />
              ) : (
                <p className={`mt-auto pt-2 text-3xl font-medium tracking-[-0.07em] sm:text-4xl ${amountColor}`}>
                  {hasError ? "—" : formatRupiah(value)}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      {isLoading ? (
        <div className="surface-shell mt-4" role="status" aria-label="Memuat perbandingan utang dan piutang">
          <div className="surface-core space-y-5 p-6" aria-hidden="true">
            <div className="loading-skeleton h-5 w-52 rounded-lg" />
            <div className="loading-skeleton h-3 w-full rounded-full" />
            <div className="loading-skeleton h-3 w-3/4 rounded-full" />
          </div>
        </div>
      ) : !unavailable ? <DebtComparisonChart owedToMe={summary.owedToMe} iOwe={summary.iOwe} /> : null}
    </section>
  );
}
