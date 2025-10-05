import { SocialFeed } from "@/components/social-feed";
import { socialFeed } from "@/lib/sampleData";

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold text-slate-900">Community feed</h1>
        <p className="mt-2 text-sm text-slate-500">
          Stay up to date with new pitches, investor updates, and platform announcements.
        </p>
      </div>
      <SocialFeed entries={socialFeed} />
    </div>
  );
}
