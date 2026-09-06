import type { Config } from "tailwindcss";
import { tailwindColors } from "./tailwind.colors";
import { tailwindKeyframes, tailwindAnimation } from "./tailwind.animations";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: tailwindColors,
      borderRadius: {
        "3xl": "1.5rem",
        "2xl": "1rem",
        xl: "var(--radius)",
        lg: "calc(var(--radius) - 2px)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
      },
      fontFamily: {
        sans: [
          "var(--font-plus-jakarta-sans)",
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        "subtle-xs": "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        "subtle-sm": "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        "subtle-md": "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
        "subtle-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.08)",
        "glow-indigo": "0 0 24px -4px rgba(99, 102, 241, 0.25)",
        "glow-emerald": "0 0 24px -4px rgba(16, 185, 129, 0.25)",
      },
      keyframes: tailwindKeyframes,
      animation: tailwindAnimation,
    },
  },
  plugins: [],
};
export default config;
