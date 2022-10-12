export const utils = () => {};
export const fileReName = (oldName: string, newName: string): string => {
  const fileExtension = `${oldName.split('.').pop()}`;
  return `${newName}.${fileExtension}`;
};
