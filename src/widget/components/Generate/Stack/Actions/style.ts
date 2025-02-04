import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const style = {
    Button: styled(Button)`
        flex-direction: row;
        gap: 8px;
    `,
    Container: styled('div')`
        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    Row: styled('div')`
        display: flex;
        flex-direction: row;
        gap: 16px;
    `,
    Size: styled('div')`
        align-items: center;
        border: 1px solid ${({ theme }) => theme.palette.primary.main};
        border-radius: 4px;
        color: ${({ theme }) => theme.palette.primary.main};
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 4px 8px;
    `,
};

export default style;
