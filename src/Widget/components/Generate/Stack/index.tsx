import Actions from "./Actions";
import { CircularProgress, IconButton } from "@mui/material";
import { Loader } from "../../../ui";
import useLogic from "./logic";
import S from "./style";
import type { Props } from "./types";
import UndoRedo from "./UndoRedo";
import Back from "../../Icons/back.svg?react";

const Stack = (props: Props) => {
  const {
    canRedo,
    canUndo,
    canUpscale,
    image,
    imageUrl,
    onDownload,
    onUpscale,
    redo,
    retouchActions,
    running,
    stack,
    undo,
  } = useLogic(props);
  if (!image || !imageUrl) return <Loader />;

  const renderImage = () => {
    if (!imageUrl) return <CircularProgress size={48} />;

    return <S.Image src={imageUrl} />;
  };
  return (
    <S.Container>
      <S.Header>
        <IconButton onClick={props.onDeselectStack}>
          <Back />
        </IconButton>
        {running && <CircularProgress size={24} />}
      </S.Header>
      <S.Body>
        <UndoRedo canRedo={canRedo} canUndo={canUndo} redo={redo} undo={undo} />
        {renderImage()}
        <Actions
          disabled={running}
          canUpscale={canUpscale}
          image={image}
          onDownload={onDownload}
          onUpscale={onUpscale}
          retouchActions={retouchActions}
          stack={stack}
        />
      </S.Body>
    </S.Container>
  );
};

export default Stack;
