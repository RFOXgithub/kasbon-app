import type { Debt } from "@/types/debt";

export type DebtSummary = {
  owedToMe: number;
  iOwe: number;
  net: number;
  unsettledCount: number;
};

export function calculateDebtSummary(debts: Debt[]): DebtSummary {
  return debts.reduce<DebtSummary>(
    (summary, debt) => {
      // Transaksi yang sudah lunas tidak masuk ringkasan.
      if (debt.settled_at !== null) {
        return summary;
      }

      if (debt.type === "owed_to_me") {
        summary.owedToMe += debt.amount;
      }

      if (debt.type === "i_owe") {
        summary.iOwe += debt.amount;
      }

      summary.unsettledCount += 1;
      summary.net = summary.iOwe - summary.owedToMe;

      return summary;
    },
    {
      owedToMe: 0,
      iOwe: 0,
      net: 0,
      unsettledCount: 0,
    },
  );
}
