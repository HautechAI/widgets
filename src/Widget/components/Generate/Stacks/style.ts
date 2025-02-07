import { styled } from '@mui/material/styles';

const style = {
    Container: styled('div')`
        align-items: center;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        scrollbar-width: none;
        width: 100%;
        gap: 8px;

        ::-webkit-scrollbar {
            display: none;
        }
    `,
    LoaderContainer: styled('div')`
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-bottom: 16px;
        padding-top: 16px;
    `,
};

export default style;
