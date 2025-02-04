import ReactDOM from "react-dom/client";

import Generate from "./components/Generate";
import Layout from "./components/Layout";
import ProvidersWrapper from "./components/ProvidersWrapper";
import { WidgetContextProvider } from "./context";
import useLogic from "./logic";
import { Props, WidgetMethods } from "./types";
import { Loader } from "./ui";

export const Widget = (props: Props) => {
  const { sdk, widgetProps, widgetHandlers } = useLogic(props);
  if (!sdk || !widgetProps) return <Loader text="Loading" />;

  return (
    <WidgetContextProvider
      value={{
        sdk,
        widgetProps,
        widgetHandlers,
        methodsRef: props.methodsRef,
      }}
    >
      <ProvidersWrapper>
        <Layout>
          <Generate />
        </Layout>
      </ProvidersWrapper>
    </WidgetContextProvider>
  );
};

export const init = (
  element: HTMLElement,
  props: Omit<Props, "methodsRef">
) => {
  const methodsRef: Partial<WidgetMethods> = {};

  const root = ReactDOM.createRoot(element);
  root.render(<Widget {...props} methodsRef={methodsRef} />);

  return methodsRef;
};
