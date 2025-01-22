import { getImageFromStack } from "../../utils";
import type { Props } from "./types";
import { useCallback, useMemo } from "react";
import { useImage } from "../../api";

const useLogic = (props: Props) => {
  const canShow = props.stack.items.some(
    (operation: any) =>
      operation.type === "select.v1" && operation.status === "finished"
  );
  const imageId = useMemo(() => getImageFromStack(props.stack), [props.stack]);
  const imageQuery = useImage(imageId!);

  const lastOperation = useMemo(
    () =>
      props.stack.items.length > 0
        ? props.stack.items[props.stack.items.length - 1]
        : null,
    [props.stack]
  );
  const onSelect = useCallback(() => {
    props.onSelectStack(props.stack.id);
  }, [props.onSelectStack, props.stack.id]);

  return { canShow, imageUrl: imageQuery.data?.url, lastOperation, onSelect };
};

export default useLogic;
