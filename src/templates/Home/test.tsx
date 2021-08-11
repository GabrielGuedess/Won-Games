import 'match-media-mock';

import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import bannerMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Home from '.';

const props = {
  banners: bannerMock,
  newGames: [gamesMock[0]],
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesMock[0]],
  upcommingHighlight: highlightMock,
  upcommingGames: [gamesMock[0]],
  upcommingMoreGames: [gamesMock[0]],
  freeHighlight: highlightMock,
  freeGames: [gamesMock[0]],
};

describe('<Home />', () => {
  it('should render menu and footer', () => {
    renderWithTheme(<Home {...props} />);

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /follow us/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /News/i })).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Most Popular/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Upcomming/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Free Games/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/defy death 1/i)).toHaveLength(1);

    expect(screen.getAllByText(/population zero/i)).toHaveLength(5);

    expect(screen.getAllByText(/read dead is back!/i)).toHaveLength(3);
  });
});
