import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { COLORS } from 'src/constants/colors';

interface IInlineContainerProps {
  component?: string;
}

export const InlineContainer = styled.div<IInlineContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    cursor: ${(props) => (props.component == 'link' ? 'pointer' : '')};
  }
`;

export const PathText = styled(Typography)`
  color: ${COLORS.GREY_50};
  font-weight: 400;
`;

export const IconContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
