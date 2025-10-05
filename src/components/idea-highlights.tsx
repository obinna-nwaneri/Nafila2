import Link from "next/link";
import { BusinessIdea, users } from "@/lib/sampleData";
import clsx from "clsx";

interface IdeaHighlightsProps {
  ideas: BusinessIdea[];
  variant?: "light" | "dark";
}

export function IdeaHighlights({ ideas, variant = "light" }: IdeaHighlightsProps) {
  return (
    <div className={clsx("space-y-4", variant === "dark" && "text-white")}> 
      {ideas.map((idea) => {
        const owner = users.find((user) => user.id === idea.ownerId);
        return (
          <article
            key={idea.id}
            className={clsx(
              "rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg",
              variant === "dark"
                ? "border-white/10 bg-white/5"
                : "border-slate-100 bg-slate-50/60"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-inherit">{idea.title}</h3>
                <p className={clsx("text-sm", variant === "dark" ? "text-white/70" : "text-slate-600")}>{idea.sector}</p>
              </div>
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                {idea.status.toUpperCase()}
              </span>
            </div>
            <p className={clsx("mt-4 text-sm", variant === "dark" ? "text-white/80" : "text-slate-600")}>{idea.problem}</p>
            <dl className={clsx("mt-4 grid gap-3 text-xs", variant === "dark" ? "text-white/60" : "text-slate-500")}>
              <div className="flex items-center justify-between">
                <dt>Owner</dt>
                <dd className="font-medium text-inherit">{owner?.name ?? "Unknown"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Location</dt>
                <dd className="font-medium text-inherit">{idea.location}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Target raise</dt>
                <dd className="font-medium text-inherit">{idea.targetRaise ?? "TBA"}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold">
              <span className="text-brand">{idea.followers} followers</span>
              <span>{idea.likes} likes</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              {idea.media?.pitchVideo && (
                <Link
                  href={idea.media.pitchVideo}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    variant === "dark"
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-white text-brand hover:bg-brand/10"
                  )}
                >
                  Watch pitch
                </Link>
              )}
              {idea.media?.instagram && (
                <Link
                  href={idea.media.instagram}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    variant === "dark"
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-white text-brand hover:bg-brand/10"
                  )}
                >
                  Instagram
                </Link>
              )}
              {idea.media?.youtube && (
                <Link
                  href={idea.media.youtube}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2",
                    variant === "dark"
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-white text-brand hover:bg-brand/10"
                  )}
                >
                  YouTube
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
