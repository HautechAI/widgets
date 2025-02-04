import { Typography } from "@mui/material";
import useLogic from "./logic";
import S from "./style";
import ImageIcon from "../../Icons/image.svg?react";
import type { Props } from "./types";

const EmptyState = (props: Props) => {
  const {} = useLogic(props);
  return (
    <S.Container>
      <ImageIcon width={64} height={64} />
      <Typography color="primary" variant="h6">
        No images generated yet
      </Typography>
    </S.Container>
  );
};

export default EmptyState;
