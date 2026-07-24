import { ArrowRight, Check } from "lucide-react";
import { useGame, MISSION_ORDER } from "../store";
import { missionById } from "../content/missions";
import { glossaryById } from "../content/glossary";
import { badgeById } from "../content/badges";
import { BadgeMedallion } from "../components/BadgeMedallion";
import { TrustMeter } from "../components/TrustMeter";

export function DebriefScreen({ missionId }: { missionId: string }) {
  const navigate = useGame((s) => s.navigate);
  const openGlossary = useGame((s) => s.openGlossary);
  const progress = useGame((s) => s.missions[missionId]);
  const mission = missionById[missionId];
  if (!mission) return null;

  const idx = MISSION_ORDER.indexOf(missionId as (typeof MISSION_ORDER)[number]);
  const nextId = MISSION_ORDER[idx + 1];
  const nextMission = nextId ? missionById[nextId] : undefined;
  const badge = progress?.badgeEarned ? badgeById[mission.badge] : null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Debrief
        </p>
        <h1 className="mt-1 text-h1">What {mission.day} was really about</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-brand/10 px-3 py-1.5 text-sm font-bold text-brand">
          +{progress?.lastPoints ?? 0} Judgement points
        </span>
        <span className="text-sm text-ink/60">
          Best: {progress?.bestPoints ?? 0} / {progress?.maxPoints ?? 0}
        </span>
      </div>

      {badge && (
        <div className="animate-pop flex items-center gap-3 rounded-xl border border-brand/30 bg-brand/5 p-4">
          <span className="inline-flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-brand/15 text-brand">
            <BadgeMedallion badge={badge} size={48} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Badge earned
            </p>
            <p className="font-semibold">{badge.name}</p>
            <p className="text-sm text-ink/80">{badge.toast}</p>
          </div>
        </div>
      )}

      <section>
        <h2 className="mb-3 text-h3">Keep these</h2>
        <ul className="space-y-2">
          {mission.takeaways.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-hairline bg-surface p-3 shadow-card"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-verdict-strong/10 text-verdict-strong">
                <Check size={15} aria-hidden />
              </span>
              <span className="text-[0.98rem]">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {mission.glossaryEchoes.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-ink/70">
            Terms from this mission
          </h2>
          <div className="flex flex-wrap gap-2">
            {mission.glossaryEchoes.map((id) => {
              const g = glossaryById[id];
              if (!g) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => openGlossary(id)}
                  className="rounded-full border border-hairline bg-canvas px-3 py-1 text-sm hover:border-brand/40 hover:text-brand"
                >
                  {g.term}
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded-xl border border-hairline bg-surface p-4 shadow-card">
        <TrustMeter variant="full" />
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        {nextMission ? (
          <button
            type="button"
            onClick={() => navigate({ screen: "mission", missionId: nextId })}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
          >
            {nextId === "m6" ? "Take the Friday Review" : `On to ${nextMission.day}`}
            <ArrowRight size={18} aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate({ screen: "map" })}
            className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
          >
            Back to the map
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate({ screen: "map" })}
          className="rounded-lg border border-hairline bg-canvas px-5 py-2.5 font-medium hover:border-brand/40"
        >
          Back to the map
        </button>
      </div>
    </div>
  );
}
