"use client";

import { useMemo, useState } from "react";
import { primaryEntrepreneurIdeas } from "@/lib/sampleData";

interface FilterOption {
  label: string;
  value: string;
}

interface InvestorFiltersProps {
  onFilterChange?: (filters: Record<string, string | string[]>) => void;
}

export function InvestorFilters({ onFilterChange }: InvestorFiltersProps) {
  const sectors = useMemo<FilterOption[]>(() => {
    const unique = new Set(primaryEntrepreneurIdeas.map((idea) => idea.sector));
    return Array.from(unique).map((sector) => ({ label: sector, value: sector }));
  }, []);

  const locations = useMemo<FilterOption[]>(() => {
    const unique = new Set(primaryEntrepreneurIdeas.map((idea) => idea.location));
    return Array.from(unique).map((location) => ({ label: location, value: location }));
  }, []);

  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [riskProfile, setRiskProfile] = useState<string>("medium");

  function broadcast(filters: Record<string, string | string[]>) {
    onFilterChange?.(filters);
  }

  function handleSectorChange(value: string) {
    setSelectedSector(value);
    broadcast({ sector: value, location: selectedLocation, risk: riskProfile });
  }

  function handleLocationChange(value: string) {
    setSelectedLocation(value);
    broadcast({ sector: selectedSector, location: value, risk: riskProfile });
  }

  function handleRiskChange(value: string) {
    setRiskProfile(value);
    broadcast({ sector: selectedSector, location: selectedLocation, risk: value });
  }

  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:grid-cols-3">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="sector">
          Sector
        </label>
        <select
          id="sector"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          value={selectedSector}
          onChange={(event) => handleSectorChange(event.target.value)}
        >
          <option value="all">All sectors</option>
          {sectors.map((sector) => (
            <option key={sector.value} value={sector.value}>
              {sector.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="location">
          Location
        </label>
        <select
          id="location"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          value={selectedLocation}
          onChange={(event) => handleLocationChange(event.target.value)}
        >
          <option value="all">All locations</option>
          {locations.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="risk">
          Risk appetite
        </label>
        <select
          id="risk"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-brand"
          value={riskProfile}
          onChange={(event) => handleRiskChange(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}
