"use client";

import { useState } from "react";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginValues = z.infer<typeof loginSchema>;

export function AuthForm({ onSubmit }: { onSubmit?: (values: LoginValues) => Promise<void> | void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const values = loginSchema.parse({
        email: formData.get("email"),
        password: formData.get("password")
      });

      if (onSubmit) {
        await onSubmit(values);
      } else {
        await signIn("credentials", { email: values.email, password: values.password, redirect: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await handleSubmit(formData);
      }}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-300">
          Email address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input id="email" name="email" type="email" placeholder="you@nafila.shop" className="pl-9" required />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-300">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input id="password" name="password" type="password" placeholder="********" className="pl-9" required />
        </div>
      </div>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button type="submit" className="flex w-full items-center justify-center gap-2" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <div className="text-center text-sm text-slate-400">
        Or continue with
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-3 w-full rounded-md border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 hover:border-primary-500"
        >
          Google
        </button>
      </div>
    </form>
  );
}
