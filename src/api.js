const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

const STORAGE_API_HOST = isLocalhost
  ? `http://localhost:3000`
  : `https://ades-ades-ades.herokuapp.com`;

// const STORAGE_API_HOST = `https://ades-ades-ades.herokuapp.com`;

export function verifyUser(requestToken = localStorage.getItem('token')) {
  const url = new URL(`/check/user`, STORAGE_API_HOST);

  // If they are a user, and logged in before
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + requestToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Request Token Expired!') {
        localStorage.clear();
        alert('Session expired, please re-login :)');
        window.location.href('/login');
      } else {
        localStorage.setItem('accessToken', res.accessToken);
        return res;
      }
    });
}

/**
 * Gets The newest games
 * @returns JSON data of the newest 10 games
 */
export function getNewestGames() {
  const url = new URL(`/getGames/newest`, STORAGE_API_HOST);

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyword: '', lastId: 0 }),
  }).then((response) => {
    if (response.status === 500 || response.status === 404) {
      const errorMessage = { code: response.status, message: response };
      throw errorMessage;
    }
    return response.json();
  });
}

/**
 * Gets promotions of games
 * @returns JSON data of the newests 10 promotions
 */
export function getSpecialOffers() {
  const url = new URL(`/gamesList/promo`, STORAGE_API_HOST);
  return fetch(url).then((response) => {
    if (response.status === 500 || response.status === 404) {
      const errorMessage = { code: response.status, message: response };
      throw errorMessage;
    }
    return response.json();
  });
}

/**
 * Gets the highest rated games
 * @returns JSON data of the 10 highest rated games
 */
export function getPopularGames() {
  const url = new URL(`/getGames/ratingsdesc`, STORAGE_API_HOST);

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyword: '', lastId: 0 }),
  }).then((response) => {
    if (response.status === 500 || response.status === 404) {
      const errorMessage = { code: response.status, message: response };
      throw errorMessage;
    }
    return response.json();
  });
}

/**
 * Gets games based on filters
 *
 * @params 1: Date Added (Newest)
 * @params 2: Date Added (Oldest)
 * @params 3: Name (Ascending)
 * @params 4: Name (Descending)
 * @params 5: Rating (Ascending)
 * @params 6: Rating (Descending)
 * @params 7: Price (Ascending)
 * @params 8: Price (Descending)
 *
 * @returns JSON data of the selected games
 */
