import { Column } from "@hautechai/webui.column";
import { Menu } from "@hautechai/webui.menu";

export const AspectRatioSelect = () => {
  return (
    <Column spacing="ml">
      <Menu
        options={[
          {
            label: "1:1 (Square)",
            size: "small",
            value: "square",
          },
          {
            label: "7:10",
            size: "small",
            value: "option2",
          },
        ]}
        value="square"
      />
    </Column>
  );
};
