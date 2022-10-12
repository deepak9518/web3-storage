import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { COLORS } from 'src/constants/colors';

export const Title = styled.span`
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  color: ${COLORS.BLACK_100};
`;

export const FileType = styled(Typography)<{ active?: boolean }>`
  color: ${(props) => (props.active ? COLORS.BLUE_THEME : COLORS.GREY_50)};
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) => (props.active ? COLORS.BLUE_40 : '')};
  padding: 6px 15px;
  border-radius: 4px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

export const IconContainerLeft = styled.div`
  border: 1px solid ${COLORS.GREY_80};
  box-sizing: border-box;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: none;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const IconContainerRight = styled.div`
  border: 1px solid ${COLORS.GREY_80};
  box-sizing: border-box;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;
