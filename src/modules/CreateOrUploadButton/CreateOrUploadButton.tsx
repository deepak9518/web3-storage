/**
 * The MouseEvent interface represents events that occur due to the user interacting with a pointing device (such as a mouse).
 * Common events using this interface include click, dblclick, mouseup, mousedown.
 *
 * Used by: handleOpenMenu and handleOpenCreateFile functions
 */
import React, { useState, MouseEvent, useEffect } from 'react';

import { CustomButton, CustomMenu, InputFile, UploadFileButton, ButtonRightIcon } from './CreateOrUploadButton.styles';
import { MenuItem } from '@mui/material';
import { AddFileIcon } from 'src/assets/svg/add-file-icon';
import { AddFolderIcon } from 'src/assets/svg/add-folder-icon';
import { ChevronRight } from 'src/assets/svg/chevron-right-icon';
import { UploadFileIcon } from 'src/assets/svg/upload-file-icon';
// import { UploadFolderIcon } from 'src/assets/svg/upload-folder-icon';
import { ArrowDownIcon, PlusIcon } from 'src/assets/svg';
import CreateFolder from './Modal/CreateFolder';
import ConfirmationDialog from 'src/components/core/ConfirmationDialog';
import SnackBar from 'src/components/core/SnackBar';

import { useAppSelector, useAppDispatch } from 'src/hooks/useReduxTypedHooks';
import { setFiles, setFolders } from 'src/store/data';
import { uploadFileThunk, createFolderThunk } from 'src/store/data/slice';
import { FileProps, FolderProps } from 'src/store/data/types';
import { ACCEPTED_FILE_EXTENSIONS } from 'constants/file';
import fileHelper from 'src/utils/file-upload.utils';
import { filterFolders } from 'src/utils/folders.utils';

interface ICreateOrUploadButton {
  parentFolderId: string;
  onFileUploading: (c?: boolean) => void;
  onFileUploadComplete: (c?: boolean) => void;
  onFileUploadFail: (c?: boolean) => void;
  onFolderCreating: () => void;
  onFolderCreateFail: (message: string) => void;
  onFolderCreateComplete: () => void;
  setCreateFileOpen: (b: boolean) => void;
  setCreateFileAnchor: (a: any) => void;
  closedAllModal: boolean;
}

interface IUploadError {
  status: boolean;
  message: string;
}

