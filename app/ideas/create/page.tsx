import { submitIdea } from "@/app/actions";
import { Suspense } from "react";
import { IdeaForm } from "@/components/idea-form";

export default function IdeaCreatePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Submit a new venture</h1>
        <p className="text-sm text-slate-400">
          Provide comprehensive details to attract investors. Verified entrepreneurs receive priority placement in the deal
          feed.
        </p>
      </div>
      <Suspense fallback={<div className="text-slate-400">Loading form...</div>}>
        <IdeaForm action={submitIdea} />
      </Suspense>
    </div>
  );
}
