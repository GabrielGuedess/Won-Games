import Cart, { CartProps } from 'templates/Cart';

import itemsMock from 'components/CartList/mock';
import cardsMock from 'components/PaymentOptions/mock';
import { initializeApollo } from 'utils/apollo';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { gamesMapper, highlightMapper } from 'utils/mappers';

export default function CartPage(props: CartProps) {
  return <Cart {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const {
    data: { recommended },
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED,
  });
  return {
    props: {
      recommendedTitle: recommended?.section?.title,
      recommendedHighlight: highlightMapper(recommended?.section?.highlight),
      recommendedGames: gamesMapper(recommended?.section?.games),
      items: itemsMock,
      total: '$ 430,00',
      cards: cardsMock,
    },
  };
}
