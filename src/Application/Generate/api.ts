import { OperationEntity, StackEntity } from "@hautechai/sdk";
import {
  useCrudInfiniteListQuery,
  useCrudInfiniteListUpdater,
  useNonNormalizedMutation,
  useNormalizedMutation,
} from "react-query-crud";
import { useQuery } from "@tanstack/react-query";
import { useSDK } from "../../widget";

export const useCollectionStacks = (collectionId: string) => {
  const sdk = useSDK();

  const key = ["collections", collectionId, "stacks"];
  const limit = 50;
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
            items: item.items.map((item) =>
              item.id === updatedOperation.id ? updatedOperation : item
            ),
          })),
        })),
        pageParams: data.pageParams,
      };
    },
  });

  const addItems = useNormalizedMutation({
    run: async (props: { id: string; itemIds: string[] }) => {
      await sdk.stacks.items.add({
        itemIds: props.itemIds,
        stackId: props.id,
      });

      const stack = await sdk.stacks.get({ id: props.id });
      return stack!;
    },
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

  const del = useNonNormalizedMutation({
    run: async (props: { id: string }) =>
      sdk.collections.items.remove({
        collectionId,
        itemIds: [props.id],
      }),
    update: onDelete,
  });

  const read = useCrudInfiniteListQuery<
    string,
    StackEntity,
    { items: StackEntity[]; nextCursor: string },
    string | undefined
  >({
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
    key,
    fetch: async (cursor: string | undefined) => {
      const items = await sdk.collections.items.list({
        collectionId,
        cursor,
        kind: "stack",
        limit,
      });
      return {
        items: items as unknown as StackEntity[],
        nextCursor: items.nextCursor ?? "",
      };
    },
    typename,
  });

  const removeItem = useNormalizedMutation({
    run: async (props: { id: string; itemId: string }) => {
      await sdk.stacks.items.remove({
        itemIds: [props.itemId],
        stackId: props.id,
      });

      const stack = await sdk.stacks.get({ id: props.id });
      return stack!;
    },
    typename,
  });

  const updateMetadata = useNonNormalizedMutation({
    run: async (props: { id: string; metadata: any }) =>
      sdk.stacks.updateMetadata({ id: props.id, metadata: props.metadata }),
  });

  const updateOperation = useNonNormalizedMutation({
    run: async (_updatedOperation: OperationEntity) => Promise.resolve(),
    update: onUpdateOperation,
  });

  return {
    addItems,
    create,
    delete: del,
    read,
    removeItem,
    updateMetadata,
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
