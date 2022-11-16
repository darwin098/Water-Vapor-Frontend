import React from 'react';

import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

import { Route, useParams, Routes, BrowserRouter } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import GamesScreen from './screens/GamesScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import NoScreen from './screens/NoScreen';
import SingleGameScreen from './screens/SingleGameScreen';
import AdminHub from './screens/AdminHub';
import LoginContent from './screens/LoginScreen';
import RegisterContent from './screens/RegisterScreen';
import ProfileContent from './screens/ProfileScreen';
import FundsContent from './screens/FundsScreen';
import ClaimingKeysContent from './screens/ClaimingKeys';
import LibraryScreen from './screens/LibraryScreen';
import GiftCardLibraryScreen from './screens/GiftCardLibraryScreen';
// import MessengerScreen from './screens/MessengerScreen';
// import GiftCardScreen from './screens/GiftCard';
import ReferralSystem from './screens/ReferralSystem';
import GiftCardClaimScreen from './screens/ClaimGift';
// import AddGameScreen from './screens/AddGameScreen';
// import EditGameScreen from './screens/EditGameScreen';
// import MessengerScreen from './screens/MessengerScreen';
import GiftCardScreen from './screens/GiftCard';
// import ReferralSystem from './screens/ReferralSystem';

function App() {
  const GameIdWrapper = () => {
    const { gameId } = useParams();
    return <SingleGameScreen gameId={gameId} />;
  };

  return (
    <div>
      <NavBar />

      <div className="Main">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/gameslist" element={<GamesScreen />} />
            <Route path="/gamepage/:gameId" element={<GameIdWrapper />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/wishlist" element={<WishlistScreen />} />
            <Route path="/AdminHub" element={<AdminHub />} />
            <Route path="/ClaimKeys" element={<ClaimingKeysContent />} />
            <Route path="/GiftCard" element={<GiftCardScreen />} />
            <Route path="/ReferralSystem" element={<ReferralSystem />} />
            <Route path="/ClaimGiftCard" element={<GiftCardClaimScreen />} />
            <Route path="/Login" element={<LoginContent />} />
            <Route path="/Register" element={<RegisterContent />} />
            <Route path="/Profile" element={<ProfileContent />} />
            <Route path="/Funds" element={<FundsContent />} />
            <Route path="/Library" element={<LibraryScreen />} />
            <Route
              path="/GiftCardLibrary"
              element={<GiftCardLibraryScreen />}
            />
            <Route path="/GiftCardClaim" element={<GiftCardClaimScreen />} />
            {/* <Route path="/AddGames" element={<AddGameScreen />} /> */}
            {/* <Route path="/EditGames" element={<EditGameScreen />} /> */}
            {/* <Route path="/Messenger" element={<MessengerScreen />} /> */}
            <Route path="*" element={<NoScreen />} />
          </Routes>
        </BrowserRouter>
      </div>

      <FooterBar />
    </div>
  );
}

export default App;
