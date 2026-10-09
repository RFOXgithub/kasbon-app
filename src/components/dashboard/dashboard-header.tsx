import { LogoutButton } from "@/components/auth/logout-button";

export function DashboardHeader() {
  return (
    <header className="page-enter flex flex-wrap items-center justify-between gap-4 rounded-full bg-canvas px-4 py-3 ring-1 ring-forest/10 shadow-[0_12px_40px_rgba(29,72,50,0.05)] sm:px-5">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-forest text-xl font-semibold tracking-[-0.12em] text-brand-cream">K.</span>
        <span className="text-lg font-semibold tracking-[-0.05em]">kasbon</span>
      </div>
      <LogoutButton />
    </header>
  );
}
