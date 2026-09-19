import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Gauge, MapPin, Package, ShieldCheck, Timer, TriangleAlert, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type MatchRequest = {
  title: string;
  org: string;
  need: string;
  urgent?: boolean;
};

type Ctx = {
  open: (req: MatchRequest) => void;
  /** Mission progress state */
  fulfilled: boolean;
  mealsFulfilled: number;
  /** Impact points shown in the nav header */
  points: number;
  /** Extra activity-feed entries added during this session */
  feed: { title: string; meta: string }[];
  /** Confetti burst flag after fulfilment */
  celebrate: boolean;
  /** Restaurant A supply-drop simulation */
  shortageSimulated: boolean;
  simulateShortage: () => void;
  /** Dynamic rematch modal */
  rematchOpen: boolean;
  acceptRematch: () => void;
  dismissRematch: () => void;
};

const MatchContext = createContext<Ctx>({
  open: () => {},
  fulfilled: false,
  mealsFulfilled: 70,
  points: 380,
  feed: [],
  celebrate: false,
  shortageSimulated: false,
  simulateShortage: () => {},
  rematchOpen: false,
  acceptRematch: () => {},
  dismissRematch: () => {},
});

export function useMatchEngine() {
  return useContext(MatchContext);
}

/**
 * Impact Matching Engine — weighted scoring algorithm.
 *
 *   score = (0.30 * qtyScore) + (0.25 * distScore) + (0.20 * urgencyScore)
 *         + (0.15 * deadlineScore) + (0.10 * compatScore)
 *
 * Every factor is normalised to 0–100 before weighting.
 */
export const MATCH_WEIGHTS = {
  qty: 0.3,
  dist: 0.25,
  urgency: 0.2,
  deadline: 0.15,
  compat: 0.1,
} as const;

export type MatchCandidate = {
  id: string;
  name: string;
  available: number;
  distanceKm: number;
  verified: boolean;
  deadlineNote: string;
  distanceNote: string;
  compatNote: string;
  scores: {
    qty: number; // Quantity Compatibility
    dist: number; // Distance Fit
    urgency: number; // Urgency Level
    deadline: number; // Deadline Compatibility
    compat: number; // Resource Compatibility
  };
};

export function calculateMatchScore(scores: MatchCandidate["scores"]): number {
  const score =
    MATCH_WEIGHTS.qty * scores.qty +
    MATCH_WEIGHTS.dist * scores.dist +
    MATCH_WEIGHTS.urgency * scores.urgency +
    MATCH_WEIGHTS.deadline * scores.deadline +
    MATCH_WEIGHTS.compat * scores.compat;
  return Math.round(score);
}

const CANDIDATES: MatchCandidate[] = [
  {
    id: "freshbite",
    name: "FreshBite Restaurant",
    available: 60,
    distanceKm: 1.4,
    verified: true,
    deadlineNote: "Meals ready for pickup before 7:00 PM today",
    distanceNote: "1.4 km close proximity · 6 min drive",
    compatNote: "Prepared Food match · verified partner",
    scores: { qty: 100, dist: 88, urgency: 100, deadline: 90, compat: 100 },
  },
  {
    id: "green-plate",
    name: "Green Plate Restaurant",
    available: 40,
    distanceKm: 3.2,
    verified: true,
    deadlineNote: "Available before 6:45 PM today",
    distanceNote: "3.2 km · 15 min drive",
    compatNote: "Prepared Food match · verified partner",
    scores: { qty: 100, dist: 68, urgency: 100, deadline: 85, compat: 85 },
  },
];

/** Dynamic rematch candidate surfaced after the Restaurant A supply drop. */
const REMATCH_CANDIDATE: MatchCandidate = {
  id: "local-grocery",
  name: "Local Grocery",
  available: 30,
  distanceKm: 2.1,
  verified: true,
  deadlineNote: "Available before 6:30 PM today",
  distanceNote: "2.1 km · 9 min drive",
  compatNote: "Prepared Food match · verified partner",
  scores: { qty: 100, dist: 80, urgency: 100, deadline: 80, compat: 100 },
};

