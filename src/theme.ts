import { extendTheme } from "@mui/joy";

export const theme = extendTheme({
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
