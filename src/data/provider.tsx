import { ClientSDK } from '@hautechai/client';
import React, { useContext, useMemo } from 'react';

const SDKContext = React.createContext<{
    sdk: ClientSDK | null;
}>({ sdk: null });

export const SDKProvider = ({ children, sdk }: { children: any; sdk: ClientSDK | null }) => {
    const value = useMemo(() => ({ sdk }), [sdk]);
    return <SDKContext.Provider value={value}>{children}</SDKContext.Provider>;
};
export const useSDK = () => {
    const value = useContext(SDKContext);
    if (!value.sdk) throw new Error('You cannot use any data hooks without SDKProvider');
    return value.sdk;
};
