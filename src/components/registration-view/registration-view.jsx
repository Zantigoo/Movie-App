import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";

//CSS import
import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password, email, birthday);
      //Post info to server
    };

    return (
        <div>
        <h2 className='text-center mt-5'>Sign Up</h2>
        <Form className='mt-3'>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="5 character minimum"
                value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Case-Sensitive"
                value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" 
                value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit} >
            Submit
            </Button>
        </Form>
        </div>

        /*<form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthdate:
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>*/
    );
}