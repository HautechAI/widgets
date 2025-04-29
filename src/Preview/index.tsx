import { createSDK } from "@hautechai/sdk";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { init } from "../Widget";
import { WidgetMethods, WidgetProps } from "../Widget/types";
import SingleImageUploader, {
  UploadedImage,
} from "./components/SingleImageUpload";
import {
  ColumnContainer,
  Container,
  LinkButton,
  Row,
  Section,
  SectionLabel,
  SectionTitle,
  Status,
} from "./styles";

type Form = {
  token?: string;
  collectionId?: string;

  uploadedProductImage?: UploadedImage | null;
  isProcessingProductImage?: boolean;
  productImageId?: string;
  productCategory?: string;

  model: "linda" | "naomi";

  prompt?: string;
  seed?: string;

  uploadedPoseImage?: UploadedImage | null;
  isProcessingPose?: boolean;
  poseId?: string;
  enhance?: boolean;
};

export const Preview = () => {
  const [form, setForm] = useState<Form>({
    token: "",
    collectionId: "",
    model: "linda",
    seed: "42",
    enhance: true,
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const formToWidgetProps = (form: Form) => {
    return {
      collectionId: form.collectionId,
      input:
        form.model === "linda"
          ? {
              model: form.model,
              seed: parseInt(form.seed ?? "42"),
              productImageId: form.productImageId,
              prompt: form.prompt,
              aspectRatio: "1:1",
              enhance: form.enhance,
            }
          : {
              model: form.model,
              seed: parseInt(form.seed ?? "42"),
              productImageId: form.productImageId,
              prompt: form.prompt,
              category: form.productCategory,
              poseId: form.poseId,
              enhance: form.enhance,
            },
    } as WidgetProps;
  };

  const [widgetMethods, setWidgetMethods] = useState<Partial<WidgetMethods>>();

  useEffect(() => {
    widgetMethods?.setProps?.(formToWidgetProps(form));
  }, [form]);

  const sdk = useMemo(() => {
    return createSDK({
      authToken: () => form.token!,
    });
  }, [form.token]);

  const handleInit = () => {
    const methods = init(document.getElementById("widget") as HTMLElement, {
      props: formToWidgetProps(form),
      handlers: {
        onGetAuthToken: async () => {
          return form.token!;
        },
        onDownloadImage: async ({ imageId }, sdk) => {
          const image = await sdk.images.get({ id: imageId });
          if (image) {
            setSelectedImages((i) => [...i, image.url]);
          }
        },
      },
    });

    setWidgetMethods(methods);
  };

  const handleProductImageSelection = async (selection: UploadedImage) => {
    setForm((f) => ({
      ...f,
      uploadedProductImage: selection,
      isProcessingProductImage: true,
    }));

    const productImage = await sdk.images.createFromFile({
      file: selection.file,
    });

    let productInfo = await sdk.operations.wait(
      await sdk.operations.create.gpt.v1({
        input: {
          prompt:
            "Detect main product on the image and create short description of a model wearing this product in the studio. Return the description as json { product, apparelType, modelDescription }",
          imageId: productImage.id,
        },
      })
    );

    setForm((f) => ({
      ...f,
      productImageId: productImage.id,
      productCategory: (productInfo.output as any)?.data?.apparelType,
      prompt: (productInfo.output as any)?.data?.modelDescription,
      isProcessingProductImage: false,
    }));
  };

  const handlePoseImageSelection = async (selection: UploadedImage) => {
    setForm((f) => ({
      ...f,
      uploadedPoseImage: selection,
      isProcessingPose: true,
    }));

    const poseImage = await sdk.images.createFromFile({
      file: selection.file,
    });

    let pose = await sdk.operations.wait(
      await sdk.operations.create.estimatePose.v1({
        input: {
          imageId: poseImage.id,
        },
      })
    );

    setForm((f) => ({
      ...f,
      poseId: (pose.output as any).data.poseId,
      isProcessingPose: false,
    }));
  };

  const handleCreateCollection = async () => {
    const collection = await sdk.collections.create({});

    setForm((f) => ({ ...f, collectionId: collection.id }));
  };

  return (
    <Container>
      <ColumnContainer>
        <Section>
          <SectionTitle>Step 1: Setup API token.</SectionTitle>
          <input
            type="text"
            value={form.token}
            onChange={(e) => setForm((f) => ({ ...f, token: e.target.value }))}
          />
        </Section>

        <Section>
          <SectionTitle>
            Step 2: Prepare collection for generated images
          </SectionTitle>
          <Row>
            Enter existing
            <input
              type="text"
              placeholder="collectionId"
              value={form.collectionId}
              onChange={(e) =>
                setForm((f) => ({ ...f, collectionId: e.target.value }))
              }
            />
            or
            <LinkButton onClick={handleCreateCollection}>create new</LinkButton>
          </Row>
        </Section>

        <Section>
          <SectionTitle>
            Step 3: Prepare product image{" "}
            {form.isProcessingProductImage && <Status>Loading</Status>}
          </SectionTitle>
          <SingleImageUploader
            onChangeSelection={handleProductImageSelection}
            preview={form.uploadedProductImage?.preview}
          />
        </Section>

        <Section>
          <SectionTitle>Step 4: Choose model</SectionTitle>
          <ToggleButtonGroup
            color="primary"
            value={form.model}
            size="small"
            exclusive
            onChange={(e) =>
              setForm((f) => ({ ...f, model: (e.target as any).value }))
            }
          >
            <ToggleButton value="linda">Linda</ToggleButton>
            <ToggleButton value="naomi">Naomi</ToggleButton>
          </ToggleButtonGroup>
        </Section>

        <Section>
          <SectionTitle>Step 5: Configure additional parameters</SectionTitle>

          <SectionLabel>Prompt</SectionLabel>
          <textarea
            value={form.prompt}
            onChange={(e) => setForm((f) => ({ ...f, prompt: e.target.value }))}
          ></textarea>

          <SectionLabel>Enhance</SectionLabel>
          <ToggleButtonGroup
            color="primary"
            value={form.enhance ? "enabled" : "disabled"}
            size="small"
            exclusive
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                enhance: (e.target as any).value === "enabled",
              }))
            }
          >
            <ToggleButton value="enabled">Enabled</ToggleButton>
            <ToggleButton value="disabled">Disabled</ToggleButton>
          </ToggleButtonGroup>

          <SectionLabel>Seed</SectionLabel>
          <input
            type="text"
            value={form.seed}
            onChange={(e) => setForm((f) => ({ ...f, seed: e.target.value }))}
          />

          {form.model === "naomi" && (
            <>
              <Row>
                <SectionLabel>Pose</SectionLabel>
                {form.isProcessingPose && <Status>Loading</Status>}
                {form.poseId && <Status>id: {form.poseId}</Status>}
              </Row>
              <SingleImageUploader
                onChangeSelection={handlePoseImageSelection}
                preview={form.uploadedPoseImage?.preview}
              />

              <Row>
                <SectionLabel>Category</SectionLabel>
              </Row>
              <input
                type="text"
                value={form.productCategory}
                onChange={(e) =>
                  setForm((f) => ({ ...f, productCategory: e.target.value }))
                }
              />
            </>
          )}
        </Section>
      </ColumnContainer>
      <ColumnContainer>
        <Section>
          <SectionTitle>Step 6: Init widget</SectionTitle>
          <button onClick={handleInit}>init</button>
        </Section>

        <Section>
          <SectionTitle>Step 7: Run generation</SectionTitle>
          <button
            disabled={
              !form.productImageId ||
              !form.collectionId ||
              (!form.poseId && form.model === "naomi")
            }
            onClick={() => {
              widgetMethods?.start?.();
            }}
          >
            start
          </button>
        </Section>

        <Section>
          <SectionTitle>Step 8: Select images inside widget</SectionTitle>
          <div
            id="widget"
            style={{
              width: "500px",
              height: "500px",
              border: "dashed #DDD 1px",
              display: "flex",
            }}
          ></div>
        </Section>

        <Section>
          <SectionTitle>Step 9: Collect results here</SectionTitle>
          <Row>
            {selectedImages.map((url) => (
              <img
                key={url}
                src={url}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            ))}
          </Row>
        </Section>
      </ColumnContainer>
    </Container>
  );
};
