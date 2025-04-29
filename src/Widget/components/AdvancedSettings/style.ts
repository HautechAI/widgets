import { Box } from '@hautechai/webui.box';
import { styled } from '@hautechai/webui.themeprovider';

const style = {
    Panel: styled(Box)`
        position: absolute;
        top: 100%;
        left: 0;
        box-sizing: border-box;
        border-top: ${({theme}) => theme.foundation.stroke.thin}px solid ${({theme}) => theme.palette.layout.strokes};
        border-bottom: ${({theme}) => theme.foundation.stroke.thin}px solid ${({theme}) => theme.palette.layout.strokes};
        background: ${({theme}) => theme.palette.layout.surfaceLow};
    `,
    Wrapper: styled(Box)`
        position: relative;
        border-bottom: ${({theme}) => theme.foundation.stroke.thin}px solid ${({theme}) => theme.palette.layout.strokes};
    `,
};

export default style;
