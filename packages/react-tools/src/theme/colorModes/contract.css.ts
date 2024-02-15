import { createThemeContract } from '@vanilla-extract/css';

import { generateThemeColors, generateThemeGradients } from './utils';

export const colorModeVars = createThemeContract({
  colors: generateThemeColors(),
  gradients: generateThemeGradients(),
});

export type ColorModeVars = typeof colorModeVars;
