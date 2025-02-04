import React, { PropsWithChildren, useContext } from "react";
import { WidgetContextValue } from "./types";

const WidgetContext = React.createContext<WidgetContextValue>({} as any);

export const WidgetContextProvider = (
  props: PropsWithChildren<{ value: WidgetContextValue }>
) => {
  const { children, value } = props;

  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
};

export const useWidgetContext = () => {
  return useContext(WidgetContext);
};

export const useSDK = () => {
  return useWidgetContext().sdk;
};
