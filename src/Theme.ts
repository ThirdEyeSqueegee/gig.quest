import { extendTheme } from "@mui/joy";

export const theme = extendTheme({
  components: {
    JoyCircularProgress: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === "xs" && {
            "--_progress-thickness": "3px",
            "--_root-size": "16px",
            "--_track-thickness": "3px",
          }),
        }),
      },
    },
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
              backdropFilter: "blur(8px)",
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

declare module "@mui/joy/CircularProgress" {
  interface CircularProgressPropsSizeOverrides {
    xs: true;
  }
}
