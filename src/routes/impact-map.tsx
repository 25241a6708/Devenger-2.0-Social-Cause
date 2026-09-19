import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { ArrowRight, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatchEngine } from "@/components/MatchEngine";
import { categoryMeta, locations, type ImpactLocation, type PinCategory } from "@/lib/impact-data";

const ImpactMap = lazy(() => import("@/components/ImpactMap"));

export const Route = createFileRoute("/impact-map")({
  head: () => ({
    meta: [
      { title: "Impact Map — Live Hyderabad Needs & Contributors" },
      { name: "description", content: "Explore urgent needs, care homes, community drives and verified contributors across Hyderabad." },
      { property: "og:title", content: "Impact Map — Live Hyderabad Needs & Contributors" },
      { property: "og:description", content: "Explore urgent needs, care homes, community drives and verified contributors across Hyderabad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactMapPage,
});

const filters = [
  { id: "all", label: "All Pins" },
  { id: "urgent", label: "Urgent Needs" },
  { id: "care", label: "Orphanages & Trusts" },
  { id: "contributor", label: "Contributors" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function ImpactMapPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<ImpactLocation | null>(null);
  const { open } = useMatchEngine();

  const items = useMemo(
    () => (filter === "all" ? locations : locations.filter((l) => l.category === (filter as PinCategory))),
    [filter],
  );

  return (
    <main className="relative h-[calc(100vh-7rem)] xl:h-[calc(100vh-4rem)]">
      <div className="absolute inset-0">
        <ClientOnly fallback={<MapSkeleton />}>
          <Suspense fallback={<MapSkeleton />}>
            <ImpactMap items={items} onSelect={setSelected} />
          </Suspense>
        </ClientOnly>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] p-4">
        <div className="pointer-events-auto mx-auto flex max-w-[1100px] flex-wrap items-center gap-2 rounded-lg border border-border bg-card/95 p-2 shadow-lg backdrop-blur">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-md px-3.5 py-2 text-xs font-bold transition-colors ${
                filter === f.id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="ml-auto hidden flex-wrap items-center gap-3 pr-2 text-[11px] font-semibold md:flex">
            {Object.entries(categoryMeta).map(([key, meta]) => (
              <span key={key} className="flex items-center gap-1.5">
                <i className="size-2.5 rounded-full" style={{ background: meta.color }} />
                {meta.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <aside className="absolute bottom-0 right-0 z-[600] max-h-full w-full overflow-y-auto border-l border-border bg-card shadow-2xl sm:top-0 sm:w-[380px]">
          <div className="relative h-44">
            <img src={selected.photo} alt={selected.name} className="size-full object-cover" />
            <button
              onClick={() => setSelected(null)}
              aria-label="Close details"
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-md bg-card/90 text-foreground shadow"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="p-5">
            <span
              className="inline-flex rounded-sm px-2 py-1 text-[10px] font-extrabold uppercase text-foreground"
              style={{ background: categoryMeta[selected.category].color }}
            >
              {categoryMeta[selected.category].label}
            </span>
            <h2 className="mt-3 text-xl font-extrabold">{selected.name}</h2>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">{selected.type} · {selected.distance} away</p>
            <p className="mt-3 text-sm text-muted-foreground">{selected.detail}</p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {selected.stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-border p-3">
                  <p className="text-lg font-extrabold">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <Button
              variant={selected.category === "urgent" ? "destructive" : "impact"}
              size="xl"
              className="mt-6 w-full"
              onClick={() => open({ title: selected.name, org: selected.type, need: selected.detail, urgent: selected.category === "urgent" })}
            >
              {selected.action} <ArrowRight />
            </Button>
          </div>
        </aside>
      )}
    </main>
  );
}

function MapSkeleton() {
  return (
    <div className="grid h-full place-items-center bg-muted">
      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
        <MapPin className="size-4 animate-pulse" /> Loading live map
      </div>
    </div>
  );
}
