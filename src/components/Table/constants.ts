import {
  FilePDFIcon,
  FolderIcon,
  FileTextIcon,
  ExcelIcon,
  FileDocsIcon,
  FileImageIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileZipIcon,
  FileHtmlIcon,
  FilePSDIcon,
  FileAIIcon,
} from 'src/assets/svg';

type FileIconsType = { [string: string]: React.ElementType };
type FileTypesType = string[];
type FolderType = string;

export const FILE_ICONS: FileIconsType = {
  ai: FileAIIcon,
  file: FileTextIcon,
  pdf: FilePDFIcon,
  html: FileHtmlIcon,
  folder: FolderIcon,
  excel: ExcelIcon,
  word: FileDocsIcon,
  //TODO: add missing icons
  image: FileImageIcon,
  audio: FileAudioIcon,
  video: FileVideoIcon,
  zip: FileZipIcon,
  psd: FilePSDIcon,
};

export const FILE_TYPES: FileTypesType = ['file', 'pdf', 'excel', 'word'];
export const FOLDER_TYPE: FolderType = 'folder';

export enum ITEM_ACTION {
  NAVIGATE = 'NAVIGATE',
  DETAILS = 'DETAILS',
  DELETE = 'DELETE',
  DOWNLOAD = 'DOWNLOAD',
}

export interface ITEM_ACTIOM_INTERFACE {
  key: ITEM_ACTION.NAVIGATE | ITEM_ACTION.DETAILS | ITEM_ACTION.DELETE;
}
