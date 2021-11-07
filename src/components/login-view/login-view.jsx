import React, {useState} from "react";
import PropTypes from 'prop-types';

//Bootstrap import

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


//CSS import
import './login-view.scss';
import { Card } from "react-bootstrap";



export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password);
      // Send a request to the server for authentication 
      // then call props.onLoggedIn(username) 
      props.onLoggedIn(username);
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
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

        </Form>
          <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
          
        </Card.Body>
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