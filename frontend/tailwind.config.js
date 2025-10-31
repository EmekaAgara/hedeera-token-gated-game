// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Hedera Brand Colors
        hedera: {
          purple: "#6F42C1",
          green: "#00C389",
          "purple-light": "#8B5FDF",
          "purple-dark": "#5A2D91",
          "green-light": "#33D4A3",
          "green-dark": "#00A375",
        },
        // Additional theme colors
        dark: {
          bg: "#0A0A0A",
          surface: "#1A1A1A",
          border: "#2A2A2A",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
        float: "float 6s ease-in-out infinite",
        shine: "shine 2s infinite",
        gradient: "gradient 3s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "hedera-purple": "0 0 20px rgba(111, 66, 193, 0.3)",
        "hedera-green": "0 0 20px rgba(0, 195, 137, 0.3)",
        glow: "0 0 50px -12px rgba(111, 66, 193, 0.25)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
