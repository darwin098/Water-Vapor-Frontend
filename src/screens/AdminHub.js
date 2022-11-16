import React, { useEffect, useState } from "react";
import { getAllGame, addGames, DisableGame, EnableGame, getAllUser, updateRole, getAllReferral, getAllAdvert, removeAllAdvert, removeOneAdvert, addAdvert } from "../api";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";
import Modal from "react-modal";
import { Player } from '@lottiefiles/react-lottie-player';

function AdminHub() {
  const [isOpen, setIsOpen] = useState(false);
  const textInputCategory = React.createRef();
  const textInputGameName = React.createRef();
  const textInputDescription = React.createRef();
  const textInputRating = React.createRef();
  const textInputPrice = React.createRef();

  const [Category, getCategory] = useState('');
  const [GameName, getGame] = useState('');
  const [Description, getDescription] = useState('');
  const [Rating, getRating] = useState('');
  const [Price, getPrice] = useState('');

  const textInputGameID = React.createRef();
  const textInputAdvertText = React.createRef();

  const [Game_ID, SetGameID] = useState('');
  const [Advert_Text, SetAdvertText] = useState('');

  const [DisabledGame, getDisabledGame] = useState([]);
  const [EnabledGame, getEnabledGame] = useState([]);
  const [ManageGame, ShowGame] = useState('false');
  const [ManageUser, ShowUser] = useState('false');
  const [ManageReferral, ShowReferral] = useState('false');
  const [ManageAdvert, ShowAdvert] = useState('false');
  const [userid, getUserId] = useState([]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const { isLoading: LoadinggetAllGamedata, data: getAllGamedata, isRefetching: RefetchinggetAllGamedata, isError: AllGamedataerror } = useQuery(['getAllGamedata'], () => getAllGame());
  const { isLoading: LoadinggetAllUserdata, data: getAllUserdata, isRefetching: RefetchinggetAllUserdata, isError: AllUserdataerror } = useQuery(['getAllUserdata'], () => getAllUser());
  const { isLoading: LoadinggetReferralcodedata, data: getReferralcodedata, isRefetching: RefetchingReferralcodedata, isError: Referralcodedataerror } = useQuery(['getReferralcodedata'], () => getAllReferral());
  const { isLoading: LoadinggetAllAdvertdata, data: getAllAdvertdata, isRefetching: RefetchinggetAllAdvertdata, isError: AllAdvertdataerror } = useQuery(['getAllAdvertdata'], () => getAllAdvert());

  useQuery(['Data', Category, GameName], () =>
    addGames(GameName, Category, Description, Rating, Price)
  );
  useQuery(['Data', DisabledGame], () => DisableGame(DisabledGame));
  useQuery(['Data', EnabledGame], () => EnableGame(EnabledGame));
  useQuery(['Data', userid], () => updateRole(userid))
  useQuery(['Data', Game_ID, Advert_Text], () => addAdvert(Game_ID, Advert_Text));

  useEffect(() => {
    document.title = 'Admin Hub';
    var type = localStorage.getItem('type');
    if (type != 'Admin') {
      alert('Not an Admin!');
      window.location.replace('/');
    }
  });

  const removeGameAdvert = useMutation((game_id) => {
    return removeOneAdvert(game_id);
  })

  const RemoveGameAdvert = async (game_id) => {
    await removeGameAdvert.mutate(game_id);
    window.location.reload();
  }

  const removeAllGameAdvert = useMutation(() => {
    return removeAllAdvert();
  })

  const RemoveAllGameAdvert = async () => {
    await removeAllGameAdvert.mutate();
    window.location.reload();
  }

  const addGameAdvert = useMutation((game_id, advert_text) => {
    return addAdvert(game_id, advert_text);
  })

  const AddGameAdvert = async (game_id, advert_text) => {
    console.log(game_id);
    console.log(advert_text);
    await addGameAdvert.mutate(game_id, advert_text);
    // window.location.reload();
  }

  return (
    <>
      <div id="Admin">
        <div id="AdminManage">
          <div>
            <button onClick={() => { ShowGame("true"); ShowUser("false"); ShowReferral("false"); ShowAdvert("false"); }}> Manage Game</button>
          </div>
          <br></br>
          <div>
            <button onClick={() => { ShowUser("true"); ShowGame("false"); ShowReferral("false"); ShowAdvert("false"); }}> Manage User</button>
          </div>
          <br></br>
          <div id="ManageReferral">
            <button onClick={() => { ShowReferral("true"); ShowGame("false"); ShowUser("false"); ShowAdvert("false"); }}> Manage Referral System</button>
          </div>
          <br />
          <div>
            <button onClick={() => { ShowAdvert("true"); ShowGame("false"); ShowUser("false"); ShowReferral("false") }}> Manage Adverts</button>
          </div>
        </div>
        {ManageGame == 'true' && (
          <div id="AdminManageTable">
            <div id="AdminManageGame">
              <button id="addGame" onClick={toggleModal}>
                Add Game
              </button>
            </div>

            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
              <h1>Add Games</h1>
              <hr></hr>
              <div id="GameContainer">
                <label>Game Name</label>

                <input ref={textInputGameName} id="TextGame"></input>
              </div>
              <div id="GameContainer">
                <label>Category</label>
                <input ref={textInputCategory} id="TextGame"></input>
              </div>
              <div id="GameContainer">
                <label>Description</label>
                <input ref={textInputDescription} id="TextGame"></input>
              </div>
              <div id="GameContainer">
                <label>Rating</label>
                <input ref={textInputRating} id="TextGame"></input>
              </div>
              <div id="GameContainer">
                <label>Price</label>
                <input ref={textInputPrice} id="TextGame"></input>
              </div>
              <div id="buttonAddGame">
                <button onClick={toggleModal}>Close</button>
                <button
                  id="AddingGames"
                  onClick={() => {
                    getGame(textInputGameName.current.value);
                    getCategory(textInputCategory.current.value);
                    getDescription(textInputDescription.current.value);
                    getRating(textInputRating.current.value);
                    getPrice(textInputPrice.current.value);
                  }}
                >
                  Add
                </button>
              </div>
            </Modal>
            <thead>
              <tr>
                <th scope="col">game id</th>
                <th scope="col">game name</th>
                <th scope="col">category</th>
                <th scope="col">description</th>
                <th scope="col">rating</th>
                <th scope="col">price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {LoadinggetAllGamedata || RefetchinggetAllGamedata ? (
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
                style={{ height: '300px', width: '300px' }}
              ></Player>
            ) : AllGamedataerror ? (
              <p>{AllGamedataerror.error.message}</p>
            ) : (
              getAllGamedata?.rows.map((Game) =>
                Game.status == 'DISABLED' ? (
                  <tr>
                    <td>{Game.game_id}</td>
                    <td id="gamename">{Game.game_name}</td>
                    <td>{Game.category}</td>
                    <td id="description">{Game.description}</td>
                    <td id="rating">{Game.rating}</td>
                    <td id="price">{Game.price}</td>
                    <td>
                      <button
                        id="background-red"
                        onClick={() => {
                          getEnabledGame(Game.game_id);
                        }}
                      >
                        DISABLED
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{Game.game_id}</td>
                    <td id="gamename">{Game.game_name}</td>
                    <td>{Game.category}</td>
                    <td id="description">{Game.description}</td>
                    <td id="rating">{Game.rating}</td>
                    <td id="price">{Game.price}</td>
                    <td>
                      <button
                        id="background-blue"
                        onClick={() => getDisabledGame(Game.game_id)}
                      >
                        ENABLED
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </div>
        )}
        {ManageUser == 'true' && (
          <div id="AdminManageTable">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">User</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {LoadinggetAllUserdata || RefetchinggetAllUserdata ? (
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
                style={{ height: '300px', width: '300px' }}
              ></Player>
            ) : AllUserdataerror ? (
              <p>{AllUserdataerror.message}</p>
            ) : (
              getAllUserdata?.rows.map((User) => (
                <tr>
                  <td>{User.id}</td>
                  <td id="user">{User.username}</td>
                  <td id="type">{User.type}</td>
                  <td id="action">
                    <button onClick={() => getUserId(User.id)}>
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))
            )}
          </div>
        )}

        {ManageReferral == 'true' && (
          <div id="AdminManageTable">
            <thead>
              <tr>
                <th scope="col">User id</th>
                <th scope="col">Referral_Code</th>
              </tr>
            </thead>
            {LoadinggetReferralcodedata || RefetchingReferralcodedata ? (
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
                style={{ height: '300px', width: '300px' }}
              ></Player>
            ) : Referralcodedataerror ? (
              <p>{Referralcodedataerror.message}</p>
            ) : (
              getReferralcodedata?.rows.map((Referral) => (
                <tr>
                  <td id="userid">{Referral.userid}</td>
                  <td id="referral">{Referral.referral_code} </td>
                </tr>
              ))
            )}
          </div>
        )}

        {ManageAdvert == "true" && (
          <div id="AdminManageTable">
            <div id="AdminManageGame">
              <button id="addGame" onClick={toggleModal}>Add Advert</button>
              {/* <br/> */}
              <button id="removeAll" onClick={() => {RemoveAllGameAdvert()}}>Remove All</button>
            </div>

            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
              <h1>Add Advert</h1>
              <hr></hr>
              <div id="GameContainer">
                <label>Game Id</label>
                <input ref={textInputGameID} id="TextGame"></input>
                {/* <input 
                  value={Game_ID} 
                  onChange={(e) => SetGameID(e.target.value)} 
                  id="TextGame"
                ></input> */}
              </div>
              <div id="GameContainer">
                <label>Advert Text</label>
                <input ref={textInputAdvertText} id="TextGame"></input>
                {/* <input 
                  value={Advert_Text} 
                  onChange={(e) => SetAdvertText(e.target.value + '')} 
                  id="TextGame"
                ></input> */}
              </div>
              <div id="buttonAddGame">
                <button onClick={toggleModal}>Close</button>
                <button id="AddingGames" onClick={() => {
                  // AddGameAdvert(Game_ID, Advert_Text)
                  SetGameID(textInputGameID.current.value);
                  SetAdvertText(textInputAdvertText.current.value);
                  // window.location.reload();
                }}>Add</button>
              </div>
            </Modal>
            
            <thead>
              <tr>
                <th scope="col">game id</th>
                <th scope="col">game name</th>
                <th scope="col">advert text</th>
              </tr>
            </thead>
            {LoadinggetAllAdvertdata || RefetchinggetAllAdvertdata ?
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
                style={{ height: '300px', width: '300px' }}
              ></Player>

              : AllAdvertdataerror ? (
                <p>{AllAdvertdataerror.error.message}</p>

              )
                :

                (
                  getAllAdvertdata?.rows.map((Advert) =>
                      <tr>
                        <td>{Advert.game_id}</td>
                        <td id="gamename">{Advert.game_name}</td>
                        <td id="description">{Advert.advert_text}</td>
                        <button id="btn-red" onClick={() => {RemoveGameAdvert(Advert.game_id)}}>Remove</button>
                      </tr>
                  ))
            }

          </div>
        )}
      </div>
    </>
  );
}
export default function AdminHubScreen() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AdminHub />
    </QueryClientProvider>
  );
}
