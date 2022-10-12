import { MultiselectValue } from "src/components/core/MultiselectSearch/MultiselectSearch.types";

export interface ShareFileDialogProps {
  fileName: string;
  fileDetails: {
    hash?: string;
    file: string;
    fileId: string;
    modified: string;
    owner: string;
    size: string;
    type: string;
    walletId: string;
    ownerId: string;
  };
}
export interface SelectedUser extends MultiselectValue {
  privilege: string | number;
  walletId?: string;
}
