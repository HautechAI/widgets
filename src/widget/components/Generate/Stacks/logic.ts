import { useCallback } from 'react';
import type { Props } from './types';

const useLogic = (props: Props) => {
    const onInit = useCallback(
        (element: HTMLDivElement) => {
            if (!element) {
                props.onInitScrollController(undefined);
                return;
            }
            props.onInitScrollController({ scrollToTop: () => element.scrollTo({ top: 0, behavior: 'smooth' }) });
        },
        [props.onInitScrollController],
    );
    return { onInit };
};

export default useLogic;
