import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Grid, Table, TableRow, TableBody, Tabs, Tab, Box } from '@mui/material';
import { HomeIcon, FolderSmallIcon, FolderIcon, PeopleIcon } from 'src/assets/svg';
import SnackBar from 'src/components/core/SnackBar';
import { SnackBarType } from 'src/components/core/SnackBar/SnackBar';
import { CustomTableContainer, InlineContainer } from 'src/components/Table/index.styles';
import { MobileTableCell, TblBodyText } from './index.styles';
import Path from 'src/components/Table/Path';
import FilterBar from 'src/components/Table/FilterBar';
import { filterByFileTypeMobile } from 'src/components/Table/utils';
import { DataTypeSingle, DataItemType } from 'src/pages/dashboard';
import Popover from 'src/components/FilesGrid/Popover';
import { useAppDispatch, useAppSelector } from 'src/hooks/useReduxTypedHooks';
import { launchDialog } from 'src/store/dialogs';
import { DialogType } from 'src/store/dialogs';
import { OPTIONS_MENU_ITEMS } from 'src/components/FilesGrid/contants';

import { ITEM_ACTION, ITEM_ACTIOM_INTERFACE, FOLDER_TYPE } from 'src/components/Table/constants';
import AlertDialog from 'src/components/core/AlertDialog';
import ConfirmationDialog from 'src/components/core/ConfirmationDialog';
import ProgressBar from 'src/components/core/ProgressBar';
import { getIcon } from 'src/utils/helpers';
import { downloadFile } from 'src/utils/file-download.utils';
import { copyFileLink } from 'src/utils/files.utils';
import { DIRECTORY_LABELS } from 'src/modules/Directory';
// import { useRouter } from 'src/next/router';
import { IconContainer } from '../Path/index.styles';
import { initialTabLabels } from './constants';
import { copyFileThunk } from 'src/store/data/slice';

interface IMobileTableProps {
  data: DataTypeSingle;
  searchTerm: string;
  onItemClick: (file: DataItemType | undefined, actionType: ITEM_ACTIOM_INTERFACE) => void;
  onRename: (file: DataItemType) => () => void;
  onInfo: (file: DataItemType) => void;
  folderId: string | string[] | undefined;
  sharedFileData: DataTypeSingle;
  fileSharedData: DataTypeSingle;
  onTableItemClick: (
    item: DataItemType,
    actionType: ITEM_ACTIOM_INTERFACE
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
}

type InfoType = {
  row: {
    [string: string]: string;
  };
  index: number;
};

const MobileTable: React.FC<IMobileTableProps> = ({
  data,
  searchTerm,
  onItemClick,
  onRename,
  onInfo,
  sharedFileData,
  fileSharedData,
  onTableItemClick,
}) => {
  const [dataList, setDataList] = useState<DataTypeSingle>(data);
  const [value, setValue] = useState(1);
  const [links, setLinks] = useState<string[]>(['Recent']);
  const [fileType, setFileType] = useState<string>('All');
  const [fileName, setFileName] = useState<string>('');
  const [fileDetails, setFileDetails] = useState<object>({});
  const [fileDelete, setFileDelete] = useState<DataItemType | undefined>();
  const dispatch = useAppDispatch();
  // const router = useRouter();

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);
  const [messageConfirmationDialog, setMessageConfirmationDialog] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<SnackBarType | null>(null);
  const [toastContent, setToastContent] = useState<string>('');
  const {
    data: { totalDownloadBatch, currentDownloadProgress, files },
    user: { user },
  } = useAppSelector((state) => state);

  const {
    errorMessage: fileMoveErrorMessage,
    isFileMoveFail,
    isFileMoveSuccess,
  } = useAppSelector((state) => state.data.movingState);

  useEffect(() => {
    setLinks(initialTabLabels[value]);
    setDataList(data);
  }, [value]);

  useEffect(() => {
    const filteredData = filterByFileTypeMobile(files, fileType, searchTerm);
    setDataList(filteredData);
  }, [searchTerm]);

  useEffect(() => {
    if (fileName) {
      dispatch(
        launchDialog({
          dialogType: DialogType.SHARE_FILE,
          dialogProps: { fileName: fileName, fileDetails: fileDetails },
        })
      );
    }
  }, [fileName]);

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

  useEffect(() => {
    setDataList(data);
  }, [data]);

  const onFileTypeChange = (type: string) => {
    setFileType(type);
    const data = filterByFileTypeMobile(files, type, searchTerm);
    setDataList(data);
  };

