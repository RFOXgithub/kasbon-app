"use client";

import { useFormStatus } from "react-dom";

import { logout } from "@/lib/auth/actions";

function LogoutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-busy={pending}
      className="min-h-11 cursor-pointer rounded-full bg-tint px-5 py-2 text-sm font-medium text-action transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-tint-strong active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
      disabled={pending}
      type="submit"
    >
      {pending && <span className="loading-dot mr-2" aria-hidden="true" />}
      {pending ? "Keluar..." : "Keluar"}
    </button>
  );
}

export function LogoutButton() {
  return (
    <form action={logout}>
      <LogoutSubmitButton />
    </form>
  );
}
