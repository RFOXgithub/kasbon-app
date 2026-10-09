import { formatRupiah } from "@/lib/currency";

type DebtComparisonChartProps = {
  owedToMe: number;
  iOwe: number;
};

export function DebtComparisonChart({ owedToMe, iOwe }: DebtComparisonChartProps) {
  const maximum = Math.max(owedToMe, iOwe, 1);
  const bars = [
    { label: "Total Utang Saya · uang masuk", value: iOwe, color: "bg-action" },
    { label: "Total Utang Pelanggan · uang keluar", value: owedToMe, color: "bg-error-ink" },
  ];

  return (
    <div className="surface-shell mt-4" aria-label="Perbandingan utang dan piutang belum lunas">
      <div className="surface-core p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-ink">Perbandingan yang belum lunas</h3>
        <div className="mt-5 space-y-4">
          {bars.map(({ label, value, color }) => (
            <div key={label}>
              <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm">
                <span className="text-muted">{label}</span>
                <span className="font-medium text-ink">{formatRupiah(value)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-frame" aria-hidden="true">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / maximum) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
