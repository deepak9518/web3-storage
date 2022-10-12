import React from 'react';
import { MenuItem, SelectProps as MUISelectProps } from '@mui/material';
import * as Styled from './Select.styles';
import { DropdownIcon } from 'src/assets/svg';

type SelectProps = MUISelectProps & {
  withOutline?: boolean;
  options: { label: string; value: string | number }[];
  selectedValue?: string | number;
};

export const Select = ({ withOutline = true, selectedValue, ...props }: SelectProps) => {
  const { options, onChange } = props;
  return (
    <Styled.CustomSelect
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={selectedValue}
      inputProps={{ 'aria-label': 'Without label' }}
      onChange={onChange}
      withOutline={withOutline}
      IconComponent={DropdownIcon}
      {...props}
    >
      {options.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Styled.CustomSelect>
  );
};
