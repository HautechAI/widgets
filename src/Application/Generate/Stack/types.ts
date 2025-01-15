import { GenerateWidgetProps } from "../types";

export interface Props {
  collectionId: string;
  onDeselectStack: () => void;
  onDownloadImage: (imageId: string) => Promise<void>;
  stackId: string;
  widgetProps: GenerateWidgetProps;
}
