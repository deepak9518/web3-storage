import { COLORS } from '../../constants/colors';
import React from 'react';

type ListIconProps = {
  active: boolean;
};

export const ListIcon = ({ active }: ListIconProps) => {
  const color = active ? COLORS.BLUE_THEME : COLORS.GREY_70;

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 4H6C4.89543 4 4 4.89543 4 6V8C4 9.10457 4.89543 10 6 10H18C19.1046 10 20 9.10457 20 8V6C20 4.89543 19.1046 4 18 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 14H6C4.89543 14 4 14.8954 4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16C20 14.8954 19.1046 14 18 14Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
