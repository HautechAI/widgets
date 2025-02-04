export interface Props {
  onDeselectStack: () => void;
  onDownloadImage: (imageId: string) => Promise<void>;
  stackId: string;
}
