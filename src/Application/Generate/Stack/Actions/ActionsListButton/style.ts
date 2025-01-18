import { Button, Menu } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  Button: styled(Button)`
    border-color: lightgray;
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
  `,
  Container: styled("div")`
    flex: 1;
  `,
  Menu: styled(Menu)`
    padding-left: 12px;
    padding-right: 12px;
  `,
};

export default style;
