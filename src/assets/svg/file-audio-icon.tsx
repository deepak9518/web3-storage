import React from 'react';
type FileAudioIconProps = {
  scale?: string;
};

export const FileAudioIcon = ({ scale }: FileAudioIconProps) => {
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
        d="M25 20.5V29.2917C24.5083 29.0083 23.9417 28.8333 23.3333 28.8333C21.4917 28.8333 20 30.325 20 32.1667C20 34.0083 21.4917 35.5 23.3333 35.5C25.175 35.5 26.6667 34.0083 26.6667 32.1667V23.8333H30V20.5H25Z"
        fill="#489CFF"
      />
    </svg>
  );
};
