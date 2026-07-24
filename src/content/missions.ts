import type { Mission } from "../types";

// AI at Work 2: The Agent That Acted — Missions 1–5.
// Learner-facing copy from the Week 2 content pack. Mission 6 (the Friday
// Review: Agent Edition) lives in finale.ts. ~term~ markers become glossary
// links at render time.

export const missions: Mission[] = [
  // =====================================================================
  // MISSION 1 — Monday: Ava Gets Hands
  // =====================================================================
  {
    id: "m1",
    day: "Monday",
    title: "Ava Gets Hands",
    themeIcon: "Wrench",
    durationMins: 5,
    hero: "assets/illustrations/H2-1-ava-gets-hands-hero.png",
    badge: "tool-time",
    brief:
      "Monday morning. Good news: Ava has been upgraded. Sam calls it “Ava Pro” — it can now do more than write. It can read your inbox, update documents, send emails, and run on a schedule. First task: use Ava to find the draft of the Halden Group proposal and send it to the client by 10:00.",
    steps: [
      {
        id: "m1s1",
        kind: "recall",
        label: "Warm-up",
        question:
          "Before we look at what has changed, one thing that has not: what is the most important thing to understand about how Ava generates its answers?",
        options: [
          {
            id: "a",
            text: "“It searches a database of verified facts and reports them back.”",
            verdict: "risky",
            feedback:
              "That is what it feels like, but it is not how it works. Ava predicts likely text — it does not query a fact database.",
          },
          {
            id: "b",
            text: "“It predicts the most likely next words from patterns in its training data. It is often right, but it does not truly know things.”",
            verdict: "strong",
            feedback:
              "You have got it. That one idea — predict, do not know — is why Ava can be confidently wrong, and why giving it the power to act introduces a whole new set of risks.",
          },
          {
            id: "c",
            text: "“It thinks and understands like a person, just much faster.”",
            verdict: "risky",
            feedback:
              "Ava is good at sounding like it understands. It does not. That distinction matters more now that Ava can act than it did when it could only write.",
          },
        ],
      },
      {
        id: "m1s2",
        kind: "spotTheRisk",
        label: "Decision 1 of 4 — What changed?",
        situation:
          "You open Ava Pro's settings for the first time. Some of these it could always do; some are brand new.",
        legend: "Select the capabilities that are new to Ava Pro — the ones it could not do before",
        artefact: {
          kind: "notes",
          title: "Ava Pro · capabilities",
          lines: [
            "Ava was upgraded today.",
            "The new powers all have one thing in common — flag them below.",
          ],
        },
        flaggables: [
          { id: "send", label: "Sending emails on your behalf", risky: true, feedback: "New. That email now exists in someone else's inbox." },
          { id: "gen", label: "Generating text from a prompt", risky: false, feedback: "Already there — this is the chatbot Ava you knew." },
          { id: "read", label: "Reading documents you attach", risky: false, feedback: "Already there." },
          { id: "delete", label: "Deleting files from your workspace", risky: true, feedback: "New — and the highest-risk power of all." },
          { id: "schedule", label: "Scheduling meetings and sending invitations", risky: true, feedback: "New. It now changes other people's calendars." },
          { id: "answer", label: "Answering questions about a document", risky: false, feedback: "Already there." },
        ],
        wrap:
          "The new capabilities all change something in the world, not just on the screen. That is what makes an ~agent~ different from a chatbot — and everything it does now leaves a trace that can be right or wrong in ways that matter.",
      },
      {
        id: "m1s3",
        kind: "decision",
        label: "Decision 2 of 4 — The first instruction",
        situation:
          "Sam says: “Find the Halden proposal draft and send it to the client.” How do you instruct Ava?",
        options: [
          {
            id: "a",
            text: "“Find the Halden proposal and send it.”",
            verdict: "risky",
            trustDelta: 2,
            feedback:
              "Ava finds a document with “Halden” in the title — the superseded draft from three weeks ago — and sends it. It cannot tell “the current version” from “any version”. The instruction was ambiguous in a way a person would have caught.",
          },
          {
            id: "b",
            text: "“Search my Documents folder for ‘Halden Group proposal v3’. If you find it, show me the first page before sending.”",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Specific file, specific place, human review before the irreversible step. This is the agent version of a good ~prompt~ — plus a ~permission gate~. The draft saved five minutes; the review cost fifteen seconds.",
          },
          {
            id: "c",
            text: "Write the email yourself. Ava should not send things outside the company.",
            verdict: "acceptable",
            trustDelta: -2,
            feedback:
              "Caution is sensible and external sends do deserve care — but you are leaving the time-saving capability unused. The skill is delegating safely, not refusing to delegate.",
          },
        ],
      },
      {
        id: "m1s4",
        kind: "spotTheRisk",
        label: "Decision 3 of 4 — Spot the permissions",
        situation:
          "You open Ava Pro's permission settings. Some are set correctly for the task. Others are set too broadly.",
        legend: "Select the permissions set too broadly for someone whose job is to find a document and send it",
        artefact: {
          kind: "permissionSettings",
          title: "Ava Pro · permissions",
          rows: [
            { permission: "Email: read incoming messages", setting: "ON" },
            { permission: "Email: send messages", setting: "ON" },
            { permission: "Files: read all folders", setting: "ON" },
            { permission: "Files: delete", setting: "ON" },
            { permission: "Calendar: create events", setting: "OFF" },
            { permission: "Calendar: modify existing events", setting: "ON" },
          ],
        },
        flaggables: [
          { id: "readinbox", label: "Email: read incoming messages", risky: false, feedback: "Reasonable — it needs to find things." },
          { id: "send", label: "Email: send messages", risky: false, feedback: "Needed for the task (with a review step on external sends)." },
          { id: "readall", label: "Files: read all folders", risky: true, feedback: "Too broad. ~Permission scope~ says grant the minimum — scope this to the Projects folder, not HR and legal." },
          { id: "delete", label: "Files: delete", risky: true, feedback: "Why does a find-and-send task need delete? The highest-risk power, granted for no reason." },
          { id: "modcal", label: "Calendar: modify existing events", risky: true, feedback: "Unrelated to the task and able to cause real damage by accident. Turn it off." },
        ],
        wrap:
          "Big permissions, small task. Delete, full-folder read, and calendar changes all go far beyond “find and send a proposal”. The rule: grant the minimum the immediate task needs.",
      },
      {
        id: "m1s5",
        kind: "decision",
        label: "Decision 4 of 4 — Warm-down",
        situation: "Sam checks in. “How did the upgrade feel — different from before?”",
        options: [
          {
            id: "a",
            text: "“It found the document, I previewed it, then approved the send. Same as before but faster.”",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "Balanced and accurate. You named the change (action, not just text) and used it well — specific instruction, review before the irreversible step.",
          },
          {
            id: "b",
            text: "“It sent the wrong version. I'll go back to writing emails myself.”",
            verdict: "acceptable",
            trustDelta: -2,
            feedback:
              "The wrong version went out because the instruction was vague, not because the tool is broken. That same vagueness would once have produced a weak draft — now it produces a wrong action. That is the lesson, not the reason to stop.",
          },
          {
            id: "c",
            text: "“Amazing — it just found and sent everything. I barely had to do anything.”",
            verdict: "unsafe",
            trustDelta: 3,
            feedback:
              "“Barely had to do anything” means you have no idea what Ava actually sent.",
            consequence: {
              title: "By Friday",
              scene:
                "Under the same vague instructions, Ava has sent three more emails — one to the wrong recipient, one with out-of-date pricing, one confirming a meeting nobody asked for. You spend Friday unpicking them.",
            },
          },
        ],
      },
    ],
    reflection: {
      question:
        "What is the difference between asking Ava to draft an email and asking Ava to send one?",
      modelAnswer:
        "When Ava drafts, you review before anything leaves. When Ava sends, the action is already in the world. The question changes from “is this text right?” to “is this action right?” — and a bad send gets forwarded, replied to, and acted on before you notice.",
    },
    takeaways: [
      "An agent is a chatbot that can change things — sending, deleting, creating, modifying.",
      "Permission scope: grant the minimum the task needs; turn the rest off.",
      "A vague prompt produces bad text; a vague instruction to an agent produces a wrong action.",
    ],
    glossaryEchoes: ["agent", "tool-use", "permission-scope"],
  },

  // =====================================================================
  // MISSION 2 — Tuesday: One Click to Rule Them All
  // =====================================================================
  {
    id: "m2",
    day: "Tuesday",
    title: "One Click to Rule Them All",
    themeIcon: "TrendingUp",
    durationMins: 6,
    hero: "assets/illustrations/H2-2-one-click-to-rule-hero.png",
    badge: "cost-controller",
    brief:
      "Sam asks you to use Ava Pro to pull industry benchmarks into a market report for the board. The task seems straightforward. You set Ava running just before lunch.",
    steps: [
      {
        id: "m2w",
        kind: "recall",
        label: "Warm-up recall",
        question:
          "Yesterday you learned the key difference between a chatbot and an agent. What is it?",
        options: [
          { id: "a", text: "An agent is faster.", verdict: "risky", feedback: "Speed is not the difference. A faster chatbot is still a chatbot." },
          { id: "b", text: "A chatbot generates text; an agent takes action.", verdict: "strong", feedback: "That is the line — and once a tool can act, it can take actions that cost money. Which is today." },
          { id: "c", text: "An agent understands instructions better.", verdict: "risky", feedback: "Agents do not “understand” any more than chatbots. They have more tools; the mechanism is the same." },
        ],
      },
      {
        id: "m2s1",
        kind: "decision",
        label: "Decision 1 of 4 — The runaway",
        situation:
          "At 14:00 you check Ava's progress. The ~action log~ tells a story you did not expect.",
        artefact: {
          kind: "actionLog",
          title: "Ava · research run",
          entries: [
            { time: "12:03", action: "Searched “industry benchmarks 2026”", detail: "4 results", cost: "£0" },
            { time: "12:07", action: "Opened paywalled research service", detail: "1 article", cost: "£12", flagged: true },
            { time: "12:10", action: "Accessed 7 more articles", cost: "£84", flagged: true },
            { time: "12:28", action: "Subscribed to monthly research plan (auto-renewing)", cost: "£49", flagged: true },
            { time: "12:35–13:47", action: "16 more paid accesses", cost: "£131", flagged: true },
            { time: "—", action: "Total so far", cost: "£312" },
          ],
        },
        options: [
          {
            id: "a",
            text: "Stop Ava immediately and review what went wrong.",
            verdict: "strong",
            trustDelta: 0,
            feedback:
              "First and most important move: stop the agent. The log shows a classic ~cost creep~ failure — Ava read “research” as “spend whatever it takes”, because nobody set a budget. No single £12 triggered a review, so the total kept climbing.",
          },
          {
            id: "b",
            text: "Let it finish — the report matters and £312 is not catastrophic.",
            verdict: "unsafe",
            trustDelta: 3,
            feedback:
              "Each individual spend looks small. That is exactly how the total runs away.",
            consequence: {
              title: "The cascade",
              scene: "Nobody was in the loop at any single spend threshold, so it never stopped itself.",
              spot: "assets/illustrations/S2-1-cost-report-spot.png",
              cascade: [
                { label: "15:30", detail: "Ava has accessed 72 articles — **£516**." },
                { label: "15:40", detail: "It signs up for a second premium service — **£79**." },
                { label: "Next day", detail: "Finance flags the spend; Sam is asked why a tool spent over £600 without approval." },
                { label: "After", detail: "IT audits the spend and the process is shut down. The report is never finished.", irreversible: true },
              ],
            },
          },
          {
            id: "c",
            text: "Pause Ava, cancel the paid accounts, and finish the report by hand.",
            verdict: "acceptable",
            trustDelta: 0,
            feedback:
              "Stopping it was right. But you have learned the surface lesson (cancel the accounts) without the deeper one: why did Ava do this? Understanding the cause — no budget — prevents the next incident.",
          },
        ],
      },
      {
        id: "m2s2",
        kind: "spotTheRisk",
        label: "Decision 2 of 4 — Setting a budget",
        situation:
          "Before resuming, you configure Ava's research constraints.",
        legend: "Select the constraints that would have prevented the £312 spend",
        artefact: {
          kind: "notes",
          title: "Ava · research settings",
          lines: ["Total spent on the last run: £312.", "Pick the rules that would have stopped it."],
        },
        flaggables: [
          { id: "zero", label: "“Maximum spend: £0 on paid sources. Free sources only.”", risky: true, feedback: "The hardest boundary — removes the ability to spend at all." },
          { id: "cap", label: "“Maximum spend £30 total. Ask me before any article over £5.”", risky: true, feedback: "A softer cap that still works — it would have stopped at article 3." },
          { id: "relevant", label: "“Use the most relevant source only.”", risky: false, feedback: "Ava decides what “most relevant” means — it chose the paid one. An ambiguous constraint is not a constraint." },
          { id: "deadline", label: "“Give me a report by 15:00.”", risky: false, feedback: "A deadline, not a budget. Time pressure without a budget makes the same problem happen faster." },
          { id: "ask", label: "“Ask me before accessing any new source.”", risky: true, feedback: "~Human-in-the-loop~ on every source. Slower, but zero cost risk." },
        ],
        wrap:
          "Hard boundaries prevent problems; vague ones (“be careful”) get read as “do your best”, which is what caused the spend.",
      },
      {
        id: "m2s3",
        kind: "sort",
        label: "Decision 3 of 4 — Trust or Verify: Agent Edition",
        situation:
          "Four tasks. Sort each by how safe it is to hand to an agent right now.",
        buckets: [
          { id: "run", label: "Run with current limits" },
          { id: "limit", label: "Add more limits first" },
          { id: "no", label: "Do not run with an agent" },
        ],
        cards: [
          { id: "c1", text: "“Ava, send a meeting invite for the quarterly review to the team calendar.”", correct: "limit", feedback: "Sending invites is fine with scope — internal only, capped attendee list, confirm anything out of hours. A send on a big calendar has a larger blast radius than it looks." },
          { id: "c2", text: "“Ava, read the vendor's pricing page and tell me the three cheapest tiers.”", correct: "run", feedback: "Read-only, no spend, no writes. The lowest-risk agent use there is." },
          { id: "c3", text: "“Ava, negotiate a better deal with the vendor — you have authority up to 10% off.”", correct: "no", feedback: "Negotiation needs judgement, relationship and context Ava lacks. An agent that can authorise price changes is one wrong inference from a bad deal. This goes to a person." },
          { id: "c4", text: "“Ava, collate the Q2 sales figures from the shared drive into a spreadsheet.”", correct: "run", feedback: "Read access to a specific folder, structured output — low risk. Verify the numbers against the source before sending on." },
        ],
        wrap:
          "It is never the task description that sets the risk — it is whether the agent can commit the company to money, promises or obligations without a human in the loop.",
      },
      {
        id: "m2s4",
        kind: "decision",
        label: "Decision 4 of 4 — Calibration check",
        situation:
          "An IT colleague says: “£312 for a report that never finished? That's why I keep agents off anything with a budget attached.”",
        options: [
          { id: "a", text: "“You're right — best to keep agents off anything financial.”", verdict: "acceptable", trustDelta: -1, feedback: "You avoid one class of problem but lose every safe, time-saving use on non-financial tasks. The skill is knowing which tasks need a budget, not banning all of them." },
          { id: "b", text: "“The problem wasn't the agent — it was that nobody set a budget. The same tool with two constraints would have been fine.”", verdict: "strong", trustDelta: 0, feedback: "Exactly. The tool is not the risk; the absence of boundaries is. A budget cap, a source rule, or a human-in-the-loop gate would have stopped it at £0." },
          { id: "c", text: "“The tool should just know not to spend that much. It should be built in.”", verdict: "risky", trustDelta: 2, feedback: "Ava has no innate sense of £312 or free-versus-paid. It predicts language; it does not comprehend cost. The boundary has to come from the person setting the task." },
        ],
      },
    ],
    reflection: {
      question:
        "Where in your own work could an autonomous tool make small decisions that add up to a big problem without anyone noticing?",
      modelAnswer:
        "The danger is not any one action — it is the accumulation that no single step triggers a review on. A £12 article is nothing; forty-three are £516. The same pattern applies to time, to data exports, and to small “sounds good” commitments. A budget, a time limit, or a “confirm before each new source” rule stops it early.",
    },
    takeaways: [
      "Agents need boundaries — budget, scope, time, and permission gates. Set them before you set the task.",
      "Check the action log, not just the output. It shows what the agent did, which is often more than you asked.",
      "If an agent can spend or change something, set hard limits first.",
    ],
    glossaryEchoes: ["action-log", "cost-creep", "human-in-the-loop"],
  },

  // =====================================================================
  // MISSION 3 — Wednesday: The Delegation Spectrum
  // =====================================================================
  {
    id: "m3",
    day: "Wednesday",
    title: "The Delegation Spectrum",
    themeIcon: "SlidersHorizontal",
    durationMins: 6,
    hero: "assets/illustrations/H2-3-delegation-spectrum-hero.png",
    badge: "boundary-setter",
    brief:
      "Sam wants you to set up Ava Pro's ~delegation~ rules for the team. Different tasks need different levels of ~autonomy~. Your job: match each task to the right level.",
    steps: [
      {
        id: "m3w",
        kind: "recall",
        label: "Warm-up recall",
        question: "Yesterday, what was the main reason Ava spent £312 on research?",
        options: [
          { id: "a", text: "Ava was faulty.", verdict: "risky", feedback: "Ava did exactly what was asked, as effectively as it could. The fault was in the instruction, not the tool." },
          { id: "b", text: "Nobody set a budget boundary or spending constraint.", verdict: "strong", feedback: "That was the single missing control — a £0-on-paid rule, a cap, or a gate on new sources would all have prevented it." },
          { id: "c", text: "The research service charged too much.", verdict: "risky", feedback: "The cost is the symptom, not the cause. £312 on one article or 312 small things — same mechanism." },
        ],
      },
      {
        id: "m3s1",
        kind: "sort",
        label: "Decision 1 of 4 — The spectrum",
        situation:
          "Three tasks. Assign each the right ~autonomy level~: Read-only (look, do not touch), Ask first (suggest, you approve), or Autonomous (act within rules).",
        buckets: [
          { id: "read", label: "Read-only" },
          { id: "ask", label: "Ask first" },
          { id: "auto", label: "Autonomous" },
        ],
        cards: [
          { id: "a", text: "“Ava, draft the weekly status report and send it to the team.”", correct: "ask", feedback: "Drafting and sending are write actions. Ava drafts, shows you a preview, sends after approval. One hallucinated milestone going to the whole team is exactly what the approval step catches." },
          { id: "b", text: "“Ava, monitor the shared inbox overnight and flag any ‘urgent’ email to the on-call contact.”", correct: "read", feedback: "The perfect autonomous-adjacent use: Ava reads and notifies but takes no action. Notification is not action, and it carries no commitment risk." },
          { id: "c", text: "“Ava, find meetings this week with no agenda and add a placeholder agenda based on the attendees.”", correct: "ask", feedback: "Adding content to other people's accepted meetings is an invasive write. “I found four — shall I add a draft agenda to each?” is the right level: the human checks the guess before it is published." },
        ],
        wrap:
          "Match the level to the risk. Read-only for lookups, ask-first for writes, autonomous only for fixed, low-stakes rules.",
      },
      {
        id: "m3s2",
        kind: "spotTheRisk",
        label: "Decision 2 of 4 — The boundary you did not see",
        situation: "Sam has set up two autonomous rules for Ava.",
        legend: "Select the rule that is risky",
        artefact: {
          kind: "table",
          columns: ["Standing autonomous rule"],
          rows: [
            ["If a meeting room is double-booked, move the shorter meeting to the next slot and notify both organisers."],
            ["If the weekly status report is not submitted by 17:00 Friday, send a reminder to the person responsible."],
          ],
        },
        flaggables: [
          { id: "move", label: "Auto-move the “shorter” meeting when a room is double-booked", risky: true, feedback: "Ava decides which meeting is “shorter” and moves it — but shorter is not less important. A 15-minute board briefing gets bumped for a 60-minute social committee, and the organiser finds out after the fact." },
          { id: "remind", label: "Send a reminder if the Friday report is late", risky: false, feedback: "A fixed trigger, a single low-stakes action, fully reversible. Well-scoped ~autonomy~." },
        ],
        wrap:
          "Autonomy is safe when the rule is predictable, reversible, and free of judgement calls about priority or importance.",
      },
      {
        id: "m3s3",
        kind: "decision",
        label: "Decision 3 of 4 — Delegation vs abdication",
        situation:
          "A colleague says: “I set Ava to autonomous for all my email replies. Saves me three hours a day. Why are you still approving each one?”",
        options: [
          {
            id: "a",
            text: "“That sounds efficient — maybe I should do the same.”",
            verdict: "unsafe",
            trustDelta: 3,
            feedback: "Autonomous email means the agent makes commitments in your name with no review.",
            consequence: {
              title: "The cascade",
              scene: "You switch to autonomous email.",
              cascade: [
                { label: "Day 1", detail: "All fine." },
                { label: "Day 2", detail: "Ava over-promises a delivery date — it read “expedite” in an internal note as a commitment. The client replies “Great, we'll adjust our timeline.”" },
                { label: "Day 3", detail: "The client's manager calls asking where the early delivery is." },
                { label: "Day 4", detail: "Ava has sent fourteen more emails, each reinforcing the wrong expectation. You spend a week unpicking commitments your agent made." },
              ],
            },
          },
          { id: "b", text: "“Ava can't know what I'd want to say every time. I skim the draft and approve in about fifteen seconds — still saving time, still responsible.”", verdict: "strong", trustDelta: 0, feedback: "The difference between ~delegation~ and ~abdication~ is about fifteen seconds. Drafting saves time; approving keeps responsibility. You delegate the writing, not the judgement." },
          { id: "c", text: "“I don't use Ava for email at all — too risky.”", verdict: "acceptable", trustDelta: -1, feedback: "You're leaving real time on the table. Draft-with-quick-review captures most of the benefit with almost none of the risk." },
        ],
      },
      {
        id: "m3s4",
        kind: "decision",
        label: "Decision 4 of 4 — Calibration check",
        situation:
          "Sam asks: “So what's your rule of thumb for when Ava can act on its own versus when you want to see it first?”",
        options: [
          { id: "a", text: "“If the output never leaves the company — internal drafts, notes, filing — autonomous is fine. If it goes to a client or changes something others rely on, I want to see it first.”", verdict: "strong", trustDelta: 0, feedback: "A clean, memorable boundary: internal vs external, create vs commit. The risk changes the moment the output leaves your control, and your rule catches exactly that line." },
          { id: "b", text: "“Never autonomous. Always ask first.”", verdict: "acceptable", trustDelta: -1, feedback: "Safe, but you give up real efficiency on tasks where autonomy is fine — filing, monitoring, internal reminders. The skill is knowing which qualify." },
          { id: "c", text: "“Ava can handle everything. It's proven technology.”", verdict: "risky", trustDelta: 3, feedback: "It is not about the technology being reliable — it is about the person being accountable. A tool can be 99% accurate and still produce the one error that matters. Autonomy is earned task by task." },
        ],
      },
    ],
    reflection: {
      question:
        "Where is the line between delegating a task to an agent and abdicating responsibility for it — and is there a task in your own work where one could quietly become the other?",
      modelAnswer:
        "The line is review. Every time you skip it because “Ava usually gets it right”, you have crossed from delegation to abdication. The safest check: if you would not hand it to a new junior without seeing their first few outputs, do not hand it to an agent without checking its actions.",
    },
    takeaways: [
      "Match autonomy level to task risk: read-only for lookups, ask-first for writes, autonomous only for fixed low-stakes rules.",
      "The line between delegation and abdication is the review step you choose to skip.",
      "If you would not let a junior do it unsupervised, do not let an agent do it autonomously.",
    ],
    glossaryEchoes: ["autonomy-level", "delegation", "abdication"],
  },

  // =====================================================================
  // MISSION 4 — Thursday: The Audit Trail
  // =====================================================================
  {
    id: "m4",
    day: "Thursday",
    title: "The Audit Trail",
    themeIcon: "ScrollText",
    durationMins: 6,
    hero: "assets/illustrations/H2-4-audit-trail-hero.png",
    badge: "auditor",
    brief:
      "Thursday morning. Sam forwards a message from the Halden Group client: they received an email from Ava last night with an updated proposal. The problem — you never asked Ava to send anything to anyone. Sam wants to know what happened.",
    steps: [
      {
        id: "m4w",
        kind: "recall",
        label: "Warm-up recall",
        question: "On Wednesday, what is the critical difference between delegation and abdication?",
        options: [
          { id: "a", text: "Delegation is for simple tasks; abdication is for complex ones.", verdict: "risky", feedback: "Task complexity is not the dividing line." },
          { id: "b", text: "Delegation keeps the person responsible through review; abdication hands it over and stops looking.", verdict: "strong", feedback: "That is it. The review step is the difference." },
          { id: "c", text: "Delegation uses settings; abdication happens by accident.", verdict: "risky", feedback: "Abdication can be deliberate too — “set it and forget it” is a choice." },
        ],
      },
      {
        id: "m4s1",
        kind: "decision",
        label: "Decision 1 of 4 — Read the audit trail",
        situation: "You open Ava's ~action log~ for yesterday evening.",
        artefact: {
          kind: "actionLog",
          title: "Ava · yesterday evening",
          entries: [
            { time: "16:02", action: "You requested: “Draft an updated proposal with the new pricing and save it.”" },
            { time: "16:03", action: "Drafted proposal-v4, saved to /Projects/Halden/Proposals/" },
            { time: "16:04", action: "Standing rule triggered: “On proposal save, email client with summary.”", flagged: true },
            { time: "16:05", action: "Email sent to contact@halden-group.com: “Updated proposal attached.”", flagged: true },
          ],
        },
        options: [
          { id: "a", text: "Ava disobeyed you. You said save, not send.", verdict: "risky", trustDelta: 1, feedback: "Ava did exactly what you asked and what a separate standing rule told it to do. It did not disobey — it followed two instructions that together produced an unintended result. This is instruction compounding, a ~rule conflict~." },
          { id: "b", text: "Your instruction and a standing autonomous rule conflicted — the rule “on save, email the client” fired. The problem is the rule, not the instruction.", verdict: "strong", trustDelta: 0, feedback: "Exactly. The save instruction was fine. The standing rule had no ~human-in-the-loop~ gate, so a perfect instruction would still have triggered the send. ~Governance~ means reviewing the rules, not just individual instructions." },
          {
            id: "c",
            text: "The client won't mind an early draft. Not a real problem.",
            verdict: "unsafe",
            trustDelta: 2,
            feedback: "The draft held pricing that was still being negotiated internally.",
            consequence: {
              title: "The cascade",
              scene: "An autonomous rule sent a document nobody approved.",
              spot: "assets/illustrations/S2-2-rule-conflict-spot.png",
              cascade: [
                { label: "Evening", detail: "The client reads the draft and locks in the lower figure." },
                { label: "Next day", detail: "Legal gets involved; the rule is disabled." },
                { label: "Outcome", detail: "The damage — a worse deal for Brightway — is done. “You sent us a proposal, we accepted, and now you want to change it?”", irreversible: true },
              ],
            },
          },
        ],
      },
      {
        id: "m4s2",
        kind: "spotTheRisk",
        label: "Decision 2 of 4 — Reading the log",
        situation: "A fresh action log from the same day.",
        legend: "Flag the actions that look suspicious and need investigation",
        artefact: {
          kind: "actionLog",
          title: "Ava · today",
          entries: [
            { time: "09:15", action: "Searched “Halden Group project files”", detail: "routine" },
            { time: "09:22", action: "Opened Halden-proposal-v4.pptx" },
            { time: "09:31", action: "Deleted folder /Projects/Halden/Archive/", flagged: true },
            { time: "09:45", action: "Modified calendar entry “Halden kick-off call”", flagged: true },
            { time: "09:52", action: "Opened Brightway-internal-budget-2026.xlsx", flagged: true },
            { time: "10:03", action: "Sent message to supplier@supplyco.com: “Confirm latest pricing?”", flagged: true },
            { time: "10:11", action: "Saved draft Meeting-notes-Tuesday.md" },
            { time: "10:18", action: "Searched “team holiday schedule”" },
          ],
        },
        flaggables: [
          { id: "del", label: "Deleted the Halden Archive folder", risky: true, feedback: "Nobody asked Ava to delete anything. Even an archive may hold versions needed for audit." },
          { id: "cal", label: "Modified the kick-off calendar entry", risky: true, feedback: "Any unsolicited change to a meeting is worth a look — it affects other people." },
          { id: "budget", label: "Opened the internal budget spreadsheet", risky: true, feedback: "Nothing to do with the Halden proposal — scope creep; Ava may be searching too broadly." },
          { id: "supplier", label: "Emailed an external supplier", risky: true, feedback: "An unprompted external send — the same class of risk as yesterday's proposal." },
          { id: "search", label: "Searched for the project files", risky: false, feedback: "Routine, read-only, matches the day's work." },
          { id: "notes", label: "Saved meeting notes", risky: false, feedback: "Routine — exactly what you asked for." },
        ],
        wrap:
          "Deletions, calendar changes, out-of-scope file access, and external sends are automatic flags. Anything that affects something outside your own work queue deserves a look.",
      },
      {
        id: "m4s3",
        kind: "sort",
        label: "Decision 3 of 4 — Irreversible vs recoverable",
        situation: "Five agent actions. Sort each by how recoverable it is.",
        buckets: [
          { id: "rollback", label: "Rollback possible" },
          { id: "cleanup", label: "Rollback with clean-up" },
          { id: "escalate", label: "Irreversible — escalate" },
        ],
        cards: [
          { id: "a", text: "Ava posted the wrong standup time in the team channel.", correct: "rollback", feedback: "Post a correction. Annoying, no lasting harm; the log shows who saw it." },
          { id: "b", text: "Ava moved a meeting 14:00 → 15:00 and two people already accepted.", correct: "cleanup", feedback: "Move it back and message both. Mild, contained — everyone is reachable." },
          { id: "c", text: "Ava emailed a draft contract to the wrong supplier with your signature block.", correct: "escalate", feedback: "Out of your control. They may have opened or forwarded it. ~Escalation~ — a containment-and-disclosure matter, not a roll-back." },
          { id: "d", text: "Ava deleted the only copy of a completed engagement's archived files.", correct: "escalate", feedback: "Check the recycle bin first; if it is truly gone, this is an IT recovery ticket and a process failure." },
          { id: "e", text: "Ava updated a shared spreadsheet with the correct figures from a meeting you attended.", correct: "rollback", feedback: "Do nothing — the action is right. But verify the log to confirm the correct figures were written, not just that something was." },
        ],
        wrap:
          "It is not always obvious in advance what is reversible. The rule: if it leaves the company or destroys something, treat it as irreversible until you confirm otherwise.",
      },
      {
        id: "m4s4",
        kind: "decision",
        label: "Decision 4 of 4 — Review cadence",
        situation: "Sam asks: “How often should we review Ava's action log?”",
        options: [
          { id: "a", text: "“End of every day.”", verdict: "acceptable", trustDelta: -1, feedback: "Fine for low volume, but a day can be dozens of entries — easy to skim and miss one buried in the middle." },
          { id: "b", text: "“Anything touching external contacts, money, or deletions triggers a notification straight away. Routine internal actions get an end-of-day review.”", verdict: "strong", trustDelta: 0, feedback: "The calibrated answer: not all actions are equal. Risk-based triage, not blanket timing — exactly what enterprise governance frameworks recommend." },
          { id: "c", text: "“Real-time — a notification for every single action, even ‘opened file’.”", verdict: "acceptable", trustDelta: -1, feedback: "Sounds thorough, but thirty notifications an hour and you stop reading within two days — back to no review. The system has to triage for you." },
        ],
      },
    ],
    reflection: {
      question:
        "The proposal was sent by an autonomous rule you had forgotten you set. What rules or permissions have you set in your own tools that you have not reviewed recently?",
      modelAnswer:
        "Standing rules drift out of visibility. One that made sense last month — “save to the shared drive” — may now trigger unintended actions because other rules were added since. The practical check is a periodic rule audit: read every autonomous permission and ask whether it still makes sense alongside all the others.",
    },
    takeaways: [
      "Actions compound across rules — review the whole rule set, not just individual instructions.",
      "Not all actions are equal: triage review by risk, not by time.",
      "Some actions cannot be undone — know which ones require escalation before you need to.",
    ],
    glossaryEchoes: ["action-log", "rule-conflict", "irreversibility"],
  },

  // =====================================================================
  // MISSION 5 — Friday: The Unsupervised Handoff
  // =====================================================================
  {
    id: "m5",
    day: "Friday",
    title: "The Unsupervised Handoff",
    themeIcon: "Workflow",
    durationMins: 6,
    hero: "assets/illustrations/H2-5-unsupervised-handoff-hero.png",
    badge: "accountable",
    brief:
      "Friday. Sam is off sick. Before leaving she set up an autonomous process: Ava will generate the weekly status report and send it to the entire distribution list — managers, clients, everyone. No review step. “Ava knows the format. It'll be fine.”",
    steps: [
      {
        id: "m5w",
        kind: "recall",
        label: "Warm-up recall",
        question: "Yesterday, what caused Ava to send the proposal without approval?",
        options: [
          { id: "a", text: "The instruction was badly written.", verdict: "risky", feedback: "The instruction — “save the proposal” — was fine. A separate rule did the sending." },
          { id: "b", text: "A standing autonomous rule conflicted with the specific instruction.", verdict: "strong", feedback: "The rule said “on save, email the client”. Ava followed both at once, and the person setting the task did not know the rule existed." },
          { id: "c", text: "Ava decided to send it on its own.", verdict: "risky", feedback: "Ava does not “decide” — it follows rules. Two rules together produced an unintended outcome." },
        ],
      },
      {
        id: "m5s1",
        kind: "decision",
        label: "Decision 1 of 4 — The handoff",
        situation:
          "You arrive at 08:30 to a notification: Ava has already generated and sent the report. The distribution list includes three external client contacts. Your first move?",
        options: [
          {
            id: "a",
            text: "Trust Sam — she wouldn't have set it up if it weren't safe. Skip the review.",
            verdict: "unsafe",
            trustDelta: 3,
            feedback: "Sam's trust was genuine but misplaced.",
            consequence: {
              title: "The cascade",
              scene: "The report contains a line: “Client project — Phase 2 delayed by 4 weeks.” Accurate — but the client had not been told yet.",
              cascade: [
                { label: "09:10", detail: "The client reads it and emails Sam's manager: “We learned about the delay from a status report. We expected a call.”" },
                { label: "Outcome", detail: "Trust is damaged — not because the report was wrong, but because it reached the wrong audience at the wrong time. The agent had no sense of who should hear what, when.", irreversible: true },
              ],
            },
          },
          { id: "b", text: "Read the report before it settles. If there's an issue, recall the email or follow up with a correction.", verdict: "strong", trustDelta: 0, feedback: "Sam set it up, but you are the person at the desk. Reading the output before it is absorbed is the minimum viable review — you catch the client-facing status, strip the external contacts, and flag it to Sam." },
          { id: "c", text: "Disable the autonomous send at once and insist all future reports get human review.", verdict: "acceptable", trustDelta: -2, feedback: "The instinct is right, but you are throwing out a useful process. The problem is the scope of the send list, not the automation — internal is fine; external needs a gate." },
        ],
      },
      {
        id: "m5s2",
        kind: "decision",
        label: "Decision 2 of 4 — The governance decision",
        situation:
          "After the incident, IT asks the team to vote on a rule for autonomous external communications. Which do you support?",
        options: [
          { id: "a", text: "“No agent may send anything externally without a named human approver.”", verdict: "strong", trustDelta: 0, feedback: "The cleanest boundary rule in the whole course. Seconds per message, and it prevents the entire class of “wrong audience” failures. It is what enterprise ~governance~ frameworks now recommend." },
          { id: "b", text: "“Agents may send anything, internal or external, as long as it's logged.”", verdict: "risky", trustDelta: 2, feedback: "Logging catches problems after the fact; it does not prevent them. The client who got the wrong information already has it. A log complements an approval gate — it does not replace it." },
          { id: "c", text: "“Agents may not send anything, internal or external, without manual approval for every action.”", verdict: "acceptable", trustDelta: -2, feedback: "Safest, but it throws away most of the efficiency. The calibrated answer splits internal (end-of-day review) from external (named approver before send)." },
        ],
      },
      {
        id: "m5s3",
        kind: "decision",
        label: "Decision 3 of 4 — “The agent did it”",
        situation:
          "Someone in another team emailed a client using an unapproved personal AI tool. Challenged, they say: “Don't blame me — the agent handled it. The tool sent it, not me.”",
        options: [
          {
            id: "a",
            text: "“Fair point. If the agent handled the send, responsibility sits with whoever built the tool.”",
            verdict: "unsafe",
            trustDelta: 3,
            feedback: "This becomes a culture problem fast.",
            consequence: {
              title: "The cascade",
              scene: "Within a month, three more people use “the agent did it” to deflect for outputs they prompted, rules they set, or reviews they skipped.",
              spot: "assets/illustrations/S2-3-not-me-spot.png",
              cascade: [
                { label: "Month 1", detail: "IT issues a company-wide policy: the person who sets the task is always accountable, whatever tool executed it." },
                { label: "Effect", detail: "The phrase becomes a running joke in the wrong way — “that's my agent's fault, not mine”." },
              ],
            },
          },
          { id: "b", text: "“You set the instruction, chose the tool, and decided not to review the output. The responsibility stays with you.”", verdict: "strong", trustDelta: 0, feedback: "The week's core lesson, plainly. An ~agent~ is a tool; the person who deploys it owns the outcome. No more a defence than “the spreadsheet did it”. ~Accountability~ follows the person." },
          { id: "c", text: "“Let's check the audit trail and see what happened.”", verdict: "acceptable", trustDelta: 0, feedback: "Useful evidence — but the trail tells you what happened, not who is responsible. The answer to “who?” is always the person; the trail just shows what they should have caught." },
        ],
      },
      {
        id: "m5s4",
        kind: "decision",
        label: "Decision 4 of 4 — The week in one sentence",
        situation:
          "A new starter joins Monday. Sam asks you for one sentence about using agents at work. Which?",
        options: [
          { id: "a", text: "“An agent can do things you did not ask for, cost things you did not expect, and the responsibility never leaves your name.”", verdict: "strong", trustDelta: 0, feedback: "The whole week in one line. Action, cost, responsibility — three things true of agents and not of chatbots. Everything else was a specific case of one of them." },
          { id: "b", text: "“Agents save time. Use them for everything you can.”", verdict: "risky", trustDelta: 2, feedback: "Missing every lesson. Agents save time when scoped correctly — the same tool that saves an hour can cost hundreds, send the wrong document, or make promises nobody authorised." },
          { id: "c", text: "“Never let an agent do anything without a human watching.”", verdict: "acceptable", trustDelta: -1, feedback: "Too broad — watching everything defeats the purpose. The skill is knowing what to watch and when: risk-based triage, not blanket surveillance." },
        ],
      },
    ],
    reflection: {
      question:
        "If someone says “the agent did it” in your workplace next week, what will you say back?",
      modelAnswer:
        "“Who set the task? Who reviewed the output? Who chose not to add a permission gate?” The agent did the execution; the person did the delegation. Responsibility follows the person, always — there is no version of “the AI did it” that transfers accountability away from the human who chose to use it and chose not to check.",
    },
    takeaways: [
      "“The agent did it” is never a defence — accountability stays with the person who set the task.",
      "External communications always need a named human approver before they go out.",
      "The goal is not to eliminate autonomous action — it is to scope it correctly and triage the review.",
    ],
    glossaryEchoes: ["accountability", "governance", "escalation"],
  },
];

export const missionById = Object.fromEntries(
  missions.map((m) => [m.id, m])
) as Record<string, Mission>;
