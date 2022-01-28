import { QueryGames_games } from 'graphql/generated/QueryGames';
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight,
} from 'graphql/generated/QueryHome';
import { imageConvert } from './imageConvert';

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
    img: imageConvert(game!.cover!.url),
    price: game.price,
  }));

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined,
) =>
  highlight && {
    title: highlight.title,
    subtitle: highlight.subtitle,
    backgroundImage: imageConvert(highlight!.background!.url),
    floatImage: imageConvert(highlight!.floatImage!.url),
    buttonLabel: highlight.buttonLabel,
    buttonLink: highlight.buttonLink,
    alignment: highlight.alignment,
  };
