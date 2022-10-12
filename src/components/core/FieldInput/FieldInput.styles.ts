import styled from '@emotion/styled';
import { Field } from 'formik';

import { CrossIcon } from 'src/assets/svg/cross-icon';
import { COLORS } from 'src/constants/colors';

export const InputFieldWrapper = styled.div`
  margin-bottom: 16px;
`;

export const FieldInputStyled = styled(Field)`
  width: 100%;
  height: 36px;
  padding: 15px 16px;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: ${COLORS.GREY_60};
  border: 1px solid ${COLORS.BLACK_100};
`;

export const FieldWrapper = styled.div`
  position: relative;

  .error-field {
    border: 1px solid ${COLORS.ERROR_MESSAGE};
  }
`;

export const CustomCrossIcon = styled(CrossIcon)`
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translate(-50%, -50%);
  right: 16px;
`;

export const ErrorBlock = styled.div`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: ${COLORS.ERROR_MESSAGE};
  margin-top: 4px;
`;
