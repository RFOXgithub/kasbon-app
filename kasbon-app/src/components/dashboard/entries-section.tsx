import { NotebookPen } from "lucide-react";

export function EntriesSection() {
  return (
    <section className="mt-12 pb-16 md:mt-16 md:pb-24" aria-labelledby="entries-heading">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Riwayat</p>
        <h2 id="entries-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Semua catatan</h2>
      </div>
      <div className="surface-shell">
        <div className="surface-core flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-tint text-accent"><NotebookPen aria-hidden="true" size={27} strokeWidth={1.4} /></div>
          <h3 className="mt-6 text-xl font-medium tracking-[-0.04em]">Belum ada catatan di sini</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">Fitur mencatat utang dan piutang sedang disiapkan. Ringkasan akan tampil di sini setelah fitur tersedia.</p>
        </div>
      </div>
    </section>
  );
}
