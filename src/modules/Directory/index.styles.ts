import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { COLORS } from 'src/constants/colors';

interface IListElement {
  active: boolean;
}

export const ListItem = styled.div<IListElement>`
  background: ${(props) => (props.active ? COLORS.BLUE_40 : COLORS.WHITE_100)};
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`;

export const ItemText = styled(Typography)<IListElement>`
  color: ${(props) => (props.active ? COLORS.BLUE_80 : COLORS.GREY_50)};
  margin-left: 10px;
  margin-top: 2px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`;
