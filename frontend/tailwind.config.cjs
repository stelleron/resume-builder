
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mydark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "primary": "#38bdf8",
          "secondary": "#64748b",
          "accent": "#fbbf24",
          "neutral": "#1f2937",
          "base-100": "#111827",
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
          "fontFamily": {
            body: "Inter, sans-serif",
            display: "Inter, sans-serif"
          }
        }
      }
    ],
    darkTheme: "mydark",
  },
};