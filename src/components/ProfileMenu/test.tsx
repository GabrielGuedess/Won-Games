import theme from 'styles/theme';
import { render, screen } from 'utils/test-utils';

import ProfileMenu from '.';

describe('<ProfileMenu />', () => {
  it('should render the menu', () => {
    const { container } = render(<ProfileMenu />);

    expect(
      screen.getByRole('link', { name: /My Profile/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /My Cards/i })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /My Orders/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Sign out/i }),
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the menu with an active link defined', () => {
    render(<ProfileMenu activeLink="/profile/cards" />);

    expect(screen.getByRole('link', { name: /My Cards/i })).toHaveStyle({
      background: theme.colors.primary,
      color: theme.colors.white,
    });
  });
});
