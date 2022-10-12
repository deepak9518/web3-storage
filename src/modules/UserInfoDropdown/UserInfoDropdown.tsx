import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import { UserDropdownMenu } from './DropdownMenuContent';
import * as Styled from './UserInfoDropdown.styles';
import { GreyIconDownIcon, UserIcon } from 'src/assets/svg';
import { useAppSelector } from 'src/hooks/useReduxTypedHooks';
import { getUserDataSelector } from 'src/store/user';
import { DropdownButton } from 'src/components/core/DropdownButton';

export const UserInfoDropdown = () => {
  const theme = useTheme();
  const { user } = useAppSelector(getUserDataSelector);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <Styled.DropdownButton>
          <Styled.ButtonContentWrapper onClick={handleClickOpen}>
            <UserIcon />
            <Styled.UserName>{user.walletName}</Styled.UserName>
            <GreyIconDownIcon />
          </Styled.ButtonContentWrapper>
        </Styled.DropdownButton>
        <Dialog open={isOpen} onClose={handleClose} transitionDuration={{ appear: 0, enter: 0, exit: 0 }}>
          <UserDropdownMenu />
        </Dialog>
      </>
    );
  }

  return (
    <DropdownButton renderMenu={<UserDropdownMenu />}>
      <Styled.ButtonContentWrapper>
        <UserIcon />
        <Styled.UserName>{user.walletName}</Styled.UserName>
        <GreyIconDownIcon />
      </Styled.ButtonContentWrapper>
    </DropdownButton>
  );
};
