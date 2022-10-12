import { ChangeEventHandler } from 'react';

import { COLORS } from 'src/constants/colors';

import Label from '../Label';

import * as Styled from './FieldInput.styles';

export interface IInputProps {
  name: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputClassName?: string;
  inputWrapperClassName?: string;
  placeholder?: string;
  type?: string;
  error?: string | null;
  clearable?: boolean;
  onClearClick?: React.MouseEventHandler<SVGSVGElement>;
  value?: string;
  label?: string;
}

const FieldInput = ({ ...props }: IInputProps) => {
  const { inputClassName, inputWrapperClassName, clearable, value, onClearClick, label, error, name } = props;
  return (
    <Styled.InputFieldWrapper className={inputWrapperClassName}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Styled.FieldWrapper>
        <Styled.FieldInputStyled
          {...props}
          className={`${inputClassName}${error ? ' error-field' : ''}`}
          data-testid={`${name}-field-input`}
        />
        {clearable && Boolean(value?.length) && (
          <Styled.CustomCrossIcon onClick={onClearClick} color={error ? COLORS.ERROR_MESSAGE : undefined} />
        )}
      </Styled.FieldWrapper>
      {Boolean(error) && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
    </Styled.InputFieldWrapper>
  );
};

export default FieldInput;
