import { StackEntity } from "@hautechai/sdk";

export interface Props {
  onDownloadImage: (imageId: string) => Promise<void>;
  onSelectStack: (stackId: string) => void;
  stack: StackEntity;
}
