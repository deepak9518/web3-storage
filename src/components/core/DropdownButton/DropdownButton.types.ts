import { ReactNode } from 'react';
import { ButtonProps } from '@mui/material';

export interface DropdownButtonProps extends ButtonProps {
  renderMenu: ReactNode;
}
