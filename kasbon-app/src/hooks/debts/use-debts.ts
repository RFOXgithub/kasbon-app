"use client";

import { useCallback, useEffect, useState } from "react";

import type { Debt, DebtListResponse, DebtMutationResponse } from "@/types/debt";

async function readError(response: Response, fallback: string): Promise<string> {
  const body: unknown = await response.json().catch(() => null);

  if (body && typeof body === "object" && "error" in body) {
    const message = body.error;
    if (typeof message === "string") return message;
  }

  return fallback;
}

export function useDebts() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [settleError, setSettleError] = useState<string | null>(null);
  const [settlingId, setSettlingId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDebts() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/debts", {
          credentials: "same-origin",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(await readError(response, "Catatan gagal dimuat."));
        }

        const result: DebtListResponse = await response.json();
        if (!Array.isArray(result.data)) {
          throw new Error("Data catatan tidak valid.");
        }

        if (!controller.signal.aborted) setDebts(result.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(error instanceof Error ? error.message : "Catatan gagal dimuat.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadDebts();
    return () => controller.abort();
  }, [reloadKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  async function settleDebt(debt: Debt) {
    if (debt.settled_at !== null || settlingId !== null) return;

    setSettlingId(debt.id);
    setSettleError(null);

    try {
      const response = await fetch(`/api/debts/${encodeURIComponent(debt.id)}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settled: true }),
      });

      if (!response.ok) {
        throw new Error(await readError(response, "Catatan gagal ditandai lunas."));
      }

      const result: DebtMutationResponse = await response.json();
      if (result.data?.id !== debt.id || result.data.settled_at === null) {
        throw new Error("Respons pelunasan tidak valid. Muat ulang catatan.");
      }

      setDebts((current) =>
        current.map((item) => (item.id === debt.id ? result.data : item)),
      );
    } catch (error) {
      setSettleError(
        error instanceof Error ? error.message : "Catatan gagal ditandai lunas.",
      );
    } finally {
      setSettlingId(null);
    }
  }

  return { debts, isLoading, loadError, settleError, settlingId, retry, settleDebt };
}
