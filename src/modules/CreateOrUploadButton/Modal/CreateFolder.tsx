import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { ContentWrapper, CustomDialogWindow, Footer, HeaderTitle } from './CreateFolder.styles';

type CreateFolderProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: (value: string) => void;
};

const CreateFolder = ({ isOpen, handleClose, handleConfirm }: CreateFolderProps) => {
  const [value, setValue] = useState<string>('');
  const [changed, setChanged] = useState<boolean>(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setChanged(true);
  };

  const hasError = (): boolean => {
    if (!changed) return false;
    return (value.length > 0 ? /[<>:"/\\|?*.”]/.test(value) : value.length === 0) || false;
  };
  const handleCancel = () => {
    setValue('');
    setChanged(false);
    handleClose();
  };

  return (
    <CustomDialogWindow
      open={isOpen}
      maximumWidth={480}
      fullWidth
      crossIconVisibility
      dialogHeader={<HeaderTitle>Create Folder</HeaderTitle>}
      onClose={handleCancel}
    >
      <ContentWrapper>
        <TextField
          label="Folder Name"
          color="primary"
          fullWidth
          value={value}
          placeholder="Untitled Folder"
          onChange={handleChangeInput}
          error={hasError()}
          helperText={
            !changed || !hasError()
              ? ''
              : value.length === 0
              ? 'Name is required'
              : 'The folder name cannot contain any of the following characters: < > : " /  | ? * .'
          }
          FormHelperTextProps={{
            sx: {
              marginLeft: 0,
              marginRight: 0,
            },
          }}
        />
      </ContentWrapper>
      <Footer>
        <Button variant="contained" onClick={() => handleConfirm(value)} disabled={value.length === 0 || hasError()}>
          Continue
        </Button>
      </Footer>
    </CustomDialogWindow>
  );
};

export default CreateFolder;
