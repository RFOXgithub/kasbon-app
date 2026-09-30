import Link from "next/link";

import type { useAuthForm } from "./use-auth-form";
import styles from "./auth.module.css";

type AuthFormState = ReturnType<typeof useAuthForm>;

export function LoginView({
  email, password, errorMessage, isSubmitting, showPassword,
  setEmail, setPassword, setShowPassword, handleSubmit,
}: AuthFormState) {
  return (
    <main className="min-h-[100dvh] bg-[#eeeae1] p-0 font-[family-name:var(--font-geist-sans)] text-[#172820] md:p-4">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1600px] overflow-hidden bg-[#faf9f5] md:min-h-[calc(100dvh-2rem)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:rounded-[2rem] md:ring-1 md:ring-[#172820]/10">
        <section className="relative isolate flex min-h-[320px] flex-col overflow-hidden rounded-b-[2rem] bg-[#16382e] px-6 py-8 text-[#f5f2e9] sm:px-10 md:min-h-full md:rounded-[1.75rem] md:px-12 md:py-12 lg:px-16 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full bg-[#4d8a6d]/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-22rem] left-[-18rem] h-[660px] w-[660px] rounded-full border border-[#e4efdc]/10"
          />
          <div className="relative flex items-center gap-3">
            <span
              className="grid size-10 place-items-center rounded-[0.9rem] bg-[#e5e5cb] text-xl font-semibold tracking-[-0.12em] text-[#17382d] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              aria-hidden="true"
            >
              K<span className="text-[#a7b99a]">.</span>
            </span>
            <span className="text-lg font-semibold tracking-[-0.04em]">
              kasbon
            </span>
          </div>

          <div
            className={`${styles.reveal} relative mt-12 max-w-xl md:mt-auto md:pb-8`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d5e3d2] ring-1 ring-white/10">
              <span
                className="size-1.5 rounded-full bg-[#bfdab4]"
                aria-hidden="true"
              />
              Catatan keuangan pribadi
            </span>
            <h2 className="mt-6 max-w-[11ch] text-[clamp(2.7rem,5vw,5.7rem)] font-medium leading-[1.02] tracking-[-0.075em]">
              Lebih tenang, setiap catatan.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#c5d5c8] sm:text-base">
              Satu tempat untuk memahami utang dan piutang, tanpa kehilangan
              jejak hal yang penting.
            </p>
          </div>

          <div
            className={`${styles.revealDelayed} relative mt-10 hidden max-w-[490px] rounded-[2rem] bg-white/[0.07] p-1.5 ring-1 ring-white/10 shadow-[0_24px_70px_rgba(5,24,17,0.14)] md:block`}
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#e9eee2] p-6 text-[#244335] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Semua lebih jelas
                </span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="size-1.5 rounded-full bg-[#84aa8c]" />
                  <i className="size-1.5 rounded-full bg-[#84aa8c]/40" />
                  <i className="size-1.5 rounded-full bg-[#84aa8c]/40" />
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-[#f9faf4] px-5 py-5 shadow-[0_12px_35px_rgba(36,67,53,0.06)]">
                  <span className="text-xs text-[#6e8474]">01 / Catat</span>
                  <p className="mt-5 text-lg font-medium tracking-[-0.04em]">
                    Utang
                  </p>
                  <span
                    className="mt-3 block h-1 w-16 rounded-full bg-[#acc9ad]"
                    aria-hidden="true"
                  />
                </div>
                <div className="rounded-[1.25rem] bg-[#f9faf4] px-5 py-5 shadow-[0_12px_35px_rgba(36,67,53,0.06)]">
                  <span className="text-xs text-[#6e8474]">02 / Pantau</span>
                  <p className="mt-5 text-lg font-medium tracking-[-0.04em]">
                    Piutang
                  </p>
                  <span
                    className="mt-3 block h-1 w-24 rounded-full bg-[#d7ba90]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="relative mt-8 hidden text-xs tracking-[0.05em] text-[#abc3b3] md:block">
            Ruang kecil untuk keuangan yang lebih tertata.
          </p>
        </section>

        <section className="flex min-w-0 flex-col px-4 py-8 sm:px-10 md:px-10 md:py-12 lg:px-16 lg:py-14">
          <div className="flex min-h-10 items-center justify-end text-sm text-[#66776c]">
            Belum punya akun?
            <Link
              className="ml-2 rounded-full px-2 py-1 font-semibold text-[#215942] underline decoration-[#91ad93] underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#143a2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#215942]"
              href="/signup"
            >
              Daftar
            </Link>
          </div>

          <div
            className={`${styles.revealDelayed} mx-auto flex w-full max-w-[430px] flex-1 flex-col justify-center py-12 md:py-20`}
          >
            <span className="w-fit rounded-full bg-[#e6eee3] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#315b42]">
              Selamat datang kembali
            </span>
            <h1 className="mt-6 text-[clamp(2.5rem,4vw,4.25rem)] font-medium leading-[1.07] tracking-[-0.07em] text-[#172820]">
              Masuk ke akun Anda.
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-[#647268]">
              Lanjutkan mencatat dan melihat hal-hal yang perlu diselesaikan.
            </p>

            <form
              className="mt-10 space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label
                  className="mb-2.5 block text-sm font-medium text-[#263f31]"
                  htmlFor="email"
                >
                  Alamat email
                </label>
                <div className="rounded-[1.15rem] bg-[#e9ebe3] p-1 ring-1 ring-[#214732]/[0.08] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:ring-2 focus-within:ring-[#387650]/60">
                  <input
                    autoComplete="email"
                    className="block min-h-12 w-full rounded-[calc(1.15rem-0.25rem)] bg-[#fffefa] px-4 text-base text-[#172820] outline-none placeholder:text-[#87948a]"
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
                  className="mb-2.5 block text-sm font-medium text-[#263f31]"
                  htmlFor="password"
                >
                  Kata sandi
                </label>
                <div className="flex rounded-[1.15rem] bg-[#e9ebe3] p-1 ring-1 ring-[#214732]/[0.08] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:ring-2 focus-within:ring-[#387650]/60">
                  <div className="flex min-w-0 flex-1 items-center rounded-[calc(1.15rem-0.25rem)] bg-[#fffefa]">
                    <input
                      autoComplete="current-password"
                      className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-base text-[#172820] outline-none placeholder:text-[#87948a]"
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
                      className="min-h-11 shrink-0 rounded-lg px-4 text-xs font-semibold text-[#315b42] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#143a2a] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#215942]"
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
                  className="rounded-2xl bg-[#f9e9e4] px-4 py-3 text-sm text-[#8e382e]"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <button
                className="group flex min-h-14 w-full cursor-pointer items-center justify-between rounded-full bg-[#1e5b41] py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(30,91,65,0.14)] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#174b35] hover:shadow-[0_18px_36px_rgba(30,91,65,0.2)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
                disabled={isSubmitting}
                type="submit"
              >
                <span>
                  {isSubmitting ? "Sedang masuk..." : "Masuk ke Kasbon"}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-full bg-white/15 text-lg font-normal transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  ↗
                </span>
              </button>
            </form>
            <p className="mt-7 text-center text-xs leading-6 text-[#748177]">
              Catatan Anda tersedia lagi setelah masuk.
            </p>
          </div>
          <p className="text-center text-xs text-[#8d988e] md:text-left">
            Kasbon · Catat dengan lebih tenang.
          </p>
        </section>
      </div>
    </main>
  );
}
