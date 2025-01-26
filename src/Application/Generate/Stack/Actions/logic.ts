import type { Props } from './types';

const useLogic = (props: Props) => {
    const canShowDownload = props.widgetProps.buttons?.download?.visible ?? true;
    const canShowRetouch = props.widgetProps.buttons?.retouch?.visible ?? true;
    const canShowUpscale = props.widgetProps.buttons?.upscale?.visible ?? true;

    const downloadText = props.widgetProps.buttons?.download?.text ?? 'Download';
    const retouchText = props.widgetProps.buttons?.retouch?.text ?? 'Retouch';
    const upscaleText = props.widgetProps.buttons?.upscale?.text ?? 'Upscale';

    return { canShowDownload, canShowRetouch, canShowUpscale, downloadText, retouchText, upscaleText };
};

export default useLogic;
