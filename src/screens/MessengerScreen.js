// import React, { useState, useEffect, useCallback } from 'react';
// import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
// import io from 'socket.io-client';

// function MessagingContent(props) {
//   return (
//     <ul id="test">
//       {props.data === [] ? (
//         props.data.map((message) => {
//           <li>
//             {message.sender}: {message.text}
//           </li>;
//         })
//       ) : (
//         <p>No msg</p>
//       )}
//     </ul>
//   );
// }

// function MessengerContent() {
//   const [message, setMessageValue] = useState('');
//   const [recipient, setRecipientValue] = useState(1);

//   const token = localStorage.getItem('token');
//   const socket = io('http://localhost:5000', {
//     auth: {
//       token: token,
//     },
//   });

//   const handleSend = (e) => {
//     e.preventDefault();

//     console.log(message);

//     socket.emit('send-message', { recipient, text: message });

//     setMessageValue('');
//     document.querySelector('#message-input').value = '';
//   };

//   useEffect(() => {
//     if (!socket) return;

//     socket.on('receive-message', (response) => {
//       console.log(response);
//       setMessages((messages) => [
//         ...messages,
//         { sender: response.sender, text: response.text },
//       ]);
//     });

//     return () => {
//       console.log(`turning off socket`);
//       socket.off('receive-message');
//     };
//   }, []);

//   return (
//     <div id="messenger-content">
//       <MessagingContent data />

//       <form
//         onSubmit={(e) => {
//           handleSend(e);
//         }}
//       >
//         <input
//           type="text"
//           id="message-input"
//           required
//           placeholder="message here"
//           onChange={(event) => setMessageValue(event.target.value)}
//         />
//         <input
//           id="user"
//           type="number"
//           required
//           placeholder="to user here"
//           onChange={(event) => setRecipientValue(event.target.value)}
//         />
//         <button type="submit">send</button>
//       </form>
//     </div>
//   );
// }

// function MessengerScreen() {
//   return <MessengerContent />;
// }

// export default MessengerScreen;
