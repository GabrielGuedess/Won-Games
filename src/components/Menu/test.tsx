import { fireEvent, screen } from '@testing-library/react';
import { render } from 'utils/test-utils';

import Menu from '.';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  query: {},
}));

describe('<Menu />', () => {
  it('should render the menu', () => {
    render(<Menu />);

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /won games/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/shopping cart/i)).toHaveLength(2);
  });

  it('should handle the open/close mobile menu', () => {
    render(<Menu />);

    const fullMenuElement = screen.getByRole('navigation', { hidden: true });

    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true');
    expect(fullMenuElement).toHaveStyle({ opacity: 0 });

    fireEvent.click(screen.getByLabelText(/open menu/i));
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false');
    expect(fullMenuElement).toHaveStyle({ opacity: 1 });

    fireEvent.click(screen.getByLabelText(/close menu/i));
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true');
    expect(fullMenuElement).toHaveStyle({ opacity: 0 });
  });

  it('should show register box when logged out', () => {
    render(<Menu />);

    expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/sign in/i)).toHaveLength(2);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('should show wishlist and account when logged in', () => {
    render(<Menu username="Gabriel" />);

    expect(screen.getAllByText(/my profile/i)).toHaveLength(2);
    expect(screen.getAllByText(/wishlist/i)).toHaveLength(2);
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
  });

  it('should not show sign in or dropdown if loading', () => {
    render(<Menu username="Gabriel" loading />);

    expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });
});
