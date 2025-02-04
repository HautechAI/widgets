import useLogic from "./logic";
import S from "./style";
import Stack from "./Stack";
import type { Props } from "./types";
import { CircularProgress } from "@mui/material";

const Stacks = (props: Props) => {
  const { onInit } = useLogic(props);
  return (
    <S.Container ref={onInit}>
      {props.loading && (
        <S.LoaderContainer>
          <CircularProgress size={20} />
        </S.LoaderContainer>
      )}
      {props.stacks
        .filter((stack) => stack.items.length > 0)
        .map((stack) => (
          <Stack
            key={stack.id}
            onDownloadImage={props.onDownloadImage}
            onSelectStack={props.onSelectStack}
            stack={stack}
          />
        ))}
    </S.Container>
  );
};

export default Stacks;
