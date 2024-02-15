import type { Meta } from '@storybook/react';

import { Svg } from './svg';
import Actions from '../../assets/icons/misc/actions.svg';

export default {
  title: 'Shared/SVG',
  parameters: {
    viewMode: 'story',
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    controls: {
      disable: true,
    },
  },
} satisfies Meta<React.FunctionComponent<React.SVGProps<SVGSVGElement>>>;

export const Default = () => {
  return <Svg component={Actions} />;
};
