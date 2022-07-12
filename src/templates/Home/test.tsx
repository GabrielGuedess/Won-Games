import 'match-media-mock';

import { render, screen } from 'utils/test-utils';

import bannerMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Home from '.';

const props = {
  banners: bannerMock,
  newGames: [gamesMock[0]],
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesMock[0]],
  upcomingHighlight: highlightMock,
  upcomingGames: [gamesMock[0]],
  freeHighlight: highlightMock,
  freeGames: [gamesMock[0]],
  newGamesTitle: 'New Games',
  mostPopularGamesTitle: 'Popular Games',
  upcomingGamesTitle: 'Upcoming Games',
  freeGamesTitle: 'Free Games',
};

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  },
}));

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
    render(<Home {...props} />);

    expect(screen.getByTestId(/Mock BannerSlider/i)).toBeInTheDocument();

    expect(screen.getAllByTestId(/Mock Showcase/i)).toHaveLength(4);
  });
});
