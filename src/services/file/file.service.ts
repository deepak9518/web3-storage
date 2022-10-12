import axios from 'axios';
import {
  API_COPY_FILE,
  API_FILE_COMPLETED_UPLOAD,
  API_FILE_UPLOAD,
  API_LIST_FILE_ACCESS,
  API_REVOKE_ACCESS,
  API_SHARED_FILES,
  API_FILES_SHARED,
  API_TRANSFER_FILES,
  API_TRANSFER_OWNERSHIP,
  API_FOLDER_UPLOAD,
  GRANT_ACCESS_PERMISSION,
  UPDATE_FILE,
  API_LIST_FILES_BY_FOLDER_ID,
  API_MOVE_TO_FOLDER,
  API_LIST_OF_USERS_FILE_ACCESS,
  API_REJECT_SHARE,
  UPDATE_FOLDER,
  API_FOLDER_DETAIL,
  API_MOVE_FOLDER,
} from 'src/constants/api';
import { deleteRequest, getRequest, postRequest, putRequest } from '../utils';
import { FileProps, FolderProps } from 'src/store/data/types';
import { formatBytes, formatDates } from 'src/utils/helpers';
import store from 'src/store';

export interface IFile {
  name: string;
  path: string;
  fileId: string;
  walletId: string;
  fileName: string;
  filePath: string;
  folderId: string;
  createdAt: string;
  ownerId: string;
  size: number;
  created: string;
  updated: string;
  publicUrl: string;
  description: any;
  hash: string;
  access?: string;
  owner: string;
}

export interface IFolder {
  size: number;
  status: string;
  created: number;
  walletId: string;
  name: string;
  ownerId: string;
  updated: string;
  pk1: string;
  sk: string;
  sk1: string;
  id: string;
  pk: string;
}
export interface ICreateFileProps {
  walletId: string;
  file: File | undefined;
  parentFolderId: string;
}

export interface ICreateFolderProps {
  walletId: string;
  folderName: string;
  parentFolderId?: string;
}

export interface IListFilesByFolderId {
  walletId: string;
  folderId: string;
}

export interface IUploadFolderProps {
  walletId: string;
  file: File | undefined;
}

export interface ITransferFileProps {
  walletId: string;
  fileId: string;
  access?: string;
  receiverId: string;
}
export interface ISharFileToMultipleUsers {
  walletId: string;
  fileId: string;
  receiversIds: string[];
  access: string | undefined | any;
}
export interface IShareFileProps {
  walletId: string;
  fileId: string;
  receiverId: string[];
  receiversIds: string[];
  access: string | undefined | any;
}
export interface IUpdateFile {
  walletId: string;
  fileId: string;
  name: string | number;
  description?: string | number;
}

export interface IMultiFiles {
  ETag: string;
  PartNumber: number;
}

export interface ICompletedUploadFileProps {
  walletId: string;
  fileId: string;
  uploadId: string;
  parts: any;
}

export interface ICopyFileProps {
  walletId: string;
  fileId: string;
}

export interface IMoveToFolderProps extends ICopyFileProps {
  destinationFolderId: string;
  isFile: boolean;
}

export interface MovedFileResponse {
  size: number;
  path: string;
  destinationFolderId: string;
  created: string;
  dataEncryptionKey: {
    encrypted: string;
    md5: string;
  };
  walletId: string;
  name: string;
  ownerId: string;
  hash: string;
  updated: string;
  storageProvider: string;
  fileId: string;
  sharedAt: string;
  userId: string;
  description: string;
}

export interface IListFileAccessProps {
  walletId: string;
  fileId: string;
  fileHash: string | undefined;
}

export interface IFoldersObject {
  created: number;
  id: string;
  ownerId: string;
  pk: string;
  pk1: string;
  size: 0;
  sk: string;
  sk1: string;
  status: string;
  updated: string;
  walletId: string;
  name: string;
}

export const getFileData = async (accountId: string, folderId?: string): Promise<FileProps[]> => {
  const response = await getRequest(`/wallets/${accountId}/storage/${folderId}/files/list`);
  const serverData = response?.data.data;
  const files = transformData(serverData.files);
  const folders = transformData(serverData.folders);
  const data = [...files, ...folders];
  return data;
};

export const getFilesAndFoldersData = async (
  accountId: string,
  folderId: string | null | undefined
): Promise<(FileProps | FolderProps)[]> => {
  const response = await getRequest(`/wallets/${accountId}/storage/${folderId || 'root'}/files/list`);
  const serverData = response?.data.data;
  return [...transformData(serverData.files), ...transformFolderData(serverData.folders)];
};

