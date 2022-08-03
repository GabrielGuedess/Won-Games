import { Session } from 'next-auth';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Base from 'templates/Base';
import { Container } from 'components/Container';
import { Divider } from 'components/Divider';
import { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';
import CartList, { CartListProps } from 'components/CartList';
import Heading from 'components/Heading';
import Showcase from 'components/Showcase';
import PaymentOptions from 'components/PaymentForm';

import * as S from './styles';

export type CartProps = {
  session: Session;
  recommendedTitle: string;
  recommendedHighlight: HighlightProps;
  recommendedGames: GameCardProps[];
} & CartListProps;

const Cart = ({
  session,
  recommendedTitle,
  recommendedGames,
  recommendedHighlight,
}: CartProps) => {
  const stripe = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
  );

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My cart
        </Heading>

        <S.Content>
          <CartList />

          <Elements stripe={stripe}>
            <PaymentOptions session={session} />
          </Elements>
        </S.Content>
        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
};

export default Cart;
