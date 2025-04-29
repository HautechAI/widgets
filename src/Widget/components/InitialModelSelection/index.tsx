import { Box } from "@hautechai/webui.box";
import { Button } from "@hautechai/webui.button";
import { Hint } from "@hautechai/webui.hint";
import { SegmentedControl } from "@hautechai/webui.segmentedcontrol";
import { Typography } from "@hautechai/webui.typography";
import { FC, useState } from "react";
import { Props } from "./types";

import S from "./style";

export const MODEL_OPTIONS = [
  {
    label: "Linda V1",
    value: "linda",
    trailingIcon: (
      <Hint
        position="bottom"
        hint="This is a tooltip. Tooltips are used to describe or identify an element."
      />
    ),
  },
  {
    label: "Naomi V2",
    value: "naomi",
    trailingIcon: (
      <Hint
        position="bottom"
        hint="This is a tooltip. Tooltips are used to describe or identify an element."
      />
    ),
  },
];

export const InitialModelSelection: FC<Props> = ({
  selectedModel,
  onConfirm,
}) => {
  const [newSelectedModel, setNewSelectedModel] = useState(
    selectedModel ?? MODEL_OPTIONS[0].value
  );

  const handleModelChange = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    val: string
  ) => {
    setNewSelectedModel(val);
  };

  const handleSave = () => {
    onConfirm(newSelectedModel);
  };

  return (
    <S.Wrapper display="flex" alignItems="center" grow={1}>
      <S.Text
        paddingTop="l"
        paddingLeft="l"
        paddingRight="l"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="H1"
          textAlign="center"
          color="layout.onSurface.primary"
        >
          Choose AI model to generate images
        </Typography>
        <Typography
          variant="Body"
          textAlign="center"
          color="layout.onSurface.secondary"
        >
          There are different prompt settings depending on which AI model you
          choose. You can change it in the settings, but you’ll have to set
          entire prompt from the start.
        </Typography>
      </S.Text>
      <Box
        maxWidth={265}
        grow={1}
        style={{
          flexDirection: "column",
        }}
      >
        <SegmentedControl
          value={newSelectedModel}
          onChange={handleModelChange}
          whitespace="xl"
          options={MODEL_OPTIONS}
        />
      </Box>
      <S.FooterBox width="100%" padding="l">
        <Button
          stretch
          variant="filled"
          label="Save my choice"
          onClick={handleSave}
        />
      </S.FooterBox>
    </S.Wrapper>
  );
};
