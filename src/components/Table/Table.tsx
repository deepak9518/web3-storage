import React, { useState, useEffect } from "react";

import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Checkbox, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Path from "./Path/Path";
import FilterBar from "./FilterBar";
import { ArrowUpBlueIcon, FolderIcon } from "src/assets/svg";
import {
  TblRow,
  InlineContainer,
  TblHeadText,
  TblBodyText,
  CellBg,
  CustomTableContainer,
  Rotation,
  Title,
} from "./index.styles";
import { COLORS } from "src/constants/colors";
import {
  SORT_VALUES,
  sortList,
  sortListBySize,
  filterByFileType,
} from "./utils";
import MobileTable from "./MobileTable";
import { TABLE_MODES } from "./FilterBar/constants";
import { FOLDER_TYPE, ITEM_ACTION, ITEM_ACTIOM_INTERFACE } from "./constants";
import DragAndDropFiles from "../DragAndDropFiles";
import { usePrevious } from "src/hooks/usePrevious";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxTypedHooks";
import { DataItemType, DataTypeSingle } from "src/pages/dashboard";
import { FileProps, FolderProps } from "src/store/data/types";
import SnackBar, { SnackBarType } from "../core/SnackBar/SnackBar";
import { getFileType, getIcon } from "src/utils/helpers";
import {
  copyFileThunk,
  deleteFilesAndFolders,
  listFilesByFolderIdThunk,
  rejectSharedFilesAndFolders,
} from "src/store/data";
import {
  downloadFile,
  downloadMultipleFile,
} from "src/utils/file-download.utils";
import { copyFileLink } from "src/utils/files.utils";
import { OPTIONS, OPTIONS_MENU_ITEMS } from "../FilesGrid/contants";
import { DialogType } from "src/store/dialogs";
import ProgressBar from "../core/ProgressBar";
import Popover from "../FilesGrid/Popover";
import FilesGrid from "../FilesGrid";
import ConfirmationDialog from "../core/ConfirmationDialog";
import mobile from "is-mobile";

export interface ITableProps {
  columns: IColumnType[];
  data: DataTypeSingle;
  searchTerm: string;
  currentDir: string;
  onDropHandler: (files: File[]) => void;
  onShowFileDetails: (file: DataItemType) => void;
  onFileDeleteComplete: () => void;
  onFileDeleteFail: () => void;
  sharedFileData: DataTypeSingle;
  fileSharedData: DataTypeSingle;
  refetch: () => void;
}

/**
 * @interface IColumnType
 * @property {key} - label of the column
 */
export interface IColumnType {
  /**@property name of the column */
  name: string;
  key: string;
}

interface Sort {
  [key: string]: string;
}

type ObjectType = { [string: string]: string };

