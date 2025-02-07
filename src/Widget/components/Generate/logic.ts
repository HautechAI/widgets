import { useCallback, useEffect, useRef, useState } from "react";
import { useWidgetContext } from "../../context";
import { useCollectionStacks } from "./api";
import { getImageFromStack } from "./utils";

const NaomiPreprocessedGarment: Record<string, string> = {};

const useLogic = () => {
  const { sdk, widgetProps, widgetHandlers, methodsRef } = useWidgetContext();

  const scrollController = useRef<{ scrollToTop: () => void } | undefined>(
    undefined
  );

  const [selectedStackId, setSelectedStackId] = useState<string | null>(null);

  const stacksAPI = useCollectionStacks(widgetProps.collectionId ?? "");
  const stacks = stacksAPI.read();

  const [loading, setLoading] = useState(false);

  const onGetImages = useCallback(async () => {
    const visibleStacks = stacks.value;

    return visibleStacks
      .map((stack) => getImageFromStack(stack))
      .filter((imageId) => !!imageId) as string[];
  }, [stacks.value]);

  const onStart = useCallback(async () => {
    const shouldScroll = stacks.value.length > 0;
    setLoading(true);

    try {
      if (widgetProps.input?.model === "linda") {
        const hauteOperation = await sdk.operations.wait(
          await sdk.operations.create.haute.linda.v1({
            input: {
              aspectRatio: widgetProps.input?.aspectRatio ?? "1:1",
              productImageId: widgetProps.input?.productImageId ?? "",
              prompt: widgetProps.input?.prompt ?? "",
              seed: widgetProps.input?.seed ?? sdk.utils.seed(),
            },
          })
        );

        await Promise.all(
          ((hauteOperation.output as any)?.imageIds ?? []).map(
            async (imageId: string) => {
              if (widgetProps.input?.enhance) {
                const enhanceOperation = await sdk.operations.wait(
                  await sdk.operations.create.inpaint.kate.v1({
                    input: {
                      imageId: imageId,
                      prompt: widgetProps.input?.prompt ?? "",
                      strength: 0.25,
                      seed: widgetProps.input?.seed ?? sdk.utils.seed(),
                    },
                  })
                );

                imageId = (enhanceOperation.output as any).imageId;
              }

              const newStack = await stacksAPI.create();
              await stacksAPI.addItems({
                id: newStack.id,
                itemIds: [imageId],
              });
            }
          )
        );
      } else {
        // preprocess garment for naomi
        if (!NaomiPreprocessedGarment[widgetProps.input?.productImageId!]) {
          const detectionOperation = await sdk.operations.wait(
            await sdk.operations.create.detect.v1({
              input: {
                imageId: widgetProps.input?.productImageId!,
                labels: [widgetProps.input?.category ?? "garment"],
              },
            })
          );

          const maskOperation = await sdk.operations.wait(
            await sdk.operations.create.segmentMask.v1({
              input: {
                imageId: widgetProps.input?.productImageId!,
                box: (detectionOperation.output as any).data?.[0]!,
              },
            })
          );

          const garmentMaskId = (maskOperation.output as any).imageId;

          const cutOperation = await sdk.operations.wait(
            await sdk.operations.create.cut.v1({
              input: {
                imageId: widgetProps.input?.productImageId!,
                maskImageId: garmentMaskId,
              },
            })
          );

          const cutGarmentImageId = (cutOperation.output as any).imageId;

          const compositeOperation = await sdk.operations.wait(
            await sdk.operations.create.composite.v1({
              input: {
                width: 832,
                height: 1200,
                background: "#FFFFFFFF",
                elements: [
                  {
                    imageId: cutGarmentImageId,
                    left: 30,
                    top: 30,
                    width: 772,
                    height: 1140,
                    fit: "contain",
                  },
                ],
              },
            })
          );

          NaomiPreprocessedGarment[widgetProps.input?.productImageId!] = (
            compositeOperation.output as any
          ).imageId;
          ///
        }

        const hauteOperation = await sdk.operations.wait(
          await sdk.operations.create.haute.naomi.v1({
            input: {
              width: 832,
              height: 1200,
              prompt: widgetProps.input?.prompt ?? "",
              seed: widgetProps.input?.seed ?? sdk.utils.seed(),
              category: widgetProps.input?.category ?? "top",
              garmentImageId:
                NaomiPreprocessedGarment[widgetProps.input?.productImageId!],
              poseId: widgetProps.input?.poseId ?? "",
            },
          })
        );
        if (hauteOperation.status === "failed") {
          console.error(hauteOperation);
          return;
        }

        let resultImageId = (hauteOperation.output as any)?.imageId;

        if (widgetProps.input?.enhance) {
          const detectApparel = await sdk.operations.wait(
            await sdk.operations.create.detect.v1({
              input: {
                imageId: resultImageId,
                labels: [widgetProps.input?.category ?? "garment"],
              },
            })
          );

          const maskApparel = await sdk.operations.wait(
            await sdk.operations.create.segmentMask.v1({
              input: {
                imageId: resultImageId,
                box: (detectApparel as any).output.data[0],
              },
            })
          );

          const negativeMask = await sdk.operations.wait(
            await sdk.operations.create.negateImage.v1({
              input: {
                imageId: maskApparel.output?.imageId!,
              },
            })
          );

          const enhanceOperation = await sdk.operations.wait(
            await sdk.operations.create.inpaint.kate.v1({
              input: {
                imageId: resultImageId,
                maskImageId: negativeMask.output?.imageId!,
                prompt: widgetProps.input?.prompt ?? "",
                strength: 0.4,
                seed: widgetProps.input?.seed ?? sdk.utils.seed(),
                maskSpread: 25,
              },
            })
          );

          resultImageId = enhanceOperation.output?.imageId;
        }

        const newStack = await stacksAPI.create();
        await stacksAPI.addItems({
          id: newStack.id,
          itemIds: [resultImageId],
        });
      }

      if (shouldScroll)
        setTimeout(() => scrollController.current?.scrollToTop(), 500);
    } finally {
      setLoading(false);
    }
  }, [widgetProps.input, stacks.value]);

  const onDeselectStack = useCallback(() => setSelectedStackId(null), []);
  const onDownloadImage = useCallback(
    async (imageId: string) => {
      await widgetHandlers.onDownloadImage?.({ imageId }, sdk);
    },
    [widgetHandlers]
  );
  const onInitScrollController = useCallback(
    (controller: { scrollToTop: () => void } | undefined) => {
      scrollController.current = controller;
    },
    []
  );
  const onSelectStack = useCallback(
    (stackId: string) => setSelectedStackId(stackId),
    []
  );

  useEffect(() => {
    methodsRef.getImages = onGetImages;
    methodsRef.start = onStart;
  }, [onGetImages, onStart]);

  // useEffect(() => {
  //   const callback = (operation: OperationEntity) =>
  //     stacksAPI.updateOperation(operation);
  //   sdk.operations.updates.subscribe({ callback });
  //   return () => sdk.operations.updates.unsubscribe({ callback });
  // }, []);

  return {
    loading,
    onDeselectStack,
    onDownloadImage,
    onInitScrollController,
    onSelectStack,
    selectedStackId,
    stacks: stacks.value,
  };
};

export default useLogic;