export function getGames(keyword = '', filter = 1, pageNo) {
  let request;

  let lastId = (pageNo - 1) * 5;

  switch (parseInt(filter)) {
    case 1:
      request = '/newest';
      break;

    case 2:
      request = '/oldest';
      break;

    case 3:
      request = '/nameasc';
      break;

    case 4:
      request = '/namedesc';
      break;

    case 5:
      request = '/ratingsasc';
      break;

    case 6:
      request = '/ratingsdesc';
      break;

    case 7:
      request = '/priceasc';
      break;

    case 8:
      request = '/pricedesc';
      break;

    default:
      request = '/newest';
      break;
  }

  console.log(`${STORAGE_API_HOST}/getGames${request}`);
  return fetch(`${STORAGE_API_HOST}/getGames${request}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyword: keyword, lastId: lastId }),
  }).then((response) => {
    if (response.status === 500 || response.status === 404) {
      const errorMessage = { code: response.status, message: response };
      throw errorMessage;
    }
    return response.json();
  });
}

export function userRegister(RegisterContent) {
  const url = new URL(`/register`, STORAGE_API_HOST);

  if (RegisterContent.RegisterContent.Email == '') {
    alert('Input for email is empty');
  } else if (RegisterContent.RegisterContent.ConfirmEmail == '') {
    alert('Input for confirm email is empty');
  } else if (RegisterContent.RegisterContent.Username == '') {
    alert('Input for username is empty');
  } else if (RegisterContent.RegisterContent.Password == '') {
    alert('Input for password is empty');
  } else if (RegisterContent.RegisterContent.ConfirmPassword == '') {
    alert('Input for confirm password is empty');
  } else if (
    RegisterContent.RegisterContent.ConfirmEmail !==
    RegisterContent.RegisterContent.Email
  ) {
    alert('Input for emails do not match');
  } else if (
    RegisterContent.RegisterContent.ConfirmPassword !==
    RegisterContent.RegisterContent.Password
  ) {
    alert('Input for passwords do not match');
  } else {
    const data = {
      Email: RegisterContent.RegisterContent.Email,
      Username: RegisterContent.RegisterContent.Username,
      Password: RegisterContent.RegisterContent.Password,
    };

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 500 || response.status === 404) {
        throw new Error({ message: response });
      }
      return response.json();
    });
  }
}

export function userLogin(LoginContent) {
  const url = new URL(`/login`, STORAGE_API_HOST);

  if (LoginContent.LoginContent.Username == '') {
    alert('Input for email is empty');
  } else if (LoginContent.LoginContent.Password == '') {
    alert('Input for password is empty');
  } else {
    const data = {
      Username: LoginContent.LoginContent.Username,
      Password: LoginContent.LoginContent.Password,
    };

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 500 || response.status === 404) {
        throw new Error({ message: response });
      }
      return response.json();
    });
  }
}

export function getUserInformation() {
  const Id = localStorage.getItem('Id');
  const Token = localStorage.getItem('accessToken');

  const url = new URL(`/getUser/${Id}`, STORAGE_API_HOST);

  return fetch(url, { headers: { Authorization: 'Bearer ' + Token } })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        throw new Error({ message: response });
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getUserInformation();
        });
      } else {
        return res;
      }
    });
}

export function updateImg(file) {
  const Id = localStorage.getItem('Id');
  const Token = localStorage.getItem('accessToken');

  if (file === undefined) {
  } else {
    const url = new URL(`/updateImage/${Id}`, STORAGE_API_HOST);

    const data = new FormData();
    data.append('picture', file.file);

    return fetch(url, {
      method: 'PUT',
      headers: { Authorization: 'Bearer ' + Token },
      body: data,
    })
      .then((response) => {
        if (response.status === 500 || response.status === 404) {
          throw new Error({ message: response });
        }
        return response.json();
      })
      .then((res) => {
        if (res.message === 'Access Token Expired!') {
          verifyUser().then((res) => {
            return updateImg();
          });
        } else {
          return res;
        }
      });
  }
}

export function updateProfile(ProfileContent) {
  const Id = localStorage.getItem('Id');
  const Token = localStorage.getItem('accessToken');

  const url = new URL(`/updateUser/${Id}/`, STORAGE_API_HOST);

  if (ProfileContent.Password !== ProfileContent.ConfirmPassword) {
  } else {
    const data = {
      Username: ProfileContent.username,
      Email: ProfileContent.email,
      Password: ProfileContent.password,
    };

    return fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 500 || response.status === 404) {
          throw new Error({ message: response });
        }
        return response.json();
      })
      .then((res) => {
        if (res.message === 'Access Token Expired!') {
          verifyUser().then((res) => {
            return updateProfile();
          });
        } else {
          return res;
        }
      });
  }
}

export function updateFunds(FundContent) {
  const Id = localStorage.getItem('Id');
  const Token = localStorage.getItem('accessToken');

  const url = new URL(`/addFunds/${Id}`, STORAGE_API_HOST);

  if (FundContent.Card_Number === '') {
    alert('Input for card number is empty');
  } else if (FundContent.Amount_Retrieved === '') {
    alert('Input for funds is empty');
  } else {
    const data = {
      Amount_Retrieved: FundContent.Amount_Retrieved,
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + Token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 500 || response.status === 404) {
        throw new Error({ message: response });
      } else if (response.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return updateFunds();
        });
      }
      const url = new URL(`/addWallet/${Id}`, STORAGE_API_HOST);
      return fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + Token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 500 || response.status === 404) {
            throw new Error({ message: response });
          }
          return response.json();
        })
        .then((res) => {
          if (res.message === 'Access Token Expired!') {
            verifyUser().then((res) => {
              return updateFunds();
            });
          } else {
            return res;
          }
        });
    });
  }
}

// get all user from the admin manage user page
export function getAllUser() {
  const token = localStorage.getItem('accessToken');
  const url = new URL(`/User`, STORAGE_API_HOST);
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}

// get all Game Key from the admin manage game page	{
export function getAllGame() {
  const token = localStorage.getItem('accessToken');
  const url = new URL(`/getAllGame`, STORAGE_API_HOST);
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}

// update user role on the admin manage user page {
export function updateRole(type) {
  const token = localStorage.getItem('accessToken');
  const url = new URL(`/update/type/${type}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return updateRole(type);
        });
      } else {
        return res;
      }
    });
}

