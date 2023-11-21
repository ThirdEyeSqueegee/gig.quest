import "@fontsource-variable/fira-code";
import "@fontsource-variable/inter";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CssVarsProvider defaultMode="dark" theme={theme}>
    <CssBaseline />
    <App />
  </CssVarsProvider>,
);
