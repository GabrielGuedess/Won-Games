import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import FormSignIn from '.';

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    const { container } = renderWithTheme(<FormSignIn />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign in now/i }),
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the forgot password link', () => {
    renderWithTheme(<FormSignIn />);

    expect(
      screen.getByRole('link', { name: /forgot your password/i }),
    ).toBeInTheDocument();
  });

  it('should render the text to sign up if already an account', () => {
    renderWithTheme(<FormSignIn />);

    expect(
      screen.getByRole('link', { name: /forgot your password/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
  });
});
