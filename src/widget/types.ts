import { ClientSDK } from '@hautechai/client';

export interface Props<IncomingMethodHandlers, OutcomingMethods, WidgetProps> {
    component: React.ComponentType<{
        sdk: ClientSDK;
        setIncomingMethodHandlers: (handlers: Omit<IncomingMethodHandlers, 'setProps'>) => void;
        widgetMethods: OutcomingMethods;
        widgetProps: WidgetProps;
    }>;
    createOutcomingMethods: (call: (method: string, args: any[]) => Promise<any>) => OutcomingMethods;
}
