import { Lock, Check, Play, RotateCcw } from "lucide-react";
import { useGame, isUnlocked } from "../store";
import { missions } from "../content/missions";
import { badgeById } from "../content/badges";
import { getIcon } from "../lib/icons";

interface MapEntry {
  id: string;
  day: string;
  title: string;
  themeIcon: string;
  durationMins: number;
  badgeId: string;
}

const mapEntries: MapEntry[] = [
  ...missions.map((m) => ({
    id: m.id,
    day: m.day,
    title: m.title,
    themeIcon: m.themeIcon,
    durationMins: m.durationMins,
    badgeId: m.badge,
  })),
  {
    id: "m6",
    day: "Finale",
    title: "The Friday Review: Agent Edition",
    themeIcon: "Compass",
    durationMins: 5,
    badgeId: "agent-ready",
  },
];

export function MissionMap() {
  const navigate = useGame((s) => s.navigate);
  const progress = useGame((s) => s.missions);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1">Your week with Ava</h1>
        <p className="mt-1 text-ink/70">
          Six short missions. Do one per coffee break, or the lot in half an hour.
        </p>
      </div>

      <ol className="space-y-3">
        {mapEntries.map((m, i) => {
          const p = progress[m.id];
          const unlocked = isUnlocked(m.id, progress);
          const completed = p?.completed;
          const Icon = getIcon(m.themeIcon);
          const prevDay =
            i > 0 ? mapEntries[i - 1].day : "";
          const badge = badgeById[m.badgeId];
          const BadgeIcon = badge ? getIcon(badge.icon) : null;

          return (
            <li key={m.id}>
              <div
                className={
                  "flex items-center gap-4 rounded-xl2 border p-4 shadow-card " +
                  (unlocked
                    ? "border-hairline bg-surface"
                    : "border-hairline bg-canvas opacity-70")
                }
              >
                <span
                  className={
                    "inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl " +
                    (completed
                      ? "bg-verdict-strong/10 text-verdict-strong"
                      : unlocked
                      ? "bg-brand/10 text-brand"
                      : "bg-ink/5 text-ink/40")
                  }
                >
                  {unlocked ? <Icon size={22} aria-hidden /> : <Lock size={20} aria-hidden />}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {m.day}
                    </span>
                    <span className="text-xs text-ink/50">· {m.durationMins} min</span>
                    {completed && p?.badgeEarned && BadgeIcon && (
                      <span
                        className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-brand"
                        title={`${badge.name} badge earned`}
                      >
                        <BadgeIcon size={14} aria-hidden /> {badge.name}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-h3 font-semibold">{m.title}</p>
                  {completed ? (
                    <p className="text-sm text-ink/60">
                      <Check size={14} className="-mt-0.5 mr-1 inline text-verdict-strong" aria-hidden />
                      Completed · Best {p?.bestPoints ?? 0}
                      {m.id === "m6" ? " / 10 correct" : ` / ${p?.maxPoints ?? 0} pts`}
                    </p>
                  ) : unlocked ? (
                    <p className="text-sm text-ink/60">Ready to play</p>
                  ) : (
                    <p className="text-sm text-ink/50">
                      Unlocks after {prevDay}
                    </p>
                  )}
                </div>

                <div className="flex-none">
                  {unlocked && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate({ screen: "mission", missionId: m.id })
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                    >
                      {completed ? (
                        <>
                          <RotateCcw size={16} aria-hidden /> Replay
                        </>
                      ) : (
                        <>
                          <Play size={16} aria-hidden /> Start
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
