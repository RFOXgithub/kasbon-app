"use client";

import { useMemo, useState } from "react";
import { NotebookPen, Plus } from "lucide-react";

import { formatRupiah } from "@/lib/currency";
import type { Debt } from "@/types/debt";

import { DebtFilters, type SortOrder, type StatusFilter, type TypeFilter } from "./debt-filters";
import { DebtItem } from "./debt-item";

type EntriesSectionProps = {
  debts: Debt[];
  isLoading: boolean;
  loadError: string | null;
  actionError: string | null;
  pendingAction: string | null;
  onRetry: () => void;
  onAdd: () => void;
  onSettle: (debt: Debt) => void;
  onEdit: (debt: Debt) => void;
  onDelete: (debt: Debt) => void;
};

export function EntriesSection({
  debts, isLoading, loadError, actionError, pendingAction,
  onRetry, onAdd, onSettle, onEdit, onDelete,
}: EntriesSectionProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  const visibleDebts = useMemo(() => debts.filter((debt) =>
    debt.counterpart_name.toLocaleLowerCase("id-ID").includes(search.trim().toLocaleLowerCase("id-ID")) &&
    (status === "all" || (status === "settled" ? debt.settled_at !== null : debt.settled_at === null)) &&
    (type === "all" || debt.type === type),
  ).sort((a, b) => {
    if (sort === "amount-high") return b.amount - a.amount;
    if (sort === "amount-low") return a.amount - b.amount;
    return sort === "oldest"
      ? Date.parse(a.created_at) - Date.parse(b.created_at)
      : Date.parse(b.created_at) - Date.parse(a.created_at);
  }), [debts, search, status, type, sort]);

  const groups = useMemo(() => {
    const grouped = new Map<string, { name: string; count: number; received: number; given: number }>();
    for (const debt of visibleDebts) {
      const key = debt.counterpart_name.trim().toLocaleLowerCase("id-ID");
      const group = grouped.get(key) ?? { name: debt.counterpart_name, count: 0, received: 0, given: 0 };
      group.count += 1;
      if (debt.type === "i_owe") group.received += debt.amount;
      else group.given += debt.amount;
      grouped.set(key, group);
    }
    return [...grouped.values()].filter((group) => group.count > 1);
  }, [visibleDebts]);

  return (
    <section className="mt-12 pb-16 md:mt-16 md:pb-24" aria-labelledby="entries-heading">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Riwayat</p>
          <h2 id="entries-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Semua catatan</h2>
        </div>
        <button className="inline-flex min-h-11 items-center gap-2 rounded-full bg-action px-5 text-sm font-semibold text-white hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed disabled:opacity-60" disabled={pendingAction !== null} onClick={onAdd} type="button">
          <Plus aria-hidden="true" size={18} /> Catat baru
        </button>
      </div>

      <DebtFilters search={search} status={status} type={type} sort={sort} onSearch={setSearch} onStatus={setStatus} onType={setType} onSort={setSort} />

      {actionError && <p role="alert" className="mb-4 rounded-2xl bg-error-surface px-5 py-4 text-sm text-error-ink">{actionError}</p>}

      {isLoading ? (
        <div className="grid gap-4" role="status" aria-label="Memuat catatan">
          <span className="sr-only">Memuat catatan...</span>
          {[0, 1, 2].map((item) => (
            <div className="surface-shell" key={item} aria-hidden="true">
              <div className="surface-core flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="space-y-3">
                  <div className="loading-skeleton h-5 w-40 rounded-lg" />
                  <div className="loading-skeleton h-4 w-56 max-w-full rounded-lg" />
                </div>
                <div className="loading-skeleton h-10 w-36 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : loadError ? (
        <div className="surface-shell" role="alert"><div className="surface-core p-8 text-center">
          <p className="text-error-ink">{loadError}</p>
          <button className="mt-4 min-h-11 rounded-full bg-action px-5 text-sm font-semibold text-white hover:bg-action-hover" onClick={onRetry} type="button">Coba lagi</button>
        </div></div>
      ) : debts.length === 0 ? (
        <div className="surface-shell"><div className="surface-core flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-tint text-accent"><NotebookPen aria-hidden="true" size={27} strokeWidth={1.4} /></div>
          <h3 className="mt-6 text-xl font-medium tracking-[-0.04em]">Belum ada catatan di sini</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">Mulai dengan tombol Catat baru untuk mencatat utang atau piutangmu.</p>
        </div></div>
      ) : visibleDebts.length === 0 ? (
        <div className="surface-shell"><div className="surface-core p-8 text-center text-muted">Tidak ada catatan yang cocok dengan filter.</div></div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">Menampilkan {visibleDebts.length} dari {debts.length} catatan</p>
          {groups.length > 0 && (
            <section className="surface-shell mb-5" aria-labelledby="group-summary-heading">
              <div className="surface-core p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 id="group-summary-heading" className="text-base font-semibold tracking-tight text-ink">Catatan dari orang yang sama</h3>
                  <span className="text-sm text-muted">{groups.length} orang</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {groups.map((group) => (
                    <article key={group.name.toLocaleLowerCase("id-ID")} className="min-w-0 rounded-2xl bg-canvas p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h4 className="min-w-0 break-words text-base font-semibold text-ink">{group.name}</h4>
                        <span className="text-xs text-muted">{group.count} catatan</span>
                      </div>
                      <div className="mt-3 space-y-2 text-sm">
                        {group.received > 0 && <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-accent"><span>Terima</span><span className="font-semibold tabular-nums">{formatRupiah(group.received)}</span></div>}
                        {group.given > 0 && <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-error-ink"><span>Berikan</span><span className="font-semibold tabular-nums">{formatRupiah(group.given)}</span></div>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
          <div className="grid gap-4">
            {visibleDebts.map((debt) => <DebtItem key={debt.id} debt={debt} isSettling={pendingAction === `settle:${debt.id}`} isDeleting={pendingAction === `delete:${debt.id}`} isDisabled={pendingAction !== null} onSettle={onSettle} onEdit={onEdit} onDelete={onDelete} />)}
          </div>
        </>
      )}
    </section>
  );
}
