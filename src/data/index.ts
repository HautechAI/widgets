import { OperationEntity, StackEntity } from "@hautechai/sdk";
import {
  useCrudInfiniteListQuery,
  useCrudInfiniteListUpdater,
  useNonNormalizedMutation,
  useNormalizedMutation,
} from "react-query-crud";
import { useSDK } from "./provider";
import { useQuery } from "@tanstack/react-query";

export const useCollectionStacks = (collectionId: string) => {
  const sdk = useSDK();

  const key = ["collections", collectionId, "stacks"];
  const limit = 20;
  const typename = "Stack";

  const onCreate = useCrudInfiniteListUpdater<
    string,
    StackEntity,
    unknown,
    StackEntity,
    { items: StackEntity[] },
    string | undefined
  >({
    key,
    update: (data, result) => {
      return {
        pages: [{ items: [result] }, ...data.pages],
        pageParams: [result.id, ...data.pageParams],
      };
    },
  });

  const onDelete = useCrudInfiniteListUpdater<
    string,
    StackEntity,
    { id: string },
    void,
    { items: StackEntity[] },
    string | undefined
  >({
    key,
    update: (data, _result, variables) => ({
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.filter((item) => item.id !== variables.id),
      })),
      pageParams: data.pageParams,
    }),
  });
  const onUpdateOperation = useCrudInfiniteListUpdater<
    string,
    StackEntity,
    OperationEntity,
    void,
    { items: StackEntity[] },
    string | undefined
  >({
    key,
    update: (data, _result, updatedOperation) => {
      return {
        pages: data.pages.map((page) => ({
          ...page,
          items: page.items.map((item) => ({
            ...item,
            operations: item.operations.map((operation) =>
              operation.id === updatedOperation.id
                ? updatedOperation
                : operation
            ),
          })),
        })),
        pageParams: data.pageParams,
      };
    },
  });

  const addOperation = useNormalizedMutation({
    run: async (props: { id: string; operationId: string }) =>
      sdk.stacks.operations.add({
        operationIds: [props.operationId],
        stackId: props.id,
      }),
    typename,
  });

  const addOperations = useNormalizedMutation({
    run: async (props: { id: string; operationIds: string[] }) =>
      sdk.stacks.operations.add({
        operationIds: props.operationIds,
        stackId: props.id,
      }),
    typename,
  });
  const create = useNormalizedMutation<string, StackEntity, unknown>({
    run: async () => {
      const stack = await sdk.stacks.create();
      await sdk.collections.items.add({
        collectionId,
        itemIds: [stack.id],
      });
      return stack;
    },
    update: onCreate,
    typename,
  });

  const read = useCrudInfiniteListQuery<
    string,
    StackEntity,
    { items: StackEntity[] },
    string | undefined
  >({
    getNextPageParam: (lastPage) =>
      lastPage?.items[lastPage.items.length - 1]?.id,
    initialPageParam: undefined,
    key,
    fetch: async (lastId: string | undefined) => {
      const stacks = await sdk.stacks.list({ collectionId, lastId, limit });
      return { items: stacks };
    },
    typename,
  });

  const del = useNonNormalizedMutation({
    run: async (props: { id: string }) =>
      sdk.collections.items.remove({
        collectionId,
        itemIds: [props.id],
      }),
    update: onDelete,
  });
  const removeOperation = useNormalizedMutation({
    run: async (props: { id: string; operationId: string }) =>
      sdk.stacks.operations.remove({
        operationIds: [props.operationId],
        stackId: props.id,
      }),
    typename,
  });
  const update = useNormalizedMutation({
    run: async (props: { id: string; metadata: any }) =>
      sdk.stacks.updateMetadata({ id: props.id, metadata: props.metadata }),
    typename,
  });
  const updateOperation = useNonNormalizedMutation({
    run: async (_updatedOperation: OperationEntity) => Promise.resolve(),
    update: onUpdateOperation,
  });

  return {
    addOperation,
    addOperations,
    create,
    delete: del,
    read,
    removeOperation,
    update,
    updateOperation,
  };
};

export const useImage = (imageId: string) => {
  const sdk = useSDK();

  return useQuery({
    queryKey: ["images", imageId],
    queryFn: async () => {
      const [image, imageUrls] = await Promise.all([
        sdk.images.get({ id: imageId }),
        sdk.images.getUrls({ ids: [imageId] }),
      ]);
      return { image, url: imageUrls[imageId] };
    },
  });
};

export * from "./provider";
