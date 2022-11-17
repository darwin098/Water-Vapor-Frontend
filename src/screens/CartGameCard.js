import React, { useState } from 'react';
import { deleteCartItem, purchaseGames, Referralcode } from '../api';
import { Player } from '@lottiefiles/react-lottie-player';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

let cartLength = 0;

function TotalCost(props) {
  let total_cost = props.total_cost;

  const purchaseGamesInCart = useMutation(() => {
    return purchaseGames();
  });

  const PurchaseGamesInCart = async () => {
    let wallet = localStorage.getItem('wallet');

    if (wallet >= total_cost) {
      await purchaseGamesInCart.mutate();
      cartLength = 0;
      //   window.location.reload();
    } else {
      alert('You have insufficient funds!');
    }
  };

  const handleClick = () => {
    window.location.href = '/gameslist';
  };

  const [datacode, getdatacode] = useState('');
  const [discountpercentage, getdiscountpercentage] = useState('');
  const Code = useMutation(
    () => {
      return Referralcode(referralcode);
    },
    {
      onSuccess: (data) => {
        if (data.length == 1) {
          getdatacode(data.length);
          {
            data.map((result) =>
              getdiscountpercentage(result.discount_percentage)
            );
          }
        }
      },
    }
  );
  const referralcodeinput = React.createRef();
  const [referralcode, getreferralcode] = useState('');
  return (
    <>
      <div className="column">
        <div>
          {Code.isLoading ? (
            <Player
              autoplay
              loop
              src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
              style={{ height: '50px', width: '50px' }}
            ></Player>
          ) : (
            <>
              {datacode ? (
                <div id="discountcode">
                  <span>Total Cost: </span>
                  <span>
                    {(
                      total_cost -
                      (total_cost * discountpercentage) / 100
                    ).toFixed(2)}
                  </span>{' '}
                  <span id="originalprice">${total_cost}</span>{' '}
                </div>
              ) : (
                <h2>Total Cost: ${total_cost.toFixed(2)}</h2>
              )}
            </>
          )}
        </div>
        <label>
          Discount Code:
          <input
            ref={referralcodeinput}
            onChange={(e) => getreferralcode(referralcodeinput.current.value)}
            type="text"
            id="discount-input"
          />
        </label>
        <button
          id="btn-blue"
          onClick={() => {
            Code.mutate();
          }}
        >
          Check Code
        </button>
      </div>
      <div className="column">
        <button
          id="btn-blue"
          onClick={() => {
            PurchaseGamesInCart();
          }}
        >
          Purchase
        </button>
        <button
          id="btn-blue"
          onClick={() => {
            handleClick();
          }}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}

function CartCard(props) {
  let total_cost = 0;

  let cartData = props.rows;
  cartLength = cartData.length;
  console.log('-------------Cart Data-------------');
  console.log(cartData);
  console.log(cartLength);
  console.log(cartData.length);

  const removeGameFromCart = useMutation((game_id) => {
    return deleteCartItem(game_id);
  });

  const RemoveGameFromCart = async (game_id) => {
    await removeGameFromCart.mutate(game_id);
    window.location.reload();
  };

  if (cartLength == 0) {
    return <h2 id="status">No games in your cart!</h2>;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <div id="card-area">
          {cartData.map(
            (cart) => (
              console.log('------------cart data--------------'),
              console.log(cartData),
              // calculate total cost
              console.log('discount price: ' + cart.discounted_price),
              (total_cost +=
                parseFloat(
                  cart.discounted_price != null
                    ? cart.discounted_price
                    : cart.price
                ) * cart.quantity),
              console.log(total_cost),
              localStorage.setItem('total_cost', total_cost.toFixed(2)),
              (
                // render cart card
                <div
                  className="cart-indiv-game-section"
                  key={cart.game_id}
                  onClick={() => {
                    window.location.assign(`/gamepage/${cart.game_name}`);
                  }}
                >
                  <div>
                    <img
                      src={
                        'https://water-vapor.onrender.com/Images/' +
                        cart.game_img_url
                      }
                      className="cart-game-image"
                      alt={cart.game_name}
                    />
                  </div>

                  <div className="cart-info-section">
                    <div className="game-title">
                      <h2 className="cart-game-name">{cart.game_name}</h2>
                      <h6 className="column" id="game-qty">
                        Quantity Wanted: {cart.quantity}
                      </h6>
                      <a
                        className="column"
                        id="game-remove-cart"
                        onClick={() => {
                          RemoveGameFromCart(cart.game_id);
                          window.location.reload();
                        }}
                      >
                        Remove from Cart
                      </a>
                    </div>

                    {cart.discount_percentage ? (
                      <div className="cart-promoted-price">
                        <p className="cart-promo">
                          -{cart.discount_percentage}%
                        </p>
                        <div className="cart-discounted-price-section">
                          {/* <strike className="cart-old-price">
                                                    S${cart.price}
                                                </strike> */}
                          <div className="cart-price">
                            S$
                            {(
                              (cart.price / 100) *
                              (100 - cart.discount_percentage)
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="price">
                        <div className="cart-price">S${cart.price}</div>
                      </div>
                    )}
                  </div>
                </div>
              )
            )
          )}
        </div>

        <div className="row" id="cart-bottom">
          <TotalCost total_cost={total_cost} />
        </div>
      </QueryClientProvider>
    );
  }
}

export default CartCard;
