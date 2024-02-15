import type { Meta, StoryFn } from '@storybook/react';

import { Heading } from './typography';

export default {
  component: Heading,
  title: 'Typography/Headings',
} as Meta<typeof Heading>;

const HeadingTemplate: StoryFn<typeof Heading> = (args) => <Heading {...args} />;

export const Default = HeadingTemplate.bind({});
Default.args = {
  children: 'A Heading',
};
