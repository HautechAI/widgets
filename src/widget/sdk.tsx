import { SDK } from "@hautechai/sdk";
import React, { useContext, useMemo } from "react";

const SDKContext = React.createContext<{
  sdk: SDK | null;
}>({ sdk: null });

export const SDKProvider = ({
  children,
  sdk,
}: {
  children: any;
  sdk: SDK | null;
}) => {
  const value = useMemo(() => ({ sdk }), [sdk]);
  return <SDKContext.Provider value={value}>{children}</SDKContext.Provider>;
};
export const useSDK = () => {
  const value = useContext(SDKContext);
  if (!value.sdk)
    throw new Error("You cannot use any data hooks without SDKProvider");
  return value.sdk;
};
