import { Box } from '@hautechai/webui.box';
import { Column } from '@hautechai/webui.column';
import { styled } from '@hautechai/webui.themeprovider';

const style = {
    Generator: styled(Column)`
        background: ${({theme}) => theme.palette.layout.surfaceLow};
    `,
    Footer: styled(Box)`
        border-top: ${({theme}) => theme.foundation.stroke.thin}px solid ${({theme}) => theme.palette.layout.strokes};
    `,
};

export default style;
