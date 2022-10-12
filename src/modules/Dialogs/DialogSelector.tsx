import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/index';
import { ShareFileDialog } from './ShareFileDialog';
import { ConfirmationDialog } from './ConfirmationDialog';
import FileRenameDialog from './FileRenameDialog';
import FileNameDialog from './FileNameDialog';

import { DialogType } from 'src/store/dialogs';

export const DialogSelector = () => {
  const { dialogType, dialogProps } = useSelector((state: RootState) => state.dialog);

  const dialogs: { [key in DialogType]: ReactElement | null } = {
    [DialogType.SHARE_FILE]: dialogProps.fileName ? (
      <ShareFileDialog fileName={dialogProps.fileName} fileDetails={dialogProps.fileDetails} />
    ) : null,
    [DialogType.RENAME_FILE]: <FileRenameDialog fileDetails={dialogProps.fileDetails} />,

    [DialogType.NAME_FILE]: (
      <FileNameDialog
        walletId={dialogProps.walletId as string}
        onFileUploading={dialogProps.onFileUploading as (c?: boolean) => void}
        onFileUploadComplete={dialogProps.onFileUploadComplete as (c?: boolean) => void}
        onFileUploadFail={dialogProps.onFileUploadFail as (c?: boolean) => void}
        setLoader={dialogProps.setLoader as (c?: boolean) => void}
      />
    ),

    [DialogType.CONFIRM_DIALOG]: <ConfirmationDialog />,
  };

  return dialogType ? dialogs[dialogType] : null;
};
