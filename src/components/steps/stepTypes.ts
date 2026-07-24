import type { Verdict } from "../../types";

export interface StepResult {
  points: number;
  verdict?: Verdict;
  choseUnsafe?: boolean;
  riskyOrUnsafe?: boolean;
  spotPerfect?: boolean; // all-correct on a Spot the Risk
  sortPerfect?: boolean; // all-correct on a sort
}

export interface StepProps<T> {
  step: T;
  onComplete: (result: StepResult) => void;
}
