import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { COLORS } from 'src/constants/colors';

interface Props {
  active?: boolean;
}

export const Wrapper = styled(Grid)`
  border: 1px solid ${COLORS.GREY_80};
  border-radius: 6px;
`;

export const PathText = styled(Typography)`
  color: ${COLORS.GREY_50};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

export const FolderContainer = styled(Grid)<Props>`
  background: ${(props) => (props.active ? COLORS.BLUE_40 : COLORS.WHITE_100)};
  border-radius: 6px;

  &:hover {
    background: ${COLORS.BLUE_40};
    cursor: pointer;
    color: ${COLORS.BLUE_80};
  }
`;

export const FolderTitle = styled(Typography)<Props>`
  color: ${(props) => (props.active ? COLORS.BLUE_80 : COLORS.BLACK_70)};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  &:hover {
    color: ${COLORS.BLUE_80};
    cursor: pointer;
  }
`;

export const FileContainer = styled(Grid)<Props>`
  background: inherit;
  border-radius: 6px;
`;

export const FileTitle = styled(Typography)`
  color: ${COLORS.BLACK_70};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

export const IconContainer = styled.span`
  &:hover {
    cursor: pointer;
    color: ${COLORS.BLUE_80};
  }
`;
