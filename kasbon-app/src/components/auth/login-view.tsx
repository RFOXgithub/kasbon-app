import Link from "next/link";

import type { useAuthForm } from "@/hooks/auth/use-auth-form";
import styles from "@/styles/auth.module.css";

type AuthFormState = ReturnType<typeof useAuthForm>;

export function LoginView({
  email, password, errorMessage, isSubmitting, showPassword,
  setEmail, setPassword, setShowPassword, handleSubmit,
}: AuthFormState) {
  return (
    <main className="min-h-[100dvh] bg-page p-0 font-[family-name:var(--font-geist-sans)] text-ink md:p-4">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1600px] overflow-hidden bg-canvas md:min-h-[calc(100dvh-2rem)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:rounded-4xl md:ring-1 md:ring-ink/10">
        <section className="relative isolate flex min-h-80 flex-col overflow-hidden rounded-b-4xl bg-forest px-6 py-8 text-hero-text sm:px-10 md:min-h-full md:rounded-3xl md:px-12 md:py-12 lg:px-16 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full bg-focus/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-22rem] left-[-18rem] size-160 rounded-full border border-light-muted/10"
          />
          <div className="relative flex items-center gap-3">
            <span
              className="grid size-10 place-items-center rounded-xl bg-brand-cream text-xl font-semibold tracking-[-0.12em] text-forest shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              aria-hidden="true"
            >
              K<span className="text-soft-accent">.</span>
            </span>
            <span className="text-lg font-semibold tracking-[-0.04em]">
              kasbon
            </span>
          </div>

          <div
            className={`${styles.reveal} relative mt-12 max-w-xl md:mt-auto md:pb-8`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-light-muted ring-1 ring-white/10">
              <span
                className="size-1.5 rounded-full bg-soft-accent"
                aria-hidden="true"
              />
              Catatan keuangan pribadi
            </span>
            <h2 className="mt-6 max-w-[11ch] text-5xl md:text-6xl xl:text-8xl font-medium leading-[1.02] tracking-[-0.075em]">
              Lebih tenang, setiap catatan.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-light-muted sm:text-base">
              Satu tempat untuk memahami utang dan piutang, tanpa kehilangan
              jejak hal yang penting.
            </p>
          </div>

          <div
            className={`${styles.revealDelayed} relative mt-10 hidden max-w-lg rounded-4xl bg-white/[0.07] p-1.5 ring-1 ring-white/10 shadow-[0_24px_70px_rgba(5,24,17,0.14)] md:block`}
          >
            <div className="rounded-3xl bg-tint p-6 text-forest shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Semua lebih jelas
                </span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="size-1.5 rounded-full bg-soft-accent" />
                  <i className="size-1.5 rounded-full bg-soft-accent/40" />
                  <i className="size-1.5 rounded-full bg-soft-accent/40" />
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-surface px-5 py-5 shadow-[0_12px_35px_rgba(36,67,53,0.06)]">
                  <span className="text-xs text-muted">01 / Catat</span>
                  <p className="mt-5 text-lg font-medium tracking-[-0.04em]">
                    Utang
                  </p>
                  <span
                    className="mt-3 block h-1 w-16 rounded-full bg-soft-accent"
                    aria-hidden="true"
                  />
                </div>
                <div className="rounded-2xl bg-surface px-5 py-5 shadow-[0_12px_35px_rgba(36,67,53,0.06)]">
                  <span className="text-xs text-muted">02 / Pantau</span>
                  <p className="mt-5 text-lg font-medium tracking-[-0.04em]">
                    Piutang
                  </p>
                  <span
                    className="mt-3 block h-1 w-24 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="relative mt-8 hidden text-xs tracking-[0.05em] text-light-muted md:block">
            Ruang kecil untuk keuangan yang lebih tertata.
          </p>
        </section>

        <section className="flex min-w-0 flex-col px-4 py-8 sm:px-10 md:px-10 md:py-12 lg:px-16 lg:py-14">
          <div className="flex min-h-10 items-center justify-end text-sm text-muted">
            Belum punya akun?
            <Link
              className="ml-2 rounded-full px-2 py-1 font-semibold text-action underline decoration-underline underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
              href="/signup"
            >
              Daftar
            </Link>
          </div>

          <div
            className={`${styles.revealDelayed} mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12 md:py-20`}
          >
            <span className="w-fit rounded-full bg-tint px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Selamat datang kembali
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.07] tracking-[-0.07em] text-ink">
              Masuk ke akun Anda.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted">
              Lanjutkan mencatat dan melihat hal-hal yang perlu diselesaikan.
            </p>

            <form
              className="mt-10 space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label
                  className="auth-label"
                  htmlFor="email"
                >
                  Alamat email
                </label>
                <div className="auth-field-shell">
                  <input
                    autoComplete="email"
                    className="auth-input block"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nama@email.com"
                    required
                    type="email"
                    value={email}
                  />
                </div>
              </div>

              <div>
                <label
                  className="auth-label"
                  htmlFor="password"
                >
                  Kata sandi
                </label>
                <div className="flex auth-field-shell">
                  <div className="flex min-w-0 flex-1 items-center rounded-xl bg-surface">
                    <input
                      autoComplete="current-password"
                      className="auth-input min-w-0 flex-1 bg-transparent"
                      id="password"
                      minLength={8}
                      name="password"
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Masukkan kata sandi"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      aria-label={
                        showPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                      aria-pressed={showPassword}
                      className="auth-toggle"
                      onClick={() => setShowPassword((value) => !value)}
                      type="button"
                    >
                      {showPassword ? "Sembunyikan" : "Lihat"}
                    </button>
                  </div>
                </div>
              </div>

              {errorMessage ? (
                <p
                  aria-live="polite"
                  className="rounded-2xl bg-error-surface px-4 py-3 text-sm text-error-ink"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <button
                className="auth-submit group hover:shadow-[0_18px_36px_rgba(30,91,65,0.2)]"
                disabled={isSubmitting}
                type="submit"
              >
                <span>
                  {isSubmitting ? "Sedang masuk..." : "Masuk ke Kasbon"}
                </span>
                <span
                  aria-hidden="true"
                  className="auth-submit-icon"
                >
                  ↗
                </span>
              </button>
            </form>
            <p className="mt-7 text-center text-xs leading-6 text-muted">
              Catatan Anda tersedia lagi setelah masuk.
            </p>
          </div>
          <p className="text-center text-xs text-placeholder md:text-left">
            Kasbon · Catat dengan lebih tenang.
          </p>
        </section>
      </div>
    </main>
  );
}
