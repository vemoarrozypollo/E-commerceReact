import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slice/cartProducts.slice';

const ProductsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rate, setRate] = useState(5);
  const products = useSelector(state => state.products);

  const productDetail = products.find(
    product => product.id === Number(id))

  const relateProducts = products.filter(
    product => product.category.id === productDetail.category.id)
    
  const handleRate = () => {
    if (rate !== 1) {
      setRate(rate - 1); 
    }
  };

  useEffect(() => {
    setRate(5)
  }, [id])

  const addtocart = () => {
    const cart = {
      id: id,
      quantity: rate
    }
    dispatch(addCartThunk(cart))
  }

  return (
    <Row>
      <Col>
        <h1> {productDetail?.title}</h1>
        <br></br>
        {productDetail?.category.name}
        <br></br>
        
        <img className='img-fluid m-3'  src={productDetail?.productImgs[0]} />
        <img className='img-fluid m-3' src={productDetail?.productImgs[1]} />
        <img className='img-fluid m-3' src={productDetail?.productImgs[2]} />
        <br></br>
        <div>
          <Button className='me-3' onClick={handleRate}>-</Button>
          {rate}
          <Button className='ms-3' onClick={() => setRate(rate + 1)}>+</Button>
          <br />
          <Button className='mt-2' onClick={addtocart}>add to cart</Button>
        </div>
        <p> <svg xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shopping-cart"
              width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg> ${productDetail?.price} c/u</p>
        <p> {productDetail?.description}</p>
      </Col>
      <Col lg={3}>
        <h3>similar items</h3>
        
        <Row variant='flush'>
          {
            relateProducts.map(product => (

              <Col className='cardproducts' key={product.id}>
                <Link  to={`/products/${product.id}`}>
                  <p>
                    {product.title}
                  </p>
                  <img src={product.productImgs} />
                  <p> <svg xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shopping-cart"
              width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg> ${product.price}</p>
                </Link>
              </Col>
            ))
          }
        </Row>
      </Col>
    </Row>
  );
};

export default ProductsDetail;