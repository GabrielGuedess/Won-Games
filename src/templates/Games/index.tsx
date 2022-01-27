import Base from 'templates/Base';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown';

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';
import GameCard, { GameCardProps } from 'components/GameCard';
import { Grid } from 'components/Grid';
import Preloader from 'components/Preloader';

import { useQueryGame } from 'graphql/queries/games';

import * as S from './styles';

export type GamesTemplateProps = {
  games?: GameCardProps[];
  filterItems: ItemProps[];
};

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  const { data, loading, fetchMore } = useQueryGame({
    variables: { limit: 15 },
  });

  const handleFilter = () => ({});

  const handleShowMore = () => {
    fetchMore({
      variables: { limit: 15, start: data?.games.length },
    });
  };

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        {loading ? (
          <Preloader />
        ) : (
          <section>
            <Grid>
              {data?.games.map(game => (
                <GameCard
                  key={game.slug}
                  title={game.name}
                  slug={game.slug}
                  developer={game.developers[0].name}
                  img={
                    game.cover!.url.includes(
                      'https://res.cloudinary.com/won-games/',
                    )
                      ? game.cover!.url
                      : `http://localhost:1337${game.cover!.url}`
                  }
                  price={game.price}
                />
              ))}
            </Grid>

            <S.ShowMore role="button" onClick={handleShowMore}>
              <p>Show More</p>
              <ArrowDown size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  );
};

export default GamesTemplate;
