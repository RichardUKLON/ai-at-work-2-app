import { ArrowRight, MousePointerClick, Eye, Brain } from "lucide-react";
import { useGame } from "../store";
import { microcopy } from "../content/microcopy";

const stepIcons = [MousePointerClick, Eye, Brain];

export function HomeScreen() {
  const navigate = useGame((s) => s.navigate);
  const resume = useGame((s) => s.resume);
  const missions = useGame((s) => s.missions);
  const anyProgress = Object.values(missions).some((m) => m.completed) || !!resume;

  return (
    <div className="space-y-8">
      <section className="grid items-center gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-h1 leading-tight">{microcopy.welcome.headline}</h1>
          <p className="max-w-measure text-[1.1rem] leading-relaxed text-ink/80">
            {microcopy.welcome.sub}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={() =>
                navigate(
                  resume
                    ? { screen: "mission", missionId: resume.missionId }
                    : { screen: "mission", missionId: "m1" }
                )
              }
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
            >
              {anyProgress ? microcopy.welcome.resume : microcopy.welcome.cta}
              <ArrowRight size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => navigate({ screen: "map" })}
              className="rounded-lg border border-hairline bg-canvas px-5 py-2.5 font-medium hover:border-brand/40"
            >
              See the mission map
            </button>
          </div>
        </div>
        <img
          src="assets/illustrations/H2-1-ava-gets-hands-hero.png"
          alt="A hand reaching towards a computer screen with tools emerging from the display."
          className="aspect-[16/9] w-full rounded-xl2 border border-hairline object-cover shadow-card"
        />
      </section>

      <section className="rounded-xl2 border border-hairline bg-surface p-5 shadow-card">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">
          How this works · about 30 minutes
        </p>
        <ol className="grid gap-4 sm:grid-cols-3">
          {microcopy.welcome.howItWorks.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon size={18} aria-hidden />
                </span>
                <span className="text-[0.98rem]">{s}</span>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
