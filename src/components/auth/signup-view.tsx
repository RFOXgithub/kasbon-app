import Link from "next/link";

import type { useAuthForm } from "@/hooks/auth/use-auth-form";
import styles from "@/styles/auth.module.css";

type AuthFormState = ReturnType<typeof useAuthForm>;

export function SignupView({
  email, password, errorMessage, successMessage, isSubmitting, showPassword,
  setEmail, setPassword, setShowPassword, handleSubmit,
}: AuthFormState) {
  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden bg-page px-4 py-8 text-ink sm:px-8 md:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-56 size-128 rounded-full bg-frame/70 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <Link className="flex min-h-11 items-center gap-3 rounded-full pr-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action" href="/login">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-forest text-xl font-semibold tracking-[-0.12em] text-brand-cream">K.</span>
            <span className="text-lg font-semibold tracking-[-0.05em]">kasbon</span>
          </Link>
          <Link className="rounded-full px-3 py-2 text-sm font-medium text-accent underline decoration-underline underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action" href="/login">Sudah punya akun? Masuk</Link>
        </header>

        <div className="grid items-center gap-12 py-12 md:min-h-[calc(100dvh-8rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-16 md:py-20">
          <section className={`${styles.reveal} max-w-xl`}>
            <span className="inline-flex rounded-full bg-tint px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Mulai dari sini</span>
            <h1 className="mt-6 max-w-[11ch] text-5xl md:text-7xl xl:text-8xl font-medium leading-[1.02] tracking-[-0.075em]">Catatan rapi, kepala lebih ringan.</h1>
            <p className="mt-6 max-w-md text-base leading-8 text-muted">Buat akun untuk mulai mengelola utang dan piutang pribadi dalam satu tempat.</p>
            <div className="surface-shell mt-10 hidden max-w-sm md:block">
              <div className="surface-core p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Yang akan kamu catat</span>
                <div className="mt-6 flex items-center gap-4"><span aria-hidden="true" className="grid size-11 place-items-center rounded-2xl bg-tint-strong text-lg text-accent">01</span><span className="text-sm font-medium">Siapa dan berapa jumlahnya</span></div>
                <div className="mt-5 flex items-center gap-4"><span aria-hidden="true" className="grid size-11 place-items-center rounded-2xl bg-warm text-lg text-warm-ink">02</span><span className="text-sm font-medium">Apa yang sudah lunas</span></div>
              </div>
            </div>
          </section>

          <section className={`${styles.revealDelayed} surface-shell w-full shadow-[0_28px_80px_rgba(29,72,50,0.08)]`} aria-labelledby="signup-heading">
            <div className="surface-core px-5 py-8 sm:px-9 sm:py-10">
              <span className="inline-flex rounded-full bg-tint px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Akun baru</span>
              <h2 id="signup-heading" className="mt-5 text-3xl lg:text-4xl font-medium leading-tight tracking-[-0.06em]">Daftar Kasbon</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Cukup email dan kata sandi untuk memulai.</p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
                <div>
                  <label className="auth-label" htmlFor="email">Alamat email</label>
                  <div className="auth-field-shell">
                    <input autoComplete="email" className="auth-input block" id="email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" required type="email" value={email} />
                  </div>
                </div>
                <div>
                  <label className="auth-label" htmlFor="password">Kata sandi</label>
                  <div className="flex auth-field-shell">
                    <div className="flex min-w-0 flex-1 items-center rounded-xl bg-surface">
                      <input autoComplete="new-password" className="auth-input min-w-0 flex-1 bg-transparent" id="password" minLength={8} name="password" onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 8 karakter" required type={showPassword ? "text" : "password"} value={password} />
                      <button aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} aria-pressed={showPassword} className="auth-toggle" onClick={() => setShowPassword((value) => !value)} type="button">{showPassword ? "Sembunyikan" : "Lihat"}</button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted">Gunakan setidaknya 8 karakter.</p>
                </div>
                {errorMessage ? <p aria-live="polite" className="rounded-2xl bg-error-surface px-4 py-3 text-sm text-error-ink" role="alert">{errorMessage}</p> : null}
                {successMessage ? <p aria-live="polite" className="rounded-2xl bg-success-surface px-4 py-3 text-sm text-accent" role="status">{successMessage}</p> : null}
                <button className="auth-submit group" disabled={isSubmitting} type="submit"><span>{isSubmitting && <span className="loading-dot mr-2" aria-hidden="true" />}{isSubmitting ? "Sedang mendaftar..." : "Buat akun"}</span><span aria-hidden="true" className="auth-submit-icon">↗</span></button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
