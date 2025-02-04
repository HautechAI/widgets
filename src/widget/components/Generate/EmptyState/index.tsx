import { Typography } from "@mui/material";
import ImageIcon from "../../Icons/image.svg?react";
import useLogic from "./logic";
import S from "./style";

const EmptyState = () => {
  const {} = useLogic();
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
