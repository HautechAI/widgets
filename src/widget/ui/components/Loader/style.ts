import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const style = {
    Container: styled('div')`
        align-items: center;
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
    `,
    Text: styled(Typography)`
        color: ${({ theme }) => theme.palette.primary.main};
        margin-left: 16px;
        margin-right: 16px;
        text-align: center;
    `,
};

export default style;
