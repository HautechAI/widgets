import { SDK } from "@hautechai/sdk";
import {
  GenerateWidgetIncomingMethodHandlers,
  GenerateWidgetOutcomingMethods,
  GenerateWidgetProps,
} from "@hautechai/widgets";

export type Props = {
  sdk: SDK;
  setIncomingMethodHandlers: (
    handlers: Omit<GenerateWidgetOutcomingMethods, "setProps">
  ) => void;
  widgetMethods: GenerateWidgetIncomingMethodHandlers;
  widgetProps: GenerateWidgetProps;
};
