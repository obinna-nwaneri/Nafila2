import Link from "next/link";
import { MessageCircle, Sparkles, Users } from "lucide-react";

const FEED = [
  {
    id: "post-1",
    author: "Zainab Bello",
    role: "Entrepreneur",
    message: "We just closed 120 new merchants with 98% retention! Looking for logistics partners in Accra.",
    likes: 42,
    comments: 9,
    timestamp: "2h ago"
  },
  {
    id: "post-2",
    author: "Aurora Capital",
    role: "Investor",
    message: "Exploring consumer fintech opportunities in East Africa. DM portfolios with strong collections infrastructure.",
    likes: 31,
    comments: 6,
    timestamp: "6h ago"
  }
];

export default function CommunityPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-white">Community feed</h1>
        <p className="text-sm text-slate-400">
          Stay connected with founders, investors, and operators across the Nafila Shop ecosystem.
        </p>
        <div className="flex gap-3">
          <Link href="/register" className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white">
            Join the conversation
          </Link>
          <Link href="/trust-center" className="rounded-md border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-200">
            View trust center
          </Link>
        </div>
      </header>
      <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {FEED.map((post) => (
            <article key={post.id} className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{post.author}</p>
                  <p className="text-xs text-slate-400">{post.role}</p>
                </div>
                <span className="text-xs text-slate-500">{post.timestamp}</span>
              </div>
              <p className="text-sm text-slate-300">{post.message}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> {post.comments}
                </span>
              </div>
            </article>
          ))}
        </div>
        <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <Users className="h-4 w-4 text-primary-300" /> Trending topics
          </h2>
          <ul className="space-y-3 text-xs text-slate-400">
            <li>#socialcommerce</li>
            <li>#supplychain</li>
            <li>#retailtech</li>
            <li>#dealroom</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
