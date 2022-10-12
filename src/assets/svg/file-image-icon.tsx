import React from 'react';
type FileImageIconProps = {
  scale?: string;
};

export const FileImageIcon = ({ scale }: FileImageIconProps) => {
  return (
    <svg
      transform={scale && `scale(${scale})`}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M39 43.5H10.5V6.5H28.7929L39 16.7071V43.5Z" fill="#EBF8FF" stroke="#489CFF" />
      <path
        d="M29 7V15C29 15.5304 29 15.08 29 16.5C29 16.5 30.4696 16.5 31 16.5H39"
        fill="#EBF8FF"
        stroke="#489CFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M23.0001 23L31.0001 34H15.0001L23.0001 23Z" fill="#0C60C3" />
      <path d="M29 28L35 34H23L29 28Z" fill="#489CFF" />
      <circle cx="30.5" cy="23.5" r="1.5" fill="#0C60C3" />
    </svg>
  );
};
