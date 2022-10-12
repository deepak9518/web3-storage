import { PeopleIcon, InfoIcon, RemoveIcon, MoveIcon, DownloadIcon, RenameIcon, CopyIcon, LinkIcon } from 'src/assets/svg';

export enum OPTIONS {
  SHARE = 'share',
  COPY_LINK = 'copy link',
  INFO = 'info',
  COPY = 'copy',
  DOWNLOAD = 'download',
  MOVE_TO = 'move to',
  REMOVE = 'remove',
  RENAME = 'rename',
}

export const OPTIONS_MENU_ITEMS = [
  {
    key: OPTIONS.SHARE,
    label: 'Share',
    icon: PeopleIcon,
  },
  {
    key: OPTIONS.COPY_LINK,
    label: 'Copy Link',
    icon: LinkIcon,
  },
  {
    key: OPTIONS.INFO,
    label: 'Info',
    icon: InfoIcon,
  },
  {
    key: OPTIONS.RENAME,
    label: 'Rename',
    icon: RenameIcon,
  },
  {
    key: OPTIONS.COPY,
    label: 'Copy',
    icon: CopyIcon,
  },
  // {
  //   key: OPTIONS.DOWNLOAD,
  //   label: 'Download',
  //   icon: DownloadIcon,
  // },
  {
    key: OPTIONS.MOVE_TO,
    label: 'Move to',
    icon: MoveIcon,
  },
  {
    key: OPTIONS.DOWNLOAD,
    label: 'Download',
    icon: DownloadIcon,
  },
  {
    key: OPTIONS.REMOVE,
    label: 'Remove',
    icon: RemoveIcon,
  },
];
