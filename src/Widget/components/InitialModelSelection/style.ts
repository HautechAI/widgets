import { Box } from '@hautechai/webui.box';
import { styled } from '@hautechai/webui.themeprovider';

const style = {
  FooterBox: styled(Box)`
    box-sizing: border-box;
    border-top: ${({theme}) => theme.foundation.stroke.thin}px solid ${({theme}) => theme.palette.layout.strokes};
  `,
  Wrapper: styled(Box)`
    flex-direction: column;
    background: ${({theme}) => theme.palette.layout.surfaceLow};
    gap: ${({theme}) => theme.foundation.spacing.xl}px;
  `,
  Text: styled(Box)`
    flex-direction: column;
    gap: ${({theme}) => theme.foundation.spacing.l}px;
  `,
};

export default style;
