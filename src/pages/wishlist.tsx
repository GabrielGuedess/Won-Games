import { GetServerSidePropsContext } from 'next';

import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist';

import { initializeApollo } from 'utils/apollo';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { gamesMapper, highlightMapper } from 'utils/mappers';

import gamesMock from 'components/GameCardSlider/mock';

import protectedRoutes from 'utils/protected-routes';

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const apolloClient = initializeApollo();

  const {
    data: { recommended },
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED,
  });

  return {
    props: {
      session,
      games: gamesMock,
      recommendedTitle: recommended?.section?.title,
      recommendedHighlight: highlightMapper(recommended?.section?.highlight),
      recommendedGames: gamesMapper(recommended?.section?.games),
    },
  };
}
