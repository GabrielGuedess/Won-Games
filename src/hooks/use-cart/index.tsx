import { useContext, createContext, useState, useEffect } from 'react';

import { useQueryGame } from 'graphql/queries/games';
import { getStorageItem, setStorageItem } from 'utils/localStorage';
import { cartMapper } from 'utils/mappers';
import formatPrice from 'utils/format-price';

const CART_KEY = 'cartItems';

export type CartItem = {
  id: string;
  img: string;
  title: string;
  price: string;
};

export type CartContextData = {
  items: CartItem[];
  quantity: number;
  total: string;
  loading: boolean;
  isInCart: (id: string) => boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContextDefaultValues = {
  items: [],
  quantity: 0,
  total: '$0.00',
  loading: false,
  isInCart: () => false,
  addToCart: () => null,
  removeFromCart: () => null,
  clearCart: () => null,
};

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValues,
);

export type CartProviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    const data = getStorageItem(CART_KEY);

    data && setCartItems(data);
  }, []);

  const { data, loading } = useQueryGame({
    skip: !cartItems?.length,
    variables: {
      where: {
        id: cartItems,
      },
    },
  });

  const total = data?.games.reduce((acc, game) => acc + game.price, 0) || 0;

  const saveCart = (cartItems: string[]) => {
    setCartItems(cartItems);
    setStorageItem(CART_KEY, cartItems);
  };

  const isInCart = (id: string) => cartItems.includes(id);

  const addToCart = (id: string) => {
    saveCart([...cartItems, id]);
  };

  const removeFromCart = (id: string) => {
    const newCartItems = cartItems.filter(item => item !== id);
    saveCart(newCartItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: formatPrice(total),
        loading,
        isInCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
