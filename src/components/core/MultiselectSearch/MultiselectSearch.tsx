import * as React from 'react';
import { useAutocomplete, AutocompleteInputChangeReason } from '@mui/base/AutocompleteUnstyled';
import { usePrevious } from 'src/hooks/usePrevious';
import * as Styled from './MultiselectSearch.styles';
import { MultiselectSearchProps, MultiselectValue } from './MultiselectSearch.types';
import { SelectedUser } from 'modules/Dialogs/ShareFileDialog/ShareFileDialog.types';

export default function MultiselectSearch(props: MultiselectSearchProps) {
  const { className, onSelect, options = [], selectedOptions, onChange, selectedPrivilege } = props;

  const prevOptions = usePrevious(selectedOptions) as MultiselectValue[];
  const [inputValue, setInputValue] = React.useState<string>('');

  const selectUser = (event: React.SyntheticEvent<Element, Event>, value: MultiselectValue[]): void => {
    if (event.type === 'click') {
      if (value.length >= prevOptions.length) {
        onSelect(event, value);
        setInputValue('');
      }
    } else {
      onSelect(event, value);
    }
  };

  const onInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    setInputValue(value);
    if (onChange) onChange(event, value, reason);
  };

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: options,
    disableCloseOnSelect: true,
    onChange: selectUser,
    isOptionEqualToValue: (option, value) => option.value === value.label,
    value: selectedOptions,
    onInputChange,
    clearOnBlur: false,
    inputValue,
  });

  const selectedLabels = selectedOptions.map((val) => val.label);

  const selectOption = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, value: MultiselectValue): void => {
    const index = selectedLabels.indexOf(value.label);
    if (index === -1) {
      const newOptions = [...selectedOptions] as SelectedUser[];
      const newValue: SelectedUser = {
        ...value,
        privilege: selectedPrivilege,
        value: newOptions.length,
      };
      newOptions.push(newValue);
      selectUser(event, newOptions);
    }
  };

  return (
    <Styled.Root className={className} data-testid="root-wrapper">
      <div {...getRootProps()}>
        <Styled.InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: MultiselectValue, index: number) => (
            <Styled.StyledTag label={option.label} {...getTagProps({ index })} key={index} />
          ))}
          <input {...getInputProps()} value={inputValue} data-testid="multiselect-search-input" />
        </Styled.InputWrapper>
      </div>
      {inputValue.length && groupedOptions.length > 0 ? (
        <Styled.Listbox {...getListboxProps()} data-testid="multisearch-listbox">
          {(groupedOptions as typeof options).map((option, index) => {
            const optionProps = { ...getOptionProps({ option, index }) };
            optionProps['aria-selected'] = selectedLabels.includes(option.label);
            return (
              <li {...optionProps} key={index} onClick={(e) => selectOption(e, option)}>
                <span>{option.labelInSearch ? option.labelInSearch : option.label}</span>
              </li>
            );
          })}
        </Styled.Listbox>
      ) : null}
    </Styled.Root>
  );
}
