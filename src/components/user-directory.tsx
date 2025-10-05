import { users } from "@/lib/sampleData";

export function UserDirectory() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Community directory</h2>
          <p className="text-sm text-slate-500">Search, follow, and connect with founders and investors.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const avatar = user.avatarUrl ?? `https://avatar.vercel.sh/${encodeURIComponent(user.name ?? "user")}`;
          return (
          <div key={user.id} className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center gap-3">
              <img src={avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600">{user.bio}</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{user.metrics?.followers ?? 0} followers</span>
              <span>{user.metrics?.likes ?? 0} likes</span>
            </div>
            <button className="w-full rounded-full border border-brand/40 bg-white px-4 py-2 text-xs font-semibold text-brand transition hover:border-brand hover:bg-brand/10">
              Follow
            </button>
          </div>
        );
        })}
      </div>
    </div>
  );
}
