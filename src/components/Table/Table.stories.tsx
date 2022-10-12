import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table, { IColumnType } from './Table';
import { DataItemType } from 'src/pages/dashboard';

const columns: IColumnType[] = [
  {
    name: 'Name',
    key: 'name',
  },
  {
    name: 'Title',
    key: 'title',
  },
  {
    name: 'Role',
    key: 'role',
  },
  {
    name: 'Email',
    key: 'email',
  },
];

const onDropHandler = (files: File[]) => {
  console.log(files);
};

const onShowFileDetails = (file: DataItemType) => {
  console.log(file);
};

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Table',
  component: Table,
} as ComponentMeta<typeof Table>;

export const EmptyTable: ComponentStory<typeof Table> = () => (
  <Table
    columns={columns}
    data={[]}
    searchTerm={''}
    currentDir={''}
    onDropHandler={onDropHandler}
    onShowFileDetails={onShowFileDetails}
    onFileDeleteComplete={() => null}
    onFileDeleteFail={() => null}
    sharedFileData={[]}
    fileSharedData={[]}
    refetch={() => null}
  />
);

const data = [
  {
    id: '1',
    name: 'Shahid',
    title: 'Developer',
    email: 'shahid@primelab.io',
    role: 'Admin',
  },
  {
    id: '2',
    name: 'Doug',
    title: 'Lead',
    email: 'doug@primelab.io',
    role: 'Admin',
  },
  {
    id: '3',
    name: 'Rohit',
    title: 'Developer',
    email: 'rohit@primelab.io',
    role: 'Admin',
  },
];

export const CustomTable: ComponentStory<typeof Table> = () => (
  <Table
    columns={columns}
    data={data}
    searchTerm={''}
    currentDir={''}
    onDropHandler={onDropHandler}
    onShowFileDetails={onShowFileDetails}
    onFileDeleteComplete={() => null}
    onFileDeleteFail={() => null}
    sharedFileData={[]}
    fileSharedData={[]}
    refetch={() => null}
  />
);