// Add game key in admin manage game page
export function addGames(Name, Category, Description, Rating, Price) {
  const token = localStorage.getItem('accessToken');
  const data = {
    GameName: Name,
    GameCategory: Category,
    GameDescription: Description,
    GameRating: Rating,
    GamePrice: Price,
  };
  const url = new URL(`/addGame`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return addGames(Name, Category, Description, Rating, Price);
        });
      } else {
        return res;
      }
    });
}

export function ClaimGiftCards(getCode) {
  const token = localStorage.getItem('accessToken');
  const data = {
    Code: getCode,
  };
  const url = new URL(`/ClaimGiftCard`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return ClaimGiftCards(getCode);
        });
      } else {
        window.location.reload();
        return res;
      }
    });
}
// Disable game key in admin manage game page
export function DisableGame(id) {
  const token = localStorage.getItem('accessToken');
  const url = new URL(`/update/DisableStatus/${id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return DisableGame(id);
        });
      } else {
        return res;
      }
    });
}

// Enable game key in admin manage game page
export function EnableGame(id) {
  const token = localStorage.getItem('accessToken');
  console.log(token);

  const url = new URL(`/update/EnableStatus/${id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return EnableGame(id);
        });
      } else {
        return res;
      }
    });
}

/**
 *
 * @param key
 * @param game_id
 * @returns message if the key has been redeemed
 */
export function redeemKeys(key = '') {
  console.log(`calling redeem keys`);
  console.log(key);
  let data = { key: key };
  console.log(data);

  return fetch(`${STORAGE_API_HOST}/redeemKeys`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 500 || response.status === 404) {
      return `Key Not Found!`;
    }
    return `Key Redeemed!`;
  });
}

export function getGameName(GameName) {
  const url = new URL(`/game/${GameName}`, STORAGE_API_HOST);
  console.log(GameName);
  return fetch(url)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      return res;
    });
}

export function getClaimGiftCards() {
  const url = new URL(`/getClaimGiftCard`, STORAGE_API_HOST);
  return fetch(url).then((response) => response.json());
}

export function getAllReferral() {
  const url = new URL(`/GetAllReferral`, STORAGE_API_HOST);
  return fetch(url).then((response) => response.json());
}

export function getUserCart(user_id, accessToken) {
  user_id = localStorage.getItem('Id');
  accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  const url = new URL(`/cart/${user_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      // localStorage.setItem("game_id", response.data.game_id)
      // console.log(response.json);
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getUserCart();
        });
      } else {
        return res;
      }
    });
}

export function deleteCartItem(game_id) {
  let user_id = localStorage.getItem('Id');
  let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)
  const url = new URL(`/cart/delete/${game_id}/${user_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return deleteCartItem();
        });
      } else {
        return res;
      }
    });
}

export function addGametoCart(game_id) {
  let user_id = localStorage.getItem('Id');
  let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)
  const url = new URL(`${user_id}/cart/${game_id}`, STORAGE_API_HOST);
  console.log(game_id);
  console.log(`adding to cart`);
  return fetch(url, {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      console.log(res);
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return addGametoCart();
        });
      } else {
        return res;
      }
    });
}

