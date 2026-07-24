import { type ReactNode } from "react";
import { BookOpen, BarChart3, Info, Map } from "lucide-react";
import { useGame, totalPoints, MISSION_ORDER } from "../store";
import { TrustMeter } from "./TrustMeter";
import { AvaMark } from "./AvaMark";
import { missionById } from "../content/missions";

function useLocationLabel(): string {
  const route = useGame((s) => s.route);
  switch (route.screen) {
    case "map":
      return "Mission map";
    case "progress":
      return "My progress";
    case "about":
      return "About";
    case "results":
      return "The Friday Review";
    case "mission":
    case "debrief":
    case "reflection": {
      const id = route.missionId;
      if (!id) return "";
      const idx = MISSION_ORDER.indexOf(id as (typeof MISSION_ORDER)[number]);
      const m = missionById[id];
      if (id === "m6") return "Mission 6 of 6 · The Friday Review";
      return m ? `Mission ${idx + 1} of 6 · ${m.day}` : "";
    }
    default:
      return "";
  }
}

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useGame((s) => s.navigate);
  const openGlossary = useGame((s) => s.openGlossary);
  const missions = useGame((s) => s.missions);
  const points = totalPoints(missions);
  const label = useLocationLabel();

  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-hairline bg-canvas/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <button
            type="button"
            onClick={() => navigate({ screen: "home" })}
            className="flex items-center gap-2 font-semibold"
          >
            <AvaMark size={26} title="AI at Work home" />
            <span className="hidden sm:inline">AI at Work</span>
          </button>

          {label && (
            <span className="text-sm text-ink/60" aria-current="page">
              {label}
            </span>
          )}

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-baseline gap-1 sm:flex">
              <span className="text-sm font-bold text-brand">{points}</span>
              <span className="text-xs text-ink/60">pts</span>
            </span>
            <div className="hidden md:block">
              <TrustMeter variant="compact" />
            </div>
            <nav className="flex items-center gap-1" aria-label="Main">
              <button
                type="button"
                onClick={() => navigate({ screen: "map" })}
                aria-label="Mission map"
                className="rounded-md p-2 text-ink/70 hover:bg-surface hover:text-brand"
              >
                <Map size={20} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => openGlossary()}
                aria-haspopup="dialog"
                aria-label="Open glossary"
                className="rounded-md p-2 text-ink/70 hover:bg-surface hover:text-brand"
              >
                <BookOpen size={20} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => navigate({ screen: "progress" })}
                aria-label="My progress"
                className="rounded-md p-2 text-ink/70 hover:bg-surface hover:text-brand"
              >
                <BarChart3 size={20} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => navigate({ screen: "about" })}
                aria-label="About and help"
                className="rounded-md p-2 text-ink/70 hover:bg-surface hover:text-brand"
              >
                <Info size={20} aria-hidden />
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 py-6 outline-none sm:py-8">
        {children}
      </main>
    </div>
  );
}
