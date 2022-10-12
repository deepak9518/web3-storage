import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DialogWindow } from './DialogWindow';

export default {
  /**  👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Dialog Window',
  component: DialogWindow,
} as ComponentMeta<typeof DialogWindow>;

export const Dark: ComponentStory<typeof DialogWindow> = () => (
  <DialogWindow open dialogHeader={'Dialog Header'}>
    <div>This is dialog body</div>
  </DialogWindow>
);
