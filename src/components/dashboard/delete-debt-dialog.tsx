"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, X } from "lucide-react";

import { formatRupiah } from "@/lib/currency";
import type { Debt } from "@/types/debt";

type DeleteDebtDialogProps = {
  debt: Debt;
  requestError: string | null;
  onClose: () => void;
  onDelete: (debt: Debt) => Promise<boolean>;
};

export function DeleteDebtDialog({ debt, requestError, onClose, onDelete }: DeleteDebtDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      if (await onDelete(debt)) dialogRef.current?.close();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-describedby="delete-debt-description"
      aria-labelledby="delete-debt-heading"
      className="m-auto w-[min(92vw,460px)] rounded-4xl bg-frame p-1.5 text-ink ring-1 ring-forest/10 shadow-[0_28px_80px_rgba(29,72,50,0.18)] backdrop:bg-ink/55 backdrop:backdrop-blur-sm"
      onCancel={(event) => { if (isDeleting) event.preventDefault(); }}
      onClose={onClose}
    >
      <div className="surface-core p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl bg-error-surface text-error-ink">
            <Trash2 size={25} strokeWidth={1.5} />
          </span>
          <button
            aria-label="Tutup konfirmasi hapus"
            className="grid size-11 place-items-center rounded-full text-muted transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-tint active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-60 motion-reduce:transition-none"
            disabled={isDeleting}
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            <X size={19} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <span className="mt-7 inline-flex rounded-full bg-error-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-error-ink">Hapus catatan</span>
        <h2 id="delete-debt-heading" className="mt-4 text-3xl font-medium leading-tight tracking-[-0.06em] sm:text-4xl">Hapus catatan ini?</h2>
        <p id="delete-debt-description" className="mt-3 text-sm leading-7 text-muted">
          Catatan dengan <strong className="font-semibold text-ink">{debt.counterpart_name}</strong> sebesar {formatRupiah(debt.amount)} akan dihapus permanen.
        </p>

        {requestError && <p role="alert" className="mt-5 rounded-2xl bg-error-surface px-4 py-3 text-sm text-error-ink">{requestError}</p>}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            autoFocus
            className="min-h-12 rounded-full bg-tint px-6 text-sm font-semibold text-accent transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-tint-strong active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-60 motion-reduce:transition-none"
            disabled={isDeleting}
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            Batal
          </button>
          <button
            aria-busy={isDeleting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-error-ink px-6 text-sm font-semibold text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-error-ink/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error-ink disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
            disabled={isDeleting}
            onClick={() => void handleDelete()}
            type="button"
          >
            {isDeleting ? <span className="loading-dot" aria-hidden="true" /> : <Trash2 size={17} strokeWidth={1.5} aria-hidden="true" />}
            {isDeleting ? "Menghapus..." : "Ya, hapus catatan"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
