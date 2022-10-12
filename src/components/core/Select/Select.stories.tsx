import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './Select';

export default {
  /**  👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const options = [
  { label: 'test value 1', value: 1 },
  { label: 'test value 2', value: 2 },
  { label: 'test value 3', value: 3 },
];

export const NormalSelect: ComponentStory<typeof Select> = () => <Select options={options} selectedValue={1} />;

export const SelectWithoutOutline: ComponentStory<typeof Select> = () => (
  <Select options={options} selectedValue={1} withOutline={false} />
);
