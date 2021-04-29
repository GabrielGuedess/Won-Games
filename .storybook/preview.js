import { addDecorator } from '@storybook/react';
import { withNextRouter } from 'storybook-addon-next-router';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyles from 'styles/global';

addDecorator(withNextRouter());

const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];

export default decorators;
