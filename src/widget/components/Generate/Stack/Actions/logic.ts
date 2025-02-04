import { useWidgetContext } from "../../../../context";
import type { Props } from "./types";

const useLogic = (props: Props) => {
  const { widgetProps } = useWidgetContext();

  const canShowDownload = widgetProps.buttons?.download?.visible ?? true;
  const canShowRetouch = widgetProps.buttons?.retouch?.visible ?? true;
  const canShowUpscale = widgetProps.buttons?.upscale?.visible ?? true;

  const downloadText = widgetProps.buttons?.download?.text ?? "Download";
  const retouchText = widgetProps.buttons?.retouch?.text ?? "Retouch";
  const upscaleText = widgetProps.buttons?.upscale?.text ?? "Upscale";

  return {
    canShowDownload,
    canShowRetouch,
    canShowUpscale,
    downloadText,
    retouchText,
    upscaleText,
  };
};

export default useLogic;