export function purchaseGames(discountCode = localStorage.getItem('Code')) {
  let user_id = localStorage.getItem('Id');
  let accessToken = localStorage.getItem('accessToken');

  console.log(accessToken);

  console.log(`hereeeeeeeeeeeee`);
  console.log(discountCode);

  let header = discountCode
    ? {
        Authorization: 'Bearer ' + accessToken,
        discountCode: `${discountCode}`,
      }
    : { Authorization: 'Bearer ' + accessToken };

  const url = new URL(`/cart/purchase/${user_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'PUT',
    headers: header,
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      console.log(response);
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return purchaseGames();
        });
      } else {
        window.location.reload();
        return res;
      }
    });
}

export function PurchaseGiftCard(
  GiftAmount,
  buyerUserID,
  GetUserID,
  GetQuantity,
  GiftMessage,
  GetFrom
) {
  const data = {
    Amount: GiftAmount,
    BuyerUserID: buyerUserID,
    UserID: GetUserID,
    Quantity: GetQuantity,
    Message: GiftMessage,
    FromBuyUser: GetFrom,
  };
  let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)
  const url = new URL(`/UserPurchasedGiftCard`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      console.log(res);
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return PurchaseGiftCard(
            GiftAmount,
            buyerUserID,
            GetUserID,
            GetQuantity,
            GiftMessage,
            GetFrom
          );
        });
      } else {
        return res;
      }
    });
}

export function addGametoWishlist(game_id) {
  let user_id = localStorage.getItem('Id');
  let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)
  const url = new URL(`${user_id}/wishlist/${game_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return addGametoWishlist();
        });
      } else {
        window.location.reload()
        return res;
      }
    });
}

export function getUserWishlist(user_id, accessToken) {
  user_id = localStorage.getItem('Id');
  accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  const url = new URL(`/wishlist/${user_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getUserWishlist();
        });
      } else {
        return res;
      }
    });
}

export function deleteWishlistItem(game_id) {
  let user_id = localStorage.getItem('Id');
  let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)
  const url = new URL(
    `/wishlist/delete/${game_id}/${user_id}`,
    STORAGE_API_HOST
  );
  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return deleteWishlistItem();
        });
      } else {
        window.location.reload()
        return res;
      }
    });
}

export function userGameWishlist(game_id) {
  let user_id = localStorage.getItem('Id');
  let accessToken = localStorage.getItem('accessToken');

  const url = new URL(`/wishlist/${user_id}/${game_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      // localStorage.setItem("wishlist_check", response.data.rowCount);
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return userGameWishlist();
        });
      } else {
        return res;
      }
    });
}

export function getAllAdvert() {
  const url = new URL(`/advert`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      return res;
    });
}

export function getOneAdvert(game_id) {
  const url = new URL(`/advert/${game_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      return res;
    });
}

export function removeAllAdvert() {
  let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)
  const url = new URL(`/advert/delete`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return removeAllAdvert();
        });
      } else {
        return res;
      }
    });
}

export function removeOneAdvert(game_id) {
  let accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)
  const url = new URL(`/advert/delete/${game_id}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return removeOneAdvert();
        });
      } else {
        return res;
      }
    });
}

export function addAdvert(game_id, advert_text) {
  const token = localStorage.getItem('accessToken');
  const data = {
    Game_ID: game_id,
    Advert_Text: `${advert_text}`,
  };
  const url = new URL(`/advert/add`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return addAdvert(game_id, advert_text);
        });
      } else {
        window.location.reload()
        return res;
      }
    });
}

export function updateAdvert(AdvertContent, game_id) {
  const Token = localStorage.getItem('accessToken');

  const url = new URL(`/advert/edit/${game_id}/`, STORAGE_API_HOST);

  const data = {
    Advert_Text: AdvertContent.advert_text,
  };

  return fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + Token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        throw new Error({ message: response });
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return updateAdvert();
        });
      } else {
        return res;
      }
    });
}

/**
 *
 * @returns list of keys owned by the user
 */
