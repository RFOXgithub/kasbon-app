import { Check, Pencil, Trash2 } from "lucide-react";

import { formatRupiah } from "@/lib/currency";
import { formatRelativeTime } from "@/lib/relative-time";
import type { Debt } from "@/types/debt";

type DebtItemProps = {
  debt: Debt;
  isSettling: boolean;
  isDeleting: boolean;
  isDisabled: boolean;
  onSettle: (debt: Debt) => void;
  onEdit: (debt: Debt) => void;
  onDelete: (debt: Debt) => void;
};

export function DebtItem({ debt, isSettling, isDeleting, isDisabled, onSettle, onEdit, onDelete }: DebtItemProps) {
  const isSettled = debt.settled_at !== null;

  return (
    <article className="surface-shell">
      <div className="surface-core flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-medium tracking-tight text-ink">{debt.counterpart_name}</h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${debt.type === "owed_to_me" ? "bg-tint text-accent" : "bg-warm text-warm-ink"}`}>
              {debt.type === "owed_to_me" ? "Saya dihutang" : "Saya hutang"}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <time dateTime={debt.created_at}>{formatRelativeTime(debt.created_at)}</time>
            <span aria-hidden="true">·</span>
            <span className={isSettled ? "text-accent" : "text-warm-ink"}>{isSettled ? "Lunas" : "Belum lunas"}</span>
          </div>
          {debt.note && <p className="mt-2 text-sm text-muted">{debt.note}</p>}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-4 sm:justify-end">
          <p className="text-xl font-semibold tracking-tight text-ink">{formatRupiah(debt.amount)}</p>
          {isSettled ? (
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-tint px-4 text-sm font-medium text-accent"><Check aria-hidden="true" size={16} /> Lunas</span>
          ) : (
            <button className="min-h-11 rounded-full bg-action px-5 text-sm font-semibold text-white transition-colors hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed disabled:opacity-60" disabled={isDisabled} onClick={() => onSettle(debt)} type="button">
              {isSettling && <span className="loading-dot mr-2" aria-hidden="true" />}
              {isSettling ? "Menyimpan..." : "Tandai lunas"}
            </button>
          )}
          <button className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-forest/20 px-4 text-sm font-medium hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-60" disabled={isDisabled} onClick={() => onEdit(debt)} type="button">
            <Pencil aria-hidden="true" size={15} /> Edit
          </button>
          <button className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-error-ink/25 px-4 text-sm font-medium text-error-ink hover:bg-error-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-ink disabled:opacity-60" disabled={isDisabled} onClick={() => onDelete(debt)} type="button">
            {isDeleting ? <span className="loading-dot" aria-hidden="true" /> : <Trash2 aria-hidden="true" size={15} />}
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </article>
  );
}
