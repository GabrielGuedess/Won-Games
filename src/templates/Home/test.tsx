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

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />;
  },
}));

jest.mock('components/BannerSlider', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock BannerSlider" />;
  },
}));

describe('<Home />', () => {
  it('should render banner and showcases', () => {
    renderWithTheme(<Home {...props} />);

    expect(screen.getByTestId(/Mock BannerSlider/i)).toBeInTheDocument();

    expect(screen.getAllByTestId(/Mock Showcase/i)).toHaveLength(5);
  });
});
