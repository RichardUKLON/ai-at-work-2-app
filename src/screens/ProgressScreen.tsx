import { RotateCcw, Lock } from "lucide-react";
import { useGame, totalPoints, MISSION_ORDER } from "../store";
import { missionById } from "../content/missions";
import { badges } from "../content/badges";
import { BadgeMedallion } from "../components/BadgeMedallion";
import { TrustMeter } from "../components/TrustMeter";

export function ProgressScreen() {
  const navigate = useGame((s) => s.navigate);
  const missions = useGame((s) => s.missions);
  const earned = useGame((s) => s.badges);
  const reflections = useGame((s) => s.reflections);
  const points = totalPoints(missions);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-h1">My progress</h1>
        <span className="rounded-full bg-brand/10 px-4 py-2 font-bold text-brand">
          {points} Judgement points
        </span>
      </div>

      <section className="rounded-xl2 border border-hairline bg-surface p-5 shadow-card">
        <TrustMeter variant="full" />
        <p className="mt-3 text-sm text-ink/70">
          Calibration, not faith or fear. The meter rewards the middle: trusting
          AI where it has earned it, and checking where it has not. Both blind
          trust and blanket refusal push it away from the ideal.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-h3">Badges</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {badges.map((b) => {
            const has = earned.includes(b.id);
            return (
              <li
                key={b.id}
                className={
                  "flex items-start gap-3 rounded-xl border p-3 " +
                  (has
                    ? "border-brand/30 bg-brand/5"
                    : "border-hairline bg-canvas")
                }
              >
                <span
                  className={
                    "inline-flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-full " +
                    (has ? "bg-brand/15 text-brand" : "bg-ink/5 text-ink/35")
                  }
                >
                  {has ? <BadgeMedallion badge={b} size={44} /> : <Lock size={18} aria-hidden />}
                </span>
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-ink/70">
                    {has ? b.toast : b.earnedHow}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-h3">Missions</h2>
        <ul className="space-y-2">
          {MISSION_ORDER.map((id) => {
            const p = missions[id];
            const m = missionById[id];
            const title = m ? `${m.day} · ${m.title}` : "Finale · The Friday Review";
            return (
              <li
                key={id}
                className="flex items-center gap-3 rounded-xl border border-hairline bg-surface p-3 shadow-card"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{title}</p>
                  <p className="text-sm text-ink/60">
                    {p?.completed
                      ? `Best ${p.bestPoints}${id === "m6" ? " / 10 correct" : ` / ${p.maxPoints} pts`}`
                      : "Not yet played"}
                  </p>
                </div>
                {p?.completed && (
                  <button
                    type="button"
                    onClick={() => navigate({ screen: "mission", missionId: id })}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-canvas px-3 py-1.5 text-sm font-medium hover:border-brand/40"
                  >
                    <RotateCcw size={15} aria-hidden /> Replay
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-xl2 border border-accent/30 bg-accent/5 p-5">
        <h2 className="text-h3">Take-home: before you let an agent act</h2>
        <p className="mt-1 text-sm text-ink/70">
          Run this before handing any task to a tool that can act, not just write.
        </p>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            ["Scope", "Grant the minimum permissions the task needs — no delete or full access “just in case”."],
            ["Budget", "If it can spend or commit, set a hard limit before it starts."],
            ["Gate", "Require a human approval before anything irreversible or external."],
            ["Review", "Check the action log, not just the output — triage by risk, not by time."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-hairline bg-surface p-3">
              <dt className="text-sm font-bold uppercase tracking-wide text-brand">
                {k}
              </dt>
              <dd className="text-sm text-ink/80">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {Object.keys(reflections).length > 0 && (
        <section>
          <h2 className="mb-3 text-h3">Your reflections</h2>
          <ul className="space-y-2">
            {MISSION_ORDER.map((id) => {
              const text = reflections[id];
              const m = missionById[id];
              if (!text) return null;
              return (
                <li
                  key={id}
                  className="rounded-xl border border-hairline bg-surface p-3 shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {m ? m.day : "Finale"}
                  </p>
                  <p className="mt-1 text-[0.95rem]">{text}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
