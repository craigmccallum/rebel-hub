import React from 'react';
// import { ThemeProvider } from 'styled-components';
// import { GlobalReset } from '../theme/globalReset';
// import { theme } from '../theme';

export const ThemeDecorator = (Story: any) => {
  return (
    // <ThemeProvider theme={theme}>
    //   <GlobalReset />
    <Story />
    // </ThemeProvider>
  );
};
