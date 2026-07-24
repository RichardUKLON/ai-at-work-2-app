import { Printer, RotateCcw, ArrowRight, Trophy } from "lucide-react";
import { useGame } from "../store";
import { microcopy } from "../content/microcopy";

const SKILL_AREA: Record<string, string> = {
  m1: "What an agent is, and permission scope",
  m2: "Cost creep and budget limits",
  m3: "The delegation spectrum",
  m4: "The audit trail and reversibility",
  m5: "Delegation versus abdication",
};

export function ResultsScreen() {
  const navigate = useGame((s) => s.navigate);
  const reseedFinale = useGame((s) => s.reseedFinale);
  const missions = useGame((s) => s.missions);
  const pct = useGame((s) => s.finaleLastPct) ?? 0;
  const m6 = missions["m6"];

  const tier = pct >= 80 ? microcopy.results.high : pct >= 50 ? microcopy.results.mid : microcopy.results.low;

  // Rank the five teaching missions by score ratio to surface strengths/gaps.
  const ranked = (["m1", "m2", "m3", "m4", "m5"] as const)
    .map((id) => {
      const p = missions[id];
      const ratio = p && p.maxPoints ? p.bestPoints / p.maxPoints : 0;
      return { id, ratio, played: !!p?.completed };
    })
    .sort((a, b) => b.ratio - a.ratio);

  const strengths = ranked.filter((r) => r.played).slice(0, 3);
  const weakest = [...ranked].filter((r) => r.played).sort((a, b) => a.ratio - b.ratio)[0];

  return (
    <div className="space-y-7">
      <section className="rounded-xl2 border border-brand/30 bg-surface p-6 text-center shadow-card">
        <span className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Trophy size={28} aria-hidden />
        </span>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          The Friday Review
        </p>
        <h1 className="mt-1 text-h1">{tier.title}</h1>
        <p className="mx-auto mt-2 max-w-measure text-[1.05rem] leading-relaxed text-ink/80">
          {tier.body}
        </p>
        <p className="mt-4 text-3xl font-bold text-brand">
          {m6?.lastPoints ?? 0}
          <span className="text-lg font-medium text-ink/60"> / 10 correct</span>
        </p>
      </section>

      {strengths.length > 0 && (
        <section>
          <h2 className="mb-2 text-h3">Your strongest areas</h2>
          <ul className="flex flex-wrap gap-2">
            {strengths.map((s) => (
              <li
                key={s.id}
                className="rounded-full border border-verdict-strong/30 bg-verdict-strong/5 px-3 py-1.5 text-sm font-medium text-verdict-strong"
              >
                {SKILL_AREA[s.id]}
              </li>
            ))}
          </ul>
        </section>
      )}

      {weakest && (
        <section className="rounded-xl border border-hairline bg-surface p-4 shadow-card">
          <h2 className="text-h3">One to revisit</h2>
          <p className="mt-1 text-ink/80">{SKILL_AREA[weakest.id]}</p>
          <button
            type="button"
            onClick={() => navigate({ screen: "mission", missionId: weakest.id })}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            <RotateCcw size={16} aria-hidden /> Replay that mission
          </button>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-canvas px-4 py-2.5 font-medium hover:border-brand/40"
        >
          <Printer size={18} aria-hidden /> Print / save summary
        </button>
        <button
          type="button"
          onClick={() => {
            reseedFinale();
            navigate({ screen: "mission", missionId: "m6" });
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-dark"
        >
          Try the review again (fresh questions)
          <ArrowRight size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => navigate({ screen: "map" })}
          className="rounded-lg border border-hairline bg-canvas px-4 py-2.5 font-medium hover:border-brand/40"
        >
          Back to the map
        </button>
      </div>
    </div>
  );
}
