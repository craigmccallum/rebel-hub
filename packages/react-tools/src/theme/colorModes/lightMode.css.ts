import { createTheme } from '@vanilla-extract/css';

import { colorModeVars } from './contract.css';
import { generateThemeColors, generateThemeGradients } from './utils';
import { baseThemeVars } from '../baseTheme.css';

export const lightModeClass = createTheme(colorModeVars, {
  colors: generateThemeColors({
    background: baseThemeVars.colors.grey10,
    textOnBackground: baseThemeVars.colors.grey1,
    primary: baseThemeVars.colors.green6,
    textOnPrimary: baseThemeVars.colors.grey1,
    neutral: baseThemeVars.colors.grey6,
    textOnNeutral: baseThemeVars.colors.grey1,
    success: baseThemeVars.colors.green6,
    textOnSuccess: baseThemeVars.colors.grey1,
    warning: baseThemeVars.colors.yellow6,
    textOnWarning: baseThemeVars.colors.grey1,
    error: baseThemeVars.colors.red6,
    textOnError: baseThemeVars.colors.grey1,
    linkText: baseThemeVars.colors.blue5,
  }),
  gradients: generateThemeGradients({
    background: baseThemeVars.colors.grey10,
    neutral: baseThemeVars.colors.grey6,
  }),
});
