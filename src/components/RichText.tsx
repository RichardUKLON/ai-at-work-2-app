import { Fragment, type ReactNode } from "react";
import { useGame } from "../store";
import { termToId } from "../lib/glossaryAlias";

// Renders a RichText string: **bold** spans and ~glossary-term~ links.
// Glossary terms are real buttons (keyboard-focusable) that open the panel.

function renderBold(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-b${i}`} className="font-semibold">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-t${i}`}>{p}</Fragment>;
  });
}

export function RichText({ text }: { text: string }) {
  const openGlossary = useGame((s) => s.openGlossary);
  const segments = text.split(/(~[^~]+~)/g);

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.startsWith("~") && seg.endsWith("~")) {
          const display = seg.slice(1, -1);
          const id = termToId(display);
          if (id) {
            return (
              <button
                key={i}
                type="button"
                className="glossary-term"
                aria-haspopup="dialog"
                onClick={() => openGlossary(id)}
                title={`Glossary: ${display}`}
              >
                {display}
                <span className="sr-only"> (open glossary)</span>
              </button>
            );
          }
          return <Fragment key={i}>{display}</Fragment>;
        }
        return <Fragment key={i}>{renderBold(seg, `s${i}`)}</Fragment>;
      })}
    </>
  );
}
