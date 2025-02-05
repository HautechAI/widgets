import { createSDK } from "@hautechai/sdk";
import { useEffect, useMemo, useState } from "react";
import { Props, WidgetHandlers, WidgetProps } from "./types";

const useLogic = (props: Props) => {
  const sdk = useMemo(() => {
    const s = createSDK({
      authToken: () => props.handlers.onGetAuthToken(),
      endpoint: props.endpoint,
    });
    props.methodsRef.sdk = () => s;
    return s;
  }, []);
  const [widgetProps, setWidgetProps] = useState<WidgetProps>(props.props);
  const [widgetHandlers, _] = useState<WidgetHandlers>(props.handlers);

  useEffect(() => {
    props.methodsRef.setProps = async (props) => setWidgetProps(props);
  }, [setWidgetProps]);

  return {
    sdk,
    widgetProps,
    widgetHandlers,
  };
};

export default useLogic;
