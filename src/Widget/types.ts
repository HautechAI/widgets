import {LindaHauteV1InputAspectRatio, SDK } from "@hautechai/sdk";

export type WidgetHandlers = {
  onGetAuthToken: () => Promise<string>;
  onDownloadImage?: (data: { imageId: string }, sdk: SDK) => Promise<void>;
};

export type WidgetMethods = {
  getImages: () => Promise<string[]>;
  setProps: (props: WidgetProps) => Promise<void>;
  start: () => Promise<void>;
  sdk: () => SDK;
};

export type WidgetButtonConfiguration = {
  text?: string;
  visible?: boolean;
};

export type WidgetProps = {
  collectionId?: string;
  input?:
    | {
        model: "linda";
        productImageId: string;
        prompt: string;
        aspectRatio: LindaHauteV1InputAspectRatio;
        seed: number;
        enhance?: boolean;
      }
    | {
        model: "naomi";
        productImageId: string;
        category: string;
        prompt: string;
        seed: number;
        poseId: string;
        enhance?: boolean;
      };
  buttons?: {
    download?: WidgetButtonConfiguration;
    retouch?: WidgetButtonConfiguration;
    upscale?: WidgetButtonConfiguration;
  };
};

export type WidgetContextValue = {
  sdk: SDK;
  widgetHandlers: WidgetHandlers;
  widgetProps: WidgetProps;
  methodsRef: Partial<WidgetMethods>;
};

export type Props = {
  props: WidgetProps; //
  handlers: WidgetHandlers;
  methodsRef: Partial<WidgetMethods>;
  endpoint?: string;
};
