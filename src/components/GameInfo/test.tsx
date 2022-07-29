import 'session.mock';
import { render, screen } from 'utils/test-utils';

import GameInfo from '.';

const props = {
  id: '1',
  title: 'My Game Title',
  description: 'Game Description',
  price: 210,
};

describe('<GameInfo />', () => {
  it('should render the game information', () => {
    const { container } = render(<GameInfo {...props} />);

    expect(
      screen.getByRole('heading', { name: props.title }),
    ).toBeInTheDocument();

    expect(screen.getByText(props.description)).toBeInTheDocument();

    expect(screen.getByText(/\$210.00/)).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the buttons', () => {
    render(<GameInfo {...props} />);

    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add to wishlist/i }),
    ).toBeInTheDocument();
  });
});
