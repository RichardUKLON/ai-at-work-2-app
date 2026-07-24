import type { Artefact } from "../types";
import { RichText } from "./RichText";
import { AvaMark } from "./AvaMark";
import { Mail, MessageSquare, ScrollText, SlidersHorizontal } from "lucide-react";

// Realistic-but-stylised in-world documents (spec §5.4). Marked up as readable
// structured content, never images of text (WCAG 1.4.5).

export function ArtefactRenderer({ artefact }: { artefact: Artefact }) {
  switch (artefact.kind) {
    case "email":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-canvas px-4 py-2 text-sm">
            <Mail size={16} className="text-brand" aria-hidden />
            <span className="font-semibold">{artefact.subject}</span>
            <span className="ml-auto text-ink/60">{artefact.from}</span>
          </figcaption>
          <div className="space-y-3 px-4 py-4 text-[0.95rem] leading-relaxed">
            {artefact.body.map((line, i) => (
              <p key={i}>
                <RichText text={line} />
              </p>
            ))}
          </div>
        </figure>
      );

    case "chatThread":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-canvas px-4 py-2 text-sm">
            <MessageSquare size={16} className="text-brand" aria-hidden />
            <span className="font-semibold">Team channel</span>
          </figcaption>
          <ul className="divide-y divide-hairline">
            {artefact.messages.map((m, i) => (
              <li key={i} className="px-4 py-3">
                <span className="block text-xs font-semibold text-brand">{m.author}</span>
                <span className="text-[0.95rem]">
                  <RichText text={m.text} />
                </span>
              </li>
            ))}
          </ul>
        </figure>
      );

    case "aiReply":
      return (
        <figure className="overflow-hidden rounded-xl border border-brand/30 bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-brand/5 px-4 py-2 text-sm">
            <AvaMark size={18} />
            <span className="font-semibold">{artefact.title ?? "Ava"}</span>
          </figcaption>
          <div className="px-4 py-4 text-[0.95rem] leading-relaxed">
            <RichText text={artefact.body} />
          </div>
        </figure>
      );

    case "notes":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          {artefact.title && (
            <figcaption className="border-b border-hairline bg-canvas px-4 py-2 text-sm font-semibold">
              {artefact.title}
            </figcaption>
          )}
          <ul className="list-disc space-y-2 px-8 py-4 text-[0.95rem]">
            {artefact.lines.map((line, i) => (
              <li key={i}>
                <RichText text={line} />
              </li>
            ))}
          </ul>
        </figure>
      );

    case "actionLog":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-[#0D9488]/10 px-4 py-2 text-sm">
            <ScrollText size={16} className="text-[#0D9488]" aria-hidden />
            <span className="font-semibold">{artefact.title ?? "Agent action log — what Ava did, in order"}</span>
          </figcaption>
          <ul className="divide-y divide-hairline">
            {artefact.entries.map((e, i) => (
              <li
                key={i}
                className={
                  "flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-2.5 text-[0.92rem] " +
                  (e.flagged ? "bg-accent/10" : "")
                }
              >
                <span className="font-mono text-xs text-ink/60">{e.time}</span>
                <span className="min-w-0 flex-1">
                  <RichText text={e.action} />
                  {e.detail && <span className="text-ink/60"> — {e.detail}</span>}
                  {e.flagged && (
                    <span className="ml-2 rounded bg-accent/20 px-1.5 py-0.5 text-xs font-semibold text-accent">
                      review needed
                    </span>
                  )}
                </span>
                {e.cost && (
                  <span className="font-mono text-xs font-semibold text-accent">{e.cost}</span>
                )}
              </li>
            ))}
          </ul>
        </figure>
      );

    case "permissionSettings":
      return (
        <figure className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
          <figcaption className="flex items-center gap-2 border-b border-hairline bg-[#0D9488]/10 px-4 py-2 text-sm font-semibold">
            <SlidersHorizontal size={16} className="text-[#0D9488]" aria-hidden />
            {artefact.title ?? "Ava Pro · permissions"}
          </figcaption>
          <ul className="divide-y divide-hairline">
            {artefact.rows.map((r, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-2.5 text-[0.92rem]">
                <span className="min-w-0 flex-1">{r.permission}</span>
                {r.note && <span className="text-ink/55">{r.note}</span>}
                <span
                  className={
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                    (r.setting.toUpperCase() === "ON"
                      ? "bg-brand/15 text-brand"
                      : "bg-ink/10 text-ink/60")
                  }
                >
                  {r.setting}
                </span>
              </li>
            ))}
          </ul>
        </figure>
      );

    case "spreadsheet":
    case "table": {
      const isSheet = artefact.kind === "spreadsheet";
      return (
        <figure className="overflow-x-auto rounded-xl border border-hairline bg-surface shadow-card">
          {isSheet && (
            <figcaption className="border-b border-hairline bg-canvas px-4 py-2 text-sm font-semibold">
              Spreadsheet
            </figcaption>
          )}
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-canvas">
                {artefact.columns.map((c) => (
                  <th key={c} scope="col" className="border-b border-hairline px-3 py-2 font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {artefact.rows.map((row, ri) => (
                <tr key={ri} className="even:bg-canvas/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-b border-hairline px-3 py-2 align-top">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    }
  }
}
