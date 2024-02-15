import { useState } from 'react';

import { baseThemeClass } from './baseTheme.css';
import { darkModeClass } from './colorModes/darkMode.css';
import { lightModeClass } from './colorModes/lightMode.css';
import { ThemeContext, type ColorMode } from './themeContext';

import { Box } from '~/components/box';

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const colorModeClass = colorMode === 'light' ? lightModeClass : darkModeClass;

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        toggleColorMode,
      }}
    >
      <div className={`${baseThemeClass} ${colorModeClass}`}>
        <Box>{children}</Box>
      </div>
    </ThemeContext.Provider>
  );
}
