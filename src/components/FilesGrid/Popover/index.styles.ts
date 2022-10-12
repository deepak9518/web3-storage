import styled from '@emotion/styled';
import { Grid, Typography, Popover } from '@mui/material';
import { COLORS } from 'src/constants/colors';

export const Wrapper = styled(Grid)`
  border: 1px solid ${COLORS.GREY_80};
  border-radius: 6px;
`;

export const Option = styled(Grid)`
  &:hover {
    cursor: pointer;
  }
`;

export const OptionText = styled(Typography)`
  color: #5e6872;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
`;

export const PositionedPopover = styled(Popover)`
  position: absolute;
  left: -193px;
  top: -43px;

  @media (max-width: 980px) {
    left: -195px;
    top: -50px;
  }

  @media (max-width: 760px) {
    top: 0px;
  }

  @media (max-width: 515px) {
    left: 0;
    top: 0;
  }
`;
