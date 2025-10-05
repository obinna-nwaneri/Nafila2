import { users } from "@/lib/sampleData";

export function VerificationBadges() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <h2 className="text-lg font-semibold text-slate-900">Verification centre</h2>
      <p className="mt-2 text-sm text-slate-500">
        Upload compliance documents and monitor KYC progress across stakeholders.
      </p>
      <div className="mt-6 grid gap-4">
        {users.map((user) => {
          const avatar = user.avatarUrl ?? `https://avatar.vercel.sh/${encodeURIComponent(user.name ?? "user")}`;
          return (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
            >
              <div className="flex items-center gap-3">
                <img src={avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              <div className="text-right text-xs">
                <p className="font-semibold text-brand">{user.verification?.kycStatus ?? "pending"}</p>
                {user.verification?.businessDocs && (
                  <p className="text-slate-500">{user.verification.businessDocs.length} documents uploaded</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
