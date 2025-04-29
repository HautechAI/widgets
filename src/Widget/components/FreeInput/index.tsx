import { Column } from "@hautechai/webui.column";
import { Field } from "@hautechai/webui.field";
import { TextArea } from "@hautechai/webui.textarea";

export const FreeInput = () => {
  return (
    <Column spacing="ml">
      <Field title="Text prompt">
        <TextArea placeholder="Add some important details" />
      </Field>
      <Field title="Negative prompt">
        <TextArea placeholder="Describe what you don’t want to see" />
      </Field>
    </Column>
  );
};
