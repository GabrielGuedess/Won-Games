import { render, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import UserDropdown from '.';

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    render(<UserDropdown username="Gabriel" />);

    expect(screen.getByText(/Gabriel/i)).toBeInTheDocument();
  });

  it('should render the menu', () => {
    render(<UserDropdown username="Gabriel" />);

    userEvent.click(screen.getByText(/Gabriel/i));

    expect(
      screen.getByRole('link', { name: /my profile/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign out/i }),
    ).toBeInTheDocument();
  });
});
