import React, { useState, useEffect } from 'react';
import LoginInput from '../components/Login';
import { userLogin } from '../api';
import { Player } from '@lottiefiles/react-lottie-player';

import { useMutation, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: false,
        },
    },
});

function LoginUser() {
    const [LoginContent, setLoginContent] = useState({});
    const [loadingState, setloadingState] = useState(true);
    const [errorMessage, seterrorMessage] = useState('');

    useEffect(() => {
        document.title = 'Login Page';
    });

    const mutation = useMutation((login) => {
        return userLogin(login).then((response) => {
            if (response.message == 'Username or Password is Incorrect') {
                seterrorMessage(response.message)
            } else {
                const Id = response.result.id;
                const type = response.result.type;
                const token = response.token;
                const accessToken = response.accessToken;
    
                localStorage.setItem('Id', Id);
                localStorage.setItem('type', type);
                localStorage.setItem('token', token);
                localStorage.setItem('accessToken', accessToken);
                window.location.pathname = '/';
            }
        });
    });

    const SignIn = (event) => {
        event.preventDefault();
        window.location.pathname = '/register';
    };

    const Login = (event) => {
        event.preventDefault();
        mutation.mutate({ LoginContent: LoginContent });
    };

    return (
        <div id="LoginContent">
            <div id="Logheader">
                <p id="headerText">Login:</p>
            </div>

            {
                loadingState == true ? (
                    <div>
                        <LoginInput onChange={setLoginContent}/>
                        <p></p>

                        <div id="Buttons">
                            <button type="submit" className="btn" id="SignIn" onClick={(event) => SignIn(event)}>
                                Sign up
                            </button>
                            <button type="submit" className="btn" id="LogIn" onClick={(event) => {Login(event); setloadingState(false); seterrorMessage("")}}>
                                Log In
                            </button>
                        </div>
                        <p></p>
                    </div>
                ) : (
                    <>
                        {errorMessage !== "" ? (
                        <div>
                            <div id="errorInput">
                                <div>An error occurred: {errorMessage}</div>
                                <p></p>
                            </div>
                            
                            <LoginInput onChange={setLoginContent}/>
                            <p></p>

                            <div id="Buttons">
                                <button type="submit" className="btn" id="SignIn" onClick={(event) => SignIn(event)}>
                                    Sign up
                                </button>
                                <button type="submit" className="btn" id="LogIn" onClick={(event) => {Login(event); setloadingState(false); seterrorMessage("")}}>
                                    Log In
                                </button>
                            </div>
                            <p></p>
                        </div>
                        ) : (
                            <Player
                            autoplay
                            loop
                            src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
                            style={{ height: '300px', width: '300px' }}
                            ></Player>
                        )}
                    </>
                )
            }
        </div>
    )
}

function LoginContent() {
    return (
    <QueryClientProvider client={queryClient}>
        <LoginUser />
    </QueryClientProvider>
    );
}

export default LoginContent;
