import styled from '@emotion/styled';
import { SearchIcon } from 'src/assets/svg';
import Input from 'src/components/core/Input';
import { COLORS } from 'src/constants/colors';

export const SearchInputWrapper = styled.div`
  position: relative;
`;

export const CustomSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 12px;
  left: 14px;
  z-index: 10;
`;

export const CustomInput = styled(Input)`
  background-color: ${COLORS.GREY_40};
  border: none;
  padding-left: 43px;

  &:active,
  &:focus {
    border: none;
  }

  @media (max-width: 900px) {
    background-color: ${COLORS.WHITE_100};
    border: 1px solid ${COLORS.GREY_80};
    height: 40px;
  }
`;
