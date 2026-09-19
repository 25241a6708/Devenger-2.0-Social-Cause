import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarClock, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMatchEngine } from "@/components/MatchEngine";
import { missions } from "@/lib/impact-data";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "Community Missions — Volunteer & Donate Nearby" },
      { name: "description", content: "Browse live community missions for food, orphanages, cleanup drives and blood donation." },
      { property: "og:title", content: "Community Missions — Volunteer & Donate Nearby" },
      { property: "og:description", content: "Browse live community missions for food, orphanages, cleanup drives and blood donation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionsPage,
});

const categories = ["All", "Food", "Orphanages", "Cleaning", "Blood Donation"] as const;

const urgencyStyle: Record<string, string> = {
  Urgent: "bg-urgent text-urgent-foreground",
  "High Priority": "bg-amber text-background",
  "This Saturday": "bg-amber text-background",
  Ongoing: "bg-muted text-muted-foreground",
};

function MissionsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const { open } = useMatchEngine();

  const filtered = useMemo(
    () =>
      missions.filter(
        (m) =>
          (category === "All" || m.category === category) &&
          (m.title + m.org).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );

  return (
    <main className="grid-surface px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="text-3xl font-extrabold md:text-4xl">Community Missions</h1>
        <p className="mt-2 text-sm text-muted-foreground">Actionable service requests from verified organisations near you.</p>

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-sm md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search missions or organisations" className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-md px-3 py-2 text-xs font-bold transition-colors ${
                  category === c ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {filtered.map((m) => (
            <article key={m.id} className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex rounded-sm px-2 py-1 text-[10px] font-extrabold uppercase ${urgencyStyle[m.urgency]}`}>{m.urgency}</span>
                  <h2 className="mt-3 text-xl font-extrabold leading-snug">{m.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-map">{m.org}</p>
                </div>
                <span className="rounded-sm bg-muted px-2 py-1 text-[10px] font-bold uppercase text-muted-foreground">{m.category}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Users className="size-4" />{m.need}</span>
                <span className="inline-flex items-center gap-1.5"><CalendarClock className="size-4" />{m.deadline}</span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-bold">
                  <span>{m.progressLabel}</span>
                  <span className="text-positive">{m.progress}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-positive" style={{ width: `${m.progress}%` }} />
                </div>
              </div>

              <Button
                variant={m.urgency === "Urgent" ? "destructive" : "impact"}
                size="lg"
                className="mt-6 w-full"
                onClick={() => open({ title: m.title, org: m.org, need: m.need, urgent: m.urgency === "Urgent" })}
              >
                {m.urgency === "Urgent" ? "FIND HOW I CAN HELP" : "JOIN MISSION"} <ArrowRight />
              </Button>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No missions match your search.</p>
          )}
        </div>
      </div>
    </main>
  );
}
