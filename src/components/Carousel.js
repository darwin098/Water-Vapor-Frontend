import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CarouselComponent(props) {
  const data = props.data;

  if (props.type === 'newest') {
    return (
      <Carousel
        className="carousel"
        infiniteLoop={true}
        autoPlay={true}
      >
        {data.map((game) => (
          <div key={game.game_id} onClick={() => { window.location.assign(`/gamepage/${game.game_name}`)}}>
            <img
              src={
                'https://ades-ades-ades.herokuapp.com/Images/' +
                game.game_img_url
              }
            />
            <div className="legend">
              <span>{game.description}</span>
            </div>
          </div>
        ))}
      </Carousel>
    );
  }

  if (props.type === 'promos') {
    return (
      <Carousel
        className="carousel"
        infiniteLoop={true}
        autoPlay={true}
      >
        {data.map((game) => (
          <div key={game.game_id} onClick={() => { window.location.assign(`/gamepage/${game.game_name}`)}}>
            <img
              src={
                'https://ades-ades-ades.herokuapp.com/Images/' +
                game.game_img_url
              }
            />
            <div className="legend">
              <span>{game.promotion_info}</span>
            </div>
          </div>
        ))}
      </Carousel>
    );
  }

  if (props.type === 'popular') {
    return (
      <Carousel
        className="carousel"
        infiniteLoop={true}
        autoPlay={true}
      >
        {data.map((game) => (
          <div key={game.game_id} onClick={() => { window.location.assign(`/gamepage/${game.game_name}`)}}>
            <img
              src={
                'https://ades-ades-ades.herokuapp.com/Images/' +
                game.game_img_url
              }
            />
            <div className="legend">
              <span>
                {game.rating
                  ? `Rated at ${game.rating}⭐!`
                  : `No ratings yet...`}
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default CarouselComponent;
