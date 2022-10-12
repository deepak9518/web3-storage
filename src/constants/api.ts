export const REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const API_BASE_URL = process.env.API_BASE_URL;

export const SIGN_UP_API = '/api/signup';
export const API_DASHBOARD_DATA = '/api/dashboard';
export const VALIDATE_TOKEN = '/users/verify-jwt';
export const API_REFRESH_TOKEN = '/users/refresh-token';

// FILES API
export const API_FILES = '/storage';
export const API_SHARED_FILES = (accountId: string) => `/wallets/${accountId}/storage/sharedFiles`;
export const API_FILES_SHARED = (accountId: string) => `/wallets/${accountId}/files/filesShared`;
export const API_FILE = '/storage';
export const API_FILE_UPLOAD = (walletId: string) => `/wallets/${walletId}/storage`;
export const API_TRANSFER_FILES = (walletId: string, fileId: string) =>
  `/wallets/${walletId}/storage/${fileId}/transfer`;
export const API_TRANSFER_OWNERSHIP = (walletId: string, fileId: string) =>
  `/wallets/${walletId}/files/${fileId}/transfer`;
export const API_REVOKE_ACCESS = (walletId: string, fileId: string) => `/wallets/${walletId}/storage/${fileId}/revoke`;
export const API_REJECT_SHARE = (walletId: string, fileId: string) => `/wallets/${walletId}/files/${fileId}/reject`;
export const API_FILE_COMPLETED_UPLOAD = (walletId: string, fileId: string) =>
  `/wallets/${walletId}/storage/${fileId}/completeUpload`;
export const GRANT_ACCESS_PERMISSION = (data: any) => `/wallets/${data.walletId}/files/${data.fileId}/grantAccess`;
export const UPDATE_FILE = (data: any) => `/wallets/${data.walletId}/files/${data.fileId}`;
export const UPDATE_FOLDER = (data: any) => `/wallets/${data.walletId}/storage/folders/${data.fileId}`;
export const API_LIST_FILE_ACCESS = (walletId: string, fileId: string) =>
  `/wallets/${walletId}/storage/files/${fileId}/shares`;
export const API_COPY_FILE = (data: any) => `/wallets/${data.walletId}/storage/${data.fileId}/copy`;
export const API_WALLET_BALANCE = (walletId: string) => `/wallets/balance/${walletId}`;
export const API_FIAT_NEAR = () => `/fiat/near`;
export const API_LIST_OF_USERS_FILE_ACCESS = (walletId: string, fileId: string) =>
  `/wallets/${walletId}/storage/files/${fileId}/shares`;

// FOLDER API
export const API_FOLDER_UPLOAD = (walletId: string) => `/wallets/${walletId}/storage/folders`;
export const API_REMOVE_FOLDER = (walletId: string, folderId: string) =>
  `/wallets/${walletId}/storage/folders/${folderId}`;
export const API_LIST_FILES_BY_FOLDER_ID = (walletId: string, folderId: string) =>
  `/wallets/${walletId}/storage/${folderId}/files/list`;
export const API_FOLDER_DETAIL = (walletId: string, folderId: string) =>
  `/wallets/${walletId}/storage/folder/${folderId}`;
export const API_MOVE_TO_FOLDER = (walletId: string, fileId: string) => `/wallets/${walletId}/storage/${fileId}`;
export const API_MOVE_FOLDER = (walletId: string, fileId: string) => `/wallets/${walletId}/storage/${fileId}/move`;

// USERS API
export const API_USER = '/users';
