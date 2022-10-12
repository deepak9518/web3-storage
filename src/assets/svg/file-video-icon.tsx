import React from 'react';
type FileVideoIconProps = {
  scale?: string;
};

export const FileVideoIcon = ({ scale }: FileVideoIconProps) => {
  return (
    <svg
      transform={scale && `scale(${scale})`}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.5 6.5H28.7929L39 16.7071V43.5H10.5V6.5Z" fill="#EBF8FF" stroke="#489CFF" />
      <path d="M29 7V15C29 15.5304 29 15.08 29 16.5C29 16.5 30.4696 16.5 31 16.5H39" fill="#EBF8FF" />
      <path
        d="M29 7V15C29 15.5304 29 15.08 29 16.5C29 16.5 30.4696 16.5 31 16.5H39L29 7Z"
        stroke="#489CFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M31.25 28.1348L20 34.1969L20 22.0726L31.25 28.1348Z" fill="#489CFF" />
    </svg>
  );
};