export const CreateOrUploadButton = ({
  parentFolderId,
  onFileUploading,
  onFileUploadComplete,
  onFileUploadFail,
  onFolderCreating,
  onFolderCreateFail,
  onFolderCreateComplete,
  setCreateFileOpen,
  setCreateFileAnchor,
  closedAllModal,
}: ICreateOrUploadButton) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [openCreateFolder, setOpenCreateFolder] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');
  const [error, setError] = useState<IUploadError>({
    status: false,
    message: '',
  });

  const {
    data: { files },
    user: {
      user: { walletName },
    },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (closedAllModal) {
      setAnchorEl(null);
    }
  }, [closedAllModal]);

  const handleOpenMenu = (event: MouseEvent) => {
    if (anchorEl) {
      return;
    }
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateFolder = () => {
    setOpenCreateFolder(true);
  };

  const handleCloseCreateFolder = () => {
    setOpenCreateFolder(false);
  };

  const handleContinueCreateFolder = (value: string) => {
    setFolderName(value);
    setOpenCreateFolder(false);
    handleOpenConfirmation();
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleOkConfirmation = async () => {
    const folderDetails = {
      file: folderName,
      size: '0 B',
      owner: 'You',
      ownerId: walletName,
      modified: new Date().toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
      }),
      type: 'folder',
    };

    setOpenConfirmation(false);

    onFolderCreating();
    const response: any = await dispatch(
      createFolderThunk({
        walletId: walletName,
        folderName,
        parentFolderId,
      })
    );
    const { payload }: { payload: any } = response;
    const updatedFolderData = {
      ...folderDetails,
      folderId: payload?.data?.data?.id,
      _id: payload?.data?.data?.id,
      walletId: walletName,
    } as FolderProps;

    if (response.type === 'folder/create/fulfilled') {
      const newArr = [...files, updatedFolderData];
      dispatch(setFiles(newArr));
      dispatch(setFolders(filterFolders(newArr)));
      onFolderCreateComplete();
    } else {
      if (response?.error) {
        onFolderCreateFail(response?.error?.message || `Folder with name '${folderName}' already exists`);
      }
    }
  };

  const handleCreateFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let allFiles: FileProps[] = [];
    const files = Array.from(event.target.files as unknown as File[]);
    const isFileNameInvalid = files.some((file) =>
      /[<>:"/\\|?*.”]/.test(file.name.slice(0, file.name.lastIndexOf('.')))
    );
    if (isFileNameInvalid) {
      setError({
        status: true,
        message: 'File upload failed, the file name cannot contain any of the following characters: < > : " /  | ? * .',
      });
      return;
    }
    if (event.target.files) {
      const errorObject = fileHelper.validateFilesForUpload(
        event.target.files,
        1000,
        ACCEPTED_FILE_EXTENSIONS,
        undefined
      );
      if (errorObject) {
        setError({
          status: true,
          message: errorObject.message,
        });
        return false;
      }
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];

        allFiles = [
          ...allFiles,
          {
            file: file.name,
            size: String(file.size),
            owner: 'You',
            modified: Date.now().toString(),
            type: 'file',
            walletId: walletName,
            ownerId: walletName,
          },
        ];
        const formData = new FormData();
        formData.append('file', file);
        onFileUploading();
        const uploadFileResponse = await dispatch(
          uploadFileThunk({
            walletId: walletName,
            file,
            parentFolderId,
          })
        );
        // Show file upload message in toast
        if (uploadFileResponse.type && uploadFileResponse.type.includes('data/upload/fulfilled')) {
          onFileUploadComplete();
        } else {
          onFileUploadFail();
        }
      }
      handleClose();
    }
  };

  // const handleUploadFolder = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const folderName: string = event.target.files[0]?.webkitRelativePath.split('/')[0];
  //     const currentFiles = [];
  //     let folderSize = 0;

  //     for (let i = 0; i < event.target.files.length; i++) {
  //       const file = event.target.files[i];
  //       currentFiles.push({
  //         file: file.name,
  //         size: String(file.size),
  //         owner: 'You',
  //         modified: '12/12/2022 12:30 PM',
  //         type: 'file',
  //       });

  //       folderSize += file.size;
  //     }

  //     const folderDetails = {
  //       file: folderName,
  //       size: String(folderSize),
  //       owner: 'You',
  //       modified: '12/12/2022 12:30 PM',
  //       type: 'folder',
  //       data: currentFiles,
  //     };

  //     dispatch(setFiles([...files, folderDetails]));
  //   }
  // };

  const handleCreateFileOpen = (e: React.MouseEvent<HTMLLabelElement, globalThis.MouseEvent>): void => {
    e.stopPropagation();
    e.preventDefault();

    setCreateFileAnchor(e.currentTarget);
    setCreateFileOpen(true);
  };

  return (
    <>
      {openCreateFolder && (
        <CreateFolder
          isOpen={openCreateFolder}
          handleClose={handleCloseCreateFolder}
          handleConfirm={handleContinueCreateFolder}
        />
      )}
      <ConfirmationDialog
        message="Confirm the addition of this folder on chain"
        isOpen={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirm={handleOkConfirmation}
        walletId={walletName}
      />
      <CustomButton variant="contained" startIcon={<PlusIcon />} endIcon={<ArrowDownIcon />} onClick={handleOpenMenu}>
        Add New
      </CustomButton>
      <CustomMenu open={!!anchorEl} anchorEl={anchorEl} PaperProps={{}} onClose={handleClose}>
        <MenuItem disableRipple>
          <UploadFileButton onClick={handleCreateFileOpen}>
            <AddFileIcon />
            Create File
            <ButtonRightIcon>
              <ChevronRight />
            </ButtonRightIcon>
          </UploadFileButton>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenCreateFolder();
            handleClose();
          }}
        >
          <AddFolderIcon />
          Create Folder
        </MenuItem>
        <MenuItem>
          <UploadFileButton htmlFor="contained-button-file">
            <InputFile id="contained-button-file" multiple type="file" onChange={handleCreateFile} />
            <UploadFileIcon />
            Upload File
          </UploadFileButton>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <UploadFileButton htmlFor="contained-button-folder">
            <input
              type="file"
              id="contained-button-folder"
              name="fileList"
              multiple
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              webkitdirectory=""
              style={{ display: 'none' }}
              onChange={handleUploadFolder}
            />
            <UploadFolderIcon />
            Upload Folder
          </UploadFileButton>
        </MenuItem> */}
      </CustomMenu>
      <SnackBar
        content={error.message}
        visible={error.status}
        setVisible={(status) => setError({ ...error, status })}
        type="error"
      />
    </>
  );
};
