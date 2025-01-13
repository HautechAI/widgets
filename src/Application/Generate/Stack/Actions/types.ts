import { GenerateWidgetProps } from '@hautechai/widgets';
import { Image, Stack } from '@hautechai/client';

export interface Props {
    canUpscale: boolean;
    disabled: boolean;
    image: Image;
    onDownload: () => Promise<void>;
    onUpscale: () => Promise<void>;
    retouchActions: { name: string; onClick: () => void }[];
    stack: Stack;
    widgetProps: GenerateWidgetProps;
}
