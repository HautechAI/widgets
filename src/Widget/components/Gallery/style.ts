import { Box } from '@hautechai/webui.box';
import { styled } from '@hautechai/webui.themeprovider';

const style = {
    Wrapper: styled(Box)`
        flex-direction: column;
        background: ${({theme}) => theme.palette.layout.surfaceLow};
    `,
    Images: styled(Box)`
        flex-direction: column;
        gap: ${({theme}) => theme.foundation.spacing.l}px;
    `,
    Header: styled(Box)`
        border-bottom: ${({ theme }) => theme.foundation.stroke.thin}px solid ${({theme}) => theme.palette.layout.strokes};
    `,
    Footer: styled(Box)`
        border-top: ${({ theme }) => theme.foundation.stroke.thin}px solid ${({theme}) => theme.palette.layout.strokes};
    `,
};

export default style;
