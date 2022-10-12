import React from 'react';
import { IInputProps } from 'src/components/core/Input/Input.types';
import * as Styled from './SearchBar.styles';

export const SearchBar = ({ onChange, ...props }: IInputProps) => {
  return (
    <Styled.SearchInputWrapper>
      <Styled.CustomSearchIcon />
      <Styled.CustomInput {...props} onChange={onChange} />
    </Styled.SearchInputWrapper>
  );
};
