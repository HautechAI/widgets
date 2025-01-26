import EmptyState from "./EmptyState";
import { Loader } from "../../ui";
import { Props } from "./types";
import Stack from "./Stack";
import Stacks from "./Stacks";
import {
  GenerateWidgetIncomingMethodHandlers,
  GenerateWidgetOutcomingMethods,
  GenerateWidgetProps,
} from "./types";
import useLogic from "./logic";
import Widget from "../../widget";

const Generate = (props: Props) => {
  const {
    loading,
    onDeselectStack,
    onDownloadImage,
    onInitScrollController,
    onSelectStack,
    selectedStackId,
    stacks,
  } = useLogic(props);

  if (selectedStackId)
    return (
      <Stack
        collectionId={props.widgetProps.collectionId}
        onDeselectStack={onDeselectStack}
        onDownloadImage={onDownloadImage}
        stackId={selectedStackId}
        widgetProps={props.widgetProps}
      />
    );

  if (stacks.length === 0 && loading)
    return (
      <Loader text="Image generation may take up to 3 minutes. Please hang in here a little longer" />
    );
  if (stacks.length === 0) return <EmptyState />;

  return (
    <Stacks
      loading={loading}
      onDownloadImage={onDownloadImage}
      onInitScrollController={onInitScrollController}
      onSelectStack={onSelectStack}
      stacks={stacks}
    />
  );
};

const createOutcomingMethods = (
  call: (method: string, args: any[]) => Promise<any>
) => ({
  downloadImage: async (data: { imageId: string }) =>
    call("downloadImage", [data]),
});
const GenerateWidgetWrapper = () => (
  <Widget<
    GenerateWidgetOutcomingMethods,
    GenerateWidgetIncomingMethodHandlers,
    GenerateWidgetProps
  >
    component={Generate}
    createOutcomingMethods={createOutcomingMethods}
  />
);
export default GenerateWidgetWrapper;
