export async function generateMarketingPlan(businessIdea) {
  const res = await fetch("/api/marketing-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ businessIdea }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || "Failed to generate marketing plan");
  }

  return res.json();
}
