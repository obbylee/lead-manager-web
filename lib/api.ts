const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLeads() {
  const res = await fetch(`${API_URL}/leads`);
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

export async function createLead(data: {
  name: string;
  email: string;
  status: string;
}) {
  const res = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create lead");
  }

  return res.json();
}
