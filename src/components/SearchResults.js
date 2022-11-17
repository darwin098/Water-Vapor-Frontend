import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function Results(props) {
  let results = props.rows.pages;

  return (
    <div className="game-section">
      {results.map((page) =>
        page.data.map((game) => (
          <div
            className="indiv-game-section"
            key={game.game_id}
            onClick={() => {
              window.location.assign(`/gamepage/${game.game_name}`);
            }}
          >
            <img
              src={
                'https://water-vapor.onrender.com/Images/' + game.game_img_url
              }
              className="game-image"
              alt={game.game_name}
            />

            <div className="info-section">
              <div className="game-title">
                <div className="games-page-game-name">{game.game_name}</div>
                <div className="games-page-game-rating">
                  {game.rating
                    ? `Rating: 
                      ${game.rating}⭐`
                    : '(No reviews yet...)'}
                </div>
              </div>

              <div className="date-section">
                <p className="games-page-date">
                  {new Date(game.created_on).getDate()}{' '}
                  {monthNames[new Date(game.created_on).getMonth()]},{' '}
                  {new Date(game.created_on).getFullYear()}
                </p>
              </div>

              {game.discount_percentage ? (
                <div className="promoted-price">
                  <p className="game-page-promo">
                    -{game.discount_percentage}%
                  </p>
                  <div className="games-list-discounted-price-section">
                    <strike className="game-page-old-price">
                      S${game.price}
                    </strike>
                    <div className="game-page-price">
                      S$
                      {(
                        (game.price / 100) *
                        (100 - game.discount_percentage)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="price">
                  <div className="game-page-price">S${game.price}</div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {props.isFetchingNextPage ? (
        <div className="games-list-user-feedback">
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: '100px', width: '100px' }}
          ></Player>
        </div>
      ) : props.hasNextPage ? (
        <></>
      ) : (
        <div
          className="games-list-user-feedback"
          id="gameslist-no-results-left"
        >
          All results found: {props.totalResults}
        </div>
      )}
    </div>
  );
}

export default Results;
