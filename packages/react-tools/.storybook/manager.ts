import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const Logo = require('./favicon.ico');

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Rebel Hub Design System',
    brandImage: Logo,
    brandTarget: '_self',
  }),
});
