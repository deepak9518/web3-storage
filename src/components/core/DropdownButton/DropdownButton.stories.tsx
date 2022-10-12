import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DropdownButton } from './DropdownButton';

export default {
  /**  👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DropdownButton',
  component: DropdownButton,
} as ComponentMeta<typeof DropdownButton>;

export const NormalDropdownButton: ComponentStory<typeof DropdownButton> = () => (
  <DropdownButton
    renderMenu={
      <div>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </div>
    }
  >
    Dropdown Button
  </DropdownButton>
);
