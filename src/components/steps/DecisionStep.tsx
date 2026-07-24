import { useState } from "react";
import type { Step } from "../../types";
import type { StepProps } from "./stepTypes";
import { RichText } from "../RichText";
import { ArtefactRenderer } from "../ArtefactRenderer";
import { FeedbackCard } from "../FeedbackCard";
import { microcopy } from "../../content/microcopy";
import { useGame } from "../../store";
import { verdictPoints } from "../../lib/game";

type DecisionStepT = Extract<Step, { kind: "decision" }>;

export function DecisionStep({
  step,
  onComplete,
}: StepProps<DecisionStepT>) {
  const applyTrust = useGame((s) => s.applyTrust);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [appliedDelta, setAppliedDelta] = useState(0);
  const [retried, setRetried] = useState(false);

  const chosen = step.options.find((o) => o.id === chosenId) ?? null;

  function choose(id: string) {
    const opt = step.options.find((o) => o.id === id)!;
    const delta = opt.trustDelta ?? 0;
    applyTrust(delta);
    setAppliedDelta(delta);
    setChosenId(id);
  }

  function retry() {
    applyTrust(-appliedDelta);
    setAppliedDelta(0);
    setChosenId(null);
    setRetried(true);
  }

  function finish() {
    if (!chosen) return;
    let pts = verdictPoints(chosen.verdict);
    if (retried) pts = Math.max(0, pts - 1);
    onComplete({
      points: pts,
      verdict: chosen.verdict,
      choseUnsafe: chosen.verdict === "unsafe",
      riskyOrUnsafe: chosen.verdict === "risky" || chosen.verdict === "unsafe",
    });
  }

  const verdictHeading = (v: string) =>
    microcopy.verdicts[v as keyof typeof microcopy.verdicts] ?? "";

  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] leading-relaxed">
        <RichText text={step.situation} />
      </p>

      {step.artefact && <ArtefactRenderer artefact={step.artefact} />}

      {!chosen && (
        <ul className="space-y-3" role="list">
          {step.options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => choose(o.id)}
                className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-left text-[0.98rem] leading-relaxed shadow-card transition hover:border-brand/50 hover:bg-brand/5"
              >
                <RichText text={o.text} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {chosen && (
        <FeedbackCard
          tone={chosen.verdict}
          heading={verdictHeading(chosen.verdict)}
          body={chosen.feedback}
          consequence={chosen.consequence}
          onRetry={
            chosen.allowRetry && !retried ? retry : undefined
          }
          onContinue={finish}
        />
      )}
    </div>
  );
}
