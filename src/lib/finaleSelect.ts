import type { ConceptTag, FinaleItem } from "../types";
import { finalePool } from "../content/finale";

const ALL_TAGS: ConceptTag[] = [
  "agent-vs-chatbot",
  "permission-scope",
  "cost-escalation",
  "autonomy-level",
  "delegation-vs-abdication",
  "audit-trail",
  "irreversibility",
  "rule-conflict",
  "accountability",
  "cross-retrieval",
];

// Deterministic PRNG so a given seed reproduces the same draw (supports resume),
// while a fresh seed on replay re-draws different questions.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Draw `count` items, guaranteeing at least one per concept tag. */
export function selectFinaleItems(seed: number, count = 10): FinaleItem[] {
  const rng = mulberry32(seed);
  const pool = shuffle(finalePool, rng);
  const chosen: FinaleItem[] = [];
  const chosenIds = new Set<string>();

  // 1) one per tag
  for (const tag of ALL_TAGS) {
    const pick = pool.find(
      (it) => !chosenIds.has(it.id) && it.tags.includes(tag)
    );
    if (pick) {
      chosen.push(pick);
      chosenIds.add(pick.id);
    }
  }
  // 2) fill remaining
  for (const it of pool) {
    if (chosen.length >= count) break;
    if (!chosenIds.has(it.id)) {
      chosen.push(it);
      chosenIds.add(it.id);
    }
  }
  return shuffle(chosen.slice(0, count), rng);
}
