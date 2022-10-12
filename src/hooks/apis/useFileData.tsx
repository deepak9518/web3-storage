import {
  getFileData,
  getShareFileData,
  getFileSharedData,
  grantAccessPermission,
  IUpdateFile,
  renameFile,
  getFilesAndFoldersData,
  ISharFileToMultipleUsers,
} from '../../services/file/file.service';
import { useMutation, useQuery } from 'react-query';

/**
 * Hook for querying file data
 * @returns data for file
 */

export function useFileData(accountId: string, folderId = 'root') {
  return useQuery(['fileData', accountId], () => getFileData(accountId, folderId), { refetchOnWindowFocus: false });
}

export function useFilesAndFoldersData(accountId: string, folderId: string) {
  return useQuery(['filesAndFoldersData', accountId, folderId], () => getFilesAndFoldersData(accountId, folderId), {
    refetchOnWindowFocus: false,
  });
}

export function useShareFileData(accountId: string) {
  return useQuery(['shareFileData', accountId], () => getShareFileData(accountId));
}

export function useFileSharedData(accountId: string, fetchLatestList : boolean) {
  return useQuery(['filesShared', accountId], () => getFileSharedData(accountId),{
    enabled: Boolean(fetchLatestList)
  });
}

export function useGrantAccessPermission() {
  return useMutation((data: ISharFileToMultipleUsers) => grantAccessPermission(data));
}

export function useRenameFile() {
  return useMutation((data: IUpdateFile) => renameFile(data));
}
