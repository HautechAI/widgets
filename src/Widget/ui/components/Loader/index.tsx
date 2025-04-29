import { Typography } from "@hautechai/webui.typography";
import { Props } from "./types";
import { Box } from "@hautechai/webui.box";
import { Theme } from "@hautechai/webui.theme";
import { Progress } from "@hautechai/webui.progress";

export const Loader = (props: Props) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    grow={1}
    padding="l"
    style={{ flexDirection: "column", gap: Theme.foundation.spacing.ml }}
  >
    <Box>
      <Progress />
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ flexDirection: "column", gap: Theme.foundation.spacing.s }}
    >
      {props.title && (
        <Typography
          variant="LabelMediumEmphasized"
          color="layout.onSurface.primary"
          textAlign="center"
        >
          {props.title}
        </Typography>
      )}
      {props.text && (
        <Typography
          variant="LabelSmallRegular"
          color="layout.onSurface.secondary"
          textAlign="center"
        >
          {props.text}
        </Typography>
      )}
    </Box>
  </Box>
);
