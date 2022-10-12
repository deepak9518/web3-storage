import { FILE_TYPES } from 'src/components/Table/constants';
import { copyFileThunk } from 'src/store/data/slice';
import store from 'src/store';
import { FileProps, FolderProps } from 'src/store/data/types';

export enum SORT_VALUES {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const formatSize = (sizeBytes: string) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 1;
  let n = parseInt(sizeBytes, 10) || 0;

  while (n >= 1024 && l++) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
};

export const sortListBySize = (data: { [string: string]: any }[], sortBy: string, sortTo: string) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => {
    const fistSize = parseFloat(a[sortBy].split(' ')[0]);
    const secondSize = parseFloat(b[sortBy].split(' ')[0]);
    if (sortTo === SORT_VALUES.ASC) {
      return fistSize - secondSize;
    } else {
      return secondSize - fistSize;
    }
  });
};

export const sortList = (data: { [string: string]: any }[] = [], sortBy: string, sortTo: string) => {
  const sortedData = [...data];
  if (sortTo === SORT_VALUES.ASC) {
    return sortedData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (b[sortBy] < a[sortBy]) {
        return 1;
      }
      return 0;
    });
  } else {
    return sortedData.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0));
  }
};

export const filterByFileType = (data: { [string: string]: any }[], type: string, searchTerm: string) => {
  if (searchTerm) {
    data = data.filter((i) => i.file.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (FILE_TYPES.includes(type)) {
    return data.filter((i) => FILE_TYPES.includes(i.type));
  } else if (type === 'folder') {
    return data.filter((i) => i.type === 'folder');
  } else if (type === 'photo') {
    return data.filter((i) => i.type === 'photo');
  } else {
    return data;
  }
};

export const filterByFileTypeMobile = (data: (FileProps | FolderProps)[], type: string, searchTerm: string) => {
  if (searchTerm) {
    data = data.filter((i) => i.file.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (FILE_TYPES.includes(type)) {
    return data.filter((i) => FILE_TYPES.includes(i.type));
  } else if (type === 'folder') {
    return data.filter((i) => i.type === 'folder');
  } else if (type === 'photo') {
    return data.filter((i) => i.type === 'photo');
  } else {
    return data;
  }
};

export const handleCopyFile = (file: any) => {
  store.dispatch(
    copyFileThunk({
      walletId: file?.walletId,
      fileId: file?.fileId,
    })
  );
};