export const getShareFileData = async (accountId: string): Promise<FileProps[]> => {
  try {
    const response = await getRequest(API_SHARED_FILES(accountId));
    const serverData = response?.data;
    return transformData(serverData);
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }
    throw new Error(error);
  }
};

export const getFileSharedData = async (accountId: string): Promise<FileProps[]> => {
  try {
    const response = await getRequest(API_FILES_SHARED(accountId));
    const serverData = response?.data;
    const uniqueData = Array.from(new Set(serverData.map((a: any) => a.hash))).map((hash) => {
      return serverData.find((a: any) => a.hash === hash);
    });
    return transformData(uniqueData);
  } catch (error: any) {
    if (error.response.status === 404) {
      return [];
    }
    throw new Error(error);
  }
};

export const grantAccessPermission = async (data: ISharFileToMultipleUsers): Promise<FileProps[]> => {
  const response = await postRequest(GRANT_ACCESS_PERMISSION(data), {
    receiversIds: data.receiversIds,
    access: data.access,
  });
  return response?.data;
};

export const renameFile = async (data: IUpdateFile): Promise<FileProps> => {
  const response = await putRequest(UPDATE_FILE(data), { name: data.name });
  const serverData = response?.data;
  return transformObject(serverData);
};

export const renameFolder = async (data: IUpdateFile): Promise<FileProps> => {
  const response = await putRequest(UPDATE_FOLDER(data), { name: data.name });
  const serverData = response?.data;
  return transformObject(serverData.updateFolder, false, 'folder');
};

export const copyFile = async (data: ICopyFileProps): Promise<any> => {
  const response = await postRequest(API_COPY_FILE(data));
  const serverData = response?.data;
  return transformObject(serverData);
};

export const moveToFolder = async (data: IMoveToFolderProps): Promise<MovedFileResponse> => {
  const { walletId, fileId, destinationFolderId, isFile } = data;
  if (isFile) {
    const response = await putRequest(API_MOVE_TO_FOLDER(walletId, fileId), {
      destinationFolderId,
    });
    const serverResponse = response?.data;
    return serverResponse;
  } else {
    const response = await postRequest(
      `${API_MOVE_FOLDER(walletId, fileId)}?parentFolderId=${destinationFolderId}`,
      {}
    );
    const serverResponse = response?.data;
    return serverResponse;
  }
};

const transformData = (serverData: IFile[], isUpload = false, type = 'file'): FileProps[] => {
  return serverData.map((file: any) => {
    if (type === 'folder') {
      return transformFoldersObject(file);
    }
    return transformObject(file, isUpload, type);
  });
};

const transformFolderData = (serverData: IFolder[]): FolderProps[] => {
  return serverData.map((folder) => ({
    walletId: folder.walletId,
    file: folder.name,
    size: formatBytes(Number(folder.size)),
    owner: folder.ownerId === folder.walletId ? 'You' : folder.ownerId,
    ownerId: folder.ownerId,
    modified: formatDates(folder.updated),
    type: 'folder',
    folderId: folder.id,
    _id: folder.id,
  }));
};

export const deleteFiles = async ({ walletId, fileIds }: { walletId: any; fileIds: string[] }) => {
  return await deleteRequest(`/wallets/${walletId}/storage`, {
    fileIds,
  });
};

export const rejectSharedFiles = async ({ walletId, fileId }: { walletId: string; fileId: string }) => {
  return await postRequest(API_REJECT_SHARE(walletId, fileId), {
    receiverId: walletId,
  });
};

