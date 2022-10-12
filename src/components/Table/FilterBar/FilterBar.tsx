import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { FileType, IconContainerLeft, IconContainerRight, Title } from './index.styles';
import { GridIcon, ListIcon } from 'src/assets/svg';
import { TABLE_MODES } from './constants';

const FILE_TYPES = [
  {
    key: 'All',
    value: 'All',
  },
  {
    key: 'folder',
    value: 'Folders',
  },
  {
    key: 'file',
    value: 'Files',
  },
  {
    key: 'photo',
    value: 'Photos',
  },
];

interface IFilterBarProps {
  onFileTypeChange: (type: string) => void;
  onListShapeChange: (shape: string) => void;
  currentDir: string;
  mobile?: boolean;
}

const FilterBar: React.FC<IFilterBarProps> = ({ onFileTypeChange, onListShapeChange, currentDir, mobile }) => {
  const [active, setActive] = useState<string>(FILE_TYPES[0].key);
  const [listShape, setListShape] = useState<string>(TABLE_MODES.LIST);

  useEffect(() => {
    onFileTypeChange(active);
  }, [active]);

  useEffect(() => {
    onListShapeChange(listShape);
  }, [listShape]);

  useEffect(() => {
    setActive(FILE_TYPES[0].key);
  }, [currentDir]);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        {currentDir === 'Home' ? (
          <Title>Recent</Title>
        ) : (
          <Grid container direction="row" gap={3}>
            {FILE_TYPES.map((item) => (
              <FileType key={item.key} active={active === item.key} onClick={() => setActive(item.key)}>
                {item.value}
              </FileType>
            ))}
          </Grid>
        )}
      </Grid>
      {!mobile && (
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconContainerLeft onClick={() => setListShape(TABLE_MODES.GRID)}>
                <GridIcon active={listShape === TABLE_MODES.GRID} />
              </IconContainerLeft>
            </Grid>
            <Grid item>
              <IconContainerRight onClick={() => setListShape(TABLE_MODES.LIST)}>
                <ListIcon active={listShape === TABLE_MODES.LIST} />
              </IconContainerRight>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default FilterBar;