const FACTORS = [
  { key: "qty", label: "Quantity Compatibility", weight: "30%", icon: Package },
  { key: "dist", label: "Distance Fit", weight: "25%", icon: MapPin },
  { key: "urgency", label: "Urgency Level", weight: "20%", icon: TriangleAlert },
  { key: "deadline", label: "Deadline Compatibility", weight: "15%", icon: Timer },
  { key: "compat", label: "Resource Compatibility", weight: "10%", icon: ShieldCheck },
] as const;

const CONFETTI_COLORS = ["#22c55e", "#f0b429", "#3b82f6", "#ef4444", "#a855f7", "#14b8a6"];

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2 + Math.random() * 1.5,
        size: 6 + Math.random() * 8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length]!,
        rotate: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden>
      <style>{`@keyframes confetti-fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-[2px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

function BreakdownDialog({
  candidate,
  onClose,
}: {
  candidate: MatchCandidate;
  onClose: () => void;
}) {
  const score = calculateMatchScore(candidate.scores);
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">Why this match? — {candidate.name}</DialogTitle>
          <DialogDescription>
            Exact weighted-algorithm breakdown for the 30 remaining meals at Hope Community Center.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {FACTORS.map((f) => {
            const value = candidate.scores[f.key];
            const Icon = f.icon;
            const note =
              f.key === "qty"
                ? `${candidate.available}/30 meals covers the full gap`
                : f.key === "dist"
                  ? candidate.distanceNote
                  : f.key === "urgency"
                    ? "Matches URGENT priority"
                    : f.key === "deadline"
                      ? candidate.deadlineNote
                      : candidate.compatNote;
            return (
              <div key={f.key}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 font-bold">
                    <Icon className="size-4 text-map" />
                    {f.label}
                    <span className="text-[10px] font-semibold text-muted-foreground">({f.weight} weight)</span>
                  </span>
                  <span className="font-extrabold">{value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-positive" style={{ width: `${value}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{note}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between rounded-lg border border-positive/30 bg-positive/10 p-4">
          <span className="text-sm font-extrabold uppercase tracking-wide">Overall Calculated Match</span>
          <span className="text-3xl font-extrabold text-positive">{score}%</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MatchEngineProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<MatchRequest | null>(null);
  const [breakdown, setBreakdown] = useState<MatchCandidate | null>(null);

  // Prompt 3 — contribution coordination & dynamic rematching state
  const [fulfilled, setFulfilled] = useState(false);
  const [points, setPoints] = useState(380);
  const [feed, setFeed] = useState<{ title: string; meta: string }[]>([]);
  const [celebrate, setCelebrate] = useState(false);
  const [shortageSimulated, setShortageSimulated] = useState(false);
  const [rematchOpen, setRematchOpen] = useState(false);

  const open = useCallback((req: MatchRequest) => setRequest(req), []);

  const coordinate = useCallback((candidate: MatchCandidate) => {
    setFulfilled(true);
    setShortageSimulated(false);
    setPoints((p) => p + 30);
    setFeed((f) => [
      {
        title: `Coordinated 30 meals from ${candidate.name.replace(" Restaurant", "")} to Hope Community Center.`,
        meta: "Just now · Impact Matching Engine",
      },
      ...f,
    ]);
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 4000);
    toast.success("Mission fulfilled!", {
      description: `${candidate.name} covers the remaining 30 meals — 100/100 complete. +30 Impact Points.`,
    });
    setRequest(null);
  }, []);

  const simulateShortage = useCallback(() => {
    if (!fulfilled || shortageSimulated) return;
    setFulfilled(false);
    setShortageSimulated(true);
    toast.warning("⚠️ Supply shortage detected! Re-running Impact Matching Engine...", {
      description: "Restaurant A supply dropped 60 → 30 meals. New 30-meal gap detected.",
    });
    window.setTimeout(() => setRematchOpen(true), 900);
  }, [fulfilled, shortageSimulated]);

  const acceptRematch = useCallback(() => {
    setRematchOpen(false);
    setFulfilled(true);
    setFeed((f) => [
      {
        title: "Accepted rematch: 30 meals from Local Grocery to Hope Community Center.",
        meta: "Just now · Dynamic Re-Matching",
      },
      ...f,
    ]);
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 4000);
    toast.success("Rematch accepted!", {
      description: "Mission instantly restored to 100/100 — Fulfilled!",
    });
  }, []);

  const dismissRematch = useCallback(() => setRematchOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      fulfilled,
      mealsFulfilled: fulfilled ? 100 : 70,
      points,
      feed,
      celebrate,
      shortageSimulated,
      simulateShortage,
      rematchOpen,
      acceptRematch,
      dismissRematch,
    }),
    [open, fulfilled, points, feed, celebrate, shortageSimulated, simulateShortage, rematchOpen, acceptRematch, dismissRematch],
  );

  return (
    <MatchContext.Provider value={value}>
      {children}
      {celebrate && <ConfettiBurst />}

      <Dialog open={!!request} onOpenChange={(o) => !o && setRequest(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[680px]">
          <DialogHeader>
            <div className="mb-1 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
              <Gauge className="size-4 text-positive" /> Impact Matching Engine
            </div>
            <DialogTitle className="text-2xl font-extrabold">
              Impact Matching Engine - Optimal Help Recommendations
            </DialogTitle>
            <DialogDescription>
              Calculating real-time fit based on quantity, distance, urgency, deadline, and resource type.
            </DialogDescription>
          </DialogHeader>

          <p className="rounded-md bg-muted/60 px-3 py-2 text-xs font-bold text-muted-foreground">
            Recommending partners for the 30 remaining meals · Hope Community Center · deadline 7:00 PM
          </p>

          <div className="space-y-4">
            {CANDIDATES.map((candidate) => {
              const score = calculateMatchScore(candidate.scores);
              const top = candidate.id === "freshbite";
              return (
                <div
                  key={candidate.id}
                  className={`rounded-lg border p-4 ${top ? "border-positive/50 bg-positive/5 shadow-sm" : "border-border bg-card"}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold">{candidate.name}</h3>
                        {candidate.verified && <CheckCircle2 className="size-4 text-positive" aria-label="Verified Contributor" />}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Available: {candidate.available} meals · Distance: {candidate.distanceKm} km away · Verified Contributor ✓
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-extrabold uppercase ${
                        top ? "bg-positive text-positive-foreground shadow-impact" : "bg-muted text-foreground"
                      }`}
                    >
                      {score}% MATCH
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" className="flex-1" onClick={() => setBreakdown(candidate)}>
                      WHY THIS MATCH?
                    </Button>
                    <Button variant="impact" className="flex-1" onClick={() => coordinate(candidate)}>
                      COORDINATE CONTRIBUTION <ArrowRight />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {breakdown && <BreakdownDialog candidate={breakdown} onClose={() => setBreakdown(null)} />}

      {/* Dynamic Re-Match modal — appears after the simulated supply drop */}
      <Dialog open={rematchOpen} onOpenChange={(o) => !o && dismissRematch()}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <div className="mb-1 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-urgent">
              <Zap className="size-4" /> Dynamic Re-Matching
            </div>
            <DialogTitle className="text-2xl font-extrabold">NEW MATCH FOUND</DialogTitle>
            <DialogDescription>
              The Impact Matching Engine re-ran instantly after the supply shortage and found a replacement contributor.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-positive/50 bg-positive/5 p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold">Restaurant C - {REMATCH_CANDIDATE.name}</h3>
                  <CheckCircle2 className="size-4 text-positive" aria-label="Verified Contributor" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {REMATCH_CANDIDATE.available} meals available · {REMATCH_CANDIDATE.distanceKm} km away · Verified Contributor ✓
                </p>
              </div>
              <span className="inline-flex items-center rounded-sm bg-positive px-2.5 py-1 text-[11px] font-extrabold uppercase text-positive-foreground shadow-impact">
                {calculateMatchScore(REMATCH_CANDIDATE.scores)}% MATCH
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="flex-1" onClick={dismissRematch}>
                DISMISS
              </Button>
              <Button variant="impact" className="flex-1" onClick={acceptRematch}>
                ACCEPT REMATCH <ArrowRight />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </MatchContext.Provider>
  );
}
