import type { Badge } from "../types";
import { getIcon } from "../lib/icons";

// Renders a badge's medallion: the generated PNG from the prompt sheet when
// present, otherwise the Lucide fallback mark.
export function BadgeMedallion({
  badge,
  size = 44,
}: {
  badge: Badge;
  size?: number;
}) {
  if (badge.image) {
    return (
      <img
        src={badge.image}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const Icon = getIcon(badge.icon);
  return <Icon size={Math.round(size * 0.5)} aria-hidden />;
}
