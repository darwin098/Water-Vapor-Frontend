import React, { useState } from 'react';
import { updateFunds } from '../api'
import { useMutation } from 'react-query';
import { Player } from '@lottiefiles/react-lottie-player';

function FundsInput(props) {
    const [cardNumber, UpdatecardNumber] = useState('');
    const [fundAmount, UpdatefundAmount] = useState('');

    const [ status, setStatus ] = useState(true);

    const [ fundState, setfundState ] = useState(true);
    const [ errorMessage, seterrorMessage ] = useState('')

    const mutation = useMutation(fundsUpdate => {
        return updateFunds(fundsUpdate).then((response) => {
            if (response.message !== undefined) {
                seterrorMessage(response)
            } else {
                window.location.pathname = '/'
            }
        })
    })

    const Back = (event) => {
        event.preventDefault();
        window.location.pathname = '/'
    }

    const submitFunds = (event) => {
        event.preventDefault();
        setfundState(false);
        mutation.mutate({ Card_Number: cardNumber, Amount_Retrieved: fundAmount })
    }

    return (
        <div>
            {
                fundState == true ? (
                    <form id="FundsInput" onSubmit={ (event) => {submitFunds(event);} }>
                        <div>
                            <div id="remainingFunds">
                                <div id="cardHeader">Current Balance:</div>
                                <input
                                    type="text"
                                    name="Account"
                                    id="remaining_Funds"
                                    maxLength="255"
                                    value={props.data.wallet}
                                    disabled
                                />
                            </div>
                            <p></p>
                        </div>

                        <div>
                            <div id="addFunds">
                                <div id="cardHeader">Card Number:</div>
                                <input
                                    type="text"
                                    name="Account"
                                    id="Card_Input"
                                    maxLength="255"
                                    placeholder=""
                                    onChange={(event) => {UpdatecardNumber(event.target.value); setStatus(false)}}
                                />
                            </div>

                            <p></p>

                            <div id="addFunds">
                                <div id="cardHeader">Amount to add:</div>
                                <input
                                    type="number"
                                    name="Account"
                                    id="Amount_Input"
                                    maxLength="255"
                                    placeholder=""
                                    min="0" max="999999"
                                    onChange={(event) => {UpdatefundAmount(event.target.value); setStatus(false)}}
                                />
                            </div>
                        </div>

                        <p></p>

                        <div>
                            <div>
                                <div id="Buttons">
                                    <button type="submit" id="Back" onClick={(event) => Back(event)}>
                                        Back
                                    </button>
                                    <button type="submit" id="Add" disabled={status} >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <>
                        {mutation.isError ? (
                            <form id="FundsInput" onSubmit={(event) => {submitFunds(event)}}>
                                <div id="errorInput">
                                    <div>An error occurred: {errorMessage}</div>
                                    <p></p>
                                </div>
                    
                                <div>
                                    <div id="remainingFunds">
                                        <div id="cardHeader">Current Balance:</div>
                                        <input
                                            type="text"
                                            name="Account"
                                            id="remaining_Funds"
                                            maxLength="255"
                                            value={props.data.wallet}
                                            disabled
                                        />
                                    </div>
                                    <p></p>
                                </div>
                                <div>
                                    <div id="addFunds">
                                        <div id="cardHeader">Card Number:</div>
                                        <input
                                            type="text"
                                            name="Account"
                                            id="Card_Input"
                                            maxLength="255"
                                            placeholder=""
                                            onChange={(event) => {UpdatecardNumber(event.target.value); setStatus(false)}}
                                        />
                                    </div>
                                    <p></p>
                                    <div id="addFunds">
                                        <div id="cardHeader">Amount to add:</div>
                                        <input
                                            type="text"
                                            name="Account"
                                            id="Amount_Input"
                                            maxLength="255"
                                            placeholder=""
                                            onChange={(event) => {UpdatefundAmount(event.target.value); setStatus(false)}}
                                        />
                                    </div>
                                </div>
                                <p></p>

                                <div>
                                    <div>
                                        <div id="Buttons">
                                            <button type="submit" id="Back" onClick={(event) => Back(event)}>
                                                Back
                                            </button>
                                            <button type="submit" id="Add" disabled={status} >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
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

export default FundsInput;