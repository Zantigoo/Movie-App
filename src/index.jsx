import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import ReactDOM from 'react-dom';

//Component Import
import MainView from './components/main-view/main-view';


//CSS Import
import './index.scss';

class FlixrApp extends React.Component {
    render() {
        return (
            <div>
            <Navbar sticky="top" bg='dark' variant='dark'>
            <Navbar.Brand href="#home">Flixir</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="#features">Movies</Nav.Link>
            </Nav>
            </Navbar>
            <Container>
                <MainView/>
            </Container>
            </div>
        );
    };
};

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(FlixrApp), container);

