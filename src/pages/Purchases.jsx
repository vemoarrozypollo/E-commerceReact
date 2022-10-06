import React, { useEffect, useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slice/purchases.slice';


const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases)
  const navigate = useNavigate()
  const [datefull ,setDateFull]=useState('')
  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  const date =(dates)=>{
const date = new Date(dates)
const fulldate = date.toDateString()
return fulldate

  }
  return (
    <div>
      <h1>My Purchases</h1>
      <ListGroup>
        {
          purchases.map((purchase) => (
            <ListGroupItem key={purchase.id}>
             {date(purchase.createdAt)}
              {
                purchase.cart.products.map((purchas) => (
                  <ListGroupItem key={purchas.id} onClick={() => navigate(`/products/${purchas.id}`)}>
                  <Row>
                    <Col sm={6}>{purchas.title}</Col>
                    <Col sm={4}>{purchas.productsInCart.quantity}</Col> 
                    <Col>${purchas.price}</Col>
                   
                    
                   </Row>
                  </ListGroupItem>
                ))
              }
            </ListGroupItem>
          ))
        }

      </ListGroup>
    </div>
  );
};

export default Purchases;