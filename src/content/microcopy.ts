// UI microcopy — Week 2 content pack. Single source of truth for chrome strings.

export const microcopy = {
  welcome: {
    headline: "Five days. One AI agent. Your judgement.",
    sub: "Ava has been upgraded — it no longer just writes, it sends, buys, books, and deletes. Learn to manage AI that acts: set boundaries, verify what it did, and stay in charge. Six short missions, about 30 minutes in total.",
    howItWorks: [
      "Make real workplace choices",
      "See the consequences compound",
      "Build judgement you can use today",
    ],
    cta: "Start Monday",
    resume: "Continue where you left off",
  },
  map: {
    lockedPrefix: "Unlocks after",
    completedReplay: "Replay",
    bestPoints: "Best",
    meterLabel: "Calibrated trust",
  },
  meterStates: {
    avoidant: {
      label: "Avoidant",
      help: "You may be leaving safe, useful agent help unused.",
    },
    calibrated: {
      label: "Calibrated",
      help: "The ideal zone — delegating where it is safe, gating where it is not. The zone is narrower now that Ava can act.",
    },
    overreliant: {
      label: "Over-reliant",
      help: "You may be letting the agent act where a human should decide.",
    },
  },
  verdicts: {
    strong: "Strong choice",
    acceptable: "Acceptable — here is what would be stronger",
    risky: "Risky — here is why",
    unsafe: "Unsafe — here is what happens",
  },
  retry: "Try this decision again (partial points)",
  continue: "Continue",
  reflection: {
    heading: "Thirty seconds here makes the rest stick.",
    placeholder:
      "A sentence or two — for you, not for us. This stays on your device.",
    skip: "Skip for now",
    afterLabel: "Here is one way to think about it:",
  },
  debrief: {
    titlePrefix: "What",
    titleSuffix: "was really about",
    pointsLine: (n: number) => `+${n} Judgement points`,
    nextPrefix: "On to",
    finalCta: "Take the Friday Review",
    backToMap: "Back to the map",
  },
  empty: {
    resume: (mission: string, x: number, y: number) =>
      `Welcome back — you were on ${mission}, decision ${x} of ${y}. Pick up where you left off?`,
    resetConfirm:
      "This deletes all progress, scores and reflections stored in this browser. Nothing was ever sent anywhere — there is nothing to delete elsewhere.",
    glossaryEmpty:
      "No matches. Try a shorter word, or browse the A–Z list below.",
  },
  results: {
    high: {
      title: "Agent-Ready.",
      body: "You understand the difference between text and action, set boundaries before delegating, check the audit trail, and hold yourself accountable. That is the whole skill.",
    },
    mid: {
      title: "Nearly there.",
      body: "Your agent judgement held up well. Revisit your weakest area and try the review again — it re-draws different questions each time.",
    },
    low: {
      title: "Worth a second pass.",
      body: "The missions are short. Replay the ones that gave you trouble; the review will be here, with fresh questions.",
    },
  },
} as const;
