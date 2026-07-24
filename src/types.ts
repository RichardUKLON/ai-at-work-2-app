// Content model for AI at Work 2: The Agent That Acted.
// Mirrors the Week 2 standalone specification §8.2. Learner-facing copy lives in
// src/content/*, separated from components so writers/translators can edit it.

export type RichText = string;
export type Verdict = "strong" | "acceptable" | "risky" | "unsafe";
export type GlossaryId = string;

// ---------------------------------------------------------------------------
// Artefacts — realistic in-world documents rendered by ArtefactRenderer.
// ---------------------------------------------------------------------------

export interface ActionLogEntry {
  time: string;
  action: RichText;
  detail?: string;
  cost?: string;
  flagged?: boolean; // amber "review needed" highlight
}

export interface PermissionRow {
  permission: string;
  setting: string; // e.g. "ON" / "OFF"
  note?: string;
}

export type Artefact =
  | { kind: "email"; from: string; subject: string; body: RichText[] }
  | { kind: "chatThread"; messages: { author: string; text: RichText }[] }
  | { kind: "aiReply"; title?: string; body: RichText }
  | { kind: "spreadsheet"; columns: string[]; rows: string[][] }
  | { kind: "notes"; title?: string; lines: RichText[] }
  | { kind: "table"; columns: string[]; rows: string[][] }
  | { kind: "actionLog"; title?: string; entries: ActionLogEntry[] }
  | { kind: "permissionSettings"; title?: string; rows: PermissionRow[] };

// ---------------------------------------------------------------------------
// Options, cascades, flaggables, buckets.
// ---------------------------------------------------------------------------

/** One step of a compounding consequence cascade (Week 2 signature mechanic). */
export interface CascadeStep {
  label: string; // e.g. "Day 2" or "12:35"
  detail: RichText;
  irreversible?: boolean;
}

export interface Option {
  id: string;
  text: RichText;
  verdict: Verdict;
  feedback: RichText;
  /** Movement on the Trust Meter (−5…+5). Positive = towards Over-reliant. */
  trustDelta?: number;
  consequence?: {
    title: string;
    scene: RichText;
    spot?: string; // path to a consequence-spot illustration
    cascade?: CascadeStep[];
  };
  allowRetry?: boolean;
}

/** A flaggable element inside a Spot the Risk / action-log audit. */
export interface Flaggable {
  id: string;
  label: string;
  risky: boolean; // true = the learner SHOULD flag it
  feedback: RichText;
}

/** A destination bucket for a sort step (labels vary per step in Week 2). */
export interface BucketDef {
  id: string;
  label: string;
}

export interface SortCard {
  id: string;
  text: RichText;
  correct: string; // bucket id
  feedback: RichText;
}

// ---------------------------------------------------------------------------
// Steps — discriminated union.
// ---------------------------------------------------------------------------

interface StepBase {
  id: string;
  label: string;
}

export type Step =
  | (StepBase & {
      kind: "decision";
      situation: RichText;
      artefact?: Artefact;
      options: Option[];
    })
  | (StepBase & {
      kind: "recall";
      question: RichText;
      options: Option[];
    })
  | (StepBase & {
      kind: "spotTheRisk";
      situation: RichText;
      artefact: Artefact;
      legend?: string; // overrides the default "Flag the elements…" legend
      flaggables: Flaggable[];
      wrap: RichText;
    })
  | (StepBase & {
      kind: "sort";
      situation: RichText;
      buckets: BucketDef[];
      cards: SortCard[];
      wrap?: RichText;
    });

export type StepKind = Step["kind"];

// ---------------------------------------------------------------------------
// Missions.
// ---------------------------------------------------------------------------

export interface Mission {
  id: string; // "m1" … "m5"
  day: string;
  title: string;
  themeIcon: string; // lucide icon name
  durationMins: number;
  hero: string;
  badge: BadgeId;
  brief: RichText;
  steps: Step[];
  reflection?: { question: RichText; modelAnswer: RichText };
  takeaways: string[];
  glossaryEchoes: GlossaryId[];
}

// ---------------------------------------------------------------------------
// Finale.
// ---------------------------------------------------------------------------

export type ConceptTag =
  | "agent-vs-chatbot"
  | "permission-scope"
  | "cost-escalation"
  | "autonomy-level"
  | "delegation-vs-abdication"
  | "audit-trail"
  | "irreversibility"
  | "rule-conflict"
  | "accountability"
  | "cross-retrieval";

export type FinaleItem =
  | {
      id: string;
      tags: ConceptTag[];
      kind: "mc";
      prompt: RichText;
      options: { id: string; text: RichText; correct: boolean }[];
      feedback: RichText;
    }
  | {
      id: string;
      tags: ConceptTag[];
      kind: "spotTheRisk";
      situation: RichText;
      artefact: Artefact;
      flaggables: Flaggable[];
      feedback: RichText;
    }
  | {
      id: string;
      tags: ConceptTag[];
      kind: "sort";
      situation: RichText;
      buckets: BucketDef[];
      card: SortCard;
      feedback: RichText;
    };

// ---------------------------------------------------------------------------
// Glossary & badges.
// ---------------------------------------------------------------------------

export interface GlossaryEntry {
  id: GlossaryId;
  term: string;
  group: "Foundations" | "Agent" | "Good Practice";
  definition: string;
  atWork: string;
  related: GlossaryId[];
}

export type BadgeId =
  | "tool-time"
  | "cost-controller"
  | "boundary-setter"
  | "auditor"
  | "accountable"
  | "agent-ready";

export interface Badge {
  id: BadgeId;
  name: string;
  earnedHow: string;
  toast: string;
  icon: string; // lucide fallback
  image?: string; // medallion PNG from the prompt sheet
}
