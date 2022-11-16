// import React, { useEffect, useState } from 'react';
// import { Player } from '@lottiefiles/react-lottie-player';
// import { verifyUser, AddGame, getGameTags } from '../api';

// import {
//   useMutation,
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from 'react-query';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// function AddGameContent() {
//   useEffect(() => {
//     let requestToken = localStorage.getItem('token');
//     let type = localStorage.getItem('type');

//     if (type !== 'Admin') {
//       alert('You are not an admin!');
//       window.location.href = '/';
//     }

//     if (!requestToken) {
//       alert('Please sign in first!');
//       window.location.href = '/';
//     } else if (requestToken) {
//       verifyUser(requestToken);
//     }
//   });

//   const mutation = useMutation(() => {
//     console.log(gameName);
//     console.log(price);
//     console.log(desc);
//     return AddGame(gameName, price, desc);
//   });

//   const tags = useQuery('tags', () => {
//     return getGameTags();
//   });

//   const [gameName, setGameName] = useState();
//   const [price, setPrice] = useState();
//   const [desc, setDesc] = useState();

//   const handleGameImgSubmit = (event) => {
//     event.preventDefault();
//     console.log(`Uploading game image`);
//   };

//   const handleAddGameSubmit = (event) => {
//     event.preventDefault();
//     console.log(`Adding new game`);

//     console.log(gameName);
//     console.log(price);
//     console.log(desc);
//     console.log(event.target);
//     // mutation.mutate();
//   };

//   return (
//     <div id="AddGameContent">
//       <form
//         onSubmit={(event) => {
//           handleGameImgSubmit(event);
//         }}
//       >
//         <div>Update Game Image:</div>
//         <input type="file" />
//         <button type="submit">Update</button>
//       </form>

//       <form
//         onSubmit={(event) => {
//           handleAddGameSubmit(event);
//         }}
//       >
//         <div>
//           <div>New Game Name:</div>
//           <input
//             type="text"
//             required
//             onChange={(event) => setGameName(event.target.value)}
//           />
//         </div>

//         <div>
//           <div>New Price:</div>
//           <input
//             type="number"
//             step="0.01"
//             required
//             onChange={(event) => setPrice(event.target.value)}
//           />
//         </div>

//         <div>
//           <div>New Description:</div>
//           <div>
//             <textarea
//               type="text"
//               required
//               onChange={(event) => setDesc(event.target.value)}
//             />
//           </div>
//         </div>

//         <div>
//           <button type="submit">Add Game</button>
//         </div>
//       </form>

//       <div>
//         {mutation.isLoading ? (
//           <Player
//             autoplay
//             loop
//             src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
//             style={{ height: '200px', width: '200px' }}
//           ></Player>
//         ) : (
//           <>
//             {mutation.isError ? (
//               <div>An error occurred: {mutation.error.message}</div>
//             ) : null}

//             {mutation.isSuccess ? (
//               <p className="add-game-response-section">{mutation.data}</p>
//             ) : null}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function AddGameScreen() {
//   useEffect(() => {
//     document.title = 'Add Game';
//   });

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AddGameContent />
//     </QueryClientProvider>
//   );
// }

// export default AddGameScreen;
