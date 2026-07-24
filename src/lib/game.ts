import type { Verdict } from "../types";

// Scoring & Trust Meter helpers — Week 2 specification §2.3.

export function verdictPoints(verdict: Verdict): number {
  switch (verdict) {
    case "strong":
      return 3;
    case "acceptable":
      return 2;
    default:
      return 0;
  }
}

export const MAX_PER_STEP = 3;

export type TrustZone = "avoidant" | "calibrated" | "overreliant";

/** Trust Meter runs −5…+5. Week 2 narrows the calibrated zone to 0 ± 0.5,
 *  because calibrated trust matters more when the tool can act. */
export function trustZone(value: number): TrustZone {
  if (value <= -1) return "avoidant";
  if (value >= 1) return "overreliant";
  return "calibrated";
}

export function clampTrust(value: number): number {
  return Math.max(-5, Math.min(5, value));
}

/** Spot the Risk scoring: full marks for all risky flagged and no false flags. */
export function spotScore(
  selected: Set<string>,
  flaggables: { id: string; risky: boolean }[]
): { points: number; perfect: boolean } {
  const riskyIds = flaggables.filter((f) => f.risky).map((f) => f.id);
  const missed = riskyIds.filter((id) => !selected.has(id)).length;
  const falseFlags = [...selected].filter(
    (id) => !flaggables.find((f) => f.id === id)?.risky
  ).length;
  const perfect = missed === 0 && falseFlags === 0;
  if (perfect) return { points: 3, perfect: true };
  if (missed + falseFlags === 1) return { points: 2, perfect: false };
  return { points: 0, perfect: false };
}

/** Sort scoring: all correct = 3, some correct = 1, none = 0. */
export function sortScore(correctCount: number, total: number): number {
  if (total === 0) return 0;
  if (correctCount === total) return 3;
  if (correctCount > 0) return 1;
  return 0;
}
