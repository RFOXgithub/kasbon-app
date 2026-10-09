"use client";

import { useState } from "react";

import { useDebts } from "@/hooks/debts/use-debts";
import type { Debt } from "@/types/debt";

import { DashboardHeader } from "./dashboard-header";
import { DashboardHero } from "./dashboard-hero";
import { DebtFormDialog } from "./debt-form-dialog";
import { DeleteDebtDialog } from "./delete-debt-dialog";
import { EntriesSection } from "./entries-section";
import { SummarySection } from "./summary-section";

export function DashboardView() {
  const {
    debts, isLoading, loadError, actionError, pendingAction,
    retry, clearActionError, saveDebt, settleDebt, deleteDebt,
  } = useDebts();
  const [formOpen, setFormOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [deletingDebt, setDeletingDebt] = useState<Debt | null>(null);

  function openForm(debt: Debt | null) {
    clearActionError();
    setEditingDebt(debt);
    setFormOpen(true);
  }

  function confirmDelete(debt: Debt) {
    clearActionError();
    setDeletingDebt(debt);
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
          customerNames={[...new Set(debts.map((item) => item.counterpart_name.trim()).filter(Boolean))]}
          requestError={actionError}
          onClose={() => setFormOpen(false)}
          onSave={saveDebt}
        />
      )}
      {deletingDebt && (
        <DeleteDebtDialog
          debt={deletingDebt}
          requestError={actionError}
          onClose={() => setDeletingDebt(null)}
          onDelete={deleteDebt}
        />
      )}
    </main>
  );
}
