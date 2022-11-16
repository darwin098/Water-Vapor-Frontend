import React, { useEffect, useState } from 'react';
import { verifyUser, getClaimGiftCards, ClaimGiftCards } from '../api.js';
import { Player } from '@lottiefiles/react-lottie-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';

function KeyPrinting(props) {
  const ClaimGiftInput = React.createRef();
  const [GiftCode, getGiftCode] = useState('');
  const [Amount, getAmount] = useState('');
  const [Quantity, getQuantity] = useState('');
  //   console.log(props.data);
  let results = props.data.rows;
  const Code = useMutation(() => {
    return ClaimGiftCards(GiftCode);
  });
  console.log(results);
  return (
    <div id="printing-keys-data">
      <div>
        <input
          ref={ClaimGiftInput}
          placeholder="Enter Gift Card Code"
          onChange={(e) => getGiftCode(e.target.value)}
        ></input>
        <button
          type="submit"
          onClick={() => {
            Code.mutate();
          }}
        >
          Claim
        </button>
      </div>
    </div>
  );
}

function GiftCardClaim() {
  const getKeys = useQuery('keys', () => getClaimGiftCards());
  console.log(getKeys);
  return (
    <div id="LibraryContent">
      <h1>Claim Your Gift Card Code</h1>
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

function GiftCardClaimScreen() {
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
    document.title = 'Claim Gift Card';
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
      <GiftCardClaim />
    </QueryClientProvider>
  );
}

export default GiftCardClaimScreen;
