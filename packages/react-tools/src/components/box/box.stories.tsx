import type { StoryFn, Meta } from '@storybook/react';

import type { BoxProps } from './box';
import { Box } from './box';

export default {
  title: 'Shared/Box',
  component: Box,
  parameters: {
    viewMode: 'story',
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
} as Meta<typeof Box>;

const BoxTemplate: StoryFn<typeof Box> = (args: BoxProps) => {
  return <Box {...args}>I'm a box</Box>;
};

export const Default = BoxTemplate.bind({});
