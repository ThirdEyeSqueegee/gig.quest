import "@fontsource/poppins";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
);
