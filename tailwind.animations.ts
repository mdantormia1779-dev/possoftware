export const tailwindKeyframes = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  pulseSlow: {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.4" },
  },
  fadeSlideIn: {
    from: { opacity: "0", transform: "translateY(6px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
};

export const tailwindAnimation = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "pulse-slow": "pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "fade-slide": "fadeSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
};
