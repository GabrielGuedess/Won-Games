import { PaymentIntent } from '@stripe/stripe-js';

import { CartItem } from 'hooks/use-cart';

type FetcherParams = {
  url: string;
  body: string;
  token: string;
};

type PaymentIntentParams = {
  items: CartItem[];
  token: string;
};

type CreatePaymentIntentParams = {
  items: CartItem[];
  paymentIntent?: PaymentIntent;
  token: string;
};

const fetcher = async ({ url, body, token }: FetcherParams) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  return await response.json();
};

export const createPaymentIntent = async ({
  items,
  token,
}: PaymentIntentParams) =>
  await fetcher({
    url: '/orders/create-payment-intent',
    body: JSON.stringify({ cart: items }),
    token,
  });

export const createPayment = async ({
  items,
  paymentIntent,
  token,
}: CreatePaymentIntentParams) =>
  await fetcher({
    url: '/orders',
    body: JSON.stringify({
      cart: items,
      paymentIntentId: paymentIntent?.id,
      paymentMethod: paymentIntent?.payment_method,
    }),
    token,
  });
