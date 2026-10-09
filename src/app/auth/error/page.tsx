import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-page px-4 py-8 text-ink">
      <section className="surface-shell page-enter w-full max-w-xl shadow-[0_28px_80px_rgba(29,72,50,0.08)]">
        <div className="surface-core px-6 py-12 text-center sm:px-12 sm:py-16">
          <span aria-hidden="true" className="mx-auto grid size-14 place-items-center rounded-2xl bg-tint text-2xl font-medium text-accent">!</span>
          <span className="mt-7 inline-flex rounded-full bg-tint px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Konfirmasi akun</span>
          <h1 className="mt-5 text-3xl md:text-5xl font-medium leading-tight tracking-[-0.06em]">Link ini tidak bisa dipakai.</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted">Link konfirmasi mungkin sudah kedaluwarsa atau pernah digunakan. Coba masuk untuk melanjutkan.</p>
          <Link className="group mx-auto mt-8 flex min-h-14 max-w-xs items-center justify-between rounded-full bg-action py-2 pl-6 pr-2 text-sm font-semibold text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-action-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action motion-reduce:transition-none" href="/login"><span>Kembali ke login</span><span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-white/15 text-lg font-normal transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
