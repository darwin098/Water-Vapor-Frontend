import React, { useEffect } from 'react';
import { getGiftCardLibrary, verifyUser } from '../api.js';
import { Player } from '@lottiefiles/react-lottie-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';

function KeyPrinting(props) {
  const copy = (value) => {
    navigator.clipboard.writeText(value);
    alert('Copied key!');
  };

  //   console.log(props.data);
  let results = props.data.rows;
  console.log(results);
  return (
    <div id="printing-keys-data">
      {results.map((result) => (
     <div id='giftcardcontainer'> 
      <h5 className="printing-giftcart">{"You received " + result.quantity+"x" + " $" + result.amount + " Gift Card" + " from " + result.BuyerUserName}</h5>
        <h5>{"From: " + result.message}</h5>
        <h5>{"Message: " + result.frombuyuser}</h5>

      <div className="printing-key-row">
          <h5 className="printing-key">
            {result.code}
            {/* <i>I</i> */}
          </h5>

          <FontAwesomeIcon
            className="copy-icon"
            onClick={() => copy(result.code)}
            icon={faCopy}
          />
        </div>     
        </div>
      ))}
    </div>
  );
}

function GiftCardLibraryContent() {
  const getKeys = useQuery('keys', () => getGiftCardLibrary());

  return (
    <div id="LibraryContent">
      <h1>Your Gift Card</h1>
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
        // console.log(getKeys)
        <KeyPrinting data={getKeys.data} />
      )}
    </div>
  );
}

function GiftCardLibraryScreen() {
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
    document.title = 'Gift Card Library';
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
      <GiftCardLibraryContent />
    </QueryClientProvider>
  );
}

export default GiftCardLibraryScreen;
