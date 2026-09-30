import Link from "next/link";

import type { useAuthForm } from "./use-auth-form";
import styles from "./auth.module.css";

type AuthFormState = ReturnType<typeof useAuthForm>;

export function SignupView({
  email, password, errorMessage, successMessage, isSubmitting, showPassword,
  setEmail, setPassword, setShowPassword, handleSubmit,
}: AuthFormState) {
  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden bg-[#eeeae1] px-4 py-8 text-[#172820] sm:px-8 md:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-56 size-[520px] rounded-full bg-[#dbe5d6]/70 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <Link className="flex min-h-11 items-center gap-3 rounded-full pr-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#215942]" href="/login">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-[0.9rem] bg-[#193d30] text-xl font-semibold tracking-[-0.12em] text-[#e7e7cb]">K.</span>
            <span className="text-lg font-semibold tracking-[-0.05em]">kasbon</span>
          </Link>
          <Link className="rounded-full px-3 py-2 text-sm font-medium text-[#315b42] underline decoration-[#91ad93] underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#143a2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#215942]" href="/login">Sudah punya akun? Masuk</Link>
        </header>

        <div className="grid items-center gap-12 py-12 md:min-h-[calc(100dvh-8rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-16 md:py-20">
          <section className={`${styles.reveal} max-w-xl`}>
            <span className="inline-flex rounded-full bg-[#dfe9dd] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#315b42]">Mulai dari sini</span>
            <h1 className="mt-6 max-w-[11ch] text-[clamp(3rem,6vw,6rem)] font-medium leading-[1.02] tracking-[-0.075em]">Catatan rapi, kepala lebih ringan.</h1>
            <p className="mt-6 max-w-md text-base leading-8 text-[#5f7164]">Buat akun untuk mulai mengelola utang dan piutang pribadi dalam satu tempat.</p>
            <div className="mt-10 hidden max-w-sm rounded-[2rem] bg-[#dce4d8] p-1.5 ring-1 ring-[#1d4832]/10 md:block">
              <div className="rounded-[calc(2rem-0.375rem)] bg-[#f7f8f1] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6c826f]">Yang akan kamu catat</span>
                <div className="mt-6 flex items-center gap-4"><span aria-hidden="true" className="grid size-11 place-items-center rounded-2xl bg-[#dce9db] text-lg text-[#315b42]">01</span><span className="text-sm font-medium">Siapa dan berapa jumlahnya</span></div>
                <div className="mt-5 flex items-center gap-4"><span aria-hidden="true" className="grid size-11 place-items-center rounded-2xl bg-[#eee6d5] text-lg text-[#745c3d]">02</span><span className="text-sm font-medium">Apa yang sudah lunas</span></div>
              </div>
            </div>
          </section>

          <section className={`${styles.revealDelayed} w-full rounded-[2rem] bg-[#e3e5dc] p-1.5 ring-1 ring-[#1d4832]/10 shadow-[0_28px_80px_rgba(29,72,50,0.08)]`} aria-labelledby="signup-heading">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#fffefa] px-5 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-9 sm:py-10">
              <span className="inline-flex rounded-full bg-[#e9f0e7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#315b42]">Akun baru</span>
              <h2 id="signup-heading" className="mt-5 text-[clamp(2rem,3vw,2.7rem)] font-medium leading-tight tracking-[-0.06em]">Daftar Kasbon</h2>
              <p className="mt-2 text-sm leading-6 text-[#66776c]">Cukup email dan kata sandi untuk memulai.</p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="mb-2.5 block text-sm font-medium text-[#263f31]" htmlFor="email">Alamat email</label>
                  <div className="rounded-[1.15rem] bg-[#e9ebe3] p-1 ring-1 ring-[#214732]/[0.08] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:ring-2 focus-within:ring-[#387650]/60">
                    <input autoComplete="email" className="block min-h-12 w-full rounded-[calc(1.15rem-0.25rem)] bg-[#fffefa] px-4 text-base text-[#172820] outline-none placeholder:text-[#87948a]" id="email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" required type="email" value={email} />
                  </div>
                </div>
                <div>
                  <label className="mb-2.5 block text-sm font-medium text-[#263f31]" htmlFor="password">Kata sandi</label>
                  <div className="flex rounded-[1.15rem] bg-[#e9ebe3] p-1 ring-1 ring-[#214732]/[0.08] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:ring-2 focus-within:ring-[#387650]/60">
                    <div className="flex min-w-0 flex-1 items-center rounded-[calc(1.15rem-0.25rem)] bg-[#fffefa]">
                      <input autoComplete="new-password" className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-base text-[#172820] outline-none placeholder:text-[#87948a]" id="password" minLength={8} name="password" onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 8 karakter" required type={showPassword ? "text" : "password"} value={password} />
                      <button aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} aria-pressed={showPassword} className="min-h-11 shrink-0 rounded-lg px-4 text-xs font-semibold text-[#315b42] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#143a2a] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#215942]" onClick={() => setShowPassword((value) => !value)} type="button">{showPassword ? "Sembunyikan" : "Lihat"}</button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[#66776c]">Gunakan setidaknya 8 karakter.</p>
                </div>
                {errorMessage ? <p aria-live="polite" className="rounded-2xl bg-[#f9e9e4] px-4 py-3 text-sm text-[#8e382e]" role="alert">{errorMessage}</p> : null}
                {successMessage ? <p aria-live="polite" className="rounded-2xl bg-[#e8f1e8] px-4 py-3 text-sm text-[#28563b]" role="status">{successMessage}</p> : null}
                <button className="group flex min-h-14 w-full cursor-pointer items-center justify-between rounded-full bg-[#1e5b41] py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(30,91,65,0.14)] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#174b35] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none" disabled={isSubmitting} type="submit"><span>{isSubmitting ? "Sedang mendaftar..." : "Buat akun"}</span><span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-white/15 text-lg font-normal transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">↗</span></button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
