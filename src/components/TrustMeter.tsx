import { useGame } from "../store";
import { trustZone } from "../lib/game";
import { microcopy } from "../content/microcopy";

const zoneCopy = microcopy.meterStates;

function zoneLabel(zone: ReturnType<typeof trustZone>) {
  return zone === "avoidant"
    ? zoneCopy.avoidant
    : zone === "overreliant"
    ? zoneCopy.overreliant
    : zoneCopy.calibrated;
}

export function TrustMeter({
  variant = "compact",
}: {
  variant?: "compact" | "full";
}) {
  const trust = useGame((s) => s.trust);
  const zone = trustZone(trust);
  const copy = zoneLabel(zone);
  const pct = ((trust + 5) / 10) * 100;
  const valueText = `${copy.label} — ${copy.help}`;

  // Track: amber (avoidant) → green (calibrated) → amber (over-reliant)
  const trackBg =
    "linear-gradient(90deg, #F3E2C8 0%, #DDEFE0 35%, #C7E6CE 50%, #DDEFE0 65%, #F3E2C8 100%)";

  if (variant === "compact") {
    return (
      <div
        className="flex items-center gap-2"
        role="meter"
        aria-valuemin={-5}
        aria-valuemax={5}
        aria-valuenow={trust}
        aria-valuetext={valueText}
        aria-label={microcopy.map.meterLabel}
      >
        <span className="hidden sm:inline text-xs font-medium text-ink/70">
          {microcopy.map.meterLabel}
        </span>
        <div
          className="relative h-2.5 w-24 rounded-full ring-1 ring-hairline"
          style={{ background: trackBg }}
        >
          {/* calibrated band */}
          <div className="absolute inset-y-0 left-[40%] right-[40%] rounded-full ring-1 ring-brand/30" />
          <div
            className="absolute top-1/2 h-4 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink shadow"
            style={{ left: `${pct}%` }}
          />
        </div>
        <span
          className={
            "text-xs font-semibold " +
            (zone === "calibrated" ? "text-verdict-strong" : "text-accent")
          }
        >
          {copy.label}
        </span>
      </div>
    );
  }

  return (
    <div
      role="meter"
      aria-valuemin={-5}
      aria-valuemax={5}
      aria-valuenow={trust}
      aria-valuetext={valueText}
      aria-label={microcopy.map.meterLabel}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold">{microcopy.map.meterLabel}</span>
        <span
          className={
            "text-sm font-semibold " +
            (zone === "calibrated" ? "text-verdict-strong" : "text-accent")
          }
        >
          {copy.label}
        </span>
      </div>
      <div
        className="relative h-4 w-full rounded-full ring-1 ring-hairline"
        style={{ background: trackBg }}
      >
        <div className="absolute inset-y-0 left-[40%] right-[40%] rounded-full ring-1 ring-brand/40" />
        <div
          className="absolute top-1/2 h-6 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink shadow"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink/60">
        <span>Avoidant</span>
        <span>Calibrated</span>
        <span>Over-reliant</span>
      </div>
      <p className="mt-2 text-sm text-ink/80">{copy.help}</p>
    </div>
  );
}
