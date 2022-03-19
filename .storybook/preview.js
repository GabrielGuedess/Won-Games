import { themes } from '@storybook/theming';
import { addDecorator } from '@storybook/react';
import { withNextRouter } from 'storybook-addon-next-router';
import { ThemeProvider } from 'styled-components';
import { CartContext, CartContextDefaultValues } from 'hooks/use-cart';

import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

addDecorator(withNextRouter());

export const parameters = {
  darkMode: {
    dark: { ...themes.dark, appBg: '#2F2F2F' },
    light: { ...themes.normal, appBg: '#FFFFFF' },
  },
  backgrounds: {
    default: 'won-light',
    values: [
      {
        name: 'won-light',
        value: theme.colors.white,
      },
      {
        name: 'won-dark',
        value: theme.colors.mainBg,
      },
    ],
  },
};

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <CartContext.Provider
        value={{
          ...CartContextDefaultValues,
          ...(context?.args?.cartContextValue || {}),
          ...context.args,
        }}
      >
        <GlobalStyles removeBg />
        <Story />
      </CartContext.Provider>
    </ThemeProvider>
  ),
];
