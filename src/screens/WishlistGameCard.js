import React from 'react';
import { deleteWishlistItem, addGametoCart } from '../api';
import {
    useMutation,
    QueryClient,
    QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

function WishlistCard(props) {
    let wishlistData = props.rows;
    console.log(wishlistData);

    const removeGameFromWishlist = useMutation((game_id) => {
        return deleteWishlistItem(game_id);
    })

    const RemoveGameFromWishlist = async (game_id) => {
        await removeGameFromWishlist.mutate(game_id);
        window.location.reload();
    }

    const addingGametoCart = useMutation((game_id) => {
        return addGametoCart(game_id);
    })

    const AddGametoCart = async (game_id) => {
        await addingGametoCart.mutate(game_id);
        // window.location.reload();
    }

    if (wishlistData.length == 0) {

        return (
            <h2 id='status'>No games in your wishlist!</h2>
        )
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <div id='card-area'>
                    {wishlistData.map((wishlist) => (
                            <div
                            className="cart-indiv-game-section"
                            key={wishlist.game_id}
                            onClick={() => {
                                window.location.assign(`/gamepage/${wishlist.game_name}`);
                            }}
                            >
                            <div>
                                <img
                                    src={
                                        'https://ades-ades-ades.herokuapp.com/Images/' +
                                        wishlist.game_img_url
                                    }
                                    className="cart-game-image"
                                    alt={wishlist.game_name}
                                />
                            </div>

                            <div className="cart-info-section">
                                <div className="game-title">
                                    <h2 className="cart-game-name">{wishlist.game_name}</h2>
                                    <button id='btn-add' 
                                            onClick={() => { 
                                                AddGametoCart(wishlist.game_id); 
                                                alert(`${wishlist.game_name} has been added to your cart!`); 
                                            }}
                                        >
                                            Add to Cart
                                    </button>
                                    <br/>
                                    <a
                                            className="column"
                                            id="game-remove-cart"
                                            onClick={() => {
                                                RemoveGameFromWishlist(wishlist.game_id);
                                                window.location.reload();
                                            }}
                                    >
                                            Remove from Wishlist
                                    </a>
                                </div>

                                {wishlist.discount_percentage ? (
                                    <div className="cart-promoted-price">
                                        <p className="cart-promo">
                                            -{wishlist.discount_percentage}%
                                        </p>
                                        {/* <button id='btn-add' 
                                            onClick={() => { 
                                                AddGametoCart(wishlist.game_id); 
                                                alert(`${wishlist.game_name} has been added to your cart!`); 
                                            }}
                                        >
                                            Add to Cart
                                        </button> */}
                                        <div className="cart-discounted-price-section">
                                            {/* <strike className="cart-old-price">
                                                S${wishlist.price}
                                            </strike> */}
                                            {/* <button id='btn-blue'>Add to Cart</button> */}
                                            <div className="cart-price">
                                                S$
                                                {(
                                                    (wishlist.price / 100) *
                                                    (100 - wishlist.discount_percentage)
                                                ).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="price">
                                        <div className="cart-price">S${wishlist.price}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* {wishlistData.map((wishlist) => (
                        <div className="row" id="game-card">
                            <img className='column' id='game-img'
                                src={'https://ades-ades-ades.herokuapp.com/Images/' +
                                    wishlist.game_img_url

                                } alt={wishlist.game_name} />
                            <div className="column" id="game-details">
                                <div className="row">
                                    <h1 className="column" id="game-title">
                                        {wishlist.game_name}
                                    </h1>
                                    <br />
                                    <a className="column" id="game-remove-wishlist" onClick={() => { RemoveGameFromWishlist(wishlist.game_id) }}  >
                                        Remove from Wishlist
                                    </a>
                                </div>
                            </div>

                            <div className="column" id="add-cart">
                                <button id="btn-green" onClick={() => { AddGametoCart(wishlist.game_id); alert(`${wishlist.game_name} has been added to your cart!`); }} >
                                    Add to Cart
                                </button>
                            </div>
                            <div className="column" id="game-price-wishlist">
                                <p id="price-wishlist">${wishlist.price}</p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </QueryClientProvider>
        )
    }
}

export default WishlistCard;