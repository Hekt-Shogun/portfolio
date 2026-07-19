import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        blood: "#E30613",
        cyan: "#00E5FF",
        pink: "#FF2E93",
        yellow: "#F4FF3D",
        panel: "#0A0A0A",
        smoke: "#161616",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        caption: ["var(--font-oswald)", "sans-serif"],
      },
      backgroundImage: {
        halftone:
          "radial-gradient(circle, rgba(0,0,0,0.85) 1px, transparent 1.2px)",
        "halftone-red":
          "radial-gradient(circle, rgba(227,6,19,0.9) 1px, transparent 1.2px)",
        noise: "url('/noise.svg')",
      },
      backgroundSize: {
        halftone: "6px 6px",
        "halftone-lg": "10px 10px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
        },
        "slam-in": {
          "0%": { transform: "scale(2.2) rotate(-6deg)", opacity: "0" },
          "60%": { transform: "scale(0.96) rotate(1deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 18s linear infinite",
        flicker: "flicker 6s ease-in-out infinite",
        "slam-in": "slam-in 0.7s cubic-bezier(.2,.9,.3,1.2) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
