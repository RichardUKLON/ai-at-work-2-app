import { useState } from "react";
import type { Step } from "../../types";
import type { StepProps } from "./stepTypes";
import { RichText } from "../RichText";
import { FeedbackCard } from "../FeedbackCard";
import { sortScore } from "../../lib/game";

type SortT = Extract<Step, { kind: "sort" }>;

export function SortStep({ step, onComplete }: StepProps<SortT>) {
  const [assign, setAssign] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const labelFor = (id: string) =>
    step.buckets.find((b) => b.id === id)?.label ?? id;

  const allAssigned = step.cards.every((c) => assign[c.id]);
  const correctCount = step.cards.filter((c) => assign[c.id] === c.correct).length;
  const points = sortScore(correctCount, step.cards.length);

  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] leading-relaxed">
        <RichText text={step.situation} />
      </p>

      <ul className="space-y-3">
        {step.cards.map((c) => {
          const picked = assign[c.id];
          const showResult = checked;
          const isRight = picked === c.correct;
          return (
            <li
              key={c.id}
              className={
                "rounded-xl border p-3 shadow-card " +
                (showResult
                  ? isRight
                    ? "border-verdict-strong/50 bg-verdict-strong/5"
                    : "border-verdict-unsafe/50 bg-verdict-unsafe/5"
                  : "border-hairline bg-surface")
              }
            >
              <p className="text-[0.95rem]">
                <RichText text={c.text} />
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="group">
                {step.buckets.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    disabled={checked}
                    aria-pressed={picked === b.id}
                    onClick={() => setAssign((a) => ({ ...a, [c.id]: b.id }))}
                    className={
                      "rounded-lg border px-3 py-1.5 text-sm font-medium transition " +
                      (picked === b.id
                        ? "border-brand bg-brand text-white"
                        : "border-hairline bg-canvas hover:border-brand/40")
                    }
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              {showResult && (
                <p className="mt-2 text-sm text-ink/80">
                  {!isRight && (
                    <span className="font-semibold text-verdict-unsafe">
                      Better: {labelFor(c.correct)}.{" "}
                    </span>
                  )}
                  <RichText text={c.feedback} />
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {!checked ? (
        <button
          type="button"
          disabled={!allAssigned}
          onClick={() => setChecked(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Check my sorting
        </button>
      ) : (
        <FeedbackCard
          tone={points === 3 ? "strong" : points > 0 ? "acceptable" : "risky"}
          heading={`${correctCount} of ${step.cards.length} sorted well`}
          body={step.wrap ?? ""}
          onContinue={() =>
            onComplete({ points, sortPerfect: correctCount === step.cards.length })
          }
        />
      )}
    </div>
  );
}
