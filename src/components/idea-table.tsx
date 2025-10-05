import { BusinessIdea, primaryEntrepreneurIdeas } from "@/lib/sampleData";

interface IdeaTableProps {
  ideas?: BusinessIdea[];
}

export function IdeaTable({ ideas = primaryEntrepreneurIdeas }: IdeaTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-6 py-3">Idea</th>
            <th className="px-6 py-3">Sector</th>
            <th className="px-6 py-3">Stage</th>
            <th className="px-6 py-3">Target raise</th>
            <th className="px-6 py-3">Followers</th>
            <th className="px-6 py-3">Likes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
          {ideas.map((idea) => (
            <tr key={idea.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-900">{idea.title}</div>
                <div className="text-xs text-slate-500">{idea.location}</div>
              </td>
              <td className="px-6 py-4">{idea.sector}</td>
              <td className="px-6 py-4 capitalize">{idea.status}</td>
              <td className="px-6 py-4">{idea.targetRaise ?? "TBA"}</td>
              <td className="px-6 py-4">{idea.followers}</td>
              <td className="px-6 py-4">{idea.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
