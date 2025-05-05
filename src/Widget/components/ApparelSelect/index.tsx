import { Column } from "@hautechai/webui.column";
import { Tile } from "@hautechai/webui.tile";
import { FC, useState } from "react";
import { Button } from "@hautechai/webui.button";
import { ImageInput } from "@hautechai/webui.imageinput";
import { TrashIcon } from "@hautechai/webui.icon";
import { Props, UploadedImage } from "./types";
import { Box } from "@hautechai/webui.box";

export const ApparelSelect: FC<Props> = ({ onImageSelected }) => {
  const [image, setImageState] = useState<UploadedImage | null>(null);

  const setImage = (img: UploadedImage) => setImageState(img);
  const removeImage = () => setImageState(null);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      onImageSelected(file);
      const preview = URL.createObjectURL(file);
      setImage({ file, preview });
    }
  };

  const handleRemove = () => {
    removeImage();
  };

  return (
    <Column stretch spacing="l" align="center">
      {image ? (
        <>
          <Box display="flex" width="100%">
            <Button
              stretch
              size="small"
              variant="outlined"
              hierarchy="secondary"
              label="Remove product"
              leadingIcon={<TrashIcon size={20} />}
              onClick={handleRemove}
            />
          </Box>
          <Tile width="100%" image={image?.preview} component="img" />
        </>
      ) : (
        <ImageInput onChange={handleFileChange} />
      )}
    </Column>
  );
};
