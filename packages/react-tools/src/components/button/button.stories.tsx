import type { Meta, StoryFn } from '@storybook/react';

import { Button } from './button';

export default {
  component: Button,
  title: 'Button',
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Add to cart',
};
