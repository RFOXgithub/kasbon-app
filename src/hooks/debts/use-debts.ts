"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Debt, DebtInput, DebtListResponse, DebtMutationResponse } from "@/types/debt";

async function responseError(response: Response, fallback: string): Promise<Error> {
  const body: unknown = await response.json().catch(() => null);
  if (body && typeof body === "object" && "error" in body && typeof body.error === "string") {
    return new Error(body.error);
  }
  return new Error(fallback);
}

async function readDebt(response: Response, expectedId?: string): Promise<Debt> {
  if (!response.ok) throw await responseError(response, "Catatan gagal disimpan.");
  const body: DebtMutationResponse = await response.json();
  if (!body.data?.id || (expectedId && body.data.id !== expectedId)) {
    throw new Error("Respons catatan tidak valid. Muat ulang halaman.");
  }
  return body.data;
}

export function useDebts() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const mutationInFlight = useRef(false);

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
        if (!response.ok) throw await responseError(response, "Catatan gagal dimuat.");
        const result: DebtListResponse = await response.json();
        if (!Array.isArray(result.data)) throw new Error("Data catatan tidak valid.");
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
  const clearActionError = useCallback(() => setActionError(null), []);

  function beginMutation(action: string) {
    if (mutationInFlight.current) return false;
    mutationInFlight.current = true;
    setPendingAction(action);
    setActionError(null);
    return true;
  }

  function endMutation() {
    mutationInFlight.current = false;
    setPendingAction(null);
  }

  async function saveDebt(input: DebtInput, existing?: Debt): Promise<boolean> {
    if (!beginMutation(existing ? `edit:${existing.id}` : "create")) return false;
    try {
      const response = await fetch(existing ? `/api/debts/${encodeURIComponent(existing.id)}` : "/api/debts", {
        method: existing ? "PATCH" : "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const saved = await readDebt(response, existing?.id);
      setDebts((current) => existing
        ? current.map((debt) => debt.id === saved.id ? saved : debt)
        : [saved, ...current]);
      return true;
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Catatan gagal disimpan.");
      return false;
    } finally {
      endMutation();
    }
  }

  async function settleDebt(debt: Debt): Promise<void> {
    if (debt.settled_at !== null || !beginMutation(`settle:${debt.id}`)) return;
    try {
      const response = await fetch(`/api/debts/${encodeURIComponent(debt.id)}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settled: true }),
      });
      const saved = await readDebt(response, debt.id);
      if (typeof saved.settled_at !== "string") {
        throw new Error("Respons pelunasan tidak valid. Muat ulang halaman.");
      }
      setDebts((current) => current.map((item) => item.id === saved.id ? saved : item));
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Catatan gagal ditandai lunas.");
    } finally {
      endMutation();
    }
  }

  async function deleteDebt(debt: Debt): Promise<boolean> {
    if (!beginMutation(`delete:${debt.id}`)) return false;
    try {
      const response = await fetch(`/api/debts/${encodeURIComponent(debt.id)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!response.ok) throw await responseError(response, "Catatan gagal dihapus.");
      setDebts((current) => current.filter((item) => item.id !== debt.id));
      return true;
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Catatan gagal dihapus.");
      return false;
    } finally {
      endMutation();
    }
  }

  return {
    debts, isLoading, loadError, actionError, pendingAction,
    retry, clearActionError, saveDebt, settleDebt, deleteDebt,
  };
}
