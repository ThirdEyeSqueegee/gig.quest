import { extendTheme } from "@mui/joy";

export const theme = extendTheme({
  components: {
    JoyTooltip: {
      defaultProps: {
        enterTouchDelay: 25,
        leaveTouchDelay: 3000,
        arrow: true,
        variant: "soft",
      },
    },
    JoyLink: {
      defaultProps: {
        target: "_blank",
        rel: "noopener",
      },
    },
    JoySelect: {
      defaultProps: {
        slotProps: {
          listbox: {
            placement: "top",
            sx: {
              backgroundColor: "transparent",
              backdropFilter: "blur(15px)",
            },
          },
        },
      },
    },
  },
});
