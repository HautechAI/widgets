import { getImageFromStack } from '../utils';
import { useCollectionStacks, useImage } from '../api';
import type { Props } from './types';
import { useCallback, useMemo, useState } from 'react';
import { OperationEntity } from '@hautechai/sdk';
import { useWidgetContext } from '../../../context';

const useLogic = (props: Props) => {
    const { sdk, widgetProps } = useWidgetContext();
    const stacksAPI = useCollectionStacks(widgetProps.collectionId ?? '');
    const stacks = stacksAPI.read();

    const stack = useMemo(
        () => stacks.value.find((stack) => stack.id === props.stackId)!,
        [stacks.value, props.stackId],
    );

    const imageId = useMemo(() => getImageFromStack(stack), [stack]);
    const imageQuery = useImage(imageId!);
    const [loading, setLoading] = useState(false);

    const runAction = useCallback(async (action: () => Promise<void>) => {
        setLoading(true);
        try {
            await action();
        } finally {
            setLoading(false);
        }
    }, []);

    const canRedo = useMemo(
        () => ((stack.metadata as any)?.undone?.length ?? 0) > 0 && !loading,
        [loading, stack.metadata],
    );
    const canUndo = useMemo(() => stack.items.length > 2 && !loading, [loading, stack.items]);

    const canUpscale = useMemo(
        () =>
            !stack.items.some((item) => item.kind === 'operation' && (item as OperationEntity).type === 'upscale.v1') &&
            !loading,
        [loading, stack],
    );

    const onDownload = useCallback(async () => {
        if (!imageId) return;
        await runAction(() => props.onDownloadImage(imageId));
    }, [imageId, props.onDownloadImage, runAction]);

    const onRetouch = useCallback(
        async (category: 'lower_body' | 'upper_body' | 'dresses') => {
            if (!imageId) return;
            await runAction(async () => {
                const productImageId = stack.items[0].id;

                const describeOperation = await sdk.operations.wait(
                    await sdk.operations.run.gpt.v1({
                        input: {
                            prompt: `Describe the product in the image. The product is a ${category}. Return the description as json { text }`,
                            imageId: productImageId,
                        },
                    }),
                );

                const description = (describeOperation.output as any)?.data?.text;
                if (!description) throw new Error('Failed to describe product');

                const operation = await sdk.operations.run.vton.gisele.v1({
                    input: {
                        imageId,
                        productImageId,
                        productDescription: description,
                        category,
                        seed: Math.floor(Math.random() * 1000000),
                    },
                });

                await stacksAPI.addItems({
                    id: stack.id,
                    itemIds: [operation.id],
                });

                const retouchOperation = await sdk.operations.wait(operation);
                await stacksAPI.updateOperation(retouchOperation as unknown as OperationEntity);
            });
        },
        [imageId, runAction, stack, stacksAPI.addItems],
    );

    const onUpscale = useCallback(async () => {
        if (!canUpscale || !imageId) return;
        await runAction(async () => {
            const operation = await sdk.operations.run.upscale.v1({
                input: { imageId },
            });
            await stacksAPI.addItems({
                id: stack.id,
                itemIds: [operation.id],
            });
            await stacksAPI.updateMetadata({
                id: stack.id,
                metadata: { undone: [] },
            });
            const upscaleOperation = await sdk.operations.wait(operation);
            await stacksAPI.updateOperation(upscaleOperation as unknown as OperationEntity);
        });
    }, [canUpscale, imageId, runAction, stack.id, stacksAPI.addItems, stacksAPI.updateMetadata]);

    const retouchActions = useMemo(
        () => [
            { name: 'Retouch bottom', onClick: () => onRetouch('lower_body') },
            { name: 'Retouch dress', onClick: () => onRetouch('dresses') },
            { name: 'Retouch top', onClick: () => onRetouch('upper_body') },
        ],
        [onRetouch],
    );

    const running = useMemo(
        () =>
            loading ||
            stack.items.some((item) => item.kind === 'operation' && (item as OperationEntity).status === 'pending'),
        [loading, stack.items],
    );

    const redo = useCallback(async () => {
        if (!canRedo) return;
        await runAction(async () => {
            const undone = (stack.metadata as any).undone!;
            await stacksAPI.addItems({ id: stack.id, itemIds: [undone[0]] });
            await stacksAPI.updateMetadata({
                id: stack.id,
                metadata: { undone: undone.slice(1) },
            });
        });
    }, [canRedo, runAction, stack.id, stacksAPI.addItems, stacksAPI.updateMetadata]);

    const undo = useCallback(async () => {
        if (!canUndo) return;
        await runAction(async () => {
            const operation = stack.items[stack.items.length - 1];
            await stacksAPI.removeItem({
                id: stack.id,
                itemId: operation.id,
            });
            await stacksAPI.updateMetadata({
                id: stack.id,
                metadata: {
                    undone: [operation.id, ...((stack.metadata as any).undone ?? [])],
                },
            });
        });
    }, [canUndo, runAction, stack.id, stacksAPI.removeItem, stacksAPI.updateMetadata]);

    return {
        canRedo,
        canUndo,
        canUpscale,
        image: imageQuery.data?.image,
        imageUrl: imageQuery.data?.url,
        onDownload,
        onUpscale,
        redo,
        retouchActions,
        running,
        stack,
        undo,
    };
};

export default useLogic;
