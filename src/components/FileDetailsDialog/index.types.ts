export interface FileDetailsDialogProps {
  fileDetails: any;
  onClose: () => void;
}

export enum DETAIL_TYPES {
  STRING = 'STRING',
  LINK = 'LINK',
  TAGS = 'TAGS',
}

export interface UserAccessListProps {
  walletId: string;
}
