import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useGame } from "../store";
import { microcopy } from "../content/microcopy";

export function AboutScreen() {
  const reset = useGame((s) => s.reset);
  const navigate = useGame((s) => s.navigate);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="max-w-measure space-y-6">
      <h1 className="text-h1">About this experience</h1>

      <section className="space-y-2">
        <p className="leading-relaxed">
          <strong>AI at Work 2: The Agent That Acted</strong> is a short, scenario-driven
          course about managing AI agents at work. Across five themed missions and a
          finale, you make realistic workplace choices with a fictional AI
          assistant, Ava Pro, and learn through consequences how to delegate
          safely, set boundaries, verify what an agent did, and stay accountable.
        </p>
        <p className="leading-relaxed">
          It covers what an agent is and how it differs from a chatbot, cost creep
          and budget limits, the delegation spectrum, reading an action log,
          irreversible actions, and why the person who sets the task always owns
          the outcome.
        </p>
      </section>

      <section>
        <h2 className="mb-1 text-h3">How your progress is stored</h2>
        <p className="leading-relaxed text-ink/80">
          Everything — your scores, badges, and reflections — is saved locally in
          this browser. Nothing is ever sent anywhere. Clearing your browser
          data, or using the reset below, removes it.
        </p>
      </section>

      <section>
        <h2 className="mb-1 text-h3">Accessibility</h2>
        <p className="leading-relaxed text-ink/80">
          This experience is built to WCAG 2.1 AA: full keyboard operation, a
          visible focus indicator on every control, colour never used alone,
          text that scales to 200%, no time limits, and screen-reader-friendly
          structure throughout. Found a barrier? That feedback is always
          welcome.
        </p>
      </section>

      <section className="rounded-xl border border-verdict-unsafe/30 bg-verdict-unsafe/5 p-4">
        <h2 className="text-h3">Reset progress</h2>
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="mt-2 inline-flex items-center gap-2 rounded-lg border border-verdict-unsafe/40 bg-surface px-4 py-2 text-sm font-medium text-verdict-unsafe hover:bg-verdict-unsafe/10"
          >
            <Trash2 size={16} aria-hidden /> Reset all progress
          </button>
        ) : (
          <div className="mt-2 space-y-3">
            <p className="text-sm text-ink/80">{microcopy.empty.resetConfirm}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  reset();
                  navigate({ screen: "home" });
                }}
                className="rounded-lg bg-verdict-unsafe px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Yes, delete everything
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-hairline bg-canvas px-4 py-2 text-sm font-medium hover:border-brand/40"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
