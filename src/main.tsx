import "@fontsource/fira-code";
import "@fontsource/inter";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const theme = extendTheme({
  components: {
    JoyTooltip: {
      defaultProps: {
        enterTouchDelay: 25,
        leaveTouchDelay: 3000,
      },
    },
    JoyLink: {
      defaultProps: {
        target: "_blank",
        rel: "noopener",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark" theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
);
