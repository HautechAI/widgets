import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
    onClose: () => void;
    open: boolean;
}>;
