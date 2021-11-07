import React from 'react';
import axios from 'axios';

//Bootstrap Import
import { Grid, Row, Col} from 'react-bootstrap'

//Views import
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//CSS import
import './main-view.scss';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = { 
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    //Grab movies from API, push them to array
    componentDidMount(){
        axios.get('https://flixir.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    //Set movie selected for view
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie : movie
        });
    }
    //Set user logged for view
    onLoggedIn(user) {
        this.setState({
            user : user 
        });
    }

    render() {
        const {movies , selectedMovie, user} = this.state;
        //Render Login-view if variable is empty

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view">Wanna catch a movie?</div>
        
        return ( //Actually display the movie
        
        <div className="main-view">
        <Row className="main-view justify-content-md-center">
        {selectedMovie
        ? (
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        )
        : movies.map(movie => (
            <Col md={6}>
                <MovieCard key={movie._id.$oid} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
        ))}
        </Row>
            </div>
        );
    }
}

export default MainView;


  