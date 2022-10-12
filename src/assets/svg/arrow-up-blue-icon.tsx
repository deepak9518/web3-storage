import React from 'react';
type ArrowUpBlueIconProps = {
  onClick: () => void;
};

export const ArrowUpBlueIcon = ({ onClick }: ArrowUpBlueIconProps) => {
  return (
    <svg onClick={onClick} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_100_7728)">
        <path
          d="M16.9998 9.89951V24.0416"
          stroke="#2D80E1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6357 16.2635L16.9997 9.89953L23.3637 16.2635"
          stroke="#2D80E1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_100_7728">
          <rect width="24" height="24" fill="white" transform="translate(0.0292969 16.9706) rotate(-45)" />
        </clipPath>
      </defs>
    </svg>
  );
};
