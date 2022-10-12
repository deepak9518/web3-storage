import { DialogType } from './consts';

export interface DialogState {
  dialogType: DialogType | null;
  dialogProps: DialogProps;
}

export interface DialogProps {
  fileDetails?: any;
  fileName?: string;
  walletId?: string;
  onFileUploading?: (c?: boolean) => void;
  onFileUploadComplete?: (c?: boolean) => void;
  onFileUploadFail?: (c?: boolean) => void;
  setLoader?: (b: boolean) => void;
}
