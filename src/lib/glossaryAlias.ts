// Maps the display text inside ~…~ markers to a glossary entry id.

const alias: Record<string, string> = {
  // foundations
  ai: "ai",
  prompt: "prompt",
  hallucination: "hallucination",
  verification: "verification",
  bias: "bias",
  "confidential data": "confidential-data",
  "approved tool": "approved-tool",
  // agent
  agent: "agent",
  "tool use": "tool-use",
  "permission scope": "permission-scope",
  "permission gate": "human-in-the-loop",
  "permission gates": "human-in-the-loop",
  "permission boundary": "permission-scope",
  "autonomy level": "autonomy-level",
  autonomy: "autonomy-level",
  "autonomy spectrum": "autonomy-level",
  delegation: "delegation",
  abdication: "abdication",
  "action log": "action-log",
  "audit trail": "action-log",
  "cost creep": "cost-creep",
  boundary: "cost-creep",
  "human-in-the-loop": "human-in-the-loop",
  cascade: "cascade",
  "rule conflict": "rule-conflict",
  rule: "rule-conflict",
  governance: "governance",
  "oversight model": "governance",
  irreversibility: "irreversibility",
  irreversible: "irreversibility",
  accountability: "accountability",
  escalation: "escalation",
};

export function termToId(display: string): string | null {
  const key = display.trim().toLowerCase().replace(/\s+/g, " ");
  return alias[key] ?? null;
}
