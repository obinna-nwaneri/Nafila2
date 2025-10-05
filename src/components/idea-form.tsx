"use client";

import { useState } from "react";
import { z } from "zod";

const ideaSchema = z.object({
  title: z.string().min(3),
  sector: z.string().min(2),
  problem: z.string().min(10),
  solution: z.string().min(10),
  marketOpportunity: z.string().min(10),
  businessModel: z.string().min(10),
  financialProjections: z.string().min(5),
  traction: z.string().min(5),
  location: z.string().min(2),
  pitchVideo: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  targetRaise: z.string().optional(),
  status: z.enum(["raising", "bootstrapped", "idea", "growing"])
});

export function IdeaForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setMessage(null);
    try {
      const raw = Object.fromEntries(formData.entries());
      const normalized = {
        title: String(raw.title ?? ""),
        sector: String(raw.sector ?? ""),
        problem: String(raw.problem ?? ""),
        solution: String(raw.solution ?? ""),
        marketOpportunity: String(raw.marketOpportunity ?? ""),
        businessModel: String(raw.businessModel ?? ""),
        financialProjections: String(raw.financialProjections ?? ""),
        traction: String(raw.traction ?? ""),
        location: String(raw.location ?? ""),
        pitchVideo: String(raw.pitchVideo ?? ""),
        instagram: String(raw.instagram ?? ""),
        youtube: String(raw.youtube ?? ""),
        targetRaise: raw.targetRaise ? String(raw.targetRaise) : undefined,
        status: (raw.status ?? "raising").toString() as "raising" | "bootstrapped" | "idea" | "growing"
      };
      ideaSchema.parse(normalized);
      setMessage("Idea saved locally. Connect to Neon server actions to persist your data.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0]?.message ?? "Please review your inputs");
      } else {
        setMessage("Unexpected error");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="title">
            Idea title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="EcoPack Africa"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="sector">
            Sector
          </label>
          <input
            id="sector"
            name="sector"
            type="text"
            placeholder="Circular Economy"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Lagos, Nigeria"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="targetRaise">
            Target raise
          </label>
          <input
            id="targetRaise"
            name="targetRaise"
            type="text"
            placeholder="$500k Seed"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldArea id="problem" label="Problem statement" placeholder="Describe the pain point you're solving" />
        <FieldArea id="solution" label="Solution" placeholder="Describe your product or service" />
        <FieldArea id="marketOpportunity" label="Market opportunity" placeholder="Size and growth of your market" />
        <FieldArea id="businessModel" label="Business / revenue model" placeholder="How do you make money?" />
        <FieldArea id="financialProjections" label="Financial projections" placeholder="Forecast revenues, costs, runway" />
        <FieldArea id="traction" label="Traction / validation" placeholder="Pilots, customers, partnerships" />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="pitchVideo">
            Pitch video link
          </label>
          <input
            id="pitchVideo"
            name="pitchVideo"
            type="url"
            placeholder="https://youtu.be/..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="instagram">
            Instagram
          </label>
          <input
            id="instagram"
            name="instagram"
            type="url"
            placeholder="https://instagram.com/..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="youtube">
            YouTube
          </label>
          <input
            id="youtube"
            name="youtube"
            type="url"
            placeholder="https://youtube.com/..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          defaultValue="raising"
        >
          <option value="raising">Currently raising</option>
          <option value="growing">Scaling</option>
          <option value="bootstrapped">Bootstrapped</option>
          <option value="idea">Idea stage</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Saving..." : "Save idea"}
      </button>

      {message && <p className="text-center text-sm text-brand-dark">{message}</p>}
    </form>
  );
}

interface FieldAreaProps {
  id: string;
  label: string;
  placeholder: string;
}

function FieldArea({ id, label, placeholder }: FieldAreaProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
      />
    </div>
  );
}
