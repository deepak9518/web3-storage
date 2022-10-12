import { CrossIcon } from 'src/assets/svg/cross-icon';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Styled from './DialogWindow.styles';
import { CustomDialogProps } from './DialogWindow.types';

export const DialogWindow = (props: CustomDialogProps) => {
  const { children, dialogHeader, onClose, maximumWidth, fullWidth, className, crossIconVisibility, side } = props;
  const dispatch = useDispatch();

  const closeDialogHandler = () => {
    onClose && onClose();
    dispatch({type:'closeDialog'});
  };

  return (
    <Styled.DialogBackground className={className}>
      <Styled.DialogWrapper maximumWidth={maximumWidth} fullWidth={fullWidth} id="dialog-wrapper" side={side}>
        <Styled.DialogHeader id="dialog-header">
          <div>{dialogHeader}</div>
          {crossIconVisibility == true ? <CrossIcon onClick={closeDialogHandler} /> : null}
        </Styled.DialogHeader>
        <Styled.DialogBody>{children}</Styled.DialogBody>
      </Styled.DialogWrapper>
    </Styled.DialogBackground>
  );
};
