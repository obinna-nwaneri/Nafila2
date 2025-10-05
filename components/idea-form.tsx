"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";

const fields = [
  { id: "problem", label: "Problem Statement", placeholder: "What pain point are you solving?" },
  { id: "solution", label: "Solution", placeholder: "Describe your product or service." },
  { id: "market", label: "Market Opportunity", placeholder: "How big is the addressable market?" },
  { id: "businessModel", label: "Business / Revenue Model", placeholder: "How do you make money?" },
  { id: "financials", label: "Financial Projections", placeholder: "Share projections, runway, or break-even." },
  { id: "traction", label: "Traction / Validation", placeholder: "Highlight customers, pilots, or metrics." }
];

export function IdeaForm() {
  const { data: session } = useSession();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const ownerId = session?.user?.id ?? "00000000-0000-0000-0000-000000000000";

  const handleSubmit = async (formData: FormData) => {
    setPending(true);
    setMessage(null);
    try {
      const payload = {
        ownerId,
        title: String(formData.get("title") ?? ""),
        problem: String(formData.get("problem") ?? ""),
        solution: String(formData.get("solution") ?? ""),
        market: String(formData.get("market") ?? ""),
        businessModel: String(formData.get("businessModel") ?? ""),
        financials: String(formData.get("financials") ?? ""),
        traction: String(formData.get("traction") ?? ""),
        sector: String(formData.get("sector") ?? ""),
        location: String(formData.get("location") ?? ""),
        pitchUrl: formData.get("pitchUrl") ? String(formData.get("pitchUrl")) : null,
        instagram: formData.get("instagram") ? String(formData.get("instagram")) : null,
        otherLinks: formData.get("otherLinks") ? String(formData.get("otherLinks")) : null
      };

      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setMessage("Idea submitted successfully. Moderators will review shortly.");
      formRef.current?.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Unable to submit idea. Please try again later.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await handleSubmit(formData);
      }}
      className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
    >
      <input type="hidden" name="ownerId" value={ownerId} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="title">
            Venture title
          </label>
          <input id="title" name="title" placeholder="Nafila Logistics Mesh" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="sector">
            Sector
          </label>
          <input id="sector" name="sector" placeholder="Retail Infrastructure" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="location">
            Headquarters / Location
          </label>
          <input id="location" name="location" placeholder="Lagos, Nigeria" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="pitchUrl">
            Pitch video URL
          </label>
          <input id="pitchUrl" name="pitchUrl" placeholder="https://youtu.be/..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="instagram">
            Instagram handle URL
          </label>
          <input id="instagram" name="instagram" placeholder="https://instagram.com/nafila" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="otherLinks">
            Additional links
          </label>
          <input id="otherLinks" name="otherLinks" placeholder="https://nafila.shop" />
        </div>
      </div>
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor={field.id}>
            {field.label}
          </label>
          <textarea id={field.id} name={field.id} rows={4} placeholder={field.placeholder} required />
        </div>
      ))}
      <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400">
        <p className="font-semibold text-slate-200">Upload supporting documents</p>
        <p>Attach CAC certificates, tax IDs, pitch decks, or market research files.</p>
        <button type="button" className="mt-3 inline-flex items-center gap-2 border border-slate-700 bg-transparent px-4">
          <Upload className="h-4 w-4" /> Upload files (coming soon)
        </button>
      </div>
      {message && <p className="text-sm text-emerald-400">{message}</p>}
      <button type="submit" className="flex w-full items-center justify-center gap-2" disabled={pending}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Submitting..." : "Submit idea"}
      </button>
    </form>
  );
}
