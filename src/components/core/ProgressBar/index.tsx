import { Box, CircularProgress, Snackbar } from '@mui/material';

import { DivProgressBarMain, DivImageWrapper } from './ProgressBar.styles';
import { CloseIcon } from 'src/assets/svg';

const ProgressBar = ({ visible = true, title = 'File uploading', currentProgress = '1', totalProgress = '' }) => {
  return (
    <Snackbar
      open={visible}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{ maxWidth: { sm: '100%', md: totalProgress ? '35vw' : '30vw' } }}
    >
      <DivProgressBarMain>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="indeterminate" color="success" thickness={20} />
        </Box>
        <span>{totalProgress ? `${title} ${currentProgress}/${totalProgress}` : `${title} ${currentProgress}%`}</span>
        <DivImageWrapper>
          <CloseIcon />
        </DivImageWrapper>
      </DivProgressBarMain>
    </Snackbar>
  );
};

export default ProgressBar;
