import PopUpAdvert from './PopUpAdvert';
import CarouselComponent from '../components/Carousel';
import { getNewestGames, getSpecialOffers, getPopularGames } from '../api.js';
import React, { useState, useEffect } from 'react';
import Filters from '../components/SearchFilters';
import Results from '../components/SearchResults';
import { getGames } from '../api.js';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  useQuery,
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';

function SearchResults(props) {
  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  });

  let totalResults = 0;

  const [filter, setFilter] = useState({});
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['getGames', filter.keyword, filter.filter],
    ({ pageParam = 1 }) => getGames(filter.keyword, filter.filter, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = Math.ceil(lastPage.totalRows / 5);
        console.log(lastPage.totalRows);
        totalResults = lastPage.totalRows;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );

  return (
    <div id="GamesListContent">
      <div id="header-section">
        <div id="page-sub-header">All Products</div>
      </div>

      <Filters onChange={setFilter} />
      <p></p>

      {status === 'loading' ? (
        <div className="game-section">
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: '300px', width: '300px' }}
          ></Player>
        </div>
      ) : status === 'error' ? (
        <p>{error.message}</p>
      ) : (
        <Results
          rows={data}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          totalResults={totalResults}
        />
      )}
    </div>
  );
}

function HomeContent() {
  const getNewest = useQuery('newest', () => getNewestGames());
  const getPromos = useQuery('promos', () => getSpecialOffers());
  // const getPopular = useQuery('popular', () => getPopularGames());

  return (
    <>
      <div id="HomeContent">
        <div id="newest-games">
          <h1>Our Newest Games</h1>
          {getNewest.isLoading || getNewest.isRefetching ? (
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
          )}
        </div>

        <div id="special-offers">
          <h1>Special Offers</h1>
          {getPromos.isLoading || getPromos.isRefetching ? (
            <Player
              autoplay
              loop
              src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
              style={{ height: '300px', width: '300px' }}
            ></Player>
          ) : getPromos.error ? (
            <p>{getPromos.error.message}</p>
          ) : (
            <CarouselComponent
              interval={'1'}
              data={getPromos.data}
              type={'promos'}
            />
          )}
        </div>

        {/* <div id="popular-games">
        <h1>Popular games</h1>
        {getPopular.isLoading || getPopular.isRefetching ? (
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: '300px', width: '300px' }}
          ></Player>
        ) : getPopular.error ? (
          <p>{getPopular.error.message}</p>
        ) : (
          <CarouselComponent
            interval={'1'}
            data={getPopular.data.data}
            type={'popular'}
          />
        )}
      </div> */}
      </div>

      <SearchResults />
    </>
  );
}

function HomeScreen() {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // Create a query cache
  const queryCache = new QueryCache();

  useEffect(() => {
    document.title = 'Home';
  });

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient} queryCache={queryCache}>
      <PopUpAdvert />
      <HomeContent />
    </QueryClientProvider>
  );
}

export default HomeScreen;
