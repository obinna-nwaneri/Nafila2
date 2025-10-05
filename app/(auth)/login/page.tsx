import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
        <p className="text-sm text-slate-400">Sign in to manage your deals and community activity.</p>
      </div>
      <AuthForm
        onSubmit={async (values) => {
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: "/dashboard"
          });
        }}
      />
      <div className="text-center text-sm text-slate-400">
        Need an account? <Link href="/register">Register</Link>
      </div>
    </div>
  );
}
