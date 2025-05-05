import { Typography } from "@hautechai/webui.typography";
import ImageIcon from "../../Icons/image.svg?react";
import useLogic from "./logic";
import S from "./style";

const EmptyState = () => {
  const {} = useLogic();
  return (
    <S.Container>
      <ImageIcon width={64} height={64} />
      <Typography variant="H3" color="layout.onSurface.primary">
        No images generated yet
      </Typography>
    </S.Container>
  );
};

export default EmptyState;
