import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IButtonProps } from './Button';
import { COLORS } from 'src/constants/colors';

export const ButtonStyled = styled.button<{
  buttonStyle?: IButtonProps['buttonStyle'];
  fullWidth?: boolean;
  withArrow?: boolean;
}>`
  padding: 10px 15px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: inline-flex;
  align-items: center;
  border: none;
  justify-content: center;
  position: relative;
  cursor: pointer;

  ${({ buttonStyle }) => {
    if (buttonStyle === 'dark') {
      return css`
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #232529;
        color: ${COLORS.WHITE_100};
      `;
    }
    if (buttonStyle === 'light') {
      return css`
        background-color: ${COLORS.WHITE_100};
        color: ${COLORS.GREY_70};
        border: 1px solid ${COLORS.GREY_70};
      `;
    }
    if (buttonStyle === 'primary') {
      return css`
        background-color: ${COLORS.BLUE_80};
        color: ${COLORS.WHITE_100};
      `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth
      ? css`
          width: 100%;
        `
      : null}

      ${(withArrow) =>
    withArrow
      ? css`
          padding-right: 45px;
        `
      : null}

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const ImageWrapper = styled.span`
  position: absolute;
  right: 15px;
  top: 12px;
`;
