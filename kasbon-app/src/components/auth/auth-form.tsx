"use client";

import { LoginView } from "./login-view";
import { SignupView } from "./signup-view";
import { useAuthForm, type AuthMode } from "./use-auth-form";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const form = useAuthForm(mode);
  return mode === "login" ? <LoginView {...form} /> : <SignupView {...form} />;
}
