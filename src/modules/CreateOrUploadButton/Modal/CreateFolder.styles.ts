import { DialogWindow } from 'src/components/core/DialogWindow';
import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const BoxModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 467px;
  max-width: 467px;
  margin: 2px;
  width: calc(100% - 2px);
  background-color: #ffffff;
  padding: 3rem;
  border: 1px solid #dfdfe0;
  box-sizing: border-box;
  border-radius: 6px;

  @media (max-width: 900px) {
    max-width: 391px;
  }

  @media (max-width: 375px) {
    max-width: 330px;
  }
`;

export const CustomDialogWindow = styled(DialogWindow)`
  left: 0;
  #dialog-wrapper {
    margin-top: auto;
    margin-bottom: auto;
    padding: 0;
    @media (max-width: 766px) {
      max-width: 400px;
    }
    @media (max-width: 600px) {
      max-width: 330px;
    }
  }

  #dialog-header {
    border-bottom: 1px solid ${COLORS.GREY_100};
    padding: 1rem;
  }
`;

export const HeaderTitle = styled.span`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: ${COLORS.BLACK_100};
`;

export const ContentWrapper = styled.div`
  padding: 1rem;
`;

export const ErrorDiv = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  color: ${COLORS.RED_100};
`;

export const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 1rem;
`;
export const folderLabel = styled.p``;
