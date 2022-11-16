import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function RegisterInput(props) {
    const [Email, updateEmail] = useState('');
    const [ConfirmEmail, UpdateConfirmEmail] = useState('');
    const [Username, UpdateUsername] = useState('');
    const [Password, UpdatePassword] = useState('');
    const [ConfirmPassword, UpdateConfirmPassword] = useState('');

    const [Status, SetStatus] = useState(true);
    const [Status1, SetStatus1] = useState(true);
    const [Icon, SetIcon] = useState(true);
    const [Icon1, SetIcon1] = useState(true);

    useEffect(() => {
        props.onChange({
            Email,
            ConfirmEmail,
            Username,
            Password,
            ConfirmPassword
        });
    }, [Email, ConfirmEmail, Username, Password, ConfirmPassword]);

    const ShowPass = () => {
        if (Icon == true) {
            SetStatus(false)
            SetIcon(false)
        } else {
            SetStatus(true)
            SetIcon(true)
        }
    }

    const ShowCon = () => {
        if (Icon1 == true) {
            SetStatus1(false)
            SetIcon1(false)
        } else {
            SetStatus1(true)
            SetIcon1(true)
        }
    }

    return (
        <div id="accountInput">
            <div id="createRow">
                <div id="inputHeader">Email:</div>
                <input
                    type="email"
                    id="Email"
                    maxLength="255"
                    placeholder=""
                    onChange={(event) => updateEmail(event.target.value)}
                />
            </div>
            <p></p>
            <div id="createRow">
                <div id="inputHeader">Confirm Email:</div>
                <input
                    type="email"
                    id="ConfirmEmail"
                    maxLength="255"
                    placeholder=""
                    onChange={(event) => UpdateConfirmEmail(event.target.value)}
                />
            </div>
            <p></p>
            <div id="createRow">
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
            <div id="createRow">
                <div id="PasswordHeader1">Password:</div>
                <div id="passwordSection1">
                    <input
                        type={ Status ? "password" : "text"}
                        id="Password"
                        maxLength="255"
                        placeholder=""
                        onChange={(event) => UpdatePassword(event.target.value)}
                    />
                    <FontAwesomeIcon
                        id="RegIcon"
                        onClick={() => ShowPass()}
                        icon={Icon ? faEye : faEyeSlash}
                    />
                </div>
            </div>
            <p></p>
            <div id="createRow">
                <div id="PasswordHeader2">Confirm Password:</div>
                <div id="passwordSection2">
                    <input
                        type={ Status1 ? "password" : "text"}
                        id="ConfirmPassword"
                        maxLength="255"
                        placeholder=""
                        onChange={(event) => UpdateConfirmPassword(event.target.value)}
                    />
                    <FontAwesomeIcon
                        id="RegIcon"
                        onClick={() => ShowCon()}
                        icon={Icon1 ? faEye : faEyeSlash}
                    />
                </div>
            </div>
            <p></p>
        </div>
    );
}

export default RegisterInput;