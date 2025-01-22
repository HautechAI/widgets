import { styled } from '@mui/material/styles';

const style = {
    Body: styled('div')`
        align-items: center;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
    `,
    Container: styled('div')`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4px;
        width: 100%;
    `,
    Header: styled('div')`
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    `,
    Image: styled('img')`
        max-height: 340px;
        max-width: 100%;
    `,
};

export default style;
