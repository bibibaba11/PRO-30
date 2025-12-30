
export enum EditMode {
  OUTFIT = 'outfit',
  REMOVE_OBJECT = 'remove_object',
  REMOVE_BG = 'remove_bg'
}

export interface ImageData {
  base64: string;
  mimeType: string;
}

export interface ProcessingState {
  loading: boolean;
  message: string;
  error: string | null;
}
