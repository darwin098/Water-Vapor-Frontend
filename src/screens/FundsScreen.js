import React, { useEffect } from "react";
import { getUserInformation, verifyUser } from "../api";
import FundsInput from "../components/Funds";
import { Player } from '@lottiefiles/react-lottie-player';

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: false,
        },
    },
});

function FundsProfile() {
    const { data, isLoading, error} = useQuery('info', () => getUserInformation());

    useEffect(() => {
        document.title = 'Funds Page';
        let requestToken = localStorage.getItem('token');
    
        if (!requestToken) {
            alert('Please sign in first!');
            window.location.href = '/';
        } else if (requestToken) {
            verifyUser(requestToken);
        }
    });

    return (
        <div id="FundsContent">
            <div id="Fundheader">
                <p id="headerText">Update account:</p>
            </div>

            { isLoading ? (
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
                    <FundsInput data={data}/>
                </div>
            )}
            <p></p>
        </div>
    )
}

function FundsContent() {    
    return (
        <QueryClientProvider client={queryClient}>
            <FundsProfile />
        </QueryClientProvider>
    );
}

export default FundsContent