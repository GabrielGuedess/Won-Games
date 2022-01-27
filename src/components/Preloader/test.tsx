import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import Preloader from '.';

describe('<Preloader />', () => {
  it('should render the preloader', () => {
    renderWithTheme(<Preloader />);

    expect(screen.getAllByLabelText(/box/i)).toHaveLength(25);
  });
});
