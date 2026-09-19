import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock3, MapPin, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatchEngine } from "@/components/MatchEngine";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "SOS Emergency — Priority Response Desk" },
      { name: "description", content: "Critical emergency requests needing immediate dispatch across the city." },
      { property: "og:title", content: "SOS Emergency — Priority Response Desk" },
      { property: "og:description", content: "Critical emergency requests needing immediate dispatch across the city." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SosPage,
});

const emergencies = [
  {
    title: "Urgent Medical Assistance & Blood Required",
    location: "Grace Hospital Area",
    time: "2 Hours Remaining",
    need: "10 units O+ blood, 2 ambulances on standby",
    severity: "Critical",
  },
  {
    title: "Emergency Flood Relief Pack Distributions",
    location: "Low-Lying Community Shelter",
    time: "Active now",
    need: "180 relief packs, dry rations and blankets",
    severity: "High",
  },
];

function SosPage() {
  const { open } = useMatchEngine();

  return (
    <main className="px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-lg border-2 border-urgent bg-urgent p-6 text-urgent-foreground shadow-lg">
          <span className="absolute inset-0 animate-pulse bg-urgent/60" />
          <div className="relative flex flex-wrap items-center gap-4">
            <Siren className="size-8" />
            <h1 className="text-xl font-extrabold uppercase tracking-tight md:text-2xl">
              🔴 Critical SOS Emergency Requests — Immediate Dispatch
            </h1>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {emergencies.map((e) => (
            <article key={e.title} className="rounded-lg border border-urgent/40 bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-urgent px-2.5 py-1 text-[10px] font-extrabold uppercase text-urgent-foreground">
                  <AlertTriangle className="size-3.5" /> {e.severity}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-urgent">
                  <Clock3 className="size-4" /> {e.time}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-extrabold leading-snug">{e.title}</h2>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                <MapPin className="size-4 text-map" /> {e.location}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{e.need}</p>
              <Button
                variant="destructive"
                size="xl"
                className="mt-6 w-full"
                onClick={() => open({ title: e.title, org: e.location, need: e.need, urgent: true })}
              >
                DISPATCH IMMEDIATE HELP / RESPOND TO SOS
              </Button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
