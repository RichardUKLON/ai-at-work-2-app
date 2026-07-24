/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Spec §5.2 — palette
        brand: { DEFAULT: "#0F6E66", dark: "#0B544D" },
        ink: "#16242F",
        canvas: "#FAF8F5",
        surface: "#FFFFFF",
        hairline: "#E5E1DA",
        accent: "#B45309",
        focus: "#0FA3A3",
        verdict: {
          strong: "#1A7A3C",
          acceptable: "#1D5FBF",
          risky: "#B45309",
          unsafe: "#B3261E",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Source Sans 3",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        // rem-based; survives 200% zoom / user overrides (WCAG 1.4.4)
        h1: ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["1.5rem", { lineHeight: "1.25", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
      },
      maxWidth: { measure: "65ch" },
      boxShadow: {
        card: "0 1px 2px rgba(22,36,47,0.04), 0 6px 20px rgba(22,36,47,0.06)",
        pop: "0 10px 40px rgba(22,36,47,0.14)",
      },
      borderRadius: { xl2: "1.25rem" },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        slideIn: "slideIn 200ms ease-out",
        pop: "pop 360ms cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};
