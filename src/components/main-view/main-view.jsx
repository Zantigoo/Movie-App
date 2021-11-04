import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';



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
        axios.get('https://flixrapi.herokuapp.com/movies')
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
        
        return ( //Actually display the movie in movie var = null.
            <div className="main-view">
            {selectedMovie 
                ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
                : movies.map(movie => ( <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie)}}/>
            ))
            }
            </div>
        );
    }
}

export default MainView;