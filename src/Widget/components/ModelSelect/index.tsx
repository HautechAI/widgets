import { Column } from "@hautechai/webui.column";
import { Dropdown } from "@hautechai/webui.dropdown";
import { HoverControls } from "@hautechai/webui.hovercontrols";
import { Row } from "@hautechai/webui.row";
import { Tile } from "@hautechai/webui.tile";
import { FC, useState } from "react";
import { Props } from "./types";

export const MODEL_IMG_MAP = new Map([
  [
    "model1",
    "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-colorful-face-make-up_23-2149580873.jpg?semt=ais_hybrid&w=740",
  ],
  [
    "model2",
    "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-colorful-face-make-up_23-2149580873.jpg?semt=ais_hybrid&w=740",
  ],
  [
    "model3",
    "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-colorful-face-make-up_23-2149580873.jpg?semt=ais_hybrid&w=740",
  ],
  [
    "model4",
    "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-colorful-face-make-up_23-2149580873.jpg?semt=ais_hybrid&w=740",
  ],
  [
    "model5",
    "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-colorful-face-make-up_23-2149580873.jpg?semt=ais_hybrid&w=740",
  ],
]);

export const ModelSelect: FC<Props> = ({ onModelSelected }) => {
  const [selectedModel, setSelectedModel] = useState<string | undefined>();

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onModelSelected(model);
  };

  return (
    <Column spacing="ml">
      <Row spacing="ml">
        <Dropdown
          value="male"
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />
        <Dropdown
          value="adult"
          options={[
            {
              label: "Senior",
              value: "senior",
            },
            {
              label: "Adult",
              value: "adult",
            },
            {
              label: "Teen",
              value: "teen",
            },
            {
              label: "Pre-Teen",
              value: "preTeen",
            },
            {
              label: "Toddler",
              value: "toddler",
            },
          ]}
        />
      </Row>
      <Row wrap spacing="ml">
        {Array.from(MODEL_IMG_MAP.entries()).map(([model, image]) => (
          <HoverControls
            key={model}
            selected={selectedModel === model}
            onChangeSelected={(isSelected) => {
              if (!isSelected) {
                setSelectedModel(undefined);
                return;
              }
              handleModelChange(model);
            }}
          >
            <Tile size="small" image={image} />
          </HoverControls>
        ))}
      </Row>
    </Column>
  );
};
