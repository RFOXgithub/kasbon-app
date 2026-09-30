"use client";

import { useDebts } from "@/hooks/debts/use-debts";

import { DashboardHeader } from "./dashboard-header";
import { DashboardHero } from "./dashboard-hero";
import { EntriesSection } from "./entries-section";
import { SummarySection } from "./summary-section";

export function DashboardView() {
  const { debts, isLoading, loadError, settleError, settlingId, retry, settleDebt } =
    useDebts();

  return (
    <main className="min-h-[100dvh] bg-page px-4 py-6 text-ink sm:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <DashboardHero />

        <SummarySection debts={debts} isLoading={isLoading} hasError={!!loadError} />

        <EntriesSection
          debts={debts}
          isLoading={isLoading}
          loadError={loadError}
          settleError={settleError}
          settlingId={settlingId}
          onRetry={retry}
          onSettle={settleDebt}
        />
      </div>
    </main>
  );
}
