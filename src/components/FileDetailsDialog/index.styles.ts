import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const CustomDialogWindow = styled.div`
  border: 1px solid ${COLORS.GREY_100};
  border-top: none;
  border-right: none;
  height: 100vh;
`;

export const DialogHeader = styled.div`
  border-bottom: 1px solid ${COLORS.GREY_100};
  padding: 1rem;
`;

export const HeaderTitle = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: ${COLORS.GREY_50};
`;

export const Wrapper = styled.div`
  padding: 0rem;
`;

export const ImageContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${COLORS.GREY_100};
`;

export const ContentWrapper = styled.div`
  padding: 1rem;
`;

export const DataItemLabel = styled(Typography)`
  color: ${COLORS.GREY_50};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

export const DataItemValue = styled(Typography)`
  color: ${COLORS.BLACK_80};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
`;

export const Link = styled(Typography)`
  color: ${COLORS.BLUE_80};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
`;

export const Tag = styled.div`
  padding: 3px 6px;
  background: #e0e0e0;
  display: inline-block;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${COLORS.BLACK_100};
`;
