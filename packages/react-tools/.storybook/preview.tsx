import { BREAKPOINTS, COLOR_TOKENS } from '../src/theme/tokens';
import { ThemeDecorator } from './ThemeDecorators';

export const decorators = [ThemeDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  backgrounds: {
    default: 'White',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'gray',
        value: COLOR_TOKENS.grey6,
      },
    ],
  },
  viewport: {
    viewports: {
      'Mobile (280px)': {
        name: 'Mobile (280px)',
        styles: {
          width: '280px',
          height: '100%',
        },
      },
      [`Tablet (${BREAKPOINTS.sm}px)`]: {
        name: `Tablet (${BREAKPOINTS.sm}px)`,
        styles: {
          width: `${BREAKPOINTS.sm}px`,
          height: '100%',
        },
      },
      [`Laptop (${BREAKPOINTS.md}px)`]: {
        name: `Laptop (${BREAKPOINTS.md}px)`,
        styles: {
          width: `${BREAKPOINTS.md}px`,
          height: '100%',
        },
      },
      [`Desktop (${BREAKPOINTS.lg}px)`]: {
        name: `Desktop (${BREAKPOINTS.lg}px)`,
        styles: {
          width: `${BREAKPOINTS.lg}px`,
          height: '100%',
        },
      },
      [`Widescreen (${BREAKPOINTS.xl}px)`]: {
        name: `Desktop (${BREAKPOINTS.xl}px)`,
        styles: {
          width: `${BREAKPOINTS.xl}px`,
          height: '100%',
        },
      },
    },
  },
  options: {
    storySort: {
      order: ['Documentation', 'Shared', 'Contexts'],
    },
  },
};
