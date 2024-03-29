import { QueryGames_games } from 'graphql/generated/QueryGames';
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight,
} from 'graphql/generated/QueryHome';
import { QueryOrders_orders } from 'graphql/generated/QueryOrders';
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist';

import formatPrice from 'utils/format-price';
import { imageConvert } from '../imageConvert';

export const bannerMapper = (banners: QueryHome_banners[]) =>
  banners.map(banner => ({
    img: banner.image?.url,
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

export const gamesMapper = (
  games:
    | QueryGames_games[]
    | QueryWishlist_wishlists_games[]
    | null
    | undefined,
) =>
  games
    ? games.map(game => ({
        id: game.id,
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: imageConvert(game!.cover!.url),
        price: game.price,
      }))
    : [];

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined,
) =>
  highlight
    ? {
        id: highlight.id,
        title: highlight.title,
        subtitle: highlight.subtitle,
        backgroundImage: imageConvert(highlight!.background!.url),
        floatImage: imageConvert(highlight!.floatImage!.url),
        buttonLabel: highlight.buttonLabel,
        buttonLink: highlight.buttonLink,
        alignment: highlight.alignment,
      }
    : {};

export const cartMapper = (games: QueryGames_games[] | undefined) =>
  games
    ? games.map(game => ({
        id: game.id,
        img: imageConvert(game.cover!.url),
        price: formatPrice(game.price),
        title: game.name,
      }))
    : [];

export const ordersMapper = (orders: QueryOrders_orders[] | undefined) =>
  orders
    ? orders.map(order => ({
        id: order.id,
        paymentInfo: {
          flag: order.card_brand,
          img: order.card_brand ? `/img/cards/${order.card_brand}.png` : null,
          number: order.card_last4
            ? `**** **** **** ${order.card_last4}`
            : 'Free Game',
          purchaseDate: `Purchase made on ${new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(new Date(order.created_at))}`,
        },
        games: order.games.map(game => ({
          id: game.id,
          title: game.name,
          downloadLink:
            'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
          img: imageConvert(game.cover!.url),
          price: formatPrice(game.price),
        })),
      }))
    : [];
