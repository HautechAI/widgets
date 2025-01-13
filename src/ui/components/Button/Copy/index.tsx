import { IconButton } from '@mui/material';
import { MaterialSymbol } from 'react-material-symbols';
import type { Props } from './types';
import useLogic from './logic';

const Copy = (props: Props) => {
    const { copied, onCopy } = useLogic(props);
    return (
        <IconButton onClick={onCopy}>
            <MaterialSymbol icon={copied ? 'check' : 'content_copy'} size={24} />
        </IconButton>
    );
};

export default Copy;
