import { style, styleVariants } from '@vanilla-extract/css';
import { colorModeVars } from '~/theme/colorModes/contract.css';

import { baseThemeVars } from '../../theme/baseTheme.css';

const baseButtonStyles = style({
  display: 'flex',
  borderRadius: baseThemeVars.radii[8],
  padding: baseThemeVars.space[8],
  border: 0,
  cursor: 'pointer',
});

const primaryButtonStyles = style({
  backgroundColor: colorModeVars.colors['theme.primary'],
  color: colorModeVars.colors['theme.textOnPrimary'],
  ':disabled': {
    backgroundColor: colorModeVars.colors['theme.primary'],
  },
  ':hover': {
    backgroundColor: colorModeVars.colors['theme.primary'],
  },
  ':active': {
    backgroundColor: colorModeVars.colors['theme.primary'],
    outline: colorModeVars.colors['theme.linkText'],
  },
});

const secondaryButtonStyles = style({
  backgroundColor: colorModeVars.colors['theme.background'],
  borderColor: colorModeVars.colors['theme.primary'],
  borderWidth: baseThemeVars.thickness[1],
  borderStyle: 'solid',
  color: colorModeVars.colors['theme.primary'],
  ':disabled': {
    backgroundColor: colorModeVars.colors['theme.background'],
    borderColor: colorModeVars.colors['theme.background'],
  },
  ':hover': {
    backgroundColor: colorModeVars.colors['theme.background'],
  },
  ':active': {
    backgroundColor: colorModeVars.colors['theme.background'],
  },
});

export const buttonStyles = styleVariants({
  primary: [baseButtonStyles, primaryButtonStyles],
  secondary: [baseButtonStyles, secondaryButtonStyles],
});
