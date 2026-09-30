import { LogoutButton } from "@/components/auth/logout-button";

export function DashboardHeader() {
  return (
    <header className="page-enter flex flex-wrap items-center justify-between gap-4 rounded-full bg-[#fbfaf6] px-4 py-3 ring-1 ring-[#1d4832]/10 shadow-[0_12px_40px_rgba(29,72,50,0.05)] sm:px-5">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="grid size-10 place-items-center rounded-[0.9rem] bg-[#193d30] text-xl font-semibold tracking-[-0.12em] text-[#e7e7cb]">K.</span>
        <span className="text-lg font-semibold tracking-[-0.05em]">kasbon</span>
      </div>
      <LogoutButton />
    </header>
  );
}
