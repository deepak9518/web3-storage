import React from 'react';
type FileHtmlIconProps = {
  scale?: string;
};

export const FileHtmlIcon = ({ scale }: FileHtmlIconProps) => {
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
      <path
        d="M20.8333 25.6667L17.5 29L20.8333 32.3334"
        stroke="#489CFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.1666 25.6667L32.5 29L29.1666 32.3334"
        stroke="#489CFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M26.6667 22.3333L23.3334 35.6666" stroke="#489CFF" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
