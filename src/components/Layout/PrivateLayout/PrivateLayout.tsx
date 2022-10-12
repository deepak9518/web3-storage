import React from 'react';
import { ReactNode } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Web3Logo } from '../../../assets/svg';
import { UserInfoDropdown } from '../../../modules/UserInfoDropdown';
import { SearchBar } from './SearchBar';
import { useAppDispatch } from '../../../hooks/useReduxTypedHooks';

import {
  PrivateLayoutContainer,
  PrivateLayoutHeader,
  SearchInputWrapper,
  DivLogoWrapper,
} from './PrivateLayout.styles';

const PrivateLayout = ({
  children,
  onSearch,
}: {
  children: ReactNode;
  onSearch?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const handleHome = () => dispatch({type:'setActiveDirectory',payload:'Home'});

  return (
    <PrivateLayoutContainer>
      <PrivateLayoutHeader>
        <DivLogoWrapper onClick={handleHome}>
          <Web3Logo />
        </DivLogoWrapper>
        {!isMobile && (
          <SearchInputWrapper>
            <SearchBar name="search-input" placeholder="Search" onChange={onSearch} />
          </SearchInputWrapper>
        )}
        <UserInfoDropdown />
      </PrivateLayoutHeader>
      <>{children}</>
    </PrivateLayoutContainer>
  );
};

export default PrivateLayout;
