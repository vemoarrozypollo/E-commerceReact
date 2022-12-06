import React, { useState } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Link, useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';

const Navigator = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    if (localStorage.getItem('token') !== '') {
      const handle = () => setShow(true);
      return handle()
    }
    alert('iniciar sesion')
  };


  const logOut = () => {
    localStorage.setItem('token', '');
    navigate('/login');
  }

  return (
    <>
      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to='/' as={Link}>My E-Commerce <svg xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-truck-delivery"
            width="52" height="52" viewBox="0 0 24 24"
            stroke="#ffffff" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
            <line x1="3" y1="9" x2="7" y2="9" />
          </svg> </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='logincard' to='/login' as={Link}> Login
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-login" width="32" height="32" viewBox="0 0 24 24"
                   stroke="#ffffff" fill="none" >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                </svg>
              </Nav.Link>
              <Nav.Link onClick={logOut} className='logoutcard'>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-logout" width="32" height="32" viewBox="0 0 24 24"
                   stroke="#ffffff" fill="none">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg> logOut
              </Nav.Link>
              <Nav.Link to='/purchases/' className='purchasecard' as={Link}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-archive" width="32" height="32" viewBox="0 0 24 24"
                   stroke="#ffffff" fill="none" >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="3" y="4" width="18" height="4" rx="2" />
                  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                  <line x1="10" y1="12" x2="14" y2="12" />
                </svg>
              </Nav.Link>
              <Nav.Link onClick={handleShow} className='shoppingcard'>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-shopping-cart" width="32" height="32" viewBox="0 0 24 24"
                   stroke="#ffffff" fill="none">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="6" cy="19" r="2" />
                  <circle cx="17" cy="19" r="2" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
      <CartSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default Navigator;