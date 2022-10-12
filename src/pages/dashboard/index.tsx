import React from "react";
import DStorage from "../../abis/DStorage.json";
import { ChangeEvent, useEffect, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { useTheme } from "@mui/material/styles";
import { PrivateLayout } from "../../components/Layout";
import Table, { IColumnType } from "../../components/Table";
import { useAppSelector, useAppDispatch } from "../../hooks/useReduxTypedHooks";
import {
  // clearError,
  refreshTokenThunk,
  // setToken,
  // setUserId,
  // setWalletId,
  validateTokenThunk,
  // resetUser,
} from "../../store/user/slice";
import {
  Wrapper,
  DashboardStyled,
  MobileHeader,
  MobileHeaderItem,
  PaddedWrapper,
} from "./index.styles";
import { CreateFileMenu } from "../../modules/CreateFileMenu";
import { CreateOrUploadButton } from "../../modules/CreateOrUploadButton";
import { SearchBar } from "../../components/Layout/PrivateLayout/SearchBar";
import FullscreenLoader from "../../components/core/FullscreenLoader";
import SnackBar from "../../components/core/SnackBar";
import { SnackBarType } from "../../components/core/SnackBar/SnackBar";
import { Directory, DIRECTORY_LABELS } from "../../modules/Directory";
import { useWarnUnsaved } from "../../hooks/useWarnUnsaved";
import { uploadFileThunk } from "../../store/data/slice";
import { FileList } from "../../store/data/types";
import {
  useShareFileData,
  useFileSharedData,
  useFilesAndFoldersData,
} from "../../hooks/apis/useFileData";
import { userDetailsThunk } from "../../store/user/slice";
import { FileProps, FolderProps } from "../../store/data/types";
import { LoaderIcon } from "../../assets/svg/loader-icon";
import { FileDetailsDialog } from "../../components/FileDetailsDialog";
import DetailsPreviewDialog from "../../components/DetailsPreviewDialog";
import ProgressBar from "../../components/core/ProgressBar";
// import { closeDialog } from "../../store/dialogs";
import { getRenameFileSelector } from "../../store/data/selector";
import { COLORS } from "../../constants/colors";
import Web3 from "web3";
import { ObjectType } from "src/utils/types";
import { useSelector } from "react-redux";
declare global {
  interface Window {
    web3?: any;
    ethereum?: any;
  }
}
const columns: IColumnType[] = [
  {
    name: "File",
    key: "file",
  },
  {
    name: "Size",
    key: "size",
  },
  {
    name: "Owner",
    key: "owner",
  },
  {
    name: "Modified on",
    key: "modified",
  },
];

export type DataItemType = { [string: string]: any };
export type DataTypeSingle = { [string: string]: any }[];

/**
 *
 * @returns Dashboard with users
 */
const Dashboard = ({ folderId }: { folderId: string }): JSX.Element => {
  const {
    // data: { totalBatch, currentProgress },
    // data: { files, totalBatch, currentProgress },
    common: { activeDirectory, isDetailsShow },
    user: { token, userId, status, error, user, refreshToken },
  } = useAppSelector((state) => state);
  const {
    isLoading: isLoadingFilesAndFolders,
    data: filesAndFoldersData,
    refetch: filesAndFoldersRefetch,
  } = useFilesAndFoldersData(user.walletName, folderId);
  const [fetchLatestList, setFetchLatestList] = useState<boolean>(true);

  const { data: sharedFileData } = useShareFileData(user && user.walletName);
  const { data: fileSharedData } = useFileSharedData(
    user && user.walletName,
    fetchLatestList
  );

  // const router = useRouter();
  const router: { [key: string | number]: any } = { query: {}, isReady: true };
  const {
    token: queryToken,
    userId: queryUserId,
    walletId,
    folderId: currentFolderId,
  } = router.query;
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [uploadStarted, uploadCompleted] = useWarnUnsaved();
  const [searchTerm, setSearchTerm] = useState("");
  const [fileDetails, setFileDetails] = useState<DataItemType | null>();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");
  const [toastStatus, setToastStatus] = useState<SnackBarType | null>(null);

  const [createFileOpen, setCreateFileOpen] = useState<boolean>(false);
  const [createFileAnchorEl, setCreateFileAnchorEl] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // async componentWillMount() {
  //   await this.loadWeb3()
  //   await this.loadBlockchainData()
  // }
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    dispatch({
      type: "setWalletId",
      payload: accounts[0],
    }); // Network ID
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    // const networkData = DStorage.networks[networkId]
    // if(networkData) {
    //   // Assign contract
    //   const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
    //   console.log(dstorage)
    //   // this.setState({ dstorage })
    //   // Get files amount
    //   const filesCount = await dstorage.methods.fileCount().call()
    //   console.log(filesCount)
    //   // this.setState({ filesCount })
    //   // Load files&sort by the newest
    //   for (var i = filesCount; i >= 1; i--) {
    //     const file = await dstorage.methods.files(i).call()
    //     console.log(file)
    //     // this.setState({
    //     //   files: [...this.state.files, file]
    //     // })
    //   }
    // } else {
    //   window.alert('DStorage contract not deployed to detected network.')
    // }
  };

  // Get file from user
  // captureFile = event => {
  //   event.preventDefault()

  //   const file = event.target.files[0]
  //   const reader = new window.FileReader()

  //   reader.readAsArrayBuffer(file)
  //   reader.onloadend = () => {
  //     this.setState({
  //       buffer: Buffer(reader.result),
  //       type: file.type,
  //       name: file.name
  //     })
  //     console.log('buffer', this.state.buffer)
  //   }
  // }

  // // uploadFile = description => {
  //   console.log("Submitting file to IPFS...")

  //   // Add file to the IPFS
  //   ipfs.add(this.state.buffer, (error, result) => {
  //     console.log('IPFS result', result.size)
  //     if(error) {
  //       console.error(error)
  //       return
  //     }

  //     this.setState({ loading: true })
  //     // Assign value for the file without extension
  //     if(this.state.type === ''){
  //       this.setState({type: 'none'})
  //     }
  //     this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
  //       this.setState({
  //        loading: false,
  //        type: null,
  //        name: null
  //      })
  //      window.location.reload()
  //     }).on('error', (e) =>{
  //       window.alert('Error')
  //       this.setState({loading: false})
  //     })
  //   })
  // }

  // let state = {
  //   account: "",
  //   dstorage: null,
  //   files: [],
  //   loading: false,
  //   type: null,
  //   name: null,
  // };

  const {
    isTransferFail,
    isFileTransferring,
    isTransferSuccess,
    errorMessage,
    recentlyTransferredFileId,
  } = useAppSelector(state=>state.data.transferState);
  const data = useAppSelector(state=>state.data);
  console.log(data);
  const {
    errorMessage: fileMoveErrorMessage,
    isFileMoveFail,
    isFileMoveSuccess,
  } = useAppSelector((state) => state.data.movingState);

  const {
    isFileRenamedFail,
    isFileRenaming,
    isFileRenamedSuccessfully,
    errorMessage: renameErrorMessage,
  } = useAppSelector(getRenameFileSelector);

  useEffect(() => {
    filesAndFoldersRefetch();
  }, [currentFolderId]);
  // }, [currentFolderId, files]);

  useEffect(() => {
    if (fetchLatestList) {
      setFetchLatestList(false);
    }
  }, []);

  // TODO : refactoring this effects call, maybe after user has login
  // added here for easy development purposes
  useEffect(() => {
    dispatch({type:'setActiveDirectory',payload:DIRECTORY_LABELS[1].label});

    if (token) {
      userDetailsThunk({
        userId:
          queryUserId && typeof queryUserId === "string" ? queryUserId : userId,
      });
    }
  }, [token]);

  useEffect(() => {
    if (refreshToken) {
      checkToken();
    }
  }, [refreshToken]);
  useEffect(() => {
    if (error && error.length > 0) {
      dispatch({ type: "clearError" });
      // router.push('/signup?redirectUrl=/dashboard');
    }
  }, [error]);

  useEffect(() => {
    console.log(fileSharedData, "filesshared===============================>");
  }, [fileSharedData]);

  const checkFolderFile = (item: FileProps | FolderProps) => {
    const currentFolder = folderId ? folderId : "root";
    return item.type === "file" ? item.folderId === currentFolder : true;
  };

  useEffect(() => {
    if (
      (filesAndFoldersData && activeDirectory === DIRECTORY_LABELS[1].label) ||
      (filesAndFoldersData && activeDirectory === DIRECTORY_LABELS[0].label)
    ) {
      if (activeDirectory === DIRECTORY_LABELS[1].label) {
        const updatedData = filesAndFoldersData.filter(
          (item) => item.walletId === item.ownerId && checkFolderFile(item)
        );
        dispatch({ type: "setFiles", payload: updatedData });
      } else {
        const updatedData = filesAndFoldersData.filter((item) =>
          checkFolderFile(item)
        );
        dispatch({ type: "setFiles", updatedData });
      }
    }

    if (sharedFileData && activeDirectory === DIRECTORY_LABELS[2].label) {
      dispatch({ type: "setFiles", sharedFileData });
    }

    if (fileSharedData && activeDirectory === DIRECTORY_LABELS[3].label) {
      setFetchLatestList(true);

      dispatch({ type: "setFiles", fileSharedData });
    }
  }, [
    filesAndFoldersData,
    sharedFileData,
    activeDirectory,
    user.walletName,
    fileSharedData,
    folderId,
  ]);

  useEffect(() => {
    if (!router.isReady) return;
    else if (queryToken && typeof queryToken === "string" && !token) {
      dispatch({ type: "setToken", queryToken });
      dispatch({ type: "validateTokenThunk", queryToken });
      dispatch({
        type: "setUserId",
        payload: userId && typeof userId === "string" ? userId : "",
      });
      dispatch({
        type: "  setWalletId",
        payload: walletId && typeof walletId === "string" ? walletId : "",
      });
    }
    //  else if (!token) {
    //   router.replace('/signup');
    // }
  }, [queryToken, userId, walletId, router.isReady, token]);

  // useEffect(() => {
  //   if (fileDetails) {
  //     dispatch(launchDialog({ dialogType: DialogType.FILE_DETAILS, dialogProps: { fileDetails: fileDetails } }));
  //   }
  // }, [fileDetails]);

  useEffect(() => {
    if (isFileTransferring) {
      dispatch({ type: "closeDialog" });
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastText(`Transferring ownership...`);
    }

    if (isTransferSuccess) {
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastText(`Ownership transferred Successfully`);
      dispatch({
        type: "setFiles",
        payload: [].filter(
          (item: ObjectType) => item.fileId !== recentlyTransferredFileId
        ),
        // files?.filter((item) => item.fileId !== recentlyTransferredFileId)
      });
    }

    if (isTransferFail) {
      setShowToast(true);
      setToastStatus(SnackBarType.ERROR);
      setToastText(errorMessage);
    }
  }, [isTransferFail, isTransferSuccess, isFileTransferring]);

  useEffect(() => {
    if (isFileMoveFail && errorMessage) {
      setShowToast(true);
      setToastStatus(SnackBarType.ERROR);
      setToastText(fileMoveErrorMessage);
    }

    if (isFileMoveSuccess) {
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastText("File moved successfully");
    }
  }, [isFileMoveFail, fileMoveErrorMessage, isFileMoveSuccess]);

  useEffect(() => {
    if (isFileRenaming) {
      dispatch({ type: "closeDialog" });
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastText(`Renaming file...`);
    }

    if (isFileRenamedSuccessfully) {
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastText(`Renamed Successfully`);
    }

    if (isFileRenamedFail) {
      setShowToast(true);
      setToastStatus(SnackBarType.ERROR);
      setToastText(renameErrorMessage);
    }
  }, [isFileRenamedFail, isFileRenamedSuccessfully, isFileRenaming]);

  const handleSignOut = () => {
    dispatch({ type: "resetUser" });
    dispatch({ type: "resetDataFiles" });
    dispatch({ type: "setToken" });
    localStorage.removeItem("persist:root");
    router.replace("/signup");
  };

  const checkToken = async () => {
    const decodedTokenDetails: any = jwt_decode(token as string);
    const decodedRefreshTokenDetails: any = jwt_decode(refreshToken as string);
    const tokenExp = decodedTokenDetails?.exp * 1000;
    const refreshTokenExp = decodedRefreshTokenDetails?.exp * 1000;
    const currentTime = new Date().getTime();
    if (currentTime >= refreshTokenExp) {
      handleSignOut();
      return;
    }

    if (currentTime >= tokenExp) {
      refreshTokenThunk();
      return;
    } else {
      const verifedTokenDetails: any = await validateTokenThunk(
        token as string
      );
      if (verifedTokenDetails.errors) {
        handleSignOut();
        return;
      }
    }
  };
  // const onDropHandler = async (dropFiles: File[]): Promise<void> => {
  //   const currentFiles: FileList = [];
  //   const isFileNameInvalid = dropFiles.some((file) =>
  //     /[<>:"/\\|?*.”]/.test(file.name.slice(0, file.name.lastIndexOf(".")))
  //   );
  //   if (isFileNameInvalid) {
  //     setToastStatus(SnackBarType.ERROR);
  //     setToastText(
  //       'File upload failed, the file name cannot contain any of the following characters: < > : " /  | ? * .'
  //     );
  //     setShowToast(true);
  //     return;
  //   }

  //   for (let i = 0; i < dropFiles.length; i++) {
  //     const file = dropFiles[i];

  //     const fileDetails = {
  //       file: file.name,
  //       size: String(file.size),
  //       owner: "You",
  //       modified: Date.now().toString(),
  //       type: "file",
  //       ownerId: user.walletName,
  //     };

  //     currentFiles.push(fileDetails);
  //     onFileUploading();
  //     const uploadFileResponse = await dispatch(
  //       uploadFileThunk({
  //         walletId: user.walletName,
  //         file,
  //         parentFolderId: folderId,
  //       })
  //     );

  //     if (
  //       uploadFileResponse.type &&
  //       uploadFileResponse.type.includes("data/upload/fulfilled")
  //     ) {
  //       setToastStatus(SnackBarType.SUCCESS);
  //       setToastText("File uploaded successfully");
  //     } else {
  //       setToastStatus(SnackBarType.ERROR);
  //       setToastText("File upload failed");
  //     }
  //     setShowToast(true);
  //   }
  // };

  // const onShowFileDetails = (file: DataItemType) => {
  //   setFileDetails(file);
  // };

  // const handleDialogClose = () => {
  //   setFileDetails(null);
  // };

  // const onActiveChangeHandler = (activeDirectory: string) => {
  //   dispatch(setFolderView(false));
  //   dispatch(setActiveDirectory(activeDirectory));
  // };

  const onSearchChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const onFileUploading = (create?: boolean) => {
    uploadStarted();
    setShowToast(true);
    setToastStatus(SnackBarType.SUCCESS);
    setToastText(`File is ${create ? "being created" : "uploading"}...`);
  };

  // const onFileUploadComplete = (create?: boolean) => {
  //   uploadCompleted();
  //   setShowToast(true);
  //   setToastStatus(SnackBarType.SUCCESS);
  //   setToastText(`File ${create ? "Created" : "Uploaded"}`);
  // };

  // const onFileUploadFail = (create?: boolean) => {
  //   uploadCompleted();
  //   setShowToast(true);
  //   setToastStatus(SnackBarType.ERROR);
  //   setToastText(`File ${create ? "Create" : "Uploading"} failed`);
  // };

  // const onFileDeleteComplete = () => {
  //   setShowToast(true);
  //   setToastStatus(SnackBarType.SUCCESS);
  //   setToastText("File Deleted Successfully");
  // };

  // const onFileDeleteFail = () => {
  //   setShowToast(true);
  //   setToastStatus(SnackBarType.ERROR);
  //   setToastText("File Deletion Failed");
  // };

  // const onFolderCreating = () => {
  //   setShowToast(true);
  //   setToastStatus(SnackBarType.SUCCESS);
  //   setToastText("Folder is being created...");
  // };

  // const onFolderCreateComplete = () => {
  //   setShowToast(true);
  //   setToastStatus(SnackBarType.SUCCESS);
  //   setToastText("Folder Created");
  // };

  // const onFolderCreateFail = () => {
  //   setShowToast(true);
  //   setToastStatus(SnackBarType.ERROR);
  //   setToastText("Folder Create failed");
  // };

  if (isMobile) {
    return (
      <>
        <PrivateLayout>
          {/* <Wrapper>
            <Grid container direction={"column"}>
              {loading && <FullscreenLoader />}
              {showToast && toastStatus && (
                <SnackBar
                  type={toastStatus}
                  visible={showToast}
                  setVisible={setShowToast}
                  content={toastText}
                />
              )}
              <MobileHeader>
                <MobileHeaderItem>
                  <SearchBar
                    name="search-input"
                    placeholder="Search"
                    onChange={onSearchChangeHandler}
                  />
                </MobileHeaderItem>
                <MobileHeaderItem>
                  <CreateOrUploadButton
                    parentFolderId={folderId}
                    onFileUploadComplete={onFileUploadComplete}
                    onFileUploadFail={onFileUploadFail}
                    onFileUploading={onFileUploading}
                    onFolderCreating={onFolderCreating}
                    onFolderCreateFail={onFolderCreateFail}
                    onFolderCreateComplete={onFolderCreateComplete}
                    setCreateFileOpen={setCreateFileOpen}
                    setCreateFileAnchor={setCreateFileAnchorEl}
                    closedAllModal={!createFileOpen}
                  />
                  {createFileOpen && (
                    <CreateFileMenu
                      onFileUploadComplete={onFileUploadComplete}
                      onFileUploadFail={onFileUploadFail}
                      onFileUploading={onFileUploading}
                      createFileOpen={createFileOpen}
                      setCreateFileOpen={setCreateFileOpen}
                      anchorEl={createFileAnchorEl}
                      setLoader={setLoading}
                    />
                  )}
                </MobileHeaderItem>
              </MobileHeader>

              <Grid item>
                <DashboardStyled>
                  {!isLoadingFilesAndFolders ? (
                    <Table
                      columns={columns}
                      data={filesAndFoldersData as DataTypeSingle}
                      searchTerm={searchTerm}
                      currentDir={activeDirectory}
                      onDropHandler={onDropHandler}
                      onShowFileDetails={onShowFileDetails}
                      onFileDeleteComplete={onFileDeleteComplete}
                      onFileDeleteFail={onFileDeleteFail}
                      sharedFileData={sharedFileData || []}
                      fileSharedData={fileSharedData || []}
                      refetch={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  ) : (
                    <div className="text-center w-full">Loading...</div>
                  )}
                </DashboardStyled>
              </Grid>
              {fileDetails && (
                <Grid
                  item
                  md={2}
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    background: COLORS.WHITE_100,
                  }}
                >
                  <FileDetailsDialog
                    onClose={handleDialogClose}
                    fileDetails={fileDetails}
                  />
                </Grid>
              )}
              {isDetailsShow && <DetailsPreviewDialog visible={true} />}
            </Grid>
          </Wrapper> */}
        </PrivateLayout>
        {status === "loading" && (
          <div className="app-spinner">
            <LoaderIcon />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <PrivateLayout onSearch={onSearchChangeHandler}>
        {/* <Wrapper>
          <Grid container>
            <Grid
              component={PaddedWrapper}
              item
              container
              md={fileDetails ? 10 : 12}
              sx={{ position: "relative", zIndex: 0 }}
            >
              <Grid item sm={3} md={2}>
                {showToast && toastStatus && (
                  <SnackBar
                    type={toastStatus}
                    visible={showToast}
                    setVisible={setShowToast}
                    content={toastText}
                  />
                )}
                <Grid
                  container
                  justifyContent={"center"}
                  direction={"column"}
                  spacing={4}
                >
                  <Grid item>
                    <CreateOrUploadButton
                      parentFolderId={folderId}
                      onFileUploadComplete={onFileUploadComplete}
                      onFileUploadFail={onFileUploadFail}
                      onFileUploading={onFileUploading}
                      onFolderCreating={onFolderCreating}
                      onFolderCreateFail={onFolderCreateFail}
                      onFolderCreateComplete={onFolderCreateComplete}
                      setCreateFileOpen={setCreateFileOpen}
                      setCreateFileAnchor={setCreateFileAnchorEl}
                      closedAllModal={!createFileOpen}
                    />
                    {createFileOpen && (
                      <CreateFileMenu
                        onFileUploadComplete={onFileUploadComplete}
                        onFileUploadFail={onFileUploadFail}
                        onFileUploading={onFileUploading}
                        createFileOpen={createFileOpen}
                        setCreateFileOpen={setCreateFileOpen}
                        anchorEl={createFileAnchorEl}
                        setLoader={setLoading}
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <Directory
                      active={activeDirectory}
                      onActiveChange={onActiveChangeHandler}
                      router={router}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <ProgressBar
                visible={totalBatch !== "0"}
                currentProgress={currentProgress}
              />
              <Grid item sm={9} md={10}>
                <DashboardStyled>
                  {!isLoadingFilesAndFolders ? (
                    <Table
                      columns={columns}
                      data={files as DataTypeSingle}
                      searchTerm={searchTerm}
                      currentDir={activeDirectory}
                      onDropHandler={onDropHandler}
                      onShowFileDetails={onShowFileDetails}
                      onFileDeleteComplete={onFileDeleteComplete}
                      onFileDeleteFail={onFileDeleteFail}
                      sharedFileData={sharedFileData || []}
                      fileSharedData={fileSharedData || []}
                      refetch={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  ) : (
                    <div className="text-center w-full">Loading...</div>
                  )}
                </DashboardStyled>
              </Grid>
            </Grid>
            {fileDetails && (
              <Grid
                item
                md={2}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  background: COLORS.WHITE_100,
                }}
              >
                <FileDetailsDialog
                  onClose={handleDialogClose}
                  fileDetails={fileDetails}
                />
              </Grid>
            )}
            {isDetailsShow && <DetailsPreviewDialog visible={true} />}
          </Grid>
        </Wrapper> */}
      </PrivateLayout>
      {status === "loading" && (
        <div className="app-spinner">
          <LoaderIcon />
        </div>
      )}
    </>
  );
};

// export async function getServerSideProps(context: any) {
//   const {
//     query: { folderId = null },
//   } = context;

//   return {
//     props: {
//       folderId,
//     }, // will be passed to the page component as props
//   };
// }

export default Dashboard;
