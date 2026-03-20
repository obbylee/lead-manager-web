"use client";

import { useState } from "react";
import { createLead } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export default function LeadForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [loading, setLoading] = useState(false);

  const handleAddLead = async () => {
    if (!name.trim() || !email.trim() || !status) return;

    setLoading(true);

    try {
      await createLead({ name, email, status });
      setName("");
      setEmail("");
      setStatus("");
      onSuccess();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-slate-200 text-slate-900"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">
            Email Address
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-slate-200 text-slate-900"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">Status</Label>
          <Select
            value={status}
            onValueChange={(val) => setStatus(val as LeadStatus)}
          >
            <SelectTrigger className="border-slate-200 text-slate-900">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Engaged">Engaged</SelectItem>
              <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
              <SelectItem value="Closed-Won">Closed-Won</SelectItem>
              <SelectItem value="Closed-Lost">Closed-Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleAddLead}
          disabled={!name.trim() || !email.trim() || !status || loading}
          className="w-full bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Lead"}
        </Button>
      </CardContent>
    </Card>
  );
}
