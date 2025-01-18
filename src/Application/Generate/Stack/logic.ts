import { getImageFromStack } from "../utils";
import { useCollectionStacks, useImage } from "../api";
import type { Props } from "./types";
import { useCallback, useMemo, useState } from "react";
import { useSDK } from "../../../widget";

const useLogic = (props: Props) => {
  const sdk = useSDK();
  const stacksAPI = useCollectionStacks(props.collectionId);
  const stacks = stacksAPI.read();

  const stack = useMemo(
    () => stacks.value.find((stack) => stack.id === props.stackId)!,
    [stacks.value, props.stackId]
  );

  const imageId = useMemo(() => getImageFromStack(stack), [stack]);
  const imageQuery = useImage(imageId!);
  const [loading, setLoading] = useState(false);

  const runAction = useCallback(async (action: () => Promise<void>) => {
    setLoading(true);
    try {
      await action();
    } finally {
      setLoading(false);
    }
  }, []);

  const canRedo = useMemo(
    () => (stack.metadata.undone?.length ?? 0) > 0 && !loading,
    [loading, stack.metadata]
  );
  const canUndo = useMemo(
    () => stack.operations.length > 2 && !loading,
    [loading, stack.operations]
  );
  const canUpscale = useMemo(
    () =>
      stack.operations.every((operation) => operation.type !== "upscale.v1") &&
      !loading,
    [loading, stack]
  );

  const onDownload = useCallback(async () => {
    if (!imageId) return;
    await runAction(() => props.onDownloadImage(imageId));
  }, [imageId, props.onDownloadImage, runAction]);

  const onRetouch = useCallback(
    async (category: "bottom" | "dress" | "top") => {
      if (!imageId) return;
      await runAction(async () => {
        const productImageId = stack.operations[0].input.productImageId;

        let describeOperation = await sdk.operations.create.describeProduct.v1({
          input: { imageId: productImageId },
        });
        describeOperation = await sdk.operations.wait({
          id: describeOperation.id,
        });
        if (!describeOperation.output?.text)
          throw new Error("Failed to describe product");

        const operation = await sdk.operations.create.retouch.v1({
          input: {
            imageId,
            productImageId,
            productDescription: describeOperation.output.text,
            category,
            seed: sdk.utils.seed(),
          },
        });

        await stacksAPI.addOperations({
          id: stack.id,
          operationIds: [operation.id],
        });
      });
    },
    [imageId, runAction, stack, stacksAPI.addOperations]
  );

  const onUpscale = useCallback(async () => {
    if (!canUpscale || !imageId) return;
    await runAction(async () => {
      const operation = await sdk.operations.create.upscale.v1({
        input: { imageId },
      });
      await stacksAPI.addOperations({
        id: stack.id,
        operationIds: [operation.id],
      });
      await stacksAPI.update({ id: stack.id, metadata: { undone: [] } });
    });
  }, [
    canUpscale,
    imageId,
    runAction,
    stack.id,
    stacksAPI.addOperations,
    stacksAPI.update,
  ]);

  const retouchActions = useMemo(
    () => [
      { name: "Retouch bottom", onClick: () => onRetouch("bottom") },
      { name: "Retouch dress", onClick: () => onRetouch("dress") },
      { name: "Retouch top", onClick: () => onRetouch("top") },
    ],
    [onRetouch]
  );

  const running = useMemo(
    () =>
      loading ||
      stack.operations.some((operation) => operation.status === "pending"),
    [loading, stack.operations]
  );

  const redo = useCallback(async () => {
    if (!canRedo) return;
    await runAction(async () => {
      const undone = stack.metadata.undone!;
      await stacksAPI.addOperation({ id: stack.id, operationId: undone[0] });
      await stacksAPI.update({
        id: stack.id,
        metadata: { undone: undone.slice(1) },
      });
    });
  }, [canRedo, runAction, stack.id, stacksAPI.addOperation, stacksAPI.update]);

  const undo = useCallback(async () => {
    if (!canUndo) return;
    await runAction(async () => {
      const operation = stack.operations[stack.operations.length - 1];
      await stacksAPI.removeOperation({
        id: stack.id,
        operationId: operation.id,
      });
      await stacksAPI.update({
        id: stack.id,
        metadata: { undone: [operation.id, ...(stack.metadata.undone ?? [])] },
      });
    });
  }, [
    canUndo,
    runAction,
    stack.id,
    stacksAPI.removeOperation,
    stacksAPI.update,
  ]);

  return {
    canRedo,
    canUndo,
    canUpscale,
    image: imageQuery.data?.image,
    imageUrl: imageQuery.data?.url,
    onDownload,
    onUpscale,
    redo,
    retouchActions,
    running,
    stack,
    undo,
  };
};

export default useLogic;
