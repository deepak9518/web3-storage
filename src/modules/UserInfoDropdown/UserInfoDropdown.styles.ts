import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';

export const ButtonContentWrapper = styled.div`
  display: flex;
`;

export const UserName = styled.span`
  vertical-align: middle;
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
  margin: 0 10px;
  color: ${COLORS.BLACK_70};
`;

export const DropdownButton = styled.button`
  border-radius: 50px;
  border: 1px solid ${COLORS.GREY_80};
  display: flex;
  align-items: center;
  padding: 9px 12px;
  cursor: pointer;
`;
