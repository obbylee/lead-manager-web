"use client";

import { useEffect, useState } from "react";
import LeadForm from "@/components/LeadForm";
import LeadList from "@/components/LeadList";
import { getLeads } from "@/lib/api";

type LeadStatus =
  | "New"
  | "Engaged"
  | "Proposal Sent"
  | "Closed-Won"
  | "Closed-Lost";

interface Lead {
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
}

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0);

  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    getLeads().then(setLeads).catch(console.error);
  }, [refreshKey]);

  const counts = {
    total: leads.length,
    won: leads.filter((l) => l.status === "Closed-Won").length,
    active: leads.filter(
      (l) => l.status === "Engaged" || l.status === "Proposal Sent",
    ).length,
    new: leads.filter((l) => l.status === "New").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a4 4 0 00-5.197-3.775M9 20H4v-2a4 4 0 015.197-3.775M15 11a4 4 0 11-8 0 4 4 0 018 0zm6 2a3 3 0 11-6 0 3 3 0 016 0zM3 13a3 3 0 116 0"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900 tracking-tight">
              LeadManager
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300 text-xs">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-slate-500 font-medium">Leads</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
            Leads
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Track and manage your sales pipeline.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Total Leads",
              value: counts.total,
              color: "text-slate-900",
            },
            { label: "New", value: counts.new, color: "text-slate-700" },
            { label: "Active", value: counts.active, color: "text-blue-700" },
            {
              label: "Closed-Won",
              value: counts.won,
              color: "text-emerald-700",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]"
            >
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                {s.label}
              </p>
              <p className={`text-2xl font-bold mt-0.5 ${s.color}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main two column */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-80 lg:sticky lg:top-8">
            <LeadForm onSuccess={() => setRefreshKey((prev) => prev + 1)} />
          </div>

          <div className="flex-1 min-w-0">
            <LeadList refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
