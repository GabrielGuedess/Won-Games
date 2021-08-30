import { Story, Meta } from '@storybook/react/types-6-0';
import GameDetails, { GameDetailsProps } from '.';

import mockGameDetails from './mock';

export default {
  title: 'Game/GameDetails',
  component: GameDetails,
  parameters: {
    backgrounds: {
      default: 'won-dark',
    },
    args: mockGameDetails,
  },
} as Meta;

export const Default: Story<GameDetailsProps> = args => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <GameDetails {...args} />
  </div>
);

Default.args = {
  developer: 'Different Tales',
  publisher: 'Walkabout',
  releaseDate: '2020-11-21T23:00:00',
  platforms: ['windows', 'mac', 'linux'],
  rating: 'BR0',
  genres: ['Role-playing'],
};

Default.argTypes = {
  platforms: {
    control: {
      type: 'inline-check',
      options: ['windows', 'linux', 'mac'],
    },
  },
  releaseDate: {
    control: 'date',
  },
  genres: {
    control: {
      type: 'inline-check',
      options: ['Role-playing', 'Narrative'],
    },
  },
};
