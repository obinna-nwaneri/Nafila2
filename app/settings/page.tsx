export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Account settings</h1>
        <p className="text-sm text-slate-400">
          Manage notification preferences, connected accounts, and security for your Nafila profile.
        </p>
      </div>
      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">Profile visibility</h2>
        <p className="text-sm text-slate-300">
          Customize who can view your startup deck, financial data, and investor updates.
        </p>
        <div className="space-y-2 text-sm text-slate-400">
          <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3">
            <span>Show profile in public directory</span>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3">
            <span>Allow investors to request deck</span>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
        </div>
      </section>
    </div>
  );
}
