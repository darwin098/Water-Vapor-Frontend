import React, { useEffect, useState, useRef } from 'react';
import {
  getGameName,
  addGametoCart,
  addGametoWishlist,
  deleteWishlistItem,
  userGameWishlist,
  getGameData,
} from '../api';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from 'react-query';
import ChartData from '../components/ChartData';
import { useParams } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import 'c3/c3.css';

function WishlistCheck() {
  let game_id = localStorage.getItem('game_id');
  let game_name = localStorage.getItem('game_name');

  const wishlistCheck = useQuery('wishlistgame', () =>
    userGameWishlist(game_id)
  );

  const addingGametoWishlist = useMutation((game_id) => {
    return addGametoWishlist(game_id);
  });

  const AddGametoWishlist = async (game_id) => {
    await addingGametoWishlist.mutate(game_id);
    alert(`${game_name} has been added to your Wishlist!`);
    // window.location.reload();
  };

  const removeGameFromWishlist = useMutation((game_id) => {
    return deleteWishlistItem(game_id);
  });

  const RemoveGameFromWishlist = async (game_id) => {
    alert(`${game_name} has been removed from your Wishlist!`);
    await removeGameFromWishlist.mutate(game_id);
    // window.location.reload();
  };

  return (
    <>
      {wishlistCheck.isLoading
        ? console.log('loading')
        : (console.log(wishlistCheck.data.rowCount),
          wishlistCheck.data.rowCount == 0 ? (
            <span
              id="wishlistButton"
              onClick={() => {
                AddGametoWishlist(game_id);
              }}
            >
              Add to wishlist🤍
            </span>
          ) : (
            <span
              id="wishlistButton"
              onClick={() => {
                RemoveGameFromWishlist(game_id);
              }}
            >
              Remove from wishlist🤍
            </span>
          ))}
    </>
  );
}

function SingleGameScreen() {
  const { gameId } = useParams();
  const imageRef = useRef();

  useEffect(() => {
    document.title = gameId;
  });

  const { isLoading, data, isRefetching, error } = useQuery(['Data'], () =>
    getGameName(gameId)
  );

  localStorage.setItem('game_name', gameId);

  const addingGametoCart = useMutation((game_id) => {
    return addGametoCart(game_id);
  });

  const AddGametoCart = async (game_id) => {
    console.log(`suck`);
    await addingGametoCart.mutate(game_id);
    // window.location.reload();
  };

  let game_name = localStorage.getItem('game_name');

  const [analyticData, setanalyticData] = useState();

  useEffect(() => {
    getGameData(game_name).then((response) => {
      console.log(response.rows);
      setanalyticData(response.rows);
    });
  }, []);

  return (
    <div id="GameMain">
      {isLoading || isRefetching ? (
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
          style={{ height: '300px', width: '300px' }}
        ></Player>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        data.rows.map((Game) => (
          <div>
            {console.log(Game.game_id)}
            {localStorage.setItem('game_id', Game.game_id)}
            <div id="GamePage">
              <img
                id="maingameimg"
                src={
                  'https://ades-ades-ades.herokuapp.com/Images/' +
                  Game.game_img_url
                }
                ref={imageRef}
              ></img>
              <div></div>
              <div>
                <h1>Category: {Game.category}</h1>
                <h1>Game: {Game.game_name}</h1>
                <span>
                  $
                  {(
                    Game.price -
                    (Game.price * Game.discount_percentage) / 100
                  ).toFixed(2)}
                </span>
                <div>
                  <button
                    id="addtocart"
                    onClick={() => {
                      AddGametoCart(Game.game_id);
                      alert(`${Game.game_name} has been added to your cart!`);
                    }}
                  >
                    Buy
                  </button>
                  <br></br>
                  <br></br>
                  <WishlistCheck />
                  {/* <span>Add to wishlist🤍</span> */}
                </div>
              </div>
            </div>
            <div id="descriptionandtext">
              <h1> DESCRIPTION</h1>
            </div>
            <div id="borderline"></div>
            <p id="textcontent">{Game.description}</p>

            {analyticData && analyticData.length > 0 ? (
              <div>
                <div id="Analyticsandtext">
                  <h1> Analytics</h1>
                </div>
                <div id="borderline"></div>
                <p></p>
                <ChartData data={analyticData} gameName={game_name} />
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default function SingleGame() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SingleGameScreen />
    </QueryClientProvider>
  );
}
