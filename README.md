# AI at Work 2: The Agent That Acted

A browser-based, scenario-driven game that teaches non-technical staff to manage
AI **agents** at work — tools that no longer just write, but send, buy, book and
delete. Built from `ai-at-work-2-app-specification-standalone.md` and
`ai-at-work-2-content-pack-standalone.md`, with the hero, consequence and badge
illustrations from the Week 2 Midjourney prompt sheet.

This is a standalone module: it runs on its own, with its own progress and badges.

## Run it

The quickest way: open **`dist-single/index.html`** in any browser (double-click
it). The page is self-contained — JS and CSS are inlined — and the illustrations
sit in the sibling `assets/` folder, so no server is needed.

To develop or rebuild:

```bash
npm install          # install dependencies
npm run dev          # dev server with hot reload
npm run build        # type-check + production build into dist/
npm run build:single # self-contained build into dist-single/
npm run preview      # serve the production build locally
```

The `dist/` build uses relative paths, so `dist/index.html` also opens directly.

## What's included

- **Five teaching missions + a finale.** Monday→Friday (Ava Gets Hands · One
  Click to Rule Them All · The Delegation Spectrum · The Audit Trail · The
  Unsupervised Handoff), each 5–6 minutes, plus the Friday Review: Agent Edition
  (10 challenges drawn from a pool of 20, re-randomised on replay with guaranteed
  coverage of every concept).
- **The five-beat loop:** brief → decide → immediate feedback → reflect →
  debrief, with the Week 2 mechanics: action-log review, the permission-spectrum
  sorter, irreversibility sorting, and **consequence cascades** that show how an
  agent error compounds step by step.
- **The Trust Meter**, carried over from Week 1 with a narrower calibrated zone —
  because calibrated trust matters more when the tool can act.
- **Judgement Points, six badges** (Tool Time, Cost Controller, Boundary Setter,
  Auditor, Accountable, Agent-Ready), a **glossary** (foundations + agent terms,
  in-context links), **My Progress**, and a **finale results / certificate**
  screen.
- **Accessibility (WCAG 2.1 AA):** semantic landmarks, full keyboard operation, a
  visible focus indicator everywhere, colour never used alone (flagged items also
  carry a text marker), an `aria-live` region, the Trust Meter exposed as a
  labelled `meter`, rem-based type that survives 200% zoom, and
  `prefers-reduced-motion` support.

## How it's built

- **Stack:** React 18 + TypeScript + Vite, Tailwind CSS (design tokens for the
  spec palette/type scale), Lucide icons, Zustand for state. Identical to the
  Week 1 app, so the look and feel match exactly.
- **Client-only, no backend.** All progress, scores and reflections persist to
  `localStorage` under a versioned key — nothing is ever transmitted.
- **Content is data.** Every learner-facing string lives in `src/content/*`
  (`missions.ts`, `finale.ts`, `glossary.ts`, `badges.ts`, `microcopy.ts`),
  separated from components so writers can edit scenarios without touching code.

## Project layout

```
src/
  content/      missions, finale pool, glossary, badges, UI microcopy
  lib/          scoring & trust logic, finale selection, icon registry, glossary aliases
  components/   AppShell, TrustMeter, GlossaryPanel, FeedbackCard (with the cascade
                timeline), ArtefactRenderer (incl. action logs & permission settings),
                BadgeMedallion, BadgeToast, AvaMark, RichText, and the step renderers
  screens/      Home, MissionMap, MissionPlayer, FinalePlayer, Debrief, Progress,
                Results, About
public/assets/illustrations/   the 15 Week 2 PNGs (heroes, consequence spots, badges)
```
