import { Dialog } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/hooks/useReduxTypedHooks';
import { toogleSetDetails } from 'src/store/common';
import { getFileType } from 'src/utils/helpers';
import { LoaderIcon } from 'src/assets/svg/loader-icon';

type Props = {
  visible: boolean;
};

const DetailsPreviewDialog = ({ visible }: Props) => {
  const dispatch = useAppDispatch();
  const { dataPreview } = useAppSelector((state) => state.common); // NEEDS TO MAKE THIS WORKS

  const fileUrl = dataPreview?.publicUrl;

  const handleClose = () => {
    dispatch(toogleSetDetails());
  };

  const fileType = getFileType(dataPreview?.file);

  const loader = (
    <div className="app-spinner">
      <LoaderIcon />
    </div>
  );

  return (
    <Dialog onClose={handleClose} open={visible}>
      {!fileUrl && loader}
      {fileType === 'image' && (
        <img src={fileUrl} alt={fileUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      )}
      {fileType === 'video' && <video controls src={fileUrl} />}
      {fileType === 'audio' && <audio controls src={fileUrl} />}
    </Dialog>
  );
};

export default DetailsPreviewDialog;
