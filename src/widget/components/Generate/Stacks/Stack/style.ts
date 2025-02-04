import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const style = {
    Container: styled('div')`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    `,
    Image: styled('img')`
        width: 100%;
    `,
    ImageContainer: styled('div')`
        align-items: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 256px;
        position: relative;
        width: 100%;
    `,
    ImageOverlay: styled('div')`
        align-items: center;
        bottom: 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        opacity: 0;
        left: 0px;
        position: absolute;
        right: 0px;
        top: 0px;
        transition: opacity 0.2s ease-in-out;
        width: 100%;

        &:hover {
            opacity: 1;
        }
    `,
    ImageOverlayBackground: styled('div')`
        background-color: black;
        height: 100%;
        opacity: 0.2;
        width: 100%;
    `,
    ImageOverlayContent: styled('div')`
        height: 100%;
        position: relative;
        width: 100%;
    `,
    ImageOverlayText: styled(Typography)`
        left: 50%;
        position: absolute;
        text-align: center;
        top: 50%;
    `,
};

export default style;
