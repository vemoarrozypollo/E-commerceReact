import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartProductsThunk, purchasesCartThunk } from '../store/slice/cartProducts.slice';
import { getPurchasesThunk } from '../store/slice/purchases.slice';


const CartSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cartProducts)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getCartProductsThunk())
  }, [])

  const buycart =()=>{
dispatch(purchasesCartThunk())
dispatch(getPurchasesThunk())
  }
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          <ListGroupItem>
            {
              cartProducts.map((carts) => (
                <ListGroupItem key={carts.id} >
                  <h1>{carts.title}</h1>
                  <p>price:${carts.price}</p>
                  <p>productos en el carrito {carts.productsInCart.quantity}</p>
                </ListGroupItem>
              ))
            }
          </ListGroupItem>
        </ListGroup>
      </Offcanvas.Body>
      <Button onClick={buycart}>comprar todo</Button>
    </Offcanvas>
  );
};

export default CartSidebar;