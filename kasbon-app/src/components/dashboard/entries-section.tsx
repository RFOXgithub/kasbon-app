import { NotebookPen } from "lucide-react";

import type { Debt } from "@/types/debt";

import { DebtItem } from "./debt-item";

type EntriesSectionProps = {
  debts: Debt[];
  isLoading: boolean;
  loadError: string | null;
  settleError: string | null;
  settlingId: string | null;
  onRetry: () => void;
  onSettle: (debt: Debt) => void;
};

export function EntriesSection({
  debts, isLoading, loadError, settleError, settlingId, onRetry, onSettle,
}: EntriesSectionProps) {
  return (
    <section className="mt-12 pb-16 md:mt-16 md:pb-24" aria-labelledby="entries-heading">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Riwayat</p>
        <h2 id="entries-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Semua catatan</h2>
      </div>
      {settleError && (
        <p role="alert" className="mb-4 rounded-2xl bg-error-surface px-5 py-4 text-sm text-error-ink">{settleError}</p>
      )}
      {isLoading ? (
        <div className="surface-shell" role="status">
          <div className="surface-core p-8 text-center text-muted">Memuat catatan...</div>
        </div>
      ) : loadError ? (
        <div className="surface-shell" role="alert">
          <div className="surface-core p-8 text-center">
            <p className="text-error-ink">{loadError}</p>
            <button className="mt-4 rounded-full bg-action px-5 py-3 text-sm font-semibold text-white hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action" onClick={onRetry} type="button">Coba lagi</button>
          </div>
        </div>
      ) : debts.length === 0 ? (
        <div className="surface-shell">
          <div className="surface-core flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="grid size-16 place-items-center rounded-2xl bg-tint text-accent"><NotebookPen aria-hidden="true" size={27} strokeWidth={1.4} /></div>
            <h3 className="mt-6 text-xl font-medium tracking-[-0.04em]">Belum ada catatan di sini</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">Catatan utang dan piutangmu akan muncul di sini.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {debts.map((debt) => (
            <DebtItem key={debt.id} debt={debt} isSettling={settlingId === debt.id} isDisabled={settlingId !== null} onSettle={onSettle} />
          ))}
        </div>
      )}
    </section>
  );
}
