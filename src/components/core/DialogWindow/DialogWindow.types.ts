import { DialogProps } from '@mui/material';
import { ReactElement } from 'react';

export interface CustomDialogProps extends DialogProps {
  dialogHeader?: ReactElement | string;
  onClose?: () => void;
  maximumWidth?: number;
  crossIconVisibility?: boolean;
  side?: boolean;
}
