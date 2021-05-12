import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import Heading from '.';

describe('<Heading />', () => {
  it('should render a heading with the color white', () => {
    renderWithTheme(<Heading>Won Games</Heading>);
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      color: '#FAFAFA',
    });
  });

  it('should render a heading with the color black', () => {
    renderWithTheme(<Heading color="black">Won Games</Heading>);
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      color: '#030517',
    });
  });

  it('should render a heading with the line at left', () => {
    renderWithTheme(<Heading lineLeft>Won Games</Heading>);
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      'border-left': '0.7rem solid #3CD3C1',
    });
  });

  it('should render a heading with the line at bottom', () => {
    renderWithTheme(<Heading lineBottom>Won Games</Heading>);
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyleRule(
      'border-bottom',
      '0.5rem solid #F231A5',
      {
        modifier: '::after',
      },
    );
  });
});
