import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { getUserInformation, getUserCart } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from 'react-query';

function NavBarContent() {
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');
  const response = useQuery('userInfo', () => getUserInformation());
  const cart = useQuery('usercart', () => getUserCart());

  const login = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/login';
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Navbar expand="lg" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href="/">Water Vapor</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/gameslist">All Games</Nav.Link> */}

            {token == null ? (
              <></>
            ) : (
              <Nav.Link href="/ReferralSystem">Referral system</Nav.Link>
            )}

            <NavDropdown title="Gift cards" menuVariant="dark">
              <NavDropdown.Item href="/GiftCard">Gift card</NavDropdown.Item>
              <NavDropdown.Item href="/GiftCardLibrary">
                Gift card library
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Claim" menuVariant="dark">
              <NavDropdown.Item href="/ClaimKeys">Claim keys</NavDropdown.Item>
              <NavDropdown.Item href="/ClaimGiftCard">
                Claim Gift card
              </NavDropdown.Item>
            </NavDropdown>

            {type != 'Admin' ? (
              <></>
            ) : (
              <NavDropdown title="Admin" menuVariant="dark">
                <NavDropdown.Item href="/AdminHub">Admin hub</NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            )}
          </Nav>

          <Nav id="cartThingy">
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>

          {token == null ? (
            <></>
          ) : (
            <>
              {response.isLoading || response.isRefetching ? (
                <Player
                  autoplay
                  loop
                  src="https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json"
                  style={{ height: '50px', width: '50px' }}
                ></Player>
              ) : response.error ? (
                <></>
              ) : (
                (localStorage.setItem('wallet', response.data.wallet),
                (
                  <Dropdown as={ButtonGroup} className="Dropdown">
                    <Button variant="outline-success">
                      {' '}
                      {response.data.username} | $ {response.data.wallet}{' '}
                    </Button>

                    <Dropdown.Toggle
                      split
                      variant="success"
                      id="dropdown-split-basic"
                    />

                    <Dropdown.Menu className="navHeader" menuVariant="dark">
                      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="/funds">Funds</Dropdown.Item>
                      <Dropdown.Item href="/Library">Library</Dropdown.Item>
                      <Dropdown.Item href="/wishlist">Wishlist</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ))
              )}

              {
                cart.isLoading
                  ? console.log('loading cart info')
                  : cart.error
                  ? console.log(cart.error.message)
                  : // console.log(cart.data.rows),

                    localStorage.setItem('cart', cart.data.rows)
                // console.log(cartItems.length)
              }
            </>
          )}

          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          {token == null ? (
            <Button variant="outline-success" onClick={(event) => login(event)}>
              Log in
            </Button>
          ) : (
            <Button variant="outline-danger" onClick={(event) => logout(event)}>
              Log out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function NavBar() {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // Create a query cache
  const queryCache = new QueryCache();

  return (
    <QueryClientProvider client={queryClient} queryCache={queryCache}>
      <NavBarContent />
    </QueryClientProvider>
  );
}

export default NavBar;
