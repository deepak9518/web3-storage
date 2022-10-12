import React from 'react';
export const ArrowRightIcon = ({ stroke = 'white' }) => (
  <svg
    data-testid="arrow-icon"
    width="15"
    height="21"
    viewBox="0 0 15 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 5.5L10 10.5L5 15.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
