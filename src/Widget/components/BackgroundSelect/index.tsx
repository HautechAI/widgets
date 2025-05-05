import { Row } from "@hautechai/webui.row";
import { Tile } from "@hautechai/webui.tile";
import { HoverControls } from "@hautechai/webui.hovercontrols";
import { FC, useState } from "react";
import { Props } from "./types";

export const BACKGROUND_IMG_MAP = new Map([
  ["bg1", "https://my.alfred.edu/zoom/_images/foster-lake.jpg"],
  ["bg2", "https://my.alfred.edu/zoom/_images/foster-lake.jpg"],
  ["bg3", "https://my.alfred.edu/zoom/_images/foster-lake.jpg"],
]);

export const BackgroundSelect: FC<Props> = ({ onBackgroundSelected }) => {
  const [selectedBackground, setSelectedBackground] = useState<
    string | undefined
  >();

  const handleBackgroundChange = (model: string) => {
    setSelectedBackground(model);
    onBackgroundSelected(model);
  };

  return (
    <>
      <Row wrap spacing="ml">
        {Array.from(BACKGROUND_IMG_MAP.entries()).map(([bg, image]) => (
          <HoverControls
            key={bg}
            selected={selectedBackground === bg}
            onChangeSelected={(isSelected) => {
              if (!isSelected) {
                setSelectedBackground(undefined);
                return;
              }
              handleBackgroundChange(bg);
            }}
          >
            <Tile height={150} aspectRatio={1.5} image={image} />
          </HoverControls>
        ))}
      </Row>
    </>
  );
};
