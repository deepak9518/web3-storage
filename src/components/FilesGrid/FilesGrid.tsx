import React, { useState, useEffect } from 'react';
import { Divider, Grid } from '@mui/material';
import { ItemContainer, Filename } from './index.styles';
import { ITEM_ACTION, ITEM_ACTIOM_INTERFACE, FOLDER_TYPE } from 'src/components/Table/constants';
import { OPTIONS_MENU_ITEMS } from './contants';
import Popover from './Popover';
import { FolderIcon } from 'src/assets/svg';
import { DataTypeSingle, DataItemType } from 'src/pages/dashboard';
import { useAppDispatch, useAppSelector } from 'src/hooks/useReduxTypedHooks';
import ConfirmationDialog from 'src/components/core/ConfirmationDialog';
import AlertDialog from 'src/components/core/AlertDialog';
import ProgressBar from 'src/components/core/ProgressBar';
import SnackBar from 'src/components/core/SnackBar';
import { SnackBarType } from 'src/components/core/SnackBar/SnackBar';
import { DialogType, launchDialog } from 'src/store/dialogs';
import { getIcon } from 'src/utils/helpers';
import { downloadFile } from 'src/utils/file-download.utils';
import { copyFileLink } from 'src/utils/files.utils';
import { copyFileThunk } from 'src/store/data/slice';

interface IGridProps {
  data: DataTypeSingle;
  onItemClick: (file: DataItemType | undefined, actionType: ITEM_ACTIOM_INTERFACE) => any;
  onInfo: (file: DataItemType) => void;
  onRename: (file: DataItemType) => () => void;
}

const FilesGrid: React.FC<IGridProps> = ({ data, onItemClick, onInfo, onRename }) => {
  const dispatch = useAppDispatch();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);
  const [messageConfirmationDialog, setMessageConfirmationDialog] = useState<string>('');
  const [fileDelete, setFileDelete] = useState<DataItemType | undefined | null>();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<SnackBarType | null>(null);
  const [toastContent, setToastContent] = useState<string>('');

  const {
    data: { totalDownloadBatch, currentDownloadProgress },
    user: { user },
  } = useAppSelector((state) => state);

  const {
    errorMessage: fileMoveErrorMessage,
    isFileMoveFail,
    isFileMoveSuccess,
  } = useAppSelector((state) => state.data.movingState);

  useEffect(() => {
    if (isFileMoveFail && fileMoveErrorMessage) {
      setShowToast(true);
      setToastStatus(SnackBarType.ERROR);
      setToastContent(fileMoveErrorMessage);
    }

    if (isFileMoveSuccess) {
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastContent('File moved successfully');
    }
  }, [isFileMoveFail, fileMoveErrorMessage, isFileMoveSuccess]);

  const onNavigate = (file: DataItemType) => () => {
    onItemClick(file, { key: ITEM_ACTION.NAVIGATE });
  };

  const handleShareActionClick = (fileName: string, file: DataItemType) => () => {
    dispatch(
      launchDialog({ dialogType: DialogType.SHARE_FILE, dialogProps: { fileName: fileName, fileDetails: file } })
    );
  };

  const onInfoClick = (file: DataItemType) => () => {
    onInfo(file);
  };

  const handleOnRemoveClick = (item: DataItemType) => () => {
    setOpenRemoveAlert(true);
    setFileDelete(item);
  };

  const handleDownloadError = (): void => {
    setShowToast(true);
    setToastStatus(SnackBarType.ERROR);
    setToastContent('Could not download file');
  };

  const handleOnDownloadClick = (item: DataItemType) => {
    if (item.file && item.publicUrl) {
      downloadFile(item.file, item.publicUrl || '', handleDownloadError);
    } else {
      handleDownloadError();
    }
  };

  const handleCloseRemoveAlert = () => {
    setOpenRemoveAlert(false);
  };

  const handleContinueRemove = () => {
    setOpenRemoveAlert(false);
    setMessageConfirmationDialog('Confirm the removal of this file from chain');
    setOpenConfirmationDialog(true);
  };

  const handleConfirmDeleteFileDialog = () => {
    setOpenConfirmationDialog(false);
    if (fileDelete) {
      onItemClick(fileDelete, { key: ITEM_ACTION.DELETE });
    }
    setFileDelete(null);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const renderOptions = (row: any) => {
    const options =
      row?.ownerId === (user?.walletId ?? user?.walletName)
        ? [...OPTIONS_MENU_ITEMS]
        : [...OPTIONS_MENU_ITEMS.slice(1, OPTIONS_MENU_ITEMS.length)];

    if (row.type === FOLDER_TYPE) {
      return [...options.slice(1, options.length)];
    } else {
      return options;
    }
  };

  const handleFileCopy = async (file: any) => {
    const response = await dispatch(copyFileThunk(file));
    const { error }: any = response;
    let type = SnackBarType.SUCCESS;
    let message = 'File copied successfully';

    if (error) {
      type = SnackBarType.ERROR;
      message = error?.message;
    }
    setShowToast(true);
    setToastStatus(type);
    setToastContent(message);
  };

  return (
    <Grid container spacing={5}>
      <AlertDialog
        title="Delete Permanently?"
        description="This file would be deleted completely and you would not be able to recover it."
        isOpen={openRemoveAlert}
        handleClose={handleCloseRemoveAlert}
        handleConfirm={handleContinueRemove}
      />
      <ConfirmationDialog
        message={messageConfirmationDialog}
        isOpen={openConfirmationDialog}
        handleClose={handleCloseConfirmationDialog}
        handleConfirm={handleConfirmDeleteFileDialog}
      />
      {data.map((i: DataItemType) => {
        const Icon = getIcon(i.file);
        return (
          <Grid item md={3} key={i.file}>
            <ProgressBar
              visible={totalDownloadBatch !== '0'}
              currentProgress={currentDownloadProgress}
              title="File downloading"
            />
            {showToast && toastStatus && toastContent && (
              <SnackBar type={toastStatus} visible={showToast} setVisible={setShowToast} content={toastContent} />
            )}
            <ItemContainer>
              {i.type === FOLDER_TYPE ? (
                <Grid container justifyContent={'center'} alignItems={'center'} pt={6} pb={6} onClick={onNavigate(i)}>
                  <FolderIcon scale="1.5" />
                </Grid>
              ) : (
                <Grid onClick={onNavigate(i)} container justifyContent={'center'} alignItems={'center'} pt={6} pb={6}>
                  <Icon scale={1.5} />
                </Grid>
              )}
              <Divider />
              <Grid container p={3} justifyContent={'space-between'} alignItems={'center'}>
                <Grid item onClick={onNavigate(i)}>
                  <Filename>{i.file}</Filename>
                </Grid>
                <Grid item>
                  <Popover
                    item={i}
                    options={renderOptions(i)}
                    onShare={handleShareActionClick(i.file, i)}
                    onRemove={handleOnRemoveClick(i)}
                    onDownload={() => handleOnDownloadClick(i)}
                    onInfo={onInfoClick(i)}
                    onCopy={() => copyFileLink(i)}
                    onCopyFile={() => handleFileCopy(i)}
                    onRename={onRename(i)}
                  />
                </Grid>
              </Grid>
            </ItemContainer>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FilesGrid;
