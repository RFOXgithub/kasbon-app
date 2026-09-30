"use client";

import { useState } from "react";

import { useDebts } from "@/hooks/debts/use-debts";
import type { Debt } from "@/types/debt";

import { DashboardHeader } from "./dashboard-header";
import { DashboardHero } from "./dashboard-hero";
import { DebtFormDialog } from "./debt-form-dialog";
import { EntriesSection } from "./entries-section";
import { SummarySection } from "./summary-section";

export function DashboardView() {
  const {
    debts, isLoading, loadError, actionError, pendingAction,
    retry, clearActionError, saveDebt, settleDebt, deleteDebt,
  } = useDebts();
  const [formOpen, setFormOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);

  function openForm(debt: Debt | null) {
    clearActionError();
    setEditingDebt(debt);
    setFormOpen(true);
  }

  function confirmDelete(debt: Debt) {
    if (window.confirm(`Hapus catatan ${debt.counterpart_name}? Tindakan ini tidak bisa dibatalkan.`)) {
      void deleteDebt(debt);
    }
  }

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
          actionError={actionError}
          pendingAction={pendingAction}
          onRetry={retry}
          onAdd={() => openForm(null)}
          onSettle={settleDebt}
          onEdit={openForm}
          onDelete={confirmDelete}
        />
      </div>
      {formOpen && (
        <DebtFormDialog
          key={editingDebt?.id ?? "new"}
          debt={editingDebt}
          requestError={actionError}
          onClose={() => setFormOpen(false)}
          onSave={saveDebt}
        />
      )}
    </main>
  );
}
