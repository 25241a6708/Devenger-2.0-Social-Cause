import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Clock3, Crown, PackageCheck, Radio, Siren, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatchEngine } from "@/components/MatchEngine";
import { activities, contributors } from "@/lib/impact-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — SocialCause Impact Command Center" },
      { name: "description", content: "Track urgent community missions, live SOS alerts and neighbourhood impact in real time." },
      { property: "og:title", content: "Dashboard — SocialCause Impact Command Center" },
      { property: "og:description", content: "Track urgent community missions, live SOS alerts and neighbourhood impact in real time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const toneClass: Record<string, string> = {
  positive: "text-positive bg-positive/10",
  urgent: "text-urgent bg-urgent/10",
  map: "text-map bg-map/10",
};

function Dashboard() {
  const { open, fulfilled, mealsFulfilled, feed } = useMatchEngine();
  const top = contributors[0]!;

  return (
    <main className="grid-surface px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1500px]">
        <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid lg:grid-cols-[1fr_320px]">
            <div className="p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-muted-foreground">
                  <Radio className="size-4 text-urgent" /> Priority response
                </span>
                {fulfilled ? (
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-positive px-2.5 py-1 text-[11px] font-extrabold text-positive-foreground shadow-impact">
                    <PackageCheck className="size-3.5" /> MISSION FULFILLED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-urgent px-2.5 py-1 text-[11px] font-extrabold text-urgent-foreground">
                    <span className="size-1.5 animate-pulse rounded-full bg-urgent-foreground" /> URGENT
                  </span>
                )}
              </div>
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">URGENT IMPACT MISSION</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-2 font-bold"><Building2 className="size-4 text-map" />Hope Community Center</span>
                <span className="text-muted-foreground">100 prepared meals for 120 people</span>
              </div>
              <div className="mt-8 max-w-3xl">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <p className="text-sm font-bold">{mealsFulfilled} / 100 Meals Fulfilled <span className="text-positive">({mealsFulfilled}%)</span></p>
                  {fulfilled ? (
                    <p className="text-xs font-semibold text-positive">100% Complete 🎉</p>
                  ) : (
                    <p className="text-xs font-semibold text-urgent">30 Meals Remaining</p>
                  )}
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-positive shadow-impact transition-all duration-700" style={{ width: `${mealsFulfilled}%` }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-border bg-foreground p-6 text-background lg:border-l lg:border-t-0 lg:p-8">
              <div>
                <p className="mb-3 text-xs font-bold uppercase text-background/60">Time left</p>
                <div className="flex items-center gap-3">
                  <Clock3 className="size-6 text-primary" />
                  <span className="text-3xl font-extrabold">5h 20m</span>
                </div>
                <p className="mt-2 text-sm text-background/65">Deadline: Today, 7:00 PM</p>
              </div>
              <Button
                variant="impact"
                size="xl"
                className="mt-8 w-full"
                onClick={() => open({ title: "Hope Community Center — 30 meals", org: "Hope Community Center", need: "30 meals before 7:00 PM" })}
              >
                FIND HOW I CAN HELP <ArrowRight />
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-lg border border-urgent/40 bg-urgent/10">
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-3">
              <span className="relative grid size-10 place-items-center rounded-md bg-urgent text-urgent-foreground">
                <span className="absolute inset-0 animate-ping rounded-md bg-urgent/50" />
                <Siren className="relative size-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold uppercase text-urgent">Active SOS alert</p>
                <p className="text-sm text-muted-foreground">Urgent medical assistance & blood required — Grace Hospital Area · 2 hours remaining</p>
              </div>
            </div>
            <Button asChild variant="destructive"><Link to="/sos">Open SOS desk <ArrowRight /></Link></Button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Crown className="size-5 text-amber" />
                <h2 className="text-lg font-extrabold">Top Contributor</h2>
              </div>
              <Link to="/leaderboard" className="text-xs font-bold text-map hover:underline">View leaderboard</Link>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-muted/50 p-5">
                <div>
                  <p className="text-xl font-extrabold">{top.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{top.category} · {top.impact} coordinated</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-positive">{top.points}</p>
                  <p className="text-xs font-semibold text-muted-foreground">Impact Points</p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Stat icon={PackageCheck} value="240" label="Meals coordinated" />
                <Stat icon={UsersRound} value="520" label="People reached" />
                <Stat icon={Building2} value="12" label="Partner organisations" />
              </div>
            </div>
          </section>

          <aside className="rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-60" /><span className="relative inline-flex size-2.5 rounded-full bg-positive" /></span>
                <h2 className="text-lg font-extrabold">Live Activity</h2>
              </div>
              <span className="rounded-sm bg-positive/10 px-2 py-1 text-[10px] font-extrabold uppercase text-positive">Live</span>
            </div>
            <div className="px-5">
              {feed.map((entry) => (
                <div key={entry.title} className="flex gap-4 border-b border-border py-4 animate-fade-in">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md text-positive bg-positive/10">
                    <PackageCheck className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-snug">{entry.title}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{entry.meta}</p>
                  </div>
                </div>
              ))}
              {activities.map((activity) => (
                <div key={activity.title} className="flex gap-4 border-b border-border py-4 last:border-0">
                  <span className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-md ${toneClass[activity.tone]}`}>
                    <PackageCheck className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-snug">{activity.title}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{activity.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof PackageCheck; value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <Icon className="size-4 text-map" />
      <p className="mt-3 text-2xl font-extrabold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
