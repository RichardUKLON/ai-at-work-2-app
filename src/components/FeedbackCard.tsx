import { useEffect, useRef } from "react";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  OctagonX,
  XCircle,
  ArrowDown,
  type LucideIcon,
} from "lucide-react";
import type { Verdict, CascadeStep } from "../types";
import { RichText } from "./RichText";
import { microcopy } from "../content/microcopy";

export type Tone = Verdict | "correct" | "incorrect" | "info";

const toneConfig: Record<
  Tone,
  { icon: LucideIcon; ring: string; chip: string; text: string }
> = {
  strong: { icon: CheckCircle2, ring: "border-verdict-strong/40", chip: "bg-verdict-strong/10 text-verdict-strong", text: "text-verdict-strong" },
  correct: { icon: CheckCircle2, ring: "border-verdict-strong/40", chip: "bg-verdict-strong/10 text-verdict-strong", text: "text-verdict-strong" },
  acceptable: { icon: Info, ring: "border-verdict-acceptable/40", chip: "bg-verdict-acceptable/10 text-verdict-acceptable", text: "text-verdict-acceptable" },
  info: { icon: Info, ring: "border-verdict-acceptable/40", chip: "bg-verdict-acceptable/10 text-verdict-acceptable", text: "text-verdict-acceptable" },
  risky: { icon: AlertTriangle, ring: "border-verdict-risky/40", chip: "bg-verdict-risky/10 text-verdict-risky", text: "text-verdict-risky" },
  incorrect: { icon: XCircle, ring: "border-verdict-risky/40", chip: "bg-verdict-risky/10 text-verdict-risky", text: "text-verdict-risky" },
  unsafe: { icon: OctagonX, ring: "border-verdict-unsafe/40", chip: "bg-verdict-unsafe/10 text-verdict-unsafe", text: "text-verdict-unsafe" },
};

function CascadeTimeline({ steps }: { steps: CascadeStep[] }) {
  return (
    <ol className="mt-3 space-y-0">
      {steps.map((s, i) => (
        <li key={i} className="relative pl-6">
          {i < steps.length - 1 && (
            <span className="absolute left-[7px] top-5 bottom-0 w-px bg-accent/40" aria-hidden />
          )}
          <span
            className={
              "absolute left-0 top-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full " +
              (s.irreversible ? "bg-[#C2410C]" : "bg-accent")
            }
            aria-hidden
          />
          <div className="pb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {s.label}
              {s.irreversible && (
                <span className="ml-2 rounded bg-[#C2410C]/15 px-1.5 py-0.5 text-[0.65rem] font-bold text-[#C2410C]">
                  irreversible
                </span>
              )}
            </p>
            <p className="mt-0.5 text-[0.92rem] leading-relaxed text-ink/90">
              <RichText text={s.detail} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function FeedbackCard({
  tone,
  heading,
  body,
  consequence,
  onRetry,
  onContinue,
  continueLabel = microcopy.continue,
}: {
  tone: Tone;
  heading: string;
  body: string;
  consequence?: { title: string; scene: string; spot?: string; cascade?: CascadeStep[] };
  onRetry?: () => void;
  onContinue: () => void;
  continueLabel?: string;
}) {
  const cfg = toneConfig[tone];
  const Icon = cfg.icon;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onContinue();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue]);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="group"
      aria-live="polite"
      className={`animate-slideIn rounded-xl border ${cfg.ring} bg-surface p-4 shadow-card outline-none sm:p-5`}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full ${cfg.chip}`}>
          <Icon size={18} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className={`font-semibold ${cfg.text}`}>{heading}</p>
          <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/90">
            <RichText text={body} />
          </p>

          {consequence && (
            <div className="mt-3 rounded-lg border border-[#C2410C]/25 bg-[#C2410C]/5 p-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-[#C2410C]">
                <ArrowDown size={15} aria-hidden /> {consequence.title}
              </p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/90">
                <RichText text={consequence.scene} />
              </p>
              {consequence.cascade && consequence.cascade.length > 0 && (
                <CascadeTimeline steps={consequence.cascade} />
              )}
              {consequence.spot && (
                <img
                  src={consequence.spot}
                  alt=""
                  className="mt-3 w-full max-w-[220px] rounded-lg border border-hairline"
                  loading="lazy"
                />
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onContinue}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {continueLabel}
            </button>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="rounded-lg border border-hairline bg-canvas px-4 py-2 text-sm font-medium text-ink hover:border-brand/40"
              >
                {microcopy.retry}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
