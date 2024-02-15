import { createContext } from 'react';

import { ColorModeVars, colorModeVars } from './colorModes/contract.css';

export type ColorMode = 'light' | 'dark';
type ThemeContextValue = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  colorMode: 'light',
  toggleColorMode: () => {},
});
