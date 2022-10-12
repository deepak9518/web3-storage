import React, { useState, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from 'src/hooks/useReduxTypedHooks';
import { CrossIcon } from 'src/assets/svg/cross-icon';
import { FolderIcon } from 'src/assets/svg';
import { formatDates } from 'src/utils/helpers';
import * as Styled from './index.styles';
import { getIcon } from 'src/utils/helpers';
import { getFolderDetail } from 'src/store/data/slice';
import { FileDetailsDialogProps, DETAIL_TYPES, UserAccessListProps } from './index.types';
import { UserLabel } from 'modules/Dialogs/ShareFileDialog/UserLabel';
import { useGetUsersFileAccessList } from 'src/hooks/useGetUsersFileAccessList';
import { LoaderIcon } from 'src/assets/svg/loader-icon';
import { COLORS } from 'src/constants/colors';

export const FileDetailsDialog = ({ fileDetails, onClose }: FileDetailsDialogProps) => {
  const dispatch = useAppDispatch();
  const Icon = fileDetails.type === 'file' ? getIcon(fileDetails.file) : FolderIcon;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    user: { user },
  } = useAppSelector((state) => state);
  const [sharedUsers, setSharedUsers] = useState<UserAccessListProps[]>([]);
  const { data: accessList, isLoading: isAccessListLoading } = useGetUsersFileAccessList({
    walletId: fileDetails?.ownerId,
    fileId: fileDetails?.fileId,
    enabled: user?.walletName === fileDetails?.ownerId ? true : false,
  });

  useEffect(() => {
    if (!sharedUsers) {
      setSharedUsers([]);
    }
  }, [sharedUsers]);

  useEffect(() => {
    setSharedUsers(
      accessList?.data?.map((x: { walletId: string; access: string }) => ({
        label: x.walletId,
        value: x.walletId,
        labelInSearch: <UserLabel userName={x.walletId} />,
        privilege: x.access === 'WRITE' ? 2 : 1,
        walletId: x.walletId,
      }))
    );
  }, [accessList]);

  const {
    data: { folderDetail },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (fileDetails.type === 'folder') {
      dispatch(getFolderDetail({ walletId: fileDetails.walletId, folderId: fileDetails.folderId }));
    }
  }, []);

  const DataItem = ({ label, value, type }: { label: string; value: string | number | string[]; type?: string }) => (
    <Grid item md={12}>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <Styled.DataItemLabel>{label}</Styled.DataItemLabel>
        </Grid>
        <Grid item>
          <DataValue value={value} type={type} />
        </Grid>
      </Grid>
    </Grid>
  );

  const DataValue = ({ value, type }: { value: string | number | string[]; type?: string }) => {
    if (type === DETAIL_TYPES.LINK) {
      return <Styled.Link>{value}</Styled.Link>;
    }
    if (type === DETAIL_TYPES.TAGS) {
      return (
        <Grid container spacing={2}>
          {typeof value === 'object' &&
            value.map((t) => (
              <Grid key={t} item>
                <Styled.Tag>{t}</Styled.Tag>
              </Grid>
            ))}
        </Grid>
      );
    }

    return <Styled.DataItemValue>{value}</Styled.DataItemValue>;
  };

  const DataListItems = ({ label, value }: { label: string; value: UserAccessListProps[] }) => (
    <Grid item md={12}>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <Styled.DataItemLabel>{label}</Styled.DataItemLabel>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            {value?.map((t, index) => (
              <Grid key={index} item>
                <Styled.Tag>{t.walletId}</Styled.Tag>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Styled.CustomDialogWindow>
      <Grid component={Styled.DialogHeader} container justifyContent="space-between" alignItems="center">
        <Styled.HeaderTitle>{`${fileDetails.type === 'file' ? 'File' : 'Folder'}`} Details</Styled.HeaderTitle>
        <CrossIcon onClick={onClose} />
      </Grid>
      <Styled.Wrapper>
        <Grid container>
          {!isMobile && (
            <Styled.ImageContainer>
              <Grid container justifyContent={'center'} alignItems={'center'} p={6}>
                <Icon scale={2.5} />
              </Grid>
            </Styled.ImageContainer>
          )}
          <Styled.ContentWrapper>
            <Grid container spacing={3}>
              <DataItem label={`${fileDetails.type === 'file' ? 'File' : 'Folder'} Name`} value={fileDetails.file} />
              <DataItem
                label={`${fileDetails.type === 'file' ? 'File Size' : 'Files'}`}
                value={fileDetails.type === 'file' ? fileDetails.size : folderDetail.numberOfFilesInsd}
              />
              {fileDetails.type === 'folder' && <DataItem label={'Folders'} value={folderDetail.numberOfFolders} />}
              <DataItem
                label={'Modified On'}
                value={fileDetails.type === 'file' ? fileDetails.modified : formatDates(folderDetail.updated)}
              />
              <DataItem
                label={'Created On'}
                value={fileDetails.type === 'file' ? fileDetails.modified : formatDates(folderDetail.created)}
              />
              <DataItem label={'Owner'} value={fileDetails.owner} type={DETAIL_TYPES.LINK} />
              {isAccessListLoading ? (
                <LoaderIcon color={COLORS.GREY_70} />
              ) : (
                <DataListItems
                  label={'Who can access'}
                  value={sharedUsers.length ? sharedUsers : [{ walletId: 'Only you' }]}
                />
              )}
            </Grid>
          </Styled.ContentWrapper>
        </Grid>
      </Styled.Wrapper>
    </Styled.CustomDialogWindow>
  );
};