export function getLibraryKeys(
  accessToken = localStorage.getItem('accessToken'),
  id
) {
  console.log(accessToken);
  console.log(id);
  return fetch(`${STORAGE_API_HOST}/keyLibrary/${id}/`, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getLibraryKeys();
        });
      } else {
        return res;
      }
    });
}

/**
 *
 * @returns list of gifcards owned by the user
 */

export function getGiftCardLibrary(UserID) {
  let accessToken = localStorage.getItem('accessToken');

  const url = new URL(`/SentGiftCardToUser/${UserID}  `, STORAGE_API_HOST);
  return fetch(url, {
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      console.log(res);
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getGiftCardLibrary();
        });
      } else {
        return res;
      }
    });
}
// get gift card
export function getAllGiftCard() {
  const url = new URL(`/giftcard`, STORAGE_API_HOST);
  return fetch(url).then((response) => response.json());
}
export function Referralcode(Code) {
  let accessToken = localStorage.getItem('accessToken');
  const url = new URL(`/Referral/${Code}`, STORAGE_API_HOST);
  return fetch(url, {
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      localStorage.setItem('Code', Code);
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getGiftCardLibrary();
        });
      } else {
        return res;
      }
    });
}

export function addGiftToCart(
  GiftAmount,
  buyerUserID,
  GetUserID,
  GetQuantity,
  GetUserName,
  GiftMessage,
  GetFrom
) {
  let accessToken = localStorage.getItem('accessToken');
  const data = {
    Amount: GiftAmount,
    BuyerUserID: buyerUserID,
    UserID: GetUserID,
    Quantity: GetQuantity,
    UserName: GetUserName,
    Message: GiftMessage,
    FromBuyUser: GetFrom,
  };
  console.log(`calling API`);
  const url = new URL(`/AddGiftCardToCart`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export function getusername(UserID) {
  UserID = localStorage.getItem('Id');
  const url = new URL(`/getUsername/${UserID}`, STORAGE_API_HOST);
  return fetch(url).then((response) => response.json());
}

export function getGiftCardfromcart(UserID) {
  UserID = localStorage.getItem('Id');
  const url = new URL(`/getGiftCardfromcart/${UserID}`, STORAGE_API_HOST);
  return fetch(url).then((response) => response.json());
}

export function removeGiftCardfromcart(buyeruserid, UserID) {
  let accessToken = localStorage.getItem('accessToken');
  const url = new URL(
    `/removeGiftCardfromcart/${buyeruserid}/${UserID}`,
    STORAGE_API_HOST
  );
  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getGiftCardLibrary();
        });
      } else {
        return res;
      }
    });
}

export function getReferralcode(
  accessToken = localStorage.getItem('accessToken')
) {
  const url = new URL(`/Referralcodes`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return getReferralcode();
        });
      } else {
        console.log(res);
        console.log(res.rows[0].referral_code);
        return res;
      }
    });
}

export function AddGame(gameName, price, desc) {
  let accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  console.log(gameName);
  console.log(price);
  console.log(desc);

  let data = {
    gameName: gameName,
    price: price,
    description: desc,
  };

  return fetch(`${STORAGE_API_HOST}/addNewGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      if (res.message === 'Access Token Expired!') {
        verifyUser().then((res) => {
          return AddGame();
        });
      } else {
        if (res.status === 500) {
          return res.message;
        }
        return `success!`;
      }
    });
}

// get game data
export function getGameData(game_name) {
  const url = new URL(`/data/${game_name}`, STORAGE_API_HOST);
  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.status === 500 || response.status === 404) {
      const errorMessage = { code: response.status, message: response };
      throw errorMessage;
    }
    return response.json();
  });
}

/**
 *
 * @returns list of all existing game tags
 */
export function getGameTags() {
  return fetch(`${STORAGE_API_HOST}/gameTags`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 500 || response.status === 404) {
        const errorMessage = { code: response.status, message: response };
        throw errorMessage;
      }
      return response.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    });
}
