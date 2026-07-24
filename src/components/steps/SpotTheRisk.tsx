import { useState } from "react";
import { Flag } from "lucide-react";
import type { Step } from "../../types";
import type { StepProps } from "./stepTypes";
import { RichText } from "../RichText";
import { ArtefactRenderer } from "../ArtefactRenderer";
import { FeedbackCard } from "../FeedbackCard";
import { spotScore } from "../../lib/game";

type SpotT = Extract<Step, { kind: "spotTheRisk" }>;

export function SpotTheRisk({ step, onComplete }: StepProps<SpotT>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const result = spotScore(selected, step.flaggables);

  return (
    <div className="space-y-4">
      <p className="text-[1.05rem] leading-relaxed">
        <RichText text={step.situation} />
      </p>

      <ArtefactRenderer artefact={step.artefact} />

      <fieldset className="space-y-2" disabled={checked}>
        <legend className="mb-1 text-sm font-semibold text-ink/70">
          {step.legend ?? "Flag the elements that deserve a check"}
        </legend>
        {step.flaggables.map((f) => {
          const on = selected.has(f.id);
          const showResult = checked;
          const correct = on === f.risky;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(f.id)}
              className={
                "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-[0.95rem] transition " +
                (showResult
                  ? correct
                    ? "border-verdict-strong/50 bg-verdict-strong/5"
                    : "border-verdict-unsafe/50 bg-verdict-unsafe/5"
                  : on
                  ? "border-brand bg-brand/10"
                  : "border-hairline bg-surface hover:border-brand/40")
              }
            >
              <span
                className={
                  "mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded border " +
                  (on
                    ? "border-brand bg-brand text-white"
                    : "border-hairline bg-canvas text-transparent")
                }
              >
                <Flag size={12} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block">
                  <RichText text={f.label} />
                </span>
                {showResult && (
                  <span className="mt-1 block text-sm text-ink/80">
                    <RichText text={f.feedback} />
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </fieldset>

      {!checked ? (
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Check my flags
        </button>
      ) : (
        <FeedbackCard
          tone={result.perfect ? "strong" : result.points > 0 ? "acceptable" : "risky"}
          heading={
            result.perfect
              ? "Strong — you caught every one"
              : result.points > 0
              ? "Close — one slipped"
              : "Some went unflagged"
          }
          body={step.wrap}
          onContinue={() =>
            onComplete({ points: result.points, spotPerfect: result.perfect })
          }
        />
      )}
    </div>
  );
}
