import { COLORS } from '../../constants/colors';
import React from 'react';

export const CloseIcon = (props: { stroke?: string }) => {
  const { stroke = COLORS.GREY_50 } = props;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L5 15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5L15 15" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
