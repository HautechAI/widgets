import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Props } from './types';
import { useCallback, useState } from 'react';

export const useDialog = (props: Props) => {
    const [open, setOpen] = useState(false);

    const hide = useCallback(() => setOpen(false), []);
    const show = useCallback(() => setOpen(true), []);

    const view = () => (
        <Dialog onClose={hide} open={open}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>{props.description}</DialogContent>
            <DialogActions>
                {props.actions.map((action) => (
                    <Button
                        key={action.label}
                        onClick={() => {
                            action.onClick();
                            hide();
                        }}
                        variant={action.variant ?? 'text'}
                    >
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );

    return { show, view };
};