  const Info = ({ row, index }: InfoType) => {
    if ((value === 1 && row.type === 'folder') || value === 2) {
      return (
        <MobileTableCell component="th" scope="row" key={`${index}${row.file}`}>
          {/* <InfoIcon /> */}
        </MobileTableCell>
      );
    }

    return <MobileTableCell component="th" scope="row" key={`${row.file}${index}empty`} />;
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

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    onItemClick(fileDelete, { key: ITEM_ACTION.DELETE });
    setFileDelete(undefined);
  };

  const tabPress = (tabIndex: number) => {
    if (tabIndex == value) {
      // router.push('/dashboard');
    }
  };

  const handleMobileDirectoryChange = (value: any) => {
    setFileType('All');
    setValue(value);
    dispatch({type:'setActiveDirectory',payload:DIRECTORY_LABELS[value].label});
    // router.push('/dashboard');
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

  useEffect(() => {
    switch (value) {
      case 0:
        return setDataList(data);
      case 1:
        return setDataList(data);
      case 2:
        return setDataList(sharedFileData);
      case 3:
        return setDataList(fileSharedData);
    }
  }, [value]);

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

  return (
    <Grid container direction="column" gap={'1rem'} sx={{ padding: '0 2rem' }}>
      <ProgressBar
        visible={totalDownloadBatch !== '0'}
        currentProgress={currentDownloadProgress}
        title="File downloading"
      />
      {showToast && toastStatus && toastContent && (
        <SnackBar type={toastStatus} visible={showToast} setVisible={setShowToast} content={toastContent} />
      )}
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
        handleConfirm={handleCloseConfirmationDialog}
      />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '0 -2rem' }}>
        <Tabs
          sx={[
            {
              '& .MuiTabs-flexContainer': {
                justifyContent: 'space-evenly',
              },
            },
          ]}
          value={value}
          onChange={(_e, value) => handleMobileDirectoryChange(value)}
          aria-label="Dash Tabs"
        >
          <Tab onClick={() => tabPress(0)} icon={<HomeIcon />} />
          <Tab onClick={() => tabPress(1)} icon={<FolderSmallIcon />} />
          <Tab onClick={() => tabPress(2)} icon={<PeopleIcon />} />
          <Tab onClick={() => tabPress(3)} icon={<PeopleIcon />} />
        </Tabs>
      </Box>

      <Grid item py={2}>
        <Path links={links} icon={value === 1} onPathClick={() => {}} />
      </Grid>
      {value === 1 && (
        <Grid item>
          <FilterBar currentDir={links[0]} mobile onFileTypeChange={onFileTypeChange} onListShapeChange={() => {}} />
        </Grid>
      )}

      <Grid item>
        <CustomTableContainer>
          <Table aria-label="mobile table">
            <TableBody>
              {(dataList || []).map((row: DataItemType, index: number) => {
                const Icon = getIcon(row.file);

                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    // onClick={() => onItemClick(row, { key: ITEM_ACTION.NAVIGATE })}
                  >
                    <MobileTableCell component="th" scope="row">
                      {row.type === FOLDER_TYPE ? (
                        <InlineContainer onClick={onTableItemClick(row, { key: ITEM_ACTION.NAVIGATE })}>
                          <FolderIcon />
                          <TblBodyText>{row['file']}</TblBodyText>
                        </InlineContainer>
                      ) : (
                        <InlineContainer onClick={onTableItemClick(row, { key: ITEM_ACTION.DETAILS })}>
                          <IconContainer>
                            <Icon />
                          </IconContainer>
                          <TblBodyText>{row['file']}</TblBodyText>
                        </InlineContainer>
                      )}
                    </MobileTableCell>

                    <Info row={row} index={index} />

                    <MobileTableCell component="th" scope="row" key={`${row.file}${index}`}>
                      <Popover
                        item={row}
                        options={renderOptions(row)}
                        onShare={() => {
                          setFileName(row.file);
                          setFileDetails(row);
                        }}
                        onRemove={handleOnRemoveClick(row)}
                        onRename={onRename(row)}
                        onInfo={() => onInfo(row)}
                        onCopy={() => copyFileLink(row)}
                        onCopyFile={() => handleFileCopy(row)}
                        onDownload={() => handleOnDownloadClick(row)}
                      />
                    </MobileTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CustomTableContainer>
      </Grid>
    </Grid>
  );
};

export default MobileTable;
