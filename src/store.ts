import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BadgeId } from "./types";
import { clampTrust } from "./lib/game";

export type Screen =
  | "home"
  | "map"
  | "mission"
  | "reflection"
  | "debrief"
  | "progress"
  | "results"
  | "about";

export interface Route {
  screen: Screen;
  missionId?: string;
}

export interface MissionProgress {
  completed: boolean;
  bestPoints: number;
  maxPoints: number;
  lastPoints: number;
  badgeEarned: boolean;
}

export const MISSION_ORDER = ["m1", "m2", "m3", "m4", "m5", "m6"] as const;

function blankProgress(): MissionProgress {
  return {
    completed: false,
    bestPoints: 0,
    maxPoints: 0,
    lastPoints: 0,
    badgeEarned: false,
  };
}

function initialMissions(): Record<string, MissionProgress> {
  return Object.fromEntries(
    MISSION_ORDER.map((id) => [id, blankProgress()])
  ) as Record<string, MissionProgress>;
}

interface PersistedState {
  missions: Record<string, MissionProgress>;
  trust: number;
  badges: BadgeId[];
  reflections: Record<string, string>;
  finaleSeed: number;
  finaleLastPct: number | null;
  resume: { missionId: string; stepIndex: number } | null;
}

interface GameState extends PersistedState {
  // transient UI
  route: Route;
  glossaryOpen: boolean;
  glossaryTerm: string | null;
  badgeToasts: BadgeId[];

  // navigation
  navigate: (route: Route) => void;
  openGlossary: (term?: string) => void;
  closeGlossary: () => void;

  // game actions
  applyTrust: (delta: number) => void;
  earnBadge: (id: BadgeId) => void;
  completeMission: (
    missionId: string,
    points: number,
    maxPoints: number,
    badgeEarned: boolean
  ) => void;
  setReflection: (missionId: string, text: string) => void;
  recordFinale: (pct: number, points: number, badgeEarned: boolean) => void;
  saveResume: (missionId: string, stepIndex: number) => void;
  clearResume: () => void;
  reseedFinale: () => void;
  dismissToast: (id: BadgeId) => void;
  reset: () => void;
}

const STORAGE_KEY = "ai-at-work-2-progress-v1";

export function isUnlocked(
  missionId: string,
  missions: Record<string, MissionProgress>
): boolean {
  const idx = MISSION_ORDER.indexOf(missionId as (typeof MISSION_ORDER)[number]);
  if (idx <= 0) return true; // m1 always unlocked
  const prev = MISSION_ORDER[idx - 1];
  return missions[prev]?.completed ?? false;
}

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      // persisted
      missions: initialMissions(),
      trust: 0,
      badges: [],
      reflections: {},
      finaleSeed: Math.floor(Math.random() * 1e9),
      finaleLastPct: null,
      resume: null,

      // transient
      route: { screen: "home" },
      glossaryOpen: false,
      glossaryTerm: null,
      badgeToasts: [],

      navigate: (route) => set({ route }),

      openGlossary: (term) =>
        set({ glossaryOpen: true, glossaryTerm: term ?? null }),
      closeGlossary: () => set({ glossaryOpen: false, glossaryTerm: null }),

      applyTrust: (delta) =>
        set((s) => ({ trust: clampTrust(s.trust + delta) })),

      earnBadge: (id) =>
        set((s) =>
          s.badges.includes(id)
            ? s
            : { badges: [...s.badges, id], badgeToasts: [...s.badgeToasts, id] }
        ),

      completeMission: (missionId, points, maxPoints, badgeEarned) => {
        const s = get();
        const prev = s.missions[missionId] ?? blankProgress();
        const next: MissionProgress = {
          completed: true,
          bestPoints: Math.max(prev.bestPoints, points),
          maxPoints,
          lastPoints: points,
          badgeEarned: prev.badgeEarned || badgeEarned,
        };
        set({ missions: { ...s.missions, [missionId]: next }, resume: null });
      },

      setReflection: (missionId, text) =>
        set((s) => ({ reflections: { ...s.reflections, [missionId]: text } })),

      recordFinale: (pct, points, badgeEarned) => {
        const s = get();
        const prev = s.missions["m6"] ?? blankProgress();
        const next: MissionProgress = {
          completed: true,
          bestPoints: Math.max(prev.bestPoints, points),
          maxPoints: 10,
          lastPoints: points,
          badgeEarned: prev.badgeEarned || badgeEarned,
        };
        set({
          missions: { ...s.missions, m6: next },
          finaleLastPct: pct,
          resume: null,
        });
        if (badgeEarned) get().earnBadge("agent-ready");
      },

      saveResume: (missionId, stepIndex) =>
        set({ resume: { missionId, stepIndex } }),
      clearResume: () => set({ resume: null }),

      reseedFinale: () =>
        set({ finaleSeed: Math.floor(Math.random() * 1e9) }),

      dismissToast: (id) =>
        set((s) => ({ badgeToasts: s.badgeToasts.filter((t) => t !== id) })),

      reset: () =>
        set({
          missions: initialMissions(),
          trust: 0,
          badges: [],
          reflections: {},
          finaleSeed: Math.floor(Math.random() * 1e9),
          finaleLastPct: null,
          resume: null,
          route: { screen: "home" },
          glossaryOpen: false,
          glossaryTerm: null,
          badgeToasts: [],
        }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      partialize: (s): PersistedState => ({
        missions: s.missions,
        trust: s.trust,
        badges: s.badges,
        reflections: s.reflections,
        finaleSeed: s.finaleSeed,
        finaleLastPct: s.finaleLastPct,
        resume: s.resume,
      }),
    }
  )
);

/** Total Judgement Points across all missions (best of each). */
export function totalPoints(missions: Record<string, MissionProgress>): number {
  return MISSION_ORDER.reduce((sum, id) => sum + (missions[id]?.bestPoints ?? 0), 0);
}
