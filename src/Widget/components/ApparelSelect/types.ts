export interface Props {
    onImageSelected: (file: File) => void;
}

export interface UploadedImage {
    file: File;
    preview: string;
    readonly?: boolean;
  }
