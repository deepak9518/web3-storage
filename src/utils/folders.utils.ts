import { FileProps, FolderProps } from 'src/store/data/types';

/**
 * Filters files and only returns those that are folders
 * @param data (FileProps | FolderProps)[]
 * @returns FolderProps[]
 */
export const filterFolders = (data: (FileProps | FolderProps)[]): FolderProps[] =>
  data.filter((value) => value.type === 'folder').map((value) => value as FolderProps);
