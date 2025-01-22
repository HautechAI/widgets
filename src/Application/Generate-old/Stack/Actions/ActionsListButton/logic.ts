import { useCallback, useState } from 'react';
import type { Props } from './types';

const useLogic = (props: Props) => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const onCloseMenu = useCallback(() => setMenuOpen(false), []);
    const onOpenMenu = useCallback((event: any) => {
        setAnchor(event.currentTarget);
        setMenuOpen(true);
    }, []);

    const onClickAction = useCallback(
        (action: { name: string; onClick: () => void | Promise<void> }) => {
            onCloseMenu();
            action.onClick();
        },
        [onCloseMenu],
    );

    return { anchor, menuOpen, onClickAction, onCloseMenu, onOpenMenu };
};

export default useLogic;
