import { Stack } from '@hautechai/client';

export interface Props {
    onDownloadImage: (imageId: string) => Promise<void>;
    onSelectStack: (stackId: string) => void;
    stack: Stack;
}
