import "@fontsource-variable/figtree";
import "@fontsource-variable/fira-code";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import { theme } from "./Theme.ts";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <CssVarsProvider defaultMode="dark" theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>,
  );
}
