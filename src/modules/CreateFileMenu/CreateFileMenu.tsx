/**
 * The MouseEvent interface represents events that occur due to the user interacting with a pointing device (such as a mouse).
 * Common events using this interface include click, dblclick, mouseup, mousedown.
 *
 * Used by: handleOpenMenu and handleOpenCreateFile functions
 */
import React from 'react';

import { CustomMenu, CreateButton } from './CreateFileMenu.styles';
import { DialogType } from 'src/store/dialogs';
import { GoogleDocsIcon } from 'src/assets/svg/google-docs-icon';
import { MenuItem } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'src/hooks/useReduxTypedHooks';
import { launchDialog } from 'src/store/dialogs';

interface ICreateFileMenu {
  onFileUploading: (c?: boolean) => void;
  onFileUploadComplete: (c?: boolean) => void;
  onFileUploadFail: (c?: boolean) => void;
  anchorEl: any;
  createFileOpen: boolean;
  setCreateFileOpen: (b: boolean) => void;
  setLoader: (b: boolean) => void;
}

export const CreateFileMenu = ({
  onFileUploading,
  onFileUploadComplete,
  onFileUploadFail,
  anchorEl,
  createFileOpen,
  setCreateFileOpen,
  setLoader,
}: ICreateFileMenu) => {
  const {
    user: { user },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setCreateFileOpen(false);
  };

  const createDoc = async () => {
    setCreateFileOpen(false);
    dispatch(
      launchDialog({
        dialogType: DialogType.NAME_FILE,
        dialogProps: { walletId: user.walletName, onFileUploading, onFileUploadComplete, onFileUploadFail, setLoader },
      })
    );
  };

  return (
    <>
      <CustomMenu open={createFileOpen} anchorEl={anchorEl} PaperProps={{}} onClose={handleClose}>
        <MenuItem disableRipple>
          <CreateButton onClick={createDoc}>
            <GoogleDocsIcon />
            Document
          </CreateButton>
        </MenuItem>
      </CustomMenu>
    </>
  );
};
