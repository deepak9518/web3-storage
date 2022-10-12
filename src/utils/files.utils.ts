import { DataItemType } from 'src/pages/dashboard';
import { copyToClipBoard, getFileType } from 'src/utils/helpers';

/**
 * Copies a File or Folder link based on file type
 * @param file DataItemType
 */
export const copyFileLink = (file: DataItemType): void => {
  const baseUrl = window.location.origin;

  if (file.type === 'folder') {
    copyToClipBoard(`${baseUrl}/dashboard/?folderId=${file._id}`);
  } else {
    const fileType = getFileType(file.file);
    if (fileType === 'word' || fileType === 'excel' || fileType === 'pdf') {
      copyToClipBoard(`${baseUrl}/preview?filename=${file.file}`);
    } else {
      copyToClipBoard(file.publicUrl);
    }
  }
};
