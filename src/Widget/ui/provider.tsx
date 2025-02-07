import { ThemeProvider } from "@mui/material";
import theme from "./theme";

export const UIProvider = (props: { children: any }) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
