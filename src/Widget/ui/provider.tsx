import { ThemeProvider } from "@hautechai/webui.themeprovider";
import { Theme } from "@hautechai/webui.theme";

export const UIProvider = (props: { children: any }) => (
  <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
);
