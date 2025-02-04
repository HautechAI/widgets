import React from "react";
import { useDropzone } from "react-dropzone";

export interface UploadedImage {
  file: File;
  preview: string;
}

const SingleImageUploader: React.FC<{
  onChangeSelection: (selection: UploadedImage) => void;
  preview?: string;
}> = (props) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      props.onChangeSelection({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px dashed gray",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100px",
        }}
      >
        <div
          {...getRootProps({
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          })}
        >
          <input {...getInputProps()} />
          {props.preview ? (
            <img
              src={props.preview}
              alt=""
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleImageUploader;
