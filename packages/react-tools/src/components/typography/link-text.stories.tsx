import type { Meta, StoryFn } from '@storybook/react';

import { LinkText } from './typography';

export default {
  component: LinkText,
  title: 'Typography/LinkText',
} as Meta<typeof LinkText>;

const LinkTextTemplate: StoryFn<typeof LinkText> = (args) => <LinkText {...args} />;

export const Default = LinkTextTemplate.bind({});
Default.args = {
  children: 'Some text',
};
