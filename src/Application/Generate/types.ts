import { ClientSDK } from '@hautechai/client';
import {
    GenerateWidgetIncomingMethodHandlers,
    GenerateWidgetOutcomingMethods,
    GenerateWidgetProps,
} from '@hautechai/widgets';

export type Props = {
    sdk: ClientSDK;
    setIncomingMethodHandlers: (handlers: Omit<GenerateWidgetOutcomingMethods, 'setProps'>) => void;
    widgetMethods: GenerateWidgetIncomingMethodHandlers;
    widgetProps: GenerateWidgetProps;
};
