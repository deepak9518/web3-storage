import { ArrowRightIcon, HomeIcon, UploadCloudIcon } from 'src/assets/svg';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  CustomButton,
  DragAndDropWrapper,
  LinkWrapper,
  WrapperFocused,
  WrapperIconAndButton,
} from './DragAndDropFiles.styles';

type DragAndDropFilesProps = {
  onDropHandler: (files: File[]) => void;
};

const DragAndDropFiles: React.FC<DragAndDropFilesProps> = (props) => {
  const { children, onDropHandler } = props;
  const onDrop = useCallback(onDropHandler, []);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const renderDragActive = () => {
    return (
      <>
        {children}
        <WrapperFocused>
          <WrapperIconAndButton>
            <UploadCloudIcon />
            <CustomButton>
              <span>Drop File to upload to:</span>
              <LinkWrapper>
                <HomeIcon color="#fff" /> <ArrowRightIcon stroke="white" />
                My Drive
              </LinkWrapper>
            </CustomButton>
          </WrapperIconAndButton>
        </WrapperFocused>
      </>
    );
  };

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DragAndDropWrapper {...getRootProps({ isFocused, isDragAccept, isDragReject, onClick: onClick })}>
      <input {...getInputProps()} />
      {isDragActive ? renderDragActive() : children}
    </DragAndDropWrapper>
  );
};

export default DragAndDropFiles;
