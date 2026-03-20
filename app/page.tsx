"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import LeadList from "@/components/LeadList";

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
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
