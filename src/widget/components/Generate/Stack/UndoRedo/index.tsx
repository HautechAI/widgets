import { IconButton, Tooltip } from "@mui/material";
import useLogic from "./logic";
import S from "./style";
import type { Props } from "./types";
import Undo from "../../../Icons/undo.svg?react";
import Redo from "../../../Icons/redo.svg?react";

const UndoRedo = (props: Props) => {
  const {} = useLogic();

  return (
    <S.Container>
      <Tooltip title="Revert to previous state">
        <IconButton disabled={!props.canUndo} onClick={props.undo}>
          <Undo />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo reverted operation">
        <IconButton disabled={!props.canRedo} onClick={props.redo}>
          <Redo />
        </IconButton>
      </Tooltip>
    </S.Container>
  );
};

export default UndoRedo;
