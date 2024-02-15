import type { Meta, StoryFn } from '@storybook/react';

import { Text } from './typography';

export default {
  component: Text,
  title: 'Typography/Text',
} as Meta<typeof Text>;

const TextTemplate: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Default = TextTemplate.bind({});
Default.args = {
  children: 'Some text',
};
