import type { Props } from "./types";
import { toast } from "../../../../ui";
import { useCallback, useState } from "react";

const useLogic = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(props.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(
      props.title ? `Copied ${props.title} to clipboard` : "Copied to clipboard"
    );
  }, [props.text]);

  return { copied, onCopy };
};

export default useLogic;
