import { ArrowRightIcon } from 'src/assets/svg';
import { COLORS } from 'src/constants/colors';
import { MouseEventHandler } from 'react';
import * as Styled from './Button.styles';
import React from 'react';
export interface IButtonProps {
  className?: string;
  type?: 'reset' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  buttonStyle?: 'primary' | 'light' | 'dark';
  fullWidth?: boolean;
  withArrow?: boolean;
}

/**
 * Reusable button component
 */
const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({ children, ...props }) => {
  const { buttonStyle, withArrow } = props;
  return (
    <Styled.ButtonStyled data-testid="button" {...props}>
      {children}
      {withArrow && (
        <Styled.ImageWrapper>
          <ArrowRightIcon stroke={buttonStyle === 'light' ? COLORS.BLACK_90 : COLORS.WHITE_100} />
        </Styled.ImageWrapper>
      )}
    </Styled.ButtonStyled>
  );
};

export default Button;
