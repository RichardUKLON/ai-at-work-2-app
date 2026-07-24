import { useEffect } from "react";
import { X } from "lucide-react";
import { useGame } from "../store";
import { badgeById } from "../content/badges";
import { BadgeMedallion } from "./BadgeMedallion";

export function BadgeToast() {
  const toasts = useGame((s) => s.badgeToasts);
  const dismiss = useGame((s) => s.dismissToast);
  const current = toasts[0];

  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => dismiss(current), 6000);
    return () => clearTimeout(t);
  }, [current, dismiss]);

  if (!current) return null;
  const badge = badgeById[current];
  if (!badge) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div className="animate-pop flex max-w-md items-start gap-3 rounded-xl border border-brand/30 bg-surface p-4 shadow-pop">
        <span className="inline-flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-full bg-brand/10 text-brand">
          <BadgeMedallion badge={badge} size={44} />
        </span>
        <div className="min-w-0 pr-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Badge earned
          </p>
          <p className="font-semibold">{badge.name}</p>
          <p className="text-sm text-ink/80">{badge.toast}</p>
        </div>
        <button
          type="button"
          onClick={() => dismiss(current)}
          aria-label="Dismiss"
          className="ml-auto flex-none rounded-md p-1 text-ink/50 hover:bg-canvas hover:text-ink"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
