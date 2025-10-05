"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import { AtSign, Lock, Phone } from "lucide-react";

const registrationSchema = z.object({
  name: z.string().min(3, "Full name is required"),
  email: z.string().email("A valid email is required"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["entrepreneur", "investor", "general"]),
  phone: z.string().min(6, "Enter a phone number"),
  agree: z.boolean().refine((value) => value, "Please accept the terms")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
});

const loginSchema = z.object({
  email: z.string().email("A valid email is required"),
  password: z.string().min(6, "Password is required")
});

interface AuthCardProps {
  type: "register" | "login";
}

export function AuthCard({ type }: AuthCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setMessage(null);
    try {
      if (type === "register") {
        const payload = {
          name: formData.get("name")?.toString() ?? "",
          email: formData.get("email")?.toString() ?? "",
          password: formData.get("password")?.toString() ?? "",
          confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
          role: (formData.get("role")?.toString() ?? "entrepreneur") as "entrepreneur" | "investor" | "general",
          phone: formData.get("phone")?.toString() ?? "",
          agree: formData.get("agree") === "on"
        };
        registrationSchema.parse(payload);
        setMessage("Registration submitted! Integrate with Neon + NextAuth for persistence.");
      } else {
        const payload = {
          email: formData.get("email")?.toString() ?? "",
          password: formData.get("password")?.toString() ?? ""
        };
        loginSchema.parse(payload);
        setMessage("Login successful! Replace with NextAuth credential provider.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0]?.message ?? "Something went wrong");
      } else {
        setMessage("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          {type === "register" ? "Create your Nafila Shop account" : "Welcome back"}
        </h1>
        <p className="text-sm text-slate-500">
          {type === "register"
            ? "Register as an entrepreneur, investor, or community member to start collaborating."
            : "Access your personalised deal-flow workspace."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {type === "register" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Amina Yusuf"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="phone">
                Phone number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm text-slate-700 focus:border-brand"
                />
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
                defaultValue="entrepreneur"
              >
                <option value="entrepreneur">Entrepreneur</option>
                <option value="investor">Investor</option>
                <option value="general">Community member</option>
              </select>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="email">
            Email address
          </label>
          <div className="relative">
            <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@nafila.africa"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm text-slate-700 focus:border-brand"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm text-slate-700 focus:border-brand"
            />
          </div>
        </div>

        {type === "register" && (
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
            />
          </div>
        )}

        {type === "register" && (
          <label className="flex items-center gap-2 text-xs text-slate-500">
            <input type="checkbox" name="agree" className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
            I agree to the Terms of Service and Privacy Policy.
          </label>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Processing..." : type === "register" ? "Create account" : "Log in"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-brand-dark">{message}</p>
      )}

      {type === "login" && (
        <div className="mt-6 space-y-3">
          <button className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand/60">
            Continue with Google
          </button>
          <p className="text-center text-xs text-slate-500">
            Social login hooks into NextAuth Google provider. Configure OAuth credentials to enable.
          </p>
        </div>
      )}
    </div>
  );
}
