import { Button } from "@hautechai/webui.button";
import { Column } from "@hautechai/webui.column";
import {
  AiEditorIcon,
  ArrowAltLeftIcon,
  DownloadIcon,
} from "@hautechai/webui.icon";
import { IconButton } from "@hautechai/webui.iconbutton";
import { Row } from "@hautechai/webui.row";
import { Theme } from "@hautechai/webui.theme";
import { Tile } from "@hautechai/webui.tile";
import { FC } from "react";
import { Props } from "./types";

import S from "./style";

export const Gallery: FC<Props> = ({ goBack, imageURLs }) => {
  return (
    <S.Wrapper display="flex" grow={1}>
      <S.Header
        padding="xs"
        paddingLeft="m"
        paddingRight="m"
        justifyContent="flex-start"
      >
        <IconButton
          variant="flat"
          size="medium"
          onClick={goBack}
          icon={
            <ArrowAltLeftIcon
              color={Theme.palette.layout.onSurface.secondary}
            />
          }
        />
      </S.Header>
      <S.Images padding="l" display="flex" grow={1} overflowY="auto">
        {imageURLs.map((imageURL, idx) => (
          <Column key={idx} spacing="ml">
            <Tile width="100%" image={imageURL} />
            <Row spacing="m">
              <Button
                stretch
                variant="outlined"
                size="small"
                hierarchy="secondary"
                leadingIcon={<DownloadIcon size={20} />}
                label="Download"
              />
              <Button
                stretch
                variant="outlined"
                size="small"
                hierarchy="secondary"
                leadingIcon={<AiEditorIcon size={20} />}
                label="Edit image"
              />
            </Row>
          </Column>
        ))}
      </S.Images>
      <S.Footer maxWidth="100%" padding="l">
        <Button
          stretch
          variant="filled"
          label="Generate more"
          onClick={goBack}
        />
      </S.Footer>
    </S.Wrapper>
  );
};
