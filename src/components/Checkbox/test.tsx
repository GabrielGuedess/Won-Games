import { screen, waitFor } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import userEvent from '@testing-library/user-event';

import theme from 'styles/theme';
import Checkbox from '.';

describe('<Checkbox />', () => {
  it('should render with label', () => {
    renderWithTheme(<Checkbox label="checkbox label" labelFor="check" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument();
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check');
  });

  it('should render without label', () => {
    renderWithTheme(<Checkbox />);

    expect(screen.queryByLabelText(/checkbox/i)).not.toBeInTheDocument();
  });

  it('should render with black label', () => {
    renderWithTheme(
      <Checkbox label="checkbox label" labelFor="check" labelColor="black" />,
    );

    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: theme.colors.black,
    });
  });

  it('should render dispatch onCheck when status change', async () => {
    const onCheck = jest.fn();

    renderWithTheme(<Checkbox label="checkbox" onCheck={onCheck} />);

    expect(onCheck).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });

    expect(onCheck).toBeCalledWith(true);
  });

  it('should render dispatch onCheck when status change', async () => {
    const onCheck = jest.fn();

    renderWithTheme(<Checkbox label="checkbox" onCheck={onCheck} isChecked />);

    userEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });

    expect(onCheck).toBeCalledWith(false);
  });

  it('should be acess with tab', () => {
    renderWithTheme(<Checkbox label="checkbox" labelFor="Checkbox" />);

    expect(document.body).toHaveFocus();

    userEvent.tab();

    expect(screen.getByLabelText(/checkbox/i)).toHaveFocus();
  });
});
