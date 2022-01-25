import { QueryGames_games } from 'graphql/generated/QueryGames';
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight,
} from 'graphql/generated/QueryHome';

export const bannerMapper = (banners: QueryHome_banners[]) =>
  banners.map(banner => ({
    img: `http://localhost:1337${banner.image?.url}`,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon.text,
      ribbonColor: banner.ribbon.color,
      ribbonSize: banner.ribbon.size,
    }),
  }));

export const gamesMapper = (games: QueryGames_games[] | null | undefined) =>
  games &&
  games.map(game => ({
    title: game.name,
    slug: game.slug,
    developer: game.developers[0].name,
    img: game.cover?.url.includes('https://res.cloudinary.com/won-games/')
      ? game.cover.url
      : `http://localhost:1337${game.cover?.url}`,
    price: game.price,
  }));

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined,
) =>
  highlight && {
    title: highlight.title,
    subtitle: highlight.subtitle,
    backgroundImage: highlight.background?.url.includes(
      'https://res.cloudinary.com/won-games/',
    )
      ? highlight.background.url
      : `http://localhost:1337${highlight.background?.url}`,
    floatImage: highlight.floatImage?.url.includes(
      'https://res.cloudinary.com/won-games/',
    )
      ? highlight.floatImage.url
      : `http://localhost:1337${highlight.floatImage?.url}`,
    buttonLabel: highlight.buttonLabel,
    buttonLink: highlight.buttonLink,
    alignment: highlight.alignment,
  };
