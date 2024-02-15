const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/preset-create-react-app',
  ],
  core: { builder: 'webpack5' },
  features: {
    modernInlineRendering: true,
  },
  framework: '@storybook/react',
  stories: ['./docs/**/*.stories.mdx', '../src/**/*.stories.@(mdx|tsx)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': '../src',
    };

    config.plugins = [...config.plugins, new VanillaExtractPlugin()];

    return config;
  },
};
