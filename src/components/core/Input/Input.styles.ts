import styled from '@emotion/styled';
import { Input } from '@mui/material';
import { COLORS } from 'src/constants/colors';

export const InputStyled = styled(Input)`
  width: 100%;
  border: 2px solid ${COLORS.GREY_100};
  height: 45px;
  padding: 13px 20px;
  outline: none;
  input {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
  }

  input::placeholder {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
  }

  &:active,
  &:focus {
    border: 2px solid ${COLORS.BLUE_80};
  }

  &::before,
  &::after {
    content: none;
    border: 2px solid ${COLORS.BLUE_80};
  }
`;
