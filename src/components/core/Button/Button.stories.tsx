import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
  /**  👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Dark: ComponentStory<typeof Button> = () => <Button buttonStyle="dark">Dark Button</Button>;

export const DisabledButton: ComponentStory<typeof Button> = () => <Button disabled>Disabled Button</Button>;

export const Light: ComponentStory<typeof Button> = () => <Button buttonStyle="light">Light Button</Button>;

export const Primary: ComponentStory<typeof Button> = () => <Button buttonStyle="primary">Primary Button</Button>;

export const DarkButtonWithArrow: ComponentStory<typeof Button> = () => (
  <Button buttonStyle="dark" withArrow>
    Dark Button With Arrow
  </Button>
);
