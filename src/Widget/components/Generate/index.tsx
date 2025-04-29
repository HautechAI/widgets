import { ImageEntity, StackEntity } from "@hautechai/sdk";
import { TileTabGroup } from "@hautechai/webui.tiletabgroup";
import { Loader } from "../../ui";
import EmptyState from "./EmptyState";
import useLogic from "./logic";
import Stack from "./Stack";
import { TileTabItem } from "@hautechai/webui.tiletabitem";
import { Box } from "@hautechai/webui.box";
import { Column } from "@hautechai/webui.column";
import { Divider } from "@hautechai/webui.divider";
import { Field } from "@hautechai/webui.field";
import { TextInput } from "@hautechai/webui.textinput";
import {
  BackgroundIcon,
  FreeTextIcon,
  ModelIcon,
  PlaceholderIcon,
  PoseIcon,
  TShirtIcon,
} from "@hautechai/webui.icon";
import { Button } from "@hautechai/webui.button";
import { MODEL_IMG_MAP, ModelSelect } from "../ModelSelect";
import { useState } from "react";
import { BACKGROUND_IMG_MAP, BackgroundSelect } from "../BackgroundSelect";
import { ApparelSelect } from "../ApparelSelect";
import { POSE_IMG_MAP, PoseSelect } from "../PoseSelect";
import { FreeInput } from "../FreeInput";
import { AspectRatioSelect } from "../AspectRatioSelect";
import { AdvancedSettings } from "../AdvancedSettings";
import { InitialModelSelection } from "../InitialModelSelection";
import { Gallery } from "../Gallery";

import S from "./style";

enum TabOptions {
  APPAREL = "apparel",
  POSE = "pose",
  MODEL = "model",
  BACKGROUND = "background",
  FREE_INPUT = "freeInput",
  ASPECT_RATIO = "aspectRatio",
}

const Generate = () => {
  const { loading, onDeselectStack, onDownloadImage, selectedStackId, stacks } =
    useLogic();
  const [selectedTab, setSelectedTab] = useState<TabOptions>(
    TabOptions.APPAREL
  );
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [apparelPreview, setApparelPreview] = useState<string | null>(null);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [poseImage, setPoseImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [showGenerated, setShowGenerated] = useState(false);

  if (selectedStackId)
    return (
      <Stack
        onDeselectStack={onDeselectStack}
        onDownloadImage={onDownloadImage}
        stackId={selectedStackId}
      />
    );

  if (stacks.length === 0 && loading)
    return (
      <Loader
        title="Generating images may take up to 3 minutes"
        text="Please hang in there a little longer or you can close this tab and come back later"
      />
    );
  if (stacks.length === 0) return <EmptyState />;

  const handleApparelImageSelected = (file: File) => {
    setApparelPreview(URL.createObjectURL(file));
  };

  const handleModelSelected = (model: string) => {
    const modelImg = MODEL_IMG_MAP.get(model);

    if (modelImg) {
      setModelImage(modelImg);
    }
  };

  const handlePoseSelected = (pose: string) => {
    const poseImg = POSE_IMG_MAP.get(pose);
    if (poseImg) {
      setPoseImage(poseImg);
    }
  };

  const handleBackgroundSelected = (bg: string) => {
    const bgImg = BACKGROUND_IMG_MAP.get(bg);
    if (bgImg) {
      setBackgroundImage(bgImg);
    }
  };

  const tabsComponents = new Map([
    [
      TabOptions.APPAREL,
      <ApparelSelect onImageSelected={handleApparelImageSelected} />,
    ],
    [TabOptions.POSE, <PoseSelect onPoseSelected={handlePoseSelected} />],
    [TabOptions.MODEL, <ModelSelect onModelSelected={handleModelSelected} />],
    [
      TabOptions.BACKGROUND,
      <BackgroundSelect onBackgroundSelected={handleBackgroundSelected} />,
    ],
    [TabOptions.FREE_INPUT, <FreeInput />],
    [TabOptions.ASPECT_RATIO, <AspectRatioSelect />],
  ]);

  if (showGenerated) {
    return (
      <Gallery
        goBack={() => setShowGenerated(false)}
        imageURLs={stacks
          .flatMap((stack: StackEntity) => stack.items)
          .filter((item): item is ImageEntity => "url" in item)
          .flatMap((item) => item.url)}
      />
    );
  }

  return (
    <>
      {/* <Stacks
        loading={loading}
        onDownloadImage={onDownloadImage}
        onInitScrollController={onInitScrollController}
        onSelectStack={onSelectStack}
        stacks={stacks}
      /> */}
      {selectedModel ? (
        <S.Generator stretch>
          <AdvancedSettings
            selectedModel={selectedModel}
            onConfirm={setSelectedModel}
          />
          <Box
            padding="l"
            display="flex"
            overflowY="auto"
            grow={1}
            style={{
              flexDirection: "column",
            }}
          >
            <TileTabGroup
              wrap
              selected={selectedTab}
              onSelect={(tab) => setSelectedTab(tab as TabOptions)}
            >
              <TileTabItem
                value={TabOptions.APPAREL}
                label="Apparel"
                image={apparelPreview ?? undefined}
                icon={!apparelPreview ? <TShirtIcon /> : undefined}
              />
              <TileTabItem
                value={TabOptions.MODEL}
                label="Model"
                image={modelImage ?? undefined}
                icon={!modelImage ? <ModelIcon /> : undefined}
              />
              <TileTabItem
                value={TabOptions.POSE}
                label="Pose"
                image={poseImage ?? undefined}
                icon={!poseImage ? <PoseIcon /> : undefined}
              />
              <TileTabItem
                value={TabOptions.BACKGROUND}
                label="Background"
                image={backgroundImage ?? undefined}
                icon={!backgroundImage ? <BackgroundIcon /> : undefined}
              />
              <TileTabItem
                value={TabOptions.FREE_INPUT}
                label="Free input"
                icon={<FreeTextIcon />}
              />
              <TileTabItem
                value={TabOptions.ASPECT_RATIO}
                label="Aspect Ratio"
                icon={<PlaceholderIcon />}
              />
            </TileTabGroup>
            <Box paddingTop="l"></Box>
            <Divider />
            <Box paddingTop="l"></Box>
            {tabsComponents.get(selectedTab)}
          </Box>
          <S.Footer maxWidth="100%" padding="l">
            <Column stretch spacing="l">
              <Box maxWidth="100%">
                <Field title="Seed" direction="horizontal">
                  <TextInput type="text" placeholder="Auto" />
                </Field>
              </Box>
              <Box maxWidth="100%">
                <Button
                  stretch
                  variant="filled"
                  label="Generate"
                  onClick={() => setShowGenerated(true)}
                />
              </Box>
            </Column>
          </S.Footer>
        </S.Generator>
      ) : (
        <InitialModelSelection
          selectedModel={selectedModel}
          onConfirm={setSelectedModel}
        />
      )}
    </>
  );
};

export default Generate;
