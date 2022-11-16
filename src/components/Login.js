import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginInput(props) {
    const [Username, UpdateUsername] = useState('');
    const [Password, UpdatePassword] = useState('');
    const [Status, SetStatus] = useState(true);
    const [Icon, SetIcon] = useState(true);

useEffect(() => {
    props.onChange({
        Username,
        Password,
    });
}, [Username, Password]);

    const Show = () => {
        if (Icon == true) {
            SetStatus(false)
            SetIcon(false)
        } else {
            SetStatus(true)
            SetIcon(true)
        }
    }

    return (
        <div id="accountInput">
            <div>
                <div id="loginRow">
                    <div id="inputHeader">Username:</div>
                    <input
                    type="text"
                    id="Username"
                    maxLength="255"
                    placeholder=""
                    onChange={(event) => UpdateUsername(event.target.value)}
                />
                </div>
                <p></p>
                <div id="loginRow">
                    <div id="inputHeader">Password:</div>
                    <div id="passwordInput">
                        <input
                            type={ Status ? "password" : "text"}
                            id="Password"
                            maxLength="255"
                            placeholder=""
                            onChange={(event) => UpdatePassword(event.target.value)}
                        />
                        <FontAwesomeIcon
                            id="Icon"
                            onClick={() => Show()}
                            icon={Icon ? faEye : faEyeSlash}
                        />
                    </div>
                </div>
                <p></p>
            </div>
        </div>
    );
}

export default LoginInput;
