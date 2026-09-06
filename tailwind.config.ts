import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // DC Archives palette — from the design system sheet
        ground: "#02070F",
        bg: "#06101F",
        alt: "#09182A",
        panel: "#0D1E32",
        accent: {
          DEFAULT: "#FFD84A",
          bright: "#FFE66D",
          muted: "#C8A93E"
        },
        ink: "#F5E8A8",
        mute: "#8E9AAF",
        hair: "rgba(255,216,74,0.22)"
      },
      fontFamily: {
        display: ["VT323", "Iosevka", "ui-monospace", "monospace"],
        body: ["Iosevka", "ui-monospace", "monospace"],
        mono: ["Iosevka", "ui-monospace", "monospace"]
      },
      maxWidth: { content: "1440px" },
      letterSpacing: { label: "0.18em", wide: "0.24em" },
      transitionTimingFunction: {
        micro: "cubic-bezier(.4,0,.2,1)",
        standard: "cubic-bezier(.22,1,.36,1)",
        cinematic: "cubic-bezier(.16,1,.3,1)"
      },
      transitionDuration: { micro: "180ms", standard: "400ms", cinematic: "900ms" },
      keyframes: {
        dcBlink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        dcScan: { "0%": { transform: "translateY(-10%)" }, "100%": { transform: "translateY(1000%)" } },
        dcRise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } }
      },
      animation: {
        blink: "dcBlink 1s steps(1) infinite",
        scan: "dcScan 7s linear infinite",
        rise: "dcRise 400ms cubic-bezier(.22,1,.36,1) both"
      }
    }
  },
  plugins: []
};

export default config;
