import { styled } from '@mui/material/styles';

const style = {
    Container: styled('div')`
        align-items: center;
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        width: 100%;
    `,
    ModalContainer: styled('div')`
        background-color: white;
        display: flex;
        flex-direction: column;
        max-height: 100%;
        max-width: 100%;
        padding: 32px;
    `,
};

export default style;
