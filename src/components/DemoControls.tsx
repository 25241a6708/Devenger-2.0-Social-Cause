import { useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatchEngine } from "@/components/MatchEngine";

export function DemoControls() {
  const [open, setOpen] = useState(true);
  const { fulfilled, shortageSimulated, simulateShortage } = useMatchEngine();

  return (
    <div className="fixed bottom-5 right-5 z-[1200] w-[280px]">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 border-b border-border px-3 py-2.5 text-xs font-extrabold uppercase"
        >
          <span className="inline-flex items-center gap-2"><Zap className="size-4 text-[#f0b429]" /> ⚡ Demo Controls</span>
          <span className="text-muted-foreground">{open ? "−" : "+"}</span>
        </button>
        {open && (
          <div className="p-3">
            <Button
              size="sm"
              variant="secondary"
              className="w-full justify-start text-left text-xs font-bold"
              disabled={!fulfilled || shortageSimulated}
              onClick={simulateShortage}
            >
              <Sparkles className="size-3.5 shrink-0 text-urgent" />
              Simulate Restaurant A Supply Drop (60 → 30 meals)
            </Button>
            {!fulfilled && !shortageSimulated && (
              <p className="mt-2 text-[10px] text-muted-foreground">
                Coordinate a contribution first, then simulate the supply drop.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
