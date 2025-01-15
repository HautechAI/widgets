import { SDK } from "@hautechai/sdk";

export interface Props<IncomingMethodHandlers, OutcomingMethods, WidgetProps> {
  component: React.ComponentType<{
    sdk: SDK;
    setIncomingMethodHandlers: (
      handlers: Omit<IncomingMethodHandlers, "setProps">
    ) => void;
    widgetMethods: OutcomingMethods;
    widgetProps: WidgetProps;
  }>;
  createOutcomingMethods: (
    call: (method: string, args: any[]) => Promise<any>
  ) => OutcomingMethods;
}
