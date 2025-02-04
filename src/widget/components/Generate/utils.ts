import { ImageEntity, OperationEntity, StackEntity } from "@hautechai/sdk";

export const getImageFromStack = (stack: StackEntity): string | undefined => {
  const reversedItems = [...stack.items].reverse();
  const lastImageItem = reversedItems.find((item) => {
    switch (item.kind) {
      case "operation":
        const operation = item as OperationEntity;
        return (
          operation.status === "finished" &&
          (operation.output as any)?.kind === "image/single"
        );
      case "image":
        return true;
      default:
        return false;
    }
  });

  switch (lastImageItem?.kind) {
    case "operation":
      return ((lastImageItem as OperationEntity).output as any)?.imageId;
    case "image":
      return (lastImageItem as ImageEntity).id;
    default:
      return undefined;
  }

  // const finishedOperations = stack.items.filter(
  //   (operation) => operation.status === "finished"
  // );
  // if (!finishedOperations.length) return undefined;

  // const lastFinishedOperation =
  //   finishedOperations[finishedOperations.length - 1];

  // const output = lastFinishedOperation.output;
  // if (!output) return undefined;

  // switch (output.kind) {
  //   case "image/multiple":
  //     return output.previewImageId;
  //   case "image/single":
  //     return output.imageId;
  //   default:
  //     return undefined;
  // }
};
