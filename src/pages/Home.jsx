import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const products = useSelector(state => state.products);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories))
  }, []);

  useEffect(() => {
    setCategoryFilter(products)
  }, [products]);

  const filterCategory = (categoryId) => {
    const filtered = products.filter(
      product => product.category.id === categoryId)
    setCategoryFilter(filtered)
  }

  const searchProducts = () => {
    const filtered = products.filter(
      product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
    setCategoryFilter(filtered)
  }

  return (
    <Row>
      <Col lg={3}>
        <ListGroup>
          <h3>Category</h3>
          {
            categories.map(category => (
              <ListGroup.Item variant="secondary" key={category.id}
                onClick={() => filterCategory(category.id)}
                style={{ cursor: 'pointer' }}
              >{category.name}</ListGroup.Item>
            ))
          }
        </ListGroup>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="search: galaxy "
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue}
            aria-describedby="basic-addon2"
          />
          <Button onClick={searchProducts}
            variant="outline-secondary"
            id="button-addon2">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shopping-cart"
              width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </Button>
        </InputGroup>
        <Row xs={2} md={3} xl={4} className="g-4">
          {
            categoryFilter.map(product => (
              <Col key={product.id}>
                <Card onClick={() => navigate(`/products/${product.id}`)}
                  style={{ height: '100%', cursor: 'pointer' }} >
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Body>
                    <Card.Img src={product.productImgs[0]} />
                  </Card.Body>
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
                </Card>
              </Col>
            ))
          }
        </Row>
      </Col>
    </Row>
  );
};

export default Home;