import styled from '@emotion/styled';
import { COLORS } from 'src/constants/colors';
export const UserLabelWrapper = styled.div`
  display: flex;

  align-items: center;
  border: 1px solid ${COLORS.GREY_80};
  border-radius: 50px;
  padding-right: 5px;
  img {
    margin-right: 9px;
  }
`;
