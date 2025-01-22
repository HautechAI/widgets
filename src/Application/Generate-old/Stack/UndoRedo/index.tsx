import { IconButton, Tooltip } from "@mui/material";
import useLogic from "./logic";
import S from "./style";
import type { Props } from "./types";
import { MaterialSymbol } from "react-material-symbols";

const UndoRedo = (props: Props) => {
  const {} = useLogic(props);

  return (
    <S.Container>
      <Tooltip title="Revert to previous state">
        <IconButton disabled={!props.canUndo} onClick={props.undo}>
          <MaterialSymbol icon="undo" size={24} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo reverted operation">
        <IconButton disabled={!props.canRedo} onClick={props.redo}>
          <MaterialSymbol icon="redo" size={24} />
        </IconButton>
      </Tooltip>
    </S.Container>
  );
};

export default UndoRedo;
