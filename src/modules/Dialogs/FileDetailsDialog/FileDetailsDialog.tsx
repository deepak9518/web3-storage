import React from 'react';
import { Grid } from '@mui/material';
import { FileDetailsDialogProps, DETAIL_TYPES } from './index.types';
import * as Styled from './index.styles';
import { getIcon } from 'src/utils/helpers';

export const FileDetailsDialog = ({ fileDetails }: FileDetailsDialogProps) => {
  const Icon = getIcon(fileDetails.file);

  const DataItem = ({ label, value, type }: { label: string; value: string | string[]; type?: string }) => (
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

  const DataValue = ({ value, type }: { value: string | string[]; type?: string }) => {
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

  return (
    <Styled.CustomDialogWindow
      open
      dialogHeader={<Styled.HeaderTitle>File Details</Styled.HeaderTitle>}
      maximumWidth={400}
      fullWidth
      side
      crossIconVisibility
    >
      <Styled.ContentWrapper>
        <Grid container spacing={4}>
          <Styled.Image item md={12}>
            <Grid container justifyContent={'center'} alignItems={'center'} p={6}>
              <Icon scale={2.5} />
            </Grid>
          </Styled.Image>
          <Grid item md={12}>
            <Grid container spacing={3}>
              <DataItem label={'Folder Name'} value={fileDetails.file} />
              <DataItem label={'Folder Size'} value={fileDetails.size} />
              <DataItem label={'Modified On'} value={fileDetails.modified} />
              <DataItem label={'Created On'} value={fileDetails.modified} />
              <DataItem label={'Owner'} value={fileDetails.owner} type={DETAIL_TYPES.LINK} />
              <DataItem label={'Who can access'} value={['Only you']} type={DETAIL_TYPES.TAGS} />
            </Grid>
          </Grid>
        </Grid>
      </Styled.ContentWrapper>
    </Styled.CustomDialogWindow>
  );
};
