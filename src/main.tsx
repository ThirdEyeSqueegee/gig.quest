import {
  CssBaseline as JoyCssBaseline,
  CssVarsProvider as JoyCssVarsProvider,
} from "@mui/joy";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const materialTheme = materialExtendTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider defaultColorScheme={"dark"}>
        <JoyCssBaseline />
        <App />
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </React.StrictMode>,
);
