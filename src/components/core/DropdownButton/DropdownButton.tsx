import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DropdownButtonProps } from './DropdownButton.types';
import * as Styled from './DropdownButton.styles';

export const DropdownButton = (props: DropdownButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { children, renderMenu } = props;
  const menuButton = useRef<any>(null);

  const handleButtonClick = useCallback(() => {
    setShowMenu((prevState) => !prevState);
  }, [setShowMenu]);

  useEffect(() => {
    if (!showMenu) return;
    const handleClick = (event: any) => {
      if (menuButton.current && !menuButton.current.contains(event.target)) setShowMenu(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showMenu]);

  return (
    <Styled.DropdownButtonWrapper ref={menuButton}>
      <Styled.CustomButton {...props} onClick={handleButtonClick} data-testid="dropdown-button">
        {children}
      </Styled.CustomButton>
      {showMenu ? <Styled.MenuWrapper data-testid="dropdown-menu">{renderMenu}</Styled.MenuWrapper> : null}
    </Styled.DropdownButtonWrapper>
  );
};
