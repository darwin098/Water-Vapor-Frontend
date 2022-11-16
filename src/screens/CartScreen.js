import React from 'react';
import CartCard from './CartGameCard.js';
import { getUserCart } from '../api.js';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// let total_cost = localStorage.getItem('total_cost');
// let cart = localStorage.getItem('cart');

function UserCart() {
  const getCart = useQuery('usercart', () => getUserCart());

  return (
    <>
      {getCart.isLoading ? (
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
          style={{ height: '300px', width: '300px' }}
        ></Player>
      ) : getCart.error ? (
        <p>{getCart.error.message}</p>
      ) : (

        <CartCard
          rows={getCart.data.rows}
        />
      )}
    </>
  );
}

function CartScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="Main">
        <div id="grid">
          <div>
            <h1 id="title">Your Shopping Cart</h1>
          </div>
          <div id="cartInfo">
            <UserCart />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default CartScreen;
