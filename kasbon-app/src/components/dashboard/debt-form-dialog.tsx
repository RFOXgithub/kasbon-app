"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";

import { formatRupiah } from "@/lib/currency";
import { createDebtSchema } from "@/lib/validation/debt";
import type { Debt, DebtInput, DebtType } from "@/types/debt";

type DebtFormDialogProps = {
  debt: Debt | null;
  customerNames: string[];
  requestError: string | null;
  onClose: () => void;
  onSave: (input: DebtInput, existing?: Debt) => Promise<boolean>;
};

function today() {
  const date = new Date();
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

export function DebtFormDialog({ debt, customerNames, requestError, onClose, onSave }: DebtFormDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [type, setType] = useState<DebtType>(debt?.type ?? "owed_to_me");
  const [name, setName] = useState(debt?.counterpart_name ?? "");
  const [amount, setAmount] = useState(debt ? String(debt.amount) : "");
  const [date, setDate] = useState(debt?.due_date ?? (debt ? "" : today()));
  const [note, setNote] = useState(debt?.note ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const parsedAmount = Number(amount);
    if (!amount.trim() || !Number.isSafeInteger(parsedAmount) || parsedAmount <= 0) {
      setError("Jumlah harus berupa Rupiah utuh lebih dari 0.");
      return;
    }

    const validation = createDebtSchema.safeParse({
      type,
      counterpart_name: name,
      amount: parsedAmount,
      note: note || null,
      due_date: date || null,
    });

    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "Data catatan tidak valid.");
      return;
    }

    setIsSaving(true);
    try {
      if (await onSave(validation.data, debt ?? undefined)) dialogRef.current?.close();
    } finally {
      setIsSaving(false);
    }
  }

  const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-forest/15 bg-surface px-4 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-focus";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="debt-form-heading"
      className="m-auto max-h-[90dvh] w-[min(92vw,540px)] overflow-y-auto rounded-3xl bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/60"
      onCancel={(event) => { if (isSaving) event.preventDefault(); }}
      onClose={onClose}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Catatan kasbon</p>
            <h2 id="debt-form-heading" className="mt-2 text-2xl font-semibold tracking-tight">
              {debt ? "Edit catatan" : "Catat baru"}
            </h2>
          </div>
          <button aria-label="Tutup form" className="grid size-11 place-items-center rounded-full hover:bg-tint focus-visible:outline-2 focus-visible:outline-focus disabled:opacity-60" disabled={isSaving} onClick={() => dialogRef.current?.close()} type="button">
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <form className="mt-7 space-y-5" noValidate onSubmit={handleSubmit} aria-busy={isSaving}>
          <fieldset>
            <legend className="text-sm font-medium">Arah uang</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {([
                ["owed_to_me", "Berikan", "Uang keluar · Utang pelanggan"],
                ["i_owe", "Terima", "Uang masuk · Utang saya"],
              ] as const).map(([value, label, description]) => (
                <label key={value} className={`flex min-h-16 cursor-pointer items-center gap-2 rounded-xl border px-3 text-sm ${type === value ? value === "i_owe" ? "border-action bg-tint text-accent" : "border-error-ink bg-error-surface text-error-ink" : "border-forest/15"}`}>
                  <input checked={type === value} name="type" onChange={() => setType(value)} type="radio" value={value} />
                  <span><span className="block font-semibold">{label}</span><span className="block text-xs">{description}</span></span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm font-medium">
            Nama pelanggan
            <input autoComplete="off" className={fieldClass} list="customer-names" maxLength={100} onChange={(event) => setName(event.target.value)} placeholder="Pilih atau ketik nama baru" required type="text" value={name} />
            <span className="mt-1 block text-xs font-normal text-muted">Nama baru akan tersedia untuk catatan berikutnya.</span>
          </label>
          <datalist id="customer-names">{customerNames.map((customerName) => <option key={customerName} value={customerName} />)}</datalist>
          <label className="block text-sm font-medium">
            Nominal
            <input className={`${fieldClass} ${type === "i_owe" ? "text-accent" : "text-error-ink"}`} inputMode="numeric" onChange={(event) => setAmount(event.target.value.replace(/\D/g, ""))} placeholder="Rp " required type="text" value={amount ? formatRupiah(Number(amount)).replace(/\s/g, " ") : "Rp "} />
          </label>
          <label className="block text-sm font-medium">
            Tanggal jatuh tempo
            <input className={fieldClass} onChange={(event) => setDate(event.target.value)} type="date" value={date} />
          </label>
          <label className="block text-sm font-medium">
            Catatan <span className="font-normal text-muted">(opsional)</span>
            <textarea className={`${fieldClass} min-h-24 py-3`} maxLength={200} onChange={(event) => setNote(event.target.value)} value={note} />
            <span className="mt-1 block text-xs font-normal text-muted">{note.length}/200 karakter</span>
          </label>

          {(error || requestError) && <p role="alert" className="rounded-xl bg-error-surface p-3 text-sm text-error-ink">{error || requestError}</p>}

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <button className="min-h-11 rounded-full border border-forest/20 px-5 text-sm font-semibold hover:bg-tint disabled:opacity-60" disabled={isSaving} onClick={() => dialogRef.current?.close()} type="button">Batal</button>
            <button className="min-h-11 rounded-full bg-action px-6 text-sm font-semibold text-white hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-60" disabled={isSaving} type="submit">
              {isSaving && <span className="loading-dot mr-2" aria-hidden="true" />}
              {isSaving ? "Menyimpan..." : debt ? "Simpan perubahan" : "Simpan catatan"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
