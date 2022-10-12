import { ReactElement } from 'react';
import { AutocompleteInputChangeReason } from '@mui/material';

export interface MultiselectSearchProps {
  options: MultiselectValue[];
  selectedOptions: MultiselectValue[];
  className?: string;
  onChange?:
    | ((event: React.SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => void)
    | undefined;
  onSelect: (event: React.SyntheticEvent<Element, Event>, value: MultiselectValue[]) => void;
  selectedPrivilege: number;
}

export interface MultiselectValue {
  label: string;
  value: string | number;
  labelInSearch?: string | ReactElement;
}
