import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#eeeae1] px-4 py-8 text-[#172820]">
      <section className="page-enter w-full max-w-xl rounded-[2rem] bg-[#dfe4da] p-1.5 ring-1 ring-[#1d4832]/10 shadow-[0_28px_80px_rgba(29,72,50,0.08)]">
        <div className="rounded-[calc(2rem-0.375rem)] bg-[#fffefa] px-6 py-12 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-12 sm:py-16">
          <span aria-hidden="true" className="mx-auto grid size-14 place-items-center rounded-[1.2rem] bg-[#e9eee2] text-2xl font-medium text-[#315b42]">!</span>
          <span className="mt-7 inline-flex rounded-full bg-[#e9f0e7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#315b42]">Konfirmasi akun</span>
          <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.06em]">Link ini tidak bisa dipakai.</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#66776c]">Link konfirmasi mungkin sudah kedaluwarsa atau pernah digunakan. Coba masuk untuk melanjutkan.</p>
          <Link className="group mx-auto mt-8 flex min-h-14 max-w-xs items-center justify-between rounded-full bg-[#1e5b41] py-2 pl-6 pr-2 text-sm font-semibold text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#174b35] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e5b41] motion-reduce:transition-none" href="/login"><span>Kembali ke login</span><span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-white/15 text-lg font-normal transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
