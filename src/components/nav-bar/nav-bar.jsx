import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './nav-bar.scss'


export class TopNav extends React.Component {
    constructor() {
      super();
  
      this.state = {};
    }
  
    onLoggedOut = () => {
      localStorage.clear();
      window.open("/", "_self");
    };

    render() {
        
        const { user } = this.props
        const movies = `/`;
        const profile = `/users/${user}`;
    
        return (

<Navbar bg="dark" expand="lg">
  <Container className="navbar-menu">
    <Navbar.Brand href={ movies }>Flixir</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="">Movies</Nav.Link>
        <Nav.Link href="#link">Directors</Nav.Link>
        <Nav.Link id="Account" href={profile}>My Account</Nav.Link>
        <Nav.Link id="logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        );
    }
}