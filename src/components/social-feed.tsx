import { FeedEntry, users } from "@/lib/sampleData";
import { formatDistanceToNow } from "date-fns";

interface SocialFeedProps {
  entries: FeedEntry[];
}

export function SocialFeed({ entries }: SocialFeedProps) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => {
        const user = users.find((candidate) => candidate.id === entry.userId);
        const avatar = user?.avatarUrl ?? `https://avatar.vercel.sh/${encodeURIComponent(user?.name ?? "user")}`;
        return (
          <article key={entry.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-start gap-3">
              <img
                src={avatar}
                alt={user?.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">{user?.name ?? "Community member"}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}</span>
                </div>
                <p className="text-sm text-slate-700">{entry.message}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{entry.likes} likes</span>
                  <span>{entry.comments} comments</span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
