import { render, screen } from 'utils/test-utils';

import Base from '.';

jest.mock('next-auth/client', () => ({
  useSession: jest.fn(() => [{ session: null }]),
}));

jest.mock('components/Menu', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Menu" />;
  },
}));

jest.mock('components/Footer', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Footer" />;
  },
}));

describe('<Base />', () => {
  it('should render menu, footer and children', () => {
    render(
      <Base>
        <h1>Heading</h1>
      </Base>,
    );

    expect(screen.getByTestId(/Mock Menu/i)).toBeInTheDocument();

    expect(screen.getByTestId(/Mock Footer/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Heading/i }),
    ).toBeInTheDocument();
  });
});
