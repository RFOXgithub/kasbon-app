import { DashboardHeader } from "./dashboard-header";
import { DashboardHero } from "./dashboard-hero";
import { EntriesSection } from "./entries-section";
import { SummarySection } from "./summary-section";

export function DashboardView() {
  return (
    <main className="min-h-[100dvh] bg-page px-4 py-6 text-ink sm:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <DashboardHero />

        <SummarySection />

        <EntriesSection />
      </div>
    </main>
  );
}
