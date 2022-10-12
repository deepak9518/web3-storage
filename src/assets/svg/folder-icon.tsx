import React from 'react';
type FolderIconProps = {
  scale?: string;
};

export const FolderIcon = ({ scale }: FolderIconProps) => {
  return (
    <svg
      transform={scale && `scale(${scale})`}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 13V38H40V17.5H24.5L20 13H10Z" fill="#489CFF" />
    </svg>
  );
};
