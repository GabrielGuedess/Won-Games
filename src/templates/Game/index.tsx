import Base from 'templates/Base';

import GameInfo, { GameInfoProps } from 'components/GameInfo';
import Gallery, { GalleryImageProps } from 'components/Gallery';
import GameDetails, { GameDetailsProps } from 'components/GameDetails';
import TextContent from 'components/TextContent';
import Showcase from 'components/Showcase';
import { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';
import { Divider } from 'components/Divider';

import * as S from './styles';

export type GameTemplateProps = {
  cover: string;
  gameInfo: GameInfoProps;
  gallery?: GalleryImageProps[];
  description: string;
  details: GameDetailsProps;
  upcomingTitle: string;
  upcomingHighlight: HighlightProps;
  upcomingGames: GameCardProps[];
  recommendedTitle: string;
  recommendedGames: GameCardProps[];
};

const Game = ({
  cover,
  gameInfo,
  gallery,
  description,
  details,
  upcomingTitle,
  upcomingHighlight,
  upcomingGames,
  recommendedTitle,
  recommendedGames,
}: GameTemplateProps) => (
  <Base>
    <S.Cover src={cover} role="img" aria-label="cover" />

    <S.Main>
      <S.SectionGameInfo>
        <GameInfo {...gameInfo} />
      </S.SectionGameInfo>

      <S.SectionGallery>
        {!!gallery && <Gallery items={gallery} />}
      </S.SectionGallery>

      <S.SectionDescription>
        <TextContent title="Description" content={description} />
      </S.SectionDescription>

      <S.SectionGameDetails>
        <GameDetails {...details} />
        <Divider />
      </S.SectionGameDetails>

      <Showcase
        title={upcomingTitle}
        games={upcomingGames}
        highlight={upcomingHighlight}
      />

      <Showcase title={recommendedTitle} games={recommendedGames} />
    </S.Main>
  </Base>
);

export default Game;
