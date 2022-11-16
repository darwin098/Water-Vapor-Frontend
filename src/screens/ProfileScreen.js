import React, { useEffect } from 'react';
import UpdateInput from '../components/Update';
import { Player } from '@lottiefiles/react-lottie-player';
import { getUserInformation, verifyUser } from '../api';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function UserProfile() {
  const { data, isLoading, error } = useQuery('info', () =>
    getUserInformation()
  );

  useEffect(() => {
    document.title = 'Profile Page';
    let requestToken = localStorage.getItem('token');

    if (!requestToken) {
      alert('Please sign in first!');
      window.location.href = '/';
    } else if (requestToken) {
      verifyUser(requestToken);
    }
  });

  return (
    <div id="ProfileContent">
      <div id="Profheader">
        <p id="headerText">Profile:</p>
      </div>

      {isLoading ? (
        <Player
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
          style={{ height: '300px', width: '300px' }}
        ></Player>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div>
          <UpdateInput data={data} />
        </div>
      )}
    </div>
  );
}

function ProfileContent() {
  useEffect(() => {
    document.title = 'Update User';
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserProfile />
    </QueryClientProvider>
  );
}

export default ProfileContent;
