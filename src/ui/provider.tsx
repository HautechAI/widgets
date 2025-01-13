import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

export const UIProvider = (props: { children: any }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {props.children}
  </ThemeProvider>
);
