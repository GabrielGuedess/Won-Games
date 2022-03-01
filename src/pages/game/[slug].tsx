import { useRouter } from 'next/router';
import { initializeApollo } from 'utils/apollo';

import Game, { GameTemplateProps } from 'templates/Game';

import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES, QUERY_GAME } from 'graphql/queries/games';
import {
  QueryGameBySlug,
  QueryGameBySlugVariables,
} from 'graphql/generated/QueryGameBySlug';
import { GetStaticProps } from 'next';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { gamesMapper, highlightMapper } from 'utils/mappers';
import { QUERY_UPCOMING } from 'graphql/queries/upcoming';
import {
  QueryUpcoming,
  QueryUpcomingVariables,
} from 'graphql/generated/QueryUpcoming';
import { imageConvert } from 'utils/imageConvert';

const apolloClient = initializeApollo();

export default function Index(props: GameTemplateProps) {
  const router = useRouter();

  if (router.isFallback) return null;

  return <Game {...props} />;
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 },
  });

  const paths = data.games.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache',
  });

  if (!data.games.length) {
    return { notFound: true };
  }

  const game = data.games[0];

  const TODAY = new Date().toISOString().slice(0, 10);

  const {
    data: { showcase, upcomingGames },
  } = await apolloClient.query<QueryUpcoming, QueryUpcomingVariables>({
    query: QUERY_UPCOMING,
    variables: { date: TODAY },
  });

  const {
    data: { recommended },
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED,
  });

  return {
    revalidate: 60,
    props: {
      cover: imageConvert(game.cover!.src),
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description,
      },
      gallery: game.gallery.map(image => ({
        src: imageConvert(image.src),
        label: image.label,
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map(platform => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map(category => category.name),
      },
      upcomingTitle: showcase?.upcomingGames?.title,
      upcomingHighlight: highlightMapper(showcase?.upcomingGames?.highlight),
      upcomingGames: gamesMapper(upcomingGames),
      recommendedTitle: recommended?.section?.title,
      recommendedGames: gamesMapper(recommended?.section?.games),
    },
  };
};
