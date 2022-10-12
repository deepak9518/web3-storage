import React, { useState } from 'react';
import { Grid, Popover } from '@mui/material';
import { IconContainer } from 'src/components/FilesGrid/index.styles';
import { DotsIcons } from 'src/assets/svg';
import { Wrapper, Option, OptionText, PositionedPopover } from './index.styles';
import { COLORS } from 'src/constants/colors';
import { OPTIONS } from 'src/components/FilesGrid/contants';
import { SubPopover } from './SubPopover';
import { FolderProps } from 'src/store/data/types';
import { DataItemType } from 'src/pages/dashboard';

interface Option {
  key: string;
  label: string;
  icon: React.ElementType;
}

interface IPopoverProps {
  item: DataItemType | FolderProps | null;
  options: Option[];
  onShare: () => void;
  onRemove?: () => void;
  onDownload?: () => void;
  onInfo?: () => void;
  onCopy?: () => void;
  onCopyFile?: () => void;
  onRename?: () => void;
  breadcrumbs?: string[];
}

const CustomPopover: React.FC<IPopoverProps> = ({
  item,
  options,
  onShare,
  onDownload,
  onRemove,
  onInfo,
  onCopy,
  onCopyFile,
  onRename,
  breadcrumbs,
}) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [anchorSubEl, setAnchorSubEl] = useState<any>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSubPopover = () => {
    setAnchorSubEl(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const openSubPopover = Boolean(anchorSubEl);
  const idSubPopover = openSubPopover ? 'simple-popover-2' : undefined;

  const onOptionClick = (key: string, e: React.MouseEvent) => {
    if (key === OPTIONS.SHARE) {
      onShare();
      handleClose();
    }
    if (key === OPTIONS.COPY_LINK) {
      onCopy && onCopy();
      handleClose();
    }
    if (key === OPTIONS.COPY) {
      onCopyFile && onCopyFile();
      handleClose();
    }
    if (key === OPTIONS.DOWNLOAD) {
      onDownload && onDownload();
      handleClose();
    }
    if (key === OPTIONS.MOVE_TO) {
      setAnchorSubEl(e.currentTarget);
    }
    if (key === OPTIONS.REMOVE) {
      onRemove && onRemove();
      handleClose();
    }
    if (key === OPTIONS.RENAME) {
      onRename && onRename();
      handleClose();
    }
    if (key === OPTIONS.INFO) {
      onInfo && onInfo();
    }
  };

  return (
    <>
      <IconContainer onClick={handleClick}>
        <DotsIcons />
      </IconContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Wrapper pt={3} pl={3} pr={6}>
          {options.map((o, i) => {
            const Icon = o.icon;

            return (
              <Option key={`${o.key}_${i}`} container spacing={3} mb={3} onClick={(e) => onOptionClick(o.key, e)}>
                <Grid item>
                  <Icon stroke={COLORS.GREY_50} />
                </Grid>
                <Grid item>
                  <OptionText>{o.label}</OptionText>
                </Grid>
              </Option>
            );
          })}
        </Wrapper>
        {anchorSubEl && (
          <PositionedPopover
            id={idSubPopover}
            open={openSubPopover}
            anchorEl={anchorSubEl}
            onClose={handleCloseSubPopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <SubPopover item={item} onClose={handleCloseSubPopover} breadcrumbs={breadcrumbs || []} />
          </PositionedPopover>
        )}
      </Popover>
    </>
  );
};

export default CustomPopover;
