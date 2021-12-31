import React from 'react';
import axios from 'axios'; 
import { connect} from 'react-redux';
import { setMovies } from '../../actions/actions';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


//Bootstrap Import
import { Row, Col, Container} from 'react-bootstrap'

//Views import
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view.jsx';
import { GenreView } from '../genre-view/genre-view';
import { TopNav } from '../nav-bar/nav-bar';
import MoviesList from '../movies-list/movies-list';

//CSS import
import './main-view.scss';



class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
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
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
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
        .get(`https://flixir.herokuapp.com/users/username/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
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
      const { user, username, password, email, birthday, favorites } = this.state;
      let { movies } = this.props
      console.log(this.state)
      console.log(this.props)
        return (
        <Router>
              <TopNav user={user} ></TopNav>
          <Container>
            {/*Registration View*/}
            <Route exact path="/register" render={() => {
                if (user) return <Redirect to="/" />
                  return <Col>
                    <RegistrationView/>
                  </Col>
            }} />
            
            
            <Row className="main-view justify-content-md-center">

              <Route exact path='/' render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                </Col>
                if (movies.length === 0) return <div className='main-view'/>;
                return <MoviesList movies={movies}/>
              }}/>

              

            

              {/*Movie View*/}
              <Route path="/movies/:movieId" render={({ match, history }) => {
                if ( !user ) 
                  return (
                    <Col>
                      <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                    </Col>
                  );
              if (movies.length === 0) return <div className="main-view" />
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
                  onBackClick={() => history.goBack()} getUser={this.getUser}/>
                </Col>
              }} />

              {/*Genre View*/}
              <Route path="/genres/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
              </Col>
              }}  />

              {/*Director View*/}
              <Route path="/directors/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
              </Col>
              }}  />

            
              {/*User View*/}
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
                  <ProfileView 
                  username={username} password={password} email={email} 
                  birthday={birthday} favorites={favorites} movies={movies}
                  getUser={this.getUser}
                  onBackClick={() => history.goBack()} removeMovie={(_id) => this.onRemoveFavorite(_id)} />
                </Col>
                </>)
              }} /> 
            </Row>
          </Container>
        </Router>
        );
    }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, {setMovies})(MainView);


  