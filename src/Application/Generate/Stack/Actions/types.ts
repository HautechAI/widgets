import { GenerateWidgetProps } from "@hautechai/widgets";
import { ImageEntity, StackEntity } from "@hautechai/sdk";

export interface Props {
  canUpscale: boolean;
  disabled: boolean;
  image: ImageEntity;
  onDownload: () => Promise<void>;
  onUpscale: () => Promise<void>;
  retouchActions: { name: string; onClick: () => void }[];
  stack: StackEntity;
  widgetProps: GenerateWidgetProps;
}
