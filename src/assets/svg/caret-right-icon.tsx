import { COLORS } from '../../constants/colors';
import React from 'react';
type CaretRightIconProps = {
  color?: string;
};

export const CaretRightIcon = ({ color }: CaretRightIconProps) => {
  const stroke = color ? color : COLORS.GREY_50;

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
