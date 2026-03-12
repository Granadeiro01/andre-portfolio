import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark theme
        dark: {
          900: "#0a0e27",
          800: "#0f1535",
          700: "#1a2250",
          600: "#2d3561",
        },
        accent: {
          blue: "#00d4ff",
          purple: "#a855f7",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0a0e27 0%, #1a2250 100%)",
        "gradient-accent": "linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
