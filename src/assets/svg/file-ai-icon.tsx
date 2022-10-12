import React from 'react';
type FileAIIconProps = {
  scale?: string;
};

export const FileAIIcon = ({ scale }: FileAIIconProps) => {
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
        d="M20.9686 31L22.8406 25.24H24.0446L25.9166 31H25.0486L23.3246 25.744H23.5406L21.8366 31H20.9686ZM21.9406 29.7V28.916H24.9486V29.7H21.9406ZM26.7142 31V25.24H27.5502V31H26.7142Z"
        fill="#489CFF"
      />
    </svg>
  );
};
