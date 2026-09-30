import { logout } from "@/lib/auth/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        className="min-h-11 cursor-pointer rounded-full bg-tint px-5 py-2 text-sm font-medium text-action transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-tint-strong active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action motion-reduce:transition-none"
        type="submit"
      >
        Keluar
      </button>
    </form>
  );
}
