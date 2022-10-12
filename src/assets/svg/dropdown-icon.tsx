import React, { SVGProps } from 'react';

export const DropdownIcon = ({ stroke = '#5E6872', ...props }: SVGProps<SVGSVGElement>) => (
  <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6L8 10L4 6" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
