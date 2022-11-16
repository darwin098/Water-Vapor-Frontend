import React, { useState, useEffect } from 'react';
import Filters from '../components/SearchFilters';
import Results from '../components/SearchResults';
import { getGames } from '../api.js';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';
import { useParams } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const queryCache = new QueryCache();

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

function GamesScreen(props) {
  useEffect(() => {
    document.title = 'Games';
  });

  return (
    <QueryClientProvider client={queryClient} queryCache={queryCache}>
      <SearchResults />
    </QueryClientProvider>
  );
}

export default GamesScreen;
