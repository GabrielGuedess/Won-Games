import { render, screen } from 'utils/test-utils';

import Preloader from '.';

describe('<Preloader />', () => {
  it('should render the preloader', () => {
    render(<Preloader />);

    expect(screen.getAllByLabelText(/box/i)).toHaveLength(25);
  });
});
