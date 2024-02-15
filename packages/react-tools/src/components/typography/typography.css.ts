import { style, styleVariants } from '@vanilla-extract/css';

import { baseThemeVars } from '../../theme/baseTheme.css';

import { colorModeVars } from '~/theme/colorModes/contract.css';

// --------
// Headings
// --------

const baseHeadingStyles = style({
  fontFamily: baseThemeVars.fonts.heading,
});

const heading1Styles = style({
  fontWeight: 800,
  fontSize: baseThemeVars.fontSizes[64],
  lineHeight: baseThemeVars.fontSizes[64],
});

const heading2Styles = style({
  fontWeight: 800,
  fontSize: baseThemeVars.fontSizes[48],
  lineHeight: baseThemeVars.fontSizes[48],
});

const heading3Styles = style({
  fontWeight: 700,
  fontSize: baseThemeVars.fontSizes[32],
  lineHeight: baseThemeVars.fontSizes[32],
});

const heading4Styles = style({
  fontWeight: 700,
  fontSize: baseThemeVars.fontSizes[24],
  lineHeight: baseThemeVars.fontSizes[24],
});

const heading5Styles = style({
  fontWeight: 500,
  fontSize: baseThemeVars.fontSizes[20],
  lineHeight: baseThemeVars.fontSizes[20],
});

const heading6Styles = style({
  fontWeight: 500,
  fontSize: baseThemeVars.fontSizes[16],
  lineHeight: baseThemeVars.fontSizes[16],
});

export const headingStyles = styleVariants({
  h1: [baseHeadingStyles, heading1Styles],
  h2: [baseHeadingStyles, heading2Styles],
  h3: [baseHeadingStyles, heading3Styles],
  h4: [baseHeadingStyles, heading4Styles],
  h5: [baseHeadingStyles, heading5Styles],
  h6: [baseHeadingStyles, heading6Styles],
});

// ----
// Text
// ----

const regularFontFaceTextStyles = style({
  fontFamily: baseThemeVars.fonts.body,
});

const monoFontFaceTextStyles = style({
  fontFamily: baseThemeVars.fonts.monospace,
});

const lightWeightTextStyles = style({
  fontWeight: 300,
});

const regularWeightTextStyles = style({
  fontWeight: 400,
});

const boldWeightTextStyles = style({
  fontWeight: 700,
});

const smallSizeTextStyles = style({
  fontSize: baseThemeVars.fontSizes[14],
  lineHeight: baseThemeVars.fontSizes[14],
});

const regularSizeTextStyles = style({
  fontSize: baseThemeVars.fontSizes[16],
  lineHeight: baseThemeVars.fontSizes[16],
});

const largeSizeTextStyles = style({
  fontWeight: 400,
  fontSize: baseThemeVars.fontSizes[20],
  lineHeight: baseThemeVars.fontSizes[20],
});

export const textStyles = styleVariants({
  'small-light': [regularFontFaceTextStyles, lightWeightTextStyles, smallSizeTextStyles],
  'regular-light': [regularFontFaceTextStyles, lightWeightTextStyles, regularSizeTextStyles],
  'large-light': [regularFontFaceTextStyles, lightWeightTextStyles, largeSizeTextStyles],
  small: [regularFontFaceTextStyles, regularWeightTextStyles, smallSizeTextStyles],
  regular: [regularFontFaceTextStyles, regularWeightTextStyles, regularSizeTextStyles],
  large: [regularFontFaceTextStyles, regularWeightTextStyles, largeSizeTextStyles],
  'small-bold': [regularFontFaceTextStyles, boldWeightTextStyles, smallSizeTextStyles],
  'regular-bold': [regularFontFaceTextStyles, boldWeightTextStyles, regularSizeTextStyles],
  'large-bold': [regularFontFaceTextStyles, boldWeightTextStyles, largeSizeTextStyles],
  'mono-small-light': [monoFontFaceTextStyles, lightWeightTextStyles, smallSizeTextStyles],
  'mono-regular-light': [monoFontFaceTextStyles, lightWeightTextStyles, regularSizeTextStyles],
  'mono-large-light': [monoFontFaceTextStyles, lightWeightTextStyles, largeSizeTextStyles],
  'mono-small': [monoFontFaceTextStyles, regularWeightTextStyles, smallSizeTextStyles],
  'mono-regular': [monoFontFaceTextStyles, regularWeightTextStyles, regularSizeTextStyles],
  'mono-large': [monoFontFaceTextStyles, regularWeightTextStyles, largeSizeTextStyles],
  'mono-small-bold': [monoFontFaceTextStyles, boldWeightTextStyles, smallSizeTextStyles],
  'mono-regular-bold': [monoFontFaceTextStyles, boldWeightTextStyles, regularSizeTextStyles],
  'mono-large-bold': [monoFontFaceTextStyles, boldWeightTextStyles, largeSizeTextStyles],
});

const baseLinkStyles = style({
  cursor: 'pointer',
  transition: 'color 200ms ease',
  ':hover': {
    opacity: 0.8,
  },
  ':focus-visible': {
    outline: `3px solid ${colorModeVars.colors['theme.primary']}`,
    borderRadius: baseThemeVars.radii[4],
  },
});

const underlineStyles = style({
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  textUnderlineOffset: '5%',
  ':hover': {
    textDecoration: 'none',
  },
  ':focus-visible': {
    textDecoration: 'none',
  },
});

export const linkTextStyles = styleVariants({
  withUnderline: [baseLinkStyles, underlineStyles],
  withoutUnderline: [baseLinkStyles],
});
