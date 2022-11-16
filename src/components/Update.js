import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { updateProfile, updateImg } from '../api'
import { Player } from '@lottiefiles/react-lottie-player';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function UpdateInput(props) {
    const [Username, UpdateUsername] = useState('');
    const [Email, UpdateEmail] = useState('');
    const [Password, UpdatePassword] = useState('');
    const [ConfirmPassword, UpdateConfirmPassword] = useState('');
    const [imageURL, UpdateimageURL] = useState('');

    const [ profStatus, setprofStatus ] = useState(true);
    const [ btnStatus, setbtnStatus ] = useState(true);

    const [ profileState, setprofileState ] = useState(true);
    const [ loadingState, setloadingState ] = useState(true);

    const [Status, SetStatus] = useState(true);
    const [Status1, SetStatus1] = useState(true);
    const [Icon, SetIcon] = useState(true);
    const [Icon1, SetIcon1] = useState(true);

    const [ errorMessage, seterrorMessage ] = useState('');

    const mutation = useMutation(UserUpdate => {
        return updateProfile(UserUpdate).then((response) => {
            if (response.message == "Email has already been taken") {
                seterrorMessage(response.message);
            } else if (response.message == "Password has already been taken") {
                seterrorMessage(response.message);
            } else {
                window.location.pathname = '/profile'
            }
        })
    })

    const ImgMutation = useMutation(ImgUpdate => {
        return updateImg(ImgUpdate).then(() => {
            window.location.pathname = '/profile'
        })
    })

    if (ImgMutation.isError == true) {
        alert("Error uploading image");
        window.location.pathname = '/profile';
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setprofStatus(true);
        setbtnStatus(true);
        mutation.mutate({ username: Username, email: Email, password: Password  })
    }

    const submitImg = (event) => {
        event.preventDefault();
        setprofStatus(true);
        setbtnStatus(true);
        ImgMutation.mutate({ file: imageURL })
    }

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
        <div>
            {
                profileState == true && loadingState == true ? (
                    <div id="Update-row">
                        <div id="Image">
                            <img
                            id='Profile_IMG'
                            src={
                                'https://ades-ades-ades.herokuapp.com/Images/' + 
                                props.data.profile_pic_url
                            }
                            />
                        </div>

                        <form id="ImageInput" onSubmit={ (event) => {submitImg(event); setprofileState(false); seterrorMessage('')}}>
                            <div id="ImageHeader">Update Profile Image:</div>
                            <input type="file" id="userProfile" onChange={(event) => {UpdateimageURL(event.target.files[0]); setprofStatus(false)}}/>
                            <button type="submit" id="Update" disabled={profStatus}>
                                Update
                            </button>
                        </form>

                        <form id="ProfileInput" onSubmit={ (event) => {submitHandler(event); setloadingState(false)}}>
                            <div className="Update-row">
                                <div id="UsernameHeader">Username:</div>
                                <input
                                    className="user_input"
                                    type="text"
                                    name="Account"
                                    id="Username_input"
                                    maxLength="255"
                                    placeholder={props.data.username}
                                    onChange={(event) => {UpdateUsername(event.target.value); setbtnStatus(false)}}
                                />
                            </div>
                            <p></p>
                            <div className="Update-row">
                                <div id="EmailHeader">Email:</div>
                                <input
                                    className="user_input"
                                    type="text"
                                    name="Account"
                                    id="Email_input"
                                    maxLength="255"
                                    placeholder={props.data.email}
                                    onChange={(event) => {UpdateEmail(event.target.value); setbtnStatus(false)}}
                                />
                            </div>
                            <p></p>
                            <div className="Update-row">
                                <div id="PasswordHeader">New password:</div>
                                <div id="UpdateInput">
                                    <input
                                        className="user_input"
                                        type={ Status ? "password" : "text"}
                                        name="Account"
                                        id="New_password_input"
                                        maxLength="255"
                                        onChange={(event) => {UpdatePassword(event.target.value); setbtnStatus(false)}}
                                    />
                                    <FontAwesomeIcon
                                        id="NewIcon"
                                        onClick={() => ShowPass()}
                                        icon={Icon ? faEye : faEyeSlash}
                                    />
                                </div>
                            </div>
                            <p></p>
                            <div className="Update-row">
                                <div id="PasswordHeader">Confirm password:</div>
                                <div id="UpdateInput">
                                    <input
                                        className="user_input"
                                        type={ Status1 ? "password" : "text"}
                                        name="Account"
                                        id="Confirm_new_password_input"
                                        maxLength="255"
                                        onChange={(event) => {UpdateConfirmPassword(event.target.value); setbtnStatus(false)}}
                                    />
                                    <FontAwesomeIcon
                                        id="NewIcon"
                                        onClick={() => ShowCon()}
                                        icon={Icon1 ? faEye : faEyeSlash}
                                    />
                                </div>
                            </div>
                            <p></p>
                            <div id="Buttons">
                                <button type="submit" className="btn" id="UpdateInfo" disabled={btnStatus}>
                                    Update profile
                                </button>
                            </div>
                            <p></p>
                        </form>
                    </div>
                ) : (
                    <>
                        {errorMessage !== "" ? (
                            <div>
                                <div id="errorInput">
                                    <div>An error occurred: { errorMessage }</div>
                                    <p></p>
                                </div>

                                <div id="Update-row">
                                    <div id="Image">
                                        <img
                                        id='Profile_IMG'
                                        src={
                                            'https://ades-ades-ades.herokuapp.com/Images/' + 
                                            props.data.profile_pic_url
                                        }
                                        />
                                    </div>

                                    <form id="ImageInput" onSubmit={ (event) => {submitImg(event); setprofileState(false)}}>
                                        <div id="ImageHeader">Update Profile Image:</div>
                                        <input type="file" id="userProfile" onChange={(event) => {UpdateimageURL(event.target.files[0]); setprofStatus(false)}}/>
                                        <button type="submit" id="Update" disabled={profStatus}>
                                            Update
                                        </button>
                                    </form>

                                    <form id="ProfileInput" onSubmit={ (event) => {submitHandler(event); setloadingState(false); seterrorMessage('')} }>
                                        <div className="Update-row">
                                            <div id="UsernameHeader">Username:</div>
                                            <input
                                                className="user_input"
                                                type="text"
                                                name="Account"
                                                id="Username_input"
                                                maxLength="255"
                                                placeholder={props.data.username}
                                                onChange={(event) => {UpdateUsername(event.target.value); setbtnStatus(false)}}
                                            />
                                        </div>
                                        <p></p>
                                        <div className="Update-row">
                                            <div id="EmailHeader">Email:</div>
                                            <input
                                                className="user_input"
                                                type="text"
                                                name="Account"
                                                id="Email_input"
                                                maxLength="255"
                                                placeholder={props.data.email}
                                                onChange={(event) => {UpdateEmail(event.target.value); setbtnStatus(false)}}
                                            />
                                        </div>
                                        <p></p>
                                        <div className="Update-row">
                                            <div id="PasswordHeader">New password:</div>
                                            <div id="UpdateInput">
                                                <input
                                                    className="user_input"
                                                    type={ Status ? "password" : "text"}
                                                    name="Account"
                                                    id="New_password_input"
                                                    maxLength="255"
                                                    onChange={(event) => {UpdatePassword(event.target.value); setbtnStatus(false)}}
                                                />
                                                <FontAwesomeIcon
                                                    id="NewIcon"
                                                    onClick={() => ShowPass()}
                                                    icon={Icon ? faEye : faEyeSlash}
                                                />
                                            </div>
                                        </div>
                                        <p></p>
                                        <div className="Update-row">
                                            <div id="PasswordHeader">Confirm password:</div>
                                            <div id="UpdateInput">
                                                <input
                                                    className="user_input"
                                                    type={ Status1 ? "password" : "text"}
                                                    name="Account"
                                                    id="Confirm_new_password_input"
                                                    maxLength="255"
                                                    onChange={(event) => {UpdateConfirmPassword(event.target.value); setbtnStatus(false)}}
                                                />
                                                <FontAwesomeIcon
                                                    id="NewIcon"
                                                    onClick={() => ShowCon()}
                                                    icon={Icon1 ? faEye : faEyeSlash}
                                                />
                                            </div>
                                        </div>
                                        <p></p>
                                        <div id="Buttons">
                                            <button type="submit" className="btn" id="UpdateInfo" disabled={btnStatus}>
                                                Update profile
                                            </button>
                                        </div>
                                        <p></p>
                                    </form>
                                </div>
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

export default UpdateInput;