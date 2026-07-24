import { useEffect, useMemo, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import { useGame } from "../store";
import { glossary } from "../content/glossary";
import { microcopy } from "../content/microcopy";
import type { GlossaryEntry } from "../types";

const GROUPS: GlossaryEntry["group"][] = ["Foundations", "Agent", "Good Practice"];

export function GlossaryPanel() {
  const open = useGame((s) => s.glossaryOpen);
  const activeTerm = useGame((s) => s.glossaryTerm);
  const close = useGame((s) => s.closeGlossary);
  const openGlossary = useGame((s) => s.openGlossary);
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the close button on open; restore focus on close.
  useEffect(() => {
    if (open) {
      const previouslyFocused = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
      return () => previouslyFocused?.focus?.();
    }
  }, [open]);

  // Scroll to the active term.
  useEffect(() => {
    if (open && activeTerm) {
      const el = document.getElementById(`glossary-${activeTerm}`);
      el?.scrollIntoView({ block: "center" });
    }
  }, [open, activeTerm]);

  // Escape closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-ink/20"
        onClick={close}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Glossary"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[380px] flex-col border-l border-hairline bg-surface shadow-pop"
      >
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
          <h2 className="text-h3 font-semibold">Glossary</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close glossary"
            className="ml-auto rounded-md p-1.5 text-ink/60 hover:bg-canvas hover:text-ink"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <div className="border-b border-hairline p-3">
          <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas px-3 py-2">
            <Search size={16} className="text-ink/50" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms"
              aria-label="Search glossary"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {filtered.length === 0 && (
            <p className="text-sm text-ink/70">{microcopy.empty.glossaryEmpty}</p>
          )}

          {GROUPS.map((group) => {
            const items = filtered.filter((g) => g.group === group);
            if (items.length === 0) return null;
            return (
              <section key={group} className="mb-5">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-accent">
                  {group}
                </h3>
                <ul className="space-y-3">
                  {items.map((g) => (
                    <li
                      key={g.id}
                      id={`glossary-${g.id}`}
                      className={
                        "rounded-lg border p-3 " +
                        (activeTerm === g.id
                          ? "border-brand/50 bg-brand/5"
                          : "border-hairline bg-surface")
                      }
                    >
                      <h4 className="font-semibold">{g.term}</h4>
                      <p className="mt-1 text-sm text-ink/90">{g.definition}</p>
                      <p className="mt-1 text-sm italic text-ink/70">
                        {g.atWork}
                      </p>
                      {g.related.length > 0 && (
                        <p className="mt-2 text-xs text-ink/60">
                          Related:{" "}
                          {g.related.map((r, i) => {
                            const rel = glossary.find((x) => x.id === r);
                            if (!rel) return null;
                            return (
                              <span key={r}>
                                {i > 0 && ", "}
                                <button
                                  type="button"
                                  onClick={() => openGlossary(r)}
                                  className="glossary-term"
                                >
                                  {rel.term}
                                </button>
                              </span>
                            );
                          })}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
