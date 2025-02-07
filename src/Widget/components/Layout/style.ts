import { styled } from "@mui/material/styles";

const style = {
  Container: styled("div")`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-height: 100%;
  `,
  PageContainer: styled("div")`
    display: flex;
    flex: 1;
    overflow-y: scroll;
    width: 100%;
  `,
};

export default style;
