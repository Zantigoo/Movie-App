import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor() {
        super();
        this.state = { 
            movies: [
                {
                "_id":{"$oid":"616600c50d2f3ba55c8c867e"},
                "Title":"Fight Club",
                "Description":"An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
                "Imageurl":"https://theposterdb.com/api/assets/64093",
                "Featured":false,
                "Genre":{"$oid":"6165f8bf0d2f3ba55c8c866e"}
                },

                {
                "_id":{"$oid":"6166003f0d2f3ba55c8c867b"},
                "Title":"Dune",
                "Description":"The son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
                "Imageurl":"https://theposterdb.com/api/assets/168154",
                "Featured":false,
                "Genre":{"$oid":"6165f8bf0d2f3ba55c8c866e"}
                },

                {
                "_id":{"$oid":"616600740d2f3ba55c8c867c"},
                "Title":"Sicario",
                "Description":"An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs at the border area between the U.S. and Mexico.",
                "Imageurl":"https://theposterdb.com/api/assets/5943",
                "Featured":false,
                "Genre":{"$oid":"6165f8bf0d2f3ba55c8c866e"}
                },
            ],
            selectedMovie: null,
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie : newSelectedMovie
        })
    }

    render() {
        const {movies , selectedMovie} = this.state;

        if (movies.length === 0) return <div className="main-view">Where have all the movies gone...?</div>
        
        return (
            <div className="main-view">
            {selectedMovie 
                ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
                : movies.map(movie => ( <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie)}}/>
            ))}
            </div>
        );
        
    }
}

export default MainView;