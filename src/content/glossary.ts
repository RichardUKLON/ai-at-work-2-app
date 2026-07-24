import type { GlossaryEntry } from "../types";

// Glossary — Week 2 specification §7. Foundational terms (carried so the
// experience is self-contained) plus the agent-specific additions.

export const glossary: GlossaryEntry[] = [
  // ----- Foundations -----
  {
    id: "ai",
    term: "AI (artificial intelligence)",
    group: "Foundations",
    definition:
      "Software that performs tasks that normally need human thinking, such as writing, summarising, or answering questions.",
    atWork:
      "Ava drafts and summarises in seconds — but it predicts likely text, it does not truly know things.",
    related: ["prompt", "hallucination"],
  },
  {
    id: "prompt",
    term: "Prompt",
    group: "Foundations",
    definition:
      "The instruction you give an AI tool. A good one gives context, the task, constraints, and a format.",
    atWork:
      "The agent version of a good prompt also adds a permission gate: “show me before you send”.",
    related: ["agent", "human-in-the-loop"],
  },
  {
    id: "hallucination",
    term: "Hallucination",
    group: "Foundations",
    definition:
      "When an AI produces information that sounds plausible but is false or invented — a statistic, quote, or source that does not exist.",
    atWork:
      "An agent can now act on a hallucination — sending the invented figure to a client, not just showing it to you.",
    related: ["verification"],
  },
  {
    id: "verification",
    term: "Verification",
    group: "Foundations",
    definition:
      "Checking AI output before relying on it: confirm facts and sources independently, and review what an agent actually did.",
    atWork:
      "For agents, verification moves from “is this text right?” to “is this action right?”.",
    related: ["action-log", "hallucination"],
  },
  {
    id: "bias",
    term: "Bias",
    group: "Foundations",
    definition:
      "Unfair patterns in AI outputs, learned from patterns in its training data. An agent with more reach spreads them further.",
    atWork:
      "A biased ranking is worse when an agent can also email the result to everyone.",
    related: ["accountability"],
  },
  {
    id: "confidential-data",
    term: "Confidential data",
    group: "Foundations",
    definition:
      "Information that must not leave approved channels — client data, personal details, financial figures, unannounced plans.",
    atWork:
      "An agent with broad file access can read confidential folders it has no reason to touch.",
    related: ["permission-scope", "approved-tool"],
  },
  {
    id: "approved-tool",
    term: "Approved tool",
    group: "Foundations",
    definition:
      "A tool your organisation has checked and authorised for particular kinds of work and data.",
    atWork:
      "An upgrade adds capabilities, not approvals — check the tool is still cleared for the data.",
    related: ["confidential-data"],
  },

  // ----- Agent -----
  {
    id: "agent",
    term: "Agent",
    group: "Agent",
    definition:
      "An AI system that does not just generate text but takes action — sending messages, updating files, making changes.",
    atWork:
      "A chatbot writes a draft email; an agent sends it. The action is already in the world.",
    related: ["tool-use", "permission-scope"],
  },
  {
    id: "tool-use",
    term: "Tool use",
    group: "Agent",
    definition:
      "An agent's ability to interact with external systems — reading emails, writing to files, calling a service.",
    atWork:
      "Each tool is a capability that can be right or wrong in ways that matter.",
    related: ["agent", "permission-scope"],
  },
  {
    id: "permission-scope",
    term: "Permission scope",
    group: "Agent",
    definition:
      "The specific actions and data an agent is allowed to access. The rule: grant the minimum needed for the task.",
    atWork:
      "A “find and send” task does not need delete access. Turn off what it does not need.",
    related: ["agent", "human-in-the-loop"],
  },
  {
    id: "autonomy-level",
    term: "Autonomy level",
    group: "Agent",
    definition:
      "How much freedom an agent has: read-only (look), ask first (suggest, wait), or autonomous (act within rules).",
    atWork:
      "Match the level to the risk — read-only for lookups, ask-first for writes, autonomous only for fixed low-stakes rules.",
    related: ["delegation", "human-in-the-loop"],
  },
  {
    id: "delegation",
    term: "Delegation",
    group: "Agent",
    definition:
      "Assigning a task to an agent while keeping responsibility for the outcome through review.",
    atWork:
      "You delegate the writing; you keep the judgement. The review is the difference.",
    related: ["abdication", "accountability"],
  },
  {
    id: "abdication",
    term: "Abdication",
    group: "Agent",
    definition:
      "Handing a task to an agent without oversight, assuming it will handle it correctly.",
    atWork:
      "“I set it and stopped looking” is abdication — and the outcome is still yours.",
    related: ["delegation", "accountability"],
  },
  {
    id: "action-log",
    term: "Action log (audit trail)",
    group: "Agent",
    definition:
      "A timestamped record of everything an agent has done. The equivalent of an audit trail for AI actions.",
    atWork:
      "Check the log, not just the output — it shows what Ava did, which is often more than you asked.",
    related: ["verification", "irreversibility"],
  },
  {
    id: "cost-creep",
    term: "Cost creep",
    group: "Agent",
    definition:
      "Small autonomous expenditures that add up to a large cost because no single action triggered a review.",
    atWork:
      "Forty-three £12 articles is £516 — set a hard budget before an agent can spend.",
    related: ["human-in-the-loop"],
  },
  {
    id: "human-in-the-loop",
    term: "Human-in-the-loop",
    group: "Agent",
    definition:
      "A design pattern where the agent must pause for human approval before executing certain actions.",
    atWork:
      "A “confirm before sending externally” gate stops a whole class of mistakes.",
    related: ["permission-scope", "governance"],
  },
  {
    id: "cascade",
    term: "Cascade",
    group: "Agent",
    definition:
      "A chain of agent actions where each one triggers the next, compounding the original instruction's effects.",
    atWork:
      "The earlier you catch an agent error, the cheaper it is — the cost of not looking is the cascade.",
    related: ["action-log", "rule-conflict"],
  },
  {
    id: "rule-conflict",
    term: "Rule conflict",
    group: "Agent",
    definition:
      "When two standing rules — or a rule and an instruction — interact to produce an unintended action.",
    atWork:
      "“Save the proposal” plus a standing “on save, email the client” rule sends a draft nobody approved.",
    related: ["governance", "cascade"],
  },
  {
    id: "irreversibility",
    term: "Irreversibility",
    group: "Agent",
    definition:
      "A property of some agent actions: once taken, they cannot be undone — like an email to a client.",
    atWork:
      "If an action leaves the company or destroys something, treat it as irreversible until you confirm otherwise.",
    related: ["escalation", "action-log"],
  },
  {
    id: "accountability",
    term: "Accountability",
    group: "Agent",
    definition:
      "The principle that the person who set the task is always responsible for the outcome, whatever tool executed it.",
    atWork:
      "“The agent did it” is no more a defence than “the spreadsheet did it”.",
    related: ["delegation", "governance"],
  },

  // ----- Good Practice -----
  {
    id: "governance",
    term: "Governance",
    group: "Good Practice",
    definition:
      "Team-level rules and review practices that keep agent use safe — approval gates and periodic rule audits.",
    atWork:
      "External communications always pass through a named human approver.",
    related: ["human-in-the-loop", "accountability"],
  },
  {
    id: "escalation",
    term: "Escalation",
    group: "Good Practice",
    definition:
      "Passing a risk or out-of-scope case to a qualified person instead of letting the agent's action stand.",
    atWork:
      "A contract emailed to the wrong supplier is a containment-and-disclosure matter, not a “roll back” one.",
    related: ["irreversibility"],
  },
];

export const glossaryById = Object.fromEntries(
  glossary.map((g) => [g.id, g])
) as Record<string, GlossaryEntry>;
