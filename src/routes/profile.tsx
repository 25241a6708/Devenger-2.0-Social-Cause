import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Clock3, Flame, HeartHandshake, PackageCheck, Target, UserRound } from "lucide-react";
import { activities } from "@/lib/impact-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Impact Champion Dashboard" },
      { name: "description", content: "Your impact points, coordinated meals, volunteer hours and earned achievement badges." },
      { property: "og:title", content: "My Profile — Impact Champion Dashboard" },
      { property: "og:description", content: "Your impact points, coordinated meals, volunteer hours and earned achievement badges." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const stats = [
  { icon: Target, value: "380", label: "Impact Points" },
  { icon: PackageCheck, value: "30", label: "Meals Coordinated" },
  { icon: Clock3, value: "12", label: "Volunteer Hours" },
  { icon: Flame, value: "2", label: "Active Missions Joined" },
];

const badges = [
  { name: "First Responder", detail: "Responded to 5 SOS alerts" },
  { name: "Community Food Hero", detail: "Coordinated 30+ meals" },
  { name: "Verified Contributor", detail: "Identity and org verified" },
  { name: "Weekend Warrior", detail: "3 weekend missions joined" },
];

function ProfilePage() {
  return (
    <main className="grid-surface px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1300px]">
        <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:flex sm:flex-wrap border-b border-border p-6">
            <span className="grid size-16 place-items-center rounded-lg bg-foreground text-background">
              <UserRound className="size-8" />
            </span>
            <div>
              <h1 className="flex min-w-0 items-center gap-2 text-xl sm:text-2xl font-extrabold">
                Jashwanth Reddy <BadgeCheck className="size-5 shrink-0 text-map" />
              </h1>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">Impact Champion · Level 4</p>
            </div>
            <div className="col-span-2 sm:ml-auto w-full max-w-xs">
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span>Progress to Level 5</span><span className="text-positive">76%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[76%] rounded-full bg-positive" />
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-lg border border-border p-5">
                  <Icon className="size-5 shrink-0 text-map" />
                  <p className="mt-3 text-3xl font-extrabold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <HeartHandshake className="size-5 text-positive" />
              <h2 className="text-lg font-extrabold">My Recent Activity</h2>
            </div>
            <div className="px-5">
              {activities.map((a) => (
                <div key={a.title} className="border-b border-border py-4 last:border-0">
                  <p className="text-sm font-bold">{a.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.meta}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <Award className="size-5 text-amber" />
              <h2 className="text-lg font-extrabold">Earned Badges</h2>
            </div>
            <div className="grid gap-3 p-5">
              {badges.map((b) => (
                <div key={b.name} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-positive/10 text-positive">
                    <Award className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.detail}</p>
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
