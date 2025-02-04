# Hautech widgets

### Example

```typescript
const widget = Widget.init(document.getElementById("widget")!, {
  handlers: {
    onGetAuthToken: async () => "<TOKEN HERE>",
    onDownloadImage: async ({ imageId }, sdk) => {
      const image = await sdk.images.get({ id: imageId });
      console.log(image?.url);
    },
  },
  props: {
    collectionId: "123",
    input: {
      model: "linda",
      productImageId: "<PRODUCT_IMAGE_ID>",
      prompt: "<PROMPT>",
      seed: 42,
      aspectRatio: "12:5",
    },
  },
});

widget.setProps?.({
  input: {
    model: "linda",
    productImageId: "<PRODUCT_IMAGE_ID>",
    prompt: "new prompt",
    seed: 42,
    aspectRatio: "12:5",
  },
});

widget.start?.();
```
