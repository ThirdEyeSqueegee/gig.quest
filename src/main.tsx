import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  CssVarsProvider as JoyCssVarsProvider,
  CssBaseline as JoyCssBaseline,
} from "@mui/joy";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";

const materialTheme = materialExtendTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider defaultColorScheme={"dark"}>
        <JoyCssBaseline />
        <App />
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </React.StrictMode>
);
