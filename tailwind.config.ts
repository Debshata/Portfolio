import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // DC Archives palette — from the design system sheet.
        // Navy carries structure; yellow is reserved for state and action.
        ground: "#02070F",
        bg: "#06101F",
        alt: "#09182A",
        panel: "#0D1E32",
        accent: {
          DEFAULT: "#FFD84A",
          bright: "#FFE66D",
          muted: "#C8A93E"
        },
        // Text ramp, brightest to dimmest: ink (emphasis) → body (prose) → mute (metadata)
        ink: "#F5E8A8",
        body: "#C3CAD5",
        mute: "#8E9AAF",
        hair: "rgba(255,216,74,0.22)",
        "hair-strong": "rgba(255,216,74,0.42)"
      },
      fontFamily: {
        display: ["VT323", "Iosevka", "ui-monospace", "monospace"],
        body: ["Iosevka", "ui-monospace", "monospace"],
        mono: ["Iosevka", "ui-monospace", "monospace"]
      },
      // Eight type roles replacing 21 ad-hoc sizes. Each pairs its own line
      // height and tracking, because light-on-navy needs more of both than the
      // same face would on white.
      fontSize: {
        "display-1": ["clamp(3rem,10.5vw,7.5rem)", { lineHeight: "0.86", letterSpacing: "0.005em" }],
        "display-2": ["clamp(2.125rem,4.4vw,3.5rem)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "display-3": ["clamp(1.5rem,2.8vw,2.125rem)", { lineHeight: "1.1", letterSpacing: "0.01em" }],
        "display-4": ["clamp(1.125rem,1.9vw,1.5rem)", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        lede: ["1.0625rem", { lineHeight: "1.7" }],
        prose: ["1rem", { lineHeight: "1.7" }],
        "prose-sm": ["0.9375rem", { lineHeight: "1.65" }],
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
        meta: ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.18em" }]
      },
      maxWidth: {
        content: "1400px",
        // Reading measures in characters, so they hold across type scale changes.
        measure: "68ch",
        "measure-sm": "54ch"
      },
      letterSpacing: { label: "0.18em", wide: "0.24em" },
      transitionTimingFunction: {
        micro: "cubic-bezier(.4,0,.2,1)",
        standard: "cubic-bezier(.22,1,.36,1)",
        cinematic: "cubic-bezier(.16,1,.3,1)"
      },
      transitionDuration: { micro: "180ms", standard: "400ms", cinematic: "900ms" },
      keyframes: {
        dcBlink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        dcRise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } }
      },
      animation: {
        blink: "dcBlink 1s steps(1) infinite",
        rise: "dcRise 400ms cubic-bezier(.22,1,.36,1) both"
      }
    }
  },
  plugins: []
};

export default config;
