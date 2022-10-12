import { InputStyled } from './Input.styles';
import { IInputProps } from './Input.types';
import React from 'react';
const Input = (props: IInputProps) => {
  return <InputStyled {...props} data-testid="field-input" />;
};

export default Input;
