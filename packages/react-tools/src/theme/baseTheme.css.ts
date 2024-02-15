import { createTheme } from '@vanilla-extract/css';

import { themeTokens } from './tokens';

export const [baseThemeClass, baseThemeVars] = createTheme({
  breakpoints: themeTokens.breakpoints,
  fonts: themeTokens.fonts,
  fontSizes: themeTokens.fontSizes,
  animation: themeTokens.animation,
  space: themeTokens.space,
  sizing: themeTokens.sizing,
  radii: themeTokens.radii,
  thickness: themeTokens.thickness,
  colors: themeTokens.colors,
});
