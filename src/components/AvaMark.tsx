// Ava's visual identity — a soft abstract geometric mark, deliberately not a
// face or robot (spec §5.4), so it never undercuts Lesson 1.

export function AvaMark({
  size = 28,
  className = "",
  title = "Ava, the company AI assistant",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={title}
    >
      <circle cx="24" cy="24" r="22" fill="#0F6E66" opacity="0.10" />
      <circle cx="24" cy="24" r="15" fill="#0F6E66" opacity="0.18" />
      <circle cx="24" cy="24" r="8" fill="#0F6E66" />
      <circle cx="24" cy="24" r="3" fill="#B45309" />
    </svg>
  );
}
