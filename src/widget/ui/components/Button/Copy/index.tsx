import { IconButton } from "@mui/material";

import type { Props } from "./types";
import useLogic from "./logic";

const Copy = (props: Props) => {
  const { copied, onCopy } = useLogic(props);
  return (
    <IconButton onClick={onCopy}>{copied ? "Copied!" : "Copy"}</IconButton>
  );
};

export default Copy;
