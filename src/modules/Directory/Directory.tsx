import React from 'react';
import { ListItem, ItemText } from './index.styles';
import { DIRECTORY_LABELS } from './constants';
import { Grid } from '@mui/material';
import { COLORS } from 'src/constants/colors';
// import { NextRouter } from 'next/router';

interface IDirectoryProps {
  active: string;
  onActiveChange: (active: string) => void;
  // router: NextRouter;
}

export const Directory: React.FC<IDirectoryProps> = ({ active, onActiveChange,
  //  router
   }) => {
  return (
    <>
      {DIRECTORY_LABELS.map(({ label, icon }) => {
        const Icon = icon;
        const selected = label === active;

        return (
          <ListItem
            key={label}
            active={selected}
            onClick={() => {
              onActiveChange(label);
              // router.push('/dashboard');
            }}
          >
            <Grid container wrap="nowrap" p={3}>
              <Grid item>
                <Icon color={selected ? COLORS.BLUE_80 : COLORS.GREY_50} />
              </Grid>
              <Grid item>
                <ItemText active={selected}>{label}</ItemText>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </>
  );
};
