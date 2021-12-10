import axios from "axios";
import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";

//CSS import
import './registration-view.scss';

export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    
    const alphaNum = /^[0-9a-zA-Z]+$/;

    if (username.length < 4) return setError('Must include a username that is longer than 4 characters');
    if (password.length < 6) return setError('Must include a password that is longer than 6 characters');
    if (!username.match(alphaNum)) return setError('Username must contain only letters and numbers');
    if (password !== confirmPassword) return setError('Passwords do not match');

    axios.post('https://flixir.herokuapp.com/users/', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    }).then(response => {
            console.log(response.data);
            window.open('/', '_self'); 
      }).catch(e => {
        setError('Username has been taken.')
        console.log('Registration Error')
      });
    };

    return (
        <div>
        <h2 className='text-center mt-5'>Sign Up</h2>
        <Form className='mt-3' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="5 character minimum"
                value={username} onChange={e => setUsername(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                value={email} onChange={e => setEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Case-Sensitive"
                value={password} onChange={e => setPassword(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" 
                value={birthday} onChange={e => setBirthday(e.target.value)} required/>
            </Form.Group>

            {error && <h5 style={{ color: "red", marginBottom: "40px" }}>{error}</h5>}

            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        </div>

    );
}