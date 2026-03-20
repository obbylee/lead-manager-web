"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type LeadStatus =
  | "New"
  | "Engaged"
  | "Proposal Sent"
  | "Closed-Won"
  | "Closed-Lost";

interface Lead {
  id: number;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    status: "New",
    createdAt: "2025-03-01",
  },
  {
    id: 2,
    name: "Marcus Webb",
    email: "m.webb@globaltech.io",
    status: "Engaged",
    createdAt: "2025-03-04",
  },
  {
    id: 3,
    name: "Priya Nair",
    email: "priya.nair@venture.co",
    status: "Proposal Sent",
    createdAt: "2025-03-08",
  },
  {
    id: 4,
    name: "Daniel Torres",
    email: "dtorres@brightwave.com",
    status: "Closed-Won",
    createdAt: "2025-03-12",
  },
  {
    id: 5,
    name: "Emily Chen",
    email: "emily.chen@nextstep.io",
    status: "Closed-Lost",
    createdAt: "2025-03-15",
  },
  {
    id: 6,
    name: "Omar Khalid",
    email: "omar.k@fusionlabs.net",
    status: "Engaged",
    createdAt: "2025-03-17",
  },
  {
    id: 7,
    name: "Lisa Park",
    email: "lpark@claritysys.com",
    status: "New",
    createdAt: "2025-03-19",
  },
];

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  Engaged: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "Proposal Sent": "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "Closed-Won": "bg-green-100 text-green-700 hover:bg-green-100",
  "Closed-Lost": "bg-red-100 text-red-700 hover:bg-red-100",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const Page = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");

  const handleAddLead = () => {
    if (!name.trim() || !email.trim() || !status) return;
    const newLead: Lead = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      status: status as LeadStatus,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setLeads((prev) => [newLead, ...prev]);
    setName("");
    setEmail("");
    setStatus("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Lead Manager
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage and track your sales leads
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">
              {leads.length} leads total
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Add Lead Form */}
          <div className="w-full lg:w-80 lg:shrink-0 lg:sticky lg:top-8">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Add New Lead
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Fill in the details below to add a new lead.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">
                    Full Name
                  </Label>
                  <Input
                    placeholder="e.g. Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="e.g. jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">
                    Status
                  </Label>
                  <Select
                    value={status}
                    onValueChange={(val) => setStatus(val as LeadStatus)}
                  >
                    <SelectTrigger className="border-slate-200 text-slate-900 focus:ring-slate-400">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Engaged">Engaged</SelectItem>
                      <SelectItem value="Proposal Sent">
                        Proposal Sent
                      </SelectItem>
                      <SelectItem value="Closed-Won">Closed-Won</SelectItem>
                      <SelectItem value="Closed-Lost">Closed-Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAddLead}
                  disabled={!name.trim() || !email.trim() || !status}
                  className="w-full bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-40"
                >
                  Add Lead
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right: Leads Table */}
          <div className="flex-1 min-w-0">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-slate-900">
                    All Leads
                  </CardTitle>
                  <span className="text-sm text-slate-400 font-normal">
                    {leads.length} records
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {leads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a4 4 0 00-5.197-3.775M9 20H4v-2a4 4 0 015.197-3.775M15 11a4 4 0 11-8 0 4 4 0 018 0zm6 2a3 3 0 11-6 0 3 3 0 016 0zM3 13a3 3 0 116 0"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      No leads yet
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      Add your first lead using the form on the left.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Name
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Email
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Status
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {leads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <span className="font-medium text-slate-900">
                                {lead.name}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-slate-500">
                                {lead.email}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <Badge
                                className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 ${statusStyles[lead.status]}`}
                              >
                                {lead.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-slate-400 text-xs">
                                {formatDate(lead.createdAt)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