export const uploadFile = async ({ walletId, file, parentFolderId: folderId }: ICreateFileProps) => {
  if (!file) {
    throw new Error('File is required!');
  }
  // If ile size is less then 5MB upload in one shot
  if (file.size < 5000000) {
    const response = await postRequest(API_FILE_UPLOAD(walletId), {
      name: file.name,
      path: URL.createObjectURL(file),
      description: JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
      }),
      storageProvider: 'S3',
      folderId,
    });

    const fileUploadHeaders = {
      'Content-Type': file.type,
    };

    if (response) {
      await axios.create().put(response.data.url, file, {
        headers: fileUploadHeaders,
      });
      return transformObject(response.data, true);
    }
  }

  if (file.size > 5000000) {
    // else use multi part approach to upload the large file
    const FILE_CHUNK_SIZE = 10000000; // 10MB
    const fileSize = file.size;
    const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1;
    // let start, end, blob;
    let blob;

    const response = await postRequest(API_FILE_UPLOAD(walletId), {
      name: file.name,
      path: URL.createObjectURL(file),
      description: JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
      }),
      storageProvider: 'S3',
      parts: NUM_CHUNKS,
      folderId,
    });
    if (response) {
      const promises = [];
      for (const key in response.data.multipart.urls) {
        const index = response.data.multipart.urls.indexOf(response.data.multipart.urls[key]);
        const start = index * FILE_CHUNK_SIZE;
        const end = (index + 1) * FILE_CHUNK_SIZE;
        blob = index < NUM_CHUNKS ? file.slice(start, end) : file.slice(start);

        let totalSizes = 0;
        let completed = 0;
        const arrayDownload = <any>[];
        const config = {
          onUploadProgress: (progressEvent: any) => {
            const currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            const isCompleted = currentProgress === 100;
            totalSizes = totalSizes + progressEvent.loaded;
            if (arrayDownload[key]) {
              arrayDownload[key] = currentProgress;
            } else {
              arrayDownload.push({
                [key]: currentProgress,
              });
            }

            let newProg = 0;
            for (const prog of arrayDownload) {
              if (typeof prog === 'number') {
                newProg += Math.round(prog);
              }
            }

            if (isCompleted) {
              completed += 1;
            }

            const newCurrentProgress = Math.floor((newProg / (NUM_CHUNKS * 100)) * 100);

            // store.dispatch(setCurrentProgress(String(newCurrentProgress)));
            // store.dispatch(setTotalBatch(String(promises.length)));
            // store.dispatch(setCompletedBatch(String(completed)));
          },
        };

        promises.push(axios.create().put(response.data.multipart.urls[index], blob, config));
      }

      const resParts = await Promise.all(promises);
      const parts = resParts.map((part, index) => ({
        ETag: (part as any).headers.etag,
        PartNumber: index + 1,
      }));

      await multipleFileCompletedUpload({
        walletId,
        fileId: response.data.fileId,
        uploadId: response.data.multipart.uploadId,
        parts,
      });

      return transformObject(response.data, true);
    }
  }
};

const transformObject = (file: IFile, isUpload = false, type = 'file') => {
  if (isUpload) {
    const fileSize = JSON.parse(file.description).size;
    return {
      fileId: file.fileId,
      walletId: file.walletId,
      file: file.name,
      size: formatBytes(fileSize),
      owner: file.ownerId === file.walletId ? 'You' : file.ownerId,
      modified: formatDates(file.updated),
      type,
      publicUrl: file.publicUrl,
      folderId: file.folderId,
      hash: file.hash,
      ownerId: file.ownerId,
      _id: file.fileId,
      access: file.access,
    };
  }
  return {
    fileId: file.fileId,
    walletId: file.walletId,
    file: file.name,
    size: formatBytes(Number(file.size)),
    owner: file.ownerId === file.walletId ? 'You' : file.ownerId,
    modified: formatDates(file.updated),
    type,
    publicUrl: file.publicUrl,
    folderId: file.folderId,
    hash: file.hash,
    ownerId: file.ownerId,
    _id: file.fileId,
    access: file.access,
  };
};

export const transformFoldersObject = (folder: IFoldersObject) => {
  return {
    folderId: folder.id,
    walletId: folder.walletId,
    type: 'folder',
    _id: folder.id,
    size: formatBytes(folder.size),
    modified: folder.updated,
    file: folder.name,
    owner: folder.ownerId === folder.walletId ? 'You' : folder.ownerId,
  };
};

export const transferFile = async ({ walletId, fileId, receiverId }: ITransferFileProps) => {
  return await postRequest(API_TRANSFER_FILES(walletId, fileId), {
    receiverId: receiverId,
  });
};

export const transferOwnerShip = async ({ walletId, fileId, receiverId }: ITransferFileProps) => {
  return await postRequest(API_TRANSFER_OWNERSHIP(walletId, fileId), {
    receiverId: receiverId,
  });
};

export const revokeAccess = async ({ walletId, fileId, receiverId }: ITransferFileProps) => {
  return await postRequest(API_REVOKE_ACCESS(walletId, fileId), {
    receiverId: receiverId,
  });
};

export const multipleFileCompletedUpload = async ({ walletId, fileId, uploadId, parts }: ICompletedUploadFileProps) => {
  return await postRequest(API_FILE_COMPLETED_UPLOAD(walletId, fileId), {
    uploadId,
    parts,
  });
};

export const listFileAccess = async ({ walletId, fileId, fileHash }: IListFileAccessProps) => {
  const response = await getRequest(API_LIST_FILE_ACCESS(walletId, fileId), {
    params: {
      fileHash,
    },
  });
  return response?.data;
};

