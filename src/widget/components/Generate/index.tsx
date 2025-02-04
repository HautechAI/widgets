import { Loader } from "../../ui";
import EmptyState from "./EmptyState";
import useLogic from "./logic";
import Stack from "./Stack";
import Stacks from "./Stacks";

const Generate = (props: {}) => {
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
        onDeselectStack={onDeselectStack}
        onDownloadImage={onDownloadImage}
        stackId={selectedStackId}
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

export default Generate;
