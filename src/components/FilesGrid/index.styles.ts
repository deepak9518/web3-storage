import styled from '@emotion/styled';
import { COLORS } from 'src/constants/colors';
import { Typography } from '@mui/material';

export const ItemContainer = styled.div`
  border: 1px solid ${COLORS.GREY_100};
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
`;

export const Divider = styled.hr`
  border: 1px solid ${COLORS.GREY_100};
`;

export const Filename = styled(Typography)`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  color: ${COLORS.BLACK_100};
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 140px;
  height: 22px;
  white-space: nowrap;
`;

export const IconContainer = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
