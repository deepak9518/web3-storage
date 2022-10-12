import React from 'react';
import * as Styled from './ConfirmationDialog.styles';
import { UserLabel } from './UserLabel/index';

export const ConfirmationDialog = () => {
  return (
    <Styled.CustomDialogWindow open maximumWidth={471} fullWidth>
      <Styled.ModalContentWrapper>
        <Styled.paddingText>
          <Styled.heading>Confirm the addition of this folder</Styled.heading>
        </Styled.paddingText>
        <Styled.paddingText>
          <Styled.heading>On Chain</Styled.heading>
        </Styled.paddingText>
        <Styled.alignUserLabel>
          <UserLabel userName="Johndoe.near" />
        </Styled.alignUserLabel>

        <Styled.Border>
          <Styled.Row>
            <Styled.TransectionFeeText>Transection Fee</Styled.TransectionFeeText>
            <Styled.TransectionPriceText>$0.00</Styled.TransectionPriceText>
          </Styled.Row>
          <Styled.Row>
            <Styled.GasFeeText>Prime drive covers all gas fees.</Styled.GasFeeText>
            <Styled.NEARText>0.00 NEAR</Styled.NEARText>
          </Styled.Row>
        </Styled.Border>
        <Styled.AlignRow>
          <Styled.CustomButtonCancel>Cancel</Styled.CustomButtonCancel>
          <Styled.CustomButton buttonStyle="primary">Confirm</Styled.CustomButton>
        </Styled.AlignRow>
      </Styled.ModalContentWrapper>
    </Styled.CustomDialogWindow>
  );
};
