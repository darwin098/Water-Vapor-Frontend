import React, { useEffect, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from 'react-query';
import { getAllGiftCard, getusername, PurchaseGiftCard } from '../api';
import { Player } from '@lottiefiles/react-lottie-player';

function GiftCard() {
  const [button, buttonactive] = useState('buttonstyle');
  const [button1, buttonactive1] = useState('buttonstyle');
  const [button2, buttonactive2] = useState('buttonstyle');
  const [button3, buttonactive3] = useState('buttonstyle');
  const [button4, buttonactive4] = useState('buttonstyle');
  const [show, setshow] = useState('false');
  const textName = React.createRef();
  const textMessage = React.createRef();
  const ToUserName = React.createRef();
  const TextQuantity = React.createRef();
  const [Quantity, getQuantity] = useState('');
  const [UserName, GetUserName] = useState('');
  const [Amount, getAmount] = useState('');
  const [Name, getName] = useState('');
  const [Message, getMessage] = useState('');
  const { isLoading, data, isRefetching, error } = useQuery(
    ['getAllGiftCard'],
    () => getAllGiftCard()
  );
  const { data: username } = useQuery(['username'], () => getusername());

  const PurchaseGiftCards = useMutation(() => {
    return PurchaseGiftCard(
      Amount,
      localStorage.getItem('Id'),
      UserName,
      Quantity,
      Name,
      Message
    );
  });

  const checkUser = () => {
    const token = localStorage.getItem('token');
    if (token == null) {
      alert('Please login');
    } else {
      alert(`Are you sure you want to purchase ${Quantity}x Gift Card?`);

      console.log(UserName);
      console.log(Message);
      PurchaseGiftCards.mutate();
    }
  };

  useEffect(() => {
    document.title = 'Gift Card';
  });

  return (
    <>
      <div id="giftcard">
        <h1>Gift Card</h1>

        {isLoading || isRefetching ? (
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: '300px', width: '300px' }}
          ></Player>
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <>
            {data?.rows.map((GiftCard) => (
              <div id="GiftCardWrapper">
                <img
                  id="imagegiftcard"
                  src={
                    'https://water-vapor.onrender.com/Images/' +
                    GiftCard.giftcard_img_url
                  }
                ></img>
                <div id="amount">
                  <p>GIFT AMOUNT:</p>
                  <button
                    id={button}
                    onClick={() => {
                      getAmount(GiftCard.amount[0]);
                      buttonactive('buttonstyleactive');
                      buttonactive1('buttonstyle');
                      buttonactive2('buttonstyle');
                      buttonactive3('buttonstyle');
                      buttonactive4('buttonstyle');

                      setshow('true');
                    }}
                    onChange={(e) => getAmount(GiftCard.amount[0])}
                  >
                    {'$' + GiftCard.amount[0]}
                  </button>
                  <button
                    id={button1}
                    onClick={() => {
                      getAmount(GiftCard.amount[1]);
                      buttonactive('buttonstyle');
                      buttonactive1('buttonstyleactive');
                      buttonactive2('buttonstyle');
                      buttonactive3('buttonstyle');
                      buttonactive4('buttonstyle');
                      setshow('true');
                    }}
                    onChange={(e) => getAmount(GiftCard.amount[1])}
                  >
                    {'$' + GiftCard.amount[1]}
                  </button>
                  <button
                    id={button2}
                    onClick={() => {
                      getAmount(GiftCard.amount[2]);
                      buttonactive('buttonstyle');
                      buttonactive1('buttonstyle');
                      buttonactive2('buttonstyleactive');
                      buttonactive3('buttonstyle');
                      buttonactive4('buttonstyle');
                      setshow('true');
                    }}
                    onChange={(e) => getAmount(GiftCard.amount[2])}
                  >
                    {'$' + GiftCard.amount[2]}
                  </button>
                  <button
                    id={button3}
                    onClick={() => {
                      getAmount(GiftCard.amount[3]);
                      buttonactive('buttonstyle');
                      buttonactive1('buttonstyle');
                      buttonactive2('buttonstyle');
                      buttonactive3('buttonstyleactive');
                      buttonactive4('buttonstyle');
                      setshow('true');
                    }}
                    onChange={(e) => getAmount(GiftCard.amount[3])}
                  >
                    {'$' + GiftCard.amount[3]}
                  </button>
                  <button
                    id={button4}
                    onClick={() => {
                      getAmount(GiftCard.amount[4]);
                      buttonactive('buttonstyle');
                      buttonactive1('buttonstyle');
                      buttonactive2('buttonstyle');
                      buttonactive3('buttonstyle');
                      buttonactive4('buttonstyleactive');
                      setshow('true');
                    }}
                    onChange={(e) => getAmount(GiftCard.amount[4])}
                  >
                    {'$' + GiftCard.amount[4]}
                  </button>
                </div>

                {show == 'true' && (
                  <div id="messagecontainer">
                    <div id="usercontainer">
                      <select
                        id="menu"
                        ref={ToUserName}
                        onChange={(e) => GetUserName(ToUserName.current.value)}
                      >
                        <option>Select User you want to sent</option>
                        {username?.rows.map((Username) => (
                          <option>{Username.id}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        id="textname"
                        ref={textName}
                        onChange={(e) => getName(textName.current.value)}
                        placeholder="From"
                      ></input>
                      <div>
                        <textarea
                          id="Message"
                          ref={textMessage}
                          onChange={(e) =>
                            getMessage(textMessage.current.value)
                          }
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <input
                    ref={TextQuantity}
                    onChange={(e) => getQuantity(TextQuantity.current.value)}
                    id="quantityinput"
                    type="number"
                    min="1"
                    max="10"
                  />
                  <button id="buybutton" onClick={() => checkUser()}>
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default function GiftCardScreen() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GiftCard />
    </QueryClientProvider>
  );
}
