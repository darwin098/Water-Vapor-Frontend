import React, { useEffect, useState, useRef } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { getReferralcode } from '../api';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Player } from '@lottiefiles/react-lottie-player';

function ReferralSystem() {
  const referralData = useQuery(['data'], () => getReferralcode());
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const divElement = useRef();

  const handleSubmit = () => {
    setText(divElement.current.value);
  };

  useEffect(() => {
    document.title = 'Referral';
  });

  return (
    <>
      <div id="ReferralSystem">
        {referralData.isLoading || referralData.isRefetching ? (
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: '300px', width: '300px' }}
          ></Player>
        ) : referralData.error ? (
          <p>{referralData.error.message}</p>
        ) : (
          <div id="ReferralCode">
            <h1>Your Referral Code: </h1>
            <h2>Get 10% Discount by sharing it with your friends!</h2>
            <input
              disabled
              id="code"
              ref={divElement}
              value={referralData.data.rows[0].referral_code}
            ></input>
          </div>
        )}
        {isCopied ? (
          <p className="success-msg">Text copied to clipboard</p>
        ) : null}

        <CopyToClipboard
          text={text}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1000);
          }}
        >
          <button id="copytext" onClick={handleSubmit}>
            COPY
          </button>
        </CopyToClipboard>
      </div>
    </>
  );
}

export default function ReferralSystemScreen() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReferralSystem />
    </QueryClientProvider>
  );
}
