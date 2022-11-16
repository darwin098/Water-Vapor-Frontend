import React, { useEffect } from 'react';
import { getLibraryKeys, verifyUser } from '../api.js';
import KeyPrinting from '../components/KeyPrinting';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';

function LibraryContent() {
  const id = localStorage.getItem('Id');
  const accessToken = localStorage.getItem('accessToken');
  const getKeys = useQuery('keys', () => getLibraryKeys(accessToken, id));

  return (
    <div id="LibraryContent">
      <h1>Your keys</h1>
      {getKeys.isLoading || getKeys.isRefetching ? (
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
          style={{ height: '300px', width: '300px' }}
        ></Player>
      ) : getKeys.error ? (
        <p>{getKeys.error.message}</p>
      ) : (
        <KeyPrinting data={getKeys.data} />
      )}
    </div>
  );
}

function LibraryScreen() {
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
    document.title = 'Key Library';
    let requestToken = localStorage.getItem('token');

    if (!requestToken) {
      // they are not a logged in user
      alert('Please sign in first!');
      window.location.href = '/';
    } else if (requestToken) {
      verifyUser(requestToken);
    }
  });

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient} queryCache={queryCache}>
      <LibraryContent />
    </QueryClientProvider>
  );
}

export default LibraryScreen;
