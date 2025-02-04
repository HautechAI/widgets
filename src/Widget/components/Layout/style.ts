import { styled } from '@mui/material/styles';

const style = {
    Container: styled('div')`
        display: flex;
        flex: 1;
        flex-direction: column;
        max-height: 100%;
        overflow: scroll;
    `,
    PageContainer: styled('div')`
        display: flex;
        flex: 1;
        overflow-y: scroll;
        padding: 16px 16px 0px 16px;
        width: 100%;

        @media (max-width: 600px) {
            padding: 8px;
        }
    `,
};

export default style;
