import { Row } from "@hautechai/webui.row";
import { Tile } from "@hautechai/webui.tile";
import { HoverControls } from "@hautechai/webui.hovercontrols";
import { FC, useState } from "react";
import { Props } from "./types";

export const POSE_IMG_MAP = new Map([
  [
    "pose1",
    "https://static.vecteezy.com/system/resources/previews/018/734/787/non_2x/girl-model-with-ponytail-pose-gesture-wearing-dress-skirt-standing-full-body-icon-silhouette-drawing-isolated-on-square-white-background-template-free-vector.jpg",
  ],
  [
    "pose2",
    "https://static.vecteezy.com/system/resources/previews/018/734/787/non_2x/girl-model-with-ponytail-pose-gesture-wearing-dress-skirt-standing-full-body-icon-silhouette-drawing-isolated-on-square-white-background-template-free-vector.jpg",
  ],
  [
    "pose3",
    "https://static.vecteezy.com/system/resources/previews/018/734/787/non_2x/girl-model-with-ponytail-pose-gesture-wearing-dress-skirt-standing-full-body-icon-silhouette-drawing-isolated-on-square-white-background-template-free-vector.jpg",
  ],
  [
    "pose4",
    "https://static.vecteezy.com/system/resources/previews/018/734/787/non_2x/girl-model-with-ponytail-pose-gesture-wearing-dress-skirt-standing-full-body-icon-silhouette-drawing-isolated-on-square-white-background-template-free-vector.jpg",
  ],
  [
    "pose5",
    "https://static.vecteezy.com/system/resources/previews/018/734/787/non_2x/girl-model-with-ponytail-pose-gesture-wearing-dress-skirt-standing-full-body-icon-silhouette-drawing-isolated-on-square-white-background-template-free-vector.jpg",
  ],
  [
    "pose6",
    "https://static.vecteezy.com/system/resources/previews/018/734/787/non_2x/girl-model-with-ponytail-pose-gesture-wearing-dress-skirt-standing-full-body-icon-silhouette-drawing-isolated-on-square-white-background-template-free-vector.jpg",
  ],
  [
    "pose7",
    "https://static.vecteezy.com/system/resources/previews/018/734/787/non_2x/girl-model-with-ponytail-pose-gesture-wearing-dress-skirt-standing-full-body-icon-silhouette-drawing-isolated-on-square-white-background-template-free-vector.jpg",
  ],
]);

export const PoseSelect: FC<Props> = ({ onPoseSelected }) => {
  const [selectedPose, setSelectedPose] = useState<string | undefined>();

  const handlePoseChange = (pose: string) => {
    setSelectedPose(pose);
    onPoseSelected(pose);
  };

  return (
    <>
      <Row wrap spacing="ml">
        {Array.from(POSE_IMG_MAP.entries()).map(([pose, image]) => (
          <HoverControls
            key={pose}
            selected={selectedPose === pose}
            onChangeSelected={(isSelected) => {
              if (!isSelected) {
                setSelectedPose(undefined);
                return;
              }
              handlePoseChange(pose);
            }}
          >
            <Tile size="small" image={image} />
          </HoverControls>
        ))}
      </Row>
    </>
  );
};
