import React, { useEffect, useState } from 'react';
import { redeemKeys } from '../api';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';

function ClaimingKeysScreen() {
  const mutation = useMutation(() => {
    return redeemKeys(key);
  });

  const [key, updateKey] = useState('');

  const Claim = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div id="ClaimKeysContent">
      <div className="main-claim-key-content">
        <h2 id="claim-key-title">SIMULATE REDEEMING A GAME KEY</h2>
        <div className="claim-keys-form-section">
          <form onSubmit={(event) => Claim(event)} id="claim-key-form">
            <label id="claim-key-label">Enter game key</label>
            <div className="input-sections">
              <input
                type="text"
                id="claim-key-input"
                onChange={(event) => updateKey(event.target.value)}
              />
              <input type="submit" value="Claim" id="claim-key-submit" />
            </div>
          </form>
        </div>
        <div>
          {mutation.isLoading ? (
            <Player
              autoplay
              loop
              src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
              style={{ height: '100px', width: '100px' }}
            ></Player>
          ) : (
            <>
              {mutation.isError ? (
                <div>An error occurred: {mutation.error.message}</div>
              ) : null}

              {mutation.isSuccess ? (
                <p className="claim-key-response-section">{mutation.data}</p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClaimingKeysContent() {
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
    document.title = 'Claim keys';
  });

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient} queryCache={queryCache}>
      <ClaimingKeysScreen />
    </QueryClientProvider>
  );
}
