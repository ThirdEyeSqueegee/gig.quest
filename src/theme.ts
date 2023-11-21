import { extendTheme } from "@mui/joy";

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        danger: {
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d",
        },
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
        },
        success: {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d",
        },
        warning: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde68a",
          "300": "#fcd34d",
          "400": "#fbbf24",
          "500": "#f59e0b",
          "600": "#d97706",
          "700": "#b45309",
          "800": "#92400e",
          "900": "#78350f",
        },
      },
    },
  },
  components: {
    JoyLink: {
      defaultProps: {
        rel: "noopener",
        target: "_blank",
      },
    },
    JoySelect: {
      defaultProps: {
        slotProps: {
          listbox: {
            placement: "top",
            sx: {
              backdropFilter: "blur(10px)",
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
    JoyTooltip: {
      defaultProps: {
        arrow: true,
        enterTouchDelay: 25,
        leaveTouchDelay: 3000,
        variant: "soft",
      },
    },
  },
});
