import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, Crown, Medal, Trophy } from "lucide-react";
import { contributors } from "@/lib/impact-data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Top Community Contributors" },
      { name: "description", content: "Celebrating restaurants, NGOs, companies and individuals driving the most community impact." },
      { property: "og:title", content: "Leaderboard — Top Community Contributors" },
      { property: "og:description", content: "Celebrating restaurants, NGOs, companies and individuals driving the most community impact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeaderboardPage,
});

const filters = ["All", "Restaurant", "Corporate", "NGO", "Individual"] as const;

const podiumStyle = [
  { label: "Gold", ring: "border-[#f0b429]", chip: "bg-[#f0b429] text-[#3d2c00]", icon: Crown, lift: "lg:-translate-y-6" },
  { label: "Silver", ring: "border-[#adb5bd]", chip: "bg-[#adb5bd] text-[#1f2933]", icon: Trophy, lift: "" },
  { label: "Bronze", ring: "border-[#c98a4b]", chip: "bg-[#c98a4b] text-white", icon: Medal, lift: "" },
];

function LeaderboardPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const rows = useMemo(() => (filter === "All" ? contributors : contributors.filter((c) => c.category === filter)), [filter]);
  const podium = [contributors[1]!, contributors[0]!, contributors[2]!];

  return (
    <main className="grid-surface px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1300px]">
        <h1 className="text-3xl font-extrabold md:text-4xl">Leaderboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Verified contributors ranked by coordinated impact this season.</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3 lg:items-end">
          {podium.map((c) => {
            const style = podiumStyle[c.rank - 1]!;
            const Icon = style.icon;
            return (
              <div key={c.name} className={`rounded-lg border-2 ${style.ring} bg-card p-6 text-center shadow-sm ${style.lift}`}>
                <span className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase ${style.chip}`}>
                  <Icon className="size-3.5" /> {style.label} · #{c.rank}
                </span>
                <h2 className="mt-4 flex items-center justify-center gap-1.5 text-lg font-extrabold">
                  {c.name} {c.verified && <BadgeCheck className="size-4 text-map" />}
                </h2>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">{c.category}</p>
                <p className="mt-4 text-3xl font-extrabold text-positive">{c.points}</p>
                <p className="text-xs text-muted-foreground">Impact Points · {c.impact}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3.5 py-2 text-xs font-bold transition-colors ${
                filter === f ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-[11px] uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-extrabold">Rank</th>
                <th className="px-5 py-3 font-extrabold">Contributor</th>
                <th className="px-5 py-3 font-extrabold">Category</th>
                <th className="px-5 py-3 font-extrabold">Impact</th>
                <th className="px-5 py-3 font-extrabold">Badges</th>
                <th className="px-5 py-3 text-right font-extrabold">Points</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.name} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-extrabold">#{c.rank}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 font-bold">
                      {c.name} {c.verified && <BadgeCheck className="size-4 text-map" />}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{c.category}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.impact}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {c.badges.map((b) => (
                        <span key={b} className="rounded-sm bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">{b}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-extrabold text-positive">{c.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
