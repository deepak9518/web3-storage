import styled from '@emotion/styled';
import { COLORS } from 'src/constants/colors';

export const PrivateLayoutContainer = styled.div`
  margin: 0 auto;
`;

export const PrivateLayoutHeader = styled.header`
  height: 95px;
  background-color: ${COLORS.WHITE_90};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.GREY_100};
  padding: 0 2rem;
`;

export const SearchInputWrapper = styled.div`
  max-width: 636px;
  width: 100%;
`;

export const DivLogoWrapper = styled.div`
  cursor: pointer;
`;
