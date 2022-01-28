import { useRouter } from 'next/router';

import Base from 'templates/Base';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown';

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';
import { ParsedUrlQueryInput } from 'querystring';

import GameCard from 'components/GameCard';
import { Grid } from 'components/Grid';
import Preloader from 'components/Preloader';
import Empty from 'components/Empty';

import { useQueryGame } from 'graphql/queries/games';

import {
  parseQueryStringToFilter,
  parseQueryStringToWhere,
} from 'utils/filter';
import { imageConvert } from 'utils/imageConvert';

import * as S from './styles';

export type GamesTemplateProps = {
  filterItems: ItemProps[];
};

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter();

  const { data, loading, fetchMore } = useQueryGame({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null,
    },
  });

  if (!data) return <Preloader />;

  const { games, gamesConnection } = data;

  const hasMoreGames = games.length < (gamesConnection?.values?.length || 0);

  const handleFilter = (items: ParsedUrlQueryInput) => {
    push({
      pathname: '/games',
      query: items,
    });
  };

  const handleShowMore = () => {
    fetchMore({
      variables: { limit: 15, start: data?.games.length },
    });
  };

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems,
          })}
          items={filterItems}
          onFilter={handleFilter}
        />
        <section>
          {data?.games.length ? (
            <>
              <Grid>
                {data?.games.map(game => (
                  <GameCard
                    key={game.slug}
                    title={game.name}
                    slug={game.slug}
                    developer={game.developers[0].name}
                    img={imageConvert(game.cover!.url)}
                    price={game.price}
                  />
                ))}
              </Grid>
              {hasMoreGames && (
                <S.ShowMore>
                  {loading ? (
                    <Preloader />
                  ) : (
                    <S.ShowMoreButton role="button" onClick={handleShowMore}>
                      <p>Show More</p>
                      <ArrowDown size={35} />
                    </S.ShowMoreButton>
                  )}
                </S.ShowMore>
              )}
            </>
          ) : (
            <Empty
              title=":("
              description="We didn't find any games with this filter"
              hasLink
            />
          )}
        </section>
      </S.Main>
    </Base>
  );
};

export default GamesTemplate;
