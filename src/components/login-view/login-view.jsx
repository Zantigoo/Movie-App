import React, {useState} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Bootstrap import

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


//CSS import
import './login-view.scss';
import { Card } from "react-bootstrap";
import axios from "axios";



export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://flixir.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log(e)
      });
    };

    return (
      <Card className='login-card'>
        <Card.Body>
        <Card.Title className='login-title text-center mb-3'>Login</Card.Title>
        <Form className='rounded'>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

        </Form>
          <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Card.Body>
        <Link to={`/register`}>
        <Button variant="outline-warning">
        Register
        </Button>
        </Link>
      </Card>
      );
};


LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};