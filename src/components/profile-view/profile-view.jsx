import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';



export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
    };
  }

  componentDidMount() {
    this.props.getUser()
  }


  // Current User profile data

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://flixir.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favmovies: response.data.Favmovies
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://flixir.herokuapp.com/users/${username}`,
    {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
    { headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });
      localStorage.setItem('user', response.data.Username);
      const data = response.data;
      console.log(data);
      console.log(this.state.Username);
      alert('Profile updated');
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // Delete A Favorite Movie From Users Favorite 

  onRemoveFavorite() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://flixir.herokuapp.com/users/${username}/movies/${movie._id}`, 
    {headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert("Movie has been removed")
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete A User

  onDeleteUser() {
    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      axios.delete(`https://flixir.herokuapp.com/users/${username}`, 
        { headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      })};
  }


  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }


  render() {
    const { username, email, birthday, favorites  } = this.props
    console.log(this.props)

    return(
      <Container className="UserView">
        <Row className="justify-content-md-center">
          <Col className="user-info">
          <div className="profileContent">
            <h1>PROFILE</h1>
          </div>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            <h4>Birthday: {birthday}</h4>
          </Col>
        </Row>
          <div className="profileInformation">        
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
          <div>
            <h3>EDIT PROFILE</h3>
          </div>
            <Form.Group>
              Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group>
              Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
          </div>
          <Row>
            <Col className="acc-btns mt-1">
              <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
            </Col>
            
         </Row>
         
          <h3 className="favorite-Movies-title">Favorite Movies</h3>
        
        <Row className="favoriteMovied-col"> 
          { favorites && favorites.map((movie) => (
           
            <Col sm={6} md={4} lg={4} key={movie._id}>
              <div className="favoriteMoviediv" >
                <MovieCard movie={movie} />
                <Button bg="danger" variant="danger" className="unfav-button" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>
                  Delete From Favorites
                </Button>
                </div>
            </Col>
            
          ))
        }
         
        </Row>

     </Container>
    )
   }  
}
ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};