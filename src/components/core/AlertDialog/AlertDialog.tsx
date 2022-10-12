import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = {
  title: string;
  description: string;
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const AlertDialog = ({ title, description, isOpen, handleClose, handleConfirm }: AlertDialogProps) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(AlertDialog);
