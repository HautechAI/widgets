import { Loader } from "../ui";
import { Props } from "./types";
import { SDKProvider } from "./sdk";
import useLogic from "./logic";

const Widget = <IncomingMethodHandlers, OutcomingMethods, WidgetProps>(
  props: Props<IncomingMethodHandlers, OutcomingMethods, WidgetProps>
) => {
  const { sdk, setIncomingMethodHandlers, widgetMethods, widgetProps } =
    useLogic<IncomingMethodHandlers, OutcomingMethods, WidgetProps>(props);
  if (!sdk || !widgetProps) return <Loader text="Loading" />;

  return (
    <SDKProvider sdk={sdk}>
      <props.component
        sdk={sdk}
        setIncomingMethodHandlers={setIncomingMethodHandlers}
        widgetMethods={widgetMethods}
        widgetProps={widgetProps}
      />
    </SDKProvider>
  );
};

export { useSDK } from "./sdk";

export default Widget;
