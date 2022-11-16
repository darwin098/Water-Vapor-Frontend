import React, { useEffect, useState } from "react";
import { getAllAdvert, removeAllAdvert, removeOneAdvert, addAdvert } from "../api";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";
import Modal from "react-modal";
import { Carousel } from 'react-responsive-carousel';
import { Player } from '@lottiefiles/react-lottie-player';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


function AdvertComponent(props) {
  const data = props.data.rows
  console.log(data);
  const [isOpen, setIsOpen] = useState(true);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  if (data.length == 0) {
    console.log('no adverts');
  } else {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="admodal"
        overlayClassName="adoverlay"
        closeTimeoutMS={500}
      >
        {/* <button id="btn-close" onClick={toggleModal}>X</button> */}
        <br/>
        <Carousel
          id="advert-content"
          className="carousel"
          infiniteLoop={true}
          autoPlay={true}
        >
          {data.map((game) => (
            <div key={game.game_id} onClick={() => { window.location.assign(`/gamepage/${game.game_name}`) }}>
              <img id="advert-img"
                src={
                  'https://ades-ades-ades.herokuapp.com/Images/' +
                  game.game_img_url
                }
              />
              <br/>
              <div className="legend">
                <h3 id="aadvert-text">{game.advert_text}</h3>
              </div>
            </div>
          ))}
        </Carousel>
        {/* <button id="btn-close" onClick={toggleModal}>X</button> */}
        {/* <div>
          <button id="btn-close" onClick={toggleModal}>X</button>
        </div> */}
      </Modal>
    )
  }
}

function PopUpAdvert() {
  // const getNewest = useQuery('newest', () => getNewestGames());
  const getAdvert = useQuery('advert', () => getAllAdvert());

  // {
  //   getAdvert.isLoading || getAdvert.isRefetching ? (
  //     <Player
  //       autoplay
  //       loop
  //       src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
  //       style={{ height: '300px', width: '300px' }}
  //     ></Player>
  //   ) : getAdvert.error ? (
  //     <p>{getAdvert.error.message}</p>
  //   ) : (
  //     <AdvertComponent
  //       interval={'1'}
  //       data={getAdvert.data.data}
  //     />
  //   )
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* {getNewest.isLoading || getNewest.isRefetching ? (
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: '300px', width: '300px' }}
          ></Player>
        ) : getNewest.error ? (
          <p>{getNewest.error.message}</p>
        ) : (
          <CarouselComponent
            interval={'1'}
            data={getNewest.data.data}
            type={'newest'}
          />
        )} */}
        {
          getAdvert.isLoading || getAdvert.isRefetching ? (
            <Player
              autoplay
              loop
              src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
              style={{ height: '300px', width: '300px' }}
            ></Player>
          ) : getAdvert.error ? (
            <p>{getAdvert.error.message}</p>
          ) : (
            // console.log(getAdvert.data.rows)
            <AdvertComponent
              interval={'1'}
              data={getAdvert.data}
            />
          )
        }
      </div>
    </QueryClientProvider>
  );
}

export default PopUpAdvert;