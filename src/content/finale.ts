import type { FinaleItem } from "../types";

// Mission 6 — The Friday Review: Agent Edition. Pool of 20 items (Week 2
// content pack AR-01…AR-20). The app draws 10 at play time with
// at-least-one-per-concept coverage, order randomised.

export const finaleBrief =
  "Friday finish. Sam wants to know: are you ready to work with Ava Pro unsupervised? Ten situations from your week. No new lessons — just your judgement.";

export const finalePool: FinaleItem[] = [
  {
    id: "AR-01",
    tags: ["agent-vs-chatbot"],
    kind: "mc",
    prompt:
      "A colleague says: “Ava Pro is just Ava with more features. What's the big deal?” What are they missing?",
    options: [
      { id: "a", text: "An agent takes action in the world, not just text — so mistakes have consequences beyond what gets written.", correct: true },
      { id: "b", text: "The features are simply better.", correct: false },
      { id: "c", text: "Agents are faster.", correct: false },
    ],
    feedback:
      "Same underlying AI, different class of risk. A chatbot writes text; an agent sends email, deletes files, spends money.",
  },
  {
    id: "AR-02",
    tags: ["permission-scope"],
    kind: "spotTheRisk",
    situation:
      "Permissions for an assistant whose job is “draft and file reports”. Flag the over-permissions.",
    artefact: {
      kind: "permissionSettings",
      title: "Ava Pro · permissions",
      rows: [
        { permission: "Read the reports folder", setting: "ON" },
        { permission: "Send emails", setting: "ON" },
        { permission: "Delete files", setting: "ON" },
        { permission: "Modify shared documents", setting: "ON" },
      ],
    },
    flaggables: [
      { id: "del", label: "Delete files", risky: true, feedback: "Highest-risk power, not needed to draft and file." },
      { id: "mod", label: "Modify shared documents", risky: true, feedback: "Filing does not require editing other people's documents." },
      { id: "read", label: "Read the reports folder", risky: false, feedback: "Scoped and necessary — fine." },
      { id: "send", label: "Send emails", risky: false, feedback: "Needed, with a review step on external sends." },
    ],
    feedback:
      "Grant the minimum the role needs. Delete and modify are exactly the powers a “draft and file” job does not require.",
  },
  {
    id: "AR-03",
    tags: ["cost-escalation"],
    kind: "mc",
    prompt:
      "Ava spent £516 on research because nobody set a budget. What single control would have stopped it at £0?",
    options: [
      { id: "a", text: "A “maximum spend: £0 on paid sources” rule.", correct: true },
      { id: "b", text: "A faster agent model.", correct: false },
      { id: "c", text: "Telling Ava to “be careful with money”.", correct: false },
    ],
    feedback:
      "Hard boundaries prevent problems; “be careful” gets read as “do your best”, which is what caused the spend.",
  },
  {
    id: "AR-04",
    tags: ["autonomy-level"],
    kind: "sort",
    situation: "Which autonomy level fits this task?",
    buckets: [
      { id: "read", label: "Read-only" },
      { id: "ask", label: "Ask first" },
      { id: "auto", label: "Autonomous" },
    ],
    card: {
      id: "c",
      text: "“Ava, draft a response to this RFP and send it to the team for review.”",
      correct: "ask",
      feedback: "Drafting is fine; the send to colleagues should wait for your approval. Ask-first.",
    },
    feedback:
      "Ask-first: the difference from autonomous is whether the task has fixed rules the agent can apply without a judgement call.",
  },
  {
    id: "AR-05",
    tags: ["delegation-vs-abdication"],
    kind: "mc",
    prompt: "Which describes abdication, not delegation?",
    options: [
      { id: "a", text: "“I set Ava to handle all my inbox. I don't look at it anymore.”", correct: true },
      { id: "b", text: "“I ask Ava to draft replies and I approve them at lunch.”", correct: false },
      { id: "c", text: "“I turned off autonomous send for external email.”", correct: false },
    ],
    feedback:
      "The line is the review step. Stop looking at what the agent does on your behalf and you have moved from delegation to abdication.",
  },
  {
    id: "AR-06",
    tags: ["audit-trail"],
    kind: "spotTheRisk",
    situation: "An action log. Flag the entries that need investigating.",
    artefact: {
      kind: "actionLog",
      title: "Ava · log",
      entries: [
        { time: "09:04", action: "Searched project files" },
        { time: "09:11", action: "Opened report.docx" },
        { time: "09:20", action: "Deleted folder marked “archive”", flagged: true },
        { time: "09:33", action: "Modified a calendar entry for a meeting you are not hosting", flagged: true },
        { time: "09:41", action: "Saved meeting notes" },
        { time: "09:50", action: "Searched the team wiki" },
      ],
    },
    flaggables: [
      { id: "del", label: "Deleted the “archive” folder", risky: true, feedback: "No instruction to delete anything." },
      { id: "cal", label: "Changed someone else's meeting", risky: true, feedback: "An unsolicited change to another person's calendar." },
      { id: "search", label: "Searched project files", risky: false, feedback: "Routine, read-only." },
      { id: "notes", label: "Saved meeting notes", risky: false, feedback: "Routine." },
    ],
    feedback:
      "Deletions and changes to other people's events are automatic flags — anything affecting something outside your own work queue.",
  },
  {
    id: "AR-07",
    tags: ["irreversibility"],
    kind: "sort",
    situation: "How recoverable is this action?",
    buckets: [
      { id: "rollback", label: "Rollback possible" },
      { id: "cleanup", label: "Rollback with clean-up" },
      { id: "escalate", label: "Irreversible — escalate" },
    ],
    card: {
      id: "c",
      text: "Ava sent a draft contract to the wrong vendor.",
      correct: "escalate",
      feedback: "The document has left your control — a containment-and-disclosure matter, not a roll-back.",
    },
    feedback:
      "The test is not “can I undo it in the system?” but “has this left my control?”",
  },
  {
    id: "AR-08",
    tags: ["rule-conflict"],
    kind: "mc",
    prompt:
      "Two rules are active: “When a proposal is updated, email the client” and “All external emails need human approval before sending.” The proposal is updated. What happens?",
    options: [
      { id: "a", text: "Ava tries to send, but the second rule blocks it — the conflict surfaces as a pending approval request you can see and decide.", correct: true },
      { id: "b", text: "The second rule overrides the first and nothing happens.", correct: false },
      { id: "c", text: "Ava finds a workaround to bypass the gate.", correct: false },
    ],
    feedback:
      "Rule conflicts are good — they force the decision to a human. Layered constraints beat one “perfect” rule.",
  },
  {
    id: "AR-09",
    tags: ["accountability"],
    kind: "mc",
    prompt: "“The agent sent it to the wrong person.” Who is accountable?",
    options: [
      { id: "a", text: "The person who set the task and chose whether to review the output.", correct: true },
      { id: "b", text: "The agent.", correct: false },
      { id: "c", text: "The person who built the agent.", correct: false },
    ],
    feedback:
      "The person who deploys the tool owns the outcome. There is no version of “the AI did it” that transfers responsibility.",
  },
  {
    id: "AR-10",
    tags: ["cross-retrieval"],
    kind: "mc",
    prompt:
      "Ava Pro extracts three statistics and builds a slide. One looks plausible but you don't recognise it from the source. What do you do?",
    options: [
      { id: "a", text: "Verify the number against the original document — the action is fine, the content still needs checking like any AI output.", correct: true },
      { id: "b", text: "Assume Ava Pro is more accurate than basic Ava.", correct: false },
      { id: "c", text: "Delete the whole slide.", correct: false },
    ],
    feedback:
      "The ~hallucination~ risk has not gone away — it is now wrapped in a tool that can also send the invented figure to someone.",
  },
  {
    id: "AR-11",
    tags: ["cost-escalation"],
    kind: "mc",
    prompt: "You set a £50 budget for an agent research task. It spends £48. How should you feel?",
    options: [
      { id: "a", text: "Good — the control did its job; it hit the boundary and stopped.", correct: true },
      { id: "b", text: "Annoyed — it nearly hit the limit.", correct: false },
      { id: "c", text: "Worried — it spent money at all.", correct: false },
    ],
    feedback:
      "A budget nearly reached is a budget that worked. The problem case is the one with no budget that spent £516.",
  },
  {
    id: "AR-12",
    tags: ["cross-retrieval"],
    kind: "mc",
    prompt:
      "Jonas wants you to paste client financial data into Ava Pro “because it's better now”. Your response?",
    options: [
      { id: "a", text: "Check whether Ava Pro is approved for ~confidential data~ — the underlying AI is the same, so the approval status has not changed.", correct: true },
      { id: "b", text: "If it's the same company tool, it's fine.", correct: false },
      { id: "c", text: "It must be more secure now that it's upgraded.", correct: false },
    ],
    feedback:
      "The upgrade adds capabilities, not approvals. Check the tool is cleared for this data class before pasting.",
  },
  {
    id: "AR-13",
    tags: ["autonomy-level"],
    kind: "mc",
    prompt: "Which autonomous rule is the riskiest?",
    options: [
      { id: "a", text: "“Book a meeting room when the standup lands on a public holiday, and notify the team.”", correct: true },
      { id: "b", text: "“If the printer is low on toner, email facilities.”", correct: false },
      { id: "c", text: "“If a file hasn't been opened in 6 months, tag it for review.”", correct: false },
    ],
    feedback:
      "Booking a physical resource takes something out of circulation — higher risk than a notification with no commitment.",
  },
  {
    id: "AR-14",
    tags: ["delegation-vs-abdication"],
    kind: "mc",
    prompt:
      "You're on holiday; Ava handles routine emails autonomously. Day 3 you see 47 sent and feel uneasy. What should you have done before leaving?",
    options: [
      { id: "a", text: "Defined exactly what “routine” means — which topics, which senders — and a hard rule that nothing external goes without approval.", correct: true },
      { id: "b", text: "Told Ava to “handle things while I'm away”.", correct: false },
      { id: "c", text: "Left it — 47 with no complaints proves it works.", correct: false },
    ],
    feedback:
      "“Handle things” is the most dangerous instruction to give an agent while you are not there to review.",
  },
  {
    id: "AR-15",
    tags: ["cross-retrieval"],
    kind: "mc",
    prompt:
      "Ava Pro screens CVs and ranks the same candidates as before, with the same skew toward conventional career histories. What does that tell you?",
    options: [
      { id: "a", text: "The new powers haven't changed the underlying ~bias~ — the same lesson applies: AI may inform a decision about people, not make it.", correct: true },
      { id: "b", text: "The upgrade must have failed.", correct: false },
      { id: "c", text: "Run it again with different settings.", correct: false },
    ],
    feedback:
      "Agents add capabilities, not wisdom. A biased AI with send access just spreads its bias to more people.",
  },
  {
    id: "AR-16",
    tags: ["audit-trail"],
    kind: "mc",
    prompt: "You open the action log at 17:00 and see 73 entries, with 10 minutes. How do you review them?",
    options: [
      { id: "a", text: "Scan for external contacts, deletions, money, and calendar changes — the high-risk categories — and spot-check the rest.", correct: true },
      { id: "b", text: "Read every entry.", correct: false },
      { id: "c", text: "Trust that someone would have flagged a problem.", correct: false },
    ],
    feedback:
      "Risk-based triage is the only sustainable approach at scale. Flag the high-risk action types; skim the rest.",
  },
  {
    id: "AR-17",
    tags: ["cross-retrieval"],
    kind: "mc",
    prompt:
      "Ava Pro keeps misreading your instructions and taking wrong actions. Best move?",
    options: [
      { id: "a", text: "Use the Context-Task-Constraints-Format ~prompt~ pattern, and add a permission gate: “take no irreversible action without showing me first”.", correct: true },
      { id: "b", text: "Stop using Ava Pro entirely.", correct: false },
      { id: "c", text: "Just write longer instructions.", correct: false },
    ],
    feedback:
      "Good prompting plus a permission gate equals safe delegation — the gate is the new part for agents.",
  },
  {
    id: "AR-18",
    tags: ["accountability"],
    kind: "mc",
    prompt:
      "An agent cost £2,000 by subscribing to services during research. The person who set the task says “I didn't authorise that spend.” Who is accountable?",
    options: [
      { id: "a", text: "The person who set the task — they chose not to set a budget before running it.", correct: true },
      { id: "b", text: "The agent — it spent the money.", correct: false },
      { id: "c", text: "The company, for not building better controls.", correct: false },
    ],
    feedback:
      "The £2,000 is the consequence of setting a task without boundaries. Tools do not authorise; people do — by omission if not instruction.",
  },
  {
    id: "AR-19",
    tags: ["rule-conflict"],
    kind: "mc",
    prompt:
      "Two rules: “If an email says ‘complaint’, escalate to the manager” and “Summarise all incoming email and file it.” What could go wrong?",
    options: [
      { id: "a", text: "A complaint gets summarised and filed while the escalation fires on the original — the manager may never see it. Rule interactions are hard to predict.", correct: true },
      { id: "b", text: "Nothing — both rules are sensible.", correct: false },
      { id: "c", text: "Ava will pick whichever rule is better.", correct: false },
    ],
    feedback:
      "Two rules that each make sense alone can collide on the same item. This is why periodic rule audits matter.",
  },
  {
    id: "AR-20",
    tags: ["cross-retrieval", "accountability"],
    kind: "mc",
    prompt: "Sam asks for one sentence summarising everything you've learned about Ava. Best answer?",
    options: [
      { id: "a", text: "“Ava predicts text, not truth — and when that text becomes an action, the risk compounds, the cost can escalate, and the responsibility never leaves your name.”", correct: true },
      { id: "b", text: "“AI is useful but risky.”", correct: false },
      { id: "c", text: "“Just learning not to trust AI.”", correct: false },
    ],
    feedback:
      "What Ava says might be wrong; what Ava does with that wrong text has real-world consequences. Either way, the person who uses the tool owns the outcome.",
  },
];
