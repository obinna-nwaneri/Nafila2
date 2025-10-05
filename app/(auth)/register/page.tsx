import { registerUser } from "@/app/actions";
import { RoleSelect } from "@/components/role-select";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-white">Create your Nafila account</h1>
        <p className="text-sm text-slate-400">
          Choose the role that best describes you to unlock tailored dashboards and insights.
        </p>
      </div>
      <form action={registerUser} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="name">
              Full name
            </label>
            <input id="name" name="name" placeholder="Jane Doe" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="email">
              Email address
            </label>
            <input id="email" name="email" type="email" placeholder="you@company.com" required />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="password">
            Password
          </label>
          <input id="password" name="password" type="password" minLength={8} placeholder="********" required />
        </div>
        <RoleSelect />
        <button type="submit" className="w-full">Register</button>
        <div className="text-center text-sm text-slate-400">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </form>
    </div>
  );
}
