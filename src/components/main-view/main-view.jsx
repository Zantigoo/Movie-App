import React from 'react';
import axios from 'axios'; 
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//Bootstrap Import
import { Row, Col} from 'react-bootstrap'

//Views import
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view.jsx';
import { GenreView } from '../genre-view/genre-view';


//CSS import
import './main-view.scss';
import { TopNav } from '../nav-bar/nav-bar';


export default class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          register: null,
        }

        this.getUser = this.getUser.bind(this)
    }

    getMovies(token) {
      axios.get('https://flixir.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user : authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    getUser() {
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      axios
        .get(`https://flixir.herokuapp.com/users/:Username`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            name: response.data.Name,
            username: response.data.Username,
            password: response.data.Password,
            email: response.data.Email,
            birthday: response.data.Birthday,
            favorites: response.data.Favmovies
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    render() {
      const { movies, user, username, password, email, birthday, Favmovies } = this.state;

        return (
        <Router>

          <Route exact path='/' render={() => {
            console.log('IM IN!')
            if (user) return <TopNav user={user}></TopNav>
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          }}/>

<div className="main-view">
        
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col lg={3} md={6} sm={9} xs={6} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} /> 

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <TopNav user={user}></TopNav>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
              onBackClick={() => history.goBack()} />
            </Col>
          }} />


           <Route path="/genres/:name" render={({ match, history }) => { 
          if ( !user ) 
          return (
            <Col>
              <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
            </Col>
          );
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <TopNav user={user} ></TopNav>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
          </Col>
          }}  />


          <Route path="/directors/:name" render={({ match, history }) => { 
          if ( !user ) 
          return (
            <Col>
              <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
            </Col>
          );
          
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <TopNav user={user}></TopNav>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
          </Col>
          }}  />

          <Route path="/actors/:name" render={({ match, history }) => { 
          if ( !user ) 
          return (
            <Col>
              <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
            </Col>
          );
          
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <TopNav user={user}></TopNav>
            <Actorview actor={movies.find(m => m.Actor.Name === match.params.name).Actor} onBackClick={() => history.goBack()}/>
          </Col>
          }}  />

          {/* Path to Profile view  */}
        <Route  path="/user" render={() => {
          if ( !user ) 
          return (
            <Col>
              <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
            </Col>
          );
          if (movies.length === 0) return <div className="main-view" />;
          return (
          <>
          <Col>
          <TopNav user={user}></TopNav>
            <Userview 
            username={username} password={password} email={email} name={name}
            birthday={birthday} favorites={favorites} movies={movies}
            getUser={this.getUser}
            onBackClick={() => history.goBack()} removeMovie={(_id) => this.onRemoveFavorite(_id)} />
          </Col>
          </>)
        }} /> 
        </Row>
        </div>
        </Router>
        );
    }
}

export default MainView;


  