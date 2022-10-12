import { DataItemType } from 'src/pages/dashboard';

export interface CommonState {
  activeDirectory: string;
  isDetailsShow: boolean;
  isFolderView: boolean;
  dataPreview?: DataItemType | undefined;
  copiedDataPreview?: DataItemType | undefined;
  folderPath: string;
  currency: CurrencyType;
}
export interface CurrencyType {
  usd: string;
  eur: string;
}
