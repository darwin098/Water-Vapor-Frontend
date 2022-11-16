import React from 'react';
import WishlistCard from './WishlistGameCard.js';
import { getUserWishlist } from '../api.js';
import { Player } from '@lottiefiles/react-lottie-player';
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from 'react-query';

const queryClient = new QueryClient();

function UserWishlist() {
    const getWishlist = useQuery('userwishlist', () => getUserWishlist());
    
    return (
        <>
            {getWishlist.isLoading ? (
                <Player
                    autoplay
                    loop
                    src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
                    style={{ height: '300px', width: '300px' }}
                ></Player>
            ) : getWishlist.error ? (
                <p>{getWishlist.error.message}</p>
            ) : (

                // console.log(getWishlist.data.rows)
                <WishlistCard
                    rows={getWishlist.data.rows}
                />
            )}
        </>
    )
}

function WishlistScreen() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="Main">
                <div id="grid">
                    <div>
                        <h1 id="title">Your Wishlist</h1>
                    </div>
                    <div id='cartInfo'>
                        <UserWishlist />
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default WishlistScreen;