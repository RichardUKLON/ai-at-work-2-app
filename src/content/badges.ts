import type { Badge } from "../types";

// Six badges — Week 2 specification §2.3. Medallion PNGs from the prompt sheet
// (B2-*) with a Lucide fallback if an image is missing.

export const badges: Badge[] = [
  {
    id: "tool-time",
    name: "Tool Time",
    earnedHow: "Complete Mission 1.",
    toast: "Ava has hands now. You know what changed — and what to lock down.",
    icon: "Wrench",
    image: "assets/illustrations/B2-1-badge-tool-time.png",
  },
  {
    id: "cost-controller",
    name: "Cost Controller",
    earnedHow: "Avoid every Unsafe choice in Mission 2 and flag every cost risk.",
    toast: "You stopped the runaway and set the limits. £312 stayed £0.",
    icon: "CircleDollarSign",
    image: "assets/illustrations/B2-2-badge-cost-controller.png",
  },
  {
    id: "boundary-setter",
    name: "Boundary Setter",
    earnedHow: "Match every task to the right permission level in Mission 3.",
    toast: "Read-only, ask-first, autonomous — you put each task where it belongs.",
    icon: "SlidersHorizontal",
    image: "assets/illustrations/B2-3-badge-boundary-setter.png",
  },
  {
    id: "auditor",
    name: "Auditor",
    earnedHow: "Spot every suspicious action in Mission 4's log.",
    toast: "Nothing slipped past the log on your watch.",
    icon: "Eye",
    image: "assets/illustrations/B2-4-badge-auditor.png",
  },
  {
    id: "accountable",
    name: "Accountable",
    earnedHow: "Finish Mission 5 with the Trust Meter in the calibrated zone.",
    toast: "The agent acts; you stay responsible. That never changes.",
    icon: "Gauge",
    image: "assets/illustrations/B2-5-badge-accountable.png",
  },
  {
    id: "agent-ready",
    name: "Agent-Ready",
    earnedHow: "Score 80%+ in the Friday Review: Agent Edition.",
    toast: "Action, cost, responsibility — you manage all three.",
    icon: "Compass",
    image: "assets/illustrations/B2-6-badge-agent-ready.png",
  },
];

export const badgeById = Object.fromEntries(
  badges.map((b) => [b.id, b])
) as Record<string, Badge>;
