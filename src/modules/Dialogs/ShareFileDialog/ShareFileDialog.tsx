import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { SelectedUser, ShareFileDialogProps } from './ShareFileDialog.types';
import * as Styled from './ShareFileDialog.styles';
import { SelectChangeEvent, useMediaQuery } from '@mui/material';

import { COLORS } from 'src/constants/colors';

import { revokeAccessFileThunk, transferOwnerShipThunk } from 'src/store/data/slice';

import { useSearchWallets } from 'src/hooks/apis/userWalletData';
import { UserLabel } from './UserLabel';
import { useAppDispatch, useAppSelector } from 'src/hooks/useReduxTypedHooks';
import { useGrantAccessPermission } from 'src/hooks/apis/useFileData';
import { LoaderIcon } from 'src/assets/svg/loader-icon';
import { SearchWallets } from 'src/store/data/types';
import { MultiselectValue } from 'src/components/core/MultiselectSearch/MultiselectSearch.types';
import { mockedPrivileges } from 'src/mocks/shareFile/shareFile.mock';
import { listOfUsersOfFileAccess } from 'src/services/file/file.service';
import { Select } from 'src/components/core/Select';

export const ShareFileDialog = ({ fileName, fileDetails }: ShareFileDialogProps) => {
  const dispatch = useAppDispatch();
  const [selectedPrivilege, setSelectedPrivilege] = useState(mockedPrivileges[0].value);
  const {
    user: { user },
  } = useAppSelector((state) => state);
  const [sharedUsers, setSharedUsers] = useState<SelectedUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
  const [walletList, setWalletList] = useState<MultiselectValue[]>([]);
  const [noWalletSeletedError, setNoWalletSeletedError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');

  const { mutate: shareAccessPermission, isLoading: isUpdateLoading } = useGrantAccessPermission();

  const {
    user: {
      user: { walletName },
    },
  } = useAppSelector((state) => state);
  const { mutate: searchWallets, data: walletsList } = useSearchWallets();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const apiResponse = await listOfUsersOfFileAccess({ walletId: fileDetails?.ownerId, fileId: fileDetails?.fileId });
    setLoader(false);
    setSharedUsers(
      apiResponse?.data.map((x: { walletId: string; access: string }) => ({
        label: x.walletId,
        value: x.walletId,
        labelInSearch: <UserLabel userName={x.walletId} />,
        privilege: x.access === 'WRITE' ? 2 : 1,
        walletId: x.walletId,
      }))
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchWallets(searchTerm);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (walletsList) {
      const uniqueWallet = walletsList.filter((wallets: SearchWallets) =>
        sharedUsers.every((userFilter: SelectedUser) => userFilter.label !== wallets._id)
      );
      const tempArr: MultiselectValue[] = uniqueWallet
        ?.map((wallet, index) => {
          return {
            label: wallet._id,
            value: index,
            labelInSearch: <UserLabel userName={wallet._id} />,
          };
        })
        .filter((walletId) => walletId.label !== walletName);
      setWalletList(tempArr);
    }
  }, [walletsList, sharedUsers]);

  useEffect(() => {
    setSelectedUsers((prevState) => prevState.map((item) => ({ ...item, privilege: selectedPrivilege })));
  }, [selectedPrivilege]);

  const handlePrivilegeChange = async (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    if (selectedUsers.length > 0) {
      if (value === 4) {
        await dispatch(
          revokeAccessFileThunk({
            walletId: walletName,
            fileId: fileDetails?.fileId,
            receiverId: selectedUsers?.[0]?.label,
          })
        );
      }
      setSelectedPrivilege(value as number);
    } else {
      setNoWalletSeletedError(true);
    }
  };

  const handleUserPrivilegeChange = (item: SelectedUser) => async (event: SelectChangeEvent<any>) => {
    const { value } = event.target;
    if (value === 3) {
      setSharedUsers(
        sharedUsers.map((el: SelectedUser) => (el.label === item.label ? { ...el, privilege: value } : el))
      );
      await dispatch(
        transferOwnerShipThunk({
          walletId: fileDetails?.walletId,
          fileId: fileDetails?.fileId,
          receiverId: item?.label,
        })
      );
    } else if (value === 4) {
      await dispatch(
        revokeAccessFileThunk({
          walletId: walletName,
          fileId: fileDetails?.fileId,
          receiverId: item.label,
        })
      );
      setSharedUsers(sharedUsers.filter((x) => x.label !== item.label));

      setSharedUsers((prevState) => prevState.filter((user) => user.label !== item.label));
    } else {
      setSharedUsers(
        sharedUsers.map((el: SelectedUser) => (el.label === item.label ? { ...el, privilege: value } : el))
      );
      shareAccessPermission({
        walletId: walletName,
        fileId: fileDetails?.fileId,
        receiversIds: [item.label],
        access: value === 1 ? 'READ' : 'WRITE',
      });
    }
  };

  const handleUsersSelect = (event: React.SyntheticEvent<Element, Event>, value: MultiselectValue[]) => {
    setNoWalletSeletedError(false);
    setSelectedUsers(
      value.map((item) => {
        const user = selectedUsers.find((selectedUser) => selectedUser.value === item.value);
        return user ? user : { ...item, privilege: selectedPrivilege };
      })
    );
  };

  const handleShareButtonClick = async () => {
    if (selectedUsers.length > 0) {
      if (selectedPrivilege === 3) {
        await dispatch(
          transferOwnerShipThunk({
            walletId: fileDetails?.walletId,
            fileId: fileDetails?.fileId,
            receiverId: selectedUsers?.[0]?.label,
          })
        );
      }
    }
    setSharedUsers((prevState) => prevState?.concat(selectedUsers));
    const receiversIds = selectedUsers.map((user) => user.label);
    setSelectedUsers([]);
    shareAccessPermission({
      walletId: walletName,
      fileId: fileDetails?.fileId,
      receiversIds,
      access: selectedPrivilege === 1 ? 'READ' : 'WRITE',
    });
  };

  const handleInputChange = (input: any, value: string) => {
    if (value) {
      setSearchTerm(value);
    }
  };

  return (
    <Styled.CustomDialogWindow
      open
      dialogHeader={<Styled.HeaderTitle>{fileName}</Styled.HeaderTitle>}
      maximumWidth={670}
      fullWidth
      crossIconVisibility
    >
      <Styled.ContentWrapper>
        <Styled.ShareLable>Share this file with</Styled.ShareLable>
        <Styled.SearchBar>
          <Styled.CustomMultiselectSearch
            options={walletList}
            onSelect={handleUsersSelect}
            selectedOptions={selectedUsers}
            onChange={handleInputChange}
            selectedPrivilege={typeof selectedPrivilege === 'string' ? parseInt(selectedPrivilege) : selectedPrivilege}
          />
          <Styled.CustomSelect
            options={
              fileDetails?.ownerId === (user?.walletId ?? user?.walletName)
                ? [...mockedPrivileges.filter((option) => ![3, 4].includes(option.value as number))]
                : [...mockedPrivileges.slice(0, 2)]
            }
            selectedValue={selectedPrivilege}
            onChange={handlePrivilegeChange}
          />
          <Styled.CustomButton buttonStyle="primary" disabled={!selectedUsers.length} onClick={handleShareButtonClick}>
            Share
          </Styled.CustomButton>
        </Styled.SearchBar>
        {isMobile && (
          <Styled.CustomMobileButton
            buttonStyle="primary"
            disabled={!selectedUsers.length}
            onClick={handleShareButtonClick}
          >
            Share
          </Styled.CustomMobileButton>
        )}
        {noWalletSeletedError && <Styled.ErrorDiv>Please select a wallet first </Styled.ErrorDiv>}

        <Styled.UsersTable>
          <tbody>
            {loader || isUpdateLoading ? (
              <LoaderIcon color={COLORS.GREY_70} />
            ) : (
              sharedUsers?.map((item, index) => (
                <Styled.UsersTableRow key={index}>
                  <td>{item.labelInSearch}</td>
                  <td align="right">
                    <Select
                      withOutline={false}
                      options={mockedPrivileges}
                      selectedValue={item.privilege}
                      onChange={handleUserPrivilegeChange(item)}
                    />
                  </td>
                </Styled.UsersTableRow>
              ))
            )}
          </tbody>
        </Styled.UsersTable>
      </Styled.ContentWrapper>
    </Styled.CustomDialogWindow>
  );
};
