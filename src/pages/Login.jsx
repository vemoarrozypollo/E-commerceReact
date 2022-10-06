import axios from 'axios';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
      .then(res => {
        localStorage.setItem('token', res.data.data.token);
        navigate('/');
      })
      .catch(error => {
        if (error.response.status === 404) {
          alert("credenciales invalidas")
        }
        console.log(error.response)
      })

  }

  return (
    <Form className='login' style={{ width: '30rem'}} onSubmit={handleSubmit(submit)}>
      <Form.Group>
        <Card className='welcome' style={{ width: '18rem'}}>
          <Card.Body>
            <Card.Title>welcome!</Card.Title>
            <Card.Text>
              Test Data
              <br></br>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <polyline points="3 7 12 13 21 7" />
              </svg> john@gmail.com
              <br></br>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-key" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="8" cy="15" r="4" />
                <line x1="10.85" y1="12.15" x2="19" y2="4" />
                <line x1="18" y1="5" x2="20" y2="7" />
                <line x1="15" y1="8" x2="17" y2="10" />
              </svg> john1234
            </Card.Text>
          </Card.Body>
        </Card>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register('email')} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register('password')} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;