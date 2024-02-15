import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { colorModeVars } from '~/theme/colorModes/contract.css';
import { themeTokens } from '~/theme/tokens';
import { baseThemeVars } from './baseTheme.css';

const staticProperties = defineProperties({
  properties: {
    // Animation
    transition: {
      all: 'all 150 cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transitionDuration: [
      '0s',
      '75ms',
      '100ms',
      '150ms',
      '200ms',
      '300ms',
      '500ms',
      '700ms',
      '1000ms',
    ],
    translate: {},
    // Action
    cursor: ['default', 'pointer'],
  },
});

const responsiveProperties = defineProperties({
  conditions: {
    _: { '@media': `screen and (min-width: ${themeTokens.breakpoints._})` },
    xs: { '@media': `screen and (min-width: ${themeTokens.breakpoints.xs})` },
    sm: { '@media': `screen and (min-width: ${themeTokens.breakpoints.sm})` },
    md: { '@media': `screen and (min-width: ${themeTokens.breakpoints.md})` },
    lg: { '@media': `screen and (min-width: ${themeTokens.breakpoints.lg})` },
    xl: { '@media': `screen and (min-width: ${themeTokens.breakpoints.xl})` },
  },
  defaultCondition: '_',
  properties: {
    // Layout
    position: ['relative', 'absolute', 'fixed', 'static', 'sticky'],
    display: ['none', 'flex', 'block', 'inline', 'inline-block', 'inline-flex'],
    zIndex: [0, 1, 2, 10, 20, 30, 40, 50, 'auto'],
    visibility: ['visible', 'hidden'],
    left: baseThemeVars.space,
    top: baseThemeVars.space,
    right: baseThemeVars.space,
    bottom: baseThemeVars.space,
    boxSizing: ['border-box', 'content-box'],
    overflowX: ['visible', 'hidden', 'scroll', 'auto'],
    overflowY: ['visible', 'hidden', 'scroll', 'auto'],
    // Sizing
    width: baseThemeVars.sizing,
    minWidth: baseThemeVars.sizing,
    maxWidth: baseThemeVars.sizing,
    height: baseThemeVars.sizing,
    minHeight: baseThemeVars.sizing,
    maxHeight: baseThemeVars.sizing,
    // Spacing
    paddingLeft: baseThemeVars.space,
    paddingTop: baseThemeVars.space,
    paddingRight: baseThemeVars.space,
    paddingBottom: baseThemeVars.space,
    marginLeft: baseThemeVars.space,
    marginTop: baseThemeVars.space,
    marginRight: baseThemeVars.space,
    marginBottom: baseThemeVars.space,
    // Flexbox
    flexDirection: ['row', 'column'],
    flexGrow: [1, 0],
    flexShrink: [1, 0],
    flexBasis: baseThemeVars.sizing,
    flexWrap: ['wrap', 'wrap-reverse', 'nowrap'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
      'space-evenly',
    ],
    justifySelf: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
      'space-evenly',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    alignSelf: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    columnGap: baseThemeVars.space,
    rowGap: baseThemeVars.space,
    // Borders
    borderLeftWidth: baseThemeVars.thickness,
    borderTopWidth: baseThemeVars.thickness,
    borderRightWidth: baseThemeVars.thickness,
    borderBottomWidth: baseThemeVars.thickness,
    borderRadius: baseThemeVars.radii,
    borderStyle: ['solid', 'dashed', 'dotted'],
    // Effects
    boxShadow: {
      _: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    opacity: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  },
  shorthands: {
    overflow: ['overflowX', 'overflowY'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    placeItems: ['justifyContent', 'alignItems'],
    placeSelf: ['justifySelf', 'alignSelf'],
    gap: ['columnGap', 'rowGap'],
    size: ['height', 'width'],
    borderWidth: ['borderLeftWidth', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {
      '@media': `(prefers-color-scheme: light)`,
    },
    darkMode: { '@media': `(prefers-color-scheme: dark)` },
    onHover: { selector: '&:hover' },
    onActive: { selector: '&:active' },
  },
  defaultCondition: ['lightMode', 'darkMode'],
  properties: {
    color: { ...baseThemeVars.colors, ...colorModeVars.colors },
    background: { ...baseThemeVars.colors, ...colorModeVars.colors },
    borderColor: { ...baseThemeVars.colors, ...colorModeVars.colors },
  },
});

export const utilityStyles = createSprinkles(
  staticProperties,
  responsiveProperties,
  colorProperties,
);

export type UtilityStyles = Parameters<typeof utilityStyles>[0];
