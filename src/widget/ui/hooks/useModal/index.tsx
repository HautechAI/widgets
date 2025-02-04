import { Modal } from '../../components';
import { useCallback, useState } from 'react';

export const useModal = () => {
    const [open, setOpen] = useState(false);

    const hide = useCallback(() => setOpen(false), []);
    const show = useCallback(() => setOpen(true), []);

    const view = ({ children }: { children: any }) => (
        <Modal open={open} onClose={hide}>
            {children}
        </Modal>
    );

    return {
        show,
        view,
    };
};
