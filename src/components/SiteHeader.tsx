import { Link } from "@tanstack/react-router";
import { Bell, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatchEngine } from "@/components/MatchEngine";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/impact-map", label: "Impact Map" },
  { to: "/missions", label: "Community Missions" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/sos", label: "SOS Emergency" },
  { to: "/profile", label: "My Profile" },
] as const;

export function SiteHeader() {
  const { points } = useMatchEngine();
  return (
    <header className="sticky top-0 z-[1000] border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col px-4 lg:px-8">
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 xl:flex xl:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="SocialCause home">
            <span className="grid size-9 place-items-center rounded-md bg-foreground text-background">
              <HeartHandshake className="size-5" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-extrabold">SocialCause</span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="whitespace-nowrap rounded-md px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-positive/15 text-positive hover:bg-positive/20 hover:text-positive" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-5 border-l border-border pl-5 lg:flex">
              <Metric value={String(points)} label="Impact Points" />
              <Metric value="240" label="Meals Coordinated" />
              <Metric value="520" label="People Reached" />
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative shrink-0">
              <Bell />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-urgent ring-2 ring-card" />
            </Button>
          </div>
        </div>

        <nav className="flex gap-4 overflow-x-auto border-t border-border py-2 xl:hidden" aria-label="Mobile navigation">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-bold text-muted-foreground"
              activeProps={{ className: "bg-positive/15 text-positive" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="whitespace-nowrap">
      <span className="text-sm font-extrabold text-positive">{value}</span>
      <span className="ml-1.5 text-[11px] font-semibold text-muted-foreground">{label}</span>
    </div>
  );
}
