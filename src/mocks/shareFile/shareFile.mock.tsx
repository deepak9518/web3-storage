// import { MultiselectValue } from 'src/components/core/MultiselectSearch/MultiselectSearch.types';
// import { UserLabel } from 'modules/Dialogs/ShareFileDialog/UserLabel/';

import { MultiselectValue } from "src/components/core/MultiselectSearch/MultiselectSearch.types";
import { UserLabel } from "src/modules/Dialogs/ShareFileDialog/UserLabel";
import React from 'react';
export const mockedUser: MultiselectValue[] = [
  { label: 'marcus.near', value: 1, labelInSearch: <UserLabel userName={'marcus.near'} /> },
  { label: 'kevin.near', value: 2, labelInSearch: <UserLabel userName={'kevin.near'} /> },
  { label: 'Kally.near', value: 3, labelInSearch: <UserLabel userName={'Kally.near'} /> },
];

export const mockedPrivileges: MultiselectValue[] = [
  { label: 'can view', value: 1 },
  { label: 'can edit', value: 2 },
  { label: 'Transfer Ownership', value: 3 },
  { label: 'Remove Access', value: 4 },
];
