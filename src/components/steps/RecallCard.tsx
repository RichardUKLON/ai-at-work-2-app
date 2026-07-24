import { useState } from "react";
import type { Step } from "../../types";
import type { StepProps } from "./stepTypes";
import { RichText } from "../RichText";
import { FeedbackCard } from "../FeedbackCard";
import { verdictPoints } from "../../lib/game";

type RecallT = Extract<Step, { kind: "recall" }>;

export function RecallCard({ step, onComplete }: StepProps<RecallT>) {
  const [chosenId, setChosenId] = useState<string | null>(null);
  const chosen = step.options.find((o) => o.id === chosenId) ?? null;
  const correct = chosen?.verdict === "strong";

  return (
    <div className="space-y-4">
      <div className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
        Warm-up recall
      </div>
      <p className="text-[1.05rem] font-medium leading-relaxed">
        <RichText text={step.question} />
      </p>

      {!chosen && (
        <ul className="space-y-3" role="list">
          {step.options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => setChosenId(o.id)}
                className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-left text-[0.98rem] shadow-card transition hover:border-brand/50 hover:bg-brand/5"
              >
                <RichText text={o.text} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {chosen && (
        <FeedbackCard
          tone={correct ? "correct" : "incorrect"}
          heading={correct ? "Correct" : "Not quite"}
          body={chosen.feedback}
          onContinue={() =>
            onComplete({ points: verdictPoints(chosen.verdict) })
          }
        />
      )}
    </div>
  );
}
