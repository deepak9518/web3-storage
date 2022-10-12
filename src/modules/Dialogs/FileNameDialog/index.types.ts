export interface FileNameDialogProps {
  walletId: string;
  onFileUploading: (c: boolean) => void;
  onFileUploadComplete: (c: boolean) => void;
  onFileUploadFail: (c: boolean) => void;
  setLoader: (b: boolean) => void;
}
export interface FileDetailsDialogProps {
  fileDetails: any;
}

export enum DETAIL_TYPES {
  STRING = 'STRING',
  LINK = 'LINK',
  TAGS = 'TAGS',
}
