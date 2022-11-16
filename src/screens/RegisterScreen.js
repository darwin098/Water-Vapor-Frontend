import React, { useState, useEffect } from "react";
import RegisterInput from "../components/Register";
import { userRegister } from "../api";
import { Player } from '@lottiefiles/react-lottie-player';

import {
    useMutation,
    QueryClient,
    QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: false,
        },
    },
});

function RegisterUser() {
    const [ RegisterContent, setRegisterContent] = useState({});
    const [ loadingState, setloadingState] = useState(true);
    const [ errorMessage, seterrorMessage ] = useState('');

    useEffect(() => {
        document.title = 'Register Page';
    });

    const mutation = useMutation((register) => {
        return userRegister(register).then((response) => {
            if (response.message == "Email has already been taken") {
                seterrorMessage(response.message);
            } else if (response.message == "Password has already been taken") {
                seterrorMessage(response.message);
            } else {
                window.location.pathname = '/login'
            }
        });
    });

    const Login = (event) => {
        event.preventDefault();
        window.location.pathname = '/login'
    }

    const SignIn = (event) => {
        event.preventDefault();
        mutation.mutate({ RegisterContent: RegisterContent });
    }

    return (
        <div id="registerContent">
            <div id="Regheader">
                <p id="headerText">Create an Account:</p>
            </div>

            {
                loadingState == true ? (
                    <div>
                        <RegisterInput onChange={setRegisterContent}/>

                        <div id="Buttons">
                        <button type="submit" className="btn btn-primary btn-back" id="Back" onClick={(event) => Login(event)}>
                            Back to login
                        </button>
                        <button type="submit" className="btn" id="Create" onClick={(event) => { SignIn(event); setloadingState(false); seterrorMessage("") }}>
                            Create account
                        </button>
                        </div>

                        <p></p>
                    </div>
                ) : (
                    <>
                        { errorMessage !== "" ? (
                            <div>
                                <div id="errorInput">
                                    <div>An error occurred: {errorMessage}</div>
                                    <p></p>
                                </div>

                                <RegisterInput onChange={setRegisterContent}/>

                                <div id="Buttons">
                                <button type="submit" className="btn btn-primary btn-back" id="Back" onClick={(event) => Login(event)}>
                                    Back to login
                                </button>
                                <button type="submit" className="btn" id="Create" onClick={(event) => { SignIn(event); setloadingState(false); seterrorMessage("") }}>
                                    Create account
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

function RegisterContent() {    
    return (
        <QueryClientProvider client={queryClient}>
            <RegisterUser />
        </QueryClientProvider>
    );
}

export default RegisterContent;