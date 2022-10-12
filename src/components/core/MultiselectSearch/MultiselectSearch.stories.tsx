import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MultiselectSearch from './MultiselectSearch';
import { MultiselectValue } from './MultiselectSearch.types';

export default {
  /**  👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MultiselectSearch',
  component: MultiselectSearch,
} as ComponentMeta<typeof MultiselectSearch>;

const values: MultiselectValue[] = [
  { label: 'test value 1', value: 1 },
  { label: 'test value 2', value: 2 },
  { label: 'test value 3', value: 3 },
];

const valuesWithCustomSearchLabels: MultiselectValue[] = [
  { label: 'test value 1', value: 1, labelInSearch: "Select me, I'm test value 1" },
  { label: 'test value 2', value: 2, labelInSearch: "Select me, I'm test value 2" },
  { label: 'test value 3', value: 3, labelInSearch: "Select me, I'm test value 3" },
];

const [value, setValue] = useState<MultiselectValue[]>([]);

const onSelectHandler = (event: React.SyntheticEvent<Element, Event>, value: MultiselectValue[]) => {
  setValue(value);
};
const onChange = () => {};
export const NormalMultiselectSearch: ComponentStory<typeof MultiselectSearch> = () => (
  <MultiselectSearch
    onChange={onChange}
    options={values}
    selectedOptions={value}
    onSelect={onSelectHandler}
    selectedPrivilege={1}
  />
);

export const MultiselectSearchWithCustomSearchLabels: ComponentStory<typeof MultiselectSearch> = () => (
  <MultiselectSearch
    options={valuesWithCustomSearchLabels}
    selectedOptions={value}
    onSelect={onSelectHandler}
    onChange={onChange}
    selectedPrivilege={1}
  />
);