export const createFolder = async ({ walletId, folderName, parentFolderId }: ICreateFolderProps) => {
  if (!walletId) {
    throw new Error('Wallet ID is required');
  }

  const requestBody = {
    name: folderName,
  };

  if (parentFolderId) {
    requestBody['parentFolderId' as keyof typeof requestBody] = parentFolderId;
  }

  try {
    const response = await postRequest(API_FOLDER_UPLOAD(walletId), requestBody);
    return response;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

export const deleteFolder = async ({ walletId, folderId }: { walletId: string; folderId: string }) => {
  return await deleteRequest(`/wallets/${walletId}/storage/folders/${folderId}`);
};

export const uploadFolder = async ({ walletId, file }: IUploadFolderProps) => {
  if (!file) {
    throw new Error('File is required!');
  }
  // If ile size is less then 5MB upload in one shot
  if (file.size < 5000000) {
    const response = await postRequest(API_FOLDER_UPLOAD(walletId), {
      name: file.name,
      path: URL.createObjectURL(file),
      description: JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
      }),
      storageProvider: 'S3',
    });

    const fileUploadHeaders = {
      'Content-Type': file.type,
    };

    if (response) {
      await axios.create().put(response.data.url, file, {
        headers: fileUploadHeaders,
      });
      return transformObject(response.data, true);
    }
  }

  if (file.size > 5000000) {
    // else use multi part approach to upload the large file
    const FILE_CHUNK_SIZE = 10000000; // 10MB
    const fileSize = file.size;
    const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1;
    // let start, end, blob;
    let blob;

    const response = await postRequest(API_FILE_UPLOAD(walletId), {
      name: file.name,
      path: URL.createObjectURL(file),
      description: JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
      }),
      storageProvider: 'S3',
      parts: NUM_CHUNKS,
    });
    if (response) {
      const promises = [];
      for (const key in response.data.multipart.urls) {
        const index = response.data.multipart.urls.indexOf(response.data.multipart.urls[key]);
        const start = index * FILE_CHUNK_SIZE;
        const end = (index + 1) * FILE_CHUNK_SIZE;
        blob = index < NUM_CHUNKS ? file.slice(start, end) : file.slice(start);

        let totalSizes = 0;
        let completed = 0;
        const arrayDownload = <any>[];
        const config = {
          onUploadProgress: (progressEvent: any) => {
            const currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            const isCompleted = currentProgress === 100;
            totalSizes = totalSizes + progressEvent.loaded;
            if (arrayDownload[key]) {
              arrayDownload[key] = currentProgress;
            } else {
              arrayDownload.push({
                [key]: currentProgress,
              });
            }

            let newProg = 0;
            for (const prog of arrayDownload) {
              if (typeof prog === 'number') {
                newProg += Math.round(prog);
              }
            }

            if (isCompleted) {
              completed += 1;
            }

            const newCurrentProgress = Math.floor((newProg / (NUM_CHUNKS * 100)) * 100);

            // store.dispatch(setCurrentProgress(String(newCurrentProgress)));
            // store.dispatch(setTotalBatch(String(promises.length)));
            // store.dispatch(setCompletedBatch(String(completed)));
          },
        };

        promises.push(axios.create().put(response.data.multipart.urls[index], blob, config));
      }

      const resParts = await Promise.all(promises);
      const parts = resParts.map((part, index) => ({
        ETag: (part as any).headers.etag,
        PartNumber: index + 1,
      }));

      await multipleFileCompletedUpload({
        walletId,
        fileId: response.data.fileId,
        uploadId: response.data.multipart.uploadId,
        parts,
      });

      return transformObject(response.data, true);
    }
  }
};

export const listFilesByFolderId = async ({ walletId, folderId }: IListFilesByFolderId) => {
  if (!walletId) {
    throw new Error('Wallet ID is required');
  }

  const response = await getRequest(API_LIST_FILES_BY_FOLDER_ID(walletId, folderId));

  return response;
};

export const getFolderDetailByFolderId = async ({ walletId, folderId }: IListFilesByFolderId) => {
  if (!walletId) {
    throw new Error('Wallet ID is required');
  }

  const response = await getRequest(API_FOLDER_DETAIL(walletId, folderId));

  return response;
};

export const listAllFilesAndFolders = async ({ walletId, folderId }: IListFilesByFolderId) => {
  if (!walletId) {
    throw new Error('Wallet ID is required');
  }

  const response = await getRequest(API_LIST_FILES_BY_FOLDER_ID(walletId, folderId));

  return response;
};
export const listOfUsersOfFileAccess = async ({ walletId, fileId }: { walletId: string; fileId: string }) => {
  const response = await getRequest(API_LIST_OF_USERS_FILE_ACCESS(walletId, fileId));
  return response;
};
