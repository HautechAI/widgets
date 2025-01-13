import config from "../config";
import { createClientSDK } from "@hautechai/client";
import { createRpcCommunication } from "@hautechai/rpc";
import { Props } from "./types";
import { useCallback, useEffect, useMemo, useState } from "react";

const useLogic = <IncomingMethodHandlers, OutcomingMethods, WidgetProps>(
  props: Props<IncomingMethodHandlers, OutcomingMethods, WidgetProps>
) => {
  const communication = useMemo(
    () =>
      createRpcCommunication({
        outcomingMethods: (call) => ({
          ...props.createOutcomingMethods(call),
          authToken: (): Promise<string> => call("authToken", []),
          ready: (): Promise<string> => call("ready", []),
        }),
        sendMessage: (message: any) =>
          window.parent.postMessage({ bus: "hautech", ...message }, "*"),
      }),

    []
  );
  const sdk = useMemo(
    () =>
      createClientSDK({
        authToken: communication.outcomingMethods.authToken,
        endpoint: config.coreUrl,
      }),
    []
  );
  const [widgetProps, setWidgetProps] = useState<WidgetProps>();

  const setIncomingMethodHandlers = useCallback(
    (incomingMethodHandlers: Omit<IncomingMethodHandlers, "setProps">) => {
      communication.updateIncomingMethodHandlers({
        ...incomingMethodHandlers,
        setProps: (props: WidgetProps) => setWidgetProps(props),
      });
    },
    []
  );

  useEffect(() => {
    const listen = (event: any) => {
      if (event.data.bus === "hautech") communication.handleMessage(event.data);
    };
    window.addEventListener("message", listen);

    setIncomingMethodHandlers({} as any); // This line sets setProps handler for the first call
    communication.outcomingMethods.ready();
    return () => {
      window.removeEventListener("message", listen);
    };
  }, []);

  return {
    sdk,
    setIncomingMethodHandlers,
    widgetMethods: communication.outcomingMethods,
    widgetProps,
  };
};

export default useLogic;
