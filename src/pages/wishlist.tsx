import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />;
}

export async function getServerSideProps() {
  return {
    props: {
      games: gamesMock,
      recommendedHighlight: highlightMock,
      recommendedGames: gamesMock.slice(0, 5),
    },
  };
}