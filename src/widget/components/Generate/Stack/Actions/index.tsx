import ActionsListButton from "./ActionsListButton";
import type { Props } from "./types";
import S from "./style";
import { Typography } from "@mui/material";
import useLogic from "./logic";

const Actions = (props: Props) => {
  const {
    canShowDownload,
    canShowRetouch,
    canShowUpscale,
    downloadText,
    retouchText,
    upscaleText,
  } = useLogic();
  return (
    <S.Container>
      <S.Size>
        <Typography variant="body2">
          {props.image.width}x{props.image.height}
        </Typography>
      </S.Size>
      <S.Row>
        {canShowRetouch && (
          <ActionsListButton
            actions={props.retouchActions}
            disabled={props.disabled}
            name={retouchText}
          />
        )}
        {canShowUpscale && (
          <S.Button
            disabled={!props.canUpscale || props.disabled}
            onClick={props.onUpscale}
            variant="outlined"
          >
            <Typography variant="body2">{upscaleText}</Typography>
          </S.Button>
        )}
      </S.Row>

      {canShowDownload && (
        <S.Button
          disabled={props.disabled}
          onClick={props.onDownload}
          variant="outlined"
        >
          <Typography variant="body2">{downloadText}</Typography>
        </S.Button>
      )}
    </S.Container>
  );
};

export default Actions;
