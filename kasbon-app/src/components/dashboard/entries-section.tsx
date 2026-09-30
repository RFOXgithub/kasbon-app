import { NotebookPen } from "lucide-react";

export function EntriesSection() {
  return (
    <section className="mt-12 pb-16 md:mt-16 md:pb-24" aria-labelledby="entries-heading">
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#52745b]">Riwayat</p>
        <h2 id="entries-heading" className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">Semua catatan</h2>
      </div>
      <div className="rounded-[2rem] bg-[#dfe4da] p-1.5 ring-1 ring-[#1d4832]/[0.06]">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-[calc(2rem-0.375rem)] bg-[#fffefa] px-6 py-12 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="grid size-16 place-items-center rounded-[1.4rem] bg-[#e6efe4] text-[#32684b]"><NotebookPen aria-hidden="true" size={27} strokeWidth={1.4} /></div>
          <h3 className="mt-6 text-xl font-medium tracking-[-0.04em]">Belum ada catatan di sini</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#66776c]">Fitur mencatat utang dan piutang sedang disiapkan. Ringkasan akan tampil di sini setelah fitur tersedia.</p>
        </div>
      </div>
    </section>
  );
}
