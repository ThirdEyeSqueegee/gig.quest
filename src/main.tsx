import "@fontsource-variable/fira-code";
import "@fontsource-variable/inter";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import { theme } from "./Theme.ts";

createRoot(document.getElementById("root")!).render(
  <CssVarsProvider defaultMode="dark" theme={theme}>
    <CssBaseline />
    <App />
  </CssVarsProvider>,
);
