import { Stack } from '@hautechai/client';

export interface Props {
    loading: boolean;
    onDownloadImage: (imageId: string) => Promise<void>;
    onInitScrollController: (controller: { scrollToTop: () => void } | undefined) => void;
    onSelectStack: (stackId: string) => void;
    stacks: Stack[];
}
