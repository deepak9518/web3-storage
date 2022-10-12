import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';

export const MenuWrapper = styled.div`
  position: absolute;
  right: 0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 6px;
  z-index: 100;
`;

export const DropdownButtonWrapper = styled.div`
  position: relative;
`;

export const CustomButton = styled.button`
  border-radius: 50px;
  border: 1px solid ${COLORS.GREY_80};
  display: flex;
  align-items: center;
  padding: 9px 12px;
  cursor: pointer;
`;