const Table = ({
  columns,
  data,
  searchTerm,
  currentDir,
  onDropHandler,
  onShowFileDetails,
  onFileDeleteComplete,
  onFileDeleteFail,
  sharedFileData,
  fileSharedData,
  refetch,
}: ITableProps) => {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const router: { [key: string | number]: any } = { query: { folderId: "" } };
  const [dataList, setDataList] = useState<DataTypeSingle>(data);
  const [checked, setChecked] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>(["Home"]);
  const [sort, setSort] = useState<Sort>({});
  const [fileType, setFileType] = useState<string>("All");
  const [listShape, setListShape] = useState<string>(TABLE_MODES.LIST);
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<DataItemType>();
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [messageConfirmationDialog, setMessageConfirmationDialog] =
    useState<string>("");
  const [filesDelete, setFilesDelete] = useState<FileProps[] | null>(null);
  const [toastStatus, setToastStatus] = useState<SnackBarType | null>(null);
  const [toastContent, setToastContent] = useState<string>("");
  const [timeStamp, setTimeStamp] = useState<number>();
  const { folderId } = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { files } = useAppSelector((state) => state.data);
  const { dataPreview, isFolderView, folderPath } = useAppSelector(
    (state) => state.common
  );
  const {
    user: { user },
  } = useAppSelector((state) => state);

  const {
    data: { totalDownloadBatch, currentDownloadProgress },
  } = useAppSelector((state) => state);

  const {
    errorMessage: fileMoveErrorMessage,
    isFileMoveFail,
    isFileMoveSuccess,
  } = useAppSelector((state) => state.data.movingState);

  const prevDataPreview = usePrevious(dataPreview);

  const [openOnlyOffice, setOpenOnlyOffice] = useState<boolean>(false);

  useEffect(() => {
    if (openOnlyOffice && dataPreview && prevDataPreview !== dataPreview) {
      window.open(
        `/preview?filename=${encodeURIComponent(dataPreview.file)}`,
        "_blank"
      );
    }
  }, [dataPreview, openOnlyOffice]);

  useEffect(() => {
    const object: ObjectType = {};
    columns.map((item: IColumnType) => {
      object[item.key] = SORT_VALUES.DESC;
    });

    setSort(object);
  }, [columns]);

  useEffect(() => {
    if (isFolderView) {
      setDataList(sortList([], "modified", SORT_VALUES.DESC)); // Need to handle this with correct value after API has been fixed
      return;
    }
    setDataList(sortList(dataList, "modified", SORT_VALUES.DESC));
  }, [dataList?.length, isFolderView]);

  useEffect(() => {
    const data = filterByFileType(files, fileType, searchTerm);
    setDataList(sortList(data, "modified", SORT_VALUES.DESC));
  }, [searchTerm, data, files, currentDir]);

  useEffect(() => {
    if (folderId) {
      setDataList(sortList(data, "modified", SORT_VALUES.DESC));
      return;
    } else {
      setLinks([currentDir]);
    }
  }, [folderId, data]);

  useEffect(() => {
    setFileType("All");
    setLinks([currentDir]);
  }, [currentDir]);

  useEffect(() => {
    if (file) {
      dispatch({
        type: "launchDialog",
        payload: {
          dialogType: DialogType.SHARE_FILE,
          dialogProps: { fileName: fileName, fileDetails: file },
        },
      });
    }
  }, [file, timeStamp]);

  useEffect(() => {
    setLinks((links) => [...links, folderPath]);
  }, [folderPath]);

  useEffect(() => {
    if (isFileMoveFail && fileMoveErrorMessage) {
      setShowToast(true);
      setToastStatus(SnackBarType.ERROR);
      setToastContent(fileMoveErrorMessage);
    }

    if (isFileMoveSuccess) {
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastContent("File moved successfully");
    }
  }, [isFileMoveFail, fileMoveErrorMessage, isFileMoveSuccess]);

  const onSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setChecked([]);
      return;
    }
    setChecked(data.map((i) => i._id));
  };

  const onSelect = (fileId: string) => {
    if (!checked.includes(fileId)) {
      setChecked((checked) => [...checked, fileId]);
      return;
    }

    setChecked((checked) => checked.filter((i) => i !== fileId));
  };

  const onFileTypeChange = (type: string) => {
    setFileType(type);
    setDataList(filterByFileType(data, type, searchTerm));
  };

  const onSortBy = (sortBy: string) => {
    /* Find sort field and change to the opposite ASC || DESC */
    const currentSort = sort[sortBy];
    const sortTo =
      currentSort === SORT_VALUES.DESC ? SORT_VALUES.ASC : SORT_VALUES.DESC;

    /* Reset other sort fields */
    const object: ObjectType = {};
    columns.map((item: IColumnType) => {
      if (item.key !== sortBy) {
        object[item.key] = SORT_VALUES.DESC;
      }
    });

    setSort({ ...object, [sortBy]: sortTo });

    if (sortBy === "size") {
      setDataList(sortListBySize(dataList, sortBy, sortTo));
    } else {
      setDataList(sortList(dataList, sortBy, sortTo));
    }
  };

  const setDataPreviewItem = (
    item: DataItemType,
    fileType:
      | "image"
      | "audio"
      | "excel"
      | "word"
      | "pdf"
      | "video"
      | "file"
      | "html"
      | "psd"
      | "ai"
      | "zip"
  ): void => {
    dispatch({ type: "setDataPreview", payload: item });
    if (fileType === "video" || fileType === "image" || fileType === "audio") {
      setOpenOnlyOffice(false);
      dispatch({ type: "toogleSetDetails" });
    } else {
      if (item === prevDataPreview && dataPreview) {
        window.open(
          `/preview?filename=${encodeURIComponent(dataPreview.file)}`,
          "_blank"
        );
      }
      setOpenOnlyOffice(true);
    }
  };

  const onTableItemClick =
    (item: DataItemType, actionType: ITEM_ACTIOM_INTERFACE) => () => {
      if (item && item.file && item.type == "file") {
        const type = item.file.split(".")[item.file.split(".").length - 1];
        const fileType = getFileType(type);
        const isFolder = item.type === "folder";
        if (isFolder) {
          listFilesByFolderIdThunk({
            walletId: item.owner,
            folderId: item.folderId,
          });

          dispatch({ type: "setFolderView", payload: true });
          return;
        }
        setDataPreviewItem(item, fileType);
        onItemClick(item, actionType);
      } else if (item && item.file && item.type == FOLDER_TYPE) {
        dispatch({ type: "setFolderPath", payload: item.file });

        // router.push({
        //   pathname: '/dashboard',
        //   query: { folderId: item?.folderId },
        // });
      } else {
        setShowToast(true);
        setToastStatus(SnackBarType.ERROR);
        setToastContent("Could not load preview");
      }
    };

  const onFileGridItemClick = (
    item: DataItemType | undefined,
    actionType: ITEM_ACTIOM_INTERFACE
  ) => {
    if (item && item.file && item.type == "file") {
      const type = item.file.split(".")[item.file.split(".").length - 1];
      const fileType = getFileType(type);
      const isFolder = item.type === "folder";
      if (isFolder) {
        listFilesByFolderIdThunk({
          walletId: item.owner,
          folderId: item.folderId,
        });
        dispatch({ type: "setFolderView", payload: true });
        return;
      }

      setDataPreviewItem(item, fileType);
      onItemClick(item, actionType);
    } else if (item && item.file && item.type == FOLDER_TYPE) {
      dispatch({ type: "setFolderPath", payload: item.file });

      // router.push(`/dashboard?folderId=${item?.folderId}`);
    } else {
      setShowToast(true);
      setToastStatus(SnackBarType.ERROR);
      setToastContent("Could not load preview");
    }
  };

  const onItemClick = async (
    item: DataItemType | undefined,
    actionType: ITEM_ACTIOM_INTERFACE
  ) => {
    // handle folder click event for mobile
    if (item && item.file && item.type === FOLDER_TYPE) {
      // router.push(`/dashboard?folderId=${item?.folderId}`);
      return;
    }
    if (item) {
      if (actionType.key === ITEM_ACTION.NAVIGATE) {
        if (item.type === FOLDER_TYPE && !links.includes(item.file)) {
          setLinks((links) => [...links, item.file]);
          setDataList(item.data);
        }
      }
      if (actionType.key === ITEM_ACTION.DELETE) {
        const deleteFileResponse:
          | (FileProps | FolderProps)[]
          | undefined
          | { [key: string | number]: any } = await deleteFilesAndFolders(
          [item] as FileProps[],
          {}
        );

        // if (
        //   deleteFileResponse.type &&
        //   deleteFileResponse.type.includes(
        //     "data/deleteFilesAndFolders/fulfilled"
        //   )
        // ) {
        onFileDeleteComplete();
        // } else {
        onFileDeleteFail();
        // }
        setFilesDelete(null);
      }
    }
  };

  const onPathClick = (path: string) => {
    if (path === "Home") {
      setDataList(data);
      setLinks(["Home"]);
    }
  };

  const handleOnRemoveClick = (files: FileProps[] | FolderProps[]) => () => {
    if (files?.[0]?.ownerId === user?.walletName) {
      setMessageConfirmationDialog(
        "Confirm the removal of the selected file(s) from chain"
      );
      setOpenConfirmationDialog(true);
      setFilesDelete(files);
    } else {
      rejectSharedFilesAndFolders(files, {});
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastContent("Shared file access has been revoked");
    }
  };

  const handleOnRemoveMultipleClick = (files: (FileProps | FolderProps)[]) => {
    return handleOnRemoveClick(
      files.filter((row: FileProps | FolderProps) =>
        checked.includes((row._id || row._id) ?? "")
      )
    );
  };

  const handleDownloadError = (): void => {
    setShowToast(true);
    setToastStatus(SnackBarType.ERROR);
    setToastContent("Could not download file");
  };

  const handleOnDownloadClick = (files: FileProps[]) => {
    if (checked.length > 1) {
      const selectedData = dataList.filter((x) => checked.includes(x.fileId));
      downloadMultipleFile(selectedData, handleDownloadError);
      return;
    }
    if (files.length) {
      downloadFile(
        files[0].file,
        files[0].publicUrl || "",
        handleDownloadError
      );
    } else {
      handleDownloadError();
    }
  };

  const handleConfirmDeleteFileDialog = () => {
    setOpenConfirmationDialog(false);
    if (filesDelete) {
      deleteFilesAndFolders(filesDelete, {});
      setChecked([]);
    }
    setFilesDelete(null);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleCopyLink = (file: DataItemType) => () => {
    dispatch({ type: "setCopiedDataPreview", payload: file });
    copyFileLink(file);
    setShowToast(true);
    setToastStatus(SnackBarType.SUCCESS);
    setToastContent("Link copied to clipboard");
  };

  const handleFileCopy = async (file: any) => {
    const response = await copyFileThunk(file);
    const { error }: any = response;
    let type = SnackBarType.SUCCESS;
    let message = "File copied successfully";

    if (error) {
      type = SnackBarType.ERROR;
      message = error?.message;
    }
    setShowToast(true);
    setToastStatus(type);
    setToastContent(message);
    refetch();
  };

  const handleRename = (file: any) => () => {
    dispatch({
      type: "launchDialog",
      payload: {
        dialogType: DialogType.RENAME_FILE,
        dialogProps: { fileDetails: file },
      },
    });
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

  const List = () => {
    if (listShape === TABLE_MODES.GRID) {
      return (
        <FilesGrid
          data={dataList}
          onItemClick={onFileGridItemClick}
          onInfo={onShowFileDetails}
          onRename={handleRename}
        />
      );
    }
    const formatFileName = (file: string) => {
      const maxNameLength = mobile() ? 25 : 50;
      const beforeExt: string = file?.split(".")[0];
      if (beforeExt?.length > maxNameLength) {
        return `${beforeExt.substring(0, maxNameLength - 3)}...${
          file?.split(".")[1]
        }`;
      }
      return file;
    };

    return (
      <CustomTableContainer>
        <ConfirmationDialog
          message={messageConfirmationDialog}
          isOpen={openConfirmationDialog}
          file={filesDelete?.length ? filesDelete[0] : null}
          handleClose={handleCloseConfirmationDialog}
          handleConfirm={handleConfirmDeleteFileDialog}
        />
        {(dataList || []).length === 0 && currentDir === "Shared with me" ? (
          <Typography variant="body1">
            No files has been shared with you yet
          </Typography>
        ) : (
          <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="5%">
                  <Checkbox
                    checked={
                      dataList?.length > 0 &&
                      checked.length === dataList?.length
                    }
                    onChange={onSelectAll}
                    style={{ color: COLORS.GREY_80 }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    <InlineContainer component="button">
                      <TblHeadText>{column.name}</TblHeadText>
                      <Rotation flip={sort[column.key] === SORT_VALUES.ASC}>
                        <ArrowUpBlueIcon onClick={() => onSortBy(column.key)} />
                      </Rotation>
                    </InlineContainer>
                  </TableCell>
                ))}
                <TableCell width="5%">
                  {checked.length > 0 && (
                    <Popover
                      item={null}
                      onShare={() => {}}
                      options={OPTIONS_MENU_ITEMS.filter(
                        (item) =>
                          item.key === OPTIONS.REMOVE ||
                          item.key === OPTIONS.DOWNLOAD
                      )}
                      onDownload={() =>
                        handleOnDownloadClick(dataList as FileProps[])
                      }
                      onRemove={handleOnRemoveMultipleClick(
                        dataList as FileProps[]
                      )}
                      breadcrumbs={links}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(dataList || []).map((row: DataItemType, index: number) => {
                const Icon = getIcon(row.file);

                return (
                  <TblRow key={index}>
                    <TableCell width="5%">
                      <Checkbox
                        checked={checked.includes(row.fileId || row.folderId)}
                        onChange={() => onSelect(row.fileId || row.folderId)}
                        style={{ color: COLORS.GREY_80 }}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      if (column.key == "file") {
                        return (
                          <TableCell
                            component="th"
                            scope="row"
                            key={`${column.key}${index}`}
                            className="px-6 py-4 whitespace-nowrap"
                            onClick={onTableItemClick(row, {
                              key:
                                row.type === FOLDER_TYPE
                                  ? ITEM_ACTION.NAVIGATE
                                  : ITEM_ACTION.DETAILS,
                            })}
                          >
                            {row.type === FOLDER_TYPE ? (
                              <InlineContainer>
                                <FolderIcon />
                                <TblBodyText>{row[column.key]}</TblBodyText>
                              </InlineContainer>
                            ) : (
                              <InlineContainer>
                                <Icon />
                                <TblBodyText>{row[column.key]}</TblBodyText>
                              </InlineContainer>
                            )}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          key={`${column.key}${index}`}
                          className="px-6 py-4 whitespace-nowrap"
                          onClick={onTableItemClick(row, {
                            key: ITEM_ACTION.DETAILS,
                          })}
                        >
                          {column.key === "owner" ? (
                            <CellBg>
                              <TblBodyText>{row[column.key]}</TblBodyText>
                            </CellBg>
                          ) : (
                            <TblBodyText>
                              {column.key === "size"
                                ? row[column.key]
                                : row[column.key]}
                            </TblBodyText>
                          )}
                        </TableCell>
                      );
                    })}

                    <TableCell width="5%">
                      <Popover
                        item={row}
                        options={renderOptions(row)}
                        onShare={() => {
                          setFile(row);
                          setFileName(formatFileName(row?.file));
                          setTimeStamp(new Date().getTime());
                        }}
                        onInfo={() => onShowFileDetails(row)}
                        onRemove={handleOnRemoveClick([row] as FileProps[])}
                        onDownload={() =>
                          handleOnDownloadClick([row] as FileProps[])
                        }
                        onCopy={handleCopyLink(row)}
                        onCopyFile={() => handleFileCopy(row)}
                        onRename={handleRename(row)}
                        breadcrumbs={links}
                      />
                    </TableCell>
                  </TblRow>
                );
              })}
            </TableBody>
          </MUITable>
        )}
      </CustomTableContainer>
    );
  };

  if (isMobile)
    return (
      <MobileTable
        data={dataList}
        searchTerm={searchTerm}
        onItemClick={onItemClick}
        onRename={handleRename}
        onInfo={onShowFileDetails}
        folderId={folderId}
        sharedFileData={sharedFileData}
        fileSharedData={fileSharedData}
        onTableItemClick={onTableItemClick}
      />
    );

  return (
    <Grid container spacing={4} direction="column">
      <ProgressBar
        visible={totalDownloadBatch !== "0"}
        currentProgress={currentDownloadProgress}
        totalProgress={totalDownloadBatch}
        title="File downloading"
      />
      {showToast && toastStatus && toastContent && (
        <SnackBar
          type={toastStatus}
          visible={showToast}
          setVisible={setShowToast}
          content={toastContent}
        />
      )}
      {currentDir === "My Drive" && (
        <Grid item>
          <Path
            links={links}
            icon
            onPathClick={(path: string) => onPathClick(path)}
          />
        </Grid>
      )}
      {currentDir === "Shared with me" && <Title>{currentDir}</Title>}

      {currentDir === "Shared Files" && <Title>{currentDir}</Title>}
      <Grid item>
        <FilterBar
          onFileTypeChange={onFileTypeChange}
          onListShapeChange={(listShape) => setListShape(listShape)}
          currentDir={currentDir}
        />
      </Grid>

      <Grid item>
        <DragAndDropFiles onDropHandler={onDropHandler}>
          <List />
        </DragAndDropFiles>
      </Grid>
    </Grid>
  );
};

export default Table;
